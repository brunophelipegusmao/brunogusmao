# brunogusmao.dev

Portfolio pessoal de Bruno Gusmao, desenvolvido com foco em uma identidade
editorial brutalista e em uma base frontend organizada para evolucao gradual.

Este README documenta o frontend atual do projeto: setup local, arquitetura,
rotas, autenticacao, design system, blog publico e a area privada de gestao de
conteudo.

## Visao Geral

O projeto esta estruturado em Next.js 16 com App Router, React 19 e
TypeScript 5. A interface combina:

- homepage altamente tipografica com animacoes CSS puras
- rotas publicas para apresentacao, portfolio, blog e contato
- fluxo de autenticacao administrativa por JWT em cookie httpOnly
- area privada para gestao de posts e portfolio
- design system baseado em tokens CSS, Tailwind CSS v4 e componentes Base UI

No estado atual, o frontend do blog e do dashboard de posts ja esta montado, mas
a persistencia real dos posts ainda e uma proxima etapa de backend.

## Stack do Frontend

| Camada                 | Tecnologia                                     |
| ---------------------- | ---------------------------------------------- |
| Framework              | Next.js 16.2.3                                 |
| Roteamento             | App Router com route groups                    |
| UI                     | React 19.2.4                                   |
| Tipagem                | TypeScript 5                                   |
| Estilos                | Tailwind CSS v4                                |
| Temas                  | next-themes                                    |
| Primitivos UI          | @base-ui/react + wrappers em src/components/ui |
| Utilitarios de classe  | clsx + tailwind-merge + cva                    |
| Icones                 | lucide-react                                   |
| Lint e formatacao      | Biome 2.2.0                                    |
| Gerenciador de pacotes | pnpm                                           |
| Bundler de dev         | Turbopack                                      |

## Requisitos

Antes de rodar o projeto localmente, tenha instalado:

- Node.js 20 ou superior
- pnpm

## Configuracao de Ambiente

O projeto usa variaveis simples para o fluxo de login administrativo.

Arquivo de referencia:

```bash
.env.example
```

Conteudo atual:

```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=change-me-now
JWT_SECRET=use-a-random-secret-with-at-least-32-characters
```

Para desenvolvimento local:

1. copie `.env.example` para `.env.local`
2. ajuste usuario, senha e JWT_SECRET
3. use um segredo com pelo menos 32 caracteres

## Como Rodar Localmente

### 1. Instalar dependencias

```bash
pnpm install
```

### 2. Configurar ambiente

```bash
cp .env.example .env.local
```

### 3. Iniciar o servidor de desenvolvimento

```bash
pnpm dev
```

Por padrao o app sobe em:

```text
http://localhost:3000
```

## Scripts Disponiveis

| Comando       | Descricao                            |
| ------------- | ------------------------------------ |
| `pnpm dev`    | Inicia o servidor de desenvolvimento |
| `pnpm build`  | Gera build de producao               |
| `pnpm start`  | Inicia a build de producao           |
| `pnpm lint`   | Executa `biome check` no projeto     |
| `pnpm format` | Executa `biome format --write`       |

## Documentacao da API

Swagger UI inicial disponivel em:

```text
http://localhost:3000/api/docs
```

Especificacao OpenAPI em JSON:

```text
http://localhost:3000/api/openapi
```

## Arquitetura de Rotas

O frontend usa route groups para separar responsabilidades sem alterar a URL.

```text
src/app/
├── layout.tsx
├── page.tsx
├── globals.css
├── (public)/
│   ├── CLAUDE.md
│   ├── about/page.tsx
│   ├── portfolio/page.tsx
│   ├── blog/
│   │   ├── page.tsx
│   │   ├── posts.ts
│   │   └── [slug]/page.tsx
│   └── contact/page.tsx
├── (auth)/
│   ├── layout.tsx
│   └── login/page.tsx
├── (private)/
│   ├── layout.tsx
│   ├── dashboard/
│   │   ├── page.tsx
│   │   ├── posts/
│   │   │   ├── page.tsx
│   │   │   ├── new/page.tsx
│   │   │   └── [slug]/edit/page.tsx
│   │   └── projects/page.tsx
│   └── kanban/page.tsx
└── api/
    └── auth/
    ├── login/route.ts
    └── logout/route.ts
```

### Route groups usados

| Grupo       | Papel                           |
| ----------- | ------------------------------- |
| `(public)`  | Páginas publicas do portfolio   |
| `(auth)`    | Tela de login administrativo    |
| `(private)` | Área protegida por autenticacao |

## Mapa de Rotas

| Rota                           | Tipo    | Arquivo                                                  | Observacao                         |
| ------------------------------ | ------- | -------------------------------------------------------- | ---------------------------------- |
| `/`                            | Publica | `src/app/page.tsx`                                       | Homepage com hero tipografico      |
| `/about`                       | Publica | `src/app/(public)/about/page.tsx`                        | Pagina institucional               |
| `/portfolio`                   | Publica | `src/app/(public)/portfolio/page.tsx`                    | Portfolio publico                  |
| `/blog`                        | Publica | `src/app/(public)/blog/page.tsx`                         | Lista de posts                     |
| `/blog/[slug]`                 | Publica | `src/app/(public)/blog/[slug]/page.tsx`                  | Post individual                    |
| `/contact`                     | Publica | `src/app/(public)/contact/page.tsx`                      | Contato                            |
| `/login`                       | Auth    | `src/app/(auth)/login/page.tsx`                          | Login administrativo               |
| `/dashboard`                   | Privada | `src/app/(private)/dashboard/page.tsx`                   | Painel principal                   |
| `/dashboard/posts`             | Privada | `src/app/(private)/dashboard/posts/page.tsx`             | Gestao de posts                    |
| `/dashboard/posts/new`         | Privada | `src/app/(private)/dashboard/posts/new/page.tsx`         | Criacao de novo post               |
| `/dashboard/posts/[slug]/edit` | Privada | `src/app/(private)/dashboard/posts/[slug]/edit/page.tsx` | Edicao de post                     |
| `/dashboard/projects`          | Privada | `src/app/(private)/dashboard/projects/page.tsx`          | Gestao de portfolio                |
| `/kanban`                      | Privada | `src/app/(private)/kanban/page.tsx`                      | Placeholder de organizacao interna |

## Layout Global do Frontend

O arquivo `src/app/layout.tsx` define o shell raiz da aplicacao.

Responsabilidades:

- carrega as fontes Inter e Geist Mono via next/font
- injeta `ThemeProvider` para light/dark mode
- injeta `TooltipProvider` para componentes de UI
- define metadata base do projeto

O `ThemeProvider` fica em `src/components/ThemeProvider.tsx` e usa `next-themes`
com `defaultTheme="system"`.

## Autenticacao do Frontend Administrativo

O projeto tem um fluxo simples de autenticacao baseado em JWT assinado no
servidor e armazenado em cookie httpOnly.

### Arquivos principais

| Arquivo                            | Papel                                               |
| ---------------------------------- | --------------------------------------------------- |
| `middleware.ts`                    | Protege `/dashboard`, `/kanban` e controla `/login` |
| `src/lib/auth/jwt.ts`              | Gera e valida tokens JWT                            |
| `src/lib/auth/session.ts`          | Exponibiliza sessao no servidor                     |
| `src/app/api/auth/login/route.ts`  | Endpoint de login                                   |
| `src/app/api/auth/logout/route.ts` | Endpoint de logout                                  |
| `src/app/(auth)/login/page.tsx`    | Formulario de login                                 |
| `src/app/(private)/layout.tsx`     | Garante sessao antes de renderizar conteudo privado |

### Comportamento

- se o usuario tenta acessar rota privada sem sessao, o middleware redireciona
  para `/login`
- se o usuario acessa `/login` ja autenticado, o middleware redireciona para
  `/dashboard`
- o cookie de autenticacao e `httpOnly`, com foco em uso administrativo interno

### Tela de login

A tela de login atual:

- usa POST para `/api/auth/login`
- aceita `username`, `password` e `next`
- mostra erros de credenciais ausentes, invalidas ou ambiente nao configurado
- tem um pequeno recurso de lembrar usuario no `localStorage`

## Design System

O design system esta concentrado principalmente em `src/app/globals.css`.

### Direcao visual

- tipografia estrutural forte com Goldman
- paleta fria em oklch
- contraste alto e bordas visiveis
- composicoes assimetricas e atmosfera editorial
- animacoes em CSS puro

### Fontes

| Papel   | Fonte      | Uso                                   |
| ------- | ---------- | ------------------------------------- |
| Display | Goldman    | Títulos estruturais e identidade      |
| Sans    | Inter      | Corpo e UI geral                      |
| Mono    | Geist Mono | Labels tecnicos, metadata e navegação |

### Tokens e variaveis CSS

O projeto usa dois niveis de tokens:

1. variaveis de design proprietarias
2. aliases compatíveis com os wrappers de UI

Exemplos importantes:

- `--blue-base`
- `--blue-hover`
- `--blue-dark`
- `--text-primary`
- `--text-secondary`
- `--text-muted`
- `--border`
- `--border-strong`

### Animacoes principais

Definidas diretamente em `globals.css`:

| Keyframe         | Uso                            |
| ---------------- | ------------------------------ |
| `slide-in-left`  | Entrada do nome BRUNO          |
| `slide-in-right` | Entrada do nome GUSMAO         |
| `fade-up`        | Subida suave de textos e CTAs  |
| `blink`          | Cursor do hero                 |
| `ticker-scroll`  | Faixa de tecnologias           |
| `nav-underline`  | Underline animado da navegacao |

### Classes customizadas relevantes

| Grupo               | Uso                    |
| ------------------- | ---------------------- |
| `.hero-*`           | Homepage               |
| `.nav-link`         | Header e active state  |
| `.blog-*`           | Blog publico           |
| `.terminal-login-*` | Pagina de login        |
| `.private-*`        | Layout da area privada |

## Componentes Principais

### Header

Arquivo: `src/components/Header/index.tsx`

Responsabilidades:

- navegacao principal desktop
- menu overlay mobile
- destaque de rota ativa com `usePathname()`
- toggle de tema com `useTheme()`
- lock de scroll quando o menu mobile esta aberto

### ThemeProvider

Arquivo: `src/components/ThemeProvider.tsx`

Responsavel por conectar o tema do app ao `next-themes`.

### Biblioteca de UI

Diretorio: `src/components/ui/`

Esses componentes encapsulam primitives do Base UI e seguem o design system do
projeto. Exemplos:

- button
- card
- dialog
- tabs
- select
- badge
- tooltip
- accordion

### Componentes de efeito e presentacao

Diretorio: `src/components/magicui/`

Exemplos:

- `blur-fade.tsx`
- `interactive-hover-button.tsx`
- `number-ticker.tsx`
- `particles.tsx`
- `ripple-button.tsx`
- `word-pull-up.tsx`

Esses componentes sustentam a camada visual mais expressiva do frontend.

## Homepage

Arquivo: `src/app/page.tsx`

A homepage concentra a linguagem visual principal do portfolio.

Elementos implementados:

- hero tipografico com o nome BRUNO GUSMAO
- cursor visual animado
- grid de fundo
- CTA para portfolio e contato
- ticker continuo com stack tecnologica
- `Header` fixo com tema e navegacao

## Blog Publico

Diretorio: `src/app/(public)/blog/`

### Fonte de dados

Arquivo: `src/app/(public)/blog/posts.ts`

O blog atualmente usa uma fonte estatica tipada em TypeScript.

### Modelo de dados

```ts
interface BlogPost {
   slug: string;
   index: string;
   title: string;
   excerpt: string;
   publishedAt: string;
   readingTime?: string;
   category: string;
   tags: string[];
   coverImage?: { src: string; alt: string };
   sections: BlogSection[];
}
```

As secoes aceitam blocos tipados, o que permite misturar texto e imagem sem HTML
livre:

```ts
type BlogSectionBlock =
   | { type: 'paragraph'; content: string }
   | { type: 'image'; image: BlogImageAsset };
```

### Listagem de posts

Arquivo: `src/app/(public)/blog/page.tsx`

Comportamento atual:

- lista os posts com cards
- usa capa do post ou fallback para `public/blog/default-cover.svg`
- escolhe `next/image` para assets otimizaveis
- usa `UnoptimizedImage` para imagens dinamicas fora da pipeline do Next

### Post individual

Arquivo: `src/app/(public)/blog/[slug]/page.tsx`

Comportamento atual:

- gera paginas por slug
- resolve metadata por post
- renderiza sections com blocos `paragraph` e `image`
- usa a mesma estrategia de capa/fallback da listagem

## Area Privada e Dashboard

Diretorio principal: `src/app/(private)/`

### Layout privado

Arquivo: `src/app/(private)/layout.tsx`

Responsabilidades:

- exige sessao valida com `requireSession()`
- desenha fundo com `Particles`
- envolve toda a area administrativa

### Dashboard principal

Arquivo: `src/app/(private)/dashboard/page.tsx`

Comportamento:

- mostra o shell principal da area privada
- usa `DashboardTabs`
- fornece atalho para `/kanban`
- permite logout por form POST

### Tabs do dashboard

Arquivo: `src/components/damin/dashboard/tabs.tsx`

Tabs atuais:

- posts
- portfolio

## Gestao de Posts no Dashboard

Esta e a frente de frontend mais evoluida no estado atual do projeto.

### Pagina de gestao

Arquivo: `src/app/(private)/dashboard/posts/page.tsx`

O conteudo e delegado para `ManagementHub`.

### ManagementHub

Arquivo: `src/components/damin/posts/management-hub.tsx`

Recursos implementados:

- listagem em accordion unico
- filtro e ordenacao de posts
- botao de retorno para `/dashboard`
- status editorial local
- controle visual de tags

### Editor de novo post

Arquivo: `src/components/damin/posts/new-post-editor.tsx`

Recursos implementados:

- criacao de titulo, slug, categoria, resumo e data
- status editorial do post
- selecao e criacao de tags
- capa com fallback
- seções e blocos reordenaveis
- blocos de texto e imagem
- preview do artigo
- snippets para inserir no `posts.ts` e no `posts-admin.ts`

### Editor de post existente

Arquivo: `src/app/(private)/dashboard/posts/[slug]/edit/page.tsx`

Usa `PostManagementPanel` para operacoes administrativas sobre posts ja
conhecidos pela base estatica atual.

### Limite atual desta frente

O dashboard de posts ainda nao persiste dados em banco nem expõe API de CRUD
real. O frontend esta preparado, mas a etapa backend ainda e pendente.

## Portfolio e Outras Areas

### Portfolio publico

Arquivo: `src/app/(public)/portfolio/page.tsx`

Exibe a frente publica de projetos.

### Projects no dashboard

Arquivo: `src/app/(private)/dashboard/projects/page.tsx`

Area administrativa relacionada ao portfolio.

### Kanban

Arquivo: `src/app/(private)/kanban/page.tsx`

Atualmente funciona como placeholder de organizacao interna, ja protegido por
autenticacao.

## Configuracao do Next.js Relevante ao Frontend

Arquivo: `next.config.ts`

Pontos importantes:

- `reactCompiler: true`
- `images.remotePatterns` permite apenas `https://bmcorelayer.vercel.app`
- `allowedDevOrigins` inclui IP local para evitar bloqueio em desenvolvimento
- `turbopack.root` usa `path.resolve(__dirname)` como workaround para paths com
  caracteres nao ASCII

## Estrutura de Diretorios Relevantes

```text
src/
├── app/
├── components/
│   ├── Header/
│   ├── magicui/
│   ├── damin/
│   └── ui/
└── lib/
        ├── auth/
        ├── content/
        ├── http/
        └── utils.ts
```

### O que fica em cada area

| Diretorio                | Papel                                  |
| ------------------------ | -------------------------------------- |
| `src/app`                | Rotas, layouts e paginas               |
| `src/components/Header`  | Navegacao principal                    |
| `src/components/magicui` | Efeitos e componentes visuais autorais |
| `src/components/damin`   | Componentes da area administrativa     |
| `src/components/ui`      | Biblioteca base de componentes         |
| `src/lib/auth`           | JWT e sessao                           |
| `src/lib/content`        | Dados e helpers de conteudo            |
| `src/lib/http`           | Helpers HTTP                           |

## Imagens e Midia

Existe uma restricao importante no frontend atual:

- imagens remotas otimizadas pelo Next so podem vir de
  `https://bmcorelayer.vercel.app`

Por isso foi criado o componente:

```text
src/components/ui/unoptimized-image.tsx
```

Ele e usado quando a imagem e dinamica ou nao faz parte da whitelist de
otimizacao.

## Estado Atual do Frontend

### Entregue

- homepage funcional com identidade visual forte
- navegacao publica e mobile
- dark mode
- login administrativo com JWT
- middleware de protecao de rotas privadas
- dashboard com tabs
- blog publico com listagem e post individual
- editor de novos posts com preview e estrutura segura

### Ainda pendente

- persistencia real dos posts
- CRUD backend para dashboard
- upload seguro de imagens
- integracao do editor com API em vez de snippets manuais

## Fluxo Recomendado para Trabalhar no Frontend

1. instalar dependencias com `pnpm install`
2. configurar `.env.local`
3. iniciar com `pnpm dev`
4. validar com `pnpm lint`
5. formatar com `pnpm format`

## Observacoes Importantes

- o projeto usa App Router e privilegia Server Components por padrao
- `use client` deve entrar apenas quando a pagina ou componente realmente
  precisar de interacao, estado ou APIs do browser
- o blog atual ainda e uma base estatica em arquivo TypeScript
- a fase backend da frente de posts esta planejada, mas ainda nao e a fonte de
  verdade do projeto

## Arquivos Mais Importantes para Entender o Frontend

| Arquivo                                          | Por que ler                              |
| ------------------------------------------------ | ---------------------------------------- |
| `src/app/layout.tsx`                             | Shell global da app                      |
| `src/app/page.tsx`                               | Homepage e linguagem visual principal    |
| `src/app/globals.css`                            | Tokens, classes customizadas e animacoes |
| `src/components/Header/index.tsx`                | Navegacao, tema e menu mobile            |
| `middleware.ts`                                  | Protecao de rotas                        |
| `src/app/(auth)/login/page.tsx`                  | Fluxo de login                           |
| `src/app/(public)/blog/posts.ts`                 | Modelo de conteudo do blog               |
| `src/app/(public)/blog/page.tsx`                 | Listagem do blog                         |
| `src/app/(public)/blog/[slug]/page.tsx`          | Post individual                          |
| `src/components/damin/posts/new-post-editor.tsx` | Editor estruturado de posts              |

## Proxima Etapa Natural

Se a evolucao continuar a partir deste frontend, o passo mais natural e ligar o
dashboard de posts a uma camada backend real, mantendo o mesmo shape de dados do
blog atual.
