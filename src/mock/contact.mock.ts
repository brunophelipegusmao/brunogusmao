export const WHATSAPP_NUMBER = '5521998787394';

export type SocialBrand = 'instagram' | 'github' | 'linkedin';

export interface SocialLink {
   brand: SocialBrand;
   label: string;
   href: string;
   handle: string;
   meta?: string;
}

export const socialLinks: SocialLink[] = [
   {
      brand: 'instagram',
      label: 'Instagram',
      href: 'https://instagram.com/brunopmulim',
      handle: '@brunopmulim',
   },
   {
      brand: 'github',
      label: 'GitHub',
      href: 'https://github.com/brunophelipegusmao',
      handle: 'github.com/brunophelipegusmao',
   },
   {
      brand: 'linkedin',
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/bruno-mulim',
      handle: '/in/bruno-mulim',
   },
];
