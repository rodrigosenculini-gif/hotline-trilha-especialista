// Registra respostas dadas pelo usuario (trilha da montanha + masmorra)
// numa tabela do Supabase, so para acompanhamento/analise interna.
// Nunca e mostrado pro usuario.
import { Pool } from 'pg';

let pool;
function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.POSTGRES_URL,
      ssl: { rejectUnauthorized: false },
    });
  }
  return pool;
}

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

export default async function handler(req, res) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Metodo nao permitido' });

  try {
    const { sessao_id, vendedor, origem, etapa_id, pergunta, resposta_dada, resposta_correta, acertou, motivo_especial } = req.body || {};
    if (!sessao_id || !origem || !etapa_id) {
      return res.status(400).json({ error: 'Campos obrigatorios faltando (sessao_id, origem, etapa_id)' });
    }
    const client = getPool();
    await client.query(
      `insert into trilha_respostas
        (sessao_id, vendedor, origem, etapa_id, pergunta, resposta_dada, resposta_correta, acertou, motivo_especial)
       values ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
      [sessao_id, vendedor || null, origem, etapa_id, pergunta || null, resposta_dada ?? null, resposta_correta ?? null, acertou ?? null, motivo_especial || null]
    );
    return res.status(200).json({ ok: true });
  } catch (e) {
    // nunca deve travar a experiencia do usuario por causa disso
    return res.status(200).json({ ok: false, error: e.message });
  }
}
