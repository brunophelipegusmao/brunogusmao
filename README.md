# brunogusmao.dev

Portfolio pessoal de Bruno Gusmão — desenvolvedor Full Stack. Construído com Next.js 16, React 19, Tailwind CSS v4 e uma estética editorial-brutalista baseada em tipografia Goldman.

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 16 (App Router, React Compiler) |
| UI | React 19 |
| Tipagem | TypeScript 5 |
| Estilos | Tailwind CSS 4 + tw-animate-css |
| Primitivos | Base UI (`@base-ui/react`) + ShadCN |
| Fontes | Goldman (display) + Inter + Geist Mono |
| Linting | Biome 2.2 |
| Bundler dev | Turbopack |
| Pacotes | pnpm |

## Estrutura

```
src/
├── app/
│   ├── layout.tsx                   # Root layout — fontes, metadados, TooltipProvider
│   ├── page.tsx                     # Homepage — hero com tipografia gigante
│   ├── globals.css                  # Design system: paleta, tokens, animações CSS
│   └── [public]/
│       ├── about/page.tsx           # Sobre
│       ├── portfolio/page.tsx       # Projetos
│       ├── blog/
│       │   ├── page.tsx             # Lista de posts
│       │   └── [slug]/page.tsx      # Post individual
│       └── contact/page.tsx         # Contato
└── components/
    ├── Header/index.tsx             # Header fixo com active state e nav-link hover
    └── ui/                          # Componentes ShadCN/Base UI
        ├── alert.tsx
        ├── avatar.tsx
        ├── badge.tsx
        ├── breadcrumb.tsx
        ├── button.tsx
        ├── card.tsx
        ├── checkbox.tsx
        ├── context-menu.tsx
        ├── dialog.tsx
        ├── label.tsx
        ├── pagination.tsx
        ├── progress.tsx
        ├── radio-group.tsx
        ├── select.tsx
        ├── separator.tsx
        ├── skeleton.tsx
        ├── switch.tsx
        ├── tabs.tsx
        └── tooltip.tsx
```

## Design System

### Paleta de cores

O tema usa variáveis CSS diretas em `oklch` organizadas em dois níveis:

**Paleta base** (para uso em CSS customizado):
```css
--bg, --bg-subtle, --bg-muted, --bg-emphasis
--text-primary, --text-secondary, --text-muted, --text-on-accent
--border, --border-strong
--blue-subtle, --blue-muted, --blue-base, --blue-hover, --blue-dark, --blue-deep
```

**Tokens ShadCN** (para uso via classes Tailwind como `bg-background`, `text-foreground`):
```css
--background, --foreground, --primary, --muted-foreground, --border, --ring …
```

Dark mode está implementado via classe `.dark` com uma paleta derivada dos mesmos matizes frios (hue 245).

### Tipografia

| Papel | Fonte | Uso |
|---|---|---|
| Display | Goldman | Nome/identidade no hero |
| Sans | Inter | Corpo, UI geral |
| Mono | Geist Mono | Nav links, labels técnicos, ticker |

### Animações

Definidas em `globals.css` como keyframes puros:

| Keyframe | Uso |
|---|---|
| `slide-in-left` | Nome "BRUNO" na entrada |
| `slide-in-right` | Nome "GUSMÃO" com offset |
| `fade-up` | Role label, CTA, ticker |
| `blink` | Cursor azul pós-entrada |
| `ticker-scroll` | Faixa de tecnologias |
| `nav-underline` | Hover nos links do header |

## Rodando localmente

```bash
pnpm install
pnpm dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando | Descrição |
|---|---|
| `pnpm dev` | Servidor de desenvolvimento com Turbopack |
| `pnpm build` | Build de produção |
| `pnpm start` | Servidor de produção |
| `pnpm lint` | Checa erros com Biome |
| `pnpm format` | Formata o código com Biome |

## Páginas

| Rota | Status | Descrição |
|---|---|---|
| `/` | Pronto | Hero com tipografia editorial brutalista |
| `/about` | Em construção | Sobre Bruno Gusmão |
| `/portfolio` | Em construção | Projetos e trabalhos |
| `/blog` | Em construção | Posts e artigos |
| `/blog/[slug]` | Em construção | Post individual |
| `/contact` | Em construção | Formulário de contato |
