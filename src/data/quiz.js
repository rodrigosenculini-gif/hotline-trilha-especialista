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
  // Novas — fluxograma de vendas, cenários A a D
  { q: 'Cliente diz que não recebeu o valor combinado, mas a conta informada está incorreta. Qual o próximo passo correto?', options: ['Encerrar o atendimento e orientar a abrir um novo depois.', 'Pedir o extrato da conta informada e verificar erros de digitação antes de refazer.', 'Repassar direto para o apoio do banco sem checar nada.', 'Ignorar e aguardar o cliente perceber o erro sozinho.'], correct: 1 },
  { q: 'No Cenário B, o cliente entende o produto mas acha o valor liberado muito baixo. Antes de negociar, o que deve ser verificado primeiro?', options: ['Se existe possibilidade de valor maior em outro banco.', 'Se o cliente tem outro número de telefone.', 'Se o cliente mora perto de uma agência.', 'Se o cliente já indicou algum amigo.'], correct: 0 },
  { q: 'Um cliente não responde há mais de 1 hora após o primeiro follow-up. Segundo o fluxo de atendimento, a ação recomendada é:', options: ['Esperar até o fim do dia sem novo contato.', 'Ligação + áudio, reforçando a urgência da oportunidade.', 'Bloquear o número do cliente.', 'Enviar apenas um emoji.'], correct: 1 },
  { q: 'No Cenário D (cliente estressado), quando o motivo é uma dúvida não esclarecida, o fluxo indica:', options: ['Encerrar o atendimento imediatamente.', 'Voltar ao Cenário A e tratar a dúvida na origem.', 'Ignorar o tom do cliente e repetir a oferta.', 'Transferir para outro vendedor sem explicação.'], correct: 1 },
  { q: 'Na finalização do atendimento, quando o cliente está satisfeito mas a proposta não foi aprovada, o correto é:', options: ['Finalizar sem dar retorno nenhum.', 'Agradecer o contato, explicar o motivo e deixar o canal aberto para retorno.', 'Insistir para ele aceitar outro produto na força.', 'Cobrar o cliente por ter perdido tempo.'], correct: 1 },
  // Novas — playbooks de produto
  { q: 'No Crédito CLT, se o cliente já tem um empréstimo ativo, a operação passa a ser chamada de:', options: ['Crédito novo.', 'Refinanciamento (troco).', 'FGTS.', 'Cross sell.'], correct: 1 },
  { q: 'No Refinanciamento CLT, qual é a ordem certa pra apresentar a proposta ao cliente?', options: ['Troco → parcela nova → parcela atual.', 'Parcela atual → nova condição → troco.', 'Só falar do troco, sem citar parcelas.', 'Parcela nova → troco → parcela atual.'], correct: 1 },
  { q: 'No Empréstimo na Conta de Luz, antes de seguir com a proposta, é indispensável confirmar:', options: ['Se o cliente tem outros empréstimos.', 'A titularidade da conta de energia.', 'O horário de pico de consumo.', 'Se o cliente já é cliente Hotline.'], correct: 1 },
  { q: 'Sobre a Antecipação do Saque-Aniversário do FGTS, o que é verdade?', options: ['Não há consulta ao SPC/Serasa.', 'Só pode ser feita uma vez na vida.', 'Precisa de aval de terceiros.', 'Só atende quem tem carteira assinada.'], correct: 0 },
  { q: 'No Crédito do Trabalhador (e-consignado), a contratação é feita:', options: ['Só presencialmente em agência.', '100% pela Carteira de Trabalho Digital (CTPS Digital).', 'Apenas por indicação de outro banco.', 'Só para quem já é aposentado.'], correct: 1 },
];

// Fases do jogo: fantasma, cor, gosma (ataque) e cenário da masmorra
// trocam juntos a cada 4 perguntas, ficando progressivamente mais obscuro.
export const GHOST_STAGES = [
  { name: 'Fantasma da Enrolação', emoji: '👻', color: '#8fd3ff', slimeEmoji: '💧', slimeColor: '#5fb8e8', darkness: 0 },
  { name: 'Sombra do Silêncio', emoji: '🫥', color: '#b48fff', slimeEmoji: '🟣', slimeColor: '#8a5fe8', darkness: 0.2 },
  { name: 'Assombração Apressada', emoji: '💨', color: '#ff9a5a', slimeEmoji: '🔥', slimeColor: '#e86f2b', darkness: 0.38 },
  { name: 'Espectro Grosseiro', emoji: '😠', color: '#ff5a7a', slimeEmoji: '🟥', slimeColor: '#e82b52', darkness: 0.55 },
  { name: 'Fantasma Desatento', emoji: '🌀', color: '#8fffb0', slimeEmoji: '🟢', slimeColor: '#2be874', darkness: 0.7 },
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
