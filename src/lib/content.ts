import projectsData from "@/content/projects.json";
import skinsData from "@/content/skins.json";

export type Project = {
  slug: string;
  name: string;
  shortDescription: string;
  year: string;
  type: string | null;
  detailsHtml: string | null;
  role: string | null;
  teamHtml: string | null;
  disciplinesHtml: string | null;
  image: string | null;
};

export type Skin = {
  slug: string;
  name: string;
  date: string | null;
  workshopUrl: string;
  workshopId: string;
  image: string | null;
};

export const projects = projectsData as Project[];
export const skins = skinsData as Skin[];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
