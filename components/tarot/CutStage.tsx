"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { TarotCardView } from "@/components/tarot/TarotCardView";
import {
  getWorkbenchStackOffset,
  WORKBENCH_CARD_OFFSET,
  WORKBENCH_CARD_SIZE,
} from "@/components/tarot/workbenchCardMetrics";
import type { DrawnTarotCard } from "@/lib/types";

type CutStageProps = {
  deck: DrawnTarotCard[];
  onComplete: () => void;
};

type CutAnimationType = "bottom-half" | "bottom-third" | "bottom-two-fifths";
type CutAnimationPhase = "extract" | "place";

type CutAnimation = {
  id: number;
  type: CutAnimationType;
  phase: CutAnimationPhase;
  movingIds: string[];
};

const cutTypes: CutAnimationType[] = ["bottom-half", "bottom-third", "bottom-two-fifths"];

function getBottomCutCount(total: number, type: CutAnimationType) {
  const half = Math.floor(total / 2);
  const third = Math.floor(total / 3);

  if (type === "bottom-half") {
    return half;
  }

  if (type === "bottom-third") {
    return third;
  }

  return Math.max(1, Math.floor(total * 0.4));
}

function getCutMotion(group: "moving" | "anchor", type: CutAnimationType, phase: CutAnimationPhase) {
  if (group === "anchor") {
    return {
      x: 0,
      y: 0,
      rotate: 0,
    };
  }

  if (phase === "place") {
    return {
      x: 0,
      y: -14,
      rotate: 0,
    };
  }

  if (type === "bottom-half") {
    return {
      x: -92,
      y: 72,
      rotate: -6,
    };
  }

  if (type === "bottom-third") {
    return {
      x: 92,
      y: 68,
      rotate: 6,
    };
  }

  return {
    x: 0,
    y: 104,
    rotate: 2,
  };
}

export function CutStage({ deck, onComplete }: CutStageProps) {
  const [cutAnimation, setCutAnimation] = useState<CutAnimation | null>(null);
  const [topLayerIds, setTopLayerIds] = useState<string[]>([]);
  const visibleDeck = deck;
  const idleMotion = useMemo(() => ({ x: 0, y: 0, rotate: 0 }), []);

  function cutDeck() {
    if (cutAnimation) {
      return;
    }

    const type = cutTypes[Math.floor(Math.random() * cutTypes.length)];
    const id = Date.now();
    const lowerDeck = visibleDeck.filter((card) => !topLayerIds.includes(card.id));
    const cutCount = getBottomCutCount(lowerDeck.length || visibleDeck.length, type);
    const movingIds = (lowerDeck.length ? lowerDeck : visibleDeck).slice(0, cutCount).map((card) => card.id);

    setCutAnimation({ id, type, phase: "extract", movingIds });
    window.setTimeout(() => {
      setTopLayerIds(movingIds);
      setCutAnimation({ id, type, phase: "place", movingIds });
    }, 520);
    window.setTimeout(() => setCutAnimation(null), 1120);
  }

  return (
    <section className="fixed inset-0 z-20 flex items-center justify-center">
      <div
        role="button"
        tabIndex={0}
        className="relative h-[300px] w-[280px] touch-manipulation"
        aria-label="Cut deck"
        onClick={cutDeck}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            cutDeck();
          }
        }}
      >
        {visibleDeck.map((card, index) => {
          const group = cutAnimation?.movingIds.includes(card.id) ? "moving" : "anchor";
          const cutMotion = cutAnimation ? getCutMotion(group, cutAnimation.type, cutAnimation.phase) : idleMotion;
          const stackOffset = getWorkbenchStackOffset(index);
          const isTopLayer = topLayerIds.includes(card.id);
          const zIndexBase = isTopLayer ? 200 : 0;

          return (
            <motion.div
              key={card.id}
              initial={false}
              className="pointer-events-none absolute left-1/2 top-1/2"
              animate={{
                x: -WORKBENCH_CARD_OFFSET.x + stackOffset.x + cutMotion.x,
                y: -WORKBENCH_CARD_OFFSET.y + stackOffset.y + cutMotion.y,
                rotate: stackOffset.rotate + cutMotion.rotate,
              }}
              transition={{
                duration: cutAnimation ? 0.5 : 0.58,
                delay: group === "moving" ? Math.min((index % 12) * 0.01, 0.07) : 0,
                ease: [0.19, 1, 0.22, 1],
              }}
              style={{
                zIndex:
                  group === "moving" && cutAnimation
                    ? cutAnimation.phase === "place"
                      ? 600 + index
                      : index
                    : group === "moving"
                      ? zIndexBase + index
                      : zIndexBase + index,
              }}
            >
              <TarotCardView card={card} isBack size={WORKBENCH_CARD_SIZE} ariaLabel={`Cut card ${index + 1}`} />
            </motion.div>
          );
        })}
      </div>

      <button
        type="button"
        className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 rounded-full border border-white/25 bg-white/[0.06] px-6 py-3 text-sm font-light text-white/78 shadow-[0_18px_60px_rgba(0,0,0,0.35)] backdrop-blur-md transition hover:border-white/60 hover:bg-white/[0.1] hover:text-white"
        onClick={onComplete}
      >
        Ready to Choose Cards
      </button>
    </section>
  );
}
