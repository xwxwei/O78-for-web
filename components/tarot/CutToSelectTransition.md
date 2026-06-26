# CutToSelectTransition

`CutToSelectTransition` owns the transition from the centered cut pile to the card-selection ring.

It only moves the compact pile to the top of the future ring. The actual ring fan-out animation is owned by `CardRing`.

## Responsibilities

- Start from the same centered pile used by `CutStage`.
- Move the whole pile to the top point of the future selection ring.
- Avoid fan-out so the ring does not appear to unfold twice.
- Call `onComplete` after the pile reaches the ring entry position.

## Props

```ts
type CutToSelectTransitionProps = {
  deck: DrawnTarotCard[];
  onComplete: () => void;
};
```

## Continuity Rules

- Initial pile offsets come from `getWorkbenchStackOffset`.
- Ring top position is calculated from `getCardRingOriginY` and `CARD_RING_RADIUS`.
- Card size and center offset come from `workbenchCardMetrics.ts`.
- `CardRing` should use `enterFromTopPile` after this transition so its first frame matches this transition's final frame.

## Iteration Notes

- Transition completion timing is the `820ms` timeout.
- Movement duration is `0.72s`.
- This component should stay non-interactive.
- Do not add ring fan-out here; adjust `CardRing` for fan-out timing and easing.
