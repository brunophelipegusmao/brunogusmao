import type { Metadata } from 'next';

import { Header } from '@/components/Header';
import { BlurFade } from '@/components/magicui/blur-fade';
import { WordPullUp } from '@/components/magicui/word-pull-up';
import { getSocialLinks, getWhatsAppNumber } from '@/lib/api/content.server';
import type { SocialBrand } from '@/mock';

export const metadata: Metadata = {
   title: 'Contato — Bruno Gusmão',
   description:
      'Escreva uma mensagem e siga direto para o WhatsApp de Bruno Gusmão, com links para Instagram, GitHub e LinkedIn.',
};

function SocialBrandIcon({ brand }: { brand: SocialBrand }) {
   switch (brand) {
      case 'instagram':
         return (
            <svg
               viewBox='0 0 24 24'
               aria-hidden='true'
               className='contact-social-svg'
            >
               <path
                  fill='currentColor'
                  d='M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5Zm8.94 1.35a1.11 1.11 0 1 1 0 2.22 1.11 1.11 0 0 1 0-2.22ZM12 6.86A5.14 5.14 0 1 1 6.86 12 5.15 5.15 0 0 1 12 6.86Zm0 1.8A3.34 3.34 0 1 0 15.34 12 3.34 3.34 0 0 0 12 8.66Z'
               />
            </svg>
         );
      case 'github':
         return (
            <svg
               viewBox='0 0 24 24'
               aria-hidden='true'
               className='contact-social-svg'
            >
               <path
                  fill='currentColor'
                  d='M12 .5C5.65.5.5 5.66.5 12.02c0 5.09 3.29 9.4 7.86 10.93.57.1.78-.25.78-.56 0-.28-.01-1.2-.02-2.18-3.2.7-3.88-1.36-3.88-1.36-.52-1.35-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.25 3.36.96.1-.75.4-1.26.74-1.55-2.56-.3-5.26-1.3-5.26-5.75 0-1.27.45-2.31 1.19-3.12-.12-.29-.51-1.47.11-3.06 0 0 .97-.31 3.19 1.19a10.96 10.96 0 0 1 5.8 0c2.22-1.5 3.19-1.19 3.19-1.19.62 1.59.23 2.77.11 3.06.74.81 1.19 1.85 1.19 3.12 0 4.46-2.71 5.45-5.29 5.74.42.36.79 1.06.79 2.15 0 1.55-.01 2.8-.01 3.18 0 .31.21.67.79.56a11.53 11.53 0 0 0 7.85-10.93C23.5 5.66 18.35.5 12 .5Z'
               />
            </svg>
         );
      case 'linkedin':
         return (
            <svg
               viewBox='0 0 24 24'
               aria-hidden='true'
               className='contact-social-svg'
            >
               <path
                  fill='currentColor'
                  d='M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.66H9.35V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.38-1.85 3.62 0 4.29 2.38 4.29 5.48v6.26ZM5.34 7.43A2.07 2.07 0 1 1 5.34 3.3a2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77A1.75 1.75 0 0 0 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46A1.77 1.77 0 0 0 24 22.28V1.72A1.77 1.77 0 0 0 22.23 0Z'
               />
            </svg>
         );
   }
}

function WhatsAppIcon() {
   return (
      <svg
         viewBox='0 0 24 24'
         aria-hidden='true'
         className='contact-send-icon-svg'
      >
         <path
            fill='currentColor'
            d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z'
         />
      </svg>
   );
}

export default async function ContactPage() {
   const [socialLinks, whatsappNumber] = await Promise.all([
      getSocialLinks(),
      getWhatsAppNumber(),
   ]);

   return (
      <main className='min-h-screen bg-bg'>
         <Header />

         <section className='relative overflow-hidden px-6 pt-28 pb-10 sm:px-8 md:px-16'>
            <div className='about-grid' aria-hidden='true' />

            <div className='relative max-w-350'>
               <BlurFade delay={0}>
                  <p className='about-chapter'>
                     <span className='text-blue-base'>Canal direto</span> /
                     Contato
                  </p>
               </BlurFade>

               <WordPullUp
                  text='MENSAGEM DIRETA.'
                  className='about-headline'
                  delay={100}
                  stagger={70}
               />

               <BlurFade delay={420}>
                  <p className='contact-hero-lead'>
                     Aqui o contato vai direto ao ponto: voce escreve na pagina,
                     eu recebo no WhatsApp. Sem email, sem caixa postal, sem
                     formularios que terminam esquecidos.
                  </p>
               </BlurFade>
            </div>

            <div className='about-rule' />
         </section>

         <section className='px-6 py-8 pb-24 sm:px-8 md:px-16'>
            <div className='contact-layout max-w-350'>
               <div className='contact-rail'>
                  <BlurFade delay={0}>
                     <div className='contact-signal-board'>
                        <div className='contact-signal-cell'>
                           <p className='contact-signal-index'>01</p>
                           <p className='contact-signal-title'>Escreva</p>
                           <p className='contact-signal-copy'>
                              Descreva projeto, contexto ou objetivo com a sua
                              linguagem.
                           </p>
                        </div>
                        <div className='contact-signal-cell'>
                           <p className='contact-signal-index'>02</p>
                           <p className='contact-signal-title'>Revise</p>
                           <p className='contact-signal-copy'>
                              O WhatsApp abre com a mensagem pronta para voce
                              ajustar se quiser.
                           </p>
                        </div>
                        <div className='contact-signal-cell'>
                           <p className='contact-signal-index'>03</p>
                           <p className='contact-signal-title'>Envie</p>
                           <p className='contact-signal-copy'>
                              Conversa iniciada no canal que realmente uso no
                              dia a dia.
                           </p>
                        </div>
                     </div>
                  </BlurFade>

                  <BlurFade delay={120}>
                     <aside className='contact-direct-panel'>
                        <p className='contact-direct-label'>Canal principal</p>
                        <p className='contact-direct-value'>WhatsApp</p>
                        <p className='contact-direct-copy'>
                           Melhor para briefing, proposta, parceria ou conversa
                           inicial sobre produto e software.
                        </p>
                     </aside>
                  </BlurFade>
               </div>

               <div className='contact-main-column'>
                  <BlurFade delay={80}>
                     <section className='contact-form-shell'>
                        <div className='contact-form-head'>
                           <p className='contact-form-labelline'>
                              <span className='text-blue-base'>↓</span> WhatsApp
                              launchpad
                           </p>
                           <h2 className='contact-form-title'>
                              Escreva sua mensagem aqui.
                           </h2>
                        </div>

                        <form
                           action='https://api.whatsapp.com/send'
                           method='get'
                           className='contact-form'
                        >
                           <input
                              type='hidden'
                              name='phone'
                              value={whatsappNumber}
                           />

                           <label
                              htmlFor='text'
                              className='contact-field-label'
                           >
                              Mensagem
                           </label>
                           <textarea
                              id='text'
                              name='text'
                              required
                              minLength={12}
                              maxLength={1200}
                              className='contact-message-field'
                              placeholder='Oi Bruno, quero conversar sobre um projeto, uma oportunidade ou uma melhoria que preciso colocar de pe.'
                           />

                           <p className='contact-form-hint'>
                              Ao clicar em enviar, voce sera levado ao WhatsApp
                              com essa mensagem pronta para mandar.
                           </p>

                           <button type='submit' className='contact-send-btn'>
                              <span
                                 className='contact-send-icon-wrap'
                                 aria-hidden='true'
                              >
                                 <WhatsAppIcon />
                              </span>
                              ENVIAR
                           </button>
                        </form>
                     </section>
                  </BlurFade>

                  <BlurFade delay={160}>
                     <section className='contact-social-shell'>
                        <p className='contact-form-labelline'>
                           <span className='text-blue-base'>↓</span> Outros
                           pontos de contato
                        </p>

                        <ul className='contact-social-list'>
                           {socialLinks.map(link => (
                              <li key={link.label}>
                                 <a
                                    href={link.href}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className={`contact-social-link contact-social-link--${link.brand}`}
                                    aria-label={`${link.label}: ${link.handle}`}
                                 >
                                    <span className='contact-social-icon'>
                                       <SocialBrandIcon brand={link.brand} />
                                    </span>

                                    <span className='contact-social-body'>
                                       <span className='contact-social-name'>
                                          {link.label}
                                       </span>
                                       <span className='contact-social-handle'>
                                          {link.handle}
                                       </span>
                                       <span className='contact-social-meta'>
                                          {link.meta}
                                       </span>
                                    </span>

                                    <span
                                       className='contact-social-arrow'
                                       aria-hidden='true'
                                    >
                                       ↗
                                    </span>
                                 </a>
                              </li>
                           ))}
                        </ul>
                     </section>
                  </BlurFade>
               </div>
            </div>
         </section>
      </main>
   );
}
