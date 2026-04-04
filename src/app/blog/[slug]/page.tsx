import type { Metadata } from "next";
import { notFound } from "next/navigation";

import BlogPostPage from "@/components/blog/blog-post-page";
import {
  getBlogPostBySlug,
  getBlogPostNavigation,
  getBlogPostSlugs,
} from "../content";

type BlogPostRouteProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  return getBlogPostSlugs();
}

export async function generateMetadata({
  params,
}: BlogPostRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Post",
      description: "Post do blog.",
    };
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostRoute({ params }: BlogPostRouteProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const navigation = getBlogPostNavigation(slug);

  return (
    <BlogPostPage
      post={post}
      previousPost={navigation?.previousPost ?? null}
      nextPost={navigation?.nextPost ?? null}
    />
  );
}
