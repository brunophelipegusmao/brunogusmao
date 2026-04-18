import "server-only";

import { getContentRepository } from "@/lib/api/content-repository";
import { getServerMockEnabled } from "@/lib/api/mock-state.server";

async function getRepository() {
  return getContentRepository(await getServerMockEnabled());
}

export async function getBlogPosts() {
  return (await getRepository()).getBlogPosts();
}

export async function getPostStatusBySlug() {
  return (await getRepository()).getPostStatusBySlug();
}

export async function getPostTagLibrary() {
  return (await getRepository()).getPostTagLibrary();
}

export async function getPortfolioProjects() {
  return (await getRepository()).getPortfolioProjects();
}

export async function getAboutSkills() {
  return (await getRepository()).getAboutSkills();
}

export async function getAboutExperience() {
  return (await getRepository()).getAboutExperience();
}

export async function getAboutStats() {
  return (await getRepository()).getAboutStats();
}

export async function getTechStack() {
  return (await getRepository()).getTechStack();
}

export async function getSocialLinks() {
  return (await getRepository()).getSocialLinks();
}

export async function getWhatsAppNumber() {
  return (await getRepository()).getWhatsAppNumber();
}
