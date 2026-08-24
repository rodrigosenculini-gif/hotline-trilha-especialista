export const QUESTIONS = [
  { q: 'Ao receber um novo atendimento, qual deve ser sua primeira ação?', options: ['Enviar imediatamente uma proposta.', 'Verificar o histórico da conversa e entender o contexto do cliente.', 'Solicitar documentos.', 'Perguntar novamente todas as informações.'], correct: 1 },
  { q: 'Um cliente já conversou com a IA antes de chegar até você. O que deve ser feito?', options: ['Recomeçar todo o atendimento.', 'Ignorar o histórico.', 'Utilizar o histórico como contexto e evitar repetir perguntas já respondidas.', 'Encerrar o atendimento.'], correct: 2 },
  { q: 'Qual é a sequência correta da jornada de atendimento?', options: ['Cadastro → Oferta → Contextualização → Encerramento.', 'Contextualização → Apresentação → Oferta → Cadastro → Cross Sell → Encerramento.', 'Oferta → Contextualização → Cadastro.', 'Apresentação → Cadastro → Encerramento.'], correct: 1 },
  { q: 'Durante a apresentação ao cliente, o vendedor deve:', options: ['Apenas pedir os documentos.', 'Se apresentar, demonstrar disponibilidade e dar continuidade ao atendimento.', 'Enviar uma proposta imediatamente.', 'Esperar o cliente fazer perguntas.'], correct: 1 },
  { q: 'O que é Cross Sell?', options: ['Transferir o atendimento.', 'Oferecer um produto complementar ou alternativo que faça sentido para o perfil do cliente.', 'Encerrar uma proposta.', 'Fazer uma ligação para o cliente.'], correct: 1 },
  { q: 'Um cliente não possui saldo suficiente para antecipar o FGTS. Qual atitude é mais adequada?', options: ['Encerrar o atendimento.', 'Informar apenas que não foi aprovado.', 'Verificar se ele possui perfil para Crédito CLT ou Empréstimo na Conta de Luz.', 'Pedir que volte outro dia.'], correct: 2 },
  { q: 'Qual destas atitudes aumenta as chances de conversão?', options: ['Responder rapidamente.', 'Ignorar dúvidas.', 'Responder apenas quando o cliente insistir.', 'Enviar apenas mensagens prontas.'], correct: 0 },
  { q: 'Durante uma negociação, o mais importante é:', options: ['Convencer o cliente a qualquer custo.', 'Entender sua necessidade e apresentar a solução mais adequada.', 'Oferecer todos os produtos de uma vez.', 'Falar apenas sobre juros.'], correct: 1 },
  { q: 'O cliente diz: "Vou pensar". Qual é a melhor resposta?', options: ['Encerrar o atendimento.', 'Perguntar se existe alguma dúvida que possa ajudá-lo a esclarecer antes da decisão.', 'Insistir para fechar imediatamente.', 'Ignorar a mensagem.'], correct: 1 },
  { q: 'Um atendimento profissional deve ter:', options: ['Linguagem clara, educada e organizada.', 'Muitas abreviações.', 'Gírias.', 'Apenas áudios.'], correct: 0 },
  { q: 'Qual é a melhor forma de comunicar informações importantes?', options: ['Apenas por áudio.', 'Preferencialmente por texto, deixando o histórico organizado.', 'Apenas por ligação.', 'Apenas por mensagens curtas.'], correct: 1 },
  { q: 'Se precisar consultar uma informação antes de responder ao cliente, você deve:', options: ['Demorar para responder sem avisar.', 'Informar que está verificando e retornará em seguida.', 'Ignorar a mensagem.', 'Encerrar o atendimento.'], correct: 1 },
  { q: 'Durante o cadastro, o vendedor deve:', options: ['Confirmar cuidadosamente todas as informações do cliente.', 'Preencher os dados sem confirmar.', 'Solicitar apenas o telefone.', 'Pular etapas para ganhar tempo.'], correct: 0 },
  { q: 'Ao finalizar um atendimento, é recomendado:', options: ['Apenas parar de responder.', 'Agradecer o contato, esclarecer os próximos passos e se colocar à disposição.', 'Encerrar sem avisar.', 'Pedir novos documentos.'], correct: 1 },
  { q: 'Qual das atitudes abaixo NÃO é esperada de um vendedor?', options: ['Fazer follow-up.', 'Procurar clientes sem resposta.', 'Ignorar atendimentos antigos.', 'Acompanhar propostas.'], correct: 2 },
  { q: 'O Especialista em Crédito também deve:', options: ['Acompanhar propostas e realizar retornos.', 'Atender somente novos clientes.', 'Trabalhar apenas com ligações.', 'Fazer apenas cadastros.'], correct: 0 },
  { q: 'Qual produto é indicado para um trabalhador com carteira assinada e margem consignável disponível?', options: ['Empréstimo na Conta de Luz.', 'Crédito CLT.', 'FGTS somente.', 'Nenhum.'], correct: 1 },
  { q: 'Para contratar a Antecipação do Saque FGTS, o cliente precisa:', options: ['Ter aderido ao Saque-Aniversário e autorizar o banco no aplicativo FGTS.', 'Apenas possuir carteira assinada.', 'Apenas ter conta em banco.', 'Ser aposentado.'], correct: 0 },
  { q: 'Em qual plataforma são realizados a maior parte dos atendimentos da Hotline?', options: ['CRM.', 'Chatwoot.', 'Excel.', 'WhatsApp Business.'], correct: 1 },
  { q: 'Qual é um dos principais objetivos da Hotline?', options: ['Ser apenas a maior empresa em número de vendas.', 'Oferecer atendimento humanizado, soluções inovadoras e gerar resultados para clientes e parceiros.', 'Trabalhar apenas com um único produto.', 'Atender exclusivamente por telefone.'], correct: 1 },
];

// Fases do jogo: o fantasma (e o cenário) trocam a cada 4 perguntas,
// ficando progressivamente mais obscuro.
export const GHOST_STAGES = [
  { name: 'Fantasma da Enrolação', color: '#8fd3ff', slime: '#5fb8e8', darkness: 0 },
  { name: 'Sombra do Silêncio', color: '#b48fff', slime: '#8a5fe8', darkness: 0.18 },
  { name: 'Assombração Apressada', color: '#ff9a5a', slime: '#e86f2b', darkness: 0.34 },
  { name: 'Espectro Grosseiro', color: '#ff5a7a', slime: '#e82b52', darkness: 0.5 },
  { name: 'Fantasma Desatento', color: '#8fffb0', slime: '#2be874', darkness: 0.64 },
];

export const HOT_HIT_LINES = [
  'ah não, cuidado!',
  'da próxima, mais atenção!',
  'ei, estou perdendo minhas vidas aqui!',
  'vamos, você consegue!',
];

export const MAX_LIVES = 4;

export function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function buildGameQuestions() {
  return shuffle(QUESTIONS).map((q) => {
    const order = shuffle(q.options.map((_, i) => i));
    return { text: q.q, options: order.map((i) => q.options[i]), correct: order.indexOf(q.correct) };
  });
}

export function ghostStageForIndex(qIndex) {
  const stageIndex = Math.min(Math.floor(qIndex / 4), GHOST_STAGES.length - 1);
  return GHOST_STAGES[stageIndex];
}
