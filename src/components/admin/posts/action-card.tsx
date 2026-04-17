import { RippleButton } from '@/components/magicui/ripple-button';
import { cn } from '@/lib/utils';

interface ActionCardProps {
   title: string;
   description: string;
   ctaLabel: string;
   href?: string;
   onAction?: () => void;
   className?: string;
}

export function ActionCard({
   title,
   description,
   ctaLabel,
   href,
   onAction,
   className,
}: ActionCardProps) {
   return (
      <article
         className={cn(
            'group relative overflow-hidden border border-border bg-bg-subtle p-4 transition-colors duration-200 hover:border-blue-muted',
            className,
         )}
      >
         <div className='pointer-events-none absolute inset-x-0 top-0 h-1 bg-blue-base/70 opacity-75 transition-opacity duration-300 group-hover:opacity-100' />

         <h3 className='font-goldman text-xl leading-tight text-text-primary'>
            {title}
         </h3>
         <p className='mt-2 text-sm text-text-secondary'>{description}</p>

         <RippleButton href={href} onClick={onAction} className='mt-4'>
            {ctaLabel}
         </RippleButton>
      </article>
   );
}
