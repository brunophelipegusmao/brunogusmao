"use client";

import clsx from "clsx";
import type { ReactNode } from "react";
import { useEffect, useId, useRef } from "react";
import { XIcon } from "@phosphor-icons/react";
import * as motion from "motion/react-client";
import { useReducedMotion } from "motion/react";

type ModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: ReactNode;
  children: ReactNode;
  id?: string;
  description?: ReactNode;
  eyebrow?: ReactNode;
  closeLabel?: string;
  initialFocusSelector?: string;
  bodyClassName?: string;
  overlayClassName?: string;
  panelClassName?: string;
};

const defaultDialogClass = clsx(
  "fixed inset-0 z-[70] m-0 h-full w-full max-w-none bg-transparent p-0 text-inherit outline-none",
);

const defaultOverlayClass = clsx(
  "flex min-h-full items-center justify-center bg-background/72 px-4 py-6 backdrop-blur-sm",
  "dark:bg-background/80 dark:backdrop-blur-xl",
);

const defaultPanelClass = clsx(
  "relative w-full max-w-md overflow-hidden rounded-[1.75rem] border border-border/80 bg-background/98 p-5",
  "shadow-[0_32px_90px_rgba(15,23,42,0.16)] backdrop-blur-sm",
  "dark:border-border/70 dark:bg-background/95 dark:shadow-[0_32px_90px_rgba(9,9,11,0.28)] dark:backdrop-blur-xl",
  "sm:p-6",
);

const defaultHeaderClass = clsx("flex items-start justify-between gap-4");
const defaultEyebrowClass = clsx(
  "text-[0.68rem] font-medium uppercase tracking-[0.4em] text-foreground/68",
  "dark:text-muted-foreground",
);
const defaultTitleClass = clsx(
  "mt-2 font-heading text-2xl tracking-[-0.05em] text-foreground",
);
const defaultDescriptionClass = clsx(
  "mt-2 max-w-sm text-sm leading-6 text-foreground/72",
  "dark:text-muted-foreground",
);
const defaultCloseClass = clsx(
  "inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-full border border-border/80",
  "bg-background/96 text-foreground transition-colors duration-200 hover:border-primary/40 hover:text-primary",
  "dark:border-border/70 dark:bg-background/80",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
);
const defaultBodyClass = clsx("mt-5");
const closeButtonFocusSelector =
  "[data-modal-close], button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex='-1'])";

export default function Modal({
  open,
  onOpenChange,
  title,
  children,
  id,
  description,
  eyebrow,
  closeLabel = "Fechar modal",
  initialFocusSelector,
  bodyClassName,
  overlayClassName,
  panelClassName,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion() ?? false;
  const ids = useId();
  const titleId = `${ids}-title`;
  const descriptionId = description ? `${ids}-description` : undefined;

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!open || !dialog) {
      return undefined;
    }

    previousActiveElementRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    if (!dialog.open) {
      dialog.showModal();
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const frame = window.requestAnimationFrame(() => {
      const focusTarget = initialFocusSelector
        ? dialog.querySelector<HTMLElement>(initialFocusSelector)
        : null;

      const fallbackFocusTarget =
        dialog.querySelector<HTMLElement>(closeButtonFocusSelector) ?? dialog;

      (focusTarget ?? fallbackFocusTarget).focus();
    });

    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;

      if (dialog.open) {
        dialog.close();
      }

      previousActiveElementRef.current?.focus();
    };
  }, [initialFocusSelector, open]);

  if (!open) {
    return null;
  }

  return (
    <dialog
      ref={dialogRef}
      id={id}
      aria-describedby={descriptionId}
      aria-labelledby={titleId}
      className={defaultDialogClass}
      onCancel={(event) => {
        event.preventDefault();
        onOpenChange(false);
      }}
    >
      <div
        className={clsx(defaultOverlayClass, overlayClassName)}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            onOpenChange(false);
          }
        }}
      >
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 14, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className={clsx(defaultPanelClass, panelClassName)}
        >
          <div className={defaultHeaderClass}>
            <div>
              {eyebrow ? <p className={defaultEyebrowClass}>{eyebrow}</p> : null}
              <h2 id={titleId} className={defaultTitleClass}>
                {title}
              </h2>
              {description ? (
                <p id={descriptionId} className={defaultDescriptionClass}>
                  {description}
                </p>
              ) : null}
            </div>

            <motion.button
              type="button"
              aria-label={closeLabel}
              data-modal-close
              onClick={() => onOpenChange(false)}
              className={defaultCloseClass}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
            >
              <XIcon aria-hidden="true" className="h-4 w-4" weight="bold" />
            </motion.button>
          </div>

          <div className={clsx(defaultBodyClass, bodyClassName)}>{children}</div>
        </motion.div>
      </div>
    </dialog>
  );
}
