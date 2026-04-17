# 🧠 REMEMBERME.md - Estado Atual do Projeto

**Data**: 16 de abril de 2026  
**Sessão**: Phase 0 - Mock Extraction & Toggle Setup

---

## 📋 O Que Foi Feito

### ✅ Completed Tasks

1. **Leitura e Compreensão do Plano Arquitetural**
   - Arquivo: `CLAUDE.md`
   - Decisões principais documentadas (Fastify, Auth em DB, Drizzle ORM, Neon
     PostgreSQL)
   - Plano de 8 fases mapeado (Phase 0 → Phase 8)

2. **Instalação de Dependências Backend**

   ```bash
   pnpm add -D drizzle-kit && pnpm add drizzle-orm @neondatabase/serverless
   ```

   - Status: ✅ Exit Code 0 (sucesso)
   - Pronto para usar Drizzle ORM com Neon serverless PostgreSQL

3. **Mapeamento de Dados Mock a Extrair**
   - Identificados 8 arquivos fontes com dados mock
   - Estrutura de pastas `src/mock/` planejada
   - Barrel export + flag `USE_MOCK` definido

4. **Definição da Architecture Phase 0**
   - 4 etapas estruturadas em português
   - Cada etapa com objetivo claro e entregáveis

---

## 📦 Dados Mock a Extrair (8 Fontes)

| Arquivo Fonte                                          | Variáveis                                                | Destino                      | Tipo              |
| ------------------------------------------------------ | -------------------------------------------------------- | ---------------------------- | ----------------- |
| `src/app/(public)/blog/posts.ts`                       | `blogPosts` (11 posts)                                   | `src/mock/blog.mock.ts`      | Blog Público      |
| `src/lib/content/posts-admin.ts`                       | `postStatusBySlug`, `postTagLibrary`                     | `src/mock/blog.mock.ts`      | Blog Admin        |
| `src/app/(public)/portfolio/page.tsx`                  | `projects` (7 itens)                                     | `src/mock/portfolio.mock.ts` | Portfolio Público |
| `src/components/damin/portfolio/portfolio-manager.tsx` | `initialProjects` (3 itens)                              | `src/mock/portfolio.mock.ts` | Portfolio Admin   |
| `src/components/damin/kanban/state.ts`                 | `INITIAL_COLUMNS`, `INITIAL_CARDS`, `INITIAL_CARD_ORDER` | `src/mock/kanban.mock.ts`    | Kanban            |
| `src/app/(public)/about/page.tsx`                      | `skills`, `experience`, `stats`                          | `src/mock/profile.mock.ts`   | Perfil            |
| `src/app/page.tsx`                                     | `techStack`                                              | `src/mock/homepage.mock.ts`  | Homepage          |
| `src/app/(public)/contact/page.tsx`                    | `socialLinks`, `WHATSAPP_NUMBER`                         | `src/mock/contact.mock.ts`   | Contato           |

---

## 🏗️ Estrutura Planejada (Phase 0)

```
src/
├── mock/
│   ├── blog.mock.ts           (blogPosts, postStatusBySlug, postTagLibrary)
│   ├── portfolio.mock.ts      (projects, initialProjects)
│   ├── kanban.mock.ts         (INITIAL_COLUMNS, INITIAL_CARDS, INITIAL_CARD_ORDER)
│   ├── profile.mock.ts        (skills, experience, stats)
│   ├── homepage.mock.ts       (techStack)
│   ├── contact.mock.ts        (socialLinks, WHATSAPP_NUMBER)
│   └── index.ts               (barrel + flag USE_MOCK)
│
└── components/
    └── providers/
        └── MockProvider.tsx   (Context + localStorage toggle)
```

---

## 🚀 Próximos Passos (Phase 0 - 4 Etapas)

### **Etapa 1: Extrair Mocks → Diretório Centralizado**

- **Objetivo**: Consolidar dados mock em `src/mock/*.mock.ts`
- **Tarefas**:
   - Ler cada arquivo fonte
   - Extrair os dados (arrays, objetos)
   - Criar arquivos `.mock.ts` correspondentes
   - Criar `src/mock/index.ts` com barrel export
   - Adicionar flag `USE_MOCK` em `index.ts`
- **Entregáveis**: 6 arquivos mock + barrel export
- **Validação**: `biome lint`

---

### **Etapa 2: Criar MockProvider (Context + localStorage)**

- **Objetivo**: Permitir toggle mock ↔ real em tempo de execução
- **Tarefas**:
   - Criar `src/components/providers/MockProvider.tsx`
   - Implementar React Context
   - Usar `useContext` hook customizado
   - Persistir escolha em localStorage
   - Wrapping em layout pai (provavelmente `src/app/layout.tsx`)
- **Entregáveis**: Componente MockProvider funcional
- **Validação**: `tsc --noEmit`

---

### **Etapa 3: Implementar Toggle UI (Componente Dev)**

- **Objetivo**: Interface visual para alternar mock/real
- **Tarefas**:
   - Criar componente de toggle (só em `NODE_ENV === 'development'`)
   - Localizar em componente de debug ou header admin
   - Conectar com MockProvider
   - Estilizar com Tailwind CSS
- **Entregáveis**: Toggle UI funcional
- **Validação**: Testar toggle em browser (F12 → localStorage)

---

### **Etapa 4: Conectar Consumidores + Validação Final**

- **Objetivo**: Atualizar imports de dados mock em todo projeto
- **Tarefas**:
   - Substituir imports diretos por imports de `src/mock/`
   - Atualizar componentes que usam dados mock
   - Certificar que MockProvider wraps todos os consumidores
   - Remover toggle mock do build de produção
- **Entregáveis**: Projeto completo com mock extraction funcional
- **Validação**:
   - `biome lint`
   - `biome check`
   - `tsc --noEmit`
   - Teste manual em dev

---

## 📝 Convenções do Projeto

- **Commits**: Padrão Conventional Commits em inglês
- **Stack**: Next.js 16 + React 19 + Tailwind v4 + Biome + TypeScript
- **Backend (Planejado)**: Fastify custom server + Drizzle ORM + Neon PostgreSQL
- **Lint**: Biome (rodar antes de commitar)

---

## 💾 Estado do Repositório

**Último Comando Executado**:

```bash
pnpm add -D drizzle-kit && pnpm add drizzle-orm @neondatabase/serverless
```

- ✅ Exit Code: 0
- Status: Pronto para iniciar Phase 1

**Arquivos Modificados**: Nenhum (Phase 0 ainda não iniciada)

**Branches**: Presume-se que está em branch de desenvolvimento

---

## 🎯 Recomendação de Próximo Passo

**Escolha qual etapa começar**:

1. ✨ **Etapa 1** (Extrair Mocks) - Recomendado como primeiro passo (base para
   tudo)
2. 🔧 **Etapa 2** (MockProvider) - Dependência de Etapa 1
3. 🎨 **Etapa 3** (Toggle UI) - Dependência de Etapa 2
4. 🔗 **Etapa 4** (Conectar Consumidores) - Etapa final integradora

**Sugestão**: Começar pela **Etapa 1** para ter a base centralizada de mocks
pronta.

---

**Próxima Ação**: Aguardar confirmação de qual etapa deseja executar.
