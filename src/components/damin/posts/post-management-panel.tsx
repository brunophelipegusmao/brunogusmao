'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

import { RippleButton } from '@/components/magicui/ripple-button';
import {
   type DashboardPostSummary,
   getPostStatusLabel,
   type PostTagDefinition,
   type PostTagStyle,
   type PostWorkflowStatus,
} from '@/lib/content/posts-admin';

interface PostManagementPanelProps {
   post: DashboardPostSummary;
   allPosts: DashboardPostSummary[];
   initialTagLibrary: PostTagDefinition[];
}

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

export function PostManagementPanel({
   post,
   allPosts,
   initialTagLibrary,
}: PostManagementPanelProps) {
   const [status, setStatus] = useState<PostWorkflowStatus>(post.status);
   const [isDeleted, setIsDeleted] = useState(false);
   const [tagLibrary, setTagLibrary] =
      useState<PostTagDefinition[]>(initialTagLibrary);
   const [selectedTags, setSelectedTags] = useState<string[]>(post.tags);

   const [newTagLabel, setNewTagLabel] = useState('');
   const [newTagTextColor, setNewTagTextColor] = useState('#f2f6ff');
   const [newTagBackgroundColor, setNewTagBackgroundColor] =
      useState('#2f5fd0');
   const [newTagFontStyle, setNewTagFontStyle] =
      useState<PostTagStyle['fontStyle']>('bold');

   const [tagSearch, setTagSearch] = useState('');

   const selectedTagDefinitions = useMemo(() => {
      return selectedTags
         .map(
            tag =>
               tagLibrary.find(libraryTag => libraryTag.label === tag) ?? {
                  id: tagIdFromLabel(tag),
                  label: tag,
                  style: {
                     textColor: '#d6e5ff',
                     backgroundColor: '#364e8f',
                     fontStyle: 'normal' as const,
                  },
               },
         )
         .sort((left, right) => left.label.localeCompare(right.label, 'pt-BR'));
   }, [selectedTags, tagLibrary]);

   const privateAndPublicSearchResults = useMemo(() => {
      const query = normalize(tagSearch);

      if (!query) {
         return [];
      }

      return allPosts.filter(candidate => {
         const inTitle = normalize(candidate.title).includes(query);
         const inTags = candidate.tags.some(tag =>
            normalize(tag).includes(query),
         );
         return inTitle || inTags;
      });
   }, [allPosts, tagSearch]);

   const toggleTag = (tagLabel: string) => {
      setSelectedTags(currentTags => {
         if (currentTags.includes(tagLabel)) {
            return currentTags.filter(tag => tag !== tagLabel);
         }

         return [...currentTags, tagLabel].sort((left, right) =>
            left.localeCompare(right, 'pt-BR'),
         );
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

      setTagLibrary(currentTags => [...currentTags, createdTag]);
      setSelectedTags(currentTags =>
         [...currentTags, createdTag.label].sort((left, right) =>
            left.localeCompare(right, 'pt-BR'),
         ),
      );
      setNewTagLabel('');
   };

   return (
      <main className='min-h-screen bg-bg px-6 py-14 sm:px-8 md:px-16'>
         <section className='mx-auto grid w-full max-w-6xl gap-8'>
            <header className='grid gap-3 border border-border p-5'>
               <p className='font-mono text-[0.65rem] uppercase tracking-[0.2em] text-blue-base'>
                  Gestao editorial
               </p>
               <h1 className='font-goldman text-3xl leading-[0.98] text-text-primary'>
                  {post.title}
               </h1>
               <p className='max-w-3xl text-sm text-text-secondary'>
                  {post.excerpt}
               </p>

               <div className='flex flex-wrap items-center gap-3 text-xs text-text-muted'>
                  <span>Status atual: {getPostStatusLabel(status)}</span>
                  <span>Slug: {post.slug}</span>
                  {isDeleted ? (
                     <span className='text-danger'>Marcado para exclusao</span>
                  ) : null}
               </div>

               <div className='flex flex-wrap gap-2'>
                  <RippleButton
                     onClick={() => setStatus('publicado')}
                     className='px-3 py-2'
                  >
                     Publicar
                  </RippleButton>
                  <RippleButton
                     onClick={() => setStatus('revisao')}
                     className='px-3 py-2'
                  >
                     Enviar para revisao
                  </RippleButton>
                  <RippleButton
                     onClick={() => setStatus('em-andamento')}
                     className='px-3 py-2'
                  >
                     Despublicar
                  </RippleButton>
                  <RippleButton
                     onClick={() => setIsDeleted(value => !value)}
                     className='border-danger bg-danger px-3 py-2 text-white'
                  >
                     {isDeleted ? 'Restaurar' : 'Deletar'}
                  </RippleButton>
               </div>
            </header>

            <section className='grid gap-5 border border-border p-5'>
               <header className='grid gap-1'>
                  <h2 className='font-goldman text-2xl text-text-primary'>
                     Tags do post
                  </h2>
                  <p className='text-sm text-text-secondary'>
                     Defina tags para busca em area privada e area publica do
                     blog.
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
                        Nenhuma tag selecionada.
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
                        const checked = selectedTags.includes(tag.label);

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
                                 onChange={() => toggleTag(tag.label)}
                                 aria-label={`Selecionar tag ${tag.label}`}
                              />
                           </label>
                        );
                     })}
               </div>
            </section>

            <section className='grid gap-4 border border-border p-5'>
               <header className='grid gap-1'>
                  <h2 className='font-goldman text-2xl text-text-primary'>
                     Cadastro de nova tag
                  </h2>
                  <p className='text-sm text-text-secondary'>
                     Personalize cor de fonte, estilo tipografico e cor de
                     fundo.
                  </p>
               </header>

               <div className='grid gap-3 md:grid-cols-2'>
                  <label className='grid gap-2'>
                     <span className='font-mono text-[0.62rem] uppercase tracking-[0.16em] text-blue-base'>
                        Nome da tag
                     </span>
                     <input
                        type='text'
                        value={newTagLabel}
                        onChange={event => setNewTagLabel(event.target.value)}
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
                              event.target.value as PostTagStyle['fontStyle'],
                           )
                        }
                        className='h-11 border border-border bg-bg px-3 text-sm text-text-primary outline-none focus:border-blue-base'
                     >
                        <option value='normal'>Normal</option>
                        <option value='bold'>Negrito</option>
                        <option value='italic'>Italico</option>
                        <option value='bold-italic'>Negrito italico</option>
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
                     Tags criadas aqui ficam prontas para uso na busca.
                  </span>
               </div>
            </section>

            <section className='grid gap-4 border border-border p-5'>
               <header className='grid gap-1'>
                  <h2 className='font-goldman text-2xl text-text-primary'>
                     Busca por tags (privado e publico)
                  </h2>
                  <p className='text-sm text-text-secondary'>
                     Simulacao de pesquisa usando os metadados de tags aplicados
                     aos posts.
                  </p>
               </header>

               <label className='grid gap-2'>
                  <span className='font-mono text-[0.62rem] uppercase tracking-[0.16em] text-blue-base'>
                     Pesquisar
                  </span>
                  <input
                     type='text'
                     value={tagSearch}
                     onChange={event => setTagSearch(event.target.value)}
                     placeholder='Ex: react'
                     className='h-11 border border-border bg-bg px-3 text-sm text-text-primary outline-none focus:border-blue-base'
                  />
               </label>

               {tagSearch ? (
                  <div className='grid gap-2'>
                     <p className='text-sm text-text-muted'>
                        {privateAndPublicSearchResults.length} resultado(s)
                        encontrado(s)
                     </p>
                     {privateAndPublicSearchResults.map(result => (
                        <Link
                           key={result.slug}
                           href={`/dashboard/posts/${result.slug}/edit`}
                           className='border border-border bg-bg-subtle px-3 py-2 text-sm text-text-primary'
                        >
                           {result.title}
                        </Link>
                     ))}
                  </div>
               ) : (
                  <p className='text-sm text-text-muted'>
                     Digite uma tag para visualizar os resultados.
                  </p>
               )}
            </section>
         </section>
      </main>
   );
}
