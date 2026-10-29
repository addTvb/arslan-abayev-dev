import type { Locale } from "@/i18n/config";
import { en } from "@/content/en";
import { ru } from "@/content/ru";
import type { Dictionary, Project } from "@/content/types";

const dictionaries: Record<Locale, Dictionary> = { en, ru };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function getProject(
  locale: Locale,
  slug: string,
): Project | undefined {
  return getDictionary(locale).projects.find((project) => project.id === slug);
}

export function getProjectSlugs(): string[] {
  return en.projects.map((project) => project.id);
}

export type { Dictionary, Project, StoryStep, PanelCopy } from "@/content/types";
