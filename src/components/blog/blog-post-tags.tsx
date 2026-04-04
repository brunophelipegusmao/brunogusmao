import clsx from "clsx";

type BlogPostTagsProps = {
  tags: readonly string[];
  className?: string;
};

const blogPostTagsSectionClass = clsx("space-y-4");
const blogPostTagsLabelClass = clsx(
  "text-[0.68rem] font-medium uppercase tracking-[0.34em] text-foreground/60",
  "dark:text-muted-foreground",
);
const blogPostTagsListClass = clsx("flex flex-wrap gap-2");
const blogPostTagClass = clsx(
  "inline-flex min-h-8 items-center justify-center rounded-[0.75rem] border border-border/80 bg-background/92 px-3 py-1.5",
  "text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-foreground",
);

export default function BlogPostTags({ tags, className }: BlogPostTagsProps) {
  return (
    <section className={clsx(blogPostTagsSectionClass, className)} aria-labelledby="blog-post-tags">
      <p id="blog-post-tags" className={blogPostTagsLabelClass}>
        Tags
      </p>
      <div className={blogPostTagsListClass}>
        {tags.map((tag) => (
          <span key={tag} className={blogPostTagClass}>
            #{tag}
          </span>
        ))}
      </div>
    </section>
  );
}
