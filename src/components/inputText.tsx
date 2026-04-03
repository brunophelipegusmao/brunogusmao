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
  ...props
}: InputTextProps) {
  const id = useId();

  const inputTextVariants: Record<InputTextVariants, string> = {
    default: clsx(
      "bg-chart-2 ring-3 ring-chart-2",
      "transition focus:ring-chart-4",
      "text-chart-1 font-bold text-secondary-foreground",
    ),
    ghost: clsx(
      "bg-muted text-muted-foreground font-bold", "disabled:cursor-not-allowed disabled:italic",
    ),
  };

  const inputTextClasses = clsx(
    inputTextVariants[variant],
    "py-2 px-1 rounded-lg",
    props.className,
  );

  return (
    <div
      className={clsx(
        "flex flex-col",
        "py-2 px-1",
        "relative w-auto overflow-hidden",
      )}
    >
      {labelText && (
        <label className={clsx("py-1 px-2", "font-bold text-sm")} htmlFor={id}>
          {labelText}
        </label>
      )}

      <input type="text" className={inputTextClasses} {...props} id={id} />
    </div>
  );
}
