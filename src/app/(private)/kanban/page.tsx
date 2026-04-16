import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button';

export default function KanbanPage() {
   return (
      <main className='private-screen private-screen--kanban px-6 py-16 sm:px-8 md:px-16'>
         <section className='private-shell mx-auto flex max-w-5xl flex-col gap-6'>
            <p className='font-mono text-xs uppercase tracking-[0.22em] text-blue-base'>
               Area privada
            </p>
            <h1 className='font-goldman text-4xl leading-[0.94] tracking-[-0.02em] text-text-primary sm:text-5xl'>
               Kanban
            </h1>
            <p className='max-w-2xl text-sm text-text-secondary'>
               Placeholder inicial para organizacao de tarefas.
            </p>

            <nav className='flex flex-wrap gap-3 text-sm'>
               <InteractiveHoverButton href='/dashboard'>
                  Ir para Dashboard
               </InteractiveHoverButton>
            </nav>
         </section>
      </main>
   );
}
