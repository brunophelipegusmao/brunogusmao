# CLAUDE.md - src/components

## Escopo

- Esta pasta concentra os componentes da aplicacao React/Next.js.
- Estrutura:
   - `src/components/ui/`: primitives e wrappers de UI (Base UI + padrao
     ShadCN).
   - `src/components/magicui/`: componentes de animacao/reveal com CSS e browser
     APIs.
   - `src/components/Header/`: componente composto de navegacao.
   - `src/components/ThemeProvider.tsx`: provider de tema com `next-themes`.

## Padrao observado

- Composicao em funcoes pequenas com exports nomeados.
- `"use client"` apenas em componentes com estado, efeito, eventos ou browser
  APIs.
- Uso de `cn()` (`@/lib/utils`) para classes condicionais.
- Uso de `cva` (`class-variance-authority`) para variantes (`variant`, `size`).
- Em `ui/`, wrappers sobre `@base-ui/react` com `data-slot` e API estavel.
- Icones via `lucide-react`.
- Acessibilidade presente por padrao (`aria-*`, `role`, `sr-only`, foco
  visivel).
- Em `magicui`, animacao com `IntersectionObserver` e `requestAnimationFrame`,
  sem libs de motion.
- `style` inline apenas para valores dinamicos de animacao quando Tailwind nao
  cobre o caso.

## Padrao obrigatorio para novos componentes

- Um componente por arquivo.
- Sem default export de componente.
- Preferir `export function X` ou `export { X }`.
- Declarar `"use client"` somente quando necessario.
- Usar `cn()` para composicao de classes.
- Usar `cva` quando houver variantes de estilo.
- Manter contratos de props compativeis em componentes existentes.
- Em wrappers de primitives, manter `data-slot` e nao quebrar API publica.
- Priorizar acessibilidade por default:
   - `aria-label` quando necessario,
   - `role` adequado,
   - `sr-only` para texto de suporte,
   - foco visivel preservado.
- Nao hardcodar tokens visuais fora do design system do projeto.

## Convencoes por subpasta

- `src/components/ui/`
   - Componentes genericos e reutilizaveis.
   - Nao remover variantes existentes.
   - Nao introduzir breaking changes em props sem necessidade explicita.

- `src/components/magicui/`
   - Aceitar props de controle (`delay`, `duration`, `className`, etc.).
   - Manter comportamento deterministico e desacoplado de pagina especifica.

- `src/components/Header/`
   - Garantir UX consistente em desktop e mobile.
   - Limpar efeitos colaterais (ex.: lock de scroll no `body`).

## Checklist rapido

- API compativel com uso atual?
- Acessibilidade minima preservada?
- `cn()` e `cva` usados corretamente?
- `"use client"` aplicado apenas quando necessario?
- Sem acoplamento indevido com pagina especifica?

## Comandos uteis

```bash
pnpm lint
pnpm format
pnpm build
```
