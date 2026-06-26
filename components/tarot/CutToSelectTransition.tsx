"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TarotCardView } from "@/components/tarot/TarotCardView";
import {
  CARD_RING_RADIUS,
  getCardRingOriginY,
  getWorkbenchStackOffset,
  WORKBENCH_CARD_OFFSET,
  WORKBENCH_CARD_SIZE,
} from "@/components/tarot/workbenchCardMetrics";
import type { DrawnTarotCard } from "@/lib/types";

type CutToSelectTransitionProps = {
  deck: DrawnTarotCard[];
  onComplete: () => void;
};

export function CutToSelectTransition({ deck, onComplete }: CutToSelectTransitionProps) {
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setViewport({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const completeTimeout = window.setTimeout(onComplete, 820);

    return () => {
      window.clearTimeout(completeTimeout);
    };
  }, [onComplete]);

  const ringOriginY = viewport.height ? getCardRingOriginY(viewport.height, viewport.width) : 0;
  const ringTopY = ringOriginY - CARD_RING_RADIUS;
  const ringTopOffsetY = viewport.height ? ringTopY - viewport.height / 2 : 0;

  return (
    <section className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {deck.map((card, index) => {
        const stackOffset = getWorkbenchStackOffset(index);

        return (
          <motion.div
            key={card.id}
            className="absolute left-1/2 top-1/2"
            initial={{
              x: -WORKBENCH_CARD_OFFSET.x + stackOffset.x,
              y: -WORKBENCH_CARD_OFFSET.y + stackOffset.y,
              rotate: stackOffset.rotate,
              opacity: 1,
              scale: 1,
            }}
            animate={{
              x: -WORKBENCH_CARD_OFFSET.x + stackOffset.x,
              y: ringTopOffsetY - WORKBENCH_CARD_OFFSET.y + stackOffset.y,
              rotate: stackOffset.rotate,
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.72,
              ease: [0.19, 1, 0.22, 1],
            }}
            style={{
              transformOrigin: "50% 155%",
              zIndex: index,
            }}
          >
            <TarotCardView card={card} isBack size={WORKBENCH_CARD_SIZE} ariaLabel={`Preparing card ${index + 1}`} />
          </motion.div>
        );
      })}
    </section>
  );
}
