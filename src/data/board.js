// Tabuleiro baseado no Fluxograma de Vendas — dividido em 5 temas visuais.
// Cada "stop" da trilha tem: 1 pergunta (com correlação ao conteúdo da intro)
// e vários blocos curtos de informação (um recorte por bloco, não parágrafos).

export const THEMES = [
  { id: 'partida', label: 'Partida', bg: 'theme-partida' },
  { id: 'praia', label: 'Praia', bg: 'theme-praia' },
  { id: 'autodromo', label: 'Autódromo', bg: 'theme-autodromo' },
  { id: 'nuvens', label: 'Nas nuvens', bg: 'theme-nuvens' },
  { id: 'galaxia', label: 'Galáxia', bg: 'theme-galaxia' },
];

export const XP_PER_BLOCK = 10;

export const BOARD_STOPS = [
  {
    id: 'inicio-atendimento',
    theme: 'partida',
    number: 1,
    title: 'Início do atendimento',
    question: {
      text: 'O lead chega até você. Qual deve ser o seu primeiro passo?',
      options: ['Enviar uma proposta na hora', 'Fazer uma saudação completa e cordial', 'Pedir os documentos'],
      correct: 1,
    },
    blocks: [
      { heading: 'Lead chega ao vendedor', body: 'O atendimento começa quando um lead chega até você — muitas vezes já passou pela IA ou por uma Landing Page.' },
      { heading: 'Saudação completa', body: 'Faça uma saudação cordial. É o primeiro contato humano do cliente com a Hotline.' },
      { heading: 'Conecta com a intro', body: 'Lembra da <b>Jornada de um atendimento</b>? Esse é o passo 1: Contextualização — entender de onde o cliente veio antes de responder.' },
    ],
  },
  {
    id: 'identificar-cenario',
    theme: 'praia',
    number: 2,
    title: 'Identificar cenário',
    question: {
      text: 'Um cliente some no meio da conversa e não responde mais. Isso é qual cenário?',
      options: ['Cenário A — Dúvida', 'Cenário C — Não respondeu', 'Cenário D — Estressado'],
      correct: 1,
    },
    blocks: [
      { heading: 'Quatro cenários possíveis', body: 'Todo atendimento se encaixa em um destes: dúvida, não se interessou pelo valor, não respondeu, ou está estressado.' },
      { heading: 'Por que identificar primeiro', body: 'Saber o cenário certo evita que você use a abordagem errada e perca a venda por um mal-entendido.' },
    ],
  },
  {
    id: 'cenario-a',
    theme: 'praia',
    number: 3,
    title: 'Cenário A — Cliente com dúvida',
    question: {
      text: 'Cliente diz que já contratou antes e agora quer o contrato. O que fazer?',
      options: ['Ignorar o pedido', 'Enviar o contrato', 'Encerrar o atendimento'],
      correct: 1,
    },
    blocks: [
      { heading: 'Dúvida sobre o produto', body: 'Informe sobre o produto, entenda o que o cliente quer e sane a dúvida antes de seguir.' },
      { heading: 'Já contratou antes', body: 'Quer o contrato → envie o contrato. Tem dúvida sobre desconto/quitação → informe. Sem dúvida → finalize.' },
      { heading: 'Não recebeu o valor', body: 'Peça o extrato recente e confirme se a conta está correta antes de acionar o apoio do banco.' },
      { heading: 'Conecta com a intro', body: 'Isso é <b>Negociação</b> na prática: entender a necessidade antes de agir.' },
    ],
  },
  {
    id: 'cenario-b',
    theme: 'autodromo',
    number: 4,
    title: 'Cenário B — Não se interessou pelo valor',
    question: {
      text: 'Cliente acha o valor liberado muito baixo. Qual a melhor atitude?',
      options: ['Verificar outro banco e simular de novo', 'Encerrar o atendimento', 'Insistir no mesmo valor'],
      correct: 0,
    },
    blocks: [
      { heading: 'Dúvida operacional', body: 'Informe juros, margem e regras do produto — e acalme o cliente sobre o funcionamento.' },
      { heading: 'Valor "ruim"', body: 'Pouco: veja outro banco e refaça a simulação. Muito: mostre o porquê o valor maior faz sentido.' },
      { heading: 'Conecta com a intro', body: 'Vale o exemplo de <b>Benefícios, não só produto</b>: "as taxas costumam ser mais acessíveis" pesa mais que só falar de juros.' },
    ],
  },
  {
    id: 'cenario-c',
    theme: 'autodromo',
    number: 5,
    title: 'Cenário C — Cliente não respondeu',
    question: {
      text: 'Já se passaram +30 minutos sem resposta. Qual o próximo passo?',
      options: ['Esperar até o fim do dia', 'Fazer uma ligação', 'Enviar 10 mensagens seguidas'],
      correct: 1,
    },
    blocks: [
      { heading: 'Primeiro sinal (10–20 min)', body: 'Envie um áudio avisando que vai seguir com o atendimento — mostra cuidado sem ser invasivo.' },
      { heading: 'Escalada (+30min a +3h)', body: 'Ligação, depois ligação + áudio. Se não atender, retome por áudio e explique a urgência.' },
      { heading: 'Final do dia', body: 'Última ligação. Se não atender, avise que o atendimento vai encerrar por hoje, e programe follow ups.' },
    ],
  },
  {
    id: 'cenario-d',
    theme: 'nuvens',
    number: 6,
    title: 'Cenário D — Cliente estressado',
    question: {
      text: 'Cliente estressado por causa do valor liberado. O que fazer primeiro?',
      options: ['Voltar ao Cenário B (valor)', 'Discutir com o cliente', 'Ignorar até ele se acalmar'],
      correct: 0,
    },
    blocks: [
      { heading: 'Descubra o motivo', body: 'Se é dúvida → volte ao Cenário A. Se é valor → volte ao Cenário B.' },
      { heading: 'Estresse geral', body: 'Acalme o cliente, siga o atendimento normalmente e, se precisar, faça uma ligação.' },
    ],
  },
  {
    id: 'finalizacao',
    theme: 'galaxia',
    number: 7,
    title: 'Finalização do atendimento',
    question: {
      text: 'Cliente ficou satisfeito, mas a proposta não foi aprovada. O que fazer?',
      options: ['Só finalizar sem avisar nada', 'Agradecer, explicar o motivo e deixar canal aberto', 'Cobrar o cliente pela demora'],
      correct: 1,
    },
    blocks: [
      { heading: 'Cliente satisfeito?', body: 'Sim → finalize com sucesso. Não → deixe em aberto para follow up.' },
      { heading: 'Follow up', body: 'Negociação, nova simulação ou oferta de outro produto, conforme o caso.' },
      { heading: 'Encerramento', body: 'Agradeça o contato e deixe o canal aberto — mesmo sem fechar negócio.' },
    ],
  },
];
