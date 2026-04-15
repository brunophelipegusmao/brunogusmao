"use client";

import { useEffect, useRef, useState } from "react";

interface WordPullUpProps {
  text: string;
  className?: string;
  /** Delay base em ms antes do primeiro word */
  delay?: number;
  /** Intervalo entre cada word em ms */
  stagger?: number;
}

/**
 * WordPullUp — MagicUI-style: cada palavra sobe individualmente
 * com stagger, ativado ao entrar no viewport.
 */
export function WordPullUp({
  text,
  className,
  delay = 0,
  stagger = 80,
}: WordPullUpProps) {
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
      { rootMargin: "-30px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const words = text.split(" ");

  return (
    <div ref={ref} className={className}>
      {/* Texto acessível oculto visualmente */}
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <span
          // biome-ignore lint/suspicious/noArrayIndexKey: ordem das palavras é a chave natural
          key={i}
          className="inline-block overflow-hidden"
          aria-hidden="true"
        >
          <span
            className="inline-block"
            style={
              visible
                ? {
                    animation: `word-pull-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${delay + i * stagger}ms both`,
                  }
                : { opacity: 0, transform: "translateY(100%)" }
            }
          >
            {word}
          </span>
          {i < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </div>
  );
}
