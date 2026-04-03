import type { Metadata } from "next";
import Link from "next/link";
import clsx from "clsx";
import ResumeModal from "@/components/hero/resume-modal";
import SectionHeading from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Conheça a trajetória, o método e o foco de Bruno Gusmão em desenvolvimento web full stack.",
};

const aboutPageClass = clsx(
  "flex w-full flex-1 flex-col gap-20 py-6",
  "sm:gap-24 sm:py-10 lg:py-12",
);

const introShellClass = clsx(
  "grid gap-12",
  "lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)] lg:items-start",
);
const introContentClass = clsx("space-y-8");
const introEyebrowClass = clsx(
  "text-xs font-medium uppercase tracking-[0.36em] text-foreground/68",
  "dark:text-muted-foreground",
);
const introTitleClass = clsx(
  "max-w-3xl text-balance font-heading text-4xl leading-[0.98] tracking-[-0.07em] text-foreground",
  "sm:text-5xl lg:text-6xl",
);
const introCopyClass = clsx(
  "max-w-2xl text-pretty text-sm leading-7 text-foreground/72",
  "dark:text-muted-foreground",
  "sm:text-base",
);
const introActionRowClass = clsx("flex flex-col gap-3 sm:flex-row sm:flex-wrap");

const primaryActionClass = clsx(
  "inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 py-3",
  "text-sm font-semibold text-background transition-transform duration-200 hover:-translate-y-0.5 hover:bg-primary",
  "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  "sm:w-auto",
);
const secondaryActionClass = clsx(
  "inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-border/80 bg-background/94 px-5 py-3",
  "dark:bg-transparent",
  "text-sm font-semibold text-foreground transition-colors duration-200 hover:border-primary/40 hover:text-primary",
  "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  "sm:w-auto",
);

const introAsideClass = clsx("space-y-6 lg:pt-3");
const introAsideLabelClass = clsx(
  "text-xs font-medium uppercase tracking-[0.36em] text-foreground/60",
  "dark:text-muted-foreground",
);
const introFactsClass = clsx("border-y border-border/70");
const introFactClass = clsx(
  "flex items-baseline justify-between gap-6 border-b border-border/70 py-4 last:border-b-0",
);
const introFactLabelClass = clsx(
  "text-[0.68rem] font-medium uppercase tracking-[0.34em] text-foreground/60",
  "dark:text-muted-foreground",
);
const introFactValueClass = clsx("text-sm font-medium text-foreground text-right");
const introAsideNoteClass = clsx(
  "max-w-sm text-sm leading-7 text-foreground/72",
  "dark:text-muted-foreground",
);

const focusListClass = clsx("border-t border-border/70");
const focusItemClass = clsx(
  "grid gap-3 border-b border-border/70 py-6 last:border-b-0",
  "md:grid-cols-[4rem_minmax(0,1fr)] md:gap-6",
);
const focusNumberClass = clsx(
  "text-xs font-medium uppercase tracking-[0.34em] text-primary",
);
const focusTitleClass = clsx("text-xl font-semibold tracking-[-0.04em] text-foreground");
const focusCopyClass = clsx(
  "mt-2 max-w-2xl text-sm leading-7 text-foreground/72",
  "dark:text-muted-foreground",
);

const splitGridClass = clsx("grid gap-16 lg:grid-cols-2");
const workListClass = clsx("border-t border-border/70");
const workItemClass = clsx(
  "grid gap-3 border-b border-border/70 py-5 last:border-b-0",
  "md:grid-cols-[4rem_minmax(0,1fr)] md:gap-6",
);
const workNumberClass = clsx("text-xs font-medium uppercase tracking-[0.34em] text-primary");
const workTitleClass = clsx("text-lg font-semibold tracking-[-0.04em] text-foreground");
const workCopyClass = clsx(
  "mt-2 text-sm leading-7 text-foreground/72",
  "dark:text-muted-foreground",
);

const timelineListClass = clsx("border-t border-border/70");
const timelineItemClass = clsx(
  "grid gap-3 border-b border-border/70 py-5 last:border-b-0",
  "md:grid-cols-[7rem_minmax(0,1fr)] md:gap-6",
);
const timelineMetaClass = clsx(
  "text-xs uppercase tracking-[0.34em] text-foreground/60",
  "dark:text-muted-foreground",
);
const timelineTitleClass = clsx("text-lg font-semibold tracking-[-0.04em] text-foreground");
const timelineCopyClass = clsx(
  "mt-2 text-sm leading-7 text-foreground/72",
  "dark:text-muted-foreground",
);

const ctaBandClass = clsx(
  "flex flex-col gap-6 border-t border-border/70 pt-8",
  "lg:flex-row lg:items-center lg:justify-between",
);
const ctaActionRowClass = clsx("flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:justify-end");

const overviewFacts = [
  { label: "Base", value: "Rio de Janeiro, RJ" },
  { label: "Atuação", value: "FUTURUMÃ" },
  { label: "Formação", value: "UVA 2013-2016" },
  { label: "Foco", value: "Dados 360 / Power BI" },
] as const;

const focusItems = [
  {
    number: "01",
    title: "Interfaces com contexto",
    description:
      "Organizo a hierarquia visual para que a pessoa entenda o que importa sem esforço.",
  },
  {
    number: "02",
    title: "Dados que orientam decisão",
    description:
      "Conecto informação, métrica e narrativa para deixar a leitura mais objetiva.",
  },
  {
    number: "03",
    title: "Comunicação que reduz ruído",
    description:
      "Ajusto tom, ordem e densidade de conteúdo para que a mensagem seja clara e útil.",
  },
] as const;

const workSteps = [
  {
    title: "Entendo o problema antes da tela",
    description:
      "Leio a necessidade, o contexto de negócio e as restrições para evitar decisões apressadas.",
  },
  {
    title: "Estruturo a informação com simplicidade",
    description:
      "Reorganizo a interface em blocos curtos, previsíveis e fáceis de escanear.",
  },
  {
    title: "Entrego com atenção a performance",
    description:
      "Prefiro camadas enxutas, navegação clara e comportamento consistente em todos os tamanhos.",
  },
  {
    title: "Fecho o ciclo com feedback e dados",
    description:
      "Ajusto o que é necessário a partir de uso real, retorno de pessoas e leitura do contexto.",
  },
] as const;

const timeline = [
  {
    period: "2013-2016",
    title: "Formação na UVA",
    description:
      "Base acadêmica que ajudou a consolidar disciplina, raciocínio e leitura de problemas.",
  },
  {
    period: "Planejamento digital",
    title: "Voluntariado e comunicação",
    description:
      "Aproximou conteúdo, contexto e organização de mensagem como parte do processo de trabalho.",
  },
  {
    period: "Hoje",
    title: "FUTURUMÃ e desenvolvimento web",
    description:
      "Atuação voltada a interfaces, dados e comunicação em um fluxo full stack.",
  },
] as const;

export default function AboutPage() {
  return (
    <main className={aboutPageClass}>
      <section aria-labelledby="about-title" className={introShellClass}>
        <div className={introContentClass}>
          <div className={introEyebrowClass}>
            <span className="text-primary">Sobre</span>
            <span>perfil e direção</span>
          </div>

          <h1 id="about-title" className={introTitleClass}>
            Bruno Gusmão
          </h1>

          <p className={introCopyClass}>
            Web Desenvolvedor Full Stack que trabalha melhor quando o contexto
            vem antes da tela. Eu conecto interfaces, dados e comunicação para
            que a decisão fique mais clara, a experiência mais limpa e a
            entrega mais fácil de sustentar.
          </p>

          <div className={introActionRowClass}>
            <Link href="/contact" className={primaryActionClass}>
              Falar comigo
              <span aria-hidden="true">↗</span>
            </Link>
            <ResumeModal triggerClassName={secondaryActionClass} />
          </div>
        </div>

        <aside className={introAsideClass} aria-label="Resumo rápido">
          <p className={introAsideLabelClass}>Resumo rápido</p>

          <dl className={introFactsClass}>
            {overviewFacts.map((fact) => (
              <div key={fact.label} className={introFactClass}>
                <dt className={introFactLabelClass}>{fact.label}</dt>
                <dd className={introFactValueClass}>{fact.value}</dd>
              </div>
            ))}
          </dl>

          <p className={introAsideNoteClass}>
            Eu costumo unir contexto, dados e interface para reduzir ruído e
            deixar a experiência mais objetiva.
          </p>
        </aside>
      </section>

      <section aria-labelledby="about-focus" className="space-y-6">
        <SectionHeading
          id="about-focus"
          eyebrow="Foco"
          title="O que eu entrego"
          description="Trabalho em camadas curtas e claras, com atenção ao que a pessoa precisa entender rápido e ao que a equipe precisa manter sem atrito."
          className="max-w-2xl"
        />

        <ul className={focusListClass}>
          {focusItems.map((item) => (
            <li key={item.title} className={focusItemClass}>
              <p className={focusNumberClass}>{item.number}</p>
              <div>
                <h3 className={focusTitleClass}>{item.title}</h3>
                <p className={focusCopyClass}>{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className={splitGridClass}>
        <article className="space-y-6" aria-labelledby="about-method">
          <SectionHeading
            id="about-method"
            eyebrow="Método"
            title="Como eu trabalho"
            description="Minha prioridade é manter a solução simples de usar, simples de ler e simples de evoluir."
          />

          <ol className={workListClass}>
            {workSteps.map((step, index) => (
              <li key={step.title} className={workItemClass}>
                <span className={workNumberClass}>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className={workTitleClass}>{step.title}</h3>
                  <p className={workCopyClass}>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </article>

        <article className="space-y-6" aria-labelledby="about-timeline">
          <SectionHeading
            id="about-timeline"
            eyebrow="Trajetória"
            title="Linha do tempo"
            description="Os pontos de referência que moldaram minha forma de pensar, estruturar e entregar."
          />

          <ol className={timelineListClass}>
            {timeline.map((item) => (
              <li key={item.title} className={timelineItemClass}>
                <p className={timelineMetaClass}>{item.period}</p>
                <div>
                  <h3 className={timelineTitleClass}>{item.title}</h3>
                  <p className={timelineCopyClass}>{item.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </article>
      </section>

      <section className={ctaBandClass} aria-labelledby="about-cta">
        <SectionHeading
          id="about-cta"
          eyebrow="Próximo passo"
          title="Se fizer sentido, eu posso começar pelo contexto."
          description="Abra o currículo ou fale comigo quando o problema pedir uma conversa objetiva."
          className="max-w-xl"
        />

        <div className={ctaActionRowClass}>
          <Link href="/contact" className={primaryActionClass}>
            Contato
            <span aria-hidden="true">↗</span>
          </Link>
          <ResumeModal triggerClassName={secondaryActionClass} />
        </div>
      </section>
    </main>
  );
}
