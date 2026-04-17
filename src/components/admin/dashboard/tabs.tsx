'use client';

import { DashboardPortfolioTab } from '@/components/admin/portfolio';
import { DashboardPostsTab } from '@/components/admin/posts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function DashboardTabs() {
   return (
      <Tabs defaultValue='posts' className='w-full gap-6'>
         <TabsList className='h-auto rounded-none border border-border bg-bg-subtle p-1'>
            <TabsTrigger
               value='posts'
               className='rounded-none border border-transparent px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] data-active:border-blue-base data-active:bg-blue-base data-active:text-text-on-accent'
            >
               Posts
            </TabsTrigger>
            <TabsTrigger
               value='portfolio'
               className='rounded-none border border-transparent px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] data-active:border-blue-base data-active:bg-blue-base data-active:text-text-on-accent'
            >
               Portfolio
            </TabsTrigger>
         </TabsList>

         <TabsContent value='posts'>
            <DashboardPostsTab />
         </TabsContent>

         <TabsContent value='portfolio'>
            <DashboardPortfolioTab />
         </TabsContent>
      </Tabs>
   );
}
