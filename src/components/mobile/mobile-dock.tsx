"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ElementType } from "react";
import {
  ArticleIcon,
  EnvelopeSimpleIcon,
  HouseIcon,
  UserCircleIcon,
} from "@phosphor-icons/react";
import * as motion from "motion/react-client";
import { LayoutGroup, useReducedMotion } from "motion/react";

type NavItem = {
  href: string;
  label: string;
  icon: ElementType;
};

const navItems: readonly NavItem[] = [
  { label: "Início", href: "/", icon: HouseIcon },
  { label: "Sobre", href: "/about", icon: UserCircleIcon },
  { label: "Blog", href: "/blog", icon: ArticleIcon },
  { label: "Contato", href: "/contact", icon: EnvelopeSimpleIcon },
] as const;

const dockRootClass = clsx(
  "fixed inset-x-0 bottom-0 z-50 flex justify-center px-3",
  "pb-[calc(1rem+env(safe-area-inset-bottom))] lg:hidden",
  "pointer-events-none",
);

const dockShellClass = clsx(
  "pointer-events-auto relative w-full max-w-[34rem] overflow-hidden rounded-[1.6rem]",
  "border border-border/80 bg-background/96 p-1.5 shadow-[0_24px_60px_rgba(15,23,42,0.16)] backdrop-blur-sm",
  "dark:border-border/70 dark:bg-background/88 dark:shadow-[0_24px_60px_rgba(9,9,11,0.22)] dark:backdrop-blur-xl",
);

const dockTopGlowClass = clsx(
  "pointer-events-none absolute inset-x-4 top-0 h-px",
  "bg-gradient-to-r from-transparent via-primary/35 to-transparent",
);

const dockListClass = clsx("grid grid-cols-4 gap-1");

const dockItemClass = clsx(
  "relative flex h-full min-h-16 w-full flex-col items-center justify-center gap-1.5 rounded-[1.2rem] px-2 py-2 text-center",
  "transition-colors duration-200",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
);
const dockItemActiveClass = "text-primary";
const dockItemInactiveClass = clsx(
  "text-foreground/62 hover:text-foreground",
  "dark:text-muted-foreground",
);

const dockItemActiveBackgroundClass = clsx(
  "pointer-events-none absolute inset-0 rounded-[1.2rem] border border-primary/18 bg-primary/12",
  "shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
  "dark:border-primary/15 dark:bg-primary/10",
);

const dockIconClass = clsx("h-5 w-5 shrink-0");
const dockLabelClass = clsx(
  "text-[0.58rem] font-semibold uppercase tracking-[0.32em] leading-none",
);

function isActiveRoute(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function MobileDock() {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <motion.nav
      aria-label="Navegação principal"
      className={dockRootClass}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={dockShellClass}>
        <div className={dockTopGlowClass} />
        <LayoutGroup id="mobile-dock">
          <ul className={dockListClass}>
            {navItems.map(({ href, label, icon: Icon }) => {
              const active = isActiveRoute(pathname, href);

              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={clsx(
                      dockItemClass,
                      active ? dockItemActiveClass : dockItemInactiveClass,
                    )}
                  >
                    {active ? (
                      <motion.span
                        aria-hidden="true"
                        className={dockItemActiveBackgroundClass}
                        layoutId="mobile-dock-active-pill"
                        transition={{ type: "spring", stiffness: 500, damping: 40 }}
                      />
                    ) : null}
                    <span className="relative z-10 flex flex-col items-center gap-1.5">
                      <Icon aria-hidden="true" className={dockIconClass} weight="bold" />
                      <span className={dockLabelClass}>{label}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </LayoutGroup>
      </div>
    </motion.nav>
  );
}
