# HomeHeroOrb

`HomeHeroOrb` is the homepage-specific ritual circle.

It is separate from `RitualHalo` so the homepage orb can evolve independently from other circular visuals.

## Behavior

- Default state: one clean circle.
- Active/input state: 78 equal-length vertical marks arranged evenly around the circle.
- Active mark ring rotates very slowly: 1 degree every 2 seconds.

## Usage

```tsx
<HomeHeroOrb isActive={isActive || question.length > 0} />
```

## Iteration Notes

- Total mark count is `TOTAL_MARKS`.
- Mark length is `MARK_LENGTH`.
- Rotation speed is set by the `home-hero-orb-spin` keyframe duration in `app/globals.css`.
- Size is capped at `300px` in `HomeHeroOrb.tsx`.
