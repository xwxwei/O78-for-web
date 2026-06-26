import { tarotCards } from "@/data/tarotCards";
import type { DrawnTarotCard, TarotCard } from "@/lib/types";

export function getTarotCard(cardId: string): TarotCard | undefined {
  return tarotCards.find((card) => card.id === cardId);
}

export function drawUniqueCards(count: number, source: TarotCard[] = tarotCards) {
  return [...source].sort(() => Math.random() - 0.5).slice(0, count);
}

export function createDrawDeck(source: TarotCard[] = tarotCards): DrawnTarotCard[] {
  const deck = source.map<DrawnTarotCard>((card) => {
    const randomValue = Math.random();

    return {
      ...card,
      randomValue,
      isReversed: randomValue < 0.5,
      orientation: randomValue < 0.5 ? "reversed" : "upright",
    };
  });

  for (let index = deck.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [deck[index], deck[swapIndex]] = [deck[swapIndex], deck[index]];
  }

  return deck;
}

export function getDailyCard(date = new Date()) {
  const key = Number(
    `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(
      date.getDate(),
    ).padStart(2, "0")}`,
  );

  return tarotCards[key % tarotCards.length];
}
