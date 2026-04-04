import type { Metadata } from "next";
import clsx from "clsx";

import ContactForm from "@/components/contact/contact-form";

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
const contactShellClass = clsx("mx-auto w-full max-w-5xl space-y-8");
const contactTitleClass = clsx(
  "max-w-3xl text-balance font-heading text-4xl leading-[0.94] tracking-[-0.08em] text-foreground",
  "sm:text-5xl lg:text-7xl",
);
const contactSubtitleClass = clsx(
  "max-w-2xl text-pretty text-sm leading-7 text-foreground/72",
  "dark:text-muted-foreground",
  "sm:text-base",
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
        <div className="space-y-3">
          <h1 id="contact-title" className={contactTitleClass}>
            Entre em contato
          </h1>

          <p id="contact-subtitle" className={contactSubtitleClass}>
            Vamos conversar
          </p>
        </div>
        <ContactForm />
      </section>
    </main>
  );
}
