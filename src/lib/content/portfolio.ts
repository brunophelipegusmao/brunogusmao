export interface PortfolioProject {
   id: string;
   index: string;
   title: string;
   description: string;
   stack: string[];
   image: string | null;
   live: string | null;
   repo: string;
   featured?: boolean;
}

export interface PortfolioManagerProject {
   id: string;
   title: string;
   description: string;
   stack: string[];
   image: string;
   live: string;
   repo: string;
   featured: boolean;
}
