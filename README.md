# brunogusmao

Site pessoal e design system construído com Next.js, React e Tailwind CSS.

## Stack

- **Next.js** 16 (App Router, React Compiler, Turbopack)
- **React** 19
- **TypeScript** 5
- **Tailwind CSS** 4
- **Base UI** — primitivos de UI acessíveis
- **Biome** — linting e formatação
- **pnpm** — gerenciador de pacotes

## Estrutura

```
src/
├── app/
│   ├── page.tsx           # Página principal
│   ├── layout.tsx
│   └── styleguide/        # Design system / catálogo de componentes
│       ├── page.tsx       # Design tokens
│       └── components/    # Páginas de cada componente
└── components/
    └── ui/                # Componentes reutilizáveis
```

## Styleguide

O projeto inclui um catálogo de componentes em `/styleguide` com:

- **Foundation** — Design Tokens
- **Form Controls** — Button, Checkbox, Radio, Switch, Select
- **Display** — Alert, Avatar, Badge, Card, Separator, Skeleton, Tooltip
- **Navigation** — Breadcrumb, Pagination, Tabs
- **Feedback** — Dialog, Context Menu, Progress

## Rodando localmente

```bash
pnpm install
pnpm dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando       | Descrição                            |
| ------------- | ------------------------------------ |
| `pnpm dev`    | Inicia o servidor de desenvolvimento |
| `pnpm build`  | Gera o build de produção             |
| `pnpm start`  | Inicia o servidor de produção        |
| `pnpm lint`   | Verifica erros com Biome             |
| `pnpm format` | Formata o código com Biome           |
