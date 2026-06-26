import type { ReadingCard, ReadingRecord, SpreadConfig } from "@/lib/types";

export const JOURNAL_STORAGE_KEY = "o78.journal";

export function createReadingId() {
  return `reading-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function createReadingText(question: string, spread: SpreadConfig, cards: ReadingCard[]) {
  const names = cards.map(({ card }) => `${card.name} ${card.orientation === "reversed" ? "reversed" : "upright"}`);
  const summary = `This reading suggests ${names
    .slice(0, -1)
    .join(", ")}${names.length > 1 ? `, and ${names[names.length - 1]}` : names[0]} are moving through your question as a quiet emotional pattern.`;

  const interpretation = cards
    .map(
      ({ card, position }) =>
        `${position.label}: ${card.name} (${card.orientation}) may reflect ${card.keywords.join(", ")}. ${card.reflection}`,
    )
    .join("\n\n");

  return {
    summary,
    interpretation: `${interpretation}\n\nTaken together, the ${spread.name.toLowerCase()} invites reflection rather than certainty. Let the images point toward what feels true, and leave room for your own agency.`,
  };
}

export function saveReading(record: ReadingRecord) {
  if (typeof window === "undefined") {
    return;
  }

  const existing = getSavedReadings();
  window.localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify([record, ...existing]));
}

export function getSavedReadings(): ReadingRecord[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(JOURNAL_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ReadingRecord[]) : [];
  } catch {
    return [];
  }
}

export function getSavedReading(id: string) {
  return getSavedReadings().find((reading) => reading.id === id);
}
