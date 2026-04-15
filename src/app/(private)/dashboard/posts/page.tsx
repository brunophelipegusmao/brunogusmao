export default function DashboardPostsPage() {
   return (
      <main className='min-h-screen px-6 py-16 sm:px-8 md:px-16'>
         <section className='mx-auto flex max-w-4xl flex-col gap-4'>
            <h1 className='text-3xl font-semibold'>Administrar posts</h1>
            <div className='flex gap-3 text-sm'>
               <a
                  href='/dashboard/posts/new'
                  className='border border-border px-3 py-2'
               >
                  Novo post
               </a>
            </div>
         </section>
      </main>
   );
}
