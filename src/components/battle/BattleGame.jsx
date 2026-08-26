import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  buildGameQuestions,
  ghostStageForIndex,
  HOT_HIT_LINES,
  MAX_LIVES,
} from '../../data/quiz';
import { MASCOT_IMG } from '../../data/config';
import { trackResposta } from '../../lib/track';

export default function BattleGame({ onVictory, sessaoId, vendedor }) {
  const [questions] = useState(() => buildGameQuestions());
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

  const stage = ghostStageForIndex(qi);
  const prevStage = qi > 0 ? ghostStageForIndex(qi - 1) : stage;
  const stageChanged = stage.name !== prevStage.name;
  const q = questions[qi];

  function restart() {
    window.location.reload();
  }

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
      respostaDada: q.options[i],
      respostaCorreta: q.options[q.correct],
      acertou: isCorrect,
    });

    if (isCorrect) {
      setFx('attack-ghost');
      setCorrectCount((c) => c + 1);
    } else {
      setFx('attack-hot');
      setHotLine(HOT_HIT_LINES[Math.floor(Math.random() * HOT_HIT_LINES.length)]);
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
    }, isCorrect ? 1000 : 1300);
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

  return (
    <div className="battle-scene">
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', ...darkOverlay, transition: 'background 0.6s' }} />

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

      <div className="battle-arena">
        <div className="fighter-lane">
          <motion.img
            src={MASCOT_IMG}
            alt="Esquentadinho"
            className="fighter-img"
            animate={
              fx === 'attack-ghost'
                ? { x: [0, 130, 130, 0] }
                : fx === 'attack-hot'
                ? { x: [0, -10, 10, -8, 8, 0] }
                : { y: [0, -5, 0] }
            }
            transition={
              fx === 'attack-ghost'
                ? { duration: 0.9, times: [0, 0.35, 0.65, 1] }
                : fx === 'attack-hot'
                ? { duration: 0.45 }
                : { duration: 1.4, repeat: Infinity }
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
          <motion.span
            className="ghost-emoji"
            style={{ color: stage.color }}
            animate={
              fx === 'attack-ghost'
                ? { opacity: [1, 0.3, 1, 0.3, 1], scale: [1, 0.85, 1.1, 0.85, 1] }
                : { y: [0, -8, 0] }
            }
            transition={{ duration: fx === 'attack-ghost' ? 0.9 : 1.6, repeat: fx === 'attack-ghost' ? 0 : Infinity }}
          >
            {stage.emoji}
          </motion.span>
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
              <button className="b-restart" onClick={restart}>Tentar novamente</button>
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
