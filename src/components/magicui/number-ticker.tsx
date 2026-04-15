"use client";

import { useEffect, useRef, useState } from "react";

interface NumberTickerProps {
  value: number;
  /** Sufixo: "+", "k", "%" etc */
  suffix?: string;
  /** Prefixo */
  prefix?: string;
  className?: string;
  /** Duração da animação em ms */
  duration?: number;
}

/**
 * NumberTicker — MagicUI-style: número conta de 0 até o valor
 * quando entra no viewport. Usa requestAnimationFrame.
 */
export function NumberTicker({
  value,
  suffix = "",
  prefix = "",
  className,
  duration = 1800,
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-20px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    let startTime: number | null = null;
    const startValue = 0;

    const easeOut = (t: number) => 1 - (1 - t) ** 3;

    const tick = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOut(progress);
      setCurrent(Math.round(startValue + (value - startValue) * eased));

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, [started, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {current}
      {suffix}
    </span>
  );
}
