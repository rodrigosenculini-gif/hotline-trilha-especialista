// Conteúdo migrado fielmente do site original (index.html) —
// da "história" até "o que não fazer" permanece igual ao conteúdo anterior.

export const MODULES = [
  {
    id: 'hotline',
    label: 'Hotline',
    lessons: [
      {
        id: 'historia',
        title: 'História',
        content: `
          <p class="lede">A Hotline nasceu de um sonho de empreender. Começamos pequenos — com 6 posições de venda — mas com grandes ambições: ser o melhor do Brasil no nosso segmento.</p>
          <div class="card">
            <h3>Sobre nós</h3>
            <p>A cultura da Hotline está em metamorfose, refletindo nosso crescimento e compromisso renovado com colaboradores, clientes e parceiros. Nossa integridade absoluta garante processos eficazes e assertivos. Prazer, nós somos a Hotline.</p>
            <p>Acreditamos que um ambiente de trabalho respeitoso, harmonioso e profissional é essencial para o nosso sucesso coletivo — e é isso que buscamos manter em cada atendimento.</p>
          </div>
          <div class="callout">Segmento inicial: vendas de TV por assinatura. Hoje: soluções financeiras (crédito, FGTS e energia).</div>
        `,
      },
      {
        id: 'proposito',
        title: 'Propósito',
        content: `
          <p class="lede">Três pilares guiam toda decisão da Hotline — do atendimento ao cliente até a forma como tratamos uns aos outros.</p>
          <div class="grid2">
            <div class="card"><h3>Missão</h3><p>Conectar-se aos nossos clientes de forma personalizada, garantindo um atendimento humanizado, com soluções inovadoras e tecnológicas — e resultados eficientes através de vendas positivas.</p></div>
            <div class="card"><h3>Visão</h3><p>Ser referência nacional de empresa humanizada, guiada pelo propósito de gerar resultados sustentáveis e experiências que encantem clientes internos e externos.</p></div>
          </div>
          <div class="card">
            <h3>Valores</h3>
            <span class="tag">Respeito</span><span class="tag">Credibilidade</span><span class="tag">Somos Hot</span><span class="tag">Comprometimento</span><span class="tag">Autenticidade</span><span class="tag">Agilidade</span>
          </div>
        `,
      },
      {
        id: 'resultados',
        title: 'Resultados',
        content: `
          <p class="lede">14 anos de história — de 6 posições de venda a referência nacional em soluções financeiras.</p>
          <div class="timeline">
            <div class="t-row"><div class="t-year">2010</div><div class="t-rail"><div class="t-dot"></div><div class="t-bar"></div></div><div class="t-body"><h4>Fundação</h4><p>Início com 6 posições de venda e um grande sonho: ser referência no segmento.</p></div></div>
            <div class="t-row"><div class="t-year">2014</div><div class="t-rail"><div class="t-dot"></div><div class="t-bar"></div></div><div class="t-body"><h4>Melhor do Brasil</h4><p>Conquistamos o topo em vendas de TV por assinatura, já com mais de 50 posições de venda.</p></div></div>
            <div class="t-row"><div class="t-year">2019</div><div class="t-rail"><div class="t-dot"></div><div class="t-bar"></div></div><div class="t-body"><h4>Setor bancário</h4><p>Mudamos de ramo. Começamos pequenos de novo — e viramos referência em qualidade e volume com o banco BMG.</p></div></div>
            <div class="t-row"><div class="t-year">2023</div><div class="t-rail"><div class="t-dot"></div><div class="t-bar"></div></div><div class="t-body"><h4>Liderança em FGTS</h4><p>À frente de toda a rede BMG, liderando o maior volume de vendas de FGTS.</p></div></div>
            <div class="t-row"><div class="t-year">2024</div><div class="t-rail"><div class="t-dot"></div></div><div class="t-body"><h4>Nova Era Hotline</h4><p>14 anos de história, soluções estratégicas de vendas e cuidado com as pessoas. Aqui, vendas é o nosso maior negócio.</p></div></div>
          </div>
        `,
      },
    ],
  },
  {
    id: 'vendas',
    label: 'Vendas',
    lessons: [
      {
        id: 'produtos',
        title: 'Produtos',
        content: `
          <p class="lede">Três soluções, um mesmo propósito: dar acesso a crédito de forma simples e transparente.</p>
          <details class="acc" open>
            <summary>Crédito CLT <span class="chev">▸</span></summary>
            <div class="acc-body">
              <p>Empréstimo consignado para trabalhadores com carteira assinada. As parcelas são descontadas direto na folha — por isso os juros costumam ser menores que em um empréstimo pessoal comum.</p>
              <ul class="plain">
                <li>Quem pode: CLT com margem consignável disponível</li>
                <li>Análise: salário, tempo de empresa, margem e regras de aprovação do banco</li>
                <li>Bancos parceiros: PAN, Presença, V8, C6, Facta</li>
                <li>Vantagens: juros menores, parcelas fixas, sem garantia, dinheiro na conta após aprovação</li>
              </ul>
            </div>
          </details>
          <details class="acc">
            <summary>Saque FGTS <span class="chev">▸</span></summary>
            <div class="acc-body">
              <p>Não é um empréstimo tradicional — o cliente antecipa hoje o dinheiro que receberia nos próximos anos pelo Saque-Aniversário, usando o saldo do FGTS como garantia.</p>
              <p><strong>Exemplo:</strong> cliente tem R$ 8.000 de saldo → o banco calcula quanto ele receberia nos próximos aniversários e antecipa parte desse valor agora. Sem boleto, sem parcela mensal.</p>
              <ul class="plain">
                <li>Quem pode: aderiu ao Saque-Aniversário, tem saldo disponível e autoriza o banco no app do FGTS</li>
                <li>Quando não aprova: sem adesão, saldo insuficiente, autorização não realizada, outra operação em curso ou saldo muito baixo</li>
                <li>Vantagens: não compromete salário, sem parcela mensal, juros geralmente menores, dinheiro rápido</li>
              </ul>
            </div>
          </details>
          <details class="acc">
            <summary>Empréstimo na Conta de Luz <span class="chev">▸</span></summary>
            <div class="acc-body">
              <p>O pagamento entra direto na fatura de energia, no lugar de boleto ou desconto em folha.</p>
              <ul class="plain">
                <li>Depende da concessionária (Neoenergia, Enel, CPFL e outras conveniadas) e da análise de crédito</li>
                <li>Não precisa ser aposentado, servidor ou CLT</li>
                <li>Objeção comum: "minha luz vai aumentar?" — não. A conta continua igual, só aparece uma linha referente ao financiamento.</li>
              </ul>
            </div>
          </details>
          <div class="callout">Instituições autorizadas na plataforma: Banco BMP, Zipdin, BMG, PAN, C6, Facta, TA Quitado, Zili e V8 Digital.</div>
        `,
      },
      {
        id: 'plataformas',
        title: 'Plataformas',
        content: `
          <p class="lede">Quatro ferramentas sustentam o atendimento do início ao fim.</p>
          <div class="grid2">
            <div class="card"><h3>Chatwoot</h3><p>Onde acontecem todos os atendimentos da empresa — unifica vários WhatsApps de contato com o cliente.</p></div>
            <div class="card"><h3>CRM</h3><p>Onde os clientes são cadastrados na carteira da Hotline e onde se fazem simulações de valores liberados.</p></div>
            <div class="card"><h3>Plataforma dos bancos</h3><p>Acompanhamento do status do cliente e cadastro das propostas liberadas.</p></div>
            <div class="card"><h3>WhatsApp Web</h3><p>WhatsApps extras oficiais, também usados para ligações com clientes.</p></div>
          </div>
        `,
      },
      {
        id: 'especialistas',
        title: 'O que os especialistas fazem',
        content: `
          <p class="lede">"Especialista em Crédito" é o nome do cargo — e o resumo de tudo o que um vendedor Hotline faz no dia a dia.</p>
          <div class="card">
            <ul class="plain">
              <li>Atendimento dos leads captados pela empresa</li>
              <li>Negociações e ofertas de novos produtos</li>
              <li>Auxílio em dúvidas dos clientes</li>
              <li>Follow-ups recentes e retorno de clientes antigos</li>
              <li>Ligações quando necessário</li>
              <li>Envio de informações e atualizações do andamento</li>
              <li>Cadastro de propostas novas diariamente</li>
            </ul>
          </div>
        `,
      },
    ],
  },
  {
    id: 'vender',
    label: 'Vender',
    lessons: [
      {
        id: 'jornada',
        title: 'Jornada de um atendimento',
        content: `
          <p class="lede">O fluxo que todo Especialista segue, do primeiro contato até o encerramento.</p>
          <div class="journey">
            <div class="j-step"><div class="j-num">1</div><div class="j-body"><h4>Contextualização</h4><p>Entenda de onde o cliente veio (IA, Landing Page, retorno ou proposta em andamento) e revise o histórico antes de responder — evita perguntas repetidas.</p></div></div>
            <div class="j-line"></div>
            <div class="j-step"><div class="j-num">2</div><div class="j-body"><h4>Apresentação</h4><p>Apresente-se de forma cordial, dando continuidade ao atendimento. O cliente precisa perceber que agora fala com uma pessoa preparada para ajudá-lo.</p></div></div>
            <div class="j-line"></div>
            <div class="j-step"><div class="j-num">3</div><div class="j-body"><h4>Oferta</h4><p>Identifique o produto que faz sentido e explique, de forma simples, como funciona, quais as vantagens e quais os próximos passos.</p></div></div>
            <div class="j-line"></div>
            <div class="j-step"><div class="j-num">4</div><div class="j-body"><h4>Cadastro</h4><p>Confirme e colete CPF, telefone, documentos, dados bancários e autorizações. Atenção aos detalhes evita atrasos na aprovação.</p></div></div>
            <div class="j-line"></div>
            <div class="j-step"><div class="j-num">5</div><div class="j-body"><h4>Cross Sell</h4><p>Se o cliente não for elegível ao produto buscado, identifique outra oportunidade: sem saldo de FGTS → CLT; sem margem CLT → energia.</p></div></div>
            <div class="j-line"></div>
            <div class="j-step"><div class="j-num">6</div><div class="j-body"><h4>Encerramento</h4><p>Confirme dúvidas, informe o andamento, explique o próximo passo e agradeça — mesmo quando a proposta não é aprovada.</p></div></div>
          </div>
          <div class="callout">O cliente pode já ter sido atendido pela IA ou vindo de uma Landing Page. Use esse histórico como contexto — nunca repita o que já foi coletado.</div>
        `,
      },
      {
        id: 'negociacoes',
        title: 'Negociações',
        content: `
          <p class="lede">Uma boa negociação constrói confiança antes de vender qualquer coisa.</p>
          <div class="card">
            <h3>Negociar começa ouvindo</h3>
            <ul class="plain"><li>Qual é a necessidade do cliente</li><li>O motivo da procura pelo crédito</li><li>O que está impedindo a contratação</li><li>Quais são as dúvidas</li></ul>
          </div>
          <div class="card">
            <h3>Como conduzir</h3>
            <ul class="plain"><li>Entender a necessidade</li><li>Explicar o funcionamento do produto</li><li>Apresentar os benefícios</li><li>Esclarecer dúvidas</li><li>Confirmar se o cliente está confortável</li><li>Conduzir para a próxima etapa</li></ul>
          </div>
          <div class="card">
            <h3>Benefícios, não só produto</h3>
            <div class="example">
              <div class="ex-line ex-bad">❌ "É um empréstimo consignado."</div>
              <div class="ex-line ex-good">✔️ "Como as parcelas são descontadas na folha, as taxas costumam ser mais acessíveis que outras modalidades de crédito."</div>
            </div>
          </div>
          <h3 style="margin:22px 0 10px; font-size:17px;">Lidando com objeções</h3>
          <div class="obj-grid">
            <div class="obj-card"><div class="q">"Vou pensar."</div><p>Pergunte se há alguma dúvida específica que possa ser esclarecida antes da decisão.</p></div>
            <div class="obj-card"><div class="q">"Está muito caro."</div><p>Explique as condições e benefícios da proposta, sem desmerecer outras opções do mercado.</p></div>
            <div class="obj-card"><div class="q">"Não tenho interesse."</div><p>Agradeça o retorno e, quando fizer sentido, veja se outro produto atende melhor.</p></div>
            <div class="obj-card"><div class="q">"Quero falar com minha família."</div><p>Demonstre compreensão e combine um momento para retomar o contato.</p></div>
          </div>
        `,
      },
      {
        id: 'mensagens',
        title: 'Mensagens',
        content: `
          <p class="lede">Mesmo com mensagens prontas, o atendimento precisa parecer natural.</p>
          <div class="card">
            <ul class="plain">
              <li>Chame o cliente pelo nome</li>
              <li>Demonstre que leu a mensagem dele</li>
              <li>Responda exatamente à dúvida apresentada</li>
              <li>Evite respostas automáticas sem relação com o contexto</li>
            </ul>
          </div>
          <div class="callout">O cliente precisa sentir que está conversando com uma pessoa — não apenas recebendo mensagens padronizadas.</div>
        `,
      },
      {
        id: 'escrita',
        title: 'Escrita',
        content: `
          <p class="lede">A forma como a mensagem é escrita influencia diretamente a percepção de profissionalismo.</p>
          <div class="card">
            <ul class="plain">
              <li>Linguagem clara e simples</li>
              <li>Escrever corretamente, sem erros ou abreviações excessivas</li>
              <li>Organizar mensagens em blocos pequenos, fáceis de ler</li>
              <li>Adaptar a linguagem ao perfil do cliente, com respeito e cordialidade</li>
              <li>Demonstrar interesse genuíno em ajudar</li>
            </ul>
          </div>
          <div class="example">
            <div class="ex-line ex-bad">❌ "manda seu cpf ai"</div>
            <div class="ex-line ex-good">✔️ "Pode me informar seu CPF, por gentileza? Assim, consigo consultar as condições disponíveis para você."</div>
          </div>
        `,
      },
    ],
  },
  {
    id: 'vendedor',
    label: 'Sobre o vendedor',
    lessons: [
      {
        id: 'esperado',
        title: 'O que é esperado dele',
        content: `
          <p class="lede">Nove critérios definem a excelência de um atendimento Hotline.</p>
          <div class="crit-grid">
            <div class="crit-card"><div class="k">Cliente alto valor</div><p>Comunicação escrita, organizada e objetiva. Áudio só quando agrega valor real.</p></div>
            <div class="crit-card"><div class="k">Agilidade</div><p>Primeiro contato o mais rápido possível — preferencialmente em até 2 minutos.</p></div>
            <div class="crit-card"><div class="k">Tempo de resposta</div><p>Ritmo rápido durante toda a conversa; avise se precisar de tempo para consultar algo.</p></div>
            <div class="crit-card"><div class="k">Cordialidade</div><p>Cumprimente, trate pelo nome, use linguagem profissional e demonstre disposição para ajudar.</p></div>
            <div class="crit-card"><div class="k">Escrita</div><p>Comunicação clara, correta e profissional — revise antes de enviar.</p></div>
            <div class="crit-card"><div class="k">Informações</div><p>Responda todas as dúvidas com transparência; se não souber, diga que vai verificar.</p></div>
            <div class="crit-card"><div class="k">Cross sell</div><p>Avalie sempre se o cliente tem perfil para outro produto quando o original não é viável.</p></div>
            <div class="crit-card"><div class="k">Agradecimento</div><p>Encerre com cordialidade e, quando apropriado, incentive o retorno ou indicação.</p></div>
            <div class="crit-card"><div class="k">Critério extra</div><p>Só é alcançado quando todos os demais critérios são atendidos integralmente, do início ao fim.</p></div>
          </div>
          <div class="callout">Quando o cliente já foi atendido pela IA antes, use o histórico apenas como contexto. Sua avaliação considera exclusivamente suas próprias mensagens.</div>
        `,
      },
      {
        id: 'naofazer',
        title: 'O que não fazer',
        content: `
          <p class="lede">Os mesmos nove critérios, pelo lado das armadilhas mais comuns.</p>
          <div class="crit-grid">
            <div class="crit-card warn"><div class="k">Cliente alto valor</div><p>Enviar a maior parte do atendimento por áudio ou explicar informações importantes só por áudio.</p></div>
            <div class="crit-card warn"><div class="k">Agilidade</div><p>Deixar o cliente aguardando sem resposta ou ignorar novos atendimentos enquanto fala com outros.</p></div>
            <div class="crit-card warn"><div class="k">Tempo de resposta</div><p>Demorar minutos sem justificativa ou interromper sem avisar que está verificando algo.</p></div>
            <div class="crit-card warn"><div class="k">Cordialidade</div><p>Responder de forma seca, usar linguagem grosseira ou ignorar perguntas do cliente.</p></div>
            <div class="crit-card warn"><div class="k">Escrita</div><p>Erros frequentes, abreviações excessivas, caixa alta ou gírias inadequadas.</p></div>
            <div class="crit-card warn"><div class="k">Informações</div><p>Ignorar dúvidas, dar informação incompleta ou prometer sem confirmação.</p></div>
            <div class="crit-card warn"><div class="k">Cross sell</div><p>Encerrar sem verificar outras oportunidades ou oferecer produto incompatível com o perfil.</p></div>
            <div class="crit-card warn"><div class="k">Agradecimento</div><p>Encerrar abruptamente ou demonstrar desinteresse após concluir a negociação.</p></div>
            <div class="crit-card warn"><div class="k">Critério extra</div><p>Achar que ir bem em alguns critérios basta — qualquer nota abaixo do máximo tira a pontuação Extra.</p></div>
          </div>
        `,
      },
    ],
  },
];

export const FLAT_LESSONS = MODULES.flatMap((m) =>
  m.lessons.map((l) => ({ ...l, moduleId: m.id, moduleLabel: m.label }))
);
