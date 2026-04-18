"use client";

import Link from "next/link";
import { useCallback, useState } from "react";

import { cn } from "@/lib/utils";

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

interface RippleButtonProps {
  children: React.ReactNode;
  href?: string;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

function useRipple() {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const createRipple = useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      const target = event.currentTarget;
      const rect = target.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 1.35;
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;
      const id = Date.now() + Math.random();

      setRipples((previous) => [...previous, { id, x, y, size }]);

      window.setTimeout(() => {
        setRipples((previous) => previous.filter((ripple) => ripple.id !== id));
      }, 650);
    },
    [],
  );

  return { ripples, createRipple };
}

export function RippleButton({
  children,
  href,
  type = "button",
  className,
  disabled,
  onClick,
}: RippleButtonProps) {
  const { ripples, createRipple } = useRipple();
  const baseClassName = cn(
    "group relative inline-flex items-center justify-center overflow-hidden border border-border bg-blue-base px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] text-text-on-accent transition-colors duration-200 hover:bg-blue-hover disabled:cursor-not-allowed disabled:opacity-55",
    className,
  );

  const rippleNodes = ripples.map((ripple) => (
    <span
      key={ripple.id}
      className="pointer-events-none absolute rounded-full bg-white/35 magic-ripple"
      style={{
        left: ripple.x,
        top: ripple.y,
        width: ripple.size,
        height: ripple.size,
      }}
    />
  ));

  const content = (
    <>
      {rippleNodes}
      <span className="relative z-[1]">{children}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={baseClassName} onPointerDown={createRipple}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={baseClassName}
      disabled={disabled}
      onClick={onClick}
      onPointerDown={createRipple}
    >
      {content}
    </button>
  );
}
