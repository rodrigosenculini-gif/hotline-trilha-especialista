import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BOARD_STOPS, THEMES, XP_PER_BLOCK } from '../../data/board';

const themeById = Object.fromEntries(THEMES.map((t) => [t.id, t]));

export default function BoardScene({ onFinish, onXpGain }) {
  const [stopIndex, setStopIndex] = useState(0);
  const [phase, setPhase] = useState('travel'); // 'travel' | 'blocks'
  const [blockIndex, setBlockIndex] = useState(0);
  const [showDice, setShowDice] = useState(stopIndex % 2 === 0);

  const stop = BOARD_STOPS[stopIndex];
  const theme = themeById[stop.theme];
  const isLastStop = stopIndex === BOARD_STOPS.length - 1;
  const isLastBlock = blockIndex === stop.blocks.length - 1;

  function handleArrive() {
    setPhase('blocks');
    setBlockIndex(0);
  }

  function handleNextBlock() {
    onXpGain(XP_PER_BLOCK);
    if (!isLastBlock) {
      setBlockIndex((b) => b + 1);
      return;
    }
    if (isLastStop) {
      onFinish();
      return;
    }
    const next = stopIndex + 1;
    setStopIndex(next);
    setShowDice(next % 2 === 0);
    setPhase('travel');
  }

  return (
    <div className={`board-scene ${theme.bg}`}>
      <AnimatePresence mode="wait">
        {phase === 'travel' && (
          <motion.div
            key={`travel-${stop.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <TravelAnimation showDice={showDice} onDone={handleArrive} />
            <div className="stop-title">{stop.title}</div>
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
              <h2>{stop.title}</h2>
              <h3>{stop.blocks[blockIndex].heading}</h3>
              <p dangerouslySetInnerHTML={{ __html: stop.blocks[blockIndex].body }} />
              <button className="block-next" onClick={handleNextBlock}>
                {isLastBlock && isLastStop
                  ? 'Ir para a masmorra →'
                  : isLastBlock
                  ? 'Seguir viagem →'
                  : 'Continuar →'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TravelAnimation({ showDice, onDone }) {
  const [rolled, setRolled] = useState(!showDice);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
      {showDice && !rolled && (
        <motion.button
          className="dice"
          initial={{ rotate: 0 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setRolled(true)}
        >
          🎲
        </motion.button>
      )}
      {(rolled || !showDice) && (
        <div className="board-track">
          <div className="board-line" />
          <div className="board-node done" />
          <div className="board-node" />
          <motion.div
            className="board-piece"
            initial={{ left: '0%', x: -17 }}
            animate={{ left: '100%', x: -17 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            onAnimationComplete={onDone}
            style={{ top: '50%', marginTop: -17 }}
          >
            <motion.span
              animate={{ rotate: [0, -8, 8, -6, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              🏃
            </motion.span>
          </motion.div>
        </div>
      )}
    </div>
  );
}
