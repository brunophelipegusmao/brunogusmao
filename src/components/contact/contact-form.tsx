"use client";

import clsx from "clsx";
import type { SubmitEventHandler } from "react";

import { InputText } from "@/components/inputText";
import PillLink from "@/components/pill-link";

const contactCardClass = clsx(
  "relative overflow-hidden rounded-[2rem] border border-border/70 bg-background/88 p-6",
  "shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl",
  "dark:bg-background/60 sm:p-8 lg:p-10",
);
const contactCardAccentClass = clsx(
  "pointer-events-none absolute inset-x-0 top-0 h-px",
  "bg-gradient-to-r from-transparent via-primary/60 to-transparent",
);
const contactCardBodyClass = clsx("space-y-6");
const contactFormFieldsClass = clsx("grid gap-4 sm:grid-cols-2");
const contactFieldLabelClass = clsx(
  "text-[0.68rem] font-medium uppercase tracking-[0.34em] text-foreground/60",
  "dark:text-muted-foreground",
);
const contactRequiredMarkClass = clsx("text-primary");
const contactTextareaFieldClass = clsx("space-y-2 sm:col-span-2");
const contactTextareaClass = clsx(
  "min-h-44 w-full resize-y rounded-3xl border border-border/70 bg-background/94 px-4 py-4",
  "text-sm text-foreground placeholder:text-foreground/40",
  "shadow-[0_1px_0_rgba(255,255,255,0.02)] outline-none transition-colors duration-200",
  "focus:border-primary/40 focus:ring-2 focus:ring-primary/20",
  "dark:bg-background/55",
);
const contactActionsClass = clsx(
  "flex flex-col gap-4 border-t border-border/70 pt-5 sm:flex-row sm:items-center sm:justify-between",
);
const contactButtonGroupClass = clsx("flex flex-wrap gap-3");
const contactFooterClass = clsx(
  "flex items-center justify-start border-t border-border/70 pt-5",
);
const contactPrimaryButtonClass = clsx(
  "inline-flex min-h-11 items-center justify-center rounded-full px-5 py-3",
  "cursor-pointer border border-transparent bg-foreground text-background",
  "text-sm font-semibold transition-colors duration-200 hover:bg-primary hover:text-primary-foreground",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
);
const contactSecondaryButtonClass = clsx(
  "inline-flex min-h-11 items-center justify-center rounded-full border border-border/80 bg-background/94 px-5 py-3",
  "cursor-pointer text-sm font-semibold text-foreground transition-colors duration-200 hover:border-primary/40 hover:text-primary",
  "dark:bg-transparent",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
);
const contactNoteClass = clsx(
  "text-xs font-medium uppercase tracking-[0.28em] text-foreground/60",
  "dark:text-muted-foreground",
);

const preventSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
  event.preventDefault();
};

export default function ContactForm() {
  return (
    <form className={contactCardClass} onSubmit={preventSubmit}>
      <div className={contactCardAccentClass} />

      <div className={contactCardBodyClass}>
        <div className={contactFormFieldsClass}>
          <InputText
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            variant="ghost"
            wrapperClassName="gap-3"
            labelClassName={contactFieldLabelClass}
            labelText={
              <>
                Nome
                <span aria-hidden="true" className={contactRequiredMarkClass}>
                  *
                </span>
              </>
            }
          />

          <InputText
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            variant="ghost"
            wrapperClassName="gap-3"
            labelClassName={contactFieldLabelClass}
            labelText={
              <>
                E-mail
                <span aria-hidden="true" className={contactRequiredMarkClass}>
                  *
                </span>
              </>
            }
          />

          <InputText
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            variant="ghost"
            wrapperClassName="gap-3"
            labelClassName={contactFieldLabelClass}
            labelText="Telefone"
          />

          <label htmlFor="contact-message" className={contactTextareaFieldClass}>
            <span className={contactFieldLabelClass}>
              Mensagem<span aria-hidden="true" className={contactRequiredMarkClass}>
                *
              </span>
            </span>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={7}
              className={contactTextareaClass}
            />
          </label>
        </div>

        <div className={contactActionsClass}>
          <div className={contactButtonGroupClass}>
            <button type="submit" className={contactPrimaryButtonClass}>
              Enviar
            </button>
            <button type="reset" className={contactSecondaryButtonClass}>
              Reiniciar
            </button>
          </div>

          <p className={contactNoteClass}>* Obrigatório</p>
        </div>

        <div className={contactFooterClass}>
          <PillLink
            href="https://www.linkedin.com/in/bruno-mulim/"
            external
            variant="outline"
            aria-label="Abrir o perfil de Bruno Gusmão no LinkedIn"
          >
            LinkedIn
          </PillLink>
        </div>
      </div>
    </form>
  );
}
