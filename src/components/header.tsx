"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as motion from "motion/react-client";
import { LayoutGroup, useReducedMotion } from "motion/react";
import ThemeToggle from "@/components/theme-toggle";

const navItems = [
  { label: "Início", href: "/" },
  { label: "Sobre", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contato", href: "/contact" },
] as const;

// O header segue no fluxo normal da pagina, mas ainda usa um bloco sutil para manter a leitura limpa.
const headerShellClass = clsx("relative z-40 mb-4 w-full sm:mb-5");

const headerSurfaceClass = clsx(
  "relative overflow-visible rounded-[1.5rem] border border-border/80",
  "bg-background/94 px-3 py-3 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur-sm",
  "dark:border-border/70 dark:bg-background/80 dark:shadow-[0_24px_80px_rgba(9,9,11,0.08)] dark:backdrop-blur-xl",
  "sm:rounded-[1.75rem] sm:px-5 sm:py-4",
);

const headerGlowClass = clsx(
  "pointer-events-none absolute inset-x-4 top-0 h-px",
  "bg-gradient-to-r from-transparent via-primary/45 to-transparent",
  "sm:inset-x-8",
);

const headerLayoutClass = clsx(
  "relative flex flex-col gap-3",
);

const headerTopRowClass = clsx(
  "flex items-center justify-between gap-3",
);

const headerDesktopActionsClass = clsx("hidden items-center gap-3 lg:flex");
const headerMobileActionsClass = clsx("flex items-center gap-2 lg:hidden");

const desktopNavClass = clsx("hidden lg:block");
const desktopNavListClass = clsx("flex flex-wrap items-center gap-1.5");
const desktopNavItemClass = "relative";

const desktopNavLinkBaseClass = clsx(
  "relative inline-flex min-h-11 items-center justify-center overflow-hidden rounded-full px-4 py-2.5",
  "cursor-pointer text-sm font-medium text-foreground/62 transition-colors duration-200 hover:text-foreground",
  "dark:text-muted-foreground",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
);
const desktopNavLinkActiveClass = "text-foreground";
const desktopNavActivePillClass = clsx(
  "pointer-events-none absolute inset-0 rounded-full border border-primary/15 bg-foreground/[0.04]",
  "shadow-[inset_0_1px_0_rgba(255,255,255,0.48)]",
  "dark:border-primary/10 dark:bg-foreground/[0.05]",
);

const brandLinkClass = clsx(
  "group inline-flex min-h-11 items-center gap-3 self-start cursor-pointer",
  "text-foreground transition-colors duration-200 hover:text-primary",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
);

const brandDotClass = clsx(
  "h-2 w-2 rounded-full bg-primary",
  "shadow-[0_0_0_6px_rgba(56,104,255,0.08)]",
  "sm:h-2.5 sm:w-2.5",
);

const brandStackClass = "flex flex-col leading-none";
const brandMarkClass = clsx(
  "font-heading text-xl leading-none tracking-[-0.06em] sm:text-3xl",
);
const brandFirstNameClass = "text-foreground";
const brandLastNameClass = "text-foreground/68 dark:text-muted-foreground";
const brandLabelClass = clsx(
  "hidden text-[0.68rem] leading-tight text-foreground/62 sm:block",
  "dark:text-muted-foreground",
);

const navLabelClass = "relative z-10";

// A rota atual determina o item ativo, assim o cabeçalho mostra contexto sem depender de hover.
function isActiveRoute(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <motion.header
      aria-label="Cabeçalho principal"
      className={headerShellClass}
      initial={shouldReduceMotion ? false : { opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={headerSurfaceClass}>
        {/* A linha clara no topo reforça o bloco flutuante e conversa com o brilho do Hero. */}
        <div className={headerGlowClass} />

        <div className={headerLayoutClass}>
          <div className={headerTopRowClass}>
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href="/" aria-label="Ir para a página inicial" className={brandLinkClass}>
                {/* O ponto de marca entra com leveza, sem virar enfeite infinito. */}
                <motion.span
                  aria-hidden="true"
                  className={brandDotClass}
                  initial={shouldReduceMotion ? false : { scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                />
                <span className={brandStackClass}>
                  <span className={brandMarkClass}>
                    <span className={brandFirstNameClass}>Bruno</span>{" "}
                    <span className={brandLastNameClass}>Gusmão</span>
                  </span>
                  <span className={brandLabelClass}>Web Desenvolvedor Full Stack</span>
                </span>
              </Link>
            </motion.div>

            <div className={headerMobileActionsClass}>
              <ThemeToggle />
            </div>

            <div className={headerDesktopActionsClass}>
              <motion.nav
                aria-label="Principal"
                className={desktopNavClass}
                initial={shouldReduceMotion ? false : { opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Cada item entra em sequência para dar ritmo sem recorrer a animações contínuas. */}
                <LayoutGroup id="header-nav">
                  <ul className={desktopNavListClass}>
                    {navItems.map((item, index) => {
                      const active = isActiveRoute(pathname, item.href);

                      return (
                        <motion.li
                          key={item.href}
                          className={desktopNavItemClass}
                          initial={shouldReduceMotion ? false : { opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.3,
                            delay: 0.1 + index * 0.05,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          whileHover={shouldReduceMotion ? undefined : { y: -1 }}
                          whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                        >
                          <Link
                            href={item.href}
                            aria-current={active ? "page" : undefined}
                            className={clsx(
                              desktopNavLinkBaseClass,
                              active && desktopNavLinkActiveClass,
                            )}
                          >
                            {active ? (
                              <motion.span
                                aria-hidden="true"
                                className={desktopNavActivePillClass}
                                layoutId="header-active-pill"
                                transition={{ type: "spring", stiffness: 500, damping: 38 }}
                              />
                            ) : null}
                            <span className={navLabelClass}>{item.label}</span>
                          </Link>
                        </motion.li>
                      );
                    })}
                  </ul>
                </LayoutGroup>
              </motion.nav>

              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
