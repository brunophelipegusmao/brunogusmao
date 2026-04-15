# CLAUDE.md - src/app/(public)

## Escopo

- Esta pasta contem as rotas publicas do frontend da aplicacao.
- Estas rotas sao acessiveis sem autenticacao e representam as paginas
  institucionais e de conteudo.
- Estrutura atual:
   - `about/page.tsx`
   - `portfolio/page.tsx`
   - `blog/page.tsx`
   - `blog/[slug]/page.tsx`
   - `contact/page.tsx`

## Estado atual e analise

- `about/page.tsx`
   - Pagina completa, com narrativa por secoes e alto uso de componentes
     reutilizaveis.
   - Usa `Header`, `BlurFade`, `WordPullUp`, `NumberTicker`.
   - Declara `metadata` com `title` e `description`.
   - Estrutura semantica baseada em `main` + multiplas `section`.

- `portfolio/page.tsx`
   - Pagina completa, com hero, destaque, grid de projetos e CTA final.
   - Usa componente interno `ProjectCard` para padronizar cards.
   - Usa `Header`, `BlurFade`, `WordPullUp`, `Image`, `Link`.
   - Declara `metadata` e modela dados com interface `Project`.

- `blog/page.tsx`
   - Placeholder/incompleta no estado atual.
   - Nao segue o padrao estrutural das demais paginas publicas.

- `blog/[slug]/page.tsx`
   - Placeholder/incompleta no estado atual.
   - Retorna `null` e ainda nao implementa layout de artigo.

- `contact/page.tsx`
   - Placeholder/minima no estado atual.
   - Ainda nao segue o padrao visual e estrutural de About/Portfolio.

## Padrao obrigatorio para novas rotas publicas

- Cada rota deve exportar um unico componente de pagina em `page.tsx`.
- Nomear o componente com clareza (ex.: `AboutPage`, `PortfolioPage`,
  `ContactPage`).
- Declarar `metadata` (`title`, `description`) em paginas publicas finalizadas.
- Estrutura base esperada:
   - `main` com `min-h-screen bg-bg`
   - `Header` no topo
   - conteudo organizado em `section`
- Priorizar composicao por componentes existentes em `src/components`.
- Evitar duplicacao de UI; extrair blocos repetidos para componentes locais ou
  compartilhados.
- Usar `Link` para navegacao interna.
- Usar `next/image` quando houver imagens de capa/projeto.
- Seguir classes utilitarias e classes customizadas ja existentes em
  `globals.css`.

## Padrao de conteudo e UX

- Hero inicial com contexto da pagina.
- Blocos com progressao narrativa (intro, conteudo principal, CTA).
- CTA final claro para proxima acao do usuario.
- Texto e labels em portugues, coerentes com o restante do site.

## Acessibilidade minima

- Usar `aria-hidden="true"` em elementos decorativos.
- Garantir `aria-label` quando texto visual nao for suficiente.
- Preservar navegacao por teclado e foco visivel.

## O que evitar

- Retornos vazios/placeholders em paginas marcadas como prontas.
- Misturar logica pesada de dados direto no JSX quando puder ser extraida.
- Introduzir estilos inline fora de casos dinamicos necessarios.

## Checklist rapido

- Rota possui `Header` e estrutura em secoes?
- Pagina finalizada possui `metadata`?
- Componentes reutilizaveis foram priorizados?
- Acessibilidade minima foi preservada?
- O tom visual segue o padrao editorial brutalista do projeto?

## Comandos uteis

```bash
pnpm lint
pnpm format
pnpm build
```
