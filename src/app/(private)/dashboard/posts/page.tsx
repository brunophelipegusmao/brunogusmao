import { getDashboardPosts } from '@/lib/content/posts-admin';
import { ManagementHub } from '../../../../components/damin/posts/management-hub';

export default function DashboardPostsPage() {
   const posts = getDashboardPosts();

   return <ManagementHub posts={posts} />;
}
