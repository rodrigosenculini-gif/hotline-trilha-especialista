// Tabuleiro baseado no Fluxograma de Vendas — dividido em 5 temas visuais.
// Cada "stop" do tabuleiro tem um ou mais blocos de informação (tela cheia,
// transparente, com o tema de fundo). Cada bloco concluído dá XP.

export const THEMES = [
  { id: 'partida', label: 'Partida', bg: 'theme-partida' },
  { id: 'praia', label: 'Praia', bg: 'theme-praia' },
  { id: 'autodromo', label: 'Autódromo', bg: 'theme-autodromo' },
  { id: 'nuvens', label: 'Nas nuvens', bg: 'theme-nuvens' },
  { id: 'galaxia', label: 'Galáxia', bg: 'theme-galaxia' },
];

const XP_PER_BLOCK = 10;
export { XP_PER_BLOCK };

export const BOARD_STOPS = [
  {
    id: 'inicio-atendimento',
    theme: 'partida',
    title: '1. Início do atendimento',
    blocks: [
      {
        heading: 'Lead chega ao vendedor',
        body: 'O atendimento começa quando um lead — que pode já ter passado pela IA ou por uma Landing Page — chega até você.',
      },
      {
        heading: 'Saudação completa',
        body: 'Faça uma saudação completa e cordial. É o primeiro contato humano do cliente com a Hotline — cause uma boa impressão.',
      },
    ],
  },
  {
    id: 'identificar-cenario',
    theme: 'praia',
    title: '2. Identificar cenário',
    blocks: [
      {
        heading: 'Qual o cenário do cliente?',
        body: 'Todo atendimento se encaixa em um de quatro cenários: <b>A)</b> cliente com dúvida, <b>B)</b> cliente não se interessou pelo valor, <b>C)</b> cliente não respondeu, <b>D)</b> cliente estressado.',
      },
    ],
  },
  {
    id: 'cenario-a',
    theme: 'praia',
    title: '3. Cenário A — Cliente com dúvida',
    blocks: [
      {
        heading: 'Dúvida sobre o produto',
        body: 'Informe sobre o produto, entenda qual produto o cliente quer, sane a dúvida e volte ao atendimento normalmente.',
      },
      {
        heading: 'Já contratou antes',
        body: 'Se quer o contrato → envie o contrato. Se não quer, mas tem dúvida sobre o produto → informe sobre desconto/quitação. Se não tem dúvida → finalize.',
      },
      {
        heading: 'Não recebeu o valor',
        body: 'Peça o extrato recente do banco e confirme se a conta está correta. Se sim, passe para o apoio do banco. Se não, peça o extrato da conta informada inicialmente e verifique erros de digitação antes de refazer o processo.',
      },
    ],
  },
  {
    id: 'cenario-b',
    theme: 'autodromo',
    title: '4. Cenário B — Cliente não se interessou pelo valor',
    blocks: [
      {
        heading: 'Tem dúvida operacional',
        body: 'Informe juros, margem e regras do produto, faça a negociação e acalme o cliente sobre o funcionamento.',
      },
      {
        heading: 'Valor "ruim" — pouco ou muito',
        body: 'Pouco: verifique outro banco e faça nova simulação, ou negocie. Muito: convença o cliente do porquê o valor maior faz sentido, e negocie.',
      },
      {
        heading: 'Não tem dúvida',
        body: 'Se o cliente ainda não quer, refaça a simulação dentro do que ele espera, ou ofereça outro produto. Se ainda assim não quiser, deixe em aberto e faça follow up depois.',
      },
    ],
  },
  {
    id: 'cenario-c',
    theme: 'autodromo',
    title: '5. Cenário C — Cliente não respondeu',
    blocks: [
      {
        heading: 'Enviar áudio',
        body: 'Envie um áudio avisando que vai seguir com o atendimento dele — mostra cuidado sem ser invasivo.',
      },
      {
        heading: 'Escalada por tempo',
        body: '10–20 min: áudio. +30 min: ligação (se não atender, áudio; se atender, retomar o WhatsApp). +1h: ligação + áudio (urgência de oportunidade). +3h: ligação + áudio (urgência). Final do dia: última ligação, e se não atender, avisar que o atendimento vai encerrar.',
      },
      {
        heading: 'Follow ups do dia',
        body: 'Depois dos dois primeiros contatos, programe pelo menos +3 follow ups ao longo do dia.',
      },
    ],
  },
  {
    id: 'cenario-d',
    theme: 'nuvens',
    title: '6. Cenário D — Cliente estressado',
    blocks: [
      {
        heading: 'Por quê?',
        body: 'Se é dúvida → volte ao Cenário A. Se é sobre o valor → volte ao Cenário B. Se é algo geral → acalme o cliente, siga o atendimento e, se necessário, faça uma ligação.',
      },
    ],
  },
  {
    id: 'finalizacao',
    theme: 'galaxia',
    title: '7. Finalização do atendimento',
    blocks: [
      {
        heading: 'Cliente satisfeito?',
        body: 'Se sim, finalize com sucesso. Se não, deixe em aberto para follow up.',
      },
      {
        heading: 'Follow up',
        body: 'Continue com negociação, novas simulações ou ofertas de outros produtos, conforme o caso.',
      },
      {
        heading: 'Encerramento',
        body: 'Agradeça o contato e deixe o canal aberto para retorno — mesmo quando não fecha negócio.',
      },
    ],
  },
];
