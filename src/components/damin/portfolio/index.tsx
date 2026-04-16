export function DashboardPortfolioTab() {
   return (
      <section className='space-y-4'>
         <header className='space-y-2'>
            <p className='text-xs uppercase tracking-[0.18em] text-muted-foreground'>
               Conteudo publico
            </p>
            <h2 className='text-2xl font-semibold'>Portfolio</h2>
            <p className='max-w-2xl text-sm text-muted-foreground'>
               Organize os projetos que alimentam a rota publica /portfolio.
            </p>
         </header>

         <div className='grid gap-4 md:grid-cols-2'>
            <article className='border border-border p-4'>
               <h3 className='font-semibold text-foreground'>
                  Catalogo de projetos
               </h3>
               <p className='mt-2 text-sm text-muted-foreground'>
                  Gerencie os itens exibidos no portfolio publico.
               </p>
               <a
                  href='/dashboard/projects'
                  className='mt-4 inline-flex border border-border px-3 py-2 text-xs uppercase tracking-[0.12em]'
               >
                  Abrir projetos
               </a>
            </article>

            <article className='border border-border p-4'>
               <h3 className='font-semibold text-foreground'>
                  Curadoria de destaque
               </h3>
               <p className='mt-2 text-sm text-muted-foreground'>
                  Defina prioridade visual e ordem dos cases principais.
               </p>
               <a
                  href='/portfolio'
                  className='mt-4 inline-flex border border-border px-3 py-2 text-xs uppercase tracking-[0.12em]'
               >
                  Ver /portfolio publico
               </a>
            </article>
         </div>
      </section>
   );
}
