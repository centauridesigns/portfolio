import Image from "next/image";
import { skins } from "@/lib/content";

export const metadata = { title: "Finishes" };

function formatDate(date: string | null) {
  if (!date) return "";
  return new Intl.DateTimeFormat("en", { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(date));
}

export default function SkinsPage() {
  return (
    <main className="skins-page">
      <header className="section-intro">
        <p>Steam Workshop</p>
        <h1>Finishes</h1>
        <p>{skins.length} submissions, newest first.</p>
      </header>
      <section className="skin-grid">
        {skins.map((skin, index) => (
          <article className="skin-card" key={skin.slug}>
            <a href={skin.workshopUrl} target="_blank" rel="noreferrer">
              {skin.image && <Image src={skin.image} alt="" width={900} height={600} priority={index < 3} />}
              <div className="skin-meta">
                <h2>{skin.name}</h2>
                <p>{formatDate(skin.date)}</p>
              </div>
            </a>
          </article>
        ))}
      </section>
    </main>
  );
}
