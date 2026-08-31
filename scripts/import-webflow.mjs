import { mkdir, readFile, writeFile } from "node:fs/promises";
import { extname } from "node:path";

const token = process.env.WEBFLOW_TOKEN;
if (!token) throw new Error("Set WEBFLOW_TOKEN before running the importer.");

const collections = {
  projects: "652c2f6f1b4433a6c89b2b5d",
  skins: "65c7ab07535aaa10ea22af39",
};

const headers = { Authorization: `Bearer ${token}`, "accept-version": "2.0.0" };

async function getItems(id) {
  const response = await fetch(`https://api.webflow.com/v2/collections/${id}/items?limit=100` , { headers });
  if (!response.ok) throw new Error(`Webflow ${response.status}: ${await response.text()}`);
  const first = await response.json();
  const items = [...first.items];
  for (let offset = 100; offset < first.pagination.total; offset += 100) {
    const next = await fetch(`https://api.webflow.com/v2/collections/${id}/items?limit=100&offset=${offset}`, { headers });
    if (!next.ok) throw new Error(`Webflow ${next.status}: ${await next.text()}`);
    items.push(...(await next.json()).items);
  }
  return items.filter((item) => !item.isDraft && !item.isArchived);
}

function extension(url) {
  const suffix = extname(new URL(url).pathname).toLowerCase();
  return suffix && suffix.length <= 6 ? suffix : ".jpg";
}

async function download(url, destination) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Asset ${response.status}: ${url}`);
  await writeFile(destination, Buffer.from(await response.arrayBuffer()));
}

await mkdir("src/content", { recursive: true });
await mkdir("public/media/projects", { recursive: true });
await mkdir("public/media/skins", { recursive: true });

const rawProjects = await getItems(collections.projects);
const rawSkins = await getItems(collections.skins);
const projectOverrides = JSON.parse(await readFile("src/content/project-overrides.json", "utf8"));

function normalizeCapacity(value) {
  return value?.trim().replace(/[.!?]+$/, "") ?? null;
}

const projects = rawProjects.map(({ fieldData: item }) => {
  const image = item["project-image-main"]?.url;
  const imagePath = image ? `/media/projects/${item.slug}${extension(image)}` : null;
  return {
    slug: item.slug,
    name: item.name,
    shortDescription: item["project-description-short"],
    year: item["project-year"],
    type: item["project-type"],
    detailsHtml: item["project-details"],
    role: normalizeCapacity(item["role-2"]),
    teamHtml: item.team,
    disciplinesHtml: item.disciplines,
    image: imagePath,
    sourceImage: image,
  };
}).map((project) => ({ ...project, ...(projectOverrides[project.slug] ?? {}) }))
  .sort((a, b) => Number(b.year) - Number(a.year));

const skins = rawSkins
  .map(({ fieldData: item }) => {
    const image = item.thumbnail?.url;
    const imagePath = image ? `/media/skins/${item.slug}${extension(image)}` : null;
    return {
      slug: item.slug,
      name: item.name,
      date: item["submission-date"],
      workshopUrl: item["workshop-url"],
      workshopId: item["workshop-id"],
      image: imagePath,
      sourceImage: image,
    };
  })
  .sort((a, b) => Date.parse(b.date ?? "") - Date.parse(a.date ?? ""));

const assets = [
  ...projects.filter((x) => x.sourceImage).map((x) => [x.sourceImage, `public${x.image}`]),
  ...skins.filter((x) => x.sourceImage).map((x) => [x.sourceImage, `public${x.image}`]),
];

for (let i = 0; i < assets.length; i += 8) {
  await Promise.all(assets.slice(i, i + 8).map(([url, path]) => download(url, path)));
  process.stdout.write(`\rDownloaded ${Math.min(i + 8, assets.length)}/${assets.length} assets`);
}

const stripSource = ({ sourceImage, ...item }) => item;
await writeFile("src/content/projects.json", JSON.stringify(projects.map(stripSource), null, 2) + "\n");
await writeFile("src/content/skins.json", JSON.stringify(skins.map(stripSource), null, 2) + "\n");
process.stdout.write(`\nImported ${projects.length} projects and ${skins.length} finishes.\n`);
