import type {
  PortfolioManagerProject,
  PortfolioProject,
} from "@/lib/content/portfolio";

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "jm-store",
    index: "01",
    title: "JM Store",
    description:
      "Loja online com catálogo de 500+ produtos, carrinho, avaliações e fluxo de compra orientado a conversão.",
    stack: ["Next.js 15", "PostgreSQL", "Drizzle ORM", "Auth.js", "Shadcn/ui"],
    image:
      "https://bmcorelayer.vercel.app/_next/image?url=%2FChatGPT%20Image%2012%20de%20nov.%20de%202025%2C%2009_34_50.png&w=1920&q=75",
    live: "https://ecommerce-jm.vercel.app/",
    repo: "https://github.com/brunophelipegusmao/ecommerce-jm",
    featured: true,
  },
  {
    id: "chronos-pomodoro",
    index: "02",
    title: "Chronos Pomodoro",
    description:
      "Técnica Pomodoro com controle de ciclos, histórico de sessões e navegação SPA para foco diário.",
    stack: ["React 19", "TypeScript", "Vite 7", "React Router 7", "date-fns"],
    image:
      "https://bmcorelayer.vercel.app/_next/image?url=%2Fcovers%2Fchronos-pomodoro-og.png&w=1920&q=75",
    live: "https://chronospomodoro.vercel.app/",
    repo: "https://github.com/brunophelipegusmao/chronos-pomodoro",
  },
  {
    id: "aura-frontend",
    index: "03",
    title: "Aura Frontend",
    description:
      "Frontend moderno com navegação fluida, transições de página e experiência responsiva em stack React/Next.",
    stack: ["Next.js 16", "MUI 7", "Tailwind CSS 4", "Framer Motion", "Swup"],
    image:
      "https://bmcorelayer.vercel.app/_next/image?url=%2Fcovers%2Faura-frontend-og.png&w=1920&q=75",
    live: "https://aura-frontend-lovat.vercel.app",
    repo: "https://github.com/brunophelipegusmao/aura-frontend",
  },
  {
    id: "navarro-adv",
    index: "04",
    title: "Navarro Advocacia",
    description:
      "Website institucional para escritório jurídico com blog, painel administrativo e tema dark/light.",
    stack: ["Next.js 16", "NestJS", "Tailwind CSS 4", "SSG", "Turbopack"],
    image: "https://bmcorelayer.vercel.app/navarro.png",
    live: "https://navarro-adv.vercel.app/",
    repo: "https://github.com/brunophelipegusmao/navarro_adv",
  },
  {
    id: "dacoach",
    index: "05",
    title: "daCoach Confeitaria",
    description:
      "E-commerce artesanal com catálogo, integração WhatsApp e painel administrativo para gestão de produtos.",
    stack: ["Next.js 16", "TypeScript", "Tailwind CSS 4", "Framer Motion"],
    image: "https://bmcorelayer.vercel.app/dacoachsimp.png",
    live: "https://dacoach-confeitariafina.vercel.app/",
    repo: "https://github.com/brunophelipegusmao/dacoach-confeitariafina",
  },
  {
    id: "corelayer-app",
    index: "06",
    title: "Corelayer App",
    description:
      "Réplica do Corelayer reescrita em Angular com SSR, componentes reutilizáveis e integração EmailJS.",
    stack: ["Angular 21", "TypeScript 5.9", "SSR", "RxJS 7", "Express 5"],
    image: null,
    live: null,
    repo: "https://github.com/brunophelipegusmao/corelayer-app",
  },
  {
    id: "jm-fitness",
    index: "07",
    title: "JM Studio Fitness",
    description:
      "Sistema para academias: controle de alunos, check-ins, gestão financeira e dashboards por perfil.",
    stack: ["Next.js 15", "PostgreSQL", "Drizzle ORM", "JWT", "Shadcn/ui"],
    image: null,
    live: "https://www.jmfitnessstudio.com.br",
    repo: "https://github.com/brunophelipegusmao/jm-bmstudiofitness",
  },
];

export const portfolioManagerProjects: PortfolioManagerProject[] = [
  {
    id: "jm-store",
    title: "JM Store",
    description:
      "Loja online com catalogo de 500+ produtos, carrinho, avaliacoes e checkout orientado a conversao.",
    stack: ["Next.js 15", "PostgreSQL", "Drizzle ORM", "Auth.js", "Shadcn/ui"],
    image:
      "https://bmcorelayer.vercel.app/_next/image?url=%2FChatGPT%20Image%2012%20de%20nov.%20de%202025%2C%2009_34_50.png&w=1920&q=75",
    live: "https://ecommerce-jm.vercel.app/",
    repo: "https://github.com/brunophelipegusmao/ecommerce-jm",
    featured: true,
  },
  {
    id: "chronos-pomodoro",
    title: "Chronos Pomodoro",
    description:
      "Tecnica Pomodoro com controle de ciclos, historico de sessoes e navegacao SPA para foco diario.",
    stack: ["React 19", "TypeScript", "Vite 7", "React Router 7", "date-fns"],
    image:
      "https://bmcorelayer.vercel.app/_next/image?url=%2Fcovers%2Fchronos-pomodoro-og.png&w=1920&q=75",
    live: "https://chronospomodoro.vercel.app/",
    repo: "https://github.com/brunophelipegusmao/chronos-pomodoro",
    featured: false,
  },
  {
    id: "aura-frontend",
    title: "Aura Frontend",
    description:
      "Frontend moderno com transicoes de pagina e experiencia responsiva em stack React/Next.",
    stack: ["Next.js 16", "MUI 7", "Tailwind CSS 4", "Framer Motion", "Swup"],
    image:
      "https://bmcorelayer.vercel.app/_next/image?url=%2Fcovers%2Faura-frontend-og.png&w=1920&q=75",
    live: "https://aura-frontend-lovat.vercel.app",
    repo: "https://github.com/brunophelipegusmao/aura-frontend",
    featured: false,
  },
];
