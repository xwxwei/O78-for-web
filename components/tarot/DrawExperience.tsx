"use client";

import { LayoutGroup } from "framer-motion";
import { useState } from "react";
import { CutStage } from "@/components/tarot/CutStage";
import { CutToSelectTransition } from "@/components/tarot/CutToSelectTransition";
import { useRouter } from "next/navigation";
import { DrawControls } from "@/components/tarot/DrawControls";
import { DrawWorkbenchHeader } from "@/components/tarot/DrawWorkbenchHeader";
import { QuestionPreview } from "@/components/tarot/QuestionPreview";
import { SelectedCardsDock } from "@/components/tarot/SelectedCardsDock";
import { ShuffleStage, type ShuffleSnapshot } from "@/components/tarot/ShuffleStage";
import { ShuffleToCutTransition } from "@/components/tarot/ShuffleToCutTransition";
import { SpreadRenderer } from "@/components/tarot/SpreadRenderer";
import { useCardDraw } from "@/hooks/useCardDraw";
import { createReadingId, createReadingText, saveReading } from "@/lib/readings";
import { getDefaultSpread } from "@/lib/spreads";
import type { ReadingRecord } from "@/lib/types";

type DrawExperienceProps = {
  question: string;
};

type WorkbenchStep = "shuffle" | "shuffle-to-cut" | "cut" | "cut-to-select" | "select";

export function DrawExperience({ question }: DrawExperienceProps) {
  const router = useRouter();
  const spread = getDefaultSpread();
  const draw = useCardDraw(spread);
  const [workbenchStep, setWorkbenchStep] = useState<WorkbenchStep>("shuffle");
  const [shuffleSnapshot, setShuffleSnapshot] = useState<ShuffleSnapshot | null>(null);
  const isChoosingCards = workbenchStep === "select" && draw.state === "selecting";

  function completeReading() {
    const id = createReadingId();
    const text = createReadingText(question, spread, draw.readingCards);
    const record: ReadingRecord = {
      id,
      question,
      spreadId: spread.id,
      spreadName: spread.name,
      cards: draw.readingCards,
      summary: text.summary,
      interpretation: text.interpretation,
      createdAt: new Date().toISOString(),
    };

    saveReading(record);
    router.replace(`/result/${id}`);
  }

  function resetWorkbench() {
    draw.reset();
    setShuffleSnapshot(null);
    setWorkbenchStep("shuffle");
  }

  function completeShuffle(snapshot: ShuffleSnapshot) {
    setShuffleSnapshot(snapshot);
    setWorkbenchStep("shuffle-to-cut");
  }

  return (
    <main className="relative h-screen overflow-hidden overscroll-none bg-o78-black text-white">
      <DrawWorkbenchHeader />

      <LayoutGroup>
        <section
          className={`relative z-20 mx-auto flex h-full max-w-5xl flex-col px-4 pt-20 sm:px-6 sm:pt-24 ${
            isChoosingCards ? "pb-[310px] sm:pb-[360px]" : "pb-8 sm:pb-10"
          }`}
        >
          <QuestionPreview question={question} />
          {workbenchStep === "shuffle" ? (
            <ShuffleStage deck={draw.deck} onComplete={completeShuffle} />
          ) : workbenchStep === "shuffle-to-cut" ? (
            <ShuffleToCutTransition
              deck={draw.deck}
              snapshot={shuffleSnapshot}
              onComplete={() => setWorkbenchStep("cut")}
            />
          ) : workbenchStep === "cut" ? (
            <CutStage deck={draw.deck} onComplete={() => setWorkbenchStep("cut-to-select")} />
          ) : workbenchStep === "cut-to-select" ? (
            <CutToSelectTransition deck={draw.deck} onComplete={() => setWorkbenchStep("select")} />
          ) : (
            <>
              <SelectedCardsDock
                spread={spread}
                selectedCards={draw.selectedCards}
                readingCards={draw.readingCards}
                revealedCount={draw.revealedCount}
              />
              <div className="relative z-30">
                <DrawControls
                  state={draw.state}
                  selectedCount={draw.selectedCards.length}
                  requiredCount={spread.cardCount}
                  onReveal={draw.revealCards}
                  onComplete={completeReading}
                  onReset={resetWorkbench}
                />
              </div>
            </>
          )}
        </section>
        {isChoosingCards ? (
          <SpreadRenderer
            deck={draw.deck}
            selectedIds={draw.selectedCards.map((card) => card.id)}
            maxCards={spread.cardCount}
            disabled={false}
            onSelect={draw.selectCard}
          />
        ) : null}
      </LayoutGroup>
    </main>
  );
}
