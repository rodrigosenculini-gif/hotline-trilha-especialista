import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LessonView({ lesson, index, total, onPrev, onNext }) {
  const stageRef = useRef(null);

  useEffect(() => {
    stageRef.current?.scrollTo({ top: 0, behavior: 'auto' });
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [lesson.id]);

  return (
    <>
      <div className="stage" ref={stageRef}>
        <AnimatePresence mode="wait">
          <motion.div
            key={lesson.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.32 }}
          >
            <div className="eyebrow"><span className="dash" />{lesson.moduleLabel}</div>
            <h2 className="lesson-title">{lesson.title}</h2>
            <div className="content" dangerouslySetInnerHTML={{ __html: lesson.content }} />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="stage-nav">
        <button className="nav-btn" onClick={onPrev} disabled={index === 0}>← Anterior</button>
        <span className="nav-mid">{index + 1} / {total}</span>
        <button className="nav-btn primary" onClick={onNext}>
          {index === total - 1 ? 'Ir para o tabuleiro →' : 'Próximo →'}
        </button>
      </div>
    </>
  );
}
