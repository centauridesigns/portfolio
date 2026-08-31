import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/content";

export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <article className="project-card">
      <Link className="project-image" href={`/projects/${project.slug}`}>
        {project.image && (
          <Image
            src={project.image}
            alt={project.shortDescription}
            width={1800}
            height={1100}
            sizes="(max-width: 800px) 100vw, 94vw"
            priority={priority}
          />
        )}
      </Link>
      <div className="project-meta">
        <h2>{project.name}</h2>
        <p>{project.shortDescription}</p>
        <p className="project-year">{project.year}</p>
      </div>
    </article>
  );
}
