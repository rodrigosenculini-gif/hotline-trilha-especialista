// Envia cada resposta (montanha ou masmorra) pra ficar registrada no
// Supabase, só pra análise interna — nunca bloqueia nem aparece pro usuário.
export function trackResposta({ sessaoId, vendedor, origem, etapaId, pergunta, respostaDada, respostaCorreta, acertou, motivoEspecial }) {
  try {
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessao_id: sessaoId,
        vendedor: vendedor || null,
        origem,
        etapa_id: etapaId,
        pergunta,
        resposta_dada: respostaDada,
        resposta_correta: respostaCorreta,
        acertou,
        motivo_especial: motivoEspecial || null,
      }),
    }).catch(() => {});
  } catch {
    // nunca deixa isso quebrar a experiência
  }
}

export function getSessaoId() {
  try {
    let id = sessionStorage.getItem('trilha_sessao_id');
    if (!id) {
      id = (crypto.randomUUID ? crypto.randomUUID() : `sessao-${Date.now()}-${Math.random().toString(36).slice(2)}`);
      sessionStorage.setItem('trilha_sessao_id', id);
    }
    return id;
  } catch {
    return `sessao-${Date.now()}`;
  }
}
