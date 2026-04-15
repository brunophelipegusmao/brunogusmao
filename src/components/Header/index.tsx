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
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Evita hydration mismatch — só renderiza após montar no cliente
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    // Placeholder com mesma largura para não causar layout shift
    return <span className="font-mono text-xs tracking-[0.15em] opacity-0 select-none">_dark</span>;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Ativar tema ${isDark ? "claro" : "escuro"}`}
      className="theme-toggle font-mono text-xs uppercase tracking-[0.15em] text-text-muted hover:text-text-primary transition-colors duration-200 cursor-pointer"
    >
      <span className="text-blue-base" aria-hidden="true">_</span>
      <span className="theme-toggle-label">{isDark ? "light" : "dark"}</span>
    </button>
  );
}

export function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-4 border-b border-border bg-bg-subtle/85 backdrop-blur-sm">
      <Link
        href="/"
        className="font-goldman text-sm tracking-[0.2em] uppercase text-text-primary hover:text-blue-base transition-colors duration-200"
      >
        BG
      </Link>

      <nav aria-label="Navegação principal">
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

      <ThemeToggle />
    </header>
  );
}
