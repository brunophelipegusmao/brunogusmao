import type {
  AboutExperienceItem,
  AboutSkills,
  AboutStatItem,
} from "@/lib/content/profile";

export const aboutSkills: AboutSkills = {
  Frontend: [
    "React",
    "Next.js",
    "Angular",
    "TypeScript",
    "TailwindCSS",
    "React Native",
  ],
  Backend: ["Node.js", "NestJS", "Spring Boot", "Java", "REST APIs", "GraphQL"],
  Dados: ["PostgreSQL", "MySQL", "Drizzle ORM", "Redis", "Prisma"],
  DevOps: ["Docker", "Git", "CI/CD", "Linux", "Vercel", "AWS"],
};

export const aboutExperience: AboutExperienceItem[] = [
  {
    role: "Desenvolvedor Full Stack",
    company: "Freelance / Projetos próprios",
    period: "2022 — presente",
    description:
      "Desenvolvimento de sistemas web completos, APIs REST, interfaces responsivas e aplicações mobile com React Native.",
  },
  {
    role: "Analista de Sistemas",
    company: "Projetos acadêmicos e comerciais",
    period: "2020 — 2022",
    description:
      "Modelagem de sistemas, desenvolvimento de protótipos e entrega de soluções orientadas a negócios.",
  },
];

export const aboutStats: AboutStatItem[] = [
  { value: 5, suffix: "+", label: "Anos de código" },
  { value: 30, suffix: "+", label: "Projetos entregues" },
  { value: 15, suffix: "+", label: "Tecnologias" },
  { value: 100, suffix: "%", label: "Comprometimento" },
];

export const techStack: string[] = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "Docker",
  "Angular",
  "TailwindCSS",
  "Java",
  "Drizzle",
  "Git",
  "REST APIs",
  "React Native",
  "Spring Boot",
  "NestJS",
];
