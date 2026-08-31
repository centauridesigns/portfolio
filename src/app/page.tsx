import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/content";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <h1>
          <span className="identity"><strong>Souhail Ziani</strong> <i>/Centauri</i></span>
          <span className="role">Graphic designer</span>
          <span className="role">Programmer</span>
          <span className="role">Typographer</span>
          <span className="role">Part-time author</span>
        </h1>
      </section>
      <section className="project-list" aria-label="Selected projects">
        {projects.map((project, index) => <ProjectCard key={project.slug} project={project} priority={index === 0} />)}
      </section>
    </main>
  );
}
