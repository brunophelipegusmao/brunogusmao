# CLAUDE.md — brunogusmao.dev

Instruções para o Claude Code neste repositório.

## Projeto

Portfolio pessoal de Bruno Gusmão (desenvolvedor Full Stack). Estética
**editorial brutalista** — tipografia Goldman dominante, paleta azul-fria oklch,
animações CSS puras, layout assimétrico intencional.

## Stack obrigatória

- **Next.js 16** com App Router — usar Server Components por padrão,
  `"use client"` só quando necessário (eventos, state, efeitos, browser APIs)
- **React 19** com React Compiler ativo (`reactCompiler: true` no
  `next.config.ts`)
- **TypeScript 5** — sem `any`, sem type assertions desnecessárias
- **Tailwind CSS v4** — sem `tailwind.config.ts`, configuração via
  `@theme inline` em `globals.css`
- **Biome** para lint e formatação — rodar `pnpm lint` antes de commitar
- **pnpm** — não usar npm ou yarn

## Convenções de código

### Controle de versão

- Mensagens de commit devem seguir o padrão **Conventional Commits**
- Mensagens de commit devem ser escritas em **inglês**

### Componentes

- Um componente por arquivo
- Exports nomeados (`export function X`), não default exports em componentes
- Props com interface nomeada: `interface XProps { ... }`
- Usar `cn()` de `@/lib/utils` para classes condicionais

### Estilo

- Classes Tailwind inline para layout/espaçamento
- Classes CSS customizadas (`.hero-*`, `.nav-link`) em `globals.css` para
  elementos com lógica visual complexa ou animações
- **Nunca** usar `style={{}}` inline exceto para `animation` ou valores
  dinâmicos que Tailwind não suporta
- Cores sempre via variáveis CSS (`var(--blue-base)`, `text-foreground`, etc.) —
  nunca valores hardcoded fora do `globals.css`

### Fontes

- Goldman: `font-goldman` (classe Tailwind via `@theme inline`)
- Inter: `font-sans` (padrão)
- Geist Mono: `font-mono`

## Design system

### Paleta — como usar

```css
/* Em CSS customizado (globals.css) */
color: var(--text-primary);
background: var(--blue-base);
border-color: var(--border);

/* Em classes Tailwind */
className="bg-background text-foreground border-border"
className="text-primary bg-muted"
```

**Nunca** criar novas variáveis de cor fora do bloco de paleta em `:root`. Se
precisar de uma nova cor, adicionar à paleta seguindo o padrão oklch existente.

### Tokens disponíveis

| Variável          | Valor (light)           | Uso                          |
| ----------------- | ----------------------- | ---------------------------- |
| `--blue-base`     | `oklch(0.55 0.19 245)`  | CTAs, links, destaque        |
| `--blue-hover`    | `oklch(0.48 0.19 245)`  | Estado hover de botões       |
| `--blue-dark`     | `oklch(0.35 0.15 245)`  | Texto sobre fundo claro azul |
| `--text-primary`  | `oklch(0.13 0.015 245)` | Texto principal              |
| `--text-muted`    | `oklch(0.62 0.02 245)`  | Labels, meta-info            |
| `--border`        | `oklch(0.87 0.02 240)`  | Bordas padrão                |
| `--border-strong` | `oklch(0.74 0.04 240)`  | Bordas de ênfase             |

## Estrutura de rotas

```
/                    → src/app/page.tsx (homepage)
/about               → src/app/(public)/about/page.tsx
/portfolio           → src/app/(public)/portfolio/page.tsx
/blog                → src/app/(public)/blog/page.tsx
/blog/[slug]         → src/app/(public)/blog/[slug]/page.tsx
/contact             → src/app/(public)/contact/page.tsx
```

O segmento `(public)` é um route group sem prefixo na URL.

Para qualquer alteração dentro de `src/app/(public)/`, seguir também o guia
local em `src/app/(public)/CLAUDE.md`. Em caso de conflito entre regras,
priorizar o arquivo mais específico da pasta (`src/app/(public)/CLAUDE.md`).

## Componentes UI

Os componentes em `src/components/ui/` são baseados em ShadCN/Base UI. Ao
modificá-los:

- Manter a API de props existente
- Usar os tokens de cor do design system, não valores hardcoded
- Não remover variantes existentes

Para qualquer alteração dentro de `src/components/`, seguir também o guia local
em `src/components/CLAUDE.md`. Em caso de conflito entre regras, priorizar o
arquivo mais específico da pasta (`src/components/CLAUDE.md`).

## Adicionando novas páginas

1. Criar o arquivo em `src/app/(public)/nome/page.tsx`
2. Incluir o `<Header />` ou usar o layout pai
3. Seguir a estética do projeto: tipografia estrutural, espaço negativo
   intencional, sem decoração gratuita

## Animações

Todas as animações ficam em `globals.css` como `@keyframes`. Não usar
bibliotecas de animação (Framer Motion, etc.) a menos que estritamente
necessário. Preferir:

- CSS transitions para hover states
- CSS animations para entradas de página
- `animation-fill-mode: both` para garantir estado final

## Acessibilidade

- Elementos decorativos: `aria-hidden="true"`
- Elementos visuais que representam texto: `aria-label` no wrapper
- Links de navegação: `<nav aria-label="...">` com `<ul>` e `<li>`
- Foco visível: manter `outline-ring/50` do reset global

## Workaround ativo

`next.config.ts` tem `turbopack.root: path.resolve(__dirname)` para contornar um
bug do Turbopack com caracteres não-ASCII em caminhos absolutos do workspace
pnpm. Não remover.

## Comandos úteis

```bash
pnpm dev          # desenvolvimento
pnpm lint         # checar erros (Biome)
pnpm format       # formatar (Biome)
pnpm build        # build de produção
```
