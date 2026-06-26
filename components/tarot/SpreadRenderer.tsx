"use client";

import { CardRing } from "@/components/card-ring";
import { TarotCardView } from "@/components/tarot/TarotCardView";
import { WORKBENCH_CARD_SIZE } from "@/components/tarot/workbenchCardMetrics";
import type { DrawnTarotCard } from "@/lib/types";

type SpreadRendererProps = {
  deck: DrawnTarotCard[];
  selectedIds: string[];
  maxCards: number;
  disabled?: boolean;
  onSelect: (card: DrawnTarotCard) => void;
};

export function SpreadRenderer({ deck, selectedIds, maxCards, disabled = false, onSelect }: SpreadRendererProps) {
  return (
    <CardRing
      items={deck}
      selectedIds={selectedIds}
      maxSelected={maxCards}
      disabled={disabled}
      enterFromTopPile
      onSelect={onSelect}
      renderItem={(card, { index, canSelect, isEntering }) => (
        <TarotCardView
          card={card}
          isBack
          isInteractive={canSelect}
          size={WORKBENCH_CARD_SIZE}
          ariaLabel={`Select card ${index + 1}`}
          layoutEnabled={!isEntering}
          layoutId={isEntering ? undefined : `draw-card-${card.id}`}
        />
      )}
    />
  );
}
