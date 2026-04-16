'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

import {
   Accordion,
   AccordionContent,
   AccordionHeader,
   AccordionItem,
   AccordionTrigger,
} from '@/components/ui/accordion';
import { RippleButton } from '@/components/magicui/ripple-button';
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
} from '@/components/ui/dialog';
import {
   type DashboardPostSummary,
   getPostStatusLabel,
   type PostWorkflowStatus,
} from '@/lib/content/posts-admin';

const statusOrder: PostWorkflowStatus[] = [
   'publicado',
   'revisao',
   'em-andamento',
];

type SortKey = 'title' | 'publishedAt' | 'status' | 'action';
type SortDirection = 'asc' | 'desc';

interface PostsLibraryModalProps {
   open: boolean;
   onOpenChange: (open: boolean) => void;
   posts: DashboardPostSummary[];
   searchTerm: string;
   statusFilter: 'todos' | PostWorkflowStatus;
   selectedTag: string;
   onSearchTermChange: (value: string) => void;
   onStatusFilterChange: (value: 'todos' | PostWorkflowStatus) => void;
   onSelectedTagChange: (value: string) => void;
}

function normalize(value: string): string {
   return value.trim().toLowerCase();
}

export function PostsLibraryModal({
   open,
   onOpenChange,
   posts,
   searchTerm,
   statusFilter,
   selectedTag,
   onSearchTermChange,
   onStatusFilterChange,
   onSelectedTagChange,
}: PostsLibraryModalProps) {
   const [sortKey, setSortKey] = useState<SortKey>('publishedAt');
   const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

   const uniqueTags = useMemo(() => {
      const allTags = posts.flatMap(post => post.tags);
      return Array.from(new Set(allTags)).sort((left, right) =>
         left.localeCompare(right, 'pt-BR'),
      );
   }, [posts]);

   const filteredPosts = useMemo(() => {
      const query = normalize(searchTerm);

      return posts.filter(post => {
         const matchesStatus =
            statusFilter === 'todos' || post.status === statusFilter;
         const matchesTag = !selectedTag || post.tags.includes(selectedTag);

         const matchesText =
            query.length === 0 ||
            normalize(post.title).includes(query) ||
            normalize(post.excerpt).includes(query) ||
            normalize(post.category).includes(query) ||
            post.tags.some(tag => normalize(tag).includes(query));

         return matchesStatus && matchesTag && matchesText;
      });
   }, [posts, searchTerm, selectedTag, statusFilter]);

   const sortedPosts = useMemo(() => {
      const postsToSort = [...filteredPosts];
      const factor = sortDirection === 'asc' ? 1 : -1;

      postsToSort.sort((left, right) => {
         if (sortKey === 'title') {
            return factor * left.title.localeCompare(right.title, 'pt-BR');
         }

         if (sortKey === 'publishedAt') {
            return (
               factor *
               left.publishedAt.localeCompare(right.publishedAt, 'pt-BR')
            );
         }

         if (sortKey === 'status') {
            return (
               factor *
               getPostStatusLabel(left.status).localeCompare(
                  getPostStatusLabel(right.status),
                  'pt-BR',
               )
            );
         }

         return factor * left.slug.localeCompare(right.slug, 'pt-BR');
      });

      return postsToSort;
   }, [filteredPosts, sortDirection, sortKey]);

   const groupedPosts = useMemo(() => {
      return statusOrder.map(status => ({
         status,
         posts: sortedPosts.filter(post => post.status === status),
      }));
   }, [sortedPosts]);

   const toggleSort = (key: SortKey) => {
      if (sortKey === key) {
         setSortDirection(current => (current === 'asc' ? 'desc' : 'asc'));
         return;
      }

      setSortKey(key);
      setSortDirection('asc');
   };

   const sortIndicator = (key: SortKey) => {
      if (sortKey !== key) {
         return '↕';
      }

      return sortDirection === 'asc' ? '↑' : '↓';
   };

   return (
      <Dialog open={open} onOpenChange={onOpenChange}>
         <DialogContent className='max-h-[90vh] w-[96vw] max-w-[96vw] overflow-y-auto rounded-none border border-border-strong bg-bg p-0 xl:max-w-screen-2xl'>
            <DialogHeader className='border-b border-border p-5'>
               <DialogTitle className='font-goldman text-3xl leading-none tracking-[-0.02em] text-text-primary'>
                  Biblioteca de Posts
               </DialogTitle>
               <DialogDescription className='max-w-2xl text-sm text-text-secondary'>
                  Lista consolidada de posts com filtros por texto, status e
                  tags, separada por etapa do fluxo editorial.
               </DialogDescription>
            </DialogHeader>

            <div className='grid gap-4 border-b border-border bg-bg-subtle p-5 md:grid-cols-3'>
               <label className='grid gap-2'>
                  <span className='font-mono text-[0.65rem] uppercase tracking-[0.2em] text-blue-base'>
                     Buscar
                  </span>
                  <input
                     type='text'
                     value={searchTerm}
                     onChange={event => onSearchTermChange(event.target.value)}
                     placeholder='Titulo, categoria, trecho ou tag'
                     className='h-11 border border-border bg-bg px-3 text-sm text-text-primary outline-none transition-colors focus:border-blue-base'
                  />
               </label>

               <label className='grid gap-2'>
                  <span className='font-mono text-[0.65rem] uppercase tracking-[0.2em] text-blue-base'>
                     Status
                  </span>
                  <select
                     value={statusFilter}
                     onChange={event =>
                        onStatusFilterChange(
                           event.target.value as 'todos' | PostWorkflowStatus,
                        )
                     }
                     className='h-11 border border-border bg-bg px-3 text-sm text-text-primary outline-none transition-colors focus:border-blue-base'
                  >
                     <option value='todos'>Todos</option>
                     <option value='publicado'>Publicado</option>
                     <option value='revisao'>Revisao</option>
                     <option value='em-andamento'>Em andamento</option>
                  </select>
               </label>

               <label className='grid gap-2'>
                  <span className='font-mono text-[0.65rem] uppercase tracking-[0.2em] text-blue-base'>
                     Tag
                  </span>
                  <select
                     value={selectedTag}
                     onChange={event => onSelectedTagChange(event.target.value)}
                     className='h-11 border border-border bg-bg px-3 text-sm text-text-primary outline-none transition-colors focus:border-blue-base'
                  >
                     <option value=''>Todas as tags</option>
                     {uniqueTags.map(tag => (
                        <option key={tag} value={tag}>
                           {tag}
                        </option>
                     ))}
                  </select>
               </label>
            </div>

            <Accordion multiple defaultValue={statusOrder} className='p-5'>
               {groupedPosts.map(group => (
                  <AccordionItem key={group.status} value={group.status}>
                     <AccordionHeader>
                        <AccordionTrigger className='border-b border-border bg-bg-subtle'>
                           <div className='flex w-full items-center justify-between gap-2 pr-3'>
                              <h3 className='font-goldman text-2xl text-text-primary'>
                                 {getPostStatusLabel(group.status)}
                              </h3>
                              <span className='font-mono text-[0.65rem] uppercase tracking-[0.16em] text-text-muted'>
                                 {group.posts.length} item(ns)
                              </span>
                           </div>
                        </AccordionTrigger>
                     </AccordionHeader>

                     <AccordionContent>
                        {group.posts.length > 0 ? (
                           <div className='overflow-x-auto p-4'>
                              <table className='min-w-full border-collapse'>
                                 <thead>
                                    <tr className='border-b border-border'>
                                       <th className='px-3 py-2 text-left font-mono text-[0.62rem] uppercase tracking-[0.14em] text-text-muted'>
                                          <button
                                             type='button'
                                             onClick={() => toggleSort('title')}
                                             className='inline-flex items-center gap-1'
                                          >
                                             Titulo{' '}
                                             <span>
                                                {sortIndicator('title')}
                                             </span>
                                          </button>
                                       </th>
                                       <th className='px-3 py-2 text-left font-mono text-[0.62rem] uppercase tracking-[0.14em] text-text-muted'>
                                          <button
                                             type='button'
                                             onClick={() =>
                                                toggleSort('publishedAt')
                                             }
                                             className='inline-flex items-center gap-1'
                                          >
                                             Data de publicacao{' '}
                                             <span>
                                                {sortIndicator('publishedAt')}
                                             </span>
                                          </button>
                                       </th>
                                       <th className='px-3 py-2 text-left font-mono text-[0.62rem] uppercase tracking-[0.14em] text-text-muted'>
                                          <button
                                             type='button'
                                             onClick={() =>
                                                toggleSort('status')
                                             }
                                             className='inline-flex items-center gap-1'
                                          >
                                             Status{' '}
                                             <span>
                                                {sortIndicator('status')}
                                             </span>
                                          </button>
                                       </th>
                                       <th className='px-3 py-2 text-right font-mono text-[0.62rem] uppercase tracking-[0.14em] text-text-muted'>
                                          <button
                                             type='button'
                                             onClick={() =>
                                                toggleSort('action')
                                             }
                                             className='inline-flex items-center gap-1'
                                          >
                                             Acao{' '}
                                             <span>
                                                {sortIndicator('action')}
                                             </span>
                                          </button>
                                       </th>
                                    </tr>
                                 </thead>
                                 <tbody>
                                    {group.posts.map(post => (
                                       <tr
                                          key={post.slug}
                                          className='border-b border-border/70'
                                       >
                                          <td className='px-3 py-3 text-sm text-text-primary'>
                                             {post.title}
                                          </td>
                                          <td className='px-3 py-3 text-sm text-text-secondary'>
                                             {post.publishedAt}
                                          </td>
                                          <td className='px-3 py-3 text-sm text-text-secondary'>
                                             {getPostStatusLabel(post.status)}
                                          </td>
                                          <td className='px-3 py-3 text-right'>
                                             <RippleButton
                                                href={`/dashboard/posts/${post.slug}/edit`}
                                                className='px-3 py-2'
                                             >
                                                Gerenciar post
                                             </RippleButton>
                                          </td>
                                       </tr>
                                    ))}
                                 </tbody>
                              </table>
                           </div>
                        ) : (
                           <p className='m-4 border border-dashed border-border p-4 text-sm text-text-muted'>
                              Nenhum post encontrado neste status com os filtros
                              atuais.
                           </p>
                        )}
                     </AccordionContent>
                  </AccordionItem>
               ))}
            </Accordion>

            <div className='border-t border-border bg-bg-subtle p-5'>
               <Link
                  href='/dashboard/posts/new'
                  className='font-mono text-xs uppercase tracking-[0.16em] text-blue-base underline underline-offset-4'
               >
                  Criar novo post
               </Link>
            </div>
         </DialogContent>
      </Dialog>
   );
}
