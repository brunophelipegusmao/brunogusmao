import clsx from "clsx";

import PillLink from "@/components/pill-link";
import type { BlogAction, BlogFact } from "@/app/blog/content";

type BlogHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  facts?: readonly BlogFact[];
  actions?: readonly BlogAction[];
  className?: string;
};

const blogHeroClass = clsx("mx-auto w-full max-w-5xl space-y-6");
const blogHeroEyebrowClass = clsx(
  "text-xs font-medium uppercase tracking-[0.36em] text-foreground/68",
  "dark:text-muted-foreground",
);
const blogHeroTitleClass = clsx(
  "max-w-4xl text-balance font-heading text-4xl leading-[0.95] tracking-[-0.07em] text-foreground",
  "sm:text-5xl lg:text-6xl",
);
const blogHeroCopyClass = clsx(
  "max-w-2xl text-pretty text-sm leading-7 text-foreground/72",
  "dark:text-muted-foreground",
  "sm:text-base",
);
const blogHeroActionRowClass = clsx("flex flex-col gap-3 sm:flex-row sm:flex-wrap");
const blogFactStripClass = clsx("grid gap-0 border-y border-border/70 sm:grid-cols-3");
const blogFactItemClass = clsx(
  "space-y-2 border-b border-border/70 py-4 last:border-b-0",
  "sm:border-b-0 sm:border-r sm:px-6 first:sm:pl-0 last:sm:border-r-0 last:sm:pr-0",
);
const blogFactLabelClass = clsx(
  "text-[0.68rem] font-medium uppercase tracking-[0.34em] text-foreground/60",
  "dark:text-muted-foreground",
);
const blogFactValueClass = clsx("text-sm font-medium text-foreground");

export default function BlogHero({
  eyebrow,
  title,
  description,
  facts = [],
  actions = [],
  className,
}: BlogHeroProps) {
  return (
    <section aria-labelledby="blog-title" className={clsx(blogHeroClass, className)}>
      <div className="space-y-4">
        <p className={blogHeroEyebrowClass}>{eyebrow}</p>
        <h1 id="blog-title" className={blogHeroTitleClass}>
          {title}
        </h1>
        <p className={blogHeroCopyClass}>{description}</p>

        {actions.length ? (
          <div className={blogHeroActionRowClass}>
            {actions.map((action) => (
              <PillLink
                key={action.label}
                href={action.href}
                external={action.external}
                variant={action.variant}
                aria-label={action.ariaLabel}
              >
                {action.label}
              </PillLink>
            ))}
          </div>
        ) : null}
      </div>

      {facts.length ? (
        <dl className={blogFactStripClass}>
          {facts.map((fact) => (
            <div key={fact.label} className={blogFactItemClass}>
              <dt className={blogFactLabelClass}>{fact.label}</dt>
              <dd className={blogFactValueClass}>{fact.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </section>
  );
}
