"use client";

import clsx from "clsx";
import { useState } from "react";
import { DownloadSimpleIcon, FilePdfIcon } from "@phosphor-icons/react";
import * as motion from "motion/react-client";
import { useReducedMotion } from "motion/react";
import Modal from "../modal";

type ResumeModalProps = {
  triggerClassName?: string;
  triggerLabel?: string;
};

const resumeOptions = [
  {
    fileName: "CV_Bruno_gusmao-pt.pdf",
    href: "/docs/CV_Bruno_gusmao-pt.pdf",
    label: "Português",
  },
  {
    fileName: "resume_Bruno_gusmao-en.pdf",
    href: "/docs/resume_Bruno_gusmao-en.pdf",
    label: "Inglês",
  },
] as const;

const defaultTriggerClass = clsx(
  "inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-border/80 bg-background/92 px-5 py-3",
  "dark:bg-transparent",
  "text-sm font-semibold text-foreground transition-colors duration-200 hover:border-primary/40 hover:text-primary",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  "sm:w-auto",
);

const modalOptionsClass = clsx("grid gap-3 sm:grid-cols-2");
const modalOptionClass = clsx(
  "group flex min-h-24 flex-col justify-between rounded-[1.4rem] border border-border/80 bg-background/94 p-4 text-left",
  "transition-colors duration-200 hover:border-primary/40 hover:bg-foreground/[0.04]",
  "dark:border-border/70 dark:bg-background/70 dark:hover:bg-foreground/[0.03]",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
);
const modalOptionTopClass = clsx("flex items-start justify-between gap-3");
const modalOptionIconClass = clsx(
  "inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border/80 bg-foreground/[0.04] text-primary",
  "dark:border-border/70 dark:bg-foreground/[0.03]",
);
const modalOptionTitleClass = clsx("text-base font-semibold text-foreground");
const modalOptionMetaClass = clsx(
  "mt-1 text-xs uppercase tracking-[0.3em] text-foreground/62",
  "dark:text-muted-foreground",
);
const modalOptionArrowClass = clsx(
  "inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/80 text-foreground transition-colors duration-200 group-hover:border-primary/40 group-hover:text-primary",
  "dark:border-border/70",
);
const modalTriggerIconClass = clsx("h-4 w-4");
const modalOptionIconSvgClass = clsx("h-5 w-5");
const resumeDialogId = "resume-dialog";

export default function ResumeModal({
  triggerClassName,
  triggerLabel = "Currículo",
}: ResumeModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <>
      <motion.button
        type="button"
        aria-haspopup="dialog"
        aria-controls={resumeDialogId}
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}
        className={triggerClassName ?? defaultTriggerClass}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
      >
        {triggerLabel}
        <DownloadSimpleIcon aria-hidden="true" className={modalTriggerIconClass} weight="bold" />
      </motion.button>

      <Modal
        id={resumeDialogId}
        open={isOpen}
        onOpenChange={setIsOpen}
        eyebrow="Currículo"
        title="Escolha o idioma"
        description="Abra a versão em português ou inglês para ver ou baixar o currículo."
        initialFocusSelector="a[href]"
      >
        <div className={modalOptionsClass}>
          {resumeOptions.map((option) => (
            <motion.a
              key={option.href}
              href={option.href}
              download={option.fileName}
              onClick={() => setIsOpen(false)}
              className={modalOptionClass}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            >
              <div className={modalOptionTopClass}>
                <div className={modalOptionIconClass}>
                  <FilePdfIcon aria-hidden="true" className={modalOptionIconSvgClass} weight="bold" />
                </div>
                <span className={modalOptionArrowClass} aria-hidden="true">
                  ↗
                </span>
              </div>

              <div>
                <p className={modalOptionTitleClass}>{option.label}</p>
                <p className={modalOptionMetaClass}>PDF disponível</p>
              </div>
            </motion.a>
          ))}
        </div>
      </Modal>
    </>
  );
}
