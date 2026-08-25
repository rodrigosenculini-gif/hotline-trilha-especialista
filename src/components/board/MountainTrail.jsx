import { motion } from 'framer-motion';
import { BOARD_STOPS } from '../../data/board';
import { MASCOT_IMG } from '../../data/config';

// Trilha vertical em zigue-zague, tipo montanha, com o Esquentadinho
// posicionado ao lado do ponto atual (não centralizado).
export default function MountainTrail({ currentIndex }) {
  const total = BOARD_STOPS.length;

  return (
    <div className="mountain-trail">
      {BOARD_STOPS.map((stop, i) => {
        const side = i % 2 === 0 ? 'left' : 'right';
        const state = i < currentIndex ? 'done' : i === currentIndex ? 'current' : 'todo';
        return (
          <div key={stop.id} className={`trail-row trail-${side}`}>
            {i > 0 && <div className="trail-connector" />}
            <div className={`trail-node ${state}`}>
              <span>{stop.number}</span>
              {state === 'current' && (
                <motion.img
                  className="trail-player"
                  src={MASCOT_IMG}
                  alt="Esquentadinho"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
                  transition={{ y: { duration: 1.2, repeat: Infinity }, default: { duration: 0.3 } }}
                />
              )}
            </div>
            <div className="trail-label">{stop.title}</div>
          </div>
        );
      })}
    </div>
  );
}
