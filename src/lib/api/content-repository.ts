import type { BlogPost } from '@/app/(public)/blog/posts';
import type {
   KanbanCardOrder,
   KanbanCardsById,
   KanbanColumn,
} from '@/components/damin/kanban/types';
import type {
   PostTagDefinition,
   PostWorkflowStatus,
} from '@/lib/content/posts-admin';
import {
   aboutExperience,
   aboutSkills,
   aboutStats,
   blogPosts,
   INITIAL_CARD_ORDER,
   INITIAL_CARDS,
   INITIAL_COLUMNS,
   type PortfolioManagerProject,
   type PortfolioProject,
   portfolioManagerProjects,
   portfolioProjects,
   postStatusBySlug,
   postTagLibrary,
   type SocialLink,
   socialLinks,
   techStack,
   WHATSAPP_NUMBER,
} from '@/mock';

export interface ContentRepository {
   getBlogPosts: () => BlogPost[];
   getPostStatusBySlug: () => Record<string, PostWorkflowStatus>;
   getPostTagLibrary: () => PostTagDefinition[];
   getPortfolioProjects: () => PortfolioProject[];
   getPortfolioManagerProjects: () => PortfolioManagerProject[];
   getAboutSkills: () => typeof aboutSkills;
   getAboutExperience: () => typeof aboutExperience;
   getAboutStats: () => typeof aboutStats;
   getTechStack: () => typeof techStack;
   getSocialLinks: () => SocialLink[];
   getWhatsAppNumber: () => string;
   getKanbanColumns: () => KanbanColumn[];
   getKanbanCards: () => KanbanCardsById;
   getKanbanCardOrder: () => KanbanCardOrder;
}

const mockContentRepository: ContentRepository = {
   getBlogPosts: () => blogPosts,
   getPostStatusBySlug: () => postStatusBySlug,
   getPostTagLibrary: () => postTagLibrary,
   getPortfolioProjects: () => portfolioProjects,
   getPortfolioManagerProjects: () => portfolioManagerProjects,
   getAboutSkills: () => aboutSkills,
   getAboutExperience: () => aboutExperience,
   getAboutStats: () => aboutStats,
   getTechStack: () => techStack,
   getSocialLinks: () => socialLinks,
   getWhatsAppNumber: () => WHATSAPP_NUMBER,
   getKanbanColumns: () => INITIAL_COLUMNS,
   getKanbanCards: () => INITIAL_CARDS,
   getKanbanCardOrder: () => INITIAL_CARD_ORDER,
};

const liveContentRepository: ContentRepository = {
   getBlogPosts: () => blogPosts,
   getPostStatusBySlug: () => postStatusBySlug,
   getPostTagLibrary: () => postTagLibrary,
   getPortfolioProjects: () => portfolioProjects,
   getPortfolioManagerProjects: () => portfolioManagerProjects,
   getAboutSkills: () => aboutSkills,
   getAboutExperience: () => aboutExperience,
   getAboutStats: () => aboutStats,
   getTechStack: () => techStack,
   getSocialLinks: () => socialLinks,
   getWhatsAppNumber: () => WHATSAPP_NUMBER,
   getKanbanColumns: () => INITIAL_COLUMNS,
   getKanbanCards: () => INITIAL_CARDS,
   getKanbanCardOrder: () => INITIAL_CARD_ORDER,
};

export function getContentRepository(useMock: boolean): ContentRepository {
   if (useMock) {
      return mockContentRepository;
   }

   return liveContentRepository;
}
