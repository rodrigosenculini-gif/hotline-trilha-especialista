import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Versão nativa (sem iframe) dos playbooks, direto dentro da trilha —
// permite rastrear com certeza quando cada produto foi visto, e mostrar
// tarjas de destaque reais (sem depender de comunicação entre sites).
const PRODUTOS = [
  {
    id: 'clt',
    nome: 'Crédito CLT',
    icone: '💼',
    resumo: 'Empréstimo consignado pra quem tem carteira assinada.',
    pontos: [
      'Pode ser crédito novo ou refinanciamento (troco), se o cliente já tem crédito ativo.',
      'Desconto direto em folha — parcelas saem do salário.',
      'Comece sempre pelo benefício/valor, nunca pela burocracia.',
      'Frase-chave: "Consegui uma condição pra você e vou te mostrar como aproveitar."',
    ],
  },
  {
    id: 'refin',
    nome: 'Refinanciamento CLT',
    icone: '🔄',
    resumo: 'Reorganiza o contrato ativo do cliente e libera um troco.',
    pontos: [
      'NÃO é um empréstimo novo — é a reorganização do contrato ativo.',
      'Sempre existe troco: esse é o principal atrativo pro cliente.',
      'Venda primeiro o troco, explique depois que não é crédito novo.',
      'Frase-chave: "Não é um empréstimo novo. É o refinanciamento do crédito que você já tem."',
    ],
  },
  {
    id: 'energia',
    nome: 'Empréstimo Conta de Luz',
    icone: '💡',
    resumo: 'Crédito com parcela embutida na fatura de energia.',
    pontos: [
      'Pagamento vem junto com a conta de luz, sem boleto extra.',
      'Aprovação mais fácil — a conta de luz serve como garantia (bom pra negativados).',
      'Sempre confirme a titularidade da conta antes de seguir.',
      'Sempre avise sobre o risco de corte de energia em caso de não pagamento.',
    ],
  },
  {
    id: 'fgts',
    nome: 'FGTS Saque-Aniversário',
    icone: '🏦',
    resumo: 'Antecipação de até 5 parcelas do próprio FGTS do cliente.',
    pontos: [
      'É antecipação do dinheiro que já é do cliente, não um empréstimo novo.',
      'Sem parcela mensal — desconta direto do saldo do FGTS a cada aniversário.',
      'Ótimo pra negativados: não há consulta ao SPC/Serasa.',
      'Carência de 90 dias após aderir ao Saque-Aniversário.',
    ],
  },
  {
    id: 'trabalhador',
    nome: 'Crédito do Trabalhador',
    icone: '📱',
    resumo: 'e-Consignado contratado 100% pela Carteira de Trabalho Digital.',
    pontos: [
      'Contratação centralizada pelo app CTPS Digital, sem convênio prévio.',
      'Margem de até 35% da remuneração líquida do trabalhador.',
      'Cliente compara até 100 propostas e tem 24h pra escolher a melhor.',
      'Garantias (FGTS, verbas rescisórias) são opcionais e reduzem a taxa.',
    ],
  },
];

export default function PlaybookNative({ onContinuar }) {
  const [abertoId, setAbertoId] = useState(null);
  const [vistos, setVistos] = useState([]);

  const todosVistos = vistos.length >= PRODUTOS.length;
  const proximoNaoVisto = PRODUTOS.find((p) => !vistos.includes(p.id));

  function abrir(p) {
    setAbertoId(p.id);
    setVistos((v) => (v.includes(p.id) ? v : [...v, p.id]));
  }

  return (
    <div className="board-scene theme-galaxia" style={{ padding: '24px', overflowY: 'auto' }}>
      <div className="stop-title-big" style={{ marginBottom: 6 }}>Antes da masmorra, dá uma olhada nos nossos produtos</div>
      <p style={{ color: 'var(--muted, #b8b0a0)', marginBottom: 18, textAlign: 'center' }}>
        {todosVistos ? 'Você já viu todos! Pode seguir pra masmorra.' : `Clique em cada produto pra ver os detalhes (${vistos.length}/${PRODUTOS.length} vistos)`}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, maxWidth: 900, width: '100%' }}>
        {PRODUTOS.map((p) => {
          const visto = vistos.includes(p.id);
          const ehProximo = !visto && proximoNaoVisto?.id === p.id;
          return (
            <motion.button
              key={p.id}
              onClick={() => abrir(p)}
              className="block-card"
              style={{
                cursor: 'pointer',
                textAlign: 'left',
                border: visto ? '2px solid #79a98a' : ehProximo ? '2px solid var(--amber)' : '1px solid var(--line)',
                position: 'relative',
              }}
              whileHover={{ y: -3 }}
            >
              {ehProximo && (
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  style={{ position: 'absolute', top: -26, left: '50%', transform: 'translateX(-50%)', fontSize: 20 }}
                >
                  👇
                </motion.div>
              )}
              <div style={{ fontSize: 30, marginBottom: 6 }}>{p.icone}</div>
              <h3 style={{ fontSize: 15 }}>{p.nome}</h3>
              <p style={{ fontSize: 12.5, marginTop: 4 }}>{p.resumo}</p>
              {visto && <div style={{ marginTop: 8, fontSize: 11, color: '#79a98a' }}>✓ Visto</div>}
            </motion.button>
          );
        })}
      </div>

      <button
        className="block-next"
        style={{ marginTop: 22, opacity: todosVistos ? 1 : 0.45, cursor: todosVistos ? 'pointer' : 'not-allowed' }}
        onClick={onContinuar}
        disabled={!todosVistos}
      >
        {todosVistos ? 'Já revisei todos, seguir para a masmorra →' : `Veja mais ${PRODUTOS.length - vistos.length} produto(s) pra liberar`}
      </button>

      <AnimatePresence>
        {abertoId && (
          <div className="block-overlay" onClick={() => setAbertoId(null)}>
            <motion.div
              className="block-card"
              style={{ maxWidth: 520 }}
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              {(() => {
                const p = PRODUTOS.find((x) => x.id === abertoId);
                return (
                  <>
                    <div style={{ fontSize: 34, marginBottom: 6 }}>{p.icone}</div>
                    <h3>{p.nome}</h3>
                    <ul style={{ marginTop: 10, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {p.pontos.map((pt, i) => (
                        <li key={i} style={{ fontSize: 13.5 }}>{pt}</li>
                      ))}
                    </ul>
                    <button className="block-next" style={{ marginTop: 16 }} onClick={() => setAbertoId(null)}>Entendi →</button>
                  </>
                );
              })()}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
