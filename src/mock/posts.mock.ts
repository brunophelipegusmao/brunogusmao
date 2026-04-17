import type { BlogPost } from '@/app/(public)/blog/posts';

export const blogPosts: BlogPost[] = [
   {
      slug: 'arquitetura-frontend-sem-drama',
      index: '01',
      title: 'Arquitetura Frontend Sem Drama',
      excerpt:
         'Como organizar uma base React/Next para crescer com previsibilidade, sem virar um monolito de componentes acoplados.',
      publishedAt: '10 Abr 2026',
      readingTime: '7 min',
      category: 'Arquitetura',
      tags: ['Next.js', 'React', 'Arquitetura', 'Escalabilidade'],
      coverImage: {
         src: 'https://bmcorelayer.vercel.app/covers/blog-arquitetura-frontend.png',
         alt: 'Diagrama editorial de arquitetura frontend com módulos em grid azul.',
      },
      sections: [
         {
            heading: 'O problema não é tecnologia, é fronteira',
            paragraphs: [
               'Projetos frontend costumam degradar quando as fronteiras entre página, domínio e componente ficam borradas. O resultado aparece rápido: regra de negócio no JSX, componentes gigantes e manutenção cara.',
               'Uma arquitetura saudável separa intenção de apresentação. A página orquestra, os blocos rendem, e os componentes UI permanecem pequenos e previsíveis.',
            ],
         },
         {
            heading: 'Trate layout como sistema',
            paragraphs: [
               'Design consistente não nasce de copiar classes entre páginas. Nasce de um sistema com tokens, ritmo tipográfico e blocos reutilizáveis. Isso reduz variação acidental e aumenta velocidade de entrega.',
               'No App Router, o ganho é maior: você compõe seções server-side e ativa client-side apenas onde existe interação real.',
            ],
            image: {
               src: 'https://bmcorelayer.vercel.app/covers/blog-layout-sistema.png',
               alt: 'Blocos tipográficos e grid assimétrico representando sistema de layout.',
               caption:
                  'Layout previsível acelera manutenção e reduz inconsistência.',
            },
         },
         {
            heading: 'Regra prática para evoluir',
            paragraphs: [
               'Sempre que uma seção se repete pela segunda vez, extraia. Sempre que um componente recebe props demais, divida responsabilidades. Sempre que houver dúvida, escolha legibilidade.',
            ],
         },
      ],
   },
   {
      slug: 'design-sistemas-que-respiram',
      index: '02',
      title: 'Design de Sistemas que Respiram',
      excerpt:
         'Padrões visuais fortes não precisam de excesso: tipografia, contraste e espaço negativo fazem o trabalho pesado.',
      publishedAt: '05 Abr 2026',
      readingTime: '6 min',
      category: 'Design',
      tags: ['UI', 'UX', 'Tipografia', 'Sistema'],
      coverImage: {
         src: 'https://bmcorelayer.vercel.app/covers/blog-design-sistemas.png',
         alt: 'Composição editorial com tipografia forte e espaço negativo.',
      },
      sections: [
         {
            heading: 'Consistência é uma decisão',
            paragraphs: [
               'Quando cada tela inventa sua própria hierarquia, o usuário paga o custo cognitivo. Um sistema visual bom elimina ruído e deixa a mensagem principal evidente.',
               'A combinação de uma fonte estrutural forte com uma fonte técnica para metadados cria contraste sem precisar de ornamentação gratuita.',
            ],
         },
         {
            heading: 'Espaço também comunica',
            paragraphs: [
               'Espaço negativo não é vazio: ele organiza prioridade. Em interfaces editoriais, o respiro orienta leitura e cria tensão visual controlada.',
            ],
         },
      ],
   },
   {
      slug: 'backend-orientado-a-produto',
      index: '03',
      title: 'Backend Orientado a Produto',
      excerpt:
         'APIs boas não são as mais elegantes no papel. São as que ajudam o produto a evoluir sem quebrar quem depende delas.',
      publishedAt: '28 Mar 2026',
      readingTime: '8 min',
      category: 'Backend',
      tags: ['API', 'Node.js', 'Versionamento', 'Produto'],
      coverImage: {
         src: 'https://bmcorelayer.vercel.app/covers/blog-backend-produto.png',
         alt: 'Fluxo de API com contratos e versionamento em fundo azul escuro.',
      },
      sections: [
         {
            heading: 'Contrato primeiro, implementação depois',
            paragraphs: [
               'Sem contrato claro, cada consumer interpreta o endpoint de um jeito. Isso cria retrabalho e bugs de integração difíceis de rastrear.',
               'Definir payloads, erros e limites antes de codar reduz ambiguidades e melhora a relação entre frontend e backend.',
            ],
         },
         {
            heading: 'Evoluir sem ruptura',
            paragraphs: [
               'A regra é simples: manter compatibilidade por padrão e quebrar apenas com intenção explícita. Versionamento e depreciação documentada são parte do produto, não detalhe técnico.',
            ],
         },
      ],
   },
   {
      slug: 'checklist-pre-ship-frontend',
      index: '04',
      title: 'Checklist Pre-Ship de Frontend',
      excerpt:
         'Antes de enviar para produção: performance, acessibilidade, semântica e observabilidade precisam estar no mesmo pacote.',
      publishedAt: '20 Mar 2026',
      readingTime: '5 min',
      category: 'Qualidade',
      tags: ['Acessibilidade', 'Performance', 'QA', 'Entrega'],
      coverImage: {
         src: 'https://bmcorelayer.vercel.app/covers/blog-checklist-pre-ship.png',
         alt: 'Checklist técnico de frontend com marcações e blocos editoriais.',
      },
      sections: [
         {
            heading: 'Entrega com confiança',
            paragraphs: [
               'Publicar rápido sem critério só troca velocidade por retrabalho. Um checklist curto e objetivo reduz regressão e aumenta previsibilidade.',
               'Os itens mínimos: contraste, foco visível, imagens otimizadas, layout estável e erros observáveis.',
            ],
         },
         {
            heading: 'Disciplina vence heroísmo',
            paragraphs: [
               'Times consistentes não dependem de memória individual. Dependem de padrão claro, automatização e revisão de qualidade antes de cada release.',
            ],
         },
      ],
   },
   {
      slug: 'padroes-de-componentes-reutilizaveis',
      index: '05',
      title: 'Padrões de Componentes Reutilizáveis',
      excerpt:
         'Quando um componente vira produto interno: API limpa, estados previsíveis e evolução sem breaking changes desnecessários.',
      publishedAt: '12 Mar 2026',
      readingTime: '6 min',
      category: 'Frontend',
      tags: ['Componentes', 'API', 'Design System'],
      coverImage: {
         src: 'https://bmcorelayer.vercel.app/covers/blog-componentes-reutilizaveis.png',
         alt: 'Sistema de componentes em módulos com linhas técnicas e tipografia forte.',
      },
      sections: [
         {
            heading: 'Reuso sem acoplamento',
            paragraphs: [
               'Um bom componente resolve um problema claro e permanece neutro em relação à página que o consome.',
               'Se o componente conhece demais o contexto, ele deixa de ser base e passa a ser exceção disfarçada.',
            ],
         },
         {
            heading: 'Estados fazem parte da API',
            paragraphs: [
               'Loading, erro e vazio não são detalhes visuais. São contratos de uso e devem ser previsíveis para todo o time.',
            ],
         },
      ],
   },
   {
      slug: 'narrativa-visual-em-paginas-tecnicas',
      index: '06',
      title: 'Narrativa Visual em Páginas Técnicas',
      excerpt:
         'Mesmo páginas de engenharia podem contar uma história clara com ritmo, contraste e hierarquia de informação.',
      publishedAt: '03 Mar 2026',
      readingTime: '5 min',
      category: 'Design',
      tags: ['Narrativa', 'Layout', 'Hierarquia'],
      coverImage: {
         src: 'https://bmcorelayer.vercel.app/covers/blog-narrativa-visual.png',
         alt: 'Página editorial com blocos narrativos e destaques visuais em azul.',
      },
      sections: [
         {
            heading: 'Primeiro leitura, depois interação',
            paragraphs: [
               'Uma página técnica eficiente orienta o olhar antes de pedir ação. Isso reduz abandono e melhora compreensão.',
            ],
         },
         {
            heading: 'Ritmo é decisão de produto',
            paragraphs: [
               'Ritmo de conteúdo define percepção de qualidade. Blocos curtos, títulos fortes e respiração adequada aceleram entendimento.',
            ],
         },
      ],
   },
   {
      slug: 'metrica-que-realmente-importa',
      index: '07',
      title: 'Métrica que Realmente Importa',
      excerpt:
         'Nem toda métrica operacional merece virar KPI. Como escolher indicadores que refletem valor real para o produto.',
      publishedAt: '24 Fev 2026',
      readingTime: '7 min',
      category: 'Produto',
      tags: ['KPI', 'Produto', 'Métricas'],
      coverImage: {
         src: 'https://bmcorelayer.vercel.app/covers/blog-metricas-produto.png',
         alt: 'Painel de métricas de produto com foco em indicadores essenciais.',
      },
      sections: [
         {
            heading: 'Métricas de vaidade custam caro',
            paragraphs: [
               'Dashboards inflados escondem os sinais importantes. O foco deve estar no que orienta decisão, não no que impressiona reunião.',
            ],
         },
         {
            heading: 'Conecte indicador a ação',
            paragraphs: [
               'Todo indicador deve sugerir ação concreta quando desvia. Sem isso, ele vira ornamentação analítica.',
            ],
         },
      ],
   },
   {
      slug: 'api-design-para-times-reais',
      index: '08',
      title: 'API Design para Times Reais',
      excerpt:
         'Design de API não é exercício teórico: é colaboração entre consumidores diferentes, prazos curtos e decisões permanentes.',
      publishedAt: '15 Fev 2026',
      readingTime: '8 min',
      category: 'Backend',
      tags: ['API', 'Contratos', 'Integração'],
      coverImage: {
         src: 'https://bmcorelayer.vercel.app/covers/blog-api-design.png',
         alt: 'Esquema de contrato de API e payloads em uma prancha azul editorial.',
      },
      sections: [
         {
            heading: 'Evite endpoints ambíguos',
            paragraphs: [
               'Nome, payload e resposta precisam contar a mesma história. Ambiguidade em contrato vira bug distribuído.',
            ],
         },
         {
            heading: 'Versionar é cuidar de quem já usa',
            paragraphs: [
               'Toda evolução deve respeitar consumidores ativos. Quebra de contrato sem plano de transição compromete confiança.',
            ],
            image: {
               src: 'https://bmcorelayer.vercel.app/covers/blog-versionamento-api.png',
               alt: 'Linha temporal de versões de API com pontos de depreciação.',
               caption:
                  'Compatibilidade progressiva reduz custo de integração.',
            },
         },
      ],
   },
   {
      slug: 'deploy-seguro-sem-burocracia',
      index: '09',
      title: 'Deploy Seguro Sem Burocracia',
      excerpt:
         'A combinação de checklist, automação e rollback claro permite velocidade com risco controlado.',
      publishedAt: '07 Fev 2026',
      readingTime: '6 min',
      category: 'DevOps',
      tags: ['Deploy', 'CI/CD', 'Rollback'],
      coverImage: {
         src: 'https://bmcorelayer.vercel.app/covers/blog-deploy-seguro.png',
         alt: 'Pipeline de deploy com validações e rollback em estilo editorial azul.',
      },
      sections: [
         {
            heading: 'Confiabilidade vem do processo',
            paragraphs: [
               'Não existe release segura baseada em sorte. O caminho é padronização mínima com validações automatizadas.',
            ],
         },
         {
            heading: 'Rollback é parte do design',
            paragraphs: [
               'Se não há plano de reversão, ainda não está pronto para produção.',
            ],
         },
      ],
   },
   {
      slug: 'microinteracoes-com-intencao',
      index: '10',
      title: 'Microinterações com Intenção',
      excerpt:
         'Movimento em interface deve orientar, não distrair. Como aplicar animação para feedback e legibilidade.',
      publishedAt: '30 Jan 2026',
      readingTime: '5 min',
      category: 'UX',
      tags: ['Motion', 'Microinterações', 'Feedback'],
      coverImage: {
         src: 'https://bmcorelayer.vercel.app/covers/blog-microinteracoes.png',
         alt: 'Sequência de microinterações com animação de foco e transição suave.',
      },
      sections: [
         {
            heading: 'Animação como linguagem de estado',
            paragraphs: [
               'Pequenas transições explicam mudança de estado sem exigir texto extra.',
               'Quando o movimento reforça intenção, a interface parece mais clara e confiável.',
            ],
         },
         {
            heading: 'Menos efeitos, mais função',
            paragraphs: [
               'Escolher poucos padrões e repetir com consistência gera percepção de qualidade superior.',
            ],
         },
      ],
   },
   {
      slug: 'acessibilidade-na-pratica',
      index: '11',
      title: 'Acessibilidade na Prática',
      excerpt:
         'Acessibilidade não é etapa final. É critério de construção desde o primeiro componente.',
      publishedAt: '21 Jan 2026',
      readingTime: '7 min',
      category: 'Qualidade',
      tags: ['A11y', 'Frontend', 'UX'],
      coverImage: {
         src: 'https://bmcorelayer.vercel.app/covers/blog-acessibilidade-pratica.png',
         alt: 'Interface com foco visível e contraste para acessibilidade digital.',
      },
      sections: [
         {
            heading: 'Teclado primeiro',
            paragraphs: [
               'Navegação por teclado revela rapidamente problemas de foco, ordem e semântica.',
               'Se o fluxo não funciona sem mouse, o componente ainda está incompleto.',
            ],
         },
         {
            heading: 'Contraste e legibilidade',
            paragraphs: [
               'Contraste adequado e tipografia clara aumentam compreensão para todas as pessoas, não apenas para públicos específicos.',
            ],
         },
      ],
   },
   {
      slug: 'qualidade-com-tempo-curto',
      index: '12',
      title: 'Qualidade com Tempo Curto',
      excerpt:
         'Como elevar padrão técnico em sprints apertadas usando prioridades certas e decisões de alto impacto.',
      publishedAt: '12 Jan 2026',
      readingTime: '6 min',
      category: 'Processo',
      tags: ['Processo', 'Qualidade', 'Entrega'],
      coverImage: {
         src: 'https://bmcorelayer.vercel.app/covers/blog-qualidade-tempo-curto.png',
         alt: 'Checklist técnico em uma mesa de trabalho com tipografia editorial.',
      },
      sections: [
         {
            heading: 'Prioridade por risco',
            paragraphs: [
               'Quando o prazo aperta, priorizar por risco evita desperdício: primeiro o que pode quebrar produção.',
            ],
         },
         {
            heading: 'Acordos explícitos de qualidade',
            paragraphs: [
               'Definir um piso de qualidade compartilhado reduz discussão tardia e melhora previsibilidade do time.',
            ],
         },
      ],
   },
];
