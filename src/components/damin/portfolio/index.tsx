import { RippleButton } from '@/components/magicui/ripple-button';

export function DashboardPortfolioTab() {
   return (
      <section className='space-y-6'>
         <header className='space-y-2'>
            <p className='font-mono text-xs uppercase tracking-[0.2em] text-blue-base'>
               Conteudo publico
            </p>
            <h2 className='font-goldman text-3xl leading-[0.98] tracking-[-0.01em] text-text-primary'>
               Portfolio
            </h2>
            <p className='max-w-2xl text-sm text-text-secondary'>
               Organize os projetos que alimentam a rota publica /portfolio.
            </p>
         </header>

         <div className='grid gap-4 md:grid-cols-2'>
            <article className='border border-border bg-bg-subtle p-4'>
               <h3 className='font-goldman text-xl leading-tight text-text-primary'>
                  Catalogo de projetos
               </h3>
               <p className='mt-2 text-sm text-text-secondary'>
                  Gerencie os itens exibidos no portfolio publico.
               </p>
               <RippleButton href='/dashboard/projects' className='mt-4'>
                  Abrir projetos
               </RippleButton>
            </article>

            <article className='border border-border bg-bg-subtle p-4'>
               <h3 className='font-goldman text-xl leading-tight text-text-primary'>
                  Curadoria de destaque
               </h3>
               <p className='mt-2 text-sm text-text-secondary'>
                  Defina prioridade visual e ordem dos cases principais.
               </p>
               <RippleButton href='/portfolio' className='mt-4'>
                  Ver /portfolio publico
               </RippleButton>
            </article>
         </div>
      </section>
   );
}
