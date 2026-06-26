"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PrimaryNav } from "@/components/layout/PrimaryNav";
import { getSavedReadings } from "@/lib/readings";
import type { ReadingRecord } from "@/lib/types";

function formatMonth(date: string) {
  return new Intl.DateTimeFormat("en", { month: "long", year: "numeric" }).format(new Date(date));
}

export function JournalPage() {
  const [readings, setReadings] = useState<ReadingRecord[]>([]);

  useEffect(() => {
    setReadings(getSavedReadings());
  }, []);

  return (
    <main className="relative min-h-screen bg-o78-black px-6 pb-16 pt-28 text-white">
      <PrimaryNav />
      <section className="mx-auto max-w-3xl">
        <p className="text-xs uppercase tracking-[0.28em] text-white/35">Private journal</p>
        <h1 className="mt-4 text-4xl font-light">Your readings, kept quietly.</h1>

        <div className="mt-12 border border-white/10 p-5 text-sm leading-6 text-white/45">
          Sign in will protect and sync this journal later. For the MVP flow, readings are saved privately in this browser.
        </div>

        {readings.length ? (
          <div className="mt-10 space-y-5">
            {readings.map((reading) => (
              <Link
                key={reading.id}
                href={`/result/${reading.id}`}
                className="block border border-white/10 p-6 transition hover:border-white/25"
              >
                <p className="text-xs uppercase tracking-[0.22em] text-white/35">{formatMonth(reading.createdAt)}</p>
                <h2 className="mt-4 text-xl font-light leading-7">{reading.question}</h2>
                <p className="mt-4 text-sm text-white/50">
                  {reading.cards.map(({ card }) => card.name).join(" · ")}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-12 text-center">
            <p className="text-white/55">No readings have been saved in this browser yet.</p>
            <Link
              href="/home"
              className="mt-8 inline-block border border-white/25 px-5 py-3 text-xs uppercase tracking-[0.24em] text-white/80"
            >
              Begin a reading
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
