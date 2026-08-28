import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Versão nativa (sem iframe) dos playbooks — mesmo conteúdo completo do
// site original (hotline-playbook), só que embutido direto na trilha, o
// que permite rastrear com certeza quando cada produto foi visto e mostrar
// tarjas de destaque reais (sem depender de comunicação entre sites).
const PRODUTOS = [
  {
    id: 'clt',
    nome: 'Crédito CLT',
    icone: '💼',
    resumo: 'Empréstimo consignado para carteira assinada, 100% digital',
    fluxogramaInterativo: true,
    hero: [
      { label: 'Produto', value: 'Crédito CLT (novo, refin ou e-consignado)' },
      { label: 'Cliente', value: 'Carteira assinada (CLT)' },
      { label: 'Diferencial', value: 'Contratação 100% digital e desconto direto em folha' },
      { label: 'Objetivo', value: 'Fechar e encaminhar ao WhatsApp' },
    ],
    essencial: [
      { title: 'Desconto em folha', body: 'As parcelas saem direto do salário. Só entre em detalhes de burocracia se o cliente perguntar.' },
      { title: 'Depende da margem', body: 'A aprovação e o valor dependem da margem consignável disponível — até 35% do salário.' },
      { title: 'Contratação 100% digital', body: 'Tudo é feito com a gente pelo WhatsApp, sem precisar falar diretamente com o banco ou com a CTPS Digital.' },
      { title: 'Juros de até 4,98% ao mês', body: 'Taxa competitiva — vale reforçar isso quando o cliente comparar com outras opções.' },
      { title: 'Comece pelo benefício', body: 'Fale primeiro do valor/condição — nunca abra a conversa falando de burocracia ou prazo.' },
    ],
    duvidaFrequente: 'O desconto em folha é realizado mês a mês, porém o início dele é oficialmente a partir de 60 dias da contratação do empréstimo. Mas isso pode mudar de acordo com a empresa em que o cliente trabalha — grande parte das empresas começa a repassar os descontos logo no próximo holerite. Há dois momentos: entre o dia 1 e o dia 22, o desconto pode acontecer já no próximo mês; depois do dia 23 (virada de folha pelo RH), o desconto só vai acontecer a partir do mês seguinte ao próximo.',
    highlight: '"Consegui uma condição para você e vou te mostrar como aproveitar."',
    flow: ['1. Identifique · Origem do lead', '2. Pergunte · Resolva dúvidas do cliente', '3. Apresente · Valor disponível', '4. Negocie · Se houver objeção', '5. Finalize · Agradeça, oferte outros produtos, peça indicação.'],
    cenarios: [
      { title: 'Dúvida sobre o produto', body: 'Explique sobre o produto: um crédito novo disponível com desconto direto em folha de pagamento. Utilizando até 35% do salário do cliente, com taxas baixas e várias opções de bancos para aprovação. A aprovação depende do motor de crédito do banco parceiro.' },
      { title: 'Sem interesse — valor bom', body: 'Pergunte por que não tem interesse. Apresente as vantagens do crédito, dê mais informações sobre o produto, tente outro valor (pergunte quanto ele deseja), tente outro banco, ou oferte outro produto.' },
      { title: 'Sem interesse — valor baixo', body: 'Negocie prazo para tentar aumentar o valor. Tente em outro banco. Avalie cross-sell com outro produto se fizer sentido.' },
      { title: 'Interesse — reprovado', body: 'Não prometa nada. Explique que não foi dessa vez, agende um follow-up para quando surgirem novos limites, e ofertar outro produto.' },
      { title: 'Não respondeu', body: 'Ligue primeiro. Sem atender, aguarde 24h e mande WhatsApp com foto chamativa + áudio explicando o retorno.' },
      { title: 'Cliente estressado', body: 'Acalme e descubra o motivo real: dúvida (esclareça), valor (renegocie) ou "não quero mais" (entenda o porquê — depois de insistir, dê um tempo ao cliente; se ainda não quiser, não insista mais e deixe o canal aberto pra futuramente).' },
    ],
    negociacao: [
      { step: 'Apresente sem garantia primeiro', detail: 'Mostre a taxa padrão antes de complicar com garantias.' },
      { step: 'Ofereça a garantia se a taxa incomodar', detail: 'Verbas rescisórias ou FGTS reduzem a taxa — explique o trade-off com clareza.' },
      { step: 'Compare propostas', detail: 'Reforce que ele tem até 24h para comparar as ofertas antes de decidir.' },
    ],
    objections: [
      { q: '"É só desconto em folha, isso me prejudica?"', a: 'Não. É justamente por ser descontado em folha que a taxa costuma ser mais baixa que outras modalidades — sem boleto pra se preocupar.' },
      { q: '"O valor está baixo."', a: 'Posso verificar um prazo diferente pra tentar aumentar o valor disponível — mas isso muda a parcela.' },
      { q: '"Não tenho interesse."', a: 'Tudo bem. Só pra eu entender: é o valor, o prazo, ou você não precisa do crédito agora?' },
      { q: '"Vou pensar."', a: 'Claro! Ficou alguma dúvida específica que eu possa esclarecer antes da sua decisão?' },
    ],
    regrasOuro: [
      'Nunca prometa prazo de liberação.',
      'Foque na condição atual e na disponibilidade do valor.',
      'Só entre em detalhes de desconto em folha se o cliente perguntar.',
    ],
    checklist: [
      'Identifique o contexto/simulação',
      'Apresentei o valor antes do prazo',
      'Tentei negociar antes de perder o cliente',
      'Não prometi prazo de liberação',
      'Registrei o motivo caso ele tenha recusado',
      'fiz negociação',
      'fiz follow ups',
    ],
    leilao: {
      intro: 'O Leilão do Crédito CLT é uma oportunidade de captação de lead através de ferramentas disponíveis. A Carteira de Trabalho Digital dá a possibilidade do cliente fazer simulações fictícias — e quando faz isso, seus dados são enviados para nossa plataforma e conseguimos entrar em contato com ele para fazer a primeira abordagem.',
      obstaculos: [
        'Nem todos vão ser aprovados, depende dos bancos.',
        'São clientes novos — a maioria nunca entrou em contato com a Hotline, então pode chegar estressado no atendimento. Tudo precisa ser tratado com cautela.',
        'Algumas propostas nos bancos parceiros podem travar num status antes do pagamento: só é possível pagar a nossa quando as simulações que ele fez direto pela carteira de trabalho cessarem. Normalmente dura 24 horas, dependendo de quando ele chegou até a nossa plataforma.',
        'Dados do cliente podem estar incorretos.',
      ],
      saidas: [
        'Sempre há a possibilidade do cross sell. As regras e motores de crédito do banco (ou do próprio empréstimo) podem mudar — fidelize o cliente pra ter alternativas de tentativa, até mesmo num próximo momento, como no mês seguinte.',
        'Trate o cliente com cordialidade. Se estiver estressado, acalme-o — o que ele mais espera é resolução, principalmente vinda de você, vendedor.',
        'Sempre informe ao cliente que ele não deve ter simulações ativas na carteira de trabalho digital — se tiver, isso pode interferir no pagamento.',
        'Caso identifique erros nos dados, confirme com o cliente. Antes de mais nada, entenda se está falando com a pessoa correta.',
      ],
    },
  },
  {
    id: 'refin',
    nome: 'Refinanciamento CLT',
    icone: '🔄',
    resumo: 'Refinancia o contrato ativo e libera troco',
    hero: [
      { label: 'Produto', value: 'Refinanciamento CLT' },
      { label: 'Cliente', value: 'Já possui crédito ativo' },
      { label: 'Diferencial', value: 'Troco + facilidade online' },
      { label: 'Objetivo', value: 'Fechar e levar ao WhatsApp' },
    ],
    essencial: [
      { title: 'Não é um empréstimo novo', body: 'O cliente já tem um empréstimo ativo. O refinanciamento reorganiza esse contrato e libera um novo valor.' },
      { title: 'Sempre existe troco', body: 'O principal atrativo é o valor que pode ser liberado após o refinanciamento.' },
      { title: 'Pode melhorar a parcela', body: 'A proposta pode trazer uma parcela menor, conforme as condições disponíveis.' },
      { title: 'É uma condição específica', body: 'O banco disponibiliza o refinanciamento para determinados perfis de clientes.' },
    ],
    highlight: '"Não estou te oferecendo um empréstimo novo. É o refinanciamento do crédito que você já possui, com possibilidade de liberar um valor extra."',
    flow: ['1. Identifique · Nome + banco', '2. Contextualize · Crédito ativo', '3. Desperte · Troco disponível', '4. Mostre · Valores da proposta', '5. Leve · WhatsApp'],
    cenarios: [
      { title: 'Abertura da ligação', body: '"Oi, [NOME]! Aqui é [VENDEDORA], falo em nome do [BANCO]. Seu crédito ativo tem uma condição disponível para refinanciamento, com liberação de valor extra. Posso te explicar rapidinho?"' },
      { title: 'Cliente topa ouvir', body: '"Hoje você tem uma parcela de R$ [ATUAL]. Nessa condição, conseguimos refinanciar e liberar aproximadamente R$ [TROCO], com nova parcela de R$ [NOVA]."' },
      { title: 'Apresentação da proposta', body: 'Mostre em ordem: ① parcela atual → ② nova condição → ③ troco → ④ pergunta se o valor faz sentido hoje.' },
      { title: 'Cliente reclama do prazo', body: 'Explique primeiro o benefício da proposta atual. Só depois apresente a possibilidade de ajustar prazo (o valor liberado pode mudar).' },
    ],
    negociacao: [
      { step: 'Apresente a condição original', detail: 'É a condição prioritária — nunca comece já negociando.' },
      { step: 'Descubra a objeção', detail: 'Entenda o que realmente incomodou antes de tentar resolver.' },
      { step: 'Trabalhe o benefício', detail: 'Reforce o valor do troco e a nova condição de parcela.' },
      { step: 'Negocie se necessário', detail: 'Se for prazo/parcela, avalie uma condição alternativa.' },
      { step: 'Feche', detail: 'Cliente aceitou → WhatsApp → formalização.' },
    ],
    objections: [
      { q: '"Não quero fazer outro empréstimo."', a: 'Não é um empréstimo novo — é o refinanciamento do contrato que você já tem. O atual é quitado dentro da operação e a diferença vira o seu troco.' },
      { q: '"Quanto eu vou pegar?"', a: 'Na condição disponível hoje, o troco é de aproximadamente R$ X. Esse valor seria útil pra você?' },
      { q: '"Minha parcela vai aumentar?"', a: 'Hoje sua parcela é R$ X e nessa condição fica R$ Y — o que muda é o contrato e o valor que você recebe.' },
      { q: '"Não quero aumentar minha dívida."', a: 'Você não está pegando outro empréstimo por fora — o contrato existente entra no refinanciamento, e depois de quitar o saldo anterior, você recebe o valor adicional.' },
      { q: '"O prazo é muito grande."', a: 'Esse prazo é justamente o que permite chegar nesse valor de troco. Posso verificar outro prazo, mas o valor liberado pode mudar.' },
      { q: '"Não confio, pode ser golpe."', a: 'Você está certo em ter cuidado. Vou te mandar tudo pelo WhatsApp pra você conferir antes de qualquer formalização.' },
    ],
    regrasOuro: [
      'Venda primeiro o troco — o cliente quer saber quanto vai receber.',
      'Explique sempre que não é crédito novo (maior confusão do cliente).',
      'Nunca comece negociando — apresente a condição original primeiro.',
      'Prazo é uma objeção negociável, não uma promessa.',
      'Faça perguntas antes de tentar responder a uma objeção que não entendeu.',
      'Nunca prometa o que não controla, principalmente prazo de liberação.',
    ],
    checklist: [
      'Citei o banco', 'Expliquei que é refinanciamento', 'Mostrei o valor do troco', 'Mostrei a nova parcela',
      'Identifiquei a objeção real', 'Não prometi prazo de liberação', 'Levei o cliente para o WhatsApp', 'Enviei as condições por escrito',
    ],
  },
  {
    id: 'energia',
    nome: 'Empréstimo Conta de Luz',
    icone: '💡',
    resumo: 'Crédito com parcela na fatura de energia',
    hero: [
      { label: 'Produto', value: 'Empréstimo na Conta de Luz' },
      { label: 'Cliente', value: 'Titular da conta de energia' },
      { label: 'Diferencial', value: 'Aprovação facilitada, sem boleto' },
      { label: 'Objetivo', value: 'Assinatura digital + biometria' },
    ],
    essencial: [
      { title: 'Pagamento embutido na fatura', body: 'O valor contratado entra direto na conta de luz, sem boleto extra — parcelas fixas durante o contrato.' },
      { title: 'Aprovação mais fácil', body: 'O banco enxerga a conta de luz como garantia, o que facilita a aprovação até para negativados.' },
      { title: 'Titularidade é obrigatória', body: 'O contrato precisa estar no nome de quem está solicitando o crédito.' },
      { title: 'Valores e prazos', body: 'Geralmente de R$ 400 a R$ 4.000, parcelado de 3 a 24 meses, conforme perfil e distribuidora.' },
    ],
    highlight: '"Você tem um dinheiro disponível garantido pelo seu histórico de energia. O pagamento é facilitado — vem junto com a conta."',
    flow: ['1. Fatura · Enviar conta recente', '2. Análise · Perfil e consumo', '3. Proposta · Valor e prazo', '4. Assinatura · Contrato + biometria', '5. Liberação · Em até 24h'],
    cenarios: [
      { title: 'Dúvida sobre como funciona', body: 'Explique que o pagamento é embutido na conta de luz, sem boleto extra. Confirme se a conta está no nome do cliente — o desconto começa na fatura seguinte.' },
      { title: 'Interesse — valor bom', body: 'Apresente valor e prazo. Aceitou → enviar link de assinatura. Não aceitou → negociação.' },
      { title: 'Interesse — valor baixo', body: 'Aumente o prazo para tentar elevar o valor disponível.' },
      { title: 'Não aprovado', body: 'Explique que a análise é baseada no histórico da fatura e sugira follow-up.' },
      { title: '"Não quero mexer na conta de luz"', body: 'Explique que é a única forma de pagamento, mas que as parcelas são diluídas em até 24 meses.' },
      { title: '"A taxa está muito alta"', body: 'Trabalhe a negociação: condição com menor CET (parcela maior) ou prazo maior (parcela menor, custo total maior).' },
    ],
    negociacao: [
      { step: 'Condição com menor CET', detail: 'Parcela pode ser maior, mas custo total menor.' },
      { step: 'Ajustar o prazo', detail: 'Baixa a parcela, mas aumenta o custo total — sempre checando se cabe no orçamento do cliente.' },
      { step: 'Regra principal', detail: 'Não assuste com juros. Foque no valor da "parcela extra" que vai aparecer na conta de luz.' },
    ],
    objections: [
      { q: '"Isso vai aumentar minha conta de luz pra sempre?"', a: 'Não — é uma parcela fixa durante o prazo contratado. Depois que quita, a conta volta ao normal.' },
      { q: '"E se eu não pagar a conta?"', a: 'É importante saber: como a parcela vem na fatura, o não pagamento pode levar ao corte de energia — por isso o valor da parcela precisa caber no seu orçamento.' },
      { q: '"A taxa está muito alta."', a: 'Posso verificar uma condição com prazo diferente para reduzir a parcela — vamos comparar as opções?' },
      { q: '"Tenho restrição no CPF, consigo?"', a: 'Sim, a aprovação aqui é facilitada porque a garantia é o histórico da sua conta de luz, não a consulta ao CPF.' },
    ],
    regrasOuro: [
      'Nunca cobre taxas antecipadas ou peça senhas — isso é golpe.',
      'Sempre informe o risco de corte de energia em caso de não pagamento.',
      'Confirme a titularidade da conta antes de seguir com a proposta.',
      'Não é possível novo contrato enquanto houver um ativo na mesma unidade consumidora.',
    ],
    checklist: [
      'Confirmei a titularidade da conta de energia', 'Expliquei que o pagamento vem na fatura',
      'Alertei sobre o risco de corte em caso de não pagamento', 'Apresentei valor antes de falar de taxa',
      'Enviei o link de assinatura com biometria', 'Confirmei que não há outro contrato ativo na mesma unidade',
    ],
  },
  {
    id: 'fgts',
    nome: 'FGTS Saque-Aniversário',
    icone: '🏦',
    resumo: 'Antecipação de até 5 parcelas do fundo',
    hero: [
      { label: 'Produto', value: 'Antecipação do Saque-Aniversário' },
      { label: 'Cliente', value: 'Aderiu ao Saque-Aniversário' },
      { label: 'Diferencial', value: 'Sem parcela mensal, sem SPC/Serasa' },
      { label: 'Objetivo', value: 'Simular e assinar digitalmente' },
    ],
    essencial: [
      { title: 'Dinheiro que já é do cliente', body: 'É a antecipação de parcelas futuras do próprio FGTS — não é um empréstimo novo pago do bolso.' },
      { title: 'Sem parcela mensal', body: 'O pagamento é debitado automaticamente do saldo do FGTS a cada aniversário — não pesa na renda.' },
      { title: 'Ótimo para negativados', body: 'Não há consulta ao SPC/Serasa — o saldo do FGTS é a garantia.' },
      { title: 'Novas regras 2025/2026', body: 'Parcela entre R$ 100 e R$ 500, até 5 parcelas (3 a partir de nov/2026) e carência de 90 dias após adesão.' },
    ],
    highlight: '"Você tem um dinheiro parado no FGTS e eu consegui liberar ele hoje pra você, sem pagar parcela mensal e sem mexer no seu salário."',
    flow: ['1. Adesão · Saque-Aniversário no app', '2. Carência · 90 dias', '3. Autorização · Consulta ao saldo', '4. Simulação · Valor disponível', '5. Assinatura · Contrato digital'],
    cenarios: [
      { title: 'Dúvida sobre o produto', body: 'Explique que é antecipação do Saque-Aniversário. Se ainda não aderiu, oriente a adesão no app e avise sobre a carência de 90 dias.' },
      { title: 'Interesse — valor bom', body: 'Apresente a condição e o prazo, reforçando que não há parcela mensal. Aceitou → assinatura digital. Não aceitou → negociação.' },
      { title: 'Interesse — valor baixo', body: 'Se abaixo de R$ 100, lembre que essa é a parcela mínima — tente aumentar o prazo disponível.' },
      { title: 'Sem saldo suficiente', body: 'Explique o limite de R$ 500 por parcela e sugira follow-up para quando o saldo aumentar.' },
      { title: '"Não quero mexer no meu dinheiro"', body: 'Explique que é uma antecipação — troca de dívida cara por juros mais baixos, não uma perda.' },
      { title: '"Tenho medo de perder o emprego"', body: 'Explique com cautela: em demissão sem justa causa, ele recebe a multa de 40% e o saldo do saque-aniversário fica retido.' },
    ],
    negociacao: [
      { step: 'Condição original', detail: 'Menor prazo, menor custo total — sempre a prioridade.' },
      { step: 'Aumentar o prazo', detail: 'Dilui o valor e aumenta o montante liberado, mas com CET maior.' },
      { step: 'Cross-sell', detail: 'Se já antecipou tudo, ofereça o Consignado CLT como alternativa.' },
    ],
    objections: [
      { q: '"Isso não vai comprometer meu salário?"', a: 'Não — o pagamento é descontado direto do saldo do FGTS, a cada aniversário. Seu salário não é afetado.' },
      { q: '"E se eu for demitido?"', a: 'Nesse caso você recebe a multa de 40% normalmente; o saldo do saque-aniversário fica retido até o fim do contrato.' },
      { q: '"Por que preciso esperar 90 dias?"', a: 'É uma exigência das novas regras após a adesão ao Saque-Aniversário — não depende de mim, é do próprio FGTS.' },
      { q: '"Vou perder meu FGTS todo?"', a: 'Não. Você só antecipa uma parte das parcelas futuras, dentro dos limites de R$ 100 a R$ 500 por parcela.' },
    ],
    regrasOuro: [
      'Nunca peça senha do app FGTS ou taxas antecipadas.',
      'Nunca prometa liberação em menos tempo do que os 90 dias de carência permitem.',
      'Sempre informe o limite de R$ 500 por parcela.',
      'Contratação só pode ser feita uma vez por ano — não prometa uma segunda rodada no mesmo período.',
    ],
    checklist: [
      'Confirmei se o cliente já aderiu ao Saque-Aniversário', 'Expliquei a carência de 90 dias, se aplicável',
      'Reforcei que não há parcela mensal', 'Expliquei o que acontece em caso de demissão',
      'Apresentei os limites de valor por parcela', 'Enviei o contrato para assinatura digital',
    ],
  },

];

function Secao({ titulo, children }) {
  return (
    <div style={{ marginTop: 18 }}>
      <p className="section-label" style={{ marginBottom: 8 }}>{titulo}</p>
      {children}
    </div>
  );
}

export default function PlaybookNative({ onContinuar }) {
  const [abertoId, setAbertoId] = useState(null);
  const [fluxoAberto, setFluxoAberto] = useState(false);
  const [fluxoNodeAberto, setFluxoNodeAberto] = useState(null);
  const [vistos, setVistos] = useState([]);

  const todosVistos = vistos.length >= PRODUTOS.length;
  const proximoNaoVisto = PRODUTOS.find((p) => !vistos.includes(p.id));
  const produtoAberto = PRODUTOS.find((x) => x.id === abertoId);
  const produtoFluxo = PRODUTOS.find((x) => x.fluxogramaInterativo);

  function abrir(p) {
    setAbertoId(p.id);
    setVistos((v) => (v.includes(p.id) ? v : [...v, p.id]));
  }

  return (
    <div className="board-scene theme-galaxia" style={{ padding: '24px', overflowY: 'auto' }}>
      <div className="stop-title-big" style={{ marginBottom: 6 }}>Antes da masmorra, dá uma olhada nos nossos produtos</div>
      <p style={{ color: '#b8b0a0', marginBottom: 18, textAlign: 'center' }}>
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
              style={{ cursor: 'pointer', textAlign: 'left', border: visto ? '2px solid #79a98a' : ehProximo ? '2px solid var(--amber)' : '1px solid var(--line)', position: 'relative' }}
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
        type="button"
        className="nav-btn"
        style={{ marginTop: 14, width: 260, maxWidth: '90%' }}
        onClick={() => { setFluxoNodeAberto(null); setFluxoAberto(true); }}
      >
        🗺️ Ver fluxograma navegável
      </button>

      <button
        className="block-next"
        style={{ marginTop: 14, opacity: todosVistos ? 1 : 0.45, cursor: todosVistos ? 'pointer' : 'not-allowed' }}
        onClick={onContinuar}
        disabled={!todosVistos}
      >
        {todosVistos ? 'Já revisei todos, seguir para a masmorra →' : `Veja mais ${PRODUTOS.length - vistos.length} produto(s) pra liberar`}
      </button>

      <AnimatePresence>
        {produtoAberto && (
          <div className="block-overlay" onClick={() => setAbertoId(null)} style={{ alignItems: 'flex-start', paddingTop: 40 }}>
            <motion.div
              className="block-card"
              style={{ maxWidth: 640, maxHeight: '85vh', overflowY: 'auto', textAlign: 'left' }}
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <div style={{ fontSize: 34, marginBottom: 4 }}>{produtoAberto.icone}</div>
              <h2 style={{ fontSize: 22 }}>{produtoAberto.nome}</h2>
              <p style={{ marginTop: 4 }}>{produtoAberto.resumo}</p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 8, marginTop: 14 }}>
                {produtoAberto.hero.map((h, i) => (
                  <div key={i} style={{ background: 'var(--bg-elev-2)', border: '1px solid var(--line)', borderRadius: 10, padding: '8px 10px' }}>
                    <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--amber)' }}>{h.label}</div>
                    <div style={{ fontSize: 13, marginTop: 2 }}>{h.value}</div>
                  </div>
                ))}
              </div>

              <Secao titulo="01 · O essencial">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
                  {produtoAberto.essencial.map((e, i) => (
                    <div key={i} style={{ background: 'var(--bg-elev-2)', border: '1px solid var(--line)', borderRadius: 10, padding: 10 }}>
                      <strong style={{ fontSize: 13 }}>{e.title}</strong>
                      <p style={{ fontSize: 12.5, marginTop: 4 }}>{e.body}</p>
                    </div>
                  ))}
                </div>
                {produtoAberto.duvidaFrequente && (
                  <div style={{ marginTop: 10, background: 'var(--bg-elev-2)', border: '1px solid var(--line)', borderRadius: 10, padding: 10 }}>
                    <strong style={{ fontSize: 12.5, color: 'var(--amber)' }}>Dúvida frequente</strong>
                    <p style={{ fontSize: 12.5, marginTop: 4 }}>{produtoAberto.duvidaFrequente}</p>
                  </div>
                )}
              </Secao>

              <Secao titulo="02 · Frase-chave">
                <p style={{ fontStyle: 'italic', color: 'var(--amber)', fontSize: 14 }}>{produtoAberto.highlight}</p>
              </Secao>

              <Secao titulo="03 · Fluxo de abordagem">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {produtoAberto.flow.map((f, i) => (
                    <div key={i} style={{ background: 'var(--bg-elev-2)', border: '1px solid var(--line)', borderRadius: 8, padding: '6px 10px', fontSize: 12 }}>{f}</div>
                  ))}
                </div>
              </Secao>

              <Secao titulo="04 · Cenários">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {produtoAberto.cenarios.map((c, i) => (
                    <div key={i} style={{ background: 'var(--bg-elev-2)', border: '1px solid var(--line)', borderRadius: 10, padding: 10 }}>
                      <strong style={{ fontSize: 13 }}>{c.title}</strong>
                      <p style={{ fontSize: 12.5, marginTop: 4 }}>{c.body}</p>
                    </div>
                  ))}
                </div>
              </Secao>

              <Secao titulo="05 · Negociação">
                <ol style={{ paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {produtoAberto.negociacao.map((n, i) => (
                    <li key={i} style={{ fontSize: 13 }}><strong>{n.step}</strong> — {n.detail}</li>
                  ))}
                </ol>
              </Secao>

              <Secao titulo="06 · Objeções">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {produtoAberto.objections.map((o, i) => (
                    <div key={i} style={{ background: 'var(--bg-elev-2)', border: '1px solid var(--line)', borderRadius: 10, padding: 10 }}>
                      <div style={{ fontSize: 13, color: 'var(--amber)' }}>{o.q}</div>
                      <p style={{ fontSize: 12.5, marginTop: 4 }}>{o.a}</p>
                    </div>
                  ))}
                </div>
              </Secao>

              <Secao titulo="07 · Regras de ouro">
                <ul style={{ paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {produtoAberto.regrasOuro.map((r, i) => <li key={i} style={{ fontSize: 13 }}>{r}</li>)}
                </ul>
              </Secao>

              {produtoAberto.leilao && (
                <Secao titulo="08 · Leilão">
                  <p style={{ fontSize: 13, marginBottom: 10 }}>{produtoAberto.leilao.intro}</p>
                  <strong style={{ fontSize: 12.5, color: 'var(--amber)' }}>Possíveis obstáculos</strong>
                  <ul style={{ paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6, marginTop: 6, marginBottom: 12 }}>
                    {produtoAberto.leilao.obstaculos.map((o, i) => <li key={i} style={{ fontSize: 13 }}>{o}</li>)}
                  </ul>
                  <strong style={{ fontSize: 12.5, color: 'var(--amber)' }}>Possíveis saídas</strong>
                  <ul style={{ paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6, marginTop: 6 }}>
                    {produtoAberto.leilao.saidas.map((s, i) => <li key={i} style={{ fontSize: 13 }}>{s}</li>)}
                  </ul>
                </Secao>
              )}

              <Secao titulo={`${produtoAberto.leilao ? '09' : '08'} · Checklist final`}>
                <ul style={{ paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {produtoAberto.checklist.map((c, i) => <li key={i} style={{ fontSize: 13 }}>☐ {c}</li>)}
                </ul>
              </Secao>

              <button className="block-next" style={{ marginTop: 18 }} onClick={() => setAbertoId(null)}>Entendi →</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {fluxoAberto && produtoFluxo && (
          <div className="block-overlay" onClick={() => setFluxoAberto(false)} style={{ alignItems: 'flex-start', paddingTop: 40 }}>
            <motion.div
              className="block-card"
              style={{ maxWidth: 640, maxHeight: '85vh', overflowY: 'auto', textAlign: 'left' }}
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <h2>{produtoFluxo.icone} Fluxograma — {produtoFluxo.nome}</h2>
              <p style={{ fontSize: 13, color: '#b8b0a0' }}>Clique em cada etapa pra ver o que fazer</p>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 20, gap: 4 }}>
                <div className="fluxo-node fluxo-node-start">Lead chega</div>
                <div className="fluxo-linha" />
                <div className="fluxo-node fluxo-node-start">Qual o cenário?</div>
                <div className="fluxo-linha" />
                <div className="fluxo-grid">
                  {produtoFluxo.cenarios.map((c, i) => {
                    const aberto = fluxoNodeAberto === i;
                    return (
                      <div key={i} className="fluxo-branch">
                        <div className="fluxo-conector-topo" />
                        <button
                          type="button"
                          className={`fluxo-node fluxo-node-cenario ${aberto ? 'aberto' : ''}`}
                          onClick={() => setFluxoNodeAberto(aberto ? null : i)}
                        >
                          <span className="fluxo-node-num">{i + 1}</span>
                          {c.title}
                        </button>
                        {aberto && (
                          <motion.div
                            className="fluxo-detalhe"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                          >
                            <p>{c.body}</p>
                          </motion.div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <button className="block-next" style={{ marginTop: 18 }} onClick={() => setFluxoAberto(false)}>Fechar</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
