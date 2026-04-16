import { blogPosts } from "@/app/(public)/blog/posts";
import { NewPostEditor } from "@/components/damin/posts/new-post-editor";

export default function DashboardNewPostPage() {
  const nextIndex = String(blogPosts.length + 1).padStart(2, "0");

  return <NewPostEditor nextIndex={nextIndex} />;
}
