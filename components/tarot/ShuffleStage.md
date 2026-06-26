# ShuffleStage

`ShuffleStage` owns the visual hand-shuffle step before cutting.

It is an animation-only ritual stage. It does not change the actual deck order, selected cards, card orientation, spread logic, or reading result.

## Responsibilities

- Render all cards inside the shuffle area.
- Let users click or drag to trigger another shuffle motion.
- Slow shuffle input with a throttle so the motion feels hand-paced.
- Capture a `ShuffleSnapshot` when the user continues, so the next transition starts from the visible card positions.
- Keep the fixed bottom action button out of the shuffle area.

## Props

```ts
type ShuffleStageProps = {
  deck: DrawnTarotCard[];
  onComplete: (snapshot: ShuffleSnapshot) => void;
};
```

## Snapshot Contract

`ShuffleSnapshot` passes the card positions and shuffle-area center offset to `ShuffleToCutTransition`.

```ts
type ShuffleSnapshot = {
  positions: ShufflePosition[];
  stageSize: {
    width: number;
    height: number;
  };
  stageCenterOffset: {
    x: number;
    y: number;
  };
};
```

## Iteration Notes

- Shuffle trigger speed is controlled by the `840ms` guard in `shuffleCards`.
- Card movement duration is controlled by the `2.1s` transition on each card.
- Shuffle area size is controlled by the stage `className`.
- Shared card size and center offset come from `workbenchCardMetrics.ts`.
- Keep real deck randomization outside this component.
