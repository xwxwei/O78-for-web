"use client";

const TOTAL_MARKS = 78;
const MARK_LENGTH = 8;

type HomeHeroOrbProps = {
  isActive?: boolean;
};

const marks = Array.from({ length: TOTAL_MARKS }, (_, index) => ({
  id: index,
  angle: (360 / TOTAL_MARKS) * index,
}));

export function HomeHeroOrb({ isActive = false }: HomeHeroOrbProps) {
  return (
    <div
      className="pointer-events-none relative h-[min(72vw,300px)] w-[min(72vw,300px)] min-h-[220px] min-w-[220px]"
      aria-hidden="true"
    >
      <div
        className={`absolute inset-0 rounded-full border-[8px] border-white transition duration-700 ${
          isActive ? "opacity-0 shadow-[0_0_56px_rgba(214,215,220,0.16)]" : "opacity-100 shadow-[0_0_28px_rgba(214,215,220,0.08)]"
        }`}
      />

      <div className={`absolute inset-0 transition duration-700 ${isActive ? "opacity-100" : "opacity-0"}`}>
        <div className="absolute inset-0 animate-[home-hero-orb-spin_720s_linear_infinite]">
          {marks.map((mark) => (
            <span
              key={mark.id}
              className="absolute inset-0"
              style={{
                transform: `rotate(${mark.angle}deg)`,
              }}
            >
              <span
                className="absolute left-1/2 top-0 block w-[2px] -translate-x-1/2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.72)]"
                style={{
                  height: MARK_LENGTH,
                }}
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
