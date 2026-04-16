import { cn } from '@/lib/utils';

interface ActionCardProps {
   title: string;
   description: string;
   href: string;
   ctaLabel: string;
   className?: string;
}

export function ActionCard({
   title,
   description,
   href,
   ctaLabel,
   className,
}: ActionCardProps) {
   return (
      <article className={cn('border border-border p-4', className)}>
         <h3 className='font-semibold text-foreground'>{title}</h3>
         <p className='mt-2 text-sm text-muted-foreground'>{description}</p>
         <a
            href={href}
            className='mt-4 inline-flex border border-border px-3 py-2 text-xs uppercase tracking-[0.12em]'
         >
            {ctaLabel}
         </a>
      </article>
   );
}
