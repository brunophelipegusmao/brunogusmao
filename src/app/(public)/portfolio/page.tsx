import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { BlurFade } from "@/components/magicui/blur-fade";
import { WordPullUp } from "@/components/magicui/word-pull-up";
import { getPortfolioProjects } from "@/lib/api/content.server";
import type { PortfolioProject } from "@/lib/content/portfolio";

export const metadata: Metadata = {
  title: "Portfólio — Bruno Gusmão",
  description:
    "Projetos reais: e-commerce, SaaS, sistemas de gestão, frontends modernos. Código que vai para produção.",
};

function ProjectCard({
  project,
  delay,
}: {
  project: PortfolioProject;
  delay: number;
}) {
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

export default async function Portfolio() {
  const portfolioProjects = await getPortfolioProjects();

  if (portfolioProjects.length === 0) {
    return (
      <main className="min-h-screen bg-bg">
        <Header />

        <section className="relative pt-28 pb-16 px-6 sm:px-8 md:px-16 overflow-hidden">
          <div className="about-grid" aria-hidden="true" />

          <div className="relative max-w-350">
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

            <BlurFade delay={420}>
              <p className="portfolio-empty-lead">
                Nenhum projeto publicado no momento.
              </p>
            </BlurFade>
          </div>

          <div className="about-rule" />
        </section>
      </main>
    );
  }

  // biome-ignore lint/style/noNonNullAssertion: featured sempre existe na lista de projetos
  const featured = portfolioProjects.find((project) => project.featured)!;
  const rest = portfolioProjects.filter((project) => !project.featured);

  return (
    <main className="min-h-screen bg-bg">
      <Header />

      {/* ── HERO ────────────────────────────────────────── */}
      <section className="relative pt-28 pb-16 px-6 sm:px-8 md:px-16 overflow-hidden">
        <div className="about-grid" aria-hidden="true" />

        <div className="relative max-w-350">
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
                <span className="portfolio-hero-num text-blue-base">
                  {String(portfolioProjects.length).padStart(2, "0")}
                </span>
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
        <div className="max-w-350">
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
        <div className="max-w-350">
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
        <div className="max-w-350">
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
