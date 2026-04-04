import clsx from "clsx";

import PillLink from "@/components/pill-link";
import BlogPostCover from "@/components/blog/blog-post-cover";
import BlogPostTags from "@/components/blog/blog-post-tags";
import type { BlogPost, BlogPostNavigationItem } from "@/app/blog/content";

type BlogPostPageProps = {
  post: BlogPost;
  previousPost: BlogPostNavigationItem | null;
  nextPost: BlogPostNavigationItem | null;
  className?: string;
};

type BlogPostSectionProps = {
  slug: string;
  index: number;
  title: string;
  paragraphs: readonly string[];
};

type BlogPostMetaItemProps = {
  label: string;
  value: string;
};

const blogPostPageClass = clsx(
  "mx-auto flex w-full max-w-5xl flex-1 flex-col gap-12 py-6",
  "sm:gap-14 sm:py-10 lg:py-12",
);
const blogPostBackRowClass = clsx("flex flex-wrap items-center gap-3");
const blogPostArticleClass = clsx("space-y-8");
const blogPostHeaderClass = clsx("space-y-4 border-b border-border/70 pb-8");
const blogPostEyebrowClass = clsx(
  "text-xs font-medium uppercase tracking-[0.36em] text-foreground/68",
  "dark:text-muted-foreground",
);
const blogPostTitleClass = clsx(
  "max-w-4xl text-balance font-heading text-4xl leading-[0.95] tracking-[-0.07em] text-foreground",
  "sm:text-5xl lg:text-6xl",
);
const blogPostCopyClass = clsx(
  "max-w-3xl text-pretty text-sm leading-7 text-foreground/72",
  "dark:text-muted-foreground",
  "sm:text-base",
);
const blogPostMetaGridClass = clsx("grid gap-0 border-y border-border/70 sm:grid-cols-3");
const blogPostMetaItemClass = clsx(
  "space-y-2 border-b border-border/70 py-4 last:border-b-0",
  "sm:border-b-0 sm:border-r sm:px-6 first:sm:pl-0 last:sm:border-r-0 last:sm:pr-0",
);
const blogPostMetaLabelClass = clsx(
  "text-[0.68rem] font-medium uppercase tracking-[0.34em] text-foreground/60",
  "dark:text-muted-foreground",
);
const blogPostMetaValueClass = clsx("text-sm font-medium text-foreground");
const blogPostIntroClass = clsx(
  "border-y border-border/70 py-6 text-lg leading-8 text-foreground/82",
  "dark:text-muted-foreground",
  "sm:text-xl",
);
const blogPostBodyClass = clsx("space-y-10");
const blogPostSectionClass = clsx(
  "space-y-4 border-b border-border/70 pb-8 last:border-b-0 last:pb-0",
);
const blogPostSectionTitleClass = clsx(
  "font-heading text-2xl tracking-[-0.06em] text-foreground sm:text-3xl",
);
const blogPostParagraphClass = clsx(
  "max-w-3xl text-sm leading-7 text-foreground/72",
  "dark:text-muted-foreground",
  "sm:text-base",
);
const blogPostTakeawaysClass = clsx("border-y border-border/70");
const blogPostTakeawayClass = clsx(
  "grid gap-3 border-b border-border/70 py-5 last:border-b-0",
  "sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-6",
);
const blogPostTakeawayIndexClass = clsx(
  "text-xs font-medium uppercase tracking-[0.34em] text-primary",
);
const blogPostTakeawayTextClass = clsx("text-base leading-7 text-foreground/82");
const blogPostFooterClass = clsx(
  "flex flex-col gap-6 border-t border-border/70 pt-8",
  "lg:flex-row lg:items-center lg:justify-between",
);
const blogPostFooterCopyClass = clsx(
  "max-w-2xl text-sm leading-7 text-foreground/72",
  "dark:text-muted-foreground",
);
const blogPostFooterActionsClass = clsx("flex flex-col gap-3 sm:flex-row sm:flex-wrap");
const blogPostTagsClass = clsx("border-y border-border/70 py-6");
const blogPostNavigationRowClass = clsx("flex flex-col gap-3 sm:flex-row sm:flex-wrap");

function BlogPostMetaItem({ label, value }: BlogPostMetaItemProps) {
  return (
    <div className={blogPostMetaItemClass}>
      <dt className={blogPostMetaLabelClass}>{label}</dt>
      <dd className={blogPostMetaValueClass}>{value}</dd>
    </div>
  );
}

function BlogPostBodySection({
  slug,
  index,
  title,
  paragraphs,
}: BlogPostSectionProps) {
  const sectionId = `${slug}-section-${index}`;

  return (
    <section aria-labelledby={sectionId} className={blogPostSectionClass}>
      <h2 id={sectionId} className={blogPostSectionTitleClass}>
        {title}
      </h2>

      <div className="space-y-4">
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className={blogPostParagraphClass}>
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}

export default function BlogPostPage({
  post,
  previousPost,
  nextPost,
  className,
}: BlogPostPageProps) {
  return (
    <main className={clsx(blogPostPageClass, className)}>
      <div className={blogPostBackRowClass}>
        <PillLink href="/blog" variant="outline">
          Voltar ao blog
        </PillLink>
      </div>

      <article className={blogPostArticleClass}>
        <header className={blogPostHeaderClass}>
          <p className={blogPostEyebrowClass}>
            {post.meta[0]} · {post.publishedAt}
          </p>
          <h1 className={blogPostTitleClass}>{post.title}</h1>
          <p className={blogPostCopyClass}>{post.description}</p>
        </header>

        <dl className={blogPostMetaGridClass}>
          <BlogPostMetaItem label="Autor" value="Bruno Gusmão" />
          <BlogPostMetaItem label="Leitura" value={post.meta[1]} />
          <BlogPostMetaItem label="Categoria" value={post.meta[0]} />
        </dl>

        <BlogPostCover category={post.meta[0]} />

        <p className={blogPostIntroClass}>{post.intro}</p>

        <div className={blogPostBodyClass}>
          {post.sections.map((section, index) => (
            <BlogPostBodySection
              key={section.title}
              slug={post.slug}
              index={index}
              title={section.title}
              paragraphs={section.paragraphs}
            />
          ))}
        </div>

        <section aria-labelledby={`${post.slug}-takeaways`} className="space-y-4">
          <h2 id={`${post.slug}-takeaways`} className={blogPostSectionTitleClass}>
            O que fica
          </h2>

          <ol className={blogPostTakeawaysClass}>
            {post.takeaways.map((takeaway, index) => (
              <li key={takeaway} className={blogPostTakeawayClass}>
                <span className={blogPostTakeawayIndexClass}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className={blogPostTakeawayTextClass}>{takeaway}</p>
              </li>
            ))}
          </ol>
        </section>

        <footer className={blogPostFooterClass}>
          <p className={blogPostFooterCopyClass}>
            Se este texto fizer sentido para o seu contexto, posso transformar a
            ideia em página, sistema ou narrativa mais clara.
          </p>

          <div className={blogPostFooterActionsClass}>
            <PillLink href="/contact" variant="solid">
              Falar comigo
            </PillLink>
            <PillLink
              href="https://www.linkedin.com/in/bruno-mulim/"
              external
              variant="outline"
              aria-label="Abrir o perfil de Bruno Gusmão no LinkedIn"
            >
              LinkedIn
            </PillLink>
          </div>
        </footer>

        <BlogPostTags tags={post.tags} className={blogPostTagsClass} />
      </article>

      <nav aria-label="Navegação entre posts" className={blogPostNavigationRowClass}>
        {previousPost ? (
          <PillLink
            href={`/blog/${previousPost.slug}`}
            variant="outline"
            className="w-full justify-between gap-4 sm:min-w-[16rem] sm:flex-1"
          >
            <span className="shrink-0">Anterior</span>
            <span className="text-left text-foreground">{previousPost.title}</span>
          </PillLink>
        ) : null}

        {nextPost ? (
          <PillLink
            href={`/blog/${nextPost.slug}`}
            variant="outline"
            className="w-full justify-between gap-4 sm:min-w-[16rem] sm:flex-1"
          >
            <span className="shrink-0">Próximo</span>
            <span className="text-left text-foreground">{nextPost.title}</span>
          </PillLink>
        ) : null}
      </nav>
    </main>
  );
}
