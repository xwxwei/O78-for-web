import type { SpreadConfig } from "@/lib/types";

export const threeCardSpread: SpreadConfig = {
  id: "three-card",
  name: "Three Card Spread",
  cardCount: 3,
  layout: "line",
  positions: [
    {
      id: "past",
      label: "Past",
      meaning: "What has shaped the emotional pattern behind the question.",
    },
    {
      id: "present",
      label: "Present",
      meaning: "What is asking for attention in the current moment.",
    },
    {
      id: "future",
      label: "Future",
      meaning: "A possible direction or invitation, not a fixed prediction.",
    },
  ],
};

export const spreads: SpreadConfig[] = [threeCardSpread];
