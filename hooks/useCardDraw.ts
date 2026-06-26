"use client";

import { useEffect, useMemo, useState } from "react";
import { createDrawDeck } from "@/lib/tarot";
import type { DrawnTarotCard, DrawState, ReadingCard, SpreadConfig } from "@/lib/types";

export function useCardDraw(spread: SpreadConfig) {
  const [deckSeed, setDeckSeed] = useState(0);
  const [deck, setDeck] = useState<DrawnTarotCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<DrawnTarotCard[]>([]);
  const [revealedCount, setRevealedCount] = useState(0);
  const [state, setState] = useState<DrawState>("selecting");

  useEffect(() => {
    setDeck(createDrawDeck());
  }, [deckSeed]);

  const readingCards = useMemo<ReadingCard[]>(
    () =>
      selectedCards.map((card, index) => ({
        card,
        position: spread.positions[index],
      })),
    [selectedCards, spread.positions],
  );

  function selectCard(card: DrawnTarotCard) {
    if (state !== "selecting") {
      return;
    }

    setSelectedCards((current) => {
      if (current.some((selected) => selected.id === card.id)) {
        return current;
      }

      if (current.length >= spread.cardCount) {
        return current;
      }

      const next = [...current, card];
      setState(next.length === spread.cardCount ? "selected" : "selecting");
      return next;
    });
  }

  function revealCards() {
    if (selectedCards.length !== spread.cardCount || state === "revealing") {
      return;
    }

    setState("revealing");
    setRevealedCount(0);

    selectedCards.forEach((_, index) => {
      window.setTimeout(() => {
        setRevealedCount(index + 1);
        if (index === selectedCards.length - 1) {
          window.setTimeout(() => setState("complete"), 700);
        }
      }, 700 + index * 1050);
    });
  }

  function reset() {
    setSelectedCards([]);
    setRevealedCount(0);
    setState("selecting");
    setDeckSeed((current) => current + 1);
  }

  return {
    deck,
    readingCards,
    revealedCount,
    selectedCards,
    state,
    reset,
    revealCards,
    selectCard,
  };
}
