import { getContentRepository } from "@/lib/api/content-repository";
import { getClientMockEnabled } from "@/lib/api/mock-state.client";

function getRepository() {
  return getContentRepository(getClientMockEnabled());
}

export function getBlogPosts() {
  return getRepository().getBlogPosts();
}

export function getPostStatusBySlug() {
  return getRepository().getPostStatusBySlug();
}

export function getPostTagLibrary() {
  return getRepository().getPostTagLibrary();
}

export function getPortfolioProjects() {
  return getRepository().getPortfolioProjects();
}

export function getPortfolioManagerProjects() {
  return getRepository().getPortfolioManagerProjects();
}

export function getAboutSkills() {
  return getRepository().getAboutSkills();
}

export function getAboutExperience() {
  return getRepository().getAboutExperience();
}

export function getAboutStats() {
  return getRepository().getAboutStats();
}

export function getTechStack() {
  return getRepository().getTechStack();
}

export function getSocialLinks() {
  return getRepository().getSocialLinks();
}

export function getWhatsAppNumber() {
  return getRepository().getWhatsAppNumber();
}

export function getKanbanColumns() {
  return getRepository().getKanbanColumns();
}

export function getKanbanCards() {
  return getRepository().getKanbanCards();
}

export function getKanbanCardOrder() {
  return getRepository().getKanbanCardOrder();
}
