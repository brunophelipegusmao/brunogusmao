export default function DashboardPage() {
   return (
      <main className='min-h-screen px-6 py-16 sm:px-8 md:px-16'>
         <section className='mx-auto flex max-w-4xl flex-col gap-6'>
            <div>
               <p className='text-sm uppercase tracking-[0.18em] text-muted-foreground'>
                  Area privada
               </p>
               <h1 className='text-3xl font-semibold'>Dashboard</h1>
            </div>

            <nav className='flex flex-wrap gap-3 text-sm'>
               <a
                  href='/dashboard/tags'
                  className='border border-border px-3 py-2'
               >
                  Tags
               </a>
               <a
                  href='/dashboard/posts'
                  className='border border-border px-3 py-2'
               >
                  Posts
               </a>
               <a
                  href='/dashboard/projects'
                  className='border border-border px-3 py-2'
               >
                  Projetos
               </a>
               <a
                  href='/dashboard/kaban'
                  className='border border-border px-3 py-2'
               >
                  Kaban
               </a>
            </nav>

            <form action='/api/auth/logout' method='post'>
               <button
                  type='submit'
                  className='w-fit border border-border px-4 py-2 text-sm uppercase tracking-[0.14em]'
               >
                  Sair
               </button>
            </form>
         </section>
      </main>
   );
}
