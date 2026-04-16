# CLAUDE.md — src/app/(private)/dashboard

## Objetivo

- O dashboard e o kanban sao independentes.
- O unico ponto em comum entre eles e a navegacao entre /dashboard e /kanban.

## Escopo do dashboard (fase atual)

- O dashboard e um painel de controle para alimentar as rotas publicas:
   - /blog
   - /portfolio
- A navegacao interna do dashboard deve ser por abas.
- Nesta fase, o dashboard tem somente 2 abas:
   - Posts
   - Portfolio

## Estrutura obrigatoria

- Nao concentrar tudo em page.tsx.
- A aba de posts deve ter componente principal em:
   - src/components/damin/posts/index.tsx
- Se a aba posts precisar de mais componentes, criar em:
   - src/components/damin/posts/<nomeDoComponente>.tsx

## Diretrizes de UI

- Aplicar o mesmo tema visual usado nas rotas publicas tambem nas rotas
  privadas.
- Nao alterar em hipotese alguma o login.
- Usar tipografia estrutural do projeto:
   - font-goldman para headlines e chamadas
   - font-mono para labels e metadados
- Priorizar tokens do design system em globals.css.
- Evitar botoes sem destaque visual: usar contraste e hierarquia clara.

## Diretrizes de animacao (Magic UI)

- Incluir animacoes com os componentes de src/components/magicui/.
- Aplicar ripple-button nos botoes de acao do dashboard.
- Para navegar entre dashboard e kanban, usar Interactive Hover Button.
- Usar particles no background das telas privadas (dashboard e kanban).

## Convencoes

- Manter componentes pequenos e reutilizaveis.
- Preservar acessibilidade minima (foco visivel, semantica, labels quando
  necessario).
- Usar os tokens existentes (text-foreground, border-border, etc.).
- Evitar valores hardcoded fora do padrao do projeto.
