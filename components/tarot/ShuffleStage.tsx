"use client";

import { useEffect, useMemo, useRef, useState, type PointerEvent } from "react";
import { motion } from "framer-motion";
import { TarotCardView } from "@/components/tarot/TarotCardView";
import { WORKBENCH_CARD_OFFSET, WORKBENCH_CARD_SIZE } from "@/components/tarot/workbenchCardMetrics";
import type { DrawnTarotCard } from "@/lib/types";

export type ShufflePosition = {
  x: number;
  y: number;
  rotate: number;
};

export type ShuffleSnapshot = {
  positions: ShufflePosition[];
  stageSize: {
    width: number;
    height: number;
  };
  stageCenterOffset: {
    x: number;
    y: number;
  };
};

type ShuffleStageProps = {
  deck: DrawnTarotCard[];
  onComplete: (snapshot: ShuffleSnapshot) => void;
};

function createShufflePositions(count: number, width: number, height: number, seed = 0): ShufflePosition[] {
  const availableWidth = Math.max(80, width - WORKBENCH_CARD_OFFSET.x * 2.3);
  const availableHeight = Math.max(120, height - WORKBENCH_CARD_OFFSET.y * 2.1);

  return Array.from({ length: count }, (_, index) => {
    const wave = seed * 0.73 + index * 1.91;
    const x = (Math.random() - 0.5) * availableWidth + Math.sin(wave) * 10;
    const y = (Math.random() - 0.5) * availableHeight + Math.cos(wave) * 12;
    const rotate = (Math.random() - 0.5) * 58;

    return { x, y, rotate };
  });
}

export function ShuffleStage({ deck, onComplete }: ShuffleStageProps) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const lastShuffleAtRef = useRef(0);
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });
  const [shuffleCount, setShuffleCount] = useState(0);
  const positions = useMemo(
    () => createShufflePositions(deck.length, stageSize.width, stageSize.height, shuffleCount),
    [deck.length, shuffleCount, stageSize.height, stageSize.width],
  );

  useEffect(() => {
    if (!stageRef.current) {
      return;
    }

    const observer = new ResizeObserver(([entry]) => {
      setStageSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });

    observer.observe(stageRef.current);
    return () => observer.disconnect();
  }, []);

  function shuffleCards() {
    const now = window.performance.now();
    if (now - lastShuffleAtRef.current < 840) {
      return;
    }

    lastShuffleAtRef.current = now;
    setShuffleCount((current) => current + 1);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.buttons !== 1) {
      return;
    }

    shuffleCards();
  }

  function completeShuffle() {
    const stageRect = stageRef.current?.getBoundingClientRect();

    onComplete({
      positions,
      stageSize,
      stageCenterOffset: stageRect
        ? {
            x: stageRect.left + stageRect.width / 2 - window.innerWidth / 2,
            y: stageRect.top + stageRect.height / 2 - window.innerHeight / 2,
          }
        : { x: 0, y: 0 },
    });
  }

  return (
    <section className="relative z-20 flex min-h-0 flex-1 flex-col items-center pb-24 sm:pb-28">
      <motion.div
        ref={stageRef}
        className="relative my-5 aspect-[3/4] min-h-[210px] max-h-full w-auto max-w-[78vw] flex-1 touch-none select-none sm:my-6 sm:min-h-[260px]"
        aria-label="Shuffle deck"
        onPointerDown={shuffleCards}
        onPointerMove={handlePointerMove}
      >
        {deck.map((card, index) => {
          const position = positions[index] ?? { x: 0, y: 0, rotate: 0 };

          return (
            <motion.div
              key={card.id}
              className="pointer-events-none absolute left-1/2 top-1/2"
              animate={{
                x: position.x - WORKBENCH_CARD_OFFSET.x,
                y: position.y - WORKBENCH_CARD_OFFSET.y,
                rotate: position.rotate,
              }}
              transition={{ duration: 2.1, ease: [0.19, 1, 0.22, 1] }}
              style={{ zIndex: index }}
            >
              <TarotCardView card={card} isBack size={WORKBENCH_CARD_SIZE} ariaLabel={`Shuffle card ${index + 1}`} />
            </motion.div>
          );
        })}
      </motion.div>

      <button
        type="button"
        className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 rounded-full border border-white/25 bg-white/[0.06] px-6 py-3 text-sm font-light text-white/78 shadow-[0_18px_60px_rgba(0,0,0,0.35)] backdrop-blur-md transition hover:border-white/60 hover:bg-white/[0.1] hover:text-white"
        onClick={completeShuffle}
      >
        Ready to Cut
      </button>
    </section>
  );
}
