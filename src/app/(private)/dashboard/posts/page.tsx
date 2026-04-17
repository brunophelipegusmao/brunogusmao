import { getDashboardPosts } from '@/lib/content/posts-admin.server';
import { ManagementHub } from '../../../../components/damin/posts/management-hub';

export default async function DashboardPostsPage() {
   const posts = await getDashboardPosts();

   return <ManagementHub posts={posts} />;
}
