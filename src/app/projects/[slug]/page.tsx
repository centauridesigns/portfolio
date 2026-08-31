import Image from "next/image";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { getProject, projects } from "@/lib/content";

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  return project ? { title: project.name, description: project.shortDescription } : {};
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const titleFluidSize = Math.min(8, 67.5 / (Math.max(project.name.length, 8) * 0.52));
  const detailHeroStyle = { "--detail-title-fluid": `${titleFluidSize}vw` } as CSSProperties;

  return (
    <main className="detail-page">
      <section className="detail-hero" style={detailHeroStyle}>
        <div className="detail-overlap">
          <div className="detail-heading">
            <h1>{project.name}</h1>
            <p>{project.year}</p>
          </div>
          {project.image && (
            <Image className="detail-image" src={project.image} alt={project.shortDescription} width={2000} height={1250} priority />
          )}
        </div>
      </section>
      <section className="detail-grid">
        <aside className="project-facts">
          {project.role && (
            <section className="project-fact">
              <h2>Capacity</h2>
              <p>{project.role}</p>
            </section>
          )}
          {project.teamHtml && (
            <section className="project-fact">
              <h2>Team</h2>
              <div className="team-values rich-text" dangerouslySetInnerHTML={{ __html: project.teamHtml }} />
            </section>
          )}
          {project.disciplinesHtml && (
            <section className="project-fact">
              <h2>Disciplines</h2>
              <div className="rich-text" dangerouslySetInnerHTML={{ __html: project.disciplinesHtml }} />
            </section>
          )}
        </aside>
        <div className="project-description rich-text" dangerouslySetInnerHTML={{ __html: project.detailsHtml ?? `<p>${project.shortDescription}</p>` }} />
      </section>
    </main>
  );
}
