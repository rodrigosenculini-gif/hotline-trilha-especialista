import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BOARD_STOPS, THEMES, XP_PER_BLOCK } from '../../data/board';
import { MASCOT_IMG } from '../../data/config';
import ThemeScenery from './ThemeScenery';
import MountainTrail from './MountainTrail';

const themeById = Object.fromEntries(THEMES.map((t) => [t.id, t]));

// phase: 'run-door' -> 'scenery' -> 'question' -> 'blocks' -> (next stop) ... -> 'complete'
export default function BoardScene({ onFinish, onXpGain }) {
  const [stopIndex, setStopIndex] = useState(0);
  const [phase, setPhase] = useState('run-door');
  const [blockIndex, setBlockIndex] = useState(0);
  const [answered, setAnswered] = useState(null);

  const stop = BOARD_STOPS[stopIndex];
  const theme = themeById[stop.theme];
  const isLastStop = stopIndex === BOARD_STOPS.length - 1;
  const isLastBlock = blockIndex === stop.blocks.length - 1;

  // Corrida pela porta acontece só uma vez, no começo da trilha.
  useEffect(() => {
    if (phase === 'run-door') {
      const t = setTimeout(() => setPhase('scenery'), 1400);
      return () => clearTimeout(t);
    }
  }, [phase]);

  // Cenário aparece por um instante antes da pergunta.
  useEffect(() => {
    if (phase === 'scenery') {
      const t = setTimeout(() => setPhase('question'), 1100);
      return () => clearTimeout(t);
    }
  }, [phase, stopIndex]);

  function handleAnswer(i) {
    if (answered !== null) return;
    setAnswered(i);
    setTimeout(() => {
      setAnswered(null);
      setPhase('blocks');
      setBlockIndex(0);
    }, 1000);
  }

  function handleNextBlock() {
    onXpGain(XP_PER_BLOCK);
    if (!isLastBlock) {
      setBlockIndex((b) => b + 1);
      return;
    }
    if (isLastStop) {
      setPhase('complete');
      return;
    }
    setStopIndex((s) => s + 1);
    setPhase('scenery');
  }

  if (phase === 'complete') {
    return (
      <div className={`board-scene ${theme.bg}`}>
        <ThemeScenery themeId={stop.theme} />
        <motion.div
          className="finale-scene"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="finale-card"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <img src={MASCOT_IMG} alt="Esquentadinho" />
            <h2 style={{ marginBottom: 12 }}>Trilha concluída!</h2>
            <p>Agora você está pronto para os Jogos Do Especialista! Se prepare!</p>
            <button className="block-next" onClick={onFinish}>Entrar na masmorra →</button>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`board-scene ${theme.bg}`}>
      <AnimatePresence mode="wait">
        {phase !== 'run-door' && (
          <motion.div key="scenery" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ThemeScenery themeId={stop.theme} />
          </motion.div>
        )}
      </AnimatePresence>

      {phase === 'run-door' && (
        <div className="scenery scenery-partida">
          <div className="door">🚪</div>
          <motion.img
            src={MASCOT_IMG}
            alt="Esquentadinho"
            className="run-through"
            initial={{ left: '-10%', opacity: 0 }}
            animate={{ left: '55%', opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </div>
      )}

      {phase !== 'run-door' && <MountainTrail currentIndex={stopIndex} />}

      <AnimatePresence mode="wait">
        {phase === 'scenery' && (
          <motion.div
            key={`scenery-title-${stop.id}`}
            className="stop-title-big"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {stop.number}. {stop.title}
          </motion.div>
        )}

        {phase === 'question' && (
          <motion.div
            key={`q-${stop.id}`}
            className="block-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="block-card"
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="eyebrow" style={{ marginBottom: 10 }}>
                <span className="dash" />{stop.number}. {stop.title}
              </div>
              <h3>{stop.question.text}</h3>
              <div style={{ marginTop: 14 }}>
                {stop.question.options.map((opt, i) => {
                  let cls = 'q-opt';
                  if (answered !== null) {
                    if (i === stop.question.correct) cls += ' correct';
                    else if (i === answered) cls += ' wrong';
                  }
                  return (
                    <button key={i} className={cls} disabled={answered !== null} onClick={() => handleAnswer(i)}>
                      {opt}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}

        {phase === 'blocks' && (
          <motion.div
            key={`blocks-${stop.id}-${blockIndex}`}
            className="block-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="block-card"
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="block-progress">
                {stop.blocks.map((_, i) => (
                  <span key={i} className={`block-dot ${i <= blockIndex ? 'active' : ''}`} />
                ))}
              </div>
              <h3>{stop.blocks[blockIndex].heading}</h3>
              <p dangerouslySetInnerHTML={{ __html: stop.blocks[blockIndex].body }} />
              <button className="block-next" onClick={handleNextBlock}>
                {isLastBlock && isLastStop ? 'Concluir trilha →' : isLastBlock ? 'Seguir viagem →' : 'Continuar →'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
