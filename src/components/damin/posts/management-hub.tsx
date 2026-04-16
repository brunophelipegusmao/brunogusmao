'use client';

import { ArrowLeft } from 'lucide-react';
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
   type PostTagDefinition,
   type PostTagStyle,
   type PostWorkflowStatus,
   postTagLibrary,
} from '@/lib/content/posts-admin';

interface ManagementHubProps {
   posts: DashboardPostSummary[];
}

interface PostRuntimeState {
   status: PostWorkflowStatus;
   isDeleted: boolean;
   tags: string[];
}

type SortKey = 'title' | 'publishedAt' | 'status' | 'action';
type SortDirection = 'asc' | 'desc';

const statusOrder: PostWorkflowStatus[] = [
   'publicado',
   'revisao',
   'em-andamento',
];

function normalize(value: string): string {
   return value.trim().toLowerCase();
}

function tagIdFromLabel(label: string): string {
   return normalize(label)
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
}

function fontStyleClasses(style: PostTagStyle['fontStyle']): string {
   if (style === 'bold') {
      return 'font-semibold';
   }

   if (style === 'italic') {
      return 'italic';
   }

   if (style === 'bold-italic') {
      return 'font-semibold italic';
   }

   return 'font-normal';
}

function buildInitialPostState(posts: DashboardPostSummary[]) {
   return posts.reduce<Record<string, PostRuntimeState>>(
      (accumulator, post) => {
         accumulator[post.slug] = {
            status: post.status,
            isDeleted: false,
            tags: post.tags,
         };

         return accumulator;
      },
      {},
   );
}

export function ManagementHub({ posts }: ManagementHubProps) {
   const [searchTerm, setSearchTerm] = useState('');
   const [statusFilter, setStatusFilter] = useState<
      'todos' | PostWorkflowStatus
   >('todos');
   const [selectedSlug, setSelectedSlug] = useState(posts[0]?.slug ?? '');

   const [postStateBySlug, setPostStateBySlug] = useState(() =>
      buildInitialPostState(posts),
   );

   const [tagLibrary, setTagLibrary] =
      useState<PostTagDefinition[]>(postTagLibrary);

   const [newTagLabel, setNewTagLabel] = useState('');
   const [newTagTextColor, setNewTagTextColor] = useState('#f2f6ff');
   const [newTagBackgroundColor, setNewTagBackgroundColor] =
      useState('#2f5fd0');
   const [newTagFontStyle, setNewTagFontStyle] =
      useState<PostTagStyle['fontStyle']>('bold');
   const [isTagModalOpen, setIsTagModalOpen] = useState(false);
   const [sortKey, setSortKey] = useState<SortKey>('publishedAt');
   const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

   const enrichedPosts = useMemo(() => {
      return posts.map(post => {
         const state = postStateBySlug[post.slug];

         return {
            ...post,
            status: state?.status ?? post.status,
            tags: state?.tags ?? post.tags,
            isDeleted: state?.isDeleted ?? false,
         };
      });
   }, [posts, postStateBySlug]);

   const filteredPosts = useMemo(() => {
      const query = normalize(searchTerm);

      return enrichedPosts.filter(post => {
         const matchesStatus =
            statusFilter === 'todos' || post.status === statusFilter;

         const matchesQuery =
            !query ||
            normalize(post.title).includes(query) ||
            post.tags.some(tag => normalize(tag).includes(query));

         return matchesStatus && matchesQuery;
      });
   }, [enrichedPosts, searchTerm, statusFilter]);

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

   const selectedPost = useMemo(() => {
      return enrichedPosts.find(post => post.slug === selectedSlug) ?? null;
   }, [enrichedPosts, selectedSlug]);

   const selectedTagDefinitions = useMemo(() => {
      if (!selectedPost) {
         return [];
      }

      return selectedPost.tags.map(tag => {
         const definition = tagLibrary.find(item => item.label === tag);

         if (definition) {
            return definition;
         }

         return {
            id: tagIdFromLabel(tag),
            label: tag,
            style: {
               textColor: '#d6e5ff',
               backgroundColor: '#364e8f',
               fontStyle: 'normal' as const,
            },
         };
      });
   }, [selectedPost, tagLibrary]);

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

   const updateSelectedPostState = (
      updater: (current: PostRuntimeState) => PostRuntimeState,
   ) => {
      if (!selectedPost) {
         return;
      }

      setPostStateBySlug(currentState => {
         const current = currentState[selectedPost.slug] ?? {
            status: selectedPost.status,
            isDeleted: selectedPost.isDeleted,
            tags: selectedPost.tags,
         };

         return {
            ...currentState,
            [selectedPost.slug]: updater(current),
         };
      });
   };

   const setSelectedPostStatus = (status: PostWorkflowStatus) => {
      updateSelectedPostState(current => ({ ...current, status }));
   };

   const toggleDeleteState = () => {
      updateSelectedPostState(current => ({
         ...current,
         isDeleted: !current.isDeleted,
      }));
   };

   const toggleTagForSelectedPost = (tagLabel: string) => {
      updateSelectedPostState(current => {
         const hasTag = current.tags.includes(tagLabel);

         if (hasTag) {
            return {
               ...current,
               tags: current.tags.filter(tag => tag !== tagLabel),
            };
         }

         return {
            ...current,
            tags: [...current.tags, tagLabel].sort((left, right) =>
               left.localeCompare(right, 'pt-BR'),
            ),
         };
      });
   };

   const createTag = () => {
      const label = newTagLabel.trim();

      if (!label) {
         return;
      }

      const duplicated = tagLibrary.some(
         candidate => normalize(candidate.label) === normalize(label),
      );

      if (duplicated) {
         return;
      }

      const createdTag: PostTagDefinition = {
         id: tagIdFromLabel(label),
         label,
         style: {
            textColor: newTagTextColor,
            backgroundColor: newTagBackgroundColor,
            fontStyle: newTagFontStyle,
         },
      };

      setTagLibrary(current => [...current, createdTag]);
      setNewTagLabel('');

      updateSelectedPostState(current => ({
         ...current,
         tags: [...current.tags, createdTag.label].sort((left, right) =>
            left.localeCompare(right, 'pt-BR'),
         ),
      }));
   };

   return (
      <main className='min-h-screen px-6 py-16 sm:px-8 md:px-16'>
         <section className='mx-auto grid w-full max-w-7xl gap-6'>
            <header className='grid gap-2 border border-border p-5'>
               <div className='flex flex-wrap items-start justify-between gap-3'>
                  <div className='grid gap-2'>
                     <p className='font-mono text-xs uppercase tracking-[0.2em] text-blue-base'>
                        Gestao de Conteudo
                     </p>
                     <h1 className='font-goldman text-4xl leading-[0.96] text-text-primary'>
                        Gerenciar Posts
                     </h1>
                     <p className='max-w-4xl text-sm text-text-secondary'>
                        Tudo em um unico lugar: lista de posts, publicacao,
                        despublicacao, revisao, exclusao e cadastro de tags com
                        estilo visual.
                     </p>
                  </div>

                  <div className='flex flex-wrap gap-2'>
                     <RippleButton
                        href='/dashboard'
                        aria-label='Voltar para dashboard'
                        className='flex size-10 items-center justify-center p-0'
                     >
                        <ArrowLeft className='size-4' aria-hidden='true' />
                     </RippleButton>
                     <RippleButton
                        onClick={() => setIsTagModalOpen(true)}
                        className='px-3 py-2'
                     >
                        Cadastrar tag
                     </RippleButton>
                  </div>
               </div>
            </header>

            <div className='grid gap-4 border border-border bg-bg-subtle p-5 md:grid-cols-2'>
               <label className='grid gap-2'>
                  <span className='font-mono text-[0.65rem] uppercase tracking-[0.2em] text-blue-base'>
                     Buscar post
                  </span>
                  <input
                     type='text'
                     value={searchTerm}
                     onChange={event => setSearchTerm(event.target.value)}
                     placeholder='Buscar por titulo ou tag'
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
                        setStatusFilter(
                           event.target.value as 'todos' | PostWorkflowStatus,
                        )
                     }
                     className='h-11 border border-border bg-bg px-3 text-sm text-text-primary outline-none transition-colors focus:border-blue-base'
                  >
                     <option value='todos'>Todos</option>
                     {statusOrder.map(status => (
                        <option key={status} value={status}>
                           {getPostStatusLabel(status)}
                        </option>
                     ))}
                  </select>
               </label>
            </div>

            <section className='grid gap-3 border border-border p-5'>
               <header className='flex items-center justify-between border-b border-border pb-2'>
                  <h2 className='font-goldman text-2xl text-text-primary'>
                     Lista de posts
                  </h2>
                  <span className='font-mono text-[0.65rem] uppercase tracking-[0.14em] text-text-muted'>
                     {filteredPosts.length} item(ns)
                  </span>
               </header>

               <Accordion
                  multiple
                  defaultValue={['lista-posts']}
                  className='grid gap-2'
               >
                  <AccordionItem value='lista-posts'>
                     <AccordionHeader>
                        <AccordionTrigger className='border-b border-border bg-bg-subtle'>
                           <div className='flex w-full items-center justify-between gap-2 pr-3'>
                              <h3 className='font-goldman text-xl text-text-primary'>
                                 Todos os posts
                              </h3>
                              <span className='font-mono text-[0.65rem] uppercase tracking-[0.14em] text-text-muted'>
                                 {sortedPosts.length} item(ns)
                              </span>
                           </div>
                        </AccordionTrigger>
                     </AccordionHeader>

                     <AccordionContent>
                        {sortedPosts.length > 0 ? (
                           <div className='max-h-80 overflow-auto p-3'>
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
                                    {sortedPosts.map(post => {
                                       const isActive =
                                          selectedPost?.slug === post.slug;

                                       return (
                                          <tr
                                             key={post.slug}
                                             className={`border-b border-border/70 ${isActive ? 'bg-blue-base/10' : 'bg-transparent'}`}
                                          >
                                             <td className='px-3 py-3 text-sm text-text-primary'>
                                                {post.title}
                                             </td>
                                             <td className='px-3 py-3 text-sm text-text-secondary'>
                                                {post.publishedAt}
                                             </td>
                                             <td className='px-3 py-3 text-sm text-text-secondary'>
                                                {getPostStatusLabel(
                                                   post.status,
                                                )}
                                                {post.isDeleted
                                                   ? ' (deletado)'
                                                   : ''}
                                             </td>
                                             <td className='px-3 py-3 text-right'>
                                                <button
                                                   type='button'
                                                   onClick={() =>
                                                      setSelectedSlug(post.slug)
                                                   }
                                                   className='border border-border px-3 py-2 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-text-primary'
                                                >
                                                   {isActive
                                                      ? 'Selecionado'
                                                      : 'Gerenciar'}
                                                </button>
                                             </td>
                                          </tr>
                                       );
                                    })}
                                 </tbody>
                              </table>
                           </div>
                        ) : (
                           <p className='m-3 border border-dashed border-border p-3 text-sm text-text-muted'>
                              Nenhum post encontrado com os filtros atuais.
                           </p>
                        )}
                     </AccordionContent>
                  </AccordionItem>
               </Accordion>

               {filteredPosts.length === 0 ? (
                  <p className='text-sm text-text-muted'>
                     Nenhum post encontrado com os filtros atuais.
                  </p>
               ) : null}
            </section>

            {selectedPost ? (
               <>
                  <section className='grid gap-3 border border-border p-5'>
                     <header className='grid gap-1'>
                        <h2 className='font-goldman text-2xl text-text-primary'>
                           Acoes do post selecionado
                        </h2>
                        <p className='text-sm text-text-secondary'>
                           {selectedPost.title}
                        </p>
                     </header>

                     <div className='flex flex-wrap gap-2'>
                        <RippleButton
                           onClick={() => setSelectedPostStatus('publicado')}
                           className='px-3 py-2'
                        >
                           Publicar
                        </RippleButton>
                        <RippleButton
                           onClick={() => setSelectedPostStatus('revisao')}
                           className='px-3 py-2'
                        >
                           Colocar em revisao
                        </RippleButton>
                        <RippleButton
                           onClick={() => setSelectedPostStatus('em-andamento')}
                           className='px-3 py-2'
                        >
                           Despublicar
                        </RippleButton>
                        <RippleButton
                           onClick={toggleDeleteState}
                           className='border-danger bg-danger px-3 py-2 text-white'
                        >
                           {selectedPost.isDeleted ? 'Restaurar' : 'Deletar'}
                        </RippleButton>
                     </div>
                  </section>

                  <section className='grid gap-4 border border-border p-5'>
                     <header className='grid gap-1'>
                        <h2 className='font-goldman text-2xl text-text-primary'>
                           Tags do post
                        </h2>
                        <p className='text-sm text-text-secondary'>
                           Personalize tags para uso na area privada e publica.
                        </p>
                     </header>

                     <div className='flex flex-wrap gap-2'>
                        {selectedTagDefinitions.length > 0 ? (
                           selectedTagDefinitions.map(tag => (
                              <span
                                 key={tag.id}
                                 className={`border px-2 py-1 text-xs uppercase tracking-[0.12em] ${fontStyleClasses(tag.style.fontStyle)}`}
                                 style={{
                                    color: tag.style.textColor,
                                    backgroundColor: tag.style.backgroundColor,
                                 }}
                              >
                                 {tag.label}
                              </span>
                           ))
                        ) : (
                           <p className='text-sm text-text-muted'>
                              Nenhuma tag vinculada.
                           </p>
                        )}
                     </div>

                     <div className='grid gap-3 md:grid-cols-2'>
                        {tagLibrary
                           .slice()
                           .sort((left, right) =>
                              left.label.localeCompare(right.label, 'pt-BR'),
                           )
                           .map(tag => {
                              const checked = selectedPost.tags.includes(
                                 tag.label,
                              );

                              return (
                                 <label
                                    key={tag.id}
                                    className='flex items-center justify-between gap-2 border border-border bg-bg-subtle p-3'
                                 >
                                    <span className='text-sm text-text-primary'>
                                       {tag.label}
                                    </span>
                                    <input
                                       type='checkbox'
                                       checked={checked}
                                       onChange={() =>
                                          toggleTagForSelectedPost(tag.label)
                                       }
                                       aria-label={`Selecionar tag ${tag.label}`}
                                    />
                                 </label>
                              );
                           })}
                     </div>
                  </section>
               </>
            ) : (
               <section className='border border-dashed border-border p-5 text-sm text-text-muted'>
                  Selecione um post na lista para gerenciar as funcionalidades.
               </section>
            )}

            <Dialog open={isTagModalOpen} onOpenChange={setIsTagModalOpen}>
               <DialogContent className='max-h-[88vh] w-[94vw] max-w-[94vw] overflow-y-auto rounded-none border border-border-strong bg-bg p-0 md:max-w-4xl'>
                  <DialogHeader className='border-b border-border p-5'>
                     <DialogTitle className='font-goldman text-3xl leading-none tracking-[-0.02em] text-text-primary'>
                        Cadastrar nova tag
                     </DialogTitle>
                     <DialogDescription className='text-sm text-text-secondary'>
                        As opcoes seguem o mesmo padrao de /dashboard/posts para
                        nome, estilo tipografico e cores da tag.
                     </DialogDescription>
                  </DialogHeader>

                  <div className='grid gap-4 p-5'>
                     <div className='grid gap-3 md:grid-cols-2'>
                        <label className='grid gap-2'>
                           <span className='font-mono text-[0.62rem] uppercase tracking-[0.16em] text-blue-base'>
                              Nome da tag
                           </span>
                           <input
                              type='text'
                              value={newTagLabel}
                              onChange={event =>
                                 setNewTagLabel(event.target.value)
                              }
                              placeholder='Ex: Acessibilidade'
                              className='h-11 border border-border bg-bg px-3 text-sm text-text-primary outline-none focus:border-blue-base'
                           />
                        </label>

                        <label className='grid gap-2'>
                           <span className='font-mono text-[0.62rem] uppercase tracking-[0.16em] text-blue-base'>
                              Estilo da fonte
                           </span>
                           <select
                              value={newTagFontStyle}
                              onChange={event =>
                                 setNewTagFontStyle(
                                    event.target
                                       .value as PostTagStyle['fontStyle'],
                                 )
                              }
                              className='h-11 border border-border bg-bg px-3 text-sm text-text-primary outline-none focus:border-blue-base'
                           >
                              <option value='normal'>Normal</option>
                              <option value='bold'>Negrito</option>
                              <option value='italic'>Italico</option>
                              <option value='bold-italic'>
                                 Negrito italico
                              </option>
                           </select>
                        </label>

                        <label className='grid gap-2'>
                           <span className='font-mono text-[0.62rem] uppercase tracking-[0.16em] text-blue-base'>
                              Cor da fonte
                           </span>
                           <input
                              type='color'
                              value={newTagTextColor}
                              onChange={event =>
                                 setNewTagTextColor(event.target.value)
                              }
                              className='h-11 border border-border bg-bg p-2'
                           />
                        </label>

                        <label className='grid gap-2'>
                           <span className='font-mono text-[0.62rem] uppercase tracking-[0.16em] text-blue-base'>
                              Cor de fundo
                           </span>
                           <input
                              type='color'
                              value={newTagBackgroundColor}
                              onChange={event =>
                                 setNewTagBackgroundColor(event.target.value)
                              }
                              className='h-11 border border-border bg-bg p-2'
                           />
                        </label>
                     </div>

                     <div className='flex items-center gap-3'>
                        <RippleButton onClick={createTag} className='px-3 py-2'>
                           Cadastrar tag
                        </RippleButton>
                        <span className='text-xs text-text-muted'>
                           A tag criada fica disponivel para os proximos posts.
                        </span>
                     </div>
                  </div>
               </DialogContent>
            </Dialog>
         </section>
      </main>
   );
}
