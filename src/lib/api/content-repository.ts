import type { BlogPost } from '@/app/(public)/blog/posts';
import type {
   KanbanCardOrder,
   KanbanCardsById,
   KanbanColumn,
} from '@/components/admin/kanban/types';
import type { SocialLink } from '@/lib/content/contact';
import type {
   PortfolioManagerProject,
   PortfolioProject,
} from '@/lib/content/portfolio';
import type {
   PostTagDefinition,
   PostWorkflowStatus,
} from '@/lib/content/posts-admin';
import type {
   AboutExperienceItem,
   AboutSkills,
   AboutStatItem,
} from '@/lib/content/profile';
import {
   aboutExperience,
   aboutSkills,
   aboutStats,
   blogPosts,
   INITIAL_CARD_ORDER,
   INITIAL_CARDS,
   INITIAL_COLUMNS,
   portfolioManagerProjects,
   portfolioProjects,
   postStatusBySlug,
   postTagLibrary,
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
   getAboutSkills: () => AboutSkills;
   getAboutExperience: () => AboutExperienceItem[];
   getAboutStats: () => AboutStatItem[];
   getTechStack: () => string[];
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

const EMPTY_POST_STATUS_BY_SLUG: Record<string, PostWorkflowStatus> = {};
const EMPTY_POST_TAG_LIBRARY: PostTagDefinition[] = [];
const EMPTY_BLOG_POSTS: BlogPost[] = [];
const EMPTY_PORTFOLIO_PROJECTS: PortfolioProject[] = [];
const EMPTY_PORTFOLIO_MANAGER_PROJECTS: PortfolioManagerProject[] = [];

const liveContentRepository: ContentRepository = {
   getBlogPosts: () => EMPTY_BLOG_POSTS,
   getPostStatusBySlug: () => EMPTY_POST_STATUS_BY_SLUG,
   getPostTagLibrary: () => EMPTY_POST_TAG_LIBRARY,
   getPortfolioProjects: () => EMPTY_PORTFOLIO_PROJECTS,
   getPortfolioManagerProjects: () => EMPTY_PORTFOLIO_MANAGER_PROJECTS,
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
