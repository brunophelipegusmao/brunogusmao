import clsx from "clsx";

type ButtonVariants = "default" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  variant?: ButtonVariants;
  size?: ButtonSize;
} & React.ComponentProps<"button">;

export function Button({
  variant = "default",
  size = "md",
  ...props
}: ButtonProps) {
  const buttonVariants: Record<ButtonVariants, string> = {
    default: clsx(
      "cursor-pointer",
      "bg-chart-3 text-chart-1 font-bold tracking-wide",
      "hover:bg-chart-4 hover:font-bold",
      props.className,
    ),
    ghost: clsx(
      "cursor-not-allowed",
      "bg-muted text-muted-foreground",
      "font-bold border-2 border-muted-foreground",
      props.className,
    ),
    danger: clsx(
      "cursor-pointer",
      "bg-destructive text-accent font-bold",
      "hover:bg-destructive-foreground hover:text-accent-foreground",
      props.className,
    ),
  };

  const sizeVariants: Record<ButtonSize, string> = {
    sm: clsx(
      "text-sm/tight",
      "py-2",
      "px-4",
      "rounded-md",
      //   "[&>svg]:h-4 [&>svg]:w-4",
      "gap-2",
      props.className,
    ),
    md: clsx(
      "text-base/tight",
      "px-4 py-2",
      "rounded-md",
      //   "[&>svg]:h-4 [&>svg]:w-4",
      "gap-2",
      props.className,
    ),
    lg: clsx(
      "text-lg/tight",
      "py-4",
      "px-5",
      "rounded-lg",
      //   "[&>svg]:h-5 [&>svg]:w-5",
      "gap-3",
      props.className,
    ),
  };

  const buttonClasses = clsx(buttonVariants[variant], sizeVariants[size]);

  return <button {...props} className={clsx(buttonClasses)}></button>;
}
