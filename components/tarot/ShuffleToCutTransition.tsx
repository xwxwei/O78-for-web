"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { TarotCardView } from "@/components/tarot/TarotCardView";
import type { ShuffleSnapshot } from "@/components/tarot/ShuffleStage";
import {
  getWorkbenchStackOffset,
  WORKBENCH_CARD_OFFSET,
  WORKBENCH_CARD_SIZE,
} from "@/components/tarot/workbenchCardMetrics";
import type { DrawnTarotCard } from "@/lib/types";

type ShuffleToCutTransitionProps = {
  deck: DrawnTarotCard[];
  snapshot: ShuffleSnapshot | null;
  onComplete: () => void;
};

export function ShuffleToCutTransition({ deck, snapshot, onComplete }: ShuffleToCutTransitionProps) {
  useEffect(() => {
    const timeout = window.setTimeout(onComplete, 1450);
    return () => window.clearTimeout(timeout);
  }, [onComplete]);

  return (
    <section className="pointer-events-none fixed inset-0 z-20">
        {deck.map((card, index) => {
          const stackOffset = getWorkbenchStackOffset(index);
          const stageCenterOffset = snapshot?.stageCenterOffset ?? { x: 0, y: 0 };
          const initialPosition = snapshot?.positions[index] ?? {
            x: (index % 13) * 12 - 72,
            y: Math.floor(index / 13) * 18 - 64,
            rotate: (index % 9 - 4) * 5,
          };

          return (
            <motion.div
              key={card.id}
              className="pointer-events-none absolute left-1/2 top-1/2"
              initial={{
                x: stageCenterOffset.x + initialPosition.x - WORKBENCH_CARD_OFFSET.x,
                y: stageCenterOffset.y + initialPosition.y - WORKBENCH_CARD_OFFSET.y,
                rotate: initialPosition.rotate,
                opacity: 1,
              }}
              animate={{
                x: -WORKBENCH_CARD_OFFSET.x + stackOffset.x,
                y: -WORKBENCH_CARD_OFFSET.y + stackOffset.y,
                rotate: stackOffset.rotate,
                opacity: 1,
              }}
              transition={{
                duration: 1.15,
                delay: Math.min(index * 0.006, 0.26),
                ease: [0.19, 1, 0.22, 1],
              }}
              style={{ zIndex: index }}
            >
              <TarotCardView card={card} isBack size={WORKBENCH_CARD_SIZE} ariaLabel={`Gathering card ${index + 1}`} />
            </motion.div>
          );
        })}
    </section>
  );
}
