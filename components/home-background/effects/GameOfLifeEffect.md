# GameOfLifeEffect

`GameOfLifeEffect` is a low-contrast Conway's Game of Life background.

It owns only the canvas animation. It does not decide whether it is shown on the homepage, and it does not render shared homepage overlays.

## Behavior

- Full-window canvas.
- Fixed 7 random seed points.
- Seed points use a minimum distance rule to avoid clumping.
- Game state is preserved during window resize.
- Resize pauses evolution and resumes after the resize settles.
- Each 3000ms cycle precomputes the next generation.
- Cells fade between current and next generation over the same 3000ms cycle.
- Cells are drawn as rounded rectangles.

## Key Parameters

- `CELL_SIZE`: grid size in pixels.
- `STEP_INTERVAL_MS`: generation duration.
- `SEED_POINTS`: number of initial seed clusters.
- `MIN_SEED_DISTANCE_RATIO`: seed spacing.
- `SEED_RADIUS`: cluster size around each seed.

## Iteration Notes

- Keep this effect subtle. It should read as motion in peripheral vision, not as foreground content.
- If more homepage backgrounds are added, register them in `HomeBackground.tsx`.
