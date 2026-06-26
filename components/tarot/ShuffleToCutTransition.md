# ShuffleToCutTransition

`ShuffleToCutTransition` owns the transition from scattered shuffled cards into a centered deck pile.

It is an animation bridge between `ShuffleStage` and `CutStage`. Its final pile position must match the initial pile position used by `CutStage`.

## Responsibilities

- Start every card from the last visible shuffle position.
- Move all cards into a compact pile at the viewport center.
- Preserve card size and stack offsets used by cutting.
- Call `onComplete` after the transition finishes.

## Props

```ts
type ShuffleToCutTransitionProps = {
  deck: DrawnTarotCard[];
  snapshot: ShuffleSnapshot | null;
  onComplete: () => void;
};
```

## Continuity Rules

- Initial positions come from `snapshot.positions`.
- The shuffle-area-to-window offset comes from `snapshot.stageCenterOffset`.
- Final pile offsets come from `getWorkbenchStackOffset`.
- Card size and card center offset come from `workbenchCardMetrics.ts`.

## Iteration Notes

- Transition completion timing is the `1450ms` timeout.
- Per-card animation duration is `1.15s`.
- Per-card delay is capped at `0.26s`.
- If `CutStage` pile placement changes, update `getWorkbenchStackOffset` instead of editing this component directly.
