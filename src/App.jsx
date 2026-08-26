import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Intro from './components/lesson/Intro';
import LessonView from './components/lesson/LessonView';
import BoardScene from './components/board/BoardScene';
import BattleGame from './components/battle/BattleGame';
import FinalScreen from './components/FinalScreen';
import Mascot from './components/mascot/Mascot';
import { FLAT_LESSONS } from './data/lessons';
import { BOARD_STOPS } from './data/board';
import { LOGO_IMG, MASCOT_GREETING, MASCOT_IMG, MASCOT_TIPS } from './data/config';
import { getSessaoId } from './lib/track';

const MIN_SCORE_FOR_BONUS = 14; // de 20 perguntas
const PLAYBOOK_URL = 'https://hotline-playbook.vercel.app';

export default function App() {
  // intro | lessons | board | trilha-escolha | trilha-revisao-lista | trilha-revisao-etapa
  // | playbook | door-to-battle | battle | final
  const [phase, setPhase] = useState('intro');
  const [lessonIndex, setLessonIndex] = useState(0);
  const [xp, setXp] = useState(0);
  const [bonusReached, setBonusReached] = useState(false);
  const [mascotMsg, setMascotMsg] = useState(MASCOT_GREETING);
  const [showBubble, setShowBubble] = useState(true);
  const [sessaoId] = useState(() => getSessaoId());
  const [revisaoStopIndex, setRevisaoStopIndex] = useState(0);

  // histórico de passos já percorridos, pra alimentar o menu "onde eu já passei"
  const [passos, setPassos] = useState([{ label: 'Início da trilha', fase: 'intro' }]);

  function registrarPasso(label, extra) {
    setPassos((p) => {
      if (p[p.length - 1]?.label === label) return p;
      return [...p, { label, ...extra }];
    });
  }

  const lesson = FLAT_LESSONS[lessonIndex];

  function goToLesson(idx) {
    setLessonIndex(idx);
    const l = FLAT_LESSONS[idx];
    setMascotMsg(MASCOT_TIPS[l.id] || 'Bora continuar!');
    setShowBubble(true);
    registrarPasso(`Lição · ${l.title}`, { fase: 'lessons', lessonIndex: idx });
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

  // fim da trilha principal (não revisão) -> pergunta se quer rever algo
  function handleBoardFinish() {
    setPhase('trilha-escolha');
  }

  function handleEscolherRever() {
    setPhase('trilha-revisao-lista');
  }

  function handleEscolherContinuar() {
    registrarPasso('Playbook dos produtos', { fase: 'playbook' });
    setPhase('playbook');
  }

  function handleEscolherTopicoRevisao(stopIdx) {
    setRevisaoStopIndex(stopIdx);
    setPhase('trilha-revisao-etapa');
  }

  function handleRevisaoEtapaFim() {
    setPhase('trilha-escolha');
  }

  function handlePlaybookContinuar() {
    setPhase('door-to-battle');
    setTimeout(() => {
      registrarPasso('Masmorra · Jogo dos fantasmas', { fase: 'battle' });
      setPhase('battle');
    }, 1500);
  }

  function handleVictory(correctCount) {
    setBonusReached(correctCount >= MIN_SCORE_FOR_BONUS);
    registrarPasso('Cadastro final', { fase: 'final' });
    setPhase('final');
  }

  function irParaPasso(p) {
    setShowMenu(false);
    if (p.fase === 'intro') { setPhase('intro'); return; }
    if (p.fase === 'lessons') { setLessonIndex(p.lessonIndex); setPhase('lessons'); return; }
    // demais fases (board/playbook/battle/final) não têm retorno direto seguro —
    // o menu serve principalmente pra ver o que já foi percorrido
  }

  const [showMenu, setShowMenu] = useState(false);

  const showHeader = phase === 'intro' || phase === 'lessons';

  return (
    <div className="app-shell">
      {showHeader && (
        <header className="app-header">
          <div className="brand">
            <img src={LOGO_IMG} alt="Hotline" />
            <span className="title">Trilha do Especialista</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button className="nav-btn" onClick={() => setShowMenu(true)}>☰ Meus passos</button>
            <div className="xp-badge">⭐ {xp} XP</div>
          </div>
        </header>
      )}

      {showMenu && (
        <div className="block-overlay" onClick={() => setShowMenu(false)}>
          <div className="block-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 420 }}>
            <h3 style={{ marginBottom: 12 }}>Seus passos até aqui</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 320, overflowY: 'auto' }}>
              {passos.map((p, i) => (
                <button
                  key={i}
                  className="nav-btn"
                  style={{ textAlign: 'left', justifyContent: 'flex-start' }}
                  onClick={() => irParaPasso(p)}
                  disabled={p.fase !== 'intro' && p.fase !== 'lessons'}
                >
                  {i + 1}. {p.label}
                </button>
              ))}
            </div>
            <button className="block-next" style={{ marginTop: 14 }} onClick={() => setShowMenu(false)}>Fechar</button>
          </div>
        </div>
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

      {phase === 'board' && (
        <BoardScene
          onFinish={handleBoardFinish}
          onXpGain={handleXpGain}
          sessaoId={sessaoId}
          onRegistrarPasso={(label) => registrarPasso(label, { fase: 'board' })}
        />
      )}

      {phase === 'trilha-escolha' && (
        <div className="board-scene theme-galaxia">
          <div className="finale-scene">
            <motion.div className="finale-card" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
              <img src={MASCOT_IMG} alt="Esquentadinho" />
              <h2 style={{ marginBottom: 12 }}>Antes de continuar...</h2>
              <p>Quer rever algum tópico da trilha, ou já pode seguir em frente?</p>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 16, flexWrap: 'wrap' }}>
                <button className="nav-btn" onClick={handleEscolherRever}>🔎 Rever um tópico</button>
                <button className="block-next" onClick={handleEscolherContinuar}>Continuar →</button>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {phase === 'trilha-revisao-lista' && (
        <div className="board-scene theme-partida">
          <div className="block-overlay">
            <div className="block-card" style={{ maxWidth: 460 }}>
              <h3 style={{ marginBottom: 12 }}>Qual tópico você quer rever?</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {BOARD_STOPS.map((s, i) => (
                  <button key={s.id} className="nav-btn" style={{ textAlign: 'left' }} onClick={() => handleEscolherTopicoRevisao(i)}>
                    {s.number}. {s.title}
                  </button>
                ))}
              </div>
              <button className="block-next" style={{ marginTop: 14 }} onClick={() => setPhase('trilha-escolha')}>Voltar</button>
            </div>
          </div>
        </div>
      )}

      {phase === 'trilha-revisao-etapa' && (
        <BoardScene
          onFinish={handleRevisaoEtapaFim}
          onXpGain={() => {}}
          sessaoId={sessaoId}
          modoRevisao
          apenasEssaEtapa
          stopIndexInicial={revisaoStopIndex}
        />
      )}

      {phase === 'playbook' && (
        <div className="board-scene theme-galaxia" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px' }}>
          <div className="stop-title-big" style={{ marginBottom: 12 }}>Antes da masmorra, dá uma olhada nos nossos produtos</div>
          <iframe
            src={PLAYBOOK_URL}
            title="Playbooks Hotline"
            style={{ width: '100%', maxWidth: 1100, flex: 1, border: 'none', borderRadius: 16, background: '#111416' }}
          />
          <button className="block-next" style={{ marginTop: 16 }} onClick={handlePlaybookContinuar}>Já revisei, seguir para a masmorra →</button>
        </div>
      )}

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

      {phase === 'battle' && <BattleGame onVictory={handleVictory} sessaoId={sessaoId} />}

      {phase === 'final' && <FinalScreen minScoreReached={bonusReached} />}

      {(phase === 'intro' || phase === 'lessons') && (
        <Mascot message={mascotMsg} show={showBubble} onToggle={() => setShowBubble((s) => !s)} />
      )}
    </div>
  );
}
