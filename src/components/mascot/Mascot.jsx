import { motion, AnimatePresence } from 'framer-motion';
import { MASCOT_IMG } from '../../data/config';

export default function Mascot({ message, show, onToggle }) {
  return (
    <div className="mascot-wrap">
      <AnimatePresence>
        {show && message && (
          <motion.div
            className="mascot-bubble"
            initial={{ opacity: 0, y: 10, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.92 }}
            dangerouslySetInnerHTML={{ __html: message }}
          />
        )}
      </AnimatePresence>
      <motion.button
        className="mascot-btn"
        onClick={onToggle}
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}
        whileTap={{ scale: 0.9, rotate: -6 }}
        aria-label="Esquentadinho"
      >
        <img src={MASCOT_IMG} alt="Esquentadinho" />
      </motion.button>
    </div>
  );
}
