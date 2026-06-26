# HomeBackground

`HomeBackground` is the homepage background orchestrator.

It owns background composition and future background selection. Individual visual systems should live in `effects/` and stay independent from the homepage input and navigation.

## Files

- `HomeBackground.tsx`: chooses and renders the active background effect.
- `effects/GameOfLifeEffect.tsx`: current Conway's Game of Life canvas effect.

## Adding More Backgrounds

Create a new effect component under `effects/`, then add it to `backgroundEffects`.

```tsx
const backgroundEffects = [
  {
    id: "game-of-life",
    component: GameOfLifeEffect,
  },
  {
    id: "new-effect",
    component: NewEffect,
  },
];
```

Later, `HomeBackground` can choose a random effect on first mount or choose from user settings.

## Effect Rules

- Effects should be `pointer-events-none`.
- Effects should not know about the hero input, route state, or tarot flow.
- Effects should keep visual contrast low enough to avoid competing with the center ritual input.
- Shared overlays such as the center glow belong in `HomeBackground`, not in each effect.
