import Link from "next/link";
import { Header } from "@/components/Header";
import { getTechStack } from "@/lib/api/content.server";

export default async function Home() {
  const techStack = await getTechStack();
  const tickerItems = [
    ...techStack.map((tech) => ({ tech, loop: "a" })),
    ...techStack.map((tech) => ({ tech, loop: "b" })),
  ];

  return (
    <main className="min-h-screen bg-bg overflow-hidden">
      <Header />

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col justify-center pt-20 pb-0">
        {/* Grid background */}
        <div className="hero-grid" aria-hidden="true" />

        {/* Name block */}
        <div className="relative px-6 sm:px-8 md:px-16 flex-1 flex flex-col justify-center">
          {/* Top label */}
          <p className="hero-role mb-4 md:mb-6">
            <span className="hero-role-prefix" aria-hidden="true">
              ›
            </span>
            Portfolio pessoal
          </p>

          {/* Name — o hero É a tipografia */}
          <div className="select-none" role="img" aria-label="Bruno Gusmão">
            <span className="hero-name-bruno" aria-hidden="true">
              BRUNO
              <span className="hero-cursor" aria-hidden="true" />
            </span>
            <span className="hero-name-gusmao" aria-hidden="true">
              GUSMÃO
            </span>
          </div>

          {/* Divisor azul */}
          <div className="hero-divider" />

          {/* Role */}
          <p className="hero-role">
            <span className="hero-role-prefix" aria-hidden="true">
              _
            </span>
            Desenvolvedor Full Stack
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-8 md:mt-10"
            style={{ animation: "fade-up 0.6s 0.9s both" }}
          >
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center sm:justify-start gap-2 px-6 py-3 bg-blue-dark text-text-on-accent font-mono text-xs uppercase tracking-widest hover:bg-blue-base transition-colors duration-200"
            >
              Ver projetos
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center sm:justify-start gap-2 px-6 py-3 border border-border-strong text-text-primary font-mono text-xs uppercase tracking-widest hover:border-blue-base hover:text-blue-base transition-colors duration-200"
            >
              Contato
            </Link>
          </div>

          {/* Label vertical — só desktop */}
          <div className="hero-vertical-label" aria-hidden="true">
            Analista de Sistemas
          </div>
        </div>

        {/* Ticker de tecnologias */}
        <div className="hero-ticker-wrapper mt-12 md:mt-16">
          <div className="hero-ticker-inner" aria-hidden="true">
            {tickerItems.map((item) => (
              <span
                key={`${item.loop}-${item.tech}`}
                className="hero-ticker-item"
              >
                <span className="hero-ticker-dot">◆</span>
                {item.tech}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
