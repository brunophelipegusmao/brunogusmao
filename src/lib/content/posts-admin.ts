import { blogPosts } from '@/app/(public)/blog/posts';

export type PostWorkflowStatus = 'publicado' | 'revisao' | 'em-andamento';

export interface PostTagStyle {
   textColor: string;
   backgroundColor: string;
   fontStyle: 'normal' | 'bold' | 'italic' | 'bold-italic';
}

export interface PostTagDefinition {
   id: string;
   label: string;
   style: PostTagStyle;
}

export interface DashboardPostSummary {
   slug: string;
   title: string;
   excerpt: string;
   category: string;
   publishedAt: string;
   readingTime: string;
   status: PostWorkflowStatus;
   tags: string[];
}

const postStatusBySlug: Record<string, PostWorkflowStatus> = {
   'arquitetura-frontend-sem-drama': 'publicado',
   'design-sistemas-que-respiram': 'publicado',
   'backend-orientado-a-produto': 'revisao',
   'checklist-pre-ship-frontend': 'publicado',
   'padroes-de-componentes-reutilizaveis': 'em-andamento',
   'narrativa-visual-em-paginas-tecnicas': 'revisao',
   'metrica-que-realmente-importa': 'publicado',
   'api-design-para-times-reais': 'em-andamento',
   'deploy-seguro-sem-burocracia': 'revisao',
   'microinteracoes-com-intencao': 'em-andamento',
};

export const postTagLibrary: PostTagDefinition[] = [
   {
      id: 'nextjs',
      label: 'Next.js',
      style: {
         textColor: '#f2f6ff',
         backgroundColor: '#325dc8',
         fontStyle: 'bold',
      },
   },
   {
      id: 'react',
      label: 'React',
      style: {
         textColor: '#12304f',
         backgroundColor: '#9fdaff',
         fontStyle: 'normal',
      },
   },
   {
      id: 'arquitetura',
      label: 'Arquitetura',
      style: {
         textColor: '#e7f2ff',
         backgroundColor: '#3f4d79',
         fontStyle: 'italic',
      },
   },
   {
      id: 'produto',
      label: 'Produto',
      style: {
         textColor: '#f8e7ff',
         backgroundColor: '#6d3a93',
         fontStyle: 'bold-italic',
      },
   },
   {
      id: 'devops',
      label: 'DevOps',
      style: {
         textColor: '#122f2f',
         backgroundColor: '#8fe3d4',
         fontStyle: 'bold',
      },
   },
];

export function getPostStatusLabel(status: PostWorkflowStatus): string {
   if (status === 'publicado') {
      return 'Publicado';
   }

   if (status === 'revisao') {
      return 'Revisao';
   }

   return 'Em andamento';
}

export function getDashboardPosts(): DashboardPostSummary[] {
   return blogPosts.map(post => ({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      category: post.category,
      publishedAt: post.publishedAt,
      readingTime: post.readingTime,
      tags: post.tags,
      status: postStatusBySlug[post.slug] ?? 'em-andamento',
   }));
}
