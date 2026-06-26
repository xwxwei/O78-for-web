# CutStage

`CutStage` owns the visual cut-the-deck ritual step.

It is animation-only. It does not reorder the real deck, redraw cards, or change card orientation.

## Responsibilities

- Render the deck as a compact pile at the viewport center.
- Let users click the pile to perform a cut animation.
- Always move cards from the visual bottom portion of the deck.
- Randomly choose one of several cut styles.
- Return cards to a compact pile after every cut.
- Provide the fixed bottom action button that moves into card selection.

## Cut Types

Current cut types:

- `bottom-half`
- `bottom-third`
- `bottom-two-fifths`

Each cut has two phases:

- `extract`: bottom cards move away from the pile.
- `place`: those cards return to the top of the pile.

## Props

```ts
type CutStageProps = {
  deck: DrawnTarotCard[];
  onComplete: () => void;
};
```

## Iteration Notes

- Cut group size is controlled by `getBottomCutCount`.
- Cut movement distance is controlled by `getCutMotion`.
- The visible pile uses all `deck` cards, not a partial preview.
- Shared pile offsets come from `getWorkbenchStackOffset`.
- Keep real draw state and selected-card state outside this component.
