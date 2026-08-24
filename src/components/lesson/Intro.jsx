import { motion } from 'framer-motion';
import { LOGO_IMG } from '../../data/config';

export default function Intro({ onStart }) {
  return (
    <div className="stage">
      <motion.div
        className="intro"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <img className="logo" src={LOGO_IMG} alt="Hotline Soluções Financeiras" />
        <div className="eyebrow"><span className="dash" />ACADEMIA HOTLINE</div>
        <h2 className="lesson-title" style={{ marginBottom: 6 }}>Trilha do Especialista em Crédito</h2>
        <p className="lede">
          Antes de bater metas, vamos conhecer a Hotline por dentro: nossa história, propósito,
          produtos e o que esperamos de você no dia a dia do atendimento. No final, tem uma
          masmorra te esperando 🗡️
        </p>
        <button className="start-btn" onClick={onStart}>Iniciar trilha →</button>
      </motion.div>
    </div>
  );
}
