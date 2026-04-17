import 'server-only';

import {
   getBlogPosts,
   getPostStatusBySlug,
   getPostTagLibrary as getServerPostTagLibrary,
} from '@/lib/api/content.server';

import type { DashboardPostSummary } from '@/lib/content/posts-admin';

export async function getDashboardPosts(): Promise<DashboardPostSummary[]> {
   const posts = await getBlogPosts();
   const postStatusBySlug = await getPostStatusBySlug();

   return posts.map(post => ({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      category: post.category,
      publishedAt: post.publishedAt,
      tags: post.tags,
      status: postStatusBySlug[post.slug] ?? 'em-andamento',
   }));
}

export async function getPostTagLibrary() {
   return getServerPostTagLibrary();
}
