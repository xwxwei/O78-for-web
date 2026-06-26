"use client";

import { useMemo, useState } from "react";
import { PrimaryNav } from "@/components/layout/PrimaryNav";
import { TarotCardView } from "@/components/tarot/TarotCardView";
import { getDailyCard } from "@/lib/tarot";

export function DailyExperience() {
  const [isRevealed, setIsRevealed] = useState(false);
  const card = useMemo(() => getDailyCard(), []);

  return (
    <main className="relative min-h-screen bg-o78-black px-6 pb-16 pt-28 text-white">
      <PrimaryNav />
      <section className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <p className="text-xs uppercase tracking-[0.28em] text-white/35">Daily ritual</p>
        <h1 className="mt-4 text-4xl font-light">A single card for the day.</h1>
        <div className="mt-14">
          {isRevealed ? <TarotCardView card={card} isRevealed /> : <TarotCardView isBack />}
        </div>

        {isRevealed ? (
          <div className="mt-10 max-w-xl">
            <p className="text-2xl font-light">{card.name}</p>
            <p className="mt-4 text-xs uppercase tracking-[0.24em] text-white/45">{card.keywords.join(" · ")}</p>
            <p className="mt-6 text-lg font-light leading-8 text-white/72">{card.reflection}</p>
            <div className="mt-10 border border-white/10 p-5 text-sm leading-6 text-white/45">
              A fuller interpretation and reflection prompt can become part of o78 Premium later.
            </div>
          </div>
        ) : (
          <button
            type="button"
            className="mt-10 border border-white/25 px-5 py-3 text-xs uppercase tracking-[0.24em] text-white/80 transition hover:border-white/60 hover:text-white"
            onClick={() => setIsRevealed(true)}
          >
            Reveal
          </button>
        )}
      </section>
    </main>
  );
}
