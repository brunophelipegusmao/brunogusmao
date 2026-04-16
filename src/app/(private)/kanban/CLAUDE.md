# CLAUDE.md - src/app/(private)/kanban

## Objetivo

- Esta rota implementa um Kanban (com n) para gestao visual de trabalho.
- Kanban aqui significa: cards movendo entre colunas de status com fluxo claro.
- Escopo atual: frontend apenas.
- Nao implementar backend, banco, API, Server Actions ou persistencia remota
  nesta fase.

## Conceitos obrigatorios do Kanban

- Cards: cada card representa uma tarefa.
- Colunas: representam etapas do fluxo (ex: a-fazer, em-progresso, concluido).
- WIP limit: cada coluna pode ter limite de cards em progresso para evitar
  gargalo.
- O foco principal e visualizacao do fluxo e movimentacao simples.

## Escopo desta pasta

- Rota principal: `src/app/(private)/kanban/page.tsx`.
- Se o modulo crescer, extrair para componentes dedicados.
- Manter a page enxuta e sem logica pesada.

## Estrutura recomendada (frontend)

- `src/components/damin/kanban/board.tsx`
- `src/components/damin/kanban/column.tsx`
- `src/components/damin/kanban/card.tsx`
- `src/components/damin/kanban/types.ts`
- `src/components/damin/kanban/state.ts`

## Diretrizes de implementacao frontend

- Priorizar acessibilidade de teclado no drag and drop.
- Exibir feedback visual claro para drag, hover e drop.
- Preservar identidade visual privada (`private-screen`, `private-shell`).
- Manter tipografia do projeto:
   - `font-goldman` para titulos estruturais.
   - `font-mono` para labels e metadata.
- Usar tokens existentes de `globals.css`; evitar valores hardcoded.

## Drag and Drop

- Biblioteca recomendada:
   - Opcao 1: `@hello-pangea/dnd` (mais direta para board classico).
   - Opcao 2: `dnd-kit` (mais flexivel para customizacao avancada).
- Escolher somente uma biblioteca por vez.
- Evitar implementar drag and drop manual com eventos nativos nesta fase.

## Estado frontend

- Para MVP local: `useState` pode ser suficiente.
- Para modularidade e escalabilidade: preferir `zustand`.
- Estado minimo esperado:
   - lista de colunas
   - cards por coluna
   - ordem dos cards
   - limites WIP por coluna

## Regras de UX do board

- Mostrar contagem de cards por coluna.
- Mostrar WIP atual versus limite de cada coluna.
- Bloquear drop quando coluna atingir limite WIP e mostrar mensagem contextual.
- Cards devem ter titulo e opcionalmente descricao curta.
- Animacoes devem ser sutis e sem poluir a leitura.

## Fora de escopo (nesta fase)

- Persistencia em banco.
- Integracao com API.
- Server Actions para salvar posicao.
- Realtime e colaboracao multiusuario.

## Integracao com area privada

- Manter navegacao entre `/dashboard` e `/kanban` com `InteractiveHoverButton`.
- Preservar protecao por sessao no layout privado existente.
- Nao alterar fluxo de login.
