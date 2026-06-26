# CardRing

`CardRing` is the reusable circular card selector used by the draw flow.

It owns only the interaction system:

- 360 degree looping ring layout
- horizontal drag rotation
- drag versus tap detection
- controlled item hover state
- single-direction stacking order
- selected item removal from the visible ring

It does not know about tarot meanings, spreads, reading state, or card artwork.

## Files

- `CardRing.tsx`: generic ring component
- `index.ts`: public export

## Data Contract

Every item must have a stable `id`.

```ts
type CardRingItem = {
  id: string;
};
```

The caller owns the full item shape. For tarot, the item is currently `DrawnTarotCard`, which includes the card data plus the precomputed `orientation`, `isReversed`, and `randomValue`.

## Usage

```tsx
import { CardRing } from "@/components/card-ring";

<CardRing
  items={deck}
  selectedIds={selectedCards.map((card) => card.id)}
  maxSelected={3}
  disabled={false}
  onSelect={selectCard}
  renderItem={(card, { index, canSelect, isEntering, isHovered }) => (
    <TarotCardView
      card={card}
      isBack
      isInteractive={canSelect}
      size="workbench"
      ariaLabel={`Select card ${index + 1}`}
      layoutEnabled={!isEntering}
      layoutId={isEntering ? undefined : `draw-card-${card.id}`}
    />
  )}
/>
```

## Iteration Notes

- Change drag feel in `dragRing`, especially the `deltaX * 0.16` sensitivity.
- Change circle geometry in `components/tarot/workbenchCardMetrics.ts`, especially `CARD_RING_RADIUS`.
- Change visible window with `isNearViewport`.
- Change fan-out speed in `CardRing.tsx`; the default non-drag duration is currently `2.4s`.
- Use `enterFromTopPile` when the ring should unfold from the pile position created by `CutToSelectTransition`.
- During `enterFromTopPile`, hover, click, and Framer layout projection should stay disabled until the entering state completes.
- `isHovered` is cleared on drag, selection, and pointer leave. The ring uses this value to lift the number label and card together.
- Keep tarot-specific visuals outside this folder. Use `renderItem` for tarot cards, future oracle cards, or placeholder test cards.
- Do not put spread logic, reading generation, or journal behavior in this folder.
