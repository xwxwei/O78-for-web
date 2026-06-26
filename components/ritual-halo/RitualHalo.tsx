type RitualHaloProps = {
  isActive?: boolean;
};

export function RitualHalo({ isActive = false }: RitualHaloProps) {
  return (
    <div
      className="pointer-events-none relative h-[min(72vw,300px)] w-[min(72vw,300px)] min-h-[220px] min-w-[220px]"
      aria-hidden="true"
    >
      <div
        className={`absolute inset-0 rounded-full border-[8px] border-white transition duration-700 ${
          isActive ? "shadow-[0_0_56px_rgba(214,215,220,0.16)]" : "shadow-[0_0_28px_rgba(214,215,220,0.08)]"
        }`}
      />
    </div>
  );
}
