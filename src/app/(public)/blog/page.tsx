import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { Header } from '@/components/Header';
import { BlurFade } from '@/components/magicui/blur-fade';
import { WordPullUp } from '@/components/magicui/word-pull-up';

import { type BlogPost, blogPosts } from './posts';

const POSTS_PER_PAGE = 6;

export const metadata: Metadata = {
   title: 'Blog — Bruno Gusmão',
   description:
      'Artigos sobre arquitetura frontend, backend orientado a produto, design de interfaces e qualidade de software.',
};

function BlogCard({ post, delay }: { post: BlogPost; delay: number }) {
   return (
      <BlurFade delay={delay}>
         <article className='blog-card'>
            {post.coverImage ? (
               <Link
                  href={`/blog/${post.slug}`}
                  className='blog-card-cover-link'
                  aria-label={`Abrir post: ${post.title}`}
               >
                  <div className='blog-card-cover'>
                     <Image
                        src={post.coverImage.src}
                        alt={post.coverImage.alt}
                        fill
                        sizes='(max-width: 860px) 100vw, 50vw'
                        className='object-cover'
                     />
                  </div>
               </Link>
            ) : null}

            <div className='blog-card-top'>
               <span className='blog-card-index'>{post.index}</span>
               <span className='blog-card-category'>{post.category}</span>
            </div>

            <h2 className='blog-card-title'>{post.title}</h2>
            <p className='blog-card-excerpt'>{post.excerpt}</p>

            <ul className='blog-card-tags' aria-label='Tags do artigo'>
               {post.tags.map(tag => (
                  <li key={tag} className='blog-card-tag'>
                     {tag}
                  </li>
               ))}
            </ul>

            <div className='blog-card-footer'>
               <span className='blog-card-meta'>
                  {post.publishedAt} / {post.readingTime}
               </span>

               <Link href={`/blog/${post.slug}`} className='blog-card-link'>
                  Ler artigo
                  <span aria-hidden='true'>→</span>
               </Link>
            </div>
         </article>
      </BlurFade>
   );
}

interface BlogPageProps {
   searchParams?: Promise<{
      page?: string;
   }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
   const resolvedSearchParams = (await searchParams) ?? {};
   const pageParam = Number(resolvedSearchParams.page ?? '1');

   const totalPages = Math.max(1, Math.ceil(blogPosts.length / POSTS_PER_PAGE));
   const currentPage = Number.isNaN(pageParam)
      ? 1
      : Math.min(Math.max(pageParam, 1), totalPages);

   const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
   const paginatedPosts = blogPosts.slice(
      startIndex,
      startIndex + POSTS_PER_PAGE,
   );

   const paginationWindowStart = Math.max(1, currentPage - 2);
   const paginationWindowEnd = Math.min(totalPages, currentPage + 2);
   const pages = Array.from(
      { length: paginationWindowEnd - paginationWindowStart + 1 },
      (_, index) => paginationWindowStart + index,
   );

   return (
      <main className='min-h-screen bg-bg'>
         <Header />

         <section className='relative pt-28 pb-16 px-6 sm:px-8 md:px-16 overflow-hidden'>
            <div className='about-grid' aria-hidden='true' />

            <div className='relative max-w-350'>
               <BlurFade delay={0}>
                  <p className='about-chapter'>
                     <span className='text-blue-base'>Caderno</span> / Blog
                  </p>
               </BlurFade>

               <WordPullUp
                  text='ARTIGOS.'
                  className='about-headline'
                  delay={100}
                  stagger={90}
               />

               <BlurFade delay={450}>
                  <p className='blog-hero-lead'>
                     Reflexões práticas sobre software em produção: arquitetura,
                     experiência de usuário, backend e qualidade de entrega.
                  </p>
               </BlurFade>
            </div>

            <div className='about-rule' />
         </section>

         <section className='px-6 sm:px-8 md:px-16 py-8 pb-24'>
            <div className='max-w-350 mx-auto'>
               <BlurFade delay={0}>
                  <p className='portfolio-section-label'>
                     <span className='text-blue-base'>↓</span> Página{' '}
                     {currentPage} de {totalPages}
                  </p>
               </BlurFade>

               <div className='blog-grid'>
                  {paginatedPosts.map((post, index) => (
                     <BlogCard key={post.slug} post={post} delay={index * 90} />
                  ))}
               </div>

               <nav aria-label='Paginação do blog' className='blog-pagination'>
                  <Link
                     href={
                        currentPage > 1
                           ? `/blog?page=${currentPage - 1}`
                           : '/blog?page=1'
                     }
                     className={`blog-pagination-btn ${currentPage === 1 ? 'blog-pagination-btn--disabled' : ''}`}
                     aria-disabled={currentPage === 1}
                     tabIndex={currentPage === 1 ? -1 : 0}
                  >
                     Anterior
                  </Link>

                  <div className='blog-pagination-pages'>
                     {pages.map(page => (
                        <Link
                           key={page}
                           href={`/blog?page=${page}`}
                           className={`blog-pagination-page ${page === currentPage ? 'blog-pagination-page--active' : ''}`}
                           aria-current={
                              page === currentPage ? 'page' : undefined
                           }
                        >
                           {String(page).padStart(2, '0')}
                        </Link>
                     ))}
                  </div>

                  <Link
                     href={
                        currentPage < totalPages
                           ? `/blog?page=${currentPage + 1}`
                           : `/blog?page=${totalPages}`
                     }
                     className={`blog-pagination-btn ${currentPage === totalPages ? 'blog-pagination-btn--disabled' : ''}`}
                     aria-disabled={currentPage === totalPages}
                     tabIndex={currentPage === totalPages ? -1 : 0}
                  >
                     Próxima
                  </Link>
               </nav>
            </div>
         </section>
      </main>
   );
}
