import type { DrawState } from "@/lib/types";

type DrawControlsProps = {
  state: DrawState;
  selectedCount: number;
  requiredCount: number;
  onReveal: () => void;
  onComplete: () => void;
  onReset: () => void;
};

export function DrawControls({
  state,
  selectedCount,
  requiredCount,
  onReveal,
  onComplete,
  onReset,
}: DrawControlsProps) {
  const ready = selectedCount === requiredCount;
  const canReset = state === "selecting";

  return (
    <div className="mt-10 flex items-center justify-center gap-3">
      {state === "complete" ? (
        <button
          type="button"
          className="border border-white/35 px-5 py-3 text-xs uppercase tracking-[0.24em] text-white transition hover:border-white/70"
          onClick={onComplete}
        >
          Receive reading
        </button>
      ) : (
        <button
          type="button"
          className="border border-white/25 px-5 py-3 text-xs uppercase tracking-[0.24em] text-white/80 transition disabled:pointer-events-none disabled:opacity-30 hover:border-white/60 hover:text-white"
          disabled={!ready || state === "revealing"}
          onClick={onReveal}
        >
          {state === "revealing" ? "Revealing" : `Reveal ${selectedCount}/${requiredCount}`}
        </button>
      )}

      {canReset ? (
        <button type="button" className="px-4 py-3 text-xs text-white/45 transition hover:text-white" onClick={onReset}>
          Reset
        </button>
      ) : null}
    </div>
  );
}
