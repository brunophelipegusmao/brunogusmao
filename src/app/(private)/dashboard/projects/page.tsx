import { PortfolioManager } from '@/components/damin/portfolio/portfolio-manager';
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button';

export default function DashboardProjectsPage() {
   return (
      <main className='private-screen private-screen--dashboard px-6 py-16 sm:px-8 md:px-16'>
         <section className='private-shell mx-auto flex max-w-7xl flex-col gap-8'>
            <header className='private-hero flex flex-col gap-4 md:flex-row md:items-end md:justify-between'>
               <div className='space-y-2'>
                  <p className='font-mono text-xs uppercase tracking-[0.22em] text-blue-base'>
                     Area privada
                  </p>
                  <h1 className='font-goldman text-4xl leading-[0.92] tracking-[-0.02em] text-text-primary sm:text-5xl'>
                     Gerenciar Portfolio
                  </h1>
                  <p className='max-w-2xl text-sm text-text-secondary'>
                     Controle os projetos publicados em /portfolio e escolha o
                     case em destaque da pagina publica.
                  </p>
               </div>

               <div className='flex flex-wrap gap-3'>
                  <InteractiveHoverButton href='/dashboard'>
                     Voltar ao Dashboard
                  </InteractiveHoverButton>
               </div>
            </header>

            <PortfolioManager showHeader={false} />
         </section>
      </main>
   );
}
