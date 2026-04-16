export default function KabanPage() {
   return (
      <main className='min-h-screen px-6 py-16 sm:px-8 md:px-16'>
         <section className='mx-auto flex max-w-4xl flex-col gap-4'>
            <h1 className='text-3xl font-semibold'>Kaban</h1>
            <p className='text-sm text-muted-foreground'>
               Placeholder inicial para organizacao de tarefas.
            </p>

            <nav className='flex flex-wrap gap-3 text-sm'>
               <a href='/dashboard' className='border border-border px-3 py-2'>
                  Ir para Dashboard
               </a>
            </nav>
         </section>
      </main>
   );
}
