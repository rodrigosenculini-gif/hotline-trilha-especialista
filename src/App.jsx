import { useState } from 'react';
import { motion } from 'framer-motion';
import Intro from './components/lesson/Intro';
import LessonView from './components/lesson/LessonView';
import BoardScene from './components/board/BoardScene';
import BattleGame from './components/battle/BattleGame';
import FinalScreen from './components/FinalScreen';
import Mascot from './components/mascot/Mascot';
import { FLAT_LESSONS } from './data/lessons';
import { LOGO_IMG, MASCOT_GREETING, MASCOT_IMG, MASCOT_TIPS } from './data/config';

const MIN_SCORE_FOR_BONUS = 14; // de 20 perguntas

export default function App() {
  // intro | lessons | board | door-to-battle | battle | final
  const [phase, setPhase] = useState('intro');
  const [lessonIndex, setLessonIndex] = useState(0);
  const [xp, setXp] = useState(0);
  const [bonusReached, setBonusReached] = useState(false);
  const [mascotMsg, setMascotMsg] = useState(MASCOT_GREETING);
  const [showBubble, setShowBubble] = useState(true);

  const lesson = FLAT_LESSONS[lessonIndex];

  function goToLesson(idx) {
    setLessonIndex(idx);
    const l = FLAT_LESSONS[idx];
    setMascotMsg(MASCOT_TIPS[l.id] || 'Bora continuar!');
    setShowBubble(true);
  }

  function handleNextLesson() {
    if (lessonIndex >= FLAT_LESSONS.length - 1) {
      setPhase('board');
      return;
    }
    goToLesson(lessonIndex + 1);
  }

  function handlePrevLesson() {
    if (lessonIndex === 0) return;
    goToLesson(lessonIndex - 1);
  }

  function handleXpGain(amount) {
    setXp((v) => v + amount);
  }

  function handleBoardFinish() {
    setPhase('door-to-battle');
    setTimeout(() => setPhase('battle'), 1500);
  }

  function handleVictory(correctCount) {
    setBonusReached(correctCount >= MIN_SCORE_FOR_BONUS);
    setPhase('final');
  }

  const showHeader = phase === 'intro' || phase === 'lessons';

  return (
    <div className="app-shell">
      {showHeader && (
        <header className="app-header">
          <div className="brand">
            <img src={LOGO_IMG} alt="Hotline" />
            <span className="title">Trilha do Especialista</span>
          </div>
          <div className="xp-badge">⭐ {xp} XP</div>
        </header>
      )}

      {phase === 'intro' && <Intro onStart={() => setPhase('lessons')} />}

      {phase === 'lessons' && (
        <LessonView
          lesson={lesson}
          index={lessonIndex}
          total={FLAT_LESSONS.length}
          onPrev={handlePrevLesson}
          onNext={handleNextLesson}
        />
      )}

      {phase === 'board' && <BoardScene onFinish={handleBoardFinish} onXpGain={handleXpGain} />}

      {phase === 'door-to-battle' && (
        <div className="board-scene theme-partida">
          <div className="scenery scenery-partida">
            <div className="door door-open">🚪</div>
            <motion.img
              src={MASCOT_IMG}
              alt="Esquentadinho"
              className="run-through"
              initial={{ left: '20%', opacity: 1 }}
              animate={{ left: '50%', opacity: 0 }}
              transition={{ duration: 1.3, ease: 'easeIn' }}
            />
          </div>
          <div className="stop-title-big">Entrando na masmorra...</div>
        </div>
      )}

      {phase === 'battle' && <BattleGame onVictory={handleVictory} />}

      {phase === 'final' && <FinalScreen minScoreReached={bonusReached} />}

      {(phase === 'intro' || phase === 'lessons') && (
        <Mascot message={mascotMsg} show={showBubble} onToggle={() => setShowBubble((s) => !s)} />
      )}
    </div>
  );
}
