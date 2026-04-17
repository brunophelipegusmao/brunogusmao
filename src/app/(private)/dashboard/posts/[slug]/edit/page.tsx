import Link from 'next/link';

import { PostManagementPanel } from '@/components/damin/posts/post-management-panel';
import {
   getDashboardPosts,
   getPostTagLibrary,
} from '@/lib/content/posts-admin.server';

interface DashboardEditPostPageProps {
   params: Promise<{
      slug: string;
   }>;
}

export default async function DashboardEditPostPage({
   params,
}: DashboardEditPostPageProps) {
   const { slug } = await params;
   const [posts, postTagLibrary] = await Promise.all([
      getDashboardPosts(),
      getPostTagLibrary(),
   ]);
   const post = posts.find(candidate => candidate.slug === slug);

   if (!post) {
      return (
         <main className='min-h-screen px-6 py-16 sm:px-8 md:px-16'>
            <section className='mx-auto grid max-w-3xl gap-4 border border-border p-6'>
               <h1 className='font-goldman text-3xl text-text-primary'>
                  Post nao encontrado
               </h1>
               <p className='text-sm text-text-secondary'>
                  Nao foi possivel localizar o slug solicitado na base
                  editorial.
               </p>
               <Link
                  href='/dashboard'
                  className='font-mono text-xs uppercase tracking-[0.16em] text-blue-base underline underline-offset-4'
               >
                  Voltar para dashboard
               </Link>
            </section>
         </main>
      );
   }

   return (
      <PostManagementPanel
         post={post}
         allPosts={posts}
         initialTagLibrary={postTagLibrary}
      />
   );
}
