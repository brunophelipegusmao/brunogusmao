import clsx from "clsx";
import type { ReactNode } from "react";

type SectionHeadingProps = {
  id?: string;
  eyebrow: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

const sectionHeadingRootClass = clsx("space-y-3");
const sectionEyebrowClass = clsx(
  "text-[0.68rem] font-medium uppercase tracking-[0.34em] text-foreground/68",
  "dark:text-muted-foreground",
);
const sectionTitleClass = clsx(
  "font-heading text-2xl tracking-[-0.06em] text-foreground text-balance sm:text-3xl lg:text-4xl",
);
const sectionDescriptionClass = clsx(
  "max-w-2xl text-sm leading-7 text-foreground/72 sm:text-base",
  "dark:text-muted-foreground",
);

export default function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={clsx(
        sectionHeadingRootClass,
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <p className={sectionEyebrowClass}>{eyebrow}</p>
      <h2 id={id} className={sectionTitleClass}>
        {title}
      </h2>
      {description ? (
        <p
          className={clsx(
            sectionDescriptionClass,
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
