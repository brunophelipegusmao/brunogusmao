import clsx from "clsx";
import { useId } from "react";

type InputTextVariants = "default" | "ghost";

type InputTextProps = {
  id?: string;
  labelText?: string;
  variant?: InputTextVariants;
} & React.ComponentProps<"input">;

export function InputText({
  labelText = "",
  variant = "default",
  className,
  id,
  ...props
}: InputTextProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  const inputTextVariants: Record<InputTextVariants, string> = {
    default: clsx(
      "border border-border/80 bg-background/96 text-foreground placeholder:text-muted-foreground/70",
      "dark:border-border/70 dark:bg-background/80",
      "focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    ),
    ghost: clsx(
      "border border-border/60 bg-background/90 text-foreground placeholder:text-muted-foreground/70",
      "dark:border-border/50 dark:bg-background/40",
      "focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    ),
  };

  const inputTextClasses = clsx(
    "min-h-11 w-full rounded-2xl px-4 py-3 text-sm shadow-sm transition-colors duration-200",
    inputTextVariants[variant],
    className,
  );

  return (
    <div
      className={clsx(
        "flex w-full flex-col gap-2",
      )}
    >
      {labelText && (
        <label className={clsx("text-sm font-medium text-foreground")} htmlFor={inputId}>
          {labelText}
        </label>
      )}

      <input type="text" className={inputTextClasses} {...props} id={inputId} />
    </div>
  );
}
