import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { BlurFade } from "@/components/magicui/blur-fade";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { WordPullUp } from "@/components/magicui/word-pull-up";

export const metadata: Metadata = {
  title: "Sobre — Bruno Gusmão",
  description:
    "Desenvolvedor Full Stack brasileiro. Sistemas, interfaces e código que importam.",
};

const skills = {
  Frontend: [
    "React",
    "Next.js",
    "Angular",
    "TypeScript",
    "TailwindCSS",
    "React Native",
  ],
  Backend: ["Node.js", "NestJS", "Spring Boot", "Java", "REST APIs", "GraphQL"],
  Dados: ["PostgreSQL", "MySQL", "Drizzle ORM", "Redis", "Prisma"],
  DevOps: ["Docker", "Git", "CI/CD", "Linux", "Vercel", "AWS"],
};

const experience = [
  {
    role: "Desenvolvedor Full Stack",
    company: "Freelance / Projetos próprios",
    period: "2022 — presente",
    description:
      "Desenvolvimento de sistemas web completos, APIs REST, interfaces responsivas e aplicações mobile com React Native.",
  },
  {
    role: "Analista de Sistemas",
    company: "Projetos acadêmicos e comerciais",
    period: "2020 — 2022",
    description:
      "Modelagem de sistemas, desenvolvimento de protótipos e entrega de soluções orientadas a negócios.",
  },
];

const stats = [
  { value: 5, suffix: "+", label: "Anos de código" },
  { value: 30, suffix: "+", label: "Projetos entregues" },
  { value: 15, suffix: "+", label: "Tecnologias" },
  { value: 100, suffix: "%", label: "Comprometimento" },
];

export default function About() {
  return (
    <main className="min-h-screen bg-bg">
      <Header />

      {/* ── 01 HERO ─────────────────────────────────────── */}
      <section className="relative pt-28 pb-0 px-6 sm:px-8 md:px-16 overflow-hidden">
        <div className="about-grid" aria-hidden="true" />

        <div className="relative max-w-[1400px]">
          <BlurFade delay={0}>
            <p className="about-chapter">
              <span className="text-blue-base">01</span> / Sobre
            </p>
          </BlurFade>

          <WordPullUp
            text="QUEM É BRUNO."
            className="about-headline"
            delay={100}
            stagger={90}
          />

          <BlurFade delay={500} className="about-intro-grid">
            <p className="about-intro-lead">
              Desenvolvedor Full Stack baseado no Brasil. Faço sistemas que
              funcionam, interfaces que comunicam e código que dá orgulho de
              manter.
            </p>
            <div className="about-intro-meta">
              <p className="about-meta-item">
                <span className="text-blue-base" aria-hidden="true">
                  ›
                </span>{" "}
                Full Stack Developer
              </p>
              <p className="about-meta-item">
                <span className="text-blue-base" aria-hidden="true">
                  ›
                </span>{" "}
                Analista de Sistemas
              </p>
              <p className="about-meta-item">
                <span className="text-blue-base" aria-hidden="true">
                  ›
                </span>{" "}
                Brasil
              </p>
            </div>
          </BlurFade>
        </div>

        <div className="about-rule" />
      </section>

      {/* ── 02 BIO ──────────────────────────────────────── */}
      <section className="px-6 sm:px-8 md:px-16 py-20 md:py-28">
        <div className="max-w-[1400px]">
          <BlurFade delay={0}>
            <p className="about-chapter">
              <span className="text-blue-base">02</span> / Identidade
            </p>
          </BlurFade>

          <div className="about-bio-grid">
            <BlurFade delay={100} className="about-bio-quote-wrapper">
              <blockquote className="about-bio-quote">
                "Sistemas bem construídos são invisíveis — o usuário só percebe
                quando algo falha."
              </blockquote>
              <div className="about-bio-quote-line" aria-hidden="true" />
            </BlurFade>

            <BlurFade delay={200} className="about-bio-text-wrapper">
              <p className="about-bio-p">
                Comecei a programar por necessidade — queria criar coisas que
                funcionassem de verdade. Com o tempo, isso virou obsessão por
                código limpo, arquiteturas que fazem sentido e interfaces que
                respeitam quem usa.
              </p>
              <p className="about-bio-p">
                Trabalho com o stack completo: do banco de dados à tela do
                usuário. Tenho particular interesse em performance, experiência
                do usuário e na interseção entre design e engenharia.
              </p>
              <p className="about-bio-p">
                Quando não estou codando, estou lendo sobre sistemas, explorando
                novas ferramentas ou contribuindo com projetos open source.
              </p>

              <Link href="/contact" className="about-cta">
                Vamos conversar
                <span aria-hidden="true">→</span>
              </Link>
            </BlurFade>

            <BlurFade delay={300} className="about-bio-visual">
              <div className="about-code-block" aria-hidden="true">
                <p className="about-code-line">
                  <span className="text-blue-base">const</span> bruno = &#123;
                </p>
                <p className="about-code-line about-code-indent">
                  role:{" "}
                  <span className="text-blue-base">
                    &quot;Full Stack Dev&quot;
                  </span>
                  ,
                </p>
                <p className="about-code-line about-code-indent">
                  stack:{" "}
                  <span className="text-blue-base">
                    [&quot;React&quot;, &quot;Node&quot;, &quot;TS&quot;]
                  </span>
                  ,
                </p>
                <p className="about-code-line about-code-indent">
                  focus:{" "}
                  <span className="text-blue-base">&quot;Impact&quot;</span>,
                </p>
                <p className="about-code-line about-code-indent">
                  available: <span className="text-blue-base">true</span>
                </p>
                <p className="about-code-line">&#125;</p>
              </div>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* ── 03 HABILIDADES ──────────────────────────────── */}
      <section className="px-6 sm:px-8 md:px-16 py-20 md:py-28 bg-bg-subtle border-y border-border">
        <div className="max-w-[1400px]">
          <BlurFade delay={0}>
            <p className="about-chapter">
              <span className="text-blue-base">03</span> / Habilidades
            </p>
          </BlurFade>

          <WordPullUp
            text="O que eu sei fazer."
            className="about-section-title"
            stagger={60}
          />

          <div className="about-skills-grid">
            {Object.entries(skills).map(([category, items], i) => (
              <BlurFade key={category} delay={i * 80}>
                <div className="about-skill-group">
                  <p className="about-skill-label">
                    <span className="text-blue-base" aria-hidden="true">
                      /
                    </span>{" "}
                    {category}
                  </p>
                  <ul className="list-none">
                    {items.map((item) => (
                      <li key={item} className="about-skill-item">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* ── 04 TRAJETÓRIA ───────────────────────────────── */}
      <section className="px-6 sm:px-8 md:px-16 py-20 md:py-28">
        <div className="max-w-[1400px]">
          <BlurFade delay={0}>
            <p className="about-chapter">
              <span className="text-blue-base">04</span> / Trajetória
            </p>
          </BlurFade>

          <WordPullUp
            text="De onde vim, para onde vou."
            className="about-section-title"
            stagger={55}
          />

          <div className="about-timeline">
            {experience.map((item, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: dados estáticos sem ID natural
              <BlurFade key={i} delay={i * 120}>
                <div className="about-timeline-item">
                  <div className="about-timeline-accent" aria-hidden="true" />
                  <div className="about-timeline-body">
                    <div className="about-timeline-header">
                      <p className="about-timeline-role">{item.role}</p>
                      <p className="about-timeline-period">{item.period}</p>
                    </div>
                    <p className="about-timeline-company">{item.company}</p>
                    <p className="about-timeline-desc">{item.description}</p>
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* ── 05 NÚMEROS ──────────────────────────────────── */}
      <section className="px-6 sm:px-8 md:px-16 py-20 md:py-28 bg-bg-subtle border-y border-border">
        <div className="max-w-[1400px]">
          <BlurFade delay={0}>
            <p className="about-chapter">
              <span className="text-blue-base">05</span> / Números
            </p>
          </BlurFade>

          <div className="about-stats-grid">
            {stats.map((stat, i) => (
              <BlurFade key={stat.label} delay={i * 100}>
                <div className="about-stat">
                  <p className="about-stat-value">
                    <NumberTicker
                      value={stat.value}
                      suffix={stat.suffix}
                      duration={2000}
                    />
                  </p>
                  <p className="about-stat-label">{stat.label}</p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ───────────────────────────────────── */}
      <section className="px-6 sm:px-8 md:px-16 py-24 md:py-32">
        <div className="max-w-[1400px]">
          <BlurFade delay={0}>
            <WordPullUp
              text="Pronto para trabalhar juntos?"
              className="about-cta-headline"
              stagger={60}
            />
            <BlurFade delay={400}>
              <div className="flex flex-col sm:flex-row gap-4 mt-10">
                <Link href="/portfolio" className="about-btn-primary">
                  Ver projetos
                  <span aria-hidden="true">→</span>
                </Link>
                <Link href="/contact" className="about-btn-secondary">
                  Falar comigo
                </Link>
              </div>
            </BlurFade>
          </BlurFade>
        </div>
      </section>
    </main>
  );
}
