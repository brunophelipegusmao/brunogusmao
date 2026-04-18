import {
  getBlogPosts,
  getPostStatusBySlug,
  getPostTagLibrary,
} from "@/lib/api/content.client";

export type PostWorkflowStatus = "publicado" | "revisao" | "em-andamento";

export interface PostTagStyle {
  textColor: string;
  backgroundColor: string;
  fontStyle: "normal" | "bold" | "italic" | "bold-italic";
}

export interface PostTagDefinition {
  id: string;
  label: string;
  style: PostTagStyle;
}

export interface DashboardPostSummary {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  status: PostWorkflowStatus;
  tags: string[];
}

export function getPostStatusLabel(status: PostWorkflowStatus): string {
  if (status === "publicado") {
    return "Publicado";
  }

  if (status === "revisao") {
    return "Revisao";
  }

  return "Em andamento";
}

export function getDashboardPosts(): DashboardPostSummary[] {
  const blogPosts = getBlogPosts();
  const postStatusBySlug = getPostStatusBySlug();

  return blogPosts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    publishedAt: post.publishedAt,
    tags: post.tags,
    status: postStatusBySlug[post.slug] ?? "em-andamento",
  }));
}

export { getPostTagLibrary };
