import clsx from "clsx";
import Link from "next/link";
import type { ReactNode } from "react";

type PillLinkVariant = "solid" | "outline";

type PillLinkProps = {
  href: string;
  children: ReactNode;
  external?: boolean;
  variant?: PillLinkVariant;
  className?: string;
} & Omit<
  React.ComponentPropsWithoutRef<"a">,
  "children" | "className" | "href"
>;

const pillLinkBaseClass = clsx(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-3",
  "cursor-pointer text-sm font-semibold transition-colors duration-200",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
);

const pillLinkVariantClasses: Record<PillLinkVariant, string> = {
  solid: clsx("bg-foreground text-background hover:bg-primary hover:text-primary-foreground"),
  outline: clsx(
    "border border-border/80 bg-background/94 text-foreground hover:border-primary/40 hover:text-primary",
    "dark:bg-transparent",
  ),
};

export default function PillLink({
  href,
  children,
  external = false,
  variant = "outline",
  className,
  target,
  rel,
  ...props
}: PillLinkProps) {
  const sharedClassName = clsx(
    pillLinkBaseClass,
    pillLinkVariantClasses[variant],
    className,
  );

  if (external) {
    return (
      <a
        href={href}
        target={target ?? "_blank"}
        rel={rel ?? "noreferrer noopener"}
        className={sharedClassName}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={sharedClassName} {...props}>
      {children}
    </Link>
  );
}
