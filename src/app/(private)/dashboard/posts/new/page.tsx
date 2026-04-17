import { NewPostEditor } from '@/components/damin/posts/new-post-editor';
import { getBlogPosts } from '@/lib/api/content.server';

export default async function DashboardNewPostPage() {
   const blogPosts = await getBlogPosts();
   const nextIndex = String(blogPosts.length + 1).padStart(2, '0');

   return <NewPostEditor nextIndex={nextIndex} />;
}
