'use client';

import * as React from 'react';
import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion';
import { ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
   return (
      <AccordionPrimitive.Root
         data-slot='accordion'
         className={cn('grid gap-4', className)}
         {...props}
      />
   );
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
   return (
      <AccordionPrimitive.Item
         data-slot='accordion-item'
         className={cn('border border-border', className)}
         {...props}
      />
   );
}

function AccordionHeader({
   className,
   ...props
}: AccordionPrimitive.Header.Props) {
   return (
      <AccordionPrimitive.Header
         data-slot='accordion-header'
         className={cn('flex', className)}
         {...props}
      />
   );
}

function AccordionTrigger({
   className,
   children,
   ...props
}: AccordionPrimitive.Trigger.Props) {
   return (
      <AccordionPrimitive.Trigger
         data-slot='accordion-trigger'
         className={cn(
            'group/accordion flex w-full items-center justify-between gap-2 px-4 py-3 text-left',
            className,
         )}
         {...props}
      >
         {children}
         <ChevronDown
            className='size-4 shrink-0 transition-transform duration-200 group-data-panel-open/accordion:rotate-180'
            aria-hidden='true'
         />
      </AccordionPrimitive.Trigger>
   );
}

function AccordionContent({
   className,
   ...props
}: AccordionPrimitive.Panel.Props) {
   return (
      <AccordionPrimitive.Panel
         data-slot='accordion-content'
         className={cn(
            'grid overflow-hidden text-sm transition-all data-ending-style:animate-out data-starting-style:animate-in data-[starting-style=open]:slide-in-from-top-2 data-[starting-style=closed]:slide-in-from-top-2 data-[ending-style=open]:slide-out-to-top-2 data-[ending-style=closed]:slide-out-to-top-2',
            className,
         )}
         {...props}
      />
   );
}

export {
   Accordion,
   AccordionItem,
   AccordionHeader,
   AccordionTrigger,
   AccordionContent,
};
