# claude.md — src/app/(private)/dashboard

## Objetivo

- O dashboard e o kaban sao independentes.
- O unico ponto em comum entre eles e a navegacao entre `/dashboard` e `/kaban`.

## Escopo do dashboard (fase atual)

- O dashboard e um painel de controle para alimentar as rotas publicas:
   - `/blog`
   - `/portfolio`
- A navegacao interna do dashboard deve ser por abas.
- Nesta fase, o dashboard tem somente 2 abas:
   - `Posts`
   - `Portfolio`

## Estrutura obrigatoria

- Nao concentrar tudo em `page.tsx`.
- A aba de posts deve ter componente principal em:
   - `src/components/damin/posts/index.tsx`
- Se a aba posts precisar de mais componentes, criar em:
   - `src/components/damin/posts/<nomeDoComponente>.tsx`

## Convencoes

- Manter componentes pequenos e reutilizaveis.
- Preservar acessibilidade minima (foco visivel, semantica, labels quando
  necessario).
- Usar os tokens de design system ja existentes (`text-foreground`,
  `border-border`, etc.).
- Evitar valores visuais hardcoded fora do padrao do projeto.
