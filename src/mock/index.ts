export const MOCK_STORAGE_KEY = "use-mock-data-v2";
export const USE_MOCK =
  process.env.NODE_ENV !== "production" &&
  process.env.NEXT_PUBLIC_USE_MOCK === "true";

export * from "./contact.mock";
export * from "./kanban.mock";
export * from "./posts.mock";
export * from "./profile.mock";
export * from "./projects.mock";
export * from "./tags.mock";
