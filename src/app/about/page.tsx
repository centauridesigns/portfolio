export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <main className="about-page">
      <section className="about-copy">
        <p className="eyebrow">Who am I?</p>
        <h1>
          I am a 24-year-old developer, graphic designer, texture artist, and part-time
          interaction designer with a love for experimentation and problem-solving. I am
          also an official Steam Workshop Contributor, responsible for the Atlas (2016)
          and TRANSIT (2024) finishes in CS2.
        </h1>
      </section>
      <footer className="socials">
        <a href="https://twitter.com/centauricontent">Twitter</a>
        <a href="https://instagram.com/centauricontent">Instagram</a>
        <a href="https://steamcommunity.com/id/centauricontent">Steam</a>
      </footer>
    </main>
  );
}
