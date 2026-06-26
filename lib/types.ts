export type SpreadLayout = "arc" | "line" | "cross" | "custom";

export type SpreadPosition = {
  id: string;
  label: string;
  meaning: string;
};

export type SpreadConfig = {
  id: string;
  name: string;
  cardCount: number;
  layout: SpreadLayout;
  positions: SpreadPosition[];
};

export type TarotCard = {
  id: string;
  name: string;
  number: string;
  imageSrc: string;
  keywords: string[];
  reflection: string;
};

export type TarotCardOrientation = "upright" | "reversed";

export type DrawnTarotCard = TarotCard & {
  orientation: TarotCardOrientation;
  isReversed: boolean;
  randomValue: number;
};

export type DrawState = "idle" | "selecting" | "selected" | "revealing" | "complete";

export type ReadingCard = {
  card: DrawnTarotCard;
  position: SpreadPosition;
};

export type ReadingRecord = {
  id: string;
  question: string;
  spreadId: string;
  spreadName: string;
  cards: ReadingCard[];
  summary: string;
  interpretation: string;
  createdAt: string;
};

export type CuratedReading = {
  id: string;
  question: string;
  cards: string[];
  summary: string;
  tags: string[];
};
