// Cada pergunta tem um campo `dificuldade` (1 = mais fácil, 5 = mais difícil).
// O buildGameQuestions() usa isso pra garantir que a masmorra sempre progrida
// do mais fácil pro mais difícil (nível 1 no primeiro fantasma, nível 5 no
// último) — mas a ORDEM das perguntas dentro de cada nível continua
// embaralhada a cada partida, então nunca é a mesma sequência duas vezes.
export const QUESTIONS = [
  { q: 'Ao receber um novo atendimento, qual deve ser sua primeira ação?', options: ['Enviar de cara uma proposta fechada.', 'Verificar o histórico da conversa e entender o contexto do cliente.', 'Pedir logo os documentos pessoais.', 'Perguntar de novo tudo que ele já respondeu.'], correct: 1, dificuldade: 1 },
  { q: 'Um cliente já conversou com a IA antes de chegar até você. O que deve ser feito?', options: ['Recomeçar o atendimento do zero.', 'Deixar de lado o que já foi dito antes.', 'Usar o histórico como contexto e evitar repetir perguntas já respondidas.', 'Encerrar e pedir pra ele voltar depois.'], correct: 2, dificuldade: 1 },
  { q: 'Qual é a sequência correta da jornada de atendimento?', options: ['Cadastro, depois oferta, depois contexto, depois encerramento.', 'Contextualização, apresentação, oferta, cadastro, cross sell e encerramento.', 'Oferta primeiro, depois contexto, depois cadastro.', 'Apresentação, cadastro e encerramento direto.'], correct: 1, dificuldade: 2 },
  { q: 'Durante a apresentação ao cliente, o vendedor deve:', options: ['Só pedir os documentos dele.', 'Se apresentar, mostrar disponibilidade e seguir com o atendimento.', 'Mandar uma proposta pronta na hora.', 'Esperar ele fazer a primeira pergunta.'], correct: 1, dificuldade: 1 },
  { q: 'O que é Cross Sell?', options: ['Passar o atendimento pra outra pessoa.', 'Oferecer um produto complementar que faça sentido pro perfil do cliente.', 'Fechar uma proposta em andamento.', 'Ligar de volta pro cliente depois.'], correct: 1, dificuldade: 1 },
  { q: 'Um cliente não possui saldo suficiente para antecipar o FGTS. Qual atitude é mais adequada?', options: ['Encerrar o atendimento ali mesmo.', 'Só avisar que não deu aprovação.', 'Verificar se ele tem perfil pra Crédito CLT ou Empréstimo na Conta de Luz.', 'Pedir pra ele voltar em outro dia.'], correct: 2, dificuldade: 2 },
  { q: 'Qual destas atitudes aumenta as chances de conversão?', options: ['Responder o cliente rapidamente.', 'Deixar as dúvidas dele de lado.', 'Só responder quando ele insistir bastante.', 'Mandar só mensagens automáticas prontas.'], correct: 0, dificuldade: 1 },
  { q: 'Durante uma negociação, o mais importante é:', options: ['Mostrar o benefício de contratar com a gente, entendendo a necessidade do cliente e indicando a solução mais adequada.', 'Convencer o cliente de qualquer jeito.', 'Apresentar todos os produtos de uma vez.', 'Focar só em falar sobre os juros.'], correct: 0, dificuldade: 3 },
  { q: 'O cliente diz: "Vou pensar". Qual é a melhor resposta?', options: ['Encerrar o atendimento por ali.', 'Perguntar se ficou alguma dúvida que você possa esclarecer antes.', 'Insistir pra ele fechar na hora.', 'Deixar a mensagem sem resposta.'], correct: 1, dificuldade: 2 },
  { q: 'Um atendimento profissional deve ter:', options: ['Linguagem clara, educada e organizada.', 'Bastante abreviação no texto.', 'Um tom mais de gíria e informal.', 'Só respostas em áudio.'], correct: 0, dificuldade: 1 },
  { q: 'Qual é a melhor forma de comunicar informações importantes?', options: ['Só por áudio, pra ser mais rápido.', 'De preferência por texto, deixando o histórico organizado.', 'Só por ligação telefônica.', 'Em mensagens bem curtas e picadas.'], correct: 1, dificuldade: 1 },
  { q: 'Se precisar consultar uma informação antes de responder ao cliente, você deve:', options: ['Demorar pra responder sem avisar nada.', 'Avisar que está verificando e que já retorna.', 'Deixar a mensagem dele sem resposta.', 'Encerrar o atendimento por enquanto.'], correct: 1, dificuldade: 1 },
  { q: 'Durante o cadastro, o vendedor deve:', options: ['Confirmar com cuidado todos os dados do cliente.', 'Preencher os dados sem conferir nada.', 'Pedir só o telefone dele.', 'Pular etapas pra ir mais rápido.'], correct: 0, dificuldade: 2 },
  { q: 'Ao finalizar um atendimento, é recomendado:', options: ['Só parar de responder as mensagens.', 'Agradecer o contato, explicar os próximos passos e se colocar à disposição.', 'Encerrar sem avisar o cliente.', 'Pedir novos documentos antes de sair.'], correct: 1, dificuldade: 1 },
  { q: 'Qual das atitudes abaixo NÃO é esperada de um vendedor?', options: ['Fazer follow-up com os clientes.', 'Procurar clientes que não responderam.', 'Deixar atendimentos antigos de lado.', 'Acompanhar as propostas em andamento.'], correct: 2, dificuldade: 2 },
  { q: 'O Especialista em Crédito também deve:', options: ['Acompanhar propostas e fazer os retornos.', 'Atender só clientes novos.', 'Trabalhar só com ligação.', 'Fazer só a parte de cadastro.'], correct: 0, dificuldade: 2 },
  { q: 'Qual produto é indicado para um trabalhador com carteira assinada e margem consignável disponível?', options: ['Empréstimo na Conta de Luz.', 'Crédito CLT.', 'Só o FGTS mesmo.', 'Nenhum desses produtos.'], correct: 1, dificuldade: 2 },
  { q: 'Para contratar a Antecipação do Saque FGTS, o cliente precisa:', options: ['Ter aderido ao Saque-Aniversário e autorizado o banco no app do FGTS.', 'Só ter carteira assinada.', 'Só ter conta em algum banco.', 'Ser aposentado pelo INSS.'], correct: 0, dificuldade: 2 },
  { q: 'Em qual plataforma são realizados a maior parte dos atendimentos da Hotline?', options: ['Pelo CRM interno.', 'Pelo Chatwoot.', 'Direto numa planilha.', 'Pelo WhatsApp Business puro.'], correct: 1, dificuldade: 1 },
  { q: 'Qual é um dos principais objetivos da Hotline?', options: ['Ser só a maior em número de vendas.', 'Oferecer atendimento humanizado, soluções inovadoras e gerar resultado pros clientes e parceiros.', 'Trabalhar com um único produto só.', 'Atender só por telefone.'], correct: 1, dificuldade: 1 },
  // Fluxograma de vendas, cenários A a D
  { q: 'Cliente diz que não recebeu o valor combinado, mas a conta informada está incorreta. Qual o próximo passo correto?', options: ['Encerrar o atendimento e orientar a abrir de novo depois.', 'Pedir o extrato da conta e checar erro de digitação antes de refazer.', 'Repassar direto pro apoio do banco sem checar nada.', 'Esperar o cliente perceber o erro sozinho.'], correct: 1, dificuldade: 3 },
  { q: 'No Cenário B, o cliente entende o produto mas acha o valor liberado muito baixo. Antes de negociar, o que deve ser verificado primeiro?', options: ['Se existe valor maior disponível em outro banco.', 'Se o cliente tem outro número de telefone.', 'Se o cliente mora perto de uma agência.', 'Se ele já indicou algum amigo antes.'], correct: 0, dificuldade: 3 },
  { q: 'Um cliente não responde há mais de 1 hora após o primeiro follow-up. Segundo o fluxo de atendimento, a ação recomendada é:', options: ['Esperar até o fim do dia sem novo contato.', 'Ligação mais um áudio, reforçando a urgência da oportunidade.', 'Bloquear o número do cliente.', 'Mandar só um emoji de resposta.'], correct: 1, dificuldade: 3 },
  { q: 'No Cenário D (cliente estressado), quando o motivo é uma dúvida não esclarecida, o fluxo indica:', options: ['Encerrar o atendimento ali mesmo.', 'Voltar ao Cenário A e tratar a dúvida na origem.', 'Ignorar o tom dele e repetir a oferta.', 'Transferir pra outro vendedor sem explicação.'], correct: 1, dificuldade: 3 },
  { q: 'Na finalização do atendimento, quando o cliente está satisfeito mas a proposta não foi aprovada, o correto é:', options: ['Finalizar sem dar nenhum retorno.', 'Agradecer o contato, explicar o motivo e deixar o canal aberto.', 'Insistir pra ele aceitar outro produto.', 'Cobrar o cliente por ter perdido tempo.'], correct: 1, dificuldade: 3 },
  // Playbooks de produto
  { q: 'No Crédito CLT, aonde é feito o desconto do cliente?', options: ['Diretamente na folha de pagamento do cliente.', 'Diretamente na conta corrente do cliente, via débito automático mensal.', 'No boleto bancário, enviado todo mês pro endereço do cliente.', 'No cartão de crédito consignado vinculado à proposta.'], correct: 0, dificuldade: 4 },
  { q: 'O que é o Refinanciamento CLT?', options: ['A oportunidade de quitar um empréstimo já ativo, recebendo troco pra começar a pagar as parcelas novas — sem precisar de um contrato novo.', 'A abertura de um contrato totalmente novo, sem nenhuma relação com o empréstimo anterior.', 'A quitação do empréstimo anterior, mas sem direito a receber nenhum valor de troco.', 'Uma renegociação que só pode ser fechada presencialmente, numa agência do banco.'], correct: 0, dificuldade: 4 },
  { q: 'No Empréstimo na Conta de Luz, antes de seguir com a proposta, é indispensável confirmar:', options: ['Se o cliente tem outros empréstimos ativos.', 'A titularidade da conta de energia.', 'O horário de pico de consumo dele.', 'Se ele já foi cliente da Hotline antes.'], correct: 1, dificuldade: 2 },
  { q: 'Sobre a Antecipação do Saque-Aniversário do FGTS, o que é verdade?', options: ['Não há consulta ao SPC/Serasa.', 'Só pode ser feita uma única vez na vida.', 'Precisa de aval de um terceiro.', 'Só atende quem tem carteira assinada.'], correct: 0, dificuldade: 2 },
  { q: 'No Crédito do Trabalhador (e-consignado), a contratação é feita:', options: ['Só presencialmente numa agência.', '100% pela Carteira de Trabalho Digital (CTPS Digital).', 'Só por indicação de outro banco.', 'Só pra quem já é aposentado.'], correct: 1, dificuldade: 2 },
  // Específicas de Crédito CLT
  { q: 'No Crédito CLT, qual é o percentual máximo do salário do cliente que pode ser comprometido com o desconto em folha, se transformando em margem?', options: ['Até 20% do salário.', 'Até 35% do salário.', 'Até 50% do salário.', 'Não existe um limite definido.'], correct: 1, dificuldade: 4 },
  { q: 'No Crédito CLT, de quem depende a aprovação final da proposta?', options: ['Só da vontade do vendedor.', 'Do motor de crédito do banco parceiro e da margem disponível do cliente.', 'Da idade do cliente apenas.', 'Do tempo de conversa no chat.'], correct: 1, dificuldade: 4 },
  { q: 'No Crédito CLT, se o cliente não tem interesse pelo valor apresentado, qual NÃO é uma ação recomendada?', options: ['Perguntar o motivo da falta de interesse.', 'Tentar outro banco parceiro pra ele.', 'Ofertar outro produto que combine com o perfil.', 'Encerrar o contato sem tentar entender o motivo nem tentar negociar.'], correct: 3, dificuldade: 4 },
  { q: 'Qual é a taxa de juros mensal máxima instituída pelo governo pro Crédito CLT?', options: ['Até 4,98% ao mês.', 'Até 5,48% ao mês.', 'Até 4,48% ao mês.', 'Até 3,98% ao mês.'], correct: 0, dificuldade: 5 },
  { q: 'Qual é a data padrão do primeiro desconto do empréstimo na folha do cliente?', options: ['Oficialmente a partir de 60 dias da contratação, mas as empresas costumam começar o repasse já na próxima folha de pagamento.', 'Sempre exatamente 30 dias após a contratação, sem nenhuma exceção.', '90 dias após a assinatura, com repasse só a partir do mês seguinte a esse prazo.', 'Imediatamente, já na mesma folha de pagamento do mês em que foi contratado.'], correct: 0, dificuldade: 5 },
  { q: 'O que é o leilão do Crédito CLT?', options: ['É quando o cliente já solicitou uma simulação pela carteira de trabalho, e a Hotline consegue oferecer uma condição especial pra ele — dependendo da aprovação dos bancos.', 'Um leilão público, em tempo real, onde vários bancos disputam abertamente pelo cliente.', 'Uma simulação feita direto pelo aplicativo da Hotline, sem relação nenhuma com a carteira de trabalho.', 'Uma condição fixa e garantida pro cliente, independente da aprovação de qualquer banco.'], correct: 0, dificuldade: 5 },
  { q: 'Qual é a possibilidade real de o cliente conseguir um valor diferente do que já foi passado?', options: ['Muito baixa — porque depende da aprovação do banco, que já opera no limite da margem do cliente, e outros bancos podem simplesmente não aceitar a operação.', 'Alta, já que qualquer banco parceiro aceita reprocessar a simulação sem se importar com a margem.', 'Média — basta trocar de banco parceiro que o valor sempre fica maior.', 'Garantida, desde que o cliente peça formalmente uma revisão do valor.'], correct: 0, dificuldade: 5 },
  // Operacional
  { q: 'Qual é o processo operacional completo de um atendimento com venda?', options: ['Início na plataforma de atendimento – captação dos dados do cliente – cadastro no banco parceiro – acompanhamento do status – finalização com cross sell/agradecimento.', 'Início na plataforma de atendimento – captação dos dados do cliente – cadastro no banco parceiro – acompanhamento do status – não finalizar o atendimento, deixar o cliente.', 'Início na plataforma de atendimento – cadastro no banco parceiro direto, sem captar os dados do cliente antes – acompanhamento do status – finalização com cross sell/agradecimento.', 'Início na plataforma de atendimento – captação dos dados do cliente – acompanhamento do status – cadastro no banco parceiro só no final – finalização com cross sell/agradecimento.'], correct: 0, dificuldade: 5 },
];

// Fases do jogo: fantasma, cor, gosma (ataque) e cenário da masmorra
export const GHOST_STAGES = [
  { name: 'Fantasma da Enrolação', emoji: '👻', color: '#8fd3ff', slimeEmoji: '💧', slimeColor: '#5fb8e8', darkness: 0, img: '/images/monstro-1.png', bg: '/images/cenario-1.png' },
  { name: 'Sombra do Silêncio', emoji: '🫥', color: '#b48fff', slimeEmoji: '🟣', slimeColor: '#8a5fe8', darkness: 0.12, img: '/images/monstro-2.png', bg: '/images/cenario-2.png' },
  { name: 'Assombração Apressada', emoji: '💨', color: '#ff9a5a', slimeEmoji: '🔥', slimeColor: '#e86f2b', darkness: 0.22, img: '/images/monstro-3.png', bg: '/images/cenario-3.png' },
  { name: 'Espectro Grosseiro', emoji: '😠', color: '#ff5a7a', slimeEmoji: '🟥', slimeColor: '#e82b52', darkness: 0.32, img: '/images/monstro-4.png', bg: '/images/cenario-4.png' },
  { name: 'Fantasma Desatento', emoji: '🌀', color: '#8fffb0', slimeEmoji: '🟢', slimeColor: '#2be874', darkness: 0.42, img: '/images/monstro-extra.png', bg: '/images/cenario-extra.png' },
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

// Agrupa as perguntas por `dificuldade` (1→5) e embaralha só DENTRO de cada
// grupo, depois concatena os grupos em ordem crescente. Isso garante que a
// masmorra sempre progrida do nível mais fácil pro mais difícil — a última
// pergunta da partida é sempre do nível 5 — mas sem repetir a mesma
// sequência de perguntas em toda partida.
export function buildGameQuestions() {
  const porNivel = {};
  for (const q of QUESTIONS) {
    const nivel = q.dificuldade || 1;
    if (!porNivel[nivel]) porNivel[nivel] = [];
    porNivel[nivel].push(q);
  }
  const niveis = Object.keys(porNivel).map(Number).sort((a, b) => a - b);
  const ordenadoPorDificuldade = niveis.flatMap((n) => shuffle(porNivel[n]));

  return ordenadoPorDificuldade.map((q) => {
    const order = shuffle(q.options.map((_, i) => i));
    return { text: q.q, options: order.map((i) => q.options[i]), correct: order.indexOf(q.correct), dificuldade: q.dificuldade };
  });
}

// Fase especial só pras perguntas bônus/reforço (as que vêm de erro ou
// revisão na trilha da montanha) — sempre o mesmo cenário/monstro, pra
// diferenciar visualmente que é um desafio extra.
export const BONUS_STAGE = {
  name: 'Boss Final',
  emoji: '👹',
  color: '#e8c96a',
  slimeEmoji: '⚡',
  slimeColor: '#e8c96a',
  darkness: 0.45,
  img: '/images/monstro-boss.png',
  bg: '/images/cenario-5.png',
};

// Divide as fases igualmente entre as perguntas BASE (sem contar as
// bônus/reforço, que têm fase própria) — evita uma fase absorver quase
// todas as perguntas quando o total varia. Como buildGameQuestions() já
// devolve as perguntas ordenadas por dificuldade crescente, essa divisão
// posicional acaba coincidindo com a progressão de dificuldade também.
export function ghostStageForIndex(qIndex, totalBase = QUESTIONS.length) {
  const porFase = Math.max(1, Math.ceil(totalBase / GHOST_STAGES.length));
  const stageIndex = Math.min(Math.floor(qIndex / porFase), GHOST_STAGES.length - 1);
  return GHOST_STAGES[stageIndex];
}
