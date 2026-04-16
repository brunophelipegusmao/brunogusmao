import { ActionCard } from '@/components/damin/posts/action-card';

export function DashboardPostsTab() {
   return (
      <section className='space-y-4'>
         <header className='space-y-2'>
            <p className='text-xs uppercase tracking-[0.18em] text-muted-foreground'>
               Conteudo publico
            </p>
            <h2 className='text-2xl font-semibold'>Posts do Blog</h2>
            <p className='max-w-2xl text-sm text-muted-foreground'>
               Gerencie os artigos que alimentam a rota publica /blog.
            </p>
         </header>

         <div className='grid gap-4 md:grid-cols-2'>
            <ActionCard
               title='Biblioteca de Posts'
               description='Visualize, edite e mantenha os artigos ja publicados ou em rascunho.'
               href='/dashboard/posts'
               ctaLabel='Abrir lista'
            />
            <ActionCard
               title='Criar novo post'
               description='Inicie um novo artigo com estrutura editorial pronta para publicacao.'
               href='/dashboard/posts/new'
               ctaLabel='Novo post'
            />
         </div>

         <a
            href='/blog'
            className='inline-flex border border-border px-3 py-2 text-xs uppercase tracking-[0.12em] text-muted-foreground'
         >
            Ver /blog publico
         </a>
      </section>
   );
}
