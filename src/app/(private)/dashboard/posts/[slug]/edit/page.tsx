interface DashboardEditPostPageProps {
   params: Promise<{
      slug: string;
   }>;
}

export default async function DashboardEditPostPage({
   params,
}: DashboardEditPostPageProps) {
   const { slug } = await params;

   return (
      <main className='min-h-screen px-6 py-16 sm:px-8 md:px-16'>
         <section className='mx-auto flex max-w-4xl flex-col gap-4'>
            <h1 className='text-3xl font-semibold'>Editar post</h1>
            <p className='text-sm text-muted-foreground'>Slug: {slug}</p>
         </section>
      </main>
   );
}
