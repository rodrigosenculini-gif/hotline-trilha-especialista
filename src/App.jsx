import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Intro from './components/lesson/Intro';
import LessonView from './components/lesson/LessonView';
import BoardScene from './components/board/BoardScene';
import BattleGame from './components/battle/BattleGame';
import FinalScreen from './components/FinalScreen';
import Mascot from './components/mascot/Mascot';
import PlaybookNative from './components/PlaybookNative';
import { FLAT_LESSONS } from './data/lessons';
import { BOARD_STOPS } from './data/board';
import { LOGO_IMG, MASCOT_GREETING, MASCOT_IMG, MASCOT_TIPS } from './data/config';
import { getSessaoId } from './lib/track';

const MIN_SCORE_FOR_BONUS = 14; // de 20 perguntas
const PLAYBOOK_URL = 'https://hotline-playbook.vercel.app';

const PROGRESSO_KEY = 'trilha_progresso_v1';

// Fases transitórias (animações/telas de passagem) não fazem sentido pra
// retomar exatamente nelas — ao restaurar, caem numa fase estável equivalente.
const FASE_RESTAURAVEL = {
  'door-to-battle': 'battle',
};

function carregarProgresso() {
  try {
    const raw = localStorage.getItem(PROGRESSO_KEY);
    if (!raw) return null;
    const dados = JSON.parse(raw);
    if (dados.phase) dados.phase = FASE_RESTAURAVEL[dados.phase] || dados.phase;
    return dados;
  } catch {
    return null;
  }
}

export default function App() {
  const progressoSalvo = useState(() => carregarProgresso())[0];

  // intro | lessons | board | trilha-escolha | trilha-revisao-lista | trilha-revisao-etapa
  // | playbook | door-to-battle | battle | pos-derrota-escolha | final
  const [phase, setPhase] = useState(progressoSalvo?.phase || 'intro');
  const [lessonIndex, setLessonIndex] = useState(progressoSalvo?.lessonIndex ?? 0);
  const [xp, setXp] = useState(progressoSalvo?.xp ?? 0);
  const [boardStopIndex, setBoardStopIndex] = useState(progressoSalvo?.boardStopIndex ?? 0);
  const [bonusReached, setBonusReached] = useState(false);
  const [mascotMsg, setMascotMsg] = useState(MASCOT_GREETING);
  const [showBubble, setShowBubble] = useState(true);
  const [sessaoId] = useState(() => getSessaoId());
  const [revisaoStopIndex, setRevisaoStopIndex] = useState(0);
  const [showMenu, setShowMenu] = useState(false);

  // parada(s) da montanha que erraram ou foram revisadas -> viram pergunta extra na masmorra
  const [stopsParaReforcar, setStopsParaReforcar] = useState(progressoSalvo?.stopsParaReforcar || []); // [{ stopId, motivo }]

  // usado só pra remontar o BattleGame do zero quando o usuário escolhe "refazer a masmorra"
  const [battleKey, setBattleKey] = useState(0);

  // histórico de passos já percorridos, pra alimentar o menu "onde eu já passei"
  const [passos, setPassos] = useState(progressoSalvo?.passos || [{ label: 'Início da trilha', fase: 'intro' }]);

  // Salva o progresso a cada mudança relevante, pra continuar de onde parou
  // se fechar/atualizar o navegador. Some sozinho quando a trilha termina.
  useEffect(() => {
    if (phase === 'final') {
      try { localStorage.removeItem(PROGRESSO_KEY); } catch { /* ignora */ }
      return;
    }
    try {
      localStorage.setItem(PROGRESSO_KEY, JSON.stringify({
        phase, lessonIndex, xp, boardStopIndex, stopsParaReforcar, passos,
      }));
    } catch { /* ignora */ }
  }, [phase, lessonIndex, xp, boardStopIndex, stopsParaReforcar, passos]);

  function registrarPasso(label, extra) {
    setPassos((p) => {
      if (p[p.length - 1]?.label === label) return p;
      return [...p, { label, ...extra }];
    });
  }

  function handleRespostaMontanha(stopId, acertou, emRevisao) {
    if (emRevisao || !acertou) {
      setStopsParaReforcar((prev) => {
        const motivo = emRevisao ? 'revisao' : 'erro-montanha';
        if (prev.some((p) => p.stopId === stopId && p.motivo === motivo)) return prev;
        return [...prev, { stopId, motivo }];
      });
    }
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

  // usuário perdeu a masmorra -> em vez de recarregar tudo, oferece escolha
  function handleGameOver() {
    setPhase('pos-derrota-escolha');
  }

  function handleRefazerMasmorra() {
    setBattleKey((k) => k + 1);
    setPhase('door-to-battle');
    setTimeout(() => setPhase('battle'), 1200);
  }

  function irParaPasso(p) {
    setShowMenu(false);
    if (p.fase === 'intro') { setPhase('intro'); return; }
    if (p.fase === 'lessons') { setLessonIndex(p.lessonIndex); setPhase('lessons'); return; }
    if (p.fase === 'playbook') { setPhase('playbook'); return; }
    if (p.fase === 'board' && typeof p.stopIndex === 'number') {
      setRevisaoStopIndex(p.stopIndex);
      setPhase('trilha-revisao-etapa');
      return;
    }
    // masmorra/cadastro final não têm retorno direto seguro — o menu serve
    // principalmente pra ver o que já foi percorrido
  }

  // O menu nunca aparece durante a masmorra (battle) — senão dá pra "espiar"
  // se a resposta certa foi acertada e voltar. Também não faz sentido durante
  // a transição da porta.
  const showHeader = ['intro', 'lessons', 'board', 'trilha-escolha', 'trilha-revisao-lista', 'trilha-revisao-etapa', 'playbook', 'pos-derrota-escolha'].includes(phase);

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
                  disabled={!['intro', 'lessons', 'playbook'].includes(p.fase) && typeof p.stopIndex !== 'number'}
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
          stopIndexInicial={boardStopIndex}
          onRegistrarPasso={(label, stopIndex) => {
            registrarPasso(label, { fase: 'board', stopIndex })
            if (typeof stopIndex === 'number') setBoardStopIndex(stopIndex)
          }}
          onRespostaMontanha={handleRespostaMontanha}
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
          onRespostaMontanha={handleRespostaMontanha}
        />
      )}

      {phase === 'playbook' && <PlaybookNative onContinuar={handlePlaybookContinuar} />}

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

      {phase === 'battle' && (
        <BattleGame
          key={battleKey}
          onVictory={handleVictory}
          onGameOver={handleGameOver}
          sessaoId={sessaoId}
          stopsParaReforcar={stopsParaReforcar}
        />
      )}

      {phase === 'pos-derrota-escolha' && (
        <div className="board-scene theme-partida">
          <div className="finale-scene">
            <motion.div className="finale-card" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
              <img src={MASCOT_IMG} alt="Esquentadinho" />
              <h2 style={{ marginBottom: 12 }}>Não foi dessa vez...</h2>
              <p>Quer rever alguma parte da trilha antes de tentar de novo, ou já quer refazer só a masmorra?</p>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 16, flexWrap: 'wrap' }}>
                <button className="nav-btn" onClick={() => setPhase('trilha-revisao-lista')}>🔎 Rever a trilha</button>
                <button className="nav-btn" onClick={() => setPhase('playbook')}>📘 Rever o playbook</button>
                <button className="block-next" onClick={handleRefazerMasmorra}>⚔️ Refazer só a masmorra</button>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {phase === 'final' && <FinalScreen minScoreReached={bonusReached} sessaoId={sessaoId} />}

      {(phase === 'intro' || phase === 'lessons') && (
        <Mascot message={mascotMsg} show={showBubble} onToggle={() => setShowBubble((s) => !s)} />
      )}
    </div>
  );
}
