"use client";

import { useEffect, useRef, useState } from "react";

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Margem do IntersectionObserver — quando o elemento entra na viewport */
  inViewMargin?: string;
}

/**
 * BlurFade — MagicUI-style: elemento entra com blur + fade + translateY
 * quando entra no viewport. CSS puro, sem dependências de animação.
 */
export function BlurFade({
  children,
  className,
  delay = 0,
  inViewMargin = "-50px",
}: BlurFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: inViewMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [inViewMargin]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? undefined : 0,
        animation: visible
          ? `blur-fade-in 0.55s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms both`
          : undefined,
      }}
    >
      {children}
    </div>
  );
}
