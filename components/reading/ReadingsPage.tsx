import { PrimaryNav } from "@/components/layout/PrimaryNav";
import { curatedReadings } from "@/data/curatedReadings";

export function ReadingsPage() {
  const [featured, ...readings] = curatedReadings;

  return (
    <main className="relative min-h-screen bg-o78-black px-6 pb-16 pt-28 text-white">
      <PrimaryNav />
      <section className="mx-auto max-w-5xl">
        <p className="text-xs uppercase tracking-[0.28em] text-white/35">Curated readings</p>
        <h1 className="mt-4 max-w-2xl text-4xl font-light leading-[1.15]">
          A quiet library of symbolic questions and emotional patterns.
        </h1>

        <article className="mt-12 border border-white/12 bg-white/[0.025] p-8">
          <p className="text-sm text-white/45">Featured</p>
          <h2 className="mt-4 text-3xl font-light">{featured.question}</h2>
          <p className="mt-6 text-sm text-white/60">{featured.cards.join(" · ")}</p>
          <p className="mt-5 max-w-2xl text-lg font-light leading-8 text-white/78">{featured.summary}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {featured.tags.map((tag) => (
              <span
                key={tag}
                className="border border-white/12 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-white/45"
              >
                {tag}
              </span>
            ))}
          </div>
        </article>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {readings.map((reading) => (
            <article key={reading.id} className="border border-white/10 p-6 transition hover:border-white/25">
              <h2 className="text-xl font-light leading-7">{reading.question}</h2>
              <p className="mt-5 text-xs leading-5 text-white/50">{reading.cards.join(" · ")}</p>
              <p className="mt-4 text-sm leading-6 text-white/68">{reading.summary}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {reading.tags.map((tag) => (
                  <span key={tag} className="text-[10px] text-white/35">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
