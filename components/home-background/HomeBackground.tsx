import { GameOfLifeEffect } from "@/components/home-background/effects/GameOfLifeEffect";

const backgroundEffects = [
  {
    id: "game-of-life",
    component: GameOfLifeEffect,
  },
];

export function HomeBackground() {
  const ActiveEffect = backgroundEffects[0].component;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <ActiveEffect />
      <div className="absolute left-1/2 top-1/2 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(214,215,220,0.045),rgba(11,11,15,0)_68%)]" />
    </div>
  );
}
