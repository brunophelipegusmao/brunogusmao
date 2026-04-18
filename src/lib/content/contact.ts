export type SocialBrand = "instagram" | "github" | "linkedin";

export interface SocialLink {
  brand: SocialBrand;
  label: string;
  href: string;
  handle: string;
  meta?: string;
}
