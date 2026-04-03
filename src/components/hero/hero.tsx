import clsx from "clsx";
import HeroSignal from "./hero-signal-shell";
import ResumeModal from "./resume-modal";
// Sinais publicos do LinkedIn, mantidos como conteudo simples para o Hero continuar legivel e rapido.
const profileSignals = [
  { label: "Localização", value: "Rio de Janeiro, RJ" },
  { label: "Seguidores", value: "3 mil" },
  { label: "Conexões", value: "+500" },
  { label: "Atuação", value: "FUTURUMÃ" },
] as const;

// Pistas secundarias de credibilidade. Elas sustentam a narrativa sem transformar o layout em uma grade de cards.
const credibilitySignals = [
  { label: "Formação", value: "UVA 2013-2016" },
  { label: "Certificações", value: "Dados 360 e Power BI" },
  { label: "Voluntariado", value: "Planejamento digital" },
] as const;

// Agrupei as classes com clsx para manter o JSX curto e deixar o ajuste visual mais direto.
const heroSectionClass = clsx(
  "relative isolate overflow-hidden",
  "pb-14 pt-8 sm:pb-20 sm:pt-12 lg:pb-24",
);

const heroTopLineClass = clsx(
  "pointer-events-none absolute inset-x-0 top-0 -z-10 h-px",
  "bg-gradient-to-r from-transparent via-border/70 to-transparent",
);

const heroGlowClass = clsx(
  "pointer-events-none absolute inset-x-0 top-[-6rem] -z-10 h-56",
  "bg-[radial-gradient(circle_at_top,rgba(56,104,255,0.15),transparent_65%)] blur-3xl",
  "sm:top-[-8rem] sm:h-64",
);

const heroGridClass = clsx(
  "grid items-start gap-10",
  "lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)] lg:gap-12",
);

const heroContentClass = "max-w-none";

const heroEyebrowClass = clsx(
  "inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.36em] text-foreground/68",
  "dark:text-muted-foreground",
);

const heroEyebrowAccentClass = "text-primary";

const heroTitleClass = clsx(
  "mt-6 text-balance font-heading text-3xl leading-[1.02] tracking-[-0.06em] text-foreground",
  "sm:text-4xl lg:text-6xl xl:text-7xl",
);
const heroTitleLeadClass = clsx("block");
const heroTitleMutedClass = clsx("block text-foreground/68 dark:text-muted-foreground");

const heroCopyClass = clsx(
  "mt-5 max-w-xl text-pretty text-sm leading-7 text-foreground/72",
  "dark:text-muted-foreground",
  "sm:text-base",
);

const heroCtaGroupClass = clsx("mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap");

const heroPrimaryCtaClass = clsx(
  "inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background",
  "transition-transform duration-200 hover:-translate-y-0.5 hover:bg-primary",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  "sm:w-auto",
);

const heroSecondaryCtaClass = clsx(
  "inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-border/80 bg-background/94 px-5 py-3 text-sm font-semibold text-foreground",
  "dark:bg-transparent",
  "transition-colors duration-200 hover:border-primary/40 hover:text-primary",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  "sm:w-auto",
);

const heroSignalRailClass = clsx(
  "mt-8 flex flex-wrap gap-x-10 gap-y-6 border-y border-border/70 py-6",
);

const heroSignalItemClass = clsx(
  "flex min-w-[11rem] items-start gap-3",
);
const heroSignalDotClass = clsx(
  "mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-primary shadow-[0_0_0_5px_rgba(56,104,255,0.08)]",
);
const heroSignalLabelClass = clsx(
  "text-[0.78rem] font-medium leading-none tracking-[-0.01em] text-foreground/62",
  "dark:text-muted-foreground",
);
const heroSignalValueClass = clsx(
  "mt-1.5 text-base font-semibold leading-6 tracking-[-0.02em] text-foreground",
);

const heroCredibilityRowClass = clsx(
  "mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs leading-6 text-muted-foreground sm:text-sm",
);

const heroCredibilityItemClass = "inline-flex items-center gap-2";
const heroCredibilityDotClass = clsx("h-1.5 w-1.5 rounded-full bg-primary/70");
const heroCredibilityLabelClass = "text-foreground/68 dark:text-muted-foreground";
const heroCredibilityValueClass = clsx("font-medium text-foreground");
const heroCredibilityDividerClass = clsx("hidden text-border sm:inline");

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className={heroSectionClass}>
      {/* Camadas de fundo decorativas. Elas dao profundidade sem aumentar a estrutura de DOM que a pessoa precisa ler. */}
      <div className={heroTopLineClass} />
      <div className={heroGlowClass} />

      {/* A coluna da esquerda carrega a narrativa; a da direita carrega o sinal visual de apoio. */}
      <div className={heroGridClass}>
        <div className={heroContentClass}>
          {/* Rotulo pequeno de apoio. Ele ancora a copia na fonte de verdade: o perfil publico do LinkedIn. */}
          <div className={heroEyebrowClass}>
            <span className={heroEyebrowAccentClass}>LinkedIn</span>
            <span>perfil público</span>
          </div>

          <h1 id="hero-title" className={heroTitleClass}>
            <span className={heroTitleLeadClass}>Bruno Gusmão</span>
            <span className={heroTitleMutedClass}>Web Desenvolvedor Full Stack</span>
          </h1>

          <p className={heroCopyClass}>
            {/* Copia mantida direta e factual: ela le como resumo de portifolio, nao como slogan de marketing. */}
            Construo interfaces web com foco em clareza, performance e
            contexto. No LinkedIn, isso aparece em FUTURUMÃ, Rio de Janeiro,
            UVA e voluntariado em planejamento digital.
          </p>

          {/* So dois CTAs: um ponto de prova externo e um seletor de currículo. */}
          <div className={heroCtaGroupClass}>
            <a
              href="https://www.linkedin.com/in/bruno-mulim/"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Abrir o perfil de Bruno Gusmão no LinkedIn"
              className={heroPrimaryCtaClass}
            >
              Ver LinkedIn
              <span aria-hidden="true">↗</span>
            </a>
            <ResumeModal triggerClassName={heroSecondaryCtaClass} />
          </div>

          {/* Trilho compacto de sinais. Ele substitui o antigo layout em cards por uma linha editorial mais limpa. */}
          <dl className={heroSignalRailClass}>
            {profileSignals.map(({ label, value }) => (
              <div key={label} className={heroSignalItemClass}>
                <span aria-hidden="true" className={heroSignalDotClass} />
                <div className="min-w-0">
                  <dt className={heroSignalLabelClass}>{label}</dt>
                  <dd className={heroSignalValueClass}>{value}</dd>
                </div>
              </div>
            ))}
          </dl>

          {/* Uma segunda linha, mais leve, de pontos de prova. Espaçada como texto, nao como blocos. */}
          <div className={heroCredibilityRowClass}>
            {credibilitySignals.map(({ label, value }, index) => (
              <span key={label} className={heroCredibilityItemClass}>
                <span className={heroCredibilityDotClass} />
                <span className={heroCredibilityLabelClass}>{label}</span>
                <span className={heroCredibilityValueClass}>{value}</span>
                {index < credibilitySignals.length - 1 ? (
                  <span className={heroCredibilityDividerClass}>•</span>
                ) : null}
              </span>
            ))}
          </div>
        </div>

        {/* O visual animado fica separado para preservar performance e manter a leitura do texto em primeiro plano. */}
        <HeroSignal />
      </div>
    </section>
  );
}
