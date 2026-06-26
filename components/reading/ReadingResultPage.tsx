"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PrimaryNav } from "@/components/layout/PrimaryNav";
import { TarotCardView } from "@/components/tarot/TarotCardView";
import { getSavedReading } from "@/lib/readings";
import type { ReadingRecord } from "@/lib/types";

type ReadingResultPageProps = {
  readingId: string;
};

export function ReadingResultPage({ readingId }: ReadingResultPageProps) {
  const [reading, setReading] = useState<ReadingRecord | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setReading(getSavedReading(readingId) ?? null);
    setIsLoaded(true);
  }, [readingId]);

  if (!isLoaded) {
    return <main className="min-h-screen bg-o78-black text-white" />;
  }

  if (!reading) {
    return (
      <main className="relative min-h-screen bg-o78-black px-6 pt-28 text-white">
        <PrimaryNav />
        <div className="mx-auto max-w-xl text-center">
          <p className="text-xs uppercase tracking-[0.28em] text-white/35">Reading not found</p>
          <h1 className="mt-4 text-3xl font-light">This reading may only exist on the device that created it.</h1>
          <Link className="mt-8 inline-block border border-white/25 px-5 py-3 text-xs uppercase tracking-[0.24em]" href="/home">
            Begin again
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-o78-black px-6 pb-16 pt-28 text-white">
      <PrimaryNav />
      <section className="mx-auto max-w-4xl">
        <p className="text-xs uppercase tracking-[0.28em] text-white/35">{reading.spreadName}</p>
        <h1 className="mt-4 max-w-3xl text-3xl font-light leading-10">{reading.question}</h1>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {reading.cards.map(({ card, position }) => (
            <div key={position.id} className="flex flex-col items-center gap-4">
              <TarotCardView card={card} label={position.label} isRevealed />
              <p className="max-w-48 text-center text-xs leading-5 text-white/45">{position.meaning}</p>
            </div>
          ))}
        </div>

        <section className="mt-14 border-y border-white/10 py-10">
          <p className="text-xl font-light leading-8 text-white/85">{reading.summary}</p>
        </section>

        <section className="mt-10 max-w-3xl whitespace-pre-line text-base font-light leading-8 text-white/72">
          {reading.interpretation}
        </section>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link className="border border-white/25 px-5 py-3 text-xs uppercase tracking-[0.24em]" href="/journal">
            View journal
          </Link>
          <Link className="px-5 py-3 text-xs text-white/55 transition hover:text-white" href="/home">
            Ask another question
          </Link>
        </div>
      </section>
    </main>
  );
}
