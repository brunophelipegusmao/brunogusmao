"use client";

import clsx from "clsx";
import { MoonStarsIcon, SunDimIcon } from "@phosphor-icons/react";
import * as motion from "motion/react-client";
import { useReducedMotion } from "motion/react";

const themeToggleClass = clsx(
  "inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-full border border-border/80",
  "bg-background/92 text-foreground shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-sm",
  "dark:bg-background/80 dark:shadow-sm dark:backdrop-blur-xl",
  "transition-colors duration-200 hover:border-primary/40 hover:text-primary",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
);

const themeToggleIconWrapClass = clsx("relative flex h-5 w-5 items-center justify-center");
const themeToggleIconClass = clsx("absolute h-5 w-5 transition-opacity duration-200");
const themeToggleSunClass = clsx("opacity-100 dark:opacity-0");
const themeToggleMoonClass = clsx("opacity-0 dark:opacity-100");

function applyTheme(isDark: boolean) {
  const root = document.documentElement;

  root.classList.toggle("dark", isDark);
  root.style.colorScheme = isDark ? "dark" : "light";
}

type ThemeToggleProps = {
  className?: string;
};

export default function ThemeToggle({ className }: ThemeToggleProps) {
  const shouldReduceMotion = useReducedMotion() ?? false;

  function handleThemeToggle() {
    const root = document.documentElement;
    const nextTheme = !root.classList.contains("dark");

    applyTheme(nextTheme);

    try {
      localStorage.setItem("theme", nextTheme ? "dark" : "light");
    } catch {
      // A preferencia continua aplicada ao DOM, mesmo se o armazenamento falhar.
    }
  }

  return (
    <motion.button
      type="button"
      aria-label="Alternar entre tema claro e escuro"
      onClick={handleThemeToggle}
      className={clsx(themeToggleClass, className)}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
    >
      <span className={themeToggleIconWrapClass} aria-hidden="true">
        <SunDimIcon
          weight="bold"
          className={clsx(themeToggleIconClass, themeToggleSunClass)}
        />
        <MoonStarsIcon
          weight="bold"
          className={clsx(themeToggleIconClass, themeToggleMoonClass)}
        />
      </span>
    </motion.button>
  );
}
