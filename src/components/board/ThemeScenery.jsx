import { motion } from 'framer-motion';

// Cada tema recebe elementos visuais próprios (não apenas gradiente de cor).
export default function ThemeScenery({ themeId }) {
  if (themeId === 'praia') {
    return (
      <div className="scenery scenery-praia">
        <motion.div className="sun" animate={{ opacity: [0.8, 1, 0.8] }} transition={{ duration: 3, repeat: Infinity }} />
        <div className="sea" />
        <div className="wave wave-1" />
        <div className="wave wave-2" />
        <div className="palm">🌴</div>
        <div className="palm palm-2">🌴</div>
      </div>
    );
  }
  if (themeId === 'autodromo') {
    return (
      <div className="scenery scenery-autodromo">
        <div className="track" />
        <div className="track-lines" />
        <div className="flag">🏁</div>
        <motion.div
          className="car"
          animate={{ x: ['-10%', '110%'] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
        >
          🏎️
        </motion.div>
      </div>
    );
  }
  if (themeId === 'nuvens') {
    return (
      <div className="scenery scenery-nuvens">
        <motion.div className="cloud cloud-1" animate={{ x: [0, 40, 0] }} transition={{ duration: 8, repeat: Infinity }}>☁️</motion.div>
        <motion.div className="cloud cloud-2" animate={{ x: [0, -30, 0] }} transition={{ duration: 6, repeat: Infinity }}>☁️</motion.div>
        <motion.div className="cloud cloud-3" animate={{ x: [0, 25, 0] }} transition={{ duration: 7, repeat: Infinity }}>☁️</motion.div>
        <div className="sunbeam" />
      </div>
    );
  }
  if (themeId === 'galaxia') {
    return (
      <div className="scenery scenery-galaxia">
        <div className="stars" />
        <motion.div className="planet planet-1" animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}>🪐</motion.div>
        <motion.div className="planet planet-2" animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity }}>🌕</motion.div>
        <div className="shooting-star" />
      </div>
    );
  }
  // partida
  return (
    <div className="scenery scenery-partida">
      <div className="torch torch-1">🔥</div>
      <div className="torch torch-2">🔥</div>
      <div className="door">🚪</div>
    </div>
  );
}
