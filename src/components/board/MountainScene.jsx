import { motion } from 'framer-motion';
import { BOARD_STOPS, MOUNTAIN_POINTS } from '../../data/board';
import { MASCOT_IMG_MOCHILA } from '../../data/config';

// Gera os picos da montanha (silhuetas triangulares) ficando mais
// íngremes/altos conforme avança pra direita.
function buildPeaks() {
  const peaks = [];
  const baseXs = [2, 14, 26, 38, 50, 63, 76, 88, 100];
  baseXs.forEach((x, i) => {
    const height = 30 + i * 7; // fica mais alto/íngreme
    const width = 20 + (i % 2 === 0 ? 4 : 0);
    peaks.push({ x, height, width, key: i });
  });
  return peaks;
}
const PEAKS = buildPeaks();

function themeAccent(themeId) {
  switch (themeId) {
    case 'praia':
      return <span className="peak-accent">🌴</span>;
    case 'autodromo':
      return <span className="peak-accent">🏁</span>;
    case 'nuvens':
      return <span className="peak-accent">☁️</span>;
    case 'galaxia':
      return <span className="peak-accent">🪐</span>;
    default:
      return <span className="peak-accent">🔥</span>;
  }
}

export default function MountainScene({ currentIndex, zoomedOut }) {
  const origin = MOUNTAIN_POINTS[currentIndex];
  const scale = zoomedOut ? 1 : 2.4;

  return (
    <div className="mountain-wrap">
      <motion.div
        className="mountain-zoom"
        animate={{ scale }}
        transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: `${origin.x}% ${origin.y}%` }}
      >
        <svg className="mountain-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          {PEAKS.map((p) => (
            <polygon
              key={p.key}
              points={`${p.x - p.width / 2},100 ${p.x},${100 - p.height} ${p.x + p.width / 2},100`}
              className="peak-shape"
            />
          ))}
          <polyline
            points={MOUNTAIN_POINTS.map((pt) => `${pt.x},${pt.y}`).join(' ')}
            className="mountain-path"
          />
          {MOUNTAIN_POINTS.map((pt, i) => (
            <circle
              key={i}
              cx={pt.x}
              cy={pt.y}
              r={i === currentIndex ? 2.4 : 1.7}
              className={`mountain-node ${i < currentIndex ? 'done' : i === currentIndex ? 'current' : 'todo'}`}
            />
          ))}
        </svg>

        {MOUNTAIN_POINTS.map((pt, i) => (
          <div key={i} className="mountain-flag" style={{ left: `${pt.x}%`, top: `${pt.y}%` }}>
            {i === currentIndex ? themeAccent(BOARD_STOPS[i].theme) : <span className="peak-num">{BOARD_STOPS[i].number}</span>}
          </div>
        ))}

        <motion.img
          key={currentIndex}
          src={MASCOT_IMG_MOCHILA}
          alt="Esquentadinho"
          className="mountain-hero"
          style={{ left: `${origin.x}%`, top: `${origin.y}%` }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: [0, -5, 0] }}
          transition={{ opacity: { duration: 0.3 }, y: { duration: 1.3, repeat: Infinity } }}
        />
      </motion.div>
    </div>
  );
}
