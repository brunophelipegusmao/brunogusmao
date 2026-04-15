"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Sobre" },
  { href: "/portfolio", label: "Portfólio" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contato" },
];

function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <span className="font-mono text-xs tracking-[0.15em] opacity-0 select-none">
        _dark
      </span>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Ativar tema ${isDark ? "claro" : "escuro"}`}
      className="theme-toggle font-mono text-xs uppercase tracking-[0.15em] text-text-muted hover:text-text-primary transition-colors duration-200 cursor-pointer"
    >
      <span className="text-blue-base" aria-hidden="true">
        _
      </span>
      <span className="theme-toggle-label">{isDark ? "light" : "dark"}</span>
    </button>
  );
}

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Fecha o menu ao navegar
  // biome-ignore lint/correctness/useExhaustiveDependencies: setIsMenuOpen é estável (useState setter)
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Trava o scroll do body quando menu aberto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-8 py-4 border-b border-border bg-bg-subtle/85 backdrop-blur-sm">
        {/* Logo */}
        <Link
          href="/"
          className="font-goldman text-sm tracking-[0.2em] uppercase text-text-primary hover:text-blue-base transition-colors duration-200"
        >
          BG
        </Link>

        {/* Nav desktop */}
        <nav aria-label="Navegação principal" className="hidden md:block">
          <ul className="flex gap-8 list-none">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`nav-link relative font-mono text-xs uppercase tracking-[0.15em] transition-colors duration-200 pb-0.5 ${
                    pathname === link.href
                      ? "text-text-primary active"
                      : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Direita: theme toggle + hamburger */}
        <div className="flex items-center gap-4">
          <ThemeToggle />

          {/* Hamburger — só mobile */}
          <button
            type="button"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="md:hidden font-mono text-xs uppercase tracking-[0.2em] text-text-muted hover:text-text-primary transition-colors duration-200 cursor-pointer select-none"
          >
            {isMenuOpen ? "[×]" : "[≡]"}
          </button>
        </div>
      </header>

      {/* Mobile nav overlay */}
      <div
        className={`mobile-nav-overlay ${isMenuOpen ? "mobile-nav-overlay--open" : ""}`}
        aria-hidden={!isMenuOpen}
      >
        {/* Número de itens — detalhe brutalista */}
        <p className="mobile-nav-count" aria-hidden="true">
          <span className="text-blue-base">0{navLinks.length}</span> páginas
        </p>

        <nav aria-label="Menu mobile">
          <ul className="list-none flex flex-col gap-2">
            {navLinks.map((link, i) => (
              <li
                key={link.href}
                className="mobile-nav-item"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <Link
                  href={link.href}
                  className={`mobile-nav-link ${pathname === link.href ? "mobile-nav-link--active" : ""}`}
                  tabIndex={isMenuOpen ? 0 : -1}
                >
                  <span className="mobile-nav-index" aria-hidden="true">
                    0{i + 1}
                  </span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Rodapé do overlay */}
        <div className="mobile-nav-footer">
          <p className="font-mono text-xs text-text-muted tracking-[0.2em] uppercase">
            Bruno Gusmão — Full Stack
          </p>
        </div>
      </div>
    </>
  );
}
