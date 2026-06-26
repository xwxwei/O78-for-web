import Link from "next/link";
import { O78Logo } from "@/components/brand";

const ritualMoments = [
  {
    title: "Question",
    body: "A meaningful question becomes the center of attention before anything is drawn.",
  },
  {
    title: "Drawing",
    body: "The interface slows the moment down through quiet, tactile card selection.",
  },
  {
    title: "Reflection",
    body: "Interpretations stay symbolic and emotionally grounded, with room for agency.",
  },
];

const safetyPrinciples = [
  "No supernatural certainty",
  "No objective future prediction",
  "No medical, legal, financial, or crisis advice",
  "No language designed to create dependency",
];

export function MarketingHomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-o78-black text-white">
      <header className="absolute left-0 top-0 z-30 flex h-[72px] w-full items-center justify-between px-6 text-xs font-light leading-none text-white/80 sm:px-8">
        <Link className="flex items-center gap-3" href="/" aria-label="o78 official site">
          <O78Logo className="h-4 w-11 text-white" />
        </Link>

        <nav className="hidden items-center gap-8 sm:flex" aria-label="Official site navigation">
          <a className="transition hover:text-white" href="#ritual">
            Ritual
          </a>
          <a className="transition hover:text-white" href="#app">
            App
          </a>
          <a className="transition hover:text-white" href="#safety">
            Safety
          </a>
        </nav>

        <span className="text-white/55">App first</span>
      </header>

      <section className="relative isolate flex min-h-[78svh] items-center justify-center px-6 pb-10 pt-24 text-center sm:min-h-[82svh] sm:px-8">
        <div className="absolute inset-0 -z-20 bg-[#0b0b0f]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(145deg,rgba(176,190,205,0.08),rgba(11,11,15,0)_34%,rgba(166,139,110,0.07)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-36 bg-[linear-gradient(180deg,rgba(11,11,15,0),#0b0b0f)]" />

        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute left-1/2 top-[48%] h-[min(78vw,700px)] w-[min(78vw,700px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.08]" />
          <div className="absolute left-1/2 top-[48%] h-[min(58vw,520px)] w-[min(58vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.1]" />
          <div className="absolute left-1/2 top-[48%] h-[min(38vw,340px)] w-[min(38vw,340px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.12]" />
        </div>

        <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center" aria-hidden="true">
          <div className="relative h-[420px] w-[min(92vw,820px)] sm:h-[520px]">
            <img
              src="/tarot-card/high-priestess.png"
              alt=""
              className="absolute left-[2%] top-[28%] hidden h-56 w-auto rounded-md border border-white/10 object-cover opacity-24 shadow-[0_24px_70px_rgba(0,0,0,0.42)] [--marketing-card-rotation:-12deg] animate-[marketing-card-drift_18s_ease-in-out_infinite] motion-reduce:animate-none sm:block"
              draggable={false}
            />
            <img
              src="/cardback.png"
              alt=""
              className="absolute left-1/2 top-[14%] h-48 w-auto -translate-x-1/2 rotate-3 rounded-md border border-white/15 object-cover opacity-32 shadow-[0_28px_90px_rgba(0,0,0,0.5)] animate-[marketing-card-breathe_16s_ease-in-out_infinite] motion-reduce:animate-none sm:h-64 sm:opacity-50"
              draggable={false}
            />
            <img
              src="/tarot-card/moon.png"
              alt=""
              className="absolute right-[3%] top-[31%] hidden h-56 w-auto rounded-md border border-white/10 object-cover opacity-24 shadow-[0_24px_70px_rgba(0,0,0,0.42)] [--marketing-card-rotation:12deg] animate-[marketing-card-drift_20s_ease-in-out_infinite_reverse] motion-reduce:animate-none sm:block"
              draggable={false}
            />
          </div>
        </div>

        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center">
          <p className="mb-6 text-xs font-light uppercase leading-none text-white/45">Official website</p>
          <h1 className="text-6xl font-light leading-none text-white sm:text-8xl">o78</h1>
          <p className="mt-7 max-w-xl text-balance text-base font-light leading-7 text-white/72 [text-shadow:0_2px_24px_rgba(0,0,0,0.86)] sm:text-xl sm:leading-8">
            A quiet AI ritual for emotional reflection, shaped by tarot-inspired interaction and built for the app first.
          </p>
          <p className="mt-7 max-w-lg text-sm font-light leading-7 text-white/48 [text-shadow:0_2px_24px_rgba(0,0,0,0.86)] sm:text-base">
            Not fortune telling. Not certainty. A symbolic space for asking better questions and noticing what may be returning.
          </p>
        </div>
      </section>

      <section id="ritual" className="relative border-t border-white/[0.07] px-6 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-xs font-light leading-none text-white/42">The experience</p>
            <h2 className="mt-4 max-w-xl text-3xl font-light leading-tight text-white sm:text-5xl">
              Designed as a threshold, not a dashboard.
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {ritualMoments.map((moment) => (
              <article
                className="min-h-52 rounded-lg border border-white/[0.08] bg-white/[0.025] p-5 shadow-[inset_0_0_28px_rgba(255,255,255,0.015)]"
                key={moment.title}
              >
                <p className="text-sm font-light text-white/90">{moment.title}</p>
                <p className="mt-12 text-sm font-light leading-6 text-white/52">{moment.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="app" className="relative border-t border-white/[0.07] px-6 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div className="relative min-h-[360px] overflow-hidden rounded-lg border border-white/[0.08] bg-[#101014]">
            <div className="absolute inset-0 bg-[linear-gradient(150deg,rgba(255,255,255,0.055),rgba(255,255,255,0)_42%,rgba(166,139,110,0.08))]" />
            <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.14]" />
            <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.1]" />
            <img
              src="/tarot-card/star.png"
              alt=""
              className="absolute left-1/2 top-1/2 h-56 w-auto -translate-x-1/2 -translate-y-1/2 rotate-2 rounded-md border border-white/12 object-cover shadow-[0_28px_90px_rgba(0,0,0,0.58)] sm:h-64"
              draggable={false}
            />
          </div>

          <div>
            <p className="text-xs font-light leading-none text-white/42">App first</p>
            <h2 className="mt-4 text-3xl font-light leading-tight text-white sm:text-5xl">
              The website is now the front door while the mobile ritual takes shape.
            </h2>
            <p className="mt-6 text-base font-light leading-8 text-white/58">
              The deeper product work belongs in the app: repeated reflections, saved emotional context, and a private journal that can grow slowly over time.
            </p>
          </div>
        </div>
      </section>

      <section id="safety" className="relative border-t border-white/[0.07] px-6 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-xs font-light leading-none text-white/42">Interpretive safety</p>
            <h2 className="mt-4 text-3xl font-light leading-tight text-white sm:text-5xl">
              Reflective by design.
            </h2>
            <p className="mt-6 text-base font-light leading-8 text-white/58">
              o78 treats cards as symbolic prompts. Interpretations may suggest patterns, but the user remains the author of meaning and action.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {safetyPrinciples.map((principle) => (
              <div className="rounded-lg border border-white/[0.08] bg-white/[0.025] p-5" key={principle}>
                <p className="text-sm font-light leading-6 text-white/68">{principle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/[0.07] px-6 py-10 sm:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between text-xs font-light text-white/38">
          <O78Logo className="h-4 w-11 text-white/45" />
          <span>AI reflection interface</span>
        </div>
      </footer>
    </main>
  );
}
