import { KanbanBoard } from '@/components/damin/kanban/kanban-board';
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button';

export default function KanbanPage() {
   return (
      <main className='private-screen private-screen--kanban px-6 py-16 sm:px-8 md:px-16'>
         <section className='private-shell mx-auto flex max-w-7xl flex-col gap-8'>
            <header className='private-hero flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between'>
               <div className='space-y-2'>
                  <p className='font-mono text-xs uppercase tracking-[0.22em] text-blue-base'>
                     Area privada
                  </p>
                  <h1 className='font-goldman text-4xl leading-[0.92] tracking-[-0.02em] text-text-primary sm:text-5xl'>
                     Kanban Editorial
                  </h1>
                  <p className='max-w-2xl text-sm text-text-secondary'>
                     Organize tarefas com fluxo visual, limites WIP e drag and
                     drop entre colunas.
                  </p>
               </div>

               <nav className='flex flex-wrap gap-3 text-sm'>
                  <InteractiveHoverButton href='/dashboard'>
                     Ir para Dashboard
                  </InteractiveHoverButton>
               </nav>
            </header>

            <KanbanBoard />
         </section>
      </main>
   );
}
