export type AboutSkillCategory = 'Frontend' | 'Backend' | 'Dados' | 'DevOps';

export type AboutSkills = Record<AboutSkillCategory, string[]>;

export interface AboutExperienceItem {
   role: string;
   company: string;
   period: string;
   description: string;
}

export interface AboutStatItem {
   value: number;
   suffix: string;
   label: string;
}
