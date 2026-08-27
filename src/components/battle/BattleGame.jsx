import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  buildGameQuestions,
  ghostStageForIndex,
  HOT_HIT_LINES,
  MAX_LIVES,
  QUESTIONS,
  BONUS_STAGE,
  shuffle,
} from '../../data/quiz';
import { BOARD_STOPS } from '../../data/board';
import { MASCOT_IMG_ARMADURA } from '../../data/config';
import { trackResposta } from '../../lib/track';
import { tocarAudio } from '../../lib/audio';

// Cada frase do Esquentadinho ao perder vida tem seu próprio áudio — a que
// não está aqui ("da próxima, mais atenção!") toca só o texto, sem áudio.
const AUDIO_POR_FRASE = {
  'ah não, cuidado!': '/audio/mascote-masmorra-errou.mp3',
  'ei, estou perdendo minhas vidas aqui!': '/audio/mascote-masmorra-perdendo-vidas.mp3',
  'vamos, você consegue!': '/audio/mascote-masmorra-incentivo.mp3',
};

// Monta perguntas extras a partir das paradas da montanha que o usuário
// errou ou revisou — reforçando exatamente o que precisa de mais atenção.
function montarPerguntasExtras(stopsParaReforcar) {
  return stopsParaReforcar
    .map(({ stopId, motivo }) => {
      const stop = BOARD_STOPS.find((s) => s.id === stopId);
      if (!stop) return null;
      const order = shuffle(stop.question.options.map((_, i) => i));
      return {
        text: stop.question.text,
        options: order.map((i) => stop.question.options[i]),
        correct: order.indexOf(stop.question.correct),
        especial: motivo, // 'erro-montanha' | 'revisao'
      };
    })
    .filter(Boolean);
}

export default function BattleGame({ onVictory, onGameOver, sessaoId, vendedor, stopsParaReforcar = [] }) {
  const [questions] = useState(() => [...buildGameQuestions(), ...montarPerguntasExtras(stopsParaReforcar)]);
  const [qi, setQi] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);
  const [potions, setPotions] = useState(0);
  const [selected, setSelected] = useState(null);
  const [hiddenOpts, setHiddenOpts] = useState([]);
  const [usedPotion, setUsedPotion] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [fx, setFx] = useState(null); // 'attack-ghost' | 'attack-hot'
  const [hotLine, setHotLine] = useState(null);
  const [modal, setModal] = useState(null);
  const [tempoEsgotando, setTempoEsgotando] = useState(false); // true no 2º minuto (aviso visível)
  const [segundosRestantes, setSegundosRestantes] = useState(60);

  const q = questions[qi];
  const qPrev = qi > 0 ? questions[qi - 1] : q;
  const stage = q?.especial ? BONUS_STAGE : ghostStageForIndex(qi, QUESTIONS.length);
  const prevStage = qi > 0 ? (qPrev?.especial ? BONUS_STAGE : ghostStageForIndex(qi - 1, QUESTIONS.length)) : stage;
  const stageChanged = stage.name !== prevStage.name;

  // Tempo pra responder: 1º minuto sem cobrança visual; se não respondeu,
  // começa a contar mais 1 minuto visível. Sem resposta até o fim, perde a
  // pergunta (mostra a certa) e perde uma vida.
  useEffect(() => {
    setTempoEsgotando(false);
    setSegundosRestantes(60);
    if (selected !== null || modal) return undefined;

    // 1º minuto: sem cobrança visual. Só depois disso começa o segundo
    // minuto (visível, contando 1:00 -> 0:00).
    const avisoTimer = setTimeout(() => {
      setTempoEsgotando(true);
      setSegundosRestantes(60);
    }, 60000);
    const tickTimer = setInterval(() => {
      setSegundosRestantes((s) => (s > 0 ? s - 1 : 0));
    }, 61000); // só começa a contar de fato 1s depois do aviso aparecer
    const falhaTimer = setTimeout(() => pick(-1), 120000);

    return () => {
      clearTimeout(avisoTimer);
      clearTimeout(falhaTimer);
      clearInterval(tickTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qi]);

  function pick(i) {
    if (selected !== null || modal) return;
    setSelected(i);
    const isCorrect = i === q.correct;

    trackResposta({
      sessaoId,
      vendedor,
      origem: 'masmorra',
      etapaId: `pergunta-${qi + 1}`,
      pergunta: q.text,
      respostaDada: i === -1 ? '(sem resposta — tempo esgotado)' : q.options[i],
      respostaCorreta: q.options[q.correct],
      acertou: isCorrect,
      motivoEspecial: q.especial || null,
    });

    if (isCorrect) {
      setFx('attack-ghost');
      setCorrectCount((c) => c + 1);
    } else {
      const morreAgora = lives - 1 <= 0;
      setFx(morreAgora ? 'hot-ko' : 'attack-hot');
      const linha = HOT_HIT_LINES[Math.floor(Math.random() * HOT_HIT_LINES.length)];
      setHotLine(linha);
      tocarAudio(AUDIO_POR_FRASE[linha]);
      setLives((l) => l - 1);
    }

    setTimeout(() => {
      setFx(null);
      setHotLine(null);
      if (!isCorrect && lives - 1 <= 0) {
        setModal('gameover');
        return;
      }
      if (isCorrect && (correctCount + 1) % 3 === 0) {
        setModal('reward');
        return;
      }
      goNext();
    }, isCorrect ? 1000 : lives - 1 <= 0 ? 1500 : 1300);
  }

  function goNext() {
    setSelected(null);
    setHiddenOpts([]);
    setUsedPotion(false);
    if (qi + 1 >= questions.length) {
      setModal('victory');
      return;
    }
    setQi((v) => v + 1);
  }

  function usePotion() {
    if (potions <= 0 || usedPotion) return;
    setPotions((p) => p - 1);
    setUsedPotion(true);
    const wrongIdxs = q.options.map((_, i) => i).filter((i) => i !== q.correct);
    const toHide = wrongIdxs.sort(() => Math.random() - 0.5).slice(0, 2);
    setHiddenOpts(toHide);
  }

  function claimReward(kind) {
    if (kind === 'life') setLives((l) => Math.min(MAX_LIVES, l + 2));
    if (kind === 'potion') setPotions((p) => p + 1);
    setModal(null);
    goNext();
  }

  const darkOverlay = useMemo(() => ({ background: `rgba(0,0,0,${stage.darkness})` }), [stage]);
  const cenarioStyle = useMemo(() => (
    stage.bg
      ? { backgroundImage: `url(${stage.bg})`, backgroundSize: 'cover', backgroundPosition: 'center', transition: 'background-image 0.6s' }
      : {}
  ), [stage]);

  return (
    <div className="battle-scene">
      <div className="battle-hud">
        <div className="hearts">
          {Array.from({ length: MAX_LIVES }).map((_, i) => (
            <span key={i} className={i >= lives ? 'heart-lost' : ''}>❤️</span>
          ))}
        </div>
        <div style={{ fontFamily: 'IBM Plex Mono', fontSize: 13 }}>
          {qi + 1} / {questions.length} · 🧪 {potions}
        </div>
      </div>

      <AnimatePresence>
        {stageChanged && qi > 0 && (
          <motion.div
            className="stage-banner"
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            A masmorra fica mais sombria... <b>{stage.name}</b> apareceu!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="battle-arena" style={cenarioStyle}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', ...darkOverlay, transition: 'background 0.6s', borderRadius: 16 }} />
        <div className="fighter-lane">
          <motion.img
            src={MASCOT_IMG_ARMADURA}
            alt="Esquentadinho"
            className="fighter-img"
            animate={
              fx === 'attack-ghost'
                ? { x: [0, 130, 130, 0], y: 0, rotate: 0, opacity: 1 }
                : fx === 'attack-hot'
                ? { x: [0, -10, 10, -8, 8, 0], y: 0, rotate: 0, opacity: [1, 0.25, 1, 0.25, 1, 0.25, 1] }
                : fx === 'hot-ko'
                ? { rotate: 90, y: 40, opacity: 1 }
                : { y: [0, -6, 0], rotate: 0, opacity: 1 }
            }
            transition={
              fx === 'attack-ghost'
                ? { duration: 0.9, times: [0, 0.35, 0.65, 1] }
                : fx === 'attack-hot'
                ? { duration: 0.5 }
                : fx === 'hot-ko'
                ? { duration: 0.5, ease: 'easeIn' }
                : { duration: 1, repeat: Infinity, ease: 'easeInOut' }
            }
          />
          <AnimatePresence>
            {fx === 'attack-ghost' && (
              <>
                <motion.span
                  key="sword1"
                  className="sword-swing"
                  initial={{ opacity: 0, x: 90, rotate: -40 }}
                  animate={{ opacity: 1, x: 150, rotate: 25 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.28, delay: 0.32 }}
                >
                  🗡️
                </motion.span>
                <motion.span
                  key="sword2"
                  className="sword-swing"
                  initial={{ opacity: 0, x: 90, rotate: 40 }}
                  animate={{ opacity: 1, x: 150, rotate: -25 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.26, delay: 0.6 }}
                >
                  🗡️
                </motion.span>
              </>
            )}
            {fx === 'attack-hot' && (
              <motion.span
                key="slime"
                initial={{ opacity: 0, x: 130, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="slime"
              >
                {stage.slimeEmoji}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <div className="ghost-lane">
          <span className="ghost-name">{stage.name}</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={stage.name}
              className="ghost-emoji"
              style={{ color: stage.color }}
              initial={{ opacity: 0, y: 50, rotate: 0 }}
              animate={
                fx === 'attack-ghost'
                  ? { opacity: [1, 0.25, 1, 0.25, 1, 0.25, 1], scale: [1, 0.85, 1.1, 0.85, 1], y: 0, rotate: 0 }
                  : { y: [0, -7, 0], opacity: 1, rotate: 0 }
              }
              exit={{ opacity: 0, y: 50, rotate: 80, transition: { duration: 0.5, ease: 'easeIn' } }}
              transition={{ duration: fx === 'attack-ghost' ? 0.9 : 1, repeat: fx === 'attack-ghost' ? 0 : Infinity, ease: 'easeInOut' }}
            >
              {stage.img ? <img src={stage.img} alt={stage.name} className="ghost-img" /> : stage.emoji}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {hotLine && (
          <motion.div
            className="hot-line"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {hotLine}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="battle-question">
        {tempoEsgotando && selected === null && (
          <div className="battle-timer-aviso">
            ⏳ Responda logo! {String(Math.floor(segundosRestantes / 60)).padStart(1, '0')}:{String(segundosRestantes % 60).padStart(2, '0')}
          </div>
        )}
        <h3>{q.text}</h3>
        {q.options.map((opt, i) => {
          if (hiddenOpts.includes(i)) return null;
          let cls = 'q-opt';
          if (selected !== null) {
            if (i === q.correct) cls += ' correct';
            else if (i === selected) cls += ' wrong';
          }
          return (
            <button key={i} className={cls} disabled={selected !== null} onClick={() => pick(i)}>
              {opt}
            </button>
          );
        })}
        <button
          className="nav-btn"
          style={{ marginTop: 4 }}
          disabled={potions <= 0 || usedPotion || selected !== null}
          onClick={usePotion}
        >
          🧪 Usar Poção da Sabedoria ({potions})
        </button>
      </div>

      <AnimatePresence>
        {modal === 'reward' && (
          <motion.div className="b-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="b-modal">
              <h3>🎉 Três acertos seguidos!</h3>
              <p>Escolha sua recompensa antes de seguir para o próximo fantasma.</p>
              <div className="b-choice">
                <button onClick={() => claimReward('life')}>❤️❤️ Recuperar 2 corações</button>
                <button onClick={() => claimReward('potion')}>🧪 +1 Poção da Sabedoria</button>
              </div>
            </div>
          </motion.div>
        )}
        {modal === 'gameover' && (
          <motion.div className="b-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="b-modal">
              <h3>💀 Você perdeu para a masmorra</h3>
              <p>Acertos: {correctCount} de {qi + 1} perguntas.</p>
              <button className="b-restart" onClick={() => onGameOver?.()}>Tentar novamente</button>
            </div>
          </motion.div>
        )}
        {modal === 'victory' && (
          <motion.div className="b-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="b-modal">
              <h3>🏆 Masmorra concluída!</h3>
              <p>Você acertou {correctCount} de {questions.length} perguntas, com {potions} poção(ões) sobrando.</p>
              <button className="b-restart" onClick={() => onVictory(correctCount, questions.length)}>Continuar →</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
