"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface PrivateThemeToggleProps {
  className?: string;
}

export function PrivateThemeToggle({ className }: PrivateThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const wrapperClass = className ?? "fixed top-4 right-4 z-30";

  if (!mounted) {
    return (
      <div
        className={`${wrapperClass} h-10 w-28 border border-border bg-bg-subtle/70 backdrop-blur-sm`}
        aria-hidden="true"
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <div className={wrapperClass}>
      <button
        type="button"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        aria-label={`Ativar tema ${isDark ? "claro" : "escuro"}`}
        className="theme-toggle border border-border bg-bg-subtle/90 px-3 py-2 font-mono text-xs uppercase tracking-[0.15em] text-text-muted backdrop-blur-sm transition-colors duration-200 hover:border-blue-base hover:text-text-primary"
      >
        <span className="text-blue-base" aria-hidden="true">
          _
        </span>
        <span className="theme-toggle-label">{isDark ? "light" : "dark"}</span>
      </button>
    </div>
  );
}
