import { TarotCardView } from "@/components/tarot/TarotCardView";
import type { DrawnTarotCard, ReadingCard, SpreadConfig } from "@/lib/types";

type SelectedCardsDockProps = {
  spread: SpreadConfig;
  selectedCards: DrawnTarotCard[];
  readingCards: ReadingCard[];
  revealedCount: number;
};

export function SelectedCardsDock({
  spread,
  selectedCards,
  readingCards,
  revealedCount,
}: SelectedCardsDockProps) {
  return (
    <div className="relative z-30 mx-auto mt-8 grid max-w-3xl grid-cols-3 gap-3 px-4 sm:mt-10 sm:gap-8">
      {spread.positions.map((position, index) => {
        const selected = selectedCards[index];
        const readingCard = readingCards[index];
        const isRevealed = index < revealedCount && Boolean(readingCard);

        return (
          <div key={position.id} className="flex flex-col items-center gap-4">
            <p className="text-[10px] uppercase tracking-[0.24em] text-white/35">{position.label}</p>
            {isRevealed ? (
              <TarotCardView card={readingCard.card} isRevealed layoutId={`draw-card-${readingCard.card.id}`} />
            ) : selected ? (
              <TarotCardView
                card={selected}
                isBack
                ariaLabel={`${position.label} selected card`}
                layoutId={`draw-card-${selected.id}`}
              />
            ) : (
              <div className="flex h-40 w-24 items-center justify-center rounded-md border border-dashed border-white/15 bg-white/[0.015] text-[10px] uppercase tracking-[0.2em] text-white/30 transition duration-700 sm:h-48 sm:w-28">
                Awaiting
              </div>
            )}
            <p className="hidden max-w-44 text-center text-xs leading-5 text-white/35 sm:block">{position.meaning}</p>
          </div>
        );
      })}
    </div>
  );
}
