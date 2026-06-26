# RitualCard

`RitualCard` is the reusable single-card visual component.

It owns only the card surface and micro-interactions:

- card size presets
- card back image from `/public/cardback.png`
- front artwork image rendering
- empty placeholder drawing
- shared card corner radius
- selected and revealed visual states
- static upright/reversed orientation
- Framer Motion `layoutId` support
- Optional `layoutEnabled` control for suppressing Framer layout projection during large entrance animations

It does not know about tarot card meanings, spreads, readings, journals, or the circular ring.

## Files

- `RitualCard.tsx`: generic single-card visual component
- `index.ts`: public export

## Usage

```tsx
import { RitualCard } from "@/components/card";

<RitualCard
  face="back"
  size="deck"
  isInteractive
  isReversed={card.isReversed}
  ariaLabel="Select card"
  layoutEnabled
  layoutId={`draw-card-${card.id}`}
/>
```

Front face:

```tsx
<RitualCard
  face="front"
  isRevealed
  isReversed={card.isReversed}
  artworkSrc={card.imageSrc}
  artworkAlt={card.name}
/>
```

## Iteration Notes

- Replace `public/cardback.png` to change the card back artwork without touching component logic.
- Front card art is passed through `artworkSrc`; tarot assets currently live under `public/tarot-card`.
- Adjust the card corner radius on the root `rounded-md` class in `RitualCard.tsx`.
- Hover lift for ring cards is owned by `components/card-ring`, so number labels and cards move together.
- Adjust size presets with `sizeClass`.
- Keep tarot-specific text and data mapping outside this folder.
- Keep circular layout and drag behavior in `components/card-ring`.
