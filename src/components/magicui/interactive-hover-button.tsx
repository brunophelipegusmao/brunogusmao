import Link from 'next/link';

import { cn } from '@/lib/utils';

interface InteractiveHoverButtonProps {
   href: string;
   children: React.ReactNode;
   className?: string;
}

export function InteractiveHoverButton({
   href,
   children,
   className,
}: InteractiveHoverButtonProps) {
   return (
      <Link
         href={href}
         className={cn(
            'group relative inline-flex items-center gap-3 overflow-hidden border border-border-strong bg-bg-subtle px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] text-text-primary transition-colors duration-200 hover:text-text-on-accent',
            className,
         )}
      >
         <span className='absolute inset-0 -translate-x-[102%] bg-blue-base transition-transform duration-300 ease-out group-hover:translate-x-0' />
         <span className='relative z-[1]'>{children}</span>
         <span className='relative z-[1] transition-transform duration-300 group-hover:translate-x-1'>
            {'->'}
         </span>
      </Link>
   );
}
