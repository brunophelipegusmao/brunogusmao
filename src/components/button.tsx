import clsx from "clsx";

type ButtonVariants = "default" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  variant?: ButtonVariants;
  size?: ButtonSize;
} & React.ComponentProps<"button">;

const buttonBaseClass = clsx(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap font-semibold",
  "transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
);

const buttonVariantClasses: Record<ButtonVariants, string> = {
  default: clsx(
    "bg-foreground text-background hover:bg-primary hover:text-primary-foreground",
    "shadow-sm",
  ),
  ghost: clsx(
    "border border-border/80 bg-background/92 text-foreground hover:bg-muted/70",
    "backdrop-blur-sm dark:bg-background/70 dark:hover:bg-muted/60 dark:backdrop-blur-xl",
  ),
  danger: clsx(
    "bg-destructive text-destructive-foreground hover:opacity-90",
    "shadow-sm",
  ),
};

const buttonSizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-10 rounded-full px-4 text-sm",
  md: "min-h-11 rounded-full px-5 text-sm",
  lg: "min-h-12 rounded-full px-6 text-base",
};

export function Button({
  variant = "default",
  size = "md",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      {...props}
      className={clsx(buttonBaseClass, buttonVariantClasses[variant], buttonSizeClasses[size], className)}
    />
  );
}
