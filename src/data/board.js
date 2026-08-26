// Tabuleiro baseado no Fluxograma de Vendas — dividido em 5 temas visuais.
// Cada "stop" da trilha tem: 1 pergunta (com correlação ao conteúdo da intro)
// e vários blocos curtos de informação (um recorte por bloco, não parágrafos).
// Cada bloco também tem um "detalhado" — versão mais completa, usada no
// modo revisão (mesmo objetivo, mais fácil de entender).

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
      {
        heading: 'Lead chega ao vendedor',
        body: 'O atendimento começa quando um lead chega até você — muitas vezes já passou pela IA ou por uma Landing Page.',
        detalhado: 'Todo atendimento tem um começo: o <b>lead</b> (o cliente em potencial) chega até você. Isso pode acontecer de duas formas: <br>• Já passou pela <b>IA</b>, que fez o primeiro contato e coletou informações básicas.<br>• Veio direto de uma <b>Landing Page</b> (aquela página onde ele preencheu os dados).<br>De qualquer forma, é hora de você assumir a conversa como uma pessoa de verdade.',
      },
      {
        heading: 'Saudação completa',
        body: 'Faça uma saudação cordial. É o primeiro contato humano do cliente com a Hotline.',
        detalhado: 'Por que a saudação importa tanto? Porque, na maioria das vezes, você é a <b>primeira pessoa de verdade</b> com quem o cliente fala depois de conversar com um robô ou preencher um formulário. Uma saudação cordial e completa passa a mensagem: "agora você está sendo atendido por gente, e essa gente se importa". Evite mensagens secas ou automáticas — o tom aqui define a experiência inteira que vem depois.',
      },
      {
        heading: 'Conecta com a intro',
        body: 'Lembra da <b>Jornada de um atendimento</b>? Esse é o passo 1: Contextualização — entender de onde o cliente veio antes de responder.',
        detalhado: 'Voltando lá na <b>Jornada de um atendimento</b> (lição "Vender"): o primeiro passo se chama <b>Contextualização</b>. Antes de responder qualquer coisa, você precisa entender de onde esse cliente veio — se já teve contato com a IA, se veio de uma campanha específica, se já tem alguma proposta em andamento. Isso evita repetir perguntas que ele já respondeu e mostra que você está prestando atenção nele.',
      },
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
      {
        heading: 'Quatro cenários possíveis',
        body: 'Todo atendimento se encaixa em um destes: dúvida, não se interessou pelo valor, não respondeu, ou está estressado.',
        detalhado: 'Depois da saudação, o próximo passo é entender <b>em qual dos 4 cenários</b> o atendimento se encontra:<br>• <b>A — Dúvida:</b> o cliente tem uma pergunta sobre o produto.<br>• <b>B — Não se interessou pelo valor:</b> ele viu o valor liberado e achou pouco ou não gostou.<br>• <b>C — Não respondeu:</b> o cliente simplesmente sumiu da conversa.<br>• <b>D — Estressado:</b> ele está irritado ou insatisfeito com algo.<br>Identificar o cenário certo é o que guia toda a sua próxima ação.',
      },
      {
        heading: 'Por que identificar primeiro',
        body: 'Saber o cenário certo evita que você use a abordagem errada e perca a venda por um mal-entendido.',
        detalhado: 'Imagine tratar um cliente que só tem uma <b>dúvida simples</b> como se ele estivesse <b>estressado</b> — você pode acabar sendo mais formal ou defensivo do que precisa, e isso incomoda quem só queria uma resposta rápida. O contrário também é verdade: tratar um cliente irritado com o script de "dúvida" pode piorar a situação. Por isso, identificar o cenário certo antes de agir é o que faz o atendimento fluir sem atrito.',
      },
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
      {
        heading: 'Dúvida sobre o produto',
        body: 'Informe sobre o produto, entenda o que o cliente quer e sane a dúvida antes de seguir.',
        detalhado: 'Quando o cliente tem uma <b>dúvida sobre o produto</b> em si (como funciona, quais as condições, etc.), o caminho é simples: explique com clareza, confirme se ele entendeu, e só depois siga para a próxima etapa da negociação. Nunca avance o atendimento com uma dúvida em aberto — ela vai voltar mais tarde, geralmente na hora de fechar.',
      },
      {
        heading: 'Já contratou antes',
        body: 'Quer o contrato → envie o contrato. Tem dúvida sobre desconto/quitação → informe. Sem dúvida → finalize.',
        detalhado: 'Se o cliente já é cliente (já contratou antes), existem 3 caminhos possíveis dentro desse mesmo cenário:<br>1. Ele só quer <b>o contrato</b> em mãos → envie, sem burocracia.<br>2. Ele tem dúvida sobre <b>desconto ou quitação</b> → explique como funciona.<br>3. Ele não tem mais nenhuma dúvida → pode finalizar o atendimento normalmente.<br>O importante é sempre confirmar qual dessas três situações é a dele antes de agir.',
      },
      {
        heading: 'Não recebeu o valor',
        body: 'Peça o extrato recente e confirme se a conta está correta antes de acionar o apoio do banco.',
        detalhado: 'Quando o cliente diz que "não recebeu o dinheiro", o primeiro passo <b>nunca</b> é acionar o banco direto — é confirmar os dados dele. Peça um <b>extrato recente</b> e confira se a conta informada está certinha. Muitas vezes o problema é um erro de digitação na conta, e resolver isso sozinho é bem mais rápido do que abrir um chamado com o banco.',
      },
      {
        heading: 'Conecta com a intro',
        body: 'Isso é <b>Negociação</b> na prática: entender a necessidade antes de agir.',
        detalhado: 'Repara que em nenhum desses casos você "resolveu" antes de <b>entender</b> o que o cliente realmente precisava — e isso é exatamente o que a lição de <b>Negociação</b> ensina: primeiro escute e entenda a necessidade, só depois aja. Essa lógica vale pra qualquer cenário, não só pra dúvidas.',
      },
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
      {
        heading: 'Dúvida operacional',
        body: 'Informe juros, margem e regras do produto — e acalme o cliente sobre o funcionamento.',
        detalhado: 'Às vezes o cliente não gosta do valor porque não entendeu <b>como</b> ele foi calculado (juros, margem disponível, regras do produto). Nesse caso, o trabalho não é negociar um valor novo — é <b>explicar</b> com calma como a conta foi feita. Muita insatisfação vem de falta de clareza, não do valor em si.',
      },
      {
        heading: 'Valor "ruim"',
        body: 'Pouco: veja outro banco e refaça a simulação. Muito: mostre o porquê o valor maior faz sentido.',
        detalhado: 'Existem dois tipos de "valor ruim" na visão do cliente:<br>• <b>Achou pouco:</b> vale a pena checar se outro banco parceiro oferece uma condição melhor pro perfil dele, e refazer a simulação.<br>• <b>Achou muito (desconfiado):</b> aqui o trabalho é mostrar, com transparência, por que aquele valor faz sentido — geralmente ligado ao prazo ou ao produto escolhido.',
      },
      {
        heading: 'Conecta com a intro',
        body: 'Vale o exemplo de <b>Benefícios, não só produto</b>: "as taxas costumam ser mais acessíveis" pesa mais que só falar de juros.',
        detalhado: 'Lembra da lição de <b>Negociações</b>, no exemplo "Benefícios, não só produto"? Em vez de dizer secamente "é um empréstimo consignado", a abordagem certa é: "como as parcelas são descontadas na folha, as taxas costumam ser mais acessíveis". Isso vale demais nesse cenário — fale do <b>benefício</b> por trás do valor, não só do número frio.',
      },
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
      {
        heading: 'Primeiro sinal (10–20 min)',
        body: 'Envie um áudio avisando que vai seguir com o atendimento — mostra cuidado sem ser invasivo.',
        detalhado: 'Assim que o cliente para de responder (entre 10 e 20 minutos de silêncio), o primeiro movimento é sutil: um <b>áudio curto</b> avisando que você vai continuar acompanhando o atendimento dele. Isso mostra atenção sem parecer insistência — ainda é cedo pra ligar.',
      },
      {
        heading: 'Escalada (+30min a +3h)',
        body: 'Ligação, depois ligação + áudio. Se não atender, retome por áudio e explique a urgência.',
        detalhado: 'Se o silêncio passa de 30 minutos, a régua de contato vai subindo aos poucos:<br>• <b>+30 min:</b> uma ligação.<br>• <b>+1h a +3h:</b> ligação + áudio, já reforçando que existe uma janela de oportunidade que pode se fechar.<br>Se ele não atender em nenhuma dessas tentativas, volte por áudio explicando a urgência, sem soar como pressão excessiva.',
      },
      {
        heading: 'Final do dia',
        body: 'Última ligação. Se não atender, avise que o atendimento vai encerrar por hoje, e programe follow ups.',
        detalhado: 'Perto do fim do expediente, faça uma <b>última tentativa de ligação</b>. Se ainda assim não conseguir contato, avise (por mensagem) que o atendimento será encerrado por hoje — e já programe pelo menos <b>3 follow-ups</b> pros próximos dias. Isso mantém a porta aberta sem parecer que você desistiu do cliente.',
      },
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
      {
        heading: 'Descubra o motivo',
        body: 'Se é dúvida → volte ao Cenário A. Se é valor → volte ao Cenário B.',
        detalhado: 'Um cliente estressado não é um "cenário isolado" — na verdade, o estresse quase sempre vem de <b>outro cenário</b> que não foi bem resolvido. Por isso, o primeiro passo é sempre perguntar (ou perceber) qual é o motivo real: se for uma dúvida mal explicada, volte pro Cenário A; se for sobre o valor, volte pro Cenário B — e resolva a raiz do problema, não só o estresse em si.',
      },
      {
        heading: 'Estresse geral',
        body: 'Acalme o cliente, siga o atendimento normalmente e, se precisar, faça uma ligação.',
        detalhado: 'Quando o estresse não tem uma causa específica identificável (é mais geral, tipo o dia do cliente foi ruim), a estratégia é: manter a calma, seguir o atendimento com cordialidade normal, e — se o texto não estiver sendo suficiente pra acalmar a situação — partir pra uma <b>ligação</b>. A voz humana costuma resolver tensões que o texto não resolve sozinho.',
      },
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
      {
        heading: 'Cliente satisfeito?',
        body: 'Sim → finalize com sucesso. Não → deixe em aberto para follow up.',
        detalhado: 'No fim de qualquer atendimento, a primeira pergunta que você deve se fazer é: o cliente ficou satisfeito com o que foi resolvido? Se sim, é hora de finalizar com sucesso. Se não (mesmo que a proposta tenha sido aprovada), é melhor deixar o atendimento em aberto e programar um follow-up, em vez de forçar um encerramento que deixa uma sensação ruim.',
      },
      {
        heading: 'Follow up',
        body: 'Negociação, nova simulação ou oferta de outro produto, conforme o caso.',
        detalhado: 'Um follow-up não é só "mandar mensagem de novo" — é retomar o atendimento com algo novo pra oferecer: pode ser uma negociação diferente, uma nova simulação com outras condições, ou até um produto diferente que faça mais sentido pro perfil daquele cliente.',
      },
      {
        heading: 'Encerramento',
        body: 'Agradeça o contato e deixe o canal aberto — mesmo sem fechar negócio.',
        detalhado: 'Mesmo quando a venda não acontece, o jeito como você <b>encerra</b> o atendimento fica marcado. Agradeça o contato, deixe claro que o canal continua aberto pra quando ele quiser retomar, e evite qualquer tom de cobrança. Um bom encerramento é o que faz o cliente voltar mais tarde — ou indicar a Hotline pra alguém.',
      },
    ],
  },
];

// Coordenadas (% da tela) de cada ponto na trilha da montanha —
// ascendente da esquerda pra direita, ficando mais íngreme no final.
export const MOUNTAIN_POINTS = [
  { x: 8, y: 84 },
  { x: 20, y: 66 },
  { x: 33, y: 74 },
  { x: 47, y: 50 },
  { x: 60, y: 62 },
  { x: 75, y: 34 },
  { x: 90, y: 16 },
];
