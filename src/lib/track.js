// Envia cada resposta (montanha ou masmorra) direto pro Supabase, sem
// precisar de nenhuma variável de ambiente/projeto intermediário — usa a
// chave pública (anon), que é segura de expor no navegador. A tabela só
// aceita INSERT de usuários anônimos (sem leitura), então isso não expõe
// nada sensível.
const SUPABASE_URL = 'https://mvzqywdmhdylsuclrqrg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12enF5d2RtaGR5bHN1Y2xycXJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAzMTkzMDksImV4cCI6MjA0NTg5NTMwOX0.KG_bZF3Kd4LkX2uOHoBRa8uSXXO7W2NQCo_TIh1VBHw';

export function trackResposta({ sessaoId, vendedor, origem, etapaId, pergunta, respostaDada, respostaCorreta, acertou, motivoEspecial }) {
  try {
    fetch(`${SUPABASE_URL}/rest/v1/trilha_respostas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Prefer: 'return=minimal',
      },
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
