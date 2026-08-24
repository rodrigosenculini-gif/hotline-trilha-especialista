import { motion } from 'framer-motion';
import { FINAL_LINK, FINAL_MESSAGE, MASCOT_IMG } from '../data/config';

export default function FinalScreen({ minScoreReached }) {
  return (
    <div className="board-scene theme-galaxia">
      <div className="finale-scene">
        <motion.div
          className="finale-card"
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <img src={MASCOT_IMG} alt="Esquentadinho" />
          <p>{FINAL_MESSAGE}</p>
          <a className="finale-link" href={FINAL_LINK} target="_blank" rel="noreferrer">
            Acessar a Jornada Hotline →
          </a>
          {minScoreReached && (
            <p style={{ marginTop: 18, fontSize: 13, color: '#ffb020' }}>
              🎁 Você atingiu a pontuação mínima na masmorra — bônus liberado!
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
