import { spreads } from "@/data/spreads";

export function getSpread(spreadId: string) {
  return spreads.find((spread) => spread.id === spreadId);
}

export function getDefaultSpread() {
  return spreads[0];
}
