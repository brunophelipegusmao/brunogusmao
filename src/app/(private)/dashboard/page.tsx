import { DashboardTabs } from '@/components/damin/dashboard/tabs';

export default function DashboardPage() {
   return (
      <main className='min-h-screen px-6 py-16 sm:px-8 md:px-16'>
         <section className='mx-auto flex max-w-5xl flex-col gap-8'>
            <header className='flex flex-col gap-4 border border-border p-5 md:flex-row md:items-end md:justify-between'>
               <div className='space-y-2'>
                  <p className='text-xs uppercase tracking-[0.18em] text-muted-foreground'>
                     Area privada
                  </p>
                  <h1 className='text-3xl font-semibold'>Painel de Conteudo</h1>
                  <p className='text-sm text-muted-foreground'>
                     Controle editorial das rotas publicas /blog e /portfolio.
                  </p>
               </div>

               <div className='flex flex-wrap gap-3'>
                  <a
                     href='/kaban'
                     className='border border-border px-3 py-2 text-sm'
                  >
                     Ir para Kaban
                  </a>

                  <form action='/api/auth/logout' method='post'>
                     <button
                        type='submit'
                        className='border border-border px-3 py-2 text-sm uppercase tracking-[0.12em]'
                     >
                        Sair
                     </button>
                  </form>
               </div>
            </header>

            <DashboardTabs />
         </section>
      </main>
   );
}
