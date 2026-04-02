import clsx from "clsx";

type ButtonVariants = "default" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  variant?: ButtonVariants;
  size?: ButtonSize;
  className?: string;
} & React.ComponentProps<"button">;

export function tButton({
  variant = "default",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  const buttonVariants: Record<ButtonVariants, string> = {
    default: clsx(
      "bg-primary cursor-pointer",
      "hover:bg-sidebar-primary hover:font-bold",
    ),
    ghost: clsx(
      "cursor-pointer bg-muted-foreground",
      "font-bold border-2 border-gray-500",
    ),
    danger: clsx("bg-dforeground", "font-bold"),
  };

  const sizeVariants: Record<ButtonSize, string> = {
    sm: clsx(
      "text-base/tight",
      "py-2",
      "px-4",
      "rounded-md",
      //   "[&>svg]:h-4 [&>svg]:w-4",
      "gap-2",
    ),
    md: clsx(
      "text-base/tight",
      "px-4 py-2",
      "rounded-md",
      //   "[&>svg]:h-4 [&>svg]:w-4",
      "gap-2",
    ),
    lg: clsx(
      "text-lg/tight",
      "py-4",
      "px-6",
      "rounded-lg",
      //   "[&>svg]:h-5 [&>svg]:w-5",
      "gap-3",
    ),
  };

  const buttonClasses = clsx(buttonVariants[variant], sizeVariants[size]);

  return (
    <button {...props} className={clsx(buttonClasses, className)}></button>
  );
}
