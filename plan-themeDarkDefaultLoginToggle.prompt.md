## Plan: Tema Global Dark com Toggle no Login

Ajustar a infraestrutura de tema para manter o projeto com dark como padrão
global, garantir persistencia do tema em localStorage e disponibilizar o toggle
no login e em todas as rotas privadas sem alterar o fluxo de autenticacao.

**Steps**

1. Revisar e ajustar o provider de tema em `src/components/ThemeProvider.tsx`
   para usar dark como tema padrao global (_bloqueia os proximos passos_).
2. Garantir persistencia explicita em localStorage via componente cliente
   dedicado (ex.: sincronizador de storage) acoplado ao provider, para gravar
   `theme=dark` quando ainda nao existir (_depende de 1_).
3. Extrair/reaproveitar um toggle de tema reutilizavel para superficies sem
   Header publico (rotas privadas e login), removendo qualquer logica que force
   light no contexto privado (_depende de 1_).
4. Integrar o toggle no layout privado `src/app/(private)/layout.tsx` mantendo
   visibilidade global em todas as paginas privadas (_depende de 3_).
5. Integrar o toggle na tela de login `src/app/(auth)/login/page.tsx` com
   posicionamento consistente com a identidade visual atual (_depende de 3_).
6. Validar impacto visual e funcional do login/privado para garantir que claro e
   escuro alternem corretamente e que o valor persistido seja reaproveitado em
   recarregamentos (_depende de 2, 4 e 5_).
7. Rodar Biome nos arquivos alterados e corrigir qualquer formatacao/lint
   remanescente (_depende de 6_).

**Relevant files**

- `/Users/bruno/Documents/PROJETOS/brunogusmao/src/components/ThemeProvider.tsx`
  — ponto central da estrategia de tema (default + persistencia).
- `/Users/bruno/Documents/PROJETOS/brunogusmao/src/components/damin/private/private-theme-toggle.tsx`
  — remover forca de light e manter apenas troca de tema.
- `/Users/bruno/Documents/PROJETOS/brunogusmao/src/app/(private)/layout.tsx` —
  toggle global para todas as rotas privadas.
- `/Users/bruno/Documents/PROJETOS/brunogusmao/src/app/(auth)/login/page.tsx` —
  adicionar toggle no login.
- `/Users/bruno/Documents/PROJETOS/brunogusmao/src/app/globals.css` — ajustes
  finos de estilo caso necessario para posicionamento/contraste do toggle no
  login.

**Verification**

1. Rodar `pnpm exec biome check` nos arquivos alterados e confirmar saida limpa.
2. Abrir `/login` e validar manualmente: tema inicial dark, toggle alterna para
   claro e vice-versa.
3. Recarregar `/login` apos alternar tema e confirmar que o ultimo valor
   permanece (localStorage).
4. Abrir `/dashboard` e `/kanban` e confirmar que o toggle continua funcional e
   sem reset para light.
5. Limpar localStorage e recarregar qualquer rota; confirmar que o valor default
   volta para dark e e gravado novamente.

**Decisions**

- Incluido: comportamento global de tema, persistencia localStorage e toggle no
  login/privado.
- Excluido: redesign visual do login e refatoracao estrutural ampla de
  componentes nao relacionados.
- Restricao: nao alterar fluxo de autenticacao (rotas/API/login logic).
