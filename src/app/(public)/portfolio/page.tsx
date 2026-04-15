import { Header } from "@/components/Header";
import { BlurFade } from "@/components/magicui/blur-fade";
import { WordPullUp } from "@/components/magicui/word-pull-up";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Portfólio — Bruno Gusmão",
  description:
    "Projetos reais: e-commerce, SaaS, sistemas de gestão, frontends modernos. Código que vai para produção.",
};

interface Project {
  id: string;
  index: string;
  title: string;
  description: string;
  stack: string[];
  image: string | null;
  live: string | null;
  repo: string;
  featured?: boolean;
}

const projects: Project[] = [
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

function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  return (
    <BlurFade delay={delay}>
      <article
        className={`portfolio-card ${project.featured ? "portfolio-card--featured" : ""}`}
      >
        {/* Image area */}
        <div className="portfolio-card-image">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes={
                project.featured
                  ? "(max-width: 768px) 100vw, 66vw"
                  : "(max-width: 768px) 100vw, 33vw"
              }
              className="object-cover object-top"
            />
          ) : (
            <div className="portfolio-card-placeholder" aria-hidden="true">
              <span className="portfolio-card-placeholder-index">
                {project.index}
              </span>
            </div>
          )}

          {/* Hover overlay */}
          <div className="portfolio-card-overlay" aria-hidden="true">
            <div className="portfolio-card-overlay-links">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="portfolio-overlay-btn"
                  tabIndex={-1}
                >
                  Ver ao vivo ↗
                </a>
              )}
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="portfolio-overlay-btn portfolio-overlay-btn--ghost"
                tabIndex={-1}
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </div>

        {/* Card body */}
        <div className="portfolio-card-body">
          <div className="portfolio-card-header">
            <span className="portfolio-card-index">{project.index}</span>
            <h2 className="portfolio-card-title">{project.title}</h2>
          </div>
          <p className="portfolio-card-desc">{project.description}</p>
          <ul className="portfolio-card-stack" aria-label="Tech stack">
            {project.stack.map((tech) => (
              <li key={tech} className="portfolio-stack-item">
                {tech}
              </li>
            ))}
          </ul>
          <div className="portfolio-card-links">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="portfolio-link-live"
              >
                Ver projeto ↗
              </a>
            )}
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio-link-repo"
            >
              Código ↗
            </a>
          </div>
        </div>
      </article>
    </BlurFade>
  );
}

export default function Portfolio() {
  // biome-ignore lint/style/noNonNullAssertion: featured sempre existe na lista de projetos
  const featured = projects.find((p) => p.featured)!;
  const rest = projects.filter((p) => !p.featured);

  return (
    <main className="min-h-screen bg-bg">
      <Header />

      {/* ── HERO ────────────────────────────────────────── */}
      <section className="relative pt-28 pb-16 px-6 sm:px-8 md:px-16 overflow-hidden">
        <div className="about-grid" aria-hidden="true" />

        <div className="relative max-w-[1400px]">
          <BlurFade delay={0}>
            <p className="about-chapter">
              <span className="text-blue-base">Trabalhos</span> / Portfólio
            </p>
          </BlurFade>

          <WordPullUp
            text="PROJETOS."
            className="about-headline"
            delay={100}
            stagger={90}
          />

          <BlurFade delay={500}>
            <div className="portfolio-hero-meta">
              <div className="portfolio-hero-stat">
                <span className="portfolio-hero-num text-blue-base">07</span>
                <span className="portfolio-hero-label">projetos</span>
              </div>
              <div className="portfolio-hero-divider" aria-hidden="true" />
              <div className="portfolio-hero-stat">
                <span className="portfolio-hero-num text-blue-base">15+</span>
                <span className="portfolio-hero-label">tecnologias</span>
              </div>
              <div className="portfolio-hero-divider" aria-hidden="true" />
              <div className="portfolio-hero-stat">
                <span className="portfolio-hero-num text-blue-base">100%</span>
                <span className="portfolio-hero-label">em produção</span>
              </div>
            </div>
          </BlurFade>
        </div>

        <div className="about-rule" />
      </section>

      {/* ── PROJETO DESTAQUE ────────────────────────────── */}
      <section className="px-6 sm:px-8 md:px-16 pb-8">
        <div className="max-w-[1400px]">
          <BlurFade delay={0}>
            <p className="portfolio-section-label">
              <span className="text-blue-base">↓</span> Destaque
            </p>
          </BlurFade>
          <ProjectCard project={featured} delay={100} />
        </div>
      </section>

      {/* ── GRID ────────────────────────────────────────── */}
      <section className="px-6 sm:px-8 md:px-16 py-8 pb-24">
        <div className="max-w-[1400px]">
          <BlurFade delay={0}>
            <p className="portfolio-section-label">
              <span className="text-blue-base">↓</span> Todos os projetos
            </p>
          </BlurFade>

          <div className="portfolio-grid">
            {rest.map((project, i) => (
              <ProjectCard key={project.id} project={project} delay={i * 80} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────── */}
      <section className="px-6 sm:px-8 md:px-16 py-20 bg-bg-subtle border-t border-border">
        <div className="max-w-[1400px]">
          <BlurFade delay={0}>
            <WordPullUp
              text="Vamos construir algo juntos?"
              className="about-cta-headline"
              stagger={55}
            />
            <BlurFade delay={400}>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link href="/contact" className="about-btn-primary">
                  Entrar em contato
                  <span aria-hidden="true">→</span>
                </Link>
                <a
                  href="https://github.com/brunophelipegusmao"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-btn-secondary"
                >
                  Ver GitHub ↗
                </a>
              </div>
            </BlurFade>
          </BlurFade>
        </div>
      </section>
    </main>
  );
}
