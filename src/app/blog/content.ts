export type BlogEntry = {
  slug: string;
  status: string;
  publishedAt: string;
  title: string;
  description: string;
  meta: readonly [string, string];
  tags: readonly string[];
  href?: string;
};

export type BlogAction = {
  label: string;
  href: string;
  variant?: "solid" | "outline";
  external?: boolean;
  ariaLabel?: string;
};

export type BlogFact = {
  label: string;
  value: string;
};

export type BlogPostSection = {
  title: string;
  paragraphs: readonly string[];
};

export type BlogPost = {
  slug: string;
  status: string;
  publishedAt: string;
  publishedAtIso: string;
  title: string;
  description: string;
  meta: readonly [string, string];
  intro: string;
  sections: readonly BlogPostSection[];
  takeaways: readonly string[];
  tags: readonly string[];
};

export type BlogPostNavigationItem = Pick<BlogPost, "slug" | "status" | "title">;

export const BLOG_PAGE_SIZE_DEFAULT = 6;

export const blogHero = {
  eyebrow: "Blog",
  title: "Notas editoriais sobre interface, dados e comunicação",
  description:
    "Textos curtos para registrar decisões que melhoram leitura, hierarquia e clareza. A ideia é manter o conteúdo útil, enxuto e fácil de manter.",
} as const;

export const blogEntriesSection = {
  id: "blog-recent",
  eyebrow: "Textos",
  title: "Notas recentes",
  description:
    "Cada nota abaixo marca uma direção de escrita que eu costumo revisitar em projetos e interfaces.",
} as const;

export const blogPosts = [
  {
    slug: "quando-o-layout-deixa-de-competir-com-a-leitura",
    status: "Rascunho 01",
    publishedAt: "1 de junho de 2024",
    publishedAtIso: "2024-06-01",
    title: "Quando o layout deixa de competir com a leitura",
    description:
      "Notas sobre hierarquia, contraste e respiro em páginas que precisam dizer mais com menos ruído.",
    meta: ["Interface", "5 min"],
    intro:
      "Uma página boa não briga com o texto. Ela organiza a entrada, devolve contexto e desaparece quando a leitura engata.",
    sections: [
      {
        title: "Hierarquia antes de efeito",
        paragraphs: [
          "Quando a estrutura é sólida, o olho encontra ritmo sem precisar perseguir blocos de destaque.",
          "Títulos, subtítulos e respiro devem resolver orientação antes de qualquer ornamentação.",
        ],
      },
      {
        title: "O espaço também informa",
        paragraphs: [
          "Margem não é vazio residual. É parte do texto visual que separa, agrupa e dá tempo para a leitura respirar.",
          "Quando o espaço perde função, a página fica pesada mesmo sem ter muito conteúdo.",
        ],
      },
      {
        title: "O que removo costuma melhorar mais",
        paragraphs: [
          "Toda camada sem função clara aumenta esforço. Cortar ruído normalmente melhora compreensão mais do que adicionar explicação.",
          "Se algo não ajuda a decidir, a seguir ou a entender, geralmente pode sair.",
        ],
      },
    ],
    takeaways: [
      "Primeiro a leitura, depois o adorno.",
      "Respiro é parte da composição.",
      "Remover pode ser a melhor decisão.",
    ],
    tags: ["Interface", "Hierarquia", "Leitura"],
  },
  {
    slug: "dados-existem-para-orientar-nao-para-decorar",
    status: "Rascunho 02",
    publishedAt: "18 de julho de 2024",
    publishedAtIso: "2024-07-18",
    title: "Dados existem para orientar, não para decorar",
    description:
      "Como transformar métricas em contexto visual sem empurrar a pessoa para uma parede de números.",
    meta: ["Dados", "6 min"],
    intro:
      "Métrica só ajuda quando aponta direção. Número solto vira decoração e disputa com a narrativa em vez de sustentá-la.",
    sections: [
      {
        title: "Contexto transforma número em decisão",
        paragraphs: [
          "Um valor sem comparação responde pouco. Quando a leitura mostra tendência, referência ou diferença, o dado começa a servir de fato.",
          "Sem contexto, a tela parece mais cheia, mas a decisão continua na mesma distância.",
        ],
      },
      {
        title: "Comparação vence acumulação",
        paragraphs: [
          "Nem toda informação precisa aparecer ao mesmo tempo. Às vezes um recorte claro resolve melhor do que um painel abarrotado.",
          "Comparar bem é mais útil do que exibir muito.",
        ],
      },
      {
        title: "Cada gráfico precisa responder algo",
        paragraphs: [
          "Se um gráfico não muda leitura, priorização ou escolha, ele vira ruído visual com aparência de precisão.",
          "A pergunta certa antes da forma certa costuma evitar exagero.",
        ],
      },
    ],
    takeaways: [
      "Dado sem contexto não decide.",
      "Menos métricas, mais orientação.",
      "Forma só faz sentido quando responde a uma pergunta.",
    ],
    tags: ["Dados", "Contexto", "Métricas"],
  },
  {
    slug: "escrever-menos-para-dizer-mais",
    status: "Rascunho 03",
    publishedAt: "9 de agosto de 2024",
    publishedAtIso: "2024-08-09",
    title: "Escrever menos para dizer mais",
    description:
      "Um olhar sobre densidade, ritmo e o momento em que a explicação deixa de ajudar a leitura.",
    meta: ["Conteúdo", "4 min"],
    intro:
      "A escrita ganha força quando cada frase justifica sua presença. Se o texto demora para chegar ao ponto, a atenção já vazou.",
    sections: [
      {
        title: "Densidade não é profundidade",
        paragraphs: [
          "Texto denso demais pode esconder a ideia principal. Profundidade vem do que se sustenta, não do que se acumula.",
          "Menos ruído não significa menos conteúdo. Significa mais precisão na ordem certa.",
        ],
      },
      {
        title: "Ritmo curto ajuda a leitura",
        paragraphs: [
          "Frases curtas, blocos pequenos e transições claras diminuem atrito sem tornar a mensagem infantil.",
          "Quando a leitura anda, a ideia encontra espaço para ficar.",
        ],
      },
      {
        title: "Fechar com uma ação útil",
        paragraphs: [
          "Toda nota precisa terminar com alguma utilidade: uma decisão, uma pergunta ou um próximo passo.",
          "Encerrar bem é parte da clareza, não um detalhe depois do texto.",
        ],
      },
    ],
    takeaways: [
      "Edição é parte da escrita.",
      "Ritmo melhora retenção.",
      "Uma boa conclusão orienta o próximo movimento.",
    ],
    tags: ["Conteúdo", "Edição", "Escrita"],
  },
  {
    slug: "antes-de-publicar-corte-o-excesso",
    status: "Rascunho 04",
    publishedAt: "6 de setembro de 2024",
    publishedAtIso: "2024-09-06",
    title: "Antes de publicar, corte o excesso",
    description:
      "Uma nota sobre edição, prioridade e o valor de tirar aquilo que só ocupa espaço.",
    meta: ["Edição", "4 min"],
    intro:
      "Publicar sem revisar transforma o rascunho em ruído. O corte final costuma ser o que separa intenção de leitura.",
    sections: [
      {
        title: "Editar é decidir",
        paragraphs: [
          "Toda frase pede uma justificativa. Se ela repete, enfeita sem função ou empurra a ideia para longe, o texto perde força.",
          "A edição não serve só para corrigir. Ela define o que merece atravessar a versão final.",
        ],
      },
      {
        title: "O espaço do texto é valioso",
        paragraphs: [
          "Cada linha disputa atenção com o que vem antes e com o que vem depois. Menos sobra para a leitura respirar quando nada sai no corte.",
          "Retirar o que não sustenta a mensagem costuma deixar o texto mais direto e mais honesto.",
        ],
      },
      {
        title: "Fechar a revisão com calma",
        paragraphs: [
          "Revisar no fim do processo evita que o conteúdo final carregue escolhas feitas no impulso.",
          "Quando a última passada é criteriosa, a publicação chega mais limpa e menos cansada.",
        ],
      },
    ],
    takeaways: [
      "O corte final também escreve.",
      "Texto precisa justificar espaço.",
      "Revisar é parte da entrega.",
    ],
    tags: ["Edição", "Texto", "Clareza"],
  },
  {
    slug: "microcopias-que-guiam-sem-chamar-atencao",
    status: "Rascunho 05",
    publishedAt: "24 de setembro de 2024",
    publishedAtIso: "2024-09-24",
    title: "Microcópias que guiam sem chamar atenção",
    description:
      "Como rótulos, estados e mensagens curtas reduzem atrito sem disputar a cena com o conteúdo principal.",
    meta: ["Interface", "5 min"],
    intro:
      "Uma instrução boa aparece no momento certo e some logo depois. Ela orienta sem tentar ser protagonista.",
    sections: [
      {
        title: "Rótulos falam antes da interface",
        paragraphs: [
          "O texto curto do controle costuma carregar mais responsabilidade do que parece. Ele precisa informar sem sobrecarregar.",
          "Se a pessoa precisa parar para decifrar o rótulo, a microcópia já perdeu a função.",
        ],
      },
      {
        title: "Erros também podem orientar",
        paragraphs: [
          "Uma mensagem ruim fecha portas. Uma mensagem boa mostra o problema, aponta a causa e sugere a saída.",
          "Mesmo quando há falha, o texto pode diminuir fricção em vez de aumentar a sensação de bloqueio.",
        ],
      },
      {
        title: "Linguagem estável vira hábito",
        paragraphs: [
          "Quando os termos mudam sem motivo, a interface parece instável. Consistência economiza leitura.",
          "A força da microcópia está na repetição precisa, não no improviso a cada tela.",
        ],
      },
    ],
    takeaways: [
      "Texto curto precisa ser preciso.",
      "Erro bem escrito reduz atrito.",
      "Consistência melhora confiança.",
    ],
    tags: ["Microcópia", "Interface", "Clareza"],
  },
  {
    slug: "cards-que-explicam-o-proximo-passo",
    status: "Rascunho 06",
    publishedAt: "11 de outubro de 2024",
    publishedAtIso: "2024-10-11",
    title: "Cards que explicam o próximo passo",
    description:
      "Um card bom não só resume um conteúdo. Ele deixa claro o que acontece depois do clique.",
    meta: ["Produto", "4 min"],
    intro:
      "Resumo sem direção vira vitrine. O card precisa dizer o que é, por que importa e para onde leva.",
    sections: [
      {
        title: "Contexto acima do enfeite",
        paragraphs: [
          "Imagem e título chamam atenção, mas o contexto é o que transforma curiosidade em decisão.",
          "Se o card não deixa claro o destino, a pessoa hesita antes mesmo de interagir.",
        ],
      },
      {
        title: "A ação precisa ser previsível",
        paragraphs: [
          "Botão, link ou área clicável não podem exigir adivinhação. O próximo passo precisa parecer natural.",
          "Quando a interação é coerente, o card reduz dúvida em vez de criar mais uma camada dela.",
        ],
      },
      {
        title: "O cartão não resolve tudo sozinho",
        paragraphs: [
          "Um card eficaz depende da lista, da página de destino e do restante do sistema para completar a leitura.",
          "A peça isolada ajuda, mas a experiência só fecha quando o fluxo inteiro conversa bem.",
        ],
      },
    ],
    takeaways: [
      "Resumo sem direção não ajuda.",
      "A ação precisa ser previsível.",
      "O card faz parte de um fluxo maior.",
    ],
    tags: ["Produto", "Cards", "Navegação"],
  },
  {
    slug: "metricas-no-lugar-certo-da-interface",
    status: "Rascunho 07",
    publishedAt: "22 de novembro de 2024",
    publishedAtIso: "2024-11-22",
    title: "Métricas no lugar certo da interface",
    description:
      "Números funcionam melhor quando entram como contexto e não como ornamentação.",
    meta: ["Métricas", "6 min"],
    intro:
      "Nem toda tela precisa mostrar mais números. Às vezes precisa mostrar menos, mas com mais sentido.",
    sections: [
      {
        title: "Comparar antes de acumular",
        paragraphs: [
          "Um número solto responde pouco. Quando ele entra acompanhado de comparação, tendência ou referência, a leitura ganha direção.",
          "Acúmulo sem contexto aumenta ruído sem melhorar decisão.",
        ],
      },
      {
        title: "O número precisa de vizinhança",
        paragraphs: [
          "Métrica boa não mora sozinha. Ela conversa com rótulo, unidade, variação e prioridade visual.",
          "Quando a vizinhança falha, o valor perde significado mesmo que esteja correto.",
        ],
      },
      {
        title: "Toda métrica pede uma pergunta",
        paragraphs: [
          "Se o número não responde uma dúvida real, ele vira decoração técnica.",
          "A métrica certa ajuda a tomar decisão; a métrica errada só ocupa espaço com aparência de precisão.",
        ],
      },
    ],
    takeaways: [
      "Comparação vale mais que excesso.",
      "Número sem contexto não orienta.",
      "Cada métrica precisa de intenção.",
    ],
    tags: ["Métricas", "Contexto", "Leitura"],
  },
  {
    slug: "hierarquia-tambem-precisa-de-ritmo",
    status: "Rascunho 08",
    publishedAt: "17 de janeiro de 2025",
    publishedAtIso: "2025-01-17",
    title: "Hierarquia também precisa de ritmo",
    description:
      "A organização visual não depende só de peso tipográfico. O intervalo entre blocos também marca o compasso.",
    meta: ["Layout", "5 min"],
    intro:
      "Se tudo pesa igual, nada orienta. Ritmo é o que ajuda a hierarquia a respirar e continuar legível.",
    sections: [
      {
        title: "Peso não resolve sozinho",
        paragraphs: [
          "Título grande sem respiro ainda pode parecer apertado. Hierarquia depende de contraste, sim, mas também de espaço e sequência.",
          "Quando a composição ignora o intervalo, o olho precisa trabalhar mais para achar a linha de leitura.",
        ],
      },
      {
        title: "Espaço cria andamento",
        paragraphs: [
          "Separar blocos com intenção melhora o percurso. O conteúdo não fica só mais bonito; fica mais navegável.",
          "O compasso visual mostra quando avançar, quando pausar e quando mudar de assunto.",
        ],
      },
      {
        title: "Ritmo também é manutenção",
        paragraphs: [
          "Layouts que dependem de ajuste manual demais cansam rápido.",
          "Uma estrutura com ritmo estável aguenta mais conteúdo sem perder clareza no caminho.",
        ],
      },
    ],
    takeaways: [
      "Hierarquia vive de contraste e espaço.",
      "Ritmo melhora navegação.",
      "A manutenção também precisa caber no layout.",
    ],
    tags: ["Hierarquia", "Layout", "Tipografia"],
  },
  {
    slug: "uma-borda-certa-define-o-foco",
    status: "Rascunho 09",
    publishedAt: "5 de março de 2025",
    publishedAtIso: "2025-03-05",
    title: "Uma borda certa define o foco",
    description:
      "Quando o contorno é usado com intenção, ele separa sem gritar e ajuda a leitura a seguir em frente.",
    meta: ["Foco", "3 min"],
    intro:
      "Borda em excesso vira moldura. Borda no lugar certo vira sinal de atenção e dá contorno ao que importa.",
    sections: [
      {
        title: "Contorno não é decoração",
        paragraphs: [
          "Traço de separação funciona quando resolve agrupamento, contraste ou ordem. Se não houver motivo, ele pesa mais do que ajuda.",
          "A borda certa não chama a atenção para si. Ela ajuda a tela a ficar mais clara.",
        ],
      },
      {
        title: "Separar sem isolar",
        paragraphs: [
          "O limite visual precisa distinguir sem quebrar a continuidade da página.",
          "Quando o contorno fica duro demais, ele interrompe a leitura; quando fica leve demais, ele desaparece.",
        ],
      },
      {
        title: "O limite também ensina",
        paragraphs: [
          "Borda, sombra e respiro são maneiras diferentes de dizer onde começa e onde termina cada coisa.",
          "A melhor escolha costuma ser a que resolve o foco com menos distração.",
        ],
      },
    ],
    takeaways: [
      "Borda só ajuda com intenção.",
      "Separar não é isolar.",
      "O foco aparece no limite certo.",
    ],
    tags: ["Borda", "Foco", "Interface"],
  },
  {
    slug: "quando-a-lista-passa-a-organizar-o-conteudo",
    status: "Rascunho 10",
    publishedAt: "18 de abril de 2025",
    publishedAtIso: "2025-04-18",
    title: "Quando a lista passa a organizar o conteúdo",
    description:
      "Uma nota sobre sequência, repetição e o papel da lista como instrumento de leitura.",
    meta: ["Estrutura", "5 min"],
    intro:
      "Uma lista boa não só empilha itens. Ela cria ordem suficiente para a leitura decidir por onde entrar.",
    sections: [
      {
        title: "Listas não servem só para agrupar",
        paragraphs: [
          "Quando a lista assume função, ela deixa de ser um depósito de itens e vira uma ferramenta de navegação.",
          "A repetição do formato ajuda a comparar sem esforço e reduz a chance de cada item disputar atenção sozinho.",
        ],
      },
      {
        title: "Prioridade aparece na ordem",
        paragraphs: [
          "A posição de um item comunica mais do que parece. O primeiro elemento cria expectativa, e o último costuma reforçar a lembrança.",
          "Ordenar bem é uma forma silenciosa de orientar a leitura sem precisar acrescentar explicação extra.",
        ],
      },
      {
        title: "A lista também oferece contexto",
        paragraphs: [
          "Um conjunto de itens revela padrões que um item isolado não mostra.",
          "Quando a estrutura está clara, a pessoa entende mais rápido o que é recorrente, o que é exceção e o que merece atenção agora.",
        ],
      },
    ],
    takeaways: [
      "Lista boa também orienta.",
      "A ordem comunica prioridade.",
      "Repetição pode reduzir esforço.",
    ],
    tags: ["Estrutura", "Lista", "Leitura"],
  },
  {
    slug: "contraste-suficiente-faz-o-sinal-aparecer",
    status: "Rascunho 11",
    publishedAt: "30 de maio de 2025",
    publishedAtIso: "2025-05-30",
    title: "Contraste suficiente faz o sinal aparecer",
    description:
      "Uma nota sobre destacar sem exagerar e sobre como o olho percebe prioridade.",
    meta: ["Contraste", "4 min"],
    intro:
      "Quando o contraste é calibrado, a leitura encontra o que precisa sem esforço extra.",
    sections: [
      {
        title: "Destaque não precisa gritar",
        paragraphs: [
          "Um sinal forte não depende de excesso. Às vezes basta separar melhor o que precisa ser visto do que pode permanecer de fundo.",
          "Se tudo chama atenção ao mesmo tempo, nada vence a disputa.",
        ],
      },
      {
        title: "Camadas competem menos quando o contraste é estável",
        paragraphs: [
          "O leitor entende melhor quando a relação entre texto, fundo e controles se mantém previsível.",
          "Contraste estável reduz a necessidade de adivinhação e deixa a hierarquia mais honesta.",
        ],
      },
      {
        title: "A hierarquia fica mais clara quando o ruído cai",
        paragraphs: [
          "Não é só a força da cor ou da sombra que define atenção. O que fica de fora também importa.",
          "Menos interferência visual dá mais espaço para o sinal certo aparecer na hora certa.",
        ],
      },
    ],
    takeaways: [
      "Contraste bom não grita.",
      "Hierarquia depende de estabilidade.",
      "Ruído baixo melhora leitura.",
    ],
    tags: ["Contraste", "Hierarquia", "Foco"],
  },
  {
    slug: "o-resumo-certo-encurta-a-decisao",
    status: "Rascunho 12",
    publishedAt: "20 de junho de 2025",
    publishedAtIso: "2025-06-20",
    title: "O resumo certo encurta a decisão",
    description:
      "Resumir bem não é reduzir o conteúdo; é deixar visível o que merece atenção primeiro.",
    meta: ["Resumo", "4 min"],
    intro:
      "Um bom resumo não encurta a ideia: ele encurta o caminho entre a atenção e a decisão.",
    sections: [
      {
        title: "Resumo aponta antes de explicar",
        paragraphs: [
          "Quando a síntese funciona, ela diz o suficiente para a pessoa saber se vale seguir adiante.",
          "O resumo não substitui o conteúdo, mas reduz o custo de iniciar a leitura.",
        ],
      },
      {
        title: "Preview precisa de função",
        paragraphs: [
          "Uma prévia sem utilidade só ocupa espaço.",
          "Quando ela antecipa contexto, o usuário consegue priorizar sem abrir tudo às cegas.",
        ],
      },
      {
        title: "Resumo bom organiza expectativa",
        paragraphs: [
          "A primeira frase já pode orientar o tom, o alcance e a profundidade do restante.",
          "Se o início promete uma coisa e entrega outra, a leitura começa desalinhada.",
        ],
      },
    ],
    takeaways: [
      "Resumo bom encurta a decisão.",
      "Prévia precisa ter função.",
      "Expectativa alinhada melhora leitura.",
    ],
    tags: ["Resumo", "Clareza", "Conteúdo"],
  },
  {
    slug: "quando-o-fluxo-se-explica-sozinho",
    status: "Rascunho 13",
    publishedAt: "8 de agosto de 2025",
    publishedAtIso: "2025-08-08",
    title: "Quando o fluxo se explica sozinho",
    description:
      "A interface fica melhor quando o próximo passo é óbvio sem precisar de instrução extra.",
    meta: ["Fluxo", "5 min"],
    intro:
      "Fluxo bom não exige mapa. Ele faz a própria sequência parecer natural.",
    sections: [
      {
        title: "O caminho precisa ser previsível",
        paragraphs: [
          "Se o usuário não consegue prever o efeito de uma ação, ele desacelera.",
          "Fluxos consistentes reduzem retrabalho e tornam a navegação mais confiável.",
        ],
      },
      {
        title: "Continuidade reduz fricção",
        paragraphs: [
          "Cada tela deveria parecer a continuação lógica da anterior.",
          "Quando o estado, a linguagem e a posição dos controles se alinham, a jornada fica mais fluida.",
        ],
      },
      {
        title: "Instrução entra só quando precisa",
        paragraphs: [
          "A orientação explícita é valiosa, mas não precisa dominar tudo.",
          "Quando o sistema já se explica bem, a ajuda extra serve como apoio e não como muleta.",
        ],
      },
    ],
    takeaways: [
      "Fluxo previsível reduz atrito.",
      "Continuidade ajuda a navegar.",
      "Instrução só entra quando falta sinal.",
    ],
    tags: ["Fluxo", "Navegação", "UX"],
  },
  {
    slug: "a-ordem-da-pagina-tambem-e-argumento",
    status: "Rascunho 14",
    publishedAt: "19 de setembro de 2025",
    publishedAtIso: "2025-09-19",
    title: "A ordem da página também é argumento",
    description:
      "Posicionar conteúdo é também defender o que vem antes e o que fica depois.",
    meta: ["Layout", "5 min"],
    intro:
      "A ordem de uma página nunca é neutra. Ela diz o que importa primeiro e o que pode esperar.",
    sections: [
      {
        title: "Sequência é uma forma de argumento",
        paragraphs: [
          "Ao colocar um bloco antes do outro, a interface sugere prioridade sem recorrer a discurso.",
          "A sequência certa diminui o esforço para entender o que veio primeiro e por quê.",
        ],
      },
      {
        title: "Espaço entre blocos também comunica",
        paragraphs: [
          "O intervalo entre áreas ajuda a marcar mudança de assunto.",
          "Quando o respiro é bem calibrado, a página não parece apressada nem pesada demais.",
        ],
      },
      {
        title: "Mover elementos muda a leitura",
        paragraphs: [
          "Pequenas trocas de posição alteram a interpretação de importância.",
          "Por isso layout não é só forma; ele é parte da argumentação da tela.",
        ],
      },
    ],
    takeaways: [
      "Ordem também é argumento.",
      "Espaço marca mudança de assunto.",
      "Mover elementos altera prioridade.",
    ],
    tags: ["Layout", "Estrutura", "Hierarquia"],
  },
  {
    slug: "camadas-que-nao-disputam-atencao",
    status: "Rascunho 15",
    publishedAt: "7 de novembro de 2025",
    publishedAtIso: "2025-11-07",
    title: "Camadas que não disputam atenção",
    description:
      "Detalhes bons são os que ajudam sem virar o centro da tela.",
    meta: ["Polish", "3 min"],
    intro:
      "Os melhores detalhes não pedem aplauso. Eles sustentam a página em silêncio.",
    sections: [
      {
        title: "Acabamento não precisa dominar",
        paragraphs: [
          "Sombras, bordas e microinterações existem para apoiar a leitura, não para competir com ela.",
          "Quando o acabamento é discreto, ele melhora a experiência sem dominar o repertório visual.",
        ],
      },
      {
        title: "Profundidade útil é discreta",
        paragraphs: [
          "Camadas visuais funcionam melhor quando ajudam a separar sem criar espetáculo.",
          "Se a profundidade aparece demais, ela passa a exigir mais do que entrega.",
        ],
      },
      {
        title: "Polimento bom reduz atrito",
        paragraphs: [
          "A sensação de produto acabado vem de pequenos alinhamentos que evitam ruído e hesitação.",
          "O detalhe certo resolve a borda da experiência e deixa o conteúdo respirar.",
        ],
      },
    ],
    takeaways: [
      "Detalhe bom é discreto.",
      "Profundidade não precisa chamar atenção.",
      "Polimento reduz atrito.",
    ],
    tags: ["Polish", "Detalhe", "Interface"],
  },
] as const satisfies readonly BlogPost[];

const blogPostsByPublishedDate = [...blogPosts].sort((left, right) =>
  right.publishedAtIso.localeCompare(left.publishedAtIso),
);

export const blogEntries = blogPostsByPublishedDate.map(
  ({ slug, status, publishedAt, title, description, meta, tags }) => ({
    slug,
    status,
    publishedAt,
    title,
    description,
    meta,
    tags,
    href: `/blog/${slug}`,
  }),
);

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getBlogPostNavigation(slug: string) {
  const index = blogPostsByPublishedDate.findIndex((post) => post.slug === slug);

  if (index < 0) {
    return null;
  }

  return {
    previousPost: blogPostsByPublishedDate[index - 1] ?? null,
    nextPost: blogPostsByPublishedDate[index + 1] ?? null,
  };
}

export function getBlogPostSlugs() {
  return blogPostsByPublishedDate.map(({ slug }) => ({ slug }));
}

export function buildBlogSearchHref({
  query,
  page,
}: {
  query?: string;
  page?: number;
}) {
  const searchParams = new URLSearchParams();

  if (query?.trim()) {
    searchParams.set("q", query.trim());
  }

  if (page && page > 1) {
    searchParams.set("page", String(page));
  }

  const queryString = searchParams.toString();

  return queryString ? `/blog?${queryString}` : "/blog";
}

export function filterBlogEntries({
  query,
}: {
  query?: string;
}) {
  const normalizedQuery = normalizeBlogValue(query ?? "");

  return blogEntries.filter((entry) => {
    const matchesQuery =
      !normalizedQuery ||
      normalizeBlogValue(
        [
          entry.status,
          entry.publishedAt,
          entry.title,
          entry.description,
          ...entry.meta,
        ].join(" "),
      ).includes(normalizedQuery);

    return matchesQuery;
  });
}

export function normalizeBlogPageNumber(value?: string) {
  const parsedValue = Number.parseInt(value ?? "", 10);

  if (!Number.isFinite(parsedValue) || parsedValue < 1) {
    return 1;
  }

  return parsedValue;
}

export function paginateBlogEntries(
  entries: readonly BlogEntry[],
  {
    page,
    perPage,
  }: {
    page: number;
    perPage: number;
  },
) {
  const totalEntries = entries.length;
  const totalPages = Math.max(1, Math.ceil(totalEntries / perPage));
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const startIndex = totalEntries ? (currentPage - 1) * perPage : 0;
  const endIndex = totalEntries ? Math.min(startIndex + perPage, totalEntries) : 0;

  return {
    entries: entries.slice(startIndex, endIndex),
    currentPage,
    totalEntries,
    totalPages,
    startIndex,
    endIndex,
  };
}

function normalizeBlogValue(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}
