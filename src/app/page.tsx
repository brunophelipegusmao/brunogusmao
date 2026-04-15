import { Header } from '@/components/Header';
import Link from 'next/link';

const techStack = [
   'React',
   'Next.js',
   'TypeScript',
   'Node.js',
   'PostgreSQL',
   'Docker',
   'Angular',
   'TailwindCSS',
   'Java',
   'Drizzle',
   'Git',
   'REST APIs',
   'React Native',
   'Spring Boot',
   'NestJS',
];

export default function Home() {
   return (
      <main className='min-h-screen bg-bg overflow-hidden'>
         <Header />

         {/* Hero */}
         <section className='relative min-h-screen flex flex-col justify-center pt-20 pb-0'>
            {/* Grid background */}
            <div className='hero-grid' aria-hidden='true' />

            {/* Name block */}
            <div className='relative px-8 md:px-16 flex-1 flex flex-col justify-center'>
               {/* Top label */}
               <p className='hero-role mb-6'>
                  <span className='hero-role-prefix' aria-hidden='true'>
                     ›
                  </span>
                  Portfolio pessoal
               </p>

               {/* Name — o hero É a tipografia */}
               <div className='select-none' aria-label='Bruno Gusmão'>
                  <span className='hero-name-bruno' aria-hidden='true'>
                     BRUNO
                     <span className='hero-cursor' aria-hidden='true' />
                  </span>
                  <span className='hero-name-gusmao' aria-hidden='true'>
                     GUSMÃO
                  </span>
               </div>

               {/* Divisor azul */}
               <div className='hero-divider' />

               {/* Role */}
               <p className='hero-role'>
                  <span className='hero-role-prefix' aria-hidden='true'>
                     _
                  </span>
                  Desenvolvedor Full Stack
               </p>

               {/* CTAs */}
               <div
                  className='flex gap-6 mt-10'
                  style={{ animation: 'fade-up 0.6s 0.9s both' }}
               >
                  <Link
                     href='/portfolio'
                     className='inline-flex items-center gap-2 px-6 py-3 bg-blue-dark text-text-on-accent font-mono text-xs uppercase tracking-widest hover:bg-blue-base transition-colors duration-200'
                  >
                     Ver projetos
                     <span aria-hidden='true'>→</span>
                  </Link>
                  <Link
                     href='/contact'
                     className='inline-flex items-center gap-2 px-6 py-3 border border-border-strong text-text-primary font-mono text-xs uppercase tracking-widest hover:border-blue-base hover:text-blue-base transition-colors duration-200'
                  >
                     Contato
                  </Link>
               </div>

               {/* Label vertical */}
               <div className='hero-vertical-label' aria-hidden='true'>
                  Analista de Sistemas
               </div>
            </div>

            {/* Ticker de tecnologias */}
            <div className='hero-ticker-wrapper mt-16'>
               <div className='hero-ticker-inner' aria-hidden='true'>
                  {[...techStack, ...techStack].map((tech, i) => (
                     <span key={i} className='hero-ticker-item'>
                        <span className='hero-ticker-dot'>◆</span>
                        {tech}
                     </span>
                  ))}
               </div>
            </div>
         </section>
      </main>
   );
}
