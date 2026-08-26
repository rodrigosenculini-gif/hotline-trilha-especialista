import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BOARD_STOPS, THEMES, XP_PER_BLOCK } from '../../data/board';
import { MASCOT_IMG } from '../../data/config';
import MountainScene from './MountainScene';
import { trackResposta } from '../../lib/track';

const themeById = Object.fromEntries(THEMES.map((t) => [t.id, t]));

// phase: 'mountain-overview' -> 'question' -> 'feedback' -> 'blocks' -> (avança ponto) ... -> 'complete'
export default function BoardScene({ onFinish, onXpGain, sessaoId, vendedor, modoRevisao = false, stopIndexInicial = 0, apenasEssaEtapa = false, onRegistrarPasso }) {
  const [stopIndex, setStopIndex] = useState(stopIndexInicial);
  const [phase, setPhase] = useState(modoRevisao ? 'question' : 'run-door');
  const [blockIndex, setBlockIndex] = useState(0);
  const [answered, setAnswered] = useState(null);
  const [acertou, setAcertou] = useState(null);

  const stop = BOARD_STOPS[stopIndex];
  const theme = themeById[stop.theme];
  const isLastStop = stopIndex === BOARD_STOPS.length - 1;
  const isLastBlock = blockIndex === stop.blocks.length - 1;

  useEffect(() => {
    onRegistrarPasso?.(`Montanha · ${stop.number}. ${stop.title}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stopIndex]);

  useEffect(() => {
    if (phase === 'run-door') {
      const t = setTimeout(() => setPhase('mountain-overview'), 1400);
      return () => clearTimeout(t);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'mountain-overview') {
      const t = setTimeout(() => setPhase('question'), 2200);
      return () => clearTimeout(t);
    }
  }, [phase]);

  function handleAnswer(i) {
    if (answered !== null) return;
    setAnswered(i);
    const correto = i === stop.question.correct;
    setAcertou(correto);
    trackResposta({
      sessaoId,
      vendedor,
      origem: 'montanha',
      etapaId: stop.id,
      pergunta: stop.question.text,
      respostaDada: stop.question.options[i],
      respostaCorreta: stop.question.options[stop.question.correct],
      acertou: correto,
    });
    setTimeout(() => setPhase('feedback'), 900);
  }

  function handleFeedbackContinue() {
    setAnswered(null);
    setAcertou(null);
    setPhase('blocks');
    setBlockIndex(0);
  }

  function handleNextBlock() {
    onXpGain(XP_PER_BLOCK);
    if (!isLastBlock) {
      setBlockIndex((b) => b + 1);
      return;
    }
    if (apenasEssaEtapa) {
      onFinish();
      return;
    }
    if (isLastStop) {
      setPhase('complete');
      return;
    }
    setStopIndex((s) => s + 1);
    setPhase('question');
  }

  const zoomedOut = phase === 'mountain-overview';

  if (phase === 'complete') {
    return (
      <div className={`board-scene ${theme.bg}`}>
        <MountainScene currentIndex={stopIndex} zoomedOut={false} />
        <motion.div className="finale-scene" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <motion.div
            className="finale-card"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <img src={MASCOT_IMG} alt="Esquentadinho" />
            <h2 style={{ marginBottom: 12 }}>{modoRevisao ? 'Revisão concluída!' : 'Trilha concluída!'}</h2>
            <p>{modoRevisao ? 'Agora sim, bora continuar de onde parou!' : 'Agora você está pronto para os Jogos Do Especialista! Se prepare!'}</p>
            <button className="block-next" onClick={onFinish}>{modoRevisao ? 'Continuar →' : 'Entrar na masmorra →'}</button>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`board-scene ${theme.bg}`}>
      {phase === 'run-door' ? (
        <div className="scenery scenery-partida">
          <div className="door">🚪</div>
          <motion.img
            src={MASCOT_IMG}
            alt="Esquentadinho"
            className="run-through"
            initial={{ left: '-10%', opacity: 0 }}
            animate={{ left: '55%', opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </div>
      ) : (
        <MountainScene currentIndex={stopIndex} zoomedOut={zoomedOut} />
      )}

      <AnimatePresence mode="wait">
        {phase === 'mountain-overview' && (
          <motion.div
            key="overview-title"
            className="stop-title-big"
            style={{ position: 'absolute', bottom: 40, left: 0, right: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {modoRevisao ? 'Vamos rever esse ponto 🔎' : 'A trilha te espera. Bora subir! 🏔️'}
          </motion.div>
        )}

        {phase === 'question' && (
          <motion.div
            key={`q-${stop.id}`}
            className="block-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="block-card"
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="eyebrow" style={{ marginBottom: 10 }}>
                <span className="dash" />{stop.number}. {stop.title}
              </div>
              <h3>{stop.question.text}</h3>
              <div style={{ marginTop: 14 }}>
                {stop.question.options.map((opt, i) => {
                  let cls = 'q-opt';
                  if (answered !== null) {
                    if (i === stop.question.correct) cls += ' correct';
                    else if (i === answered) cls += ' wrong';
                  }
                  return (
                    <button key={i} className={cls} disabled={answered !== null} onClick={() => handleAnswer(i)}>
                      {opt}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}

        {phase === 'feedback' && (
          <motion.div
            key={`fb-${stop.id}`}
            className="block-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="block-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{ textAlign: 'center' }}
            >
              <div style={{ fontSize: 40, marginBottom: 10 }}>{acertou ? '🎉' : '💡'}</div>
              <h3 style={{ color: acertou ? 'var(--amber)' : '#fff' }}>
                {acertou ? 'Isso mesmo, acertou!' : 'Que pena, não foi dessa vez'}
              </h3>
              <p>
                {acertou
                  ? 'Vamos ver mais sobre esse assunto.'
                  : 'Mas vamos analisar melhor para entender tudo!'}
              </p>
              <button className="block-next" onClick={handleFeedbackContinue}>Continuar →</button>
            </motion.div>
          </motion.div>
        )}

        {phase === 'blocks' && (
          <motion.div
            key={`blocks-${stop.id}-${blockIndex}`}
            className="block-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="block-card"
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="block-progress">
                {stop.blocks.map((_, i) => (
                  <span key={i} className={`block-dot ${i <= blockIndex ? 'active' : ''}`} />
                ))}
              </div>
              <h3>{stop.blocks[blockIndex].heading}</h3>
              <p
                style={modoRevisao ? { fontSize: 15.5, lineHeight: 1.75 } : undefined}
                dangerouslySetInnerHTML={{
                  __html: modoRevisao && stop.blocks[blockIndex].detalhado
                    ? stop.blocks[blockIndex].detalhado
                    : stop.blocks[blockIndex].body,
                }}
              />
              <button className="block-next" onClick={handleNextBlock}>
                {isLastBlock && isLastStop ? (modoRevisao ? 'Concluir revisão →' : 'Concluir trilha →') : isLastBlock ? 'Seguir viagem →' : 'Continuar →'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
