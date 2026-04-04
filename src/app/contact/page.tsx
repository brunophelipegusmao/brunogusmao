import type { Metadata } from "next";
import clsx from "clsx";

import ContactForm from "@/components/contact/contact-form";
import PillLink from "@/components/pill-link";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Formulário de contato de Bruno Gusmão com campos para nome, e-mail, telefone e mensagem, além de link para o LinkedIn.",
};

const contactPageClass = clsx(
  "relative flex w-full flex-1 overflow-hidden py-6 sm:py-8 lg:py-12",
  "isolate",
);
const contactGlowClass = clsx(
  "pointer-events-none absolute left-1/2 top-[-8rem] -z-10 h-72 w-[44rem] -translate-x-1/2 rounded-full",
  "bg-[radial-gradient(circle,rgba(37,99,235,0.14),transparent_66%)] blur-3xl",
  "sm:top-[-10rem] sm:h-96",
);
const contactGlowSecondaryClass = clsx(
  "pointer-events-none absolute right-[-8rem] top-[12rem] -z-10 hidden h-64 w-64 rounded-full",
  "bg-[radial-gradient(circle,rgba(24,24,27,0.08),transparent_68%)] blur-3xl",
  "dark:block dark:bg-[radial-gradient(circle,rgba(255,255,255,0.06),transparent_68%)]",
);
const contactShellClass = clsx(
  "mx-auto grid w-full max-w-6xl gap-12",
  "lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start",
);
const contactIntroClass = clsx("space-y-6 lg:sticky lg:top-10");
const contactEyebrowClass = clsx(
  "inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.36em] text-foreground/68",
  "dark:text-muted-foreground",
);
const contactEyebrowAccentClass = "text-primary";
const contactTitleClass = clsx(
  "max-w-3xl text-balance font-heading text-4xl leading-[0.94] tracking-[-0.08em] text-foreground",
  "sm:text-5xl lg:text-7xl",
);
const contactSubtitleClass = clsx(
  "max-w-2xl text-pretty text-sm leading-7 text-foreground/72",
  "dark:text-muted-foreground",
  "sm:text-base",
);
const contactCopyClass = clsx(
  "max-w-xl text-sm leading-7 text-foreground/72",
  "dark:text-muted-foreground",
);
const contactInfoGridClass = clsx("grid gap-3 sm:grid-cols-3");
const contactInfoCardClass = clsx(
  "rounded-2xl border border-border/70 bg-background/88 p-4 shadow-sm backdrop-blur-sm",
  "dark:bg-background/50",
);
const contactInfoLabelClass = clsx(
  "text-[0.68rem] font-medium uppercase tracking-[0.34em] text-foreground/60",
  "dark:text-muted-foreground",
);
const contactInfoValueClass = clsx("mt-2 text-sm font-semibold text-foreground");
const contactInfoTextClass = clsx(
  "mt-2 text-sm leading-6 text-foreground/72",
  "dark:text-muted-foreground",
);
const contactIntroActionRowClass = clsx("flex flex-col gap-3 sm:flex-row sm:items-center");
const contactIntroActionNoteClass = clsx(
  "text-sm leading-6 text-foreground/62",
  "dark:text-muted-foreground",
);

export default function ContactPage() {
  return (
    <main className={contactPageClass}>
      <div className={contactGlowClass} />
      <div className={contactGlowSecondaryClass} />

      <section
        className={contactShellClass}
        aria-labelledby="contact-title"
        aria-describedby="contact-subtitle"
      >
        <div className={contactIntroClass}>
          <p className={contactEyebrowClass}>
            <span className={contactEyebrowAccentClass}>Contato</span>
            <span>direto</span>
          </p>

          <h1 id="contact-title" className={contactTitleClass}>
            Entre em contato
          </h1>

          <p id="contact-subtitle" className={contactSubtitleClass}>
            Vamos conversar
          </p>

          <p className={contactCopyClass}>
            Se você tem um projeto, parceria ou ideia, esse é o canal mais
            direto. Eu organizo a resposta com contexto e foco no próximo
            passo.
          </p>

          <div className={contactInfoGridClass}>
            <div className={contactInfoCardClass}>
              <p className={contactInfoLabelClass}>Canal</p>
              <p className={contactInfoValueClass}>LinkedIn</p>
              <p className={contactInfoTextClass}>
                Perfil público para contato rápido.
              </p>
            </div>

            <div className={contactInfoCardClass}>
              <p className={contactInfoLabelClass}>Resposta</p>
              <p className={contactInfoValueClass}>Até 2 dias úteis</p>
              <p className={contactInfoTextClass}>
                Mensagem recebida, contexto organizado.
              </p>
            </div>

            <div className={contactInfoCardClass}>
              <p className={contactInfoLabelClass}>Foco</p>
              <p className={contactInfoValueClass}>Projetos e conversas</p>
              <p className={contactInfoTextClass}>
                Parcerias, dúvidas e oportunidades.
              </p>
            </div>
          </div>

          <div className={contactIntroActionRowClass}>
            <PillLink
              href="https://www.linkedin.com/in/bruno-mulim/"
              external
              variant="solid"
              aria-label="Abrir o perfil de Bruno Gusmão no LinkedIn"
            >
              LinkedIn
            </PillLink>
            <p className={contactIntroActionNoteClass}>
              Se preferir, você também pode mandar tudo por aqui.
            </p>
          </div>
        </div>
        <ContactForm />
      </section>
    </main>
  );
}
