import { useState } from 'react';
import Intro from './components/lesson/Intro';
import LessonView from './components/lesson/LessonView';
import BoardScene from './components/board/BoardScene';
import BattleGame from './components/battle/BattleGame';
import FinalScreen from './components/FinalScreen';
import Mascot from './components/mascot/Mascot';
import { FLAT_LESSONS } from './data/lessons';
import { LOGO_IMG, MASCOT_GREETING, MASCOT_TIPS } from './data/config';

const MIN_SCORE_FOR_BONUS = 14; // de 20 perguntas

export default function App() {
  const [phase, setPhase] = useState('intro'); // intro | lessons | board | battle | final
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
      setMascotMsg('Chegou a hora do tabuleiro! Cada bloco te dá XP. Bora!');
      setShowBubble(true);
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
    setPhase('battle');
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

      {phase === 'battle' && <BattleGame onVictory={handleVictory} />}

      {phase === 'final' && <FinalScreen minScoreReached={bonusReached} />}

      {(phase === 'intro' || phase === 'lessons') && (
        <Mascot message={mascotMsg} show={showBubble} onToggle={() => setShowBubble((s) => !s)} />
      )}
    </div>
  );
}
