'use client';

import { DashboardPortfolioTab } from '@/components/damin/portfolio';
import { DashboardPostsTab } from '@/components/damin/posts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function DashboardTabs() {
   return (
      <Tabs defaultValue='posts' className='w-full gap-6'>
         <TabsList className='h-auto rounded-none border border-border bg-transparent p-1'>
            <TabsTrigger
               value='posts'
               className='rounded-none border border-transparent px-4 py-2 data-active:border-border data-active:bg-background'
            >
               Posts
            </TabsTrigger>
            <TabsTrigger
               value='portfolio'
               className='rounded-none border border-transparent px-4 py-2 data-active:border-border data-active:bg-background'
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
