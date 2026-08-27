import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AUDIO_SLIDE_NARRACAO, tocarAudio } from '../../lib/audio';

export default function LessonView({ lesson, index, total, onPrev, onNext }) {
  const stageRef = useRef(null);
  const [tocando, setTocando] = useState(false);
  const numeroSlide = index + 1;
  const audioUrl = AUDIO_SLIDE_NARRACAO[numeroSlide];

  useEffect(() => {
    stageRef.current?.scrollTo({ top: 0, behavior: 'auto' });
    window.scrollTo({ top: 0, behavior: 'auto' });
    setTocando(false);
  }, [lesson.id]);

  function handleOuvir() {
    if (!audioUrl) return;
    tocarAudio(audioUrl);
    setTocando(true);
  }

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
            <div className="eyebrow" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span><span className="dash" />{lesson.moduleLabel}</span>
              {audioUrl && (
                <button type="button" className="nav-btn" onClick={handleOuvir} style={{ fontSize: 12 }}>
                  {tocando ? '🔊 Tocando...' : '🔊 Ouvir este slide'}
                </button>
              )}
            </div>
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
