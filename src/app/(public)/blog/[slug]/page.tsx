import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Header } from '@/components/Header';
import { BlurFade } from '@/components/magicui/blur-fade';
import { WordPullUp } from '@/components/magicui/word-pull-up';
import { UnoptimizedImage } from '@/components/ui/unoptimized-image';

import {
   blogPosts,
   getBlogSectionBlocks,
   getPostCoverImage,
   isOptimizedBlogImageSource,
} from '../posts';

interface BlogPostPageProps {
   params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
   return blogPosts.map(post => ({ slug: post.slug }));
}

export async function generateMetadata({
   params,
}: BlogPostPageProps): Promise<Metadata> {
   const { slug } = await params;
   const post = blogPosts.find(entry => entry.slug === slug);

   if (!post) {
      return {
         title: 'Artigo não encontrado — Bruno Gusmão',
         description: 'O conteúdo solicitado não está disponível.',
      };
   }

   return {
      title: `${post.title} — Bruno Gusmão`,
      description: post.excerpt,
   };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
   const { slug } = await params;
   const post = blogPosts.find(entry => entry.slug === slug);

   if (!post) {
      notFound();
   }

   const related = blogPosts
      .filter(entry => entry.slug !== post.slug)
      .slice(0, 3);
   const coverImage = getPostCoverImage(post);
   const useOptimizedCover = isOptimizedBlogImageSource(coverImage.src);

   return (
      <main className='min-h-screen bg-bg'>
         <Header />

         <section className='relative pt-28 pb-12 px-6 sm:px-8 md:px-16 overflow-hidden'>
            <div className='about-grid' aria-hidden='true' />

            <div className='relative max-w-275'>
               <BlurFade delay={0}>
                  <p className='about-chapter'>
                     <span className='text-blue-base'>{post.category}</span> /
                     Blog
                  </p>
               </BlurFade>

               <WordPullUp
                  text={post.title}
                  className='blog-post-headline'
                  delay={80}
                  stagger={22}
               />

               <BlurFade delay={320}>
                  <p className='blog-post-lead'>{post.excerpt}</p>
               </BlurFade>

               <BlurFade delay={430}>
                  <div className='blog-post-meta-row'>
                     <span>{post.publishedAt}</span>
                  </div>
               </BlurFade>
            </div>

            <div className='about-rule' />
         </section>

         <section className='px-6 sm:px-8 md:px-16 pb-24'>
            <div className='max-w-275 blog-post-layout'>
               <article className='blog-post-article'>
                  <BlurFade delay={0}>
                     <figure className='blog-post-cover'>
                        <div className='blog-post-cover-media'>
                           {useOptimizedCover ? (
                              <Image
                                 src={coverImage.src}
                                 alt={coverImage.alt}
                                 fill
                                 sizes='(max-width: 1100px) 100vw, 800px'
                                 className='object-cover'
                              />
                           ) : (
                              <UnoptimizedImage
                                 src={coverImage.src}
                                 alt={coverImage.alt}
                                 className='h-full w-full object-cover'
                                 loading='eager'
                              />
                           )}
                        </div>
                     </figure>
                  </BlurFade>

                  {post.sections.map((section, sectionIndex) => (
                     <BlurFade key={section.heading} delay={sectionIndex * 80}>
                        <section className='blog-post-section'>
                           <h2 className='blog-post-section-title'>
                              {section.heading}
                           </h2>

                           {getBlogSectionBlocks(section).map(
                              (block, blockIndex) => {
                                 if (block.type === 'paragraph') {
                                    return (
                                       <p
                                          key={`${section.heading}-${blockIndex}-${block.content.slice(0, 24)}`}
                                          className='blog-post-paragraph'
                                       >
                                          {block.content}
                                       </p>
                                    );
                                 }

                                 const useOptimizedSectionImage =
                                    isOptimizedBlogImageSource(block.image.src);

                                 return (
                                    <figure
                                       key={`${section.heading}-${blockIndex}-${block.image.src}`}
                                       className='blog-post-section-figure'
                                    >
                                       <div className='blog-post-section-media'>
                                          {useOptimizedSectionImage ? (
                                             <Image
                                                src={block.image.src}
                                                alt={block.image.alt}
                                                fill
                                                sizes='(max-width: 1100px) 100vw, 760px'
                                                className='object-cover'
                                             />
                                          ) : (
                                             <UnoptimizedImage
                                                src={block.image.src}
                                                alt={block.image.alt}
                                                className='h-full w-full object-cover'
                                                loading='lazy'
                                             />
                                          )}
                                       </div>
                                       {block.image.caption ? (
                                          <figcaption className='blog-post-section-caption'>
                                             {block.image.caption}
                                          </figcaption>
                                       ) : null}
                                    </figure>
                                 );
                              },
                           )}
                        </section>
                     </BlurFade>
                  ))}
               </article>

               <aside
                  className='blog-post-aside'
                  aria-label='Conteudo relacionado'
               >
                  <p className='blog-post-aside-label'>
                     <span className='text-blue-base'>↓</span> Continue lendo
                  </p>

                  <ul className='blog-post-related-list'>
                     {related.map(entry => (
                        <li key={entry.slug} className='blog-post-related-item'>
                           <Link
                              href={`/blog/${entry.slug}`}
                              className='blog-post-related-link'
                           >
                              <span className='blog-post-related-index'>
                                 {entry.index}
                              </span>
                              <span className='blog-post-related-title'>
                                 {entry.title}
                              </span>
                           </Link>
                        </li>
                     ))}
                  </ul>

                  <Link href='/blog' className='about-btn-secondary'>
                     Voltar para o blog
                  </Link>
               </aside>
            </div>
         </section>
      </main>
   );
}
