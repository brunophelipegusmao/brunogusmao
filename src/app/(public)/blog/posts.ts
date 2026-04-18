export interface BlogImageAsset {
  src: string;
  alt: string;
  caption?: string;
}

export type BlogSectionBlock =
  | {
      type: "paragraph";
      content: string;
    }
  | {
      type: "image";
      image: BlogImageAsset;
    };

export interface BlogSection {
  heading: string;
  paragraphs?: string[];
  image?: BlogImageAsset;
  blocks?: BlogSectionBlock[];
}

export interface BlogPost {
  slug: string;
  index: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readingTime?: string;
  category: string;
  tags: string[];
  coverImage?: Omit<BlogImageAsset, "caption">;
  sections: BlogSection[];
}

export const DEFAULT_BLOG_COVER_IMAGE: Omit<BlogImageAsset, "caption"> = {
  src: "/blog/default-cover.svg",
  alt: "Capa editorial padrao do blog de Bruno Gusmao.",
};

export function getPostCoverImage(
  post: Pick<BlogPost, "coverImage">,
): Omit<BlogImageAsset, "caption"> {
  return post.coverImage ?? DEFAULT_BLOG_COVER_IMAGE;
}

export function getBlogSectionBlocks(section: BlogSection): BlogSectionBlock[] {
  if (section.blocks && section.blocks.length > 0) {
    return section.blocks;
  }

  const blocks: BlogSectionBlock[] = [];

  if (section.image) {
    blocks.push({
      type: "image",
      image: section.image,
    });
  }

  for (const paragraph of section.paragraphs ?? []) {
    blocks.push({
      type: "paragraph",
      content: paragraph,
    });
  }

  return blocks;
}

export function isOptimizedBlogImageSource(src: string): boolean {
  return (
    src.startsWith("/") || src.startsWith("https://bmcorelayer.vercel.app")
  );
}

export { blogPosts } from "@/mock";
