'use client';

import { useMemo, useState } from 'react';
import { RippleButton } from '@/components/magicui/ripple-button';
import {
   getDashboardPosts,
   type PostWorkflowStatus,
} from '@/lib/content/posts-admin';
import { ActionCard } from './action-card';
import { PostsLibraryModal } from './posts-library-modal';

export function DashboardPostsTab() {
   const [isLibraryOpen, setIsLibraryOpen] = useState(false);
   const [searchTerm, setSearchTerm] = useState('');
   const [statusFilter, setStatusFilter] = useState<
      'todos' | PostWorkflowStatus
   >('todos');
   const [selectedTag, setSelectedTag] = useState('');

   const posts = useMemo(() => getDashboardPosts(), []);

   return (
      <>
         <section className='space-y-6'>
            <header className='space-y-2'>
               <p className='font-mono text-xs uppercase tracking-[0.2em] text-blue-base'>
                  Conteudo publico
               </p>
               <h2 className='font-goldman text-3xl leading-[0.98] tracking-[-0.01em] text-text-primary'>
                  Posts do Blog
               </h2>
               <p className='max-w-2xl text-sm text-text-secondary'>
                  Gerencie os artigos que alimentam a rota publica /blog.
               </p>
            </header>

            <div className='grid gap-4 md:grid-cols-2'>
               <ActionCard
                  title='Biblioteca de Posts'
                  description='Visualize posts em modal, filtrando por status e tags antes de gerenciar.'
                  onAction={() => setIsLibraryOpen(true)}
                  ctaLabel='Abrir lista'
               />
               <ActionCard
                  title='Criar novo post'
                  description='Inicie um novo artigo com estrutura editorial pronta para publicacao.'
                  href='/dashboard/posts/new'
                  ctaLabel='Novo post'
               />
               <ActionCard
                  title='Gerenciar posts'
                  description='Acesse a pagina de gestao para publicar, despublicar, revisar, deletar e configurar tags.'
                  href='/dashboard/posts'
                  ctaLabel='Gerenciar agora'
                  className='md:col-span-2'
               />
            </div>

            <RippleButton href='/blog' className='w-fit'>
               Ver /blog publico
            </RippleButton>
         </section>

         <PostsLibraryModal
            open={isLibraryOpen}
            onOpenChange={setIsLibraryOpen}
            posts={posts}
            searchTerm={searchTerm}
            statusFilter={statusFilter}
            selectedTag={selectedTag}
            onSearchTermChange={setSearchTerm}
            onStatusFilterChange={setStatusFilter}
            onSelectedTagChange={setSelectedTag}
         />
      </>
   );
}
