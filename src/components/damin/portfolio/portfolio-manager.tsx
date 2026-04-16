'use client';

import { useMemo, useState } from 'react';
import { RippleButton } from '@/components/magicui/ripple-button';
import { cn } from '@/lib/utils';

interface PortfolioProject {
   id: string;
   title: string;
   description: string;
   stack: string[];
   image: string;
   live: string;
   repo: string;
   featured: boolean;
}

interface PortfolioProjectFormState {
   title: string;
   description: string;
   stack: string;
   image: string;
   live: string;
   repo: string;
}

interface PortfolioManagerProps {
   showHeader?: boolean;
}

const initialProjects: PortfolioProject[] = [
   {
      id: 'jm-store',
      title: 'JM Store',
      description:
         'Loja online com catalogo de 500+ produtos, carrinho, avaliacoes e checkout orientado a conversao.',
      stack: [
         'Next.js 15',
         'PostgreSQL',
         'Drizzle ORM',
         'Auth.js',
         'Shadcn/ui',
      ],
      image: 'https://bmcorelayer.vercel.app/_next/image?url=%2FChatGPT%20Image%2012%20de%20nov.%20de%202025%2C%2009_34_50.png&w=1920&q=75',
      live: 'https://ecommerce-jm.vercel.app/',
      repo: 'https://github.com/brunophelipegusmao/ecommerce-jm',
      featured: true,
   },
   {
      id: 'chronos-pomodoro',
      title: 'Chronos Pomodoro',
      description:
         'Tecnica Pomodoro com controle de ciclos, historico de sessoes e navegacao SPA para foco diario.',
      stack: ['React 19', 'TypeScript', 'Vite 7', 'React Router 7', 'date-fns'],
      image: 'https://bmcorelayer.vercel.app/_next/image?url=%2Fcovers%2Fchronos-pomodoro-og.png&w=1920&q=75',
      live: 'https://chronospomodoro.vercel.app/',
      repo: 'https://github.com/brunophelipegusmao/chronos-pomodoro',
      featured: false,
   },
   {
      id: 'aura-frontend',
      title: 'Aura Frontend',
      description:
         'Frontend moderno com transicoes de pagina e experiencia responsiva em stack React/Next.',
      stack: ['Next.js 16', 'MUI 7', 'Tailwind CSS 4', 'Framer Motion', 'Swup'],
      image: 'https://bmcorelayer.vercel.app/_next/image?url=%2Fcovers%2Faura-frontend-og.png&w=1920&q=75',
      live: 'https://aura-frontend-lovat.vercel.app',
      repo: 'https://github.com/brunophelipegusmao/aura-frontend',
      featured: false,
   },
];

const initialFormState: PortfolioProjectFormState = {
   title: '',
   description: '',
   stack: '',
   image: '',
   live: '',
   repo: '',
};

function parseStack(value: string) {
   return value
      .split(',')
      .map(tech => tech.trim())
      .filter(Boolean);
}

function createProjectId() {
   if (
      typeof crypto !== 'undefined' &&
      typeof crypto.randomUUID === 'function'
   ) {
      return crypto.randomUUID();
   }

   return `project-${Date.now()}`;
}

export function PortfolioManager({ showHeader = true }: PortfolioManagerProps) {
   const [projects, setProjects] =
      useState<PortfolioProject[]>(initialProjects);
   const [form, setForm] =
      useState<PortfolioProjectFormState>(initialFormState);
   const [editingId, setEditingId] = useState<string | null>(null);

   const sortedProjects = useMemo(
      () =>
         [...projects].sort((a, b) => Number(b.featured) - Number(a.featured)),
      [projects],
   );

   function resetForm() {
      setForm(initialFormState);
      setEditingId(null);
   }

   function handleChange(
      field: keyof PortfolioProjectFormState,
      value: string,
   ) {
      setForm(current => ({
         ...current,
         [field]: value,
      }));
   }

   function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();

      const payload = {
         title: form.title.trim(),
         description: form.description.trim(),
         stack: parseStack(form.stack),
         image: form.image.trim(),
         live: form.live.trim(),
         repo: form.repo.trim(),
      };

      if (!payload.title || !payload.description || !payload.repo) {
         return;
      }

      if (editingId) {
         setProjects(current =>
            current.map(project =>
               project.id === editingId ? { ...project, ...payload } : project,
            ),
         );
         resetForm();
         return;
      }

      setProjects(current => [
         {
            id: createProjectId(),
            ...payload,
            featured: current.length === 0,
         },
         ...current,
      ]);
      resetForm();
   }

   function handleEdit(project: PortfolioProject) {
      setEditingId(project.id);
      setForm({
         title: project.title,
         description: project.description,
         stack: project.stack.join(', '),
         image: project.image,
         live: project.live,
         repo: project.repo,
      });
   }

   function handleDelete(projectId: string) {
      setProjects(current => {
         const wasFeatured = current.some(
            project => project.id === projectId && project.featured,
         );
         const next = current.filter(project => project.id !== projectId);

         if (!wasFeatured || next.length === 0) {
            return next;
         }

         return next.map((project, index) => ({
            ...project,
            featured: index === 0,
         }));
      });

      if (editingId === projectId) {
         resetForm();
      }
   }

   function handleFeature(projectId: string) {
      setProjects(current =>
         current.map(project => ({
            ...project,
            featured: project.id === projectId,
         })),
      );
   }

   return (
      <section className='space-y-6'>
         {showHeader ? (
            <header className='space-y-2'>
               <p className='font-mono text-xs uppercase tracking-[0.2em] text-blue-base'>
                  Conteudo publico
               </p>
               <h2 className='font-goldman text-3xl leading-[0.98] tracking-[-0.01em] text-text-primary'>
                  Portfolio
               </h2>
               <p className='max-w-3xl text-sm text-text-secondary'>
                  Gerencie os projetos da rota publica /portfolio em um unico
                  fluxo: adicionar, editar, remover e escolher o destaque.
               </p>
            </header>
         ) : null}

         <div className='border border-border bg-bg-subtle p-4 sm:p-5'>
            <form className='grid gap-4' onSubmit={handleSubmit}>
               <div className='grid gap-4 lg:grid-cols-2'>
                  <label className='space-y-2'>
                     <span className='font-mono text-xs uppercase tracking-[0.15em] text-text-muted'>
                        Titulo
                     </span>
                     <input
                        required
                        value={form.title}
                        onChange={event =>
                           handleChange('title', event.target.value)
                        }
                        className='w-full border border-border-strong bg-bg px-3 py-2 text-sm text-text-primary outline-none transition-colors focus:border-blue-base'
                        placeholder='Ex: Dashboard Comercial'
                     />
                  </label>

                  <label className='space-y-2'>
                     <span className='font-mono text-xs uppercase tracking-[0.15em] text-text-muted'>
                        Stack (separada por virgula)
                     </span>
                     <input
                        value={form.stack}
                        onChange={event =>
                           handleChange('stack', event.target.value)
                        }
                        className='w-full border border-border-strong bg-bg px-3 py-2 text-sm text-text-primary outline-none transition-colors focus:border-blue-base'
                        placeholder='Next.js, TypeScript, Tailwind CSS'
                     />
                  </label>
               </div>

               <label className='space-y-2'>
                  <span className='font-mono text-xs uppercase tracking-[0.15em] text-text-muted'>
                     Descricao
                  </span>
                  <textarea
                     required
                     value={form.description}
                     onChange={event =>
                        handleChange('description', event.target.value)
                     }
                     rows={3}
                     className='w-full resize-y border border-border-strong bg-bg px-3 py-2 text-sm text-text-primary outline-none transition-colors focus:border-blue-base'
                     placeholder='Resumo curto para exibir no portfolio publico'
                  />
               </label>

               <div className='grid gap-4 lg:grid-cols-3'>
                  <label className='space-y-2'>
                     <span className='font-mono text-xs uppercase tracking-[0.15em] text-text-muted'>
                        URL da imagem
                     </span>
                     <input
                        value={form.image}
                        onChange={event =>
                           handleChange('image', event.target.value)
                        }
                        className='w-full border border-border-strong bg-bg px-3 py-2 text-sm text-text-primary outline-none transition-colors focus:border-blue-base'
                        placeholder='https://...'
                     />
                  </label>

                  <label className='space-y-2'>
                     <span className='font-mono text-xs uppercase tracking-[0.15em] text-text-muted'>
                        URL do projeto
                     </span>
                     <input
                        value={form.live}
                        onChange={event =>
                           handleChange('live', event.target.value)
                        }
                        className='w-full border border-border-strong bg-bg px-3 py-2 text-sm text-text-primary outline-none transition-colors focus:border-blue-base'
                        placeholder='https://meu-projeto.com'
                     />
                  </label>

                  <label className='space-y-2'>
                     <span className='font-mono text-xs uppercase tracking-[0.15em] text-text-muted'>
                        URL do repositorio
                     </span>
                     <input
                        required
                        value={form.repo}
                        onChange={event =>
                           handleChange('repo', event.target.value)
                        }
                        className='w-full border border-border-strong bg-bg px-3 py-2 text-sm text-text-primary outline-none transition-colors focus:border-blue-base'
                        placeholder='https://github.com/...'
                     />
                  </label>
               </div>

               <div className='flex flex-wrap items-center gap-3 pt-1'>
                  <RippleButton type='submit'>
                     {editingId ? 'Salvar alteracoes' : 'Adicionar projeto'}
                  </RippleButton>

                  {editingId ? (
                     <button
                        type='button'
                        className='border border-border-strong bg-bg px-3 py-2 font-mono text-xs uppercase tracking-[0.14em] text-text-secondary transition-colors hover:border-blue-base hover:text-text-primary'
                        onClick={resetForm}
                     >
                        Cancelar edicao
                     </button>
                  ) : null}

                  <RippleButton href='/portfolio' className='w-fit'>
                     Ver /portfolio publico
                  </RippleButton>
               </div>
            </form>
         </div>

         <section className='border border-border bg-bg-subtle p-4 sm:p-5'>
            <header className='mb-4 flex flex-wrap items-end justify-between gap-2'>
               <div>
                  <h3 className='font-goldman text-2xl leading-none text-text-primary'>
                     Projetos cadastrados
                  </h3>
                  <p className='mt-2 font-mono text-xs uppercase tracking-[0.14em] text-text-muted'>
                     {projects.length} item(ns) no portfolio
                  </p>
               </div>
            </header>

            <ul className='space-y-3'>
               {sortedProjects.map((project, index) => (
                  <li
                     key={project.id}
                     className={cn(
                        'border border-border bg-bg px-4 py-4 transition-colors',
                        project.featured
                           ? 'border-blue-base/70 bg-blue-subtle/10'
                           : 'hover:border-border-strong',
                     )}
                  >
                     <div className='flex flex-wrap items-start justify-between gap-3'>
                        <div className='space-y-2'>
                           <div className='flex flex-wrap items-center gap-2'>
                              <span className='font-mono text-xs uppercase tracking-[0.15em] text-blue-base'>
                                 {String(index + 1).padStart(2, '0')}
                              </span>
                              <h4 className='font-goldman text-xl leading-tight text-text-primary'>
                                 {project.title}
                              </h4>
                              {project.featured ? (
                                 <span className='border border-blue-base/70 bg-blue-subtle px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-blue-dark'>
                                    Destaque
                                 </span>
                              ) : null}
                           </div>

                           <p className='max-w-3xl text-sm text-text-secondary'>
                              {project.description}
                           </p>

                           <ul className='flex flex-wrap gap-2'>
                              {project.stack.map(tech => (
                                 <li
                                    key={`${project.id}-${tech}`}
                                    className='border border-border bg-bg-subtle px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted'
                                 >
                                    {tech}
                                 </li>
                              ))}
                           </ul>

                           <div className='flex flex-wrap gap-3 text-xs text-text-secondary'>
                              {project.live ? (
                                 <a
                                    href={project.live}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='font-mono uppercase tracking-[0.14em] text-blue-base hover:text-blue-hover'
                                 >
                                    Projeto ao vivo ↗
                                 </a>
                              ) : null}
                              <a
                                 href={project.repo}
                                 target='_blank'
                                 rel='noopener noreferrer'
                                 className='font-mono uppercase tracking-[0.14em] text-text-secondary hover:text-text-primary'
                              >
                                 Repositorio ↗
                              </a>
                           </div>
                        </div>

                        <div className='flex flex-wrap items-center gap-2'>
                           <button
                              type='button'
                              onClick={() => handleFeature(project.id)}
                              className={cn(
                                 'border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors',
                                 project.featured
                                    ? 'border-blue-base bg-blue-base text-text-on-accent'
                                    : 'border-border-strong bg-bg text-text-secondary hover:border-blue-base hover:text-text-primary',
                              )}
                           >
                              {project.featured ? 'Em destaque' : 'Destacar'}
                           </button>

                           <button
                              type='button'
                              onClick={() => handleEdit(project)}
                              className='border border-border-strong bg-bg px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-text-secondary transition-colors hover:border-blue-base hover:text-text-primary'
                           >
                              Editar
                           </button>

                           <button
                              type='button'
                              onClick={() => handleDelete(project.id)}
                              className='border border-border-strong bg-bg px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-red-700 transition-colors hover:border-red-700 hover:text-red-800'
                           >
                              Remover
                           </button>
                        </div>
                     </div>
                  </li>
               ))}
            </ul>
         </section>
      </section>
   );
}
