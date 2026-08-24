import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  buildGameQuestions,
  ghostStageForIndex,
  HOT_HIT_LINES,
  MAX_LIVES,
} from '../../data/quiz';
import { MASCOT_IMG } from '../../data/config';

export default function BattleGame({ onVictory }) {
  const [questions] = useState(() => buildGameQuestions());
  const [qi, setQi] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);
  const [potions, setPotions] = useState(0);
  const [selected, setSelected] = useState(null);
  const [hiddenOpts, setHiddenOpts] = useState([]);
  const [usedPotion, setUsedPotion] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [fx, setFx] = useState(null); // 'hit-ghost' | 'hit-hot'
  const [hotLine, setHotLine] = useState('Bora, você consegue!');
  const [modal, setModal] = useState(null); // 'reward' | 'gameover' | 'victory'

  const stage = ghostStageForIndex(qi);
  const q = questions[qi];

  function restart() {
    window.location.reload();
  }

  function pick(i) {
    if (selected !== null || modal) return;
    setSelected(i);
    const isCorrect = i === q.correct;

    if (isCorrect) {
      setFx('hit-ghost');
      setCorrectCount((c) => c + 1);
    } else {
      setFx('hit-hot');
      setHotLine(HOT_HIT_LINES[Math.floor(Math.random() * HOT_HIT_LINES.length)]);
      setLives((l) => l - 1);
    }

    setTimeout(() => {
      setFx(null);
      if (!isCorrect && lives - 1 <= 0) {
        setModal('gameover');
        return;
      }
      if (isCorrect && (correctCount + 1) % 3 === 0) {
        setModal('reward');
        return;
      }
      goNext();
    }, isCorrect ? 700 : 1100);
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

  const darkOverlay = useMemo(
    () => ({ background: `rgba(0,0,0,${stage.darkness})` }),
    [stage]
  );

  return (
    <div className="battle-scene" style={{ background: `radial-gradient(circle at 50% 20%, #241a12, #0a0705 75%)` }}>
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', ...darkOverlay }} />

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

      <div className="battle-arena">
        <div className="fighter" style={{ position: 'relative' }}>
          <motion.img
            src={MASCOT_IMG}
            alt="Esquentadinho"
            style={{ width: 90 }}
            animate={
              fx === 'hit-hot'
                ? { x: [0, -8, 8, -6, 6, 0] }
                : fx === 'hit-ghost'
                ? { x: [0, 20, 0] }
                : { y: [0, -5, 0] }
            }
            transition={{ duration: fx ? 0.45 : 1.4, repeat: fx ? 0 : Infinity }}
          />
          <AnimatePresence>
            {fx === 'hit-ghost' && (
              <motion.span
                key="sword"
                initial={{ opacity: 0, x: 0, rotate: -30 }}
                animate={{ opacity: 1, x: 90, rotate: 20 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                style={{ position: 'absolute', top: 10, fontSize: 34 }}
              >
                🗡️
              </motion.span>
            )}
            {fx === 'hit-hot' && (
              <motion.span
                key="slime"
                initial={{ opacity: 0, x: 90 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="slime"
                style={{ top: 10, color: stage.slime }}
              >
                🟢
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <div className="ghost" style={{ position: 'relative', color: stage.color }}>
          <span className="ghost-name">{stage.name}</span>
          <motion.span
            animate={
              fx === 'hit-ghost'
                ? { opacity: [1, 0.3, 1], scale: [1, 1.15, 1] }
                : { y: [0, -8, 0] }
            }
            transition={{ duration: fx === 'hit-ghost' ? 0.4 : 1.6, repeat: fx === 'hit-ghost' ? 0 : Infinity }}
          >
            👻
          </motion.span>
        </div>
      </div>

      <AnimatePresence>
        {fx === 'hit-hot' && (
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
