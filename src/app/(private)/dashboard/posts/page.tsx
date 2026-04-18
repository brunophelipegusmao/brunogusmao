import { getDashboardPosts } from "@/lib/content/posts-admin.server";
import { ManagementHub } from "../../../../components/admin/posts/management-hub";

export default async function DashboardPostsPage() {
  const posts = await getDashboardPosts();

  return <ManagementHub posts={posts} />;
}
