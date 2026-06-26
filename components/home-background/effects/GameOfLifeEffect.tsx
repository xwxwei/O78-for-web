"use client";

import { useEffect, useRef } from "react";

const CELL_SIZE = 14;
const STEP_INTERVAL_MS = 3000;
const SEED_RADIUS = 7;
const SEED_POINTS = 7;
const MIN_SEED_DISTANCE_RATIO = 0.22;
const MAX_SEED_ATTEMPTS = 400;
const RESIZE_SETTLE_MS = 300;

type Grid = Uint8Array;

function createGrid(cols: number, rows: number) {
  return new Uint8Array(cols * rows);
}

function seedFromRandomPoint(grid: Grid, cols: number, rows: number) {
  const seeds: Array<{ x: number; y: number }> = [];
  const minDistance = Math.max(8, Math.min(cols, rows) * MIN_SEED_DISTANCE_RATIO);
  let attempts = 0;

  while (seeds.length < SEED_POINTS && attempts < MAX_SEED_ATTEMPTS) {
    attempts += 1;
    const centerX = Math.floor(Math.random() * cols);
    const centerY = Math.floor(Math.random() * rows);
    const isFarEnough = seeds.every((seed) => Math.hypot(seed.x - centerX, seed.y - centerY) >= minDistance);

    if (isFarEnough) {
      seeds.push({ x: centerX, y: centerY });
    }
  }

  while (seeds.length < SEED_POINTS) {
    seeds.push({
      x: Math.floor(Math.random() * cols),
      y: Math.floor(Math.random() * rows),
    });
  }

  for (const seed of seeds) {
    for (let y = seed.y - SEED_RADIUS; y <= seed.y + SEED_RADIUS; y += 1) {
      for (let x = seed.x - SEED_RADIUS; x <= seed.x + SEED_RADIUS; x += 1) {
        if (x < 0 || x >= cols || y < 0 || y >= rows) {
          continue;
        }

        const distance = Math.hypot(x - seed.x, y - seed.y);
        const density = Math.max(0.12, 0.56 - distance * 0.045);

        if (Math.random() < density) {
          grid[y * cols + x] = 1;
        }
      }
    }
  }
}

function countNeighbors(grid: Grid, cols: number, rows: number, x: number, y: number) {
  let count = 0;

  for (let dy = -1; dy <= 1; dy += 1) {
    for (let dx = -1; dx <= 1; dx += 1) {
      if (dx === 0 && dy === 0) {
        continue;
      }

      const nx = x + dx;
      const ny = y + dy;

      if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
        count += grid[ny * cols + nx];
      }
    }
  }

  return count;
}

function stepGrid(grid: Grid, cols: number, rows: number) {
  const next = createGrid(cols, rows);

  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
      const index = y * cols + x;
      const alive = grid[index] === 1;
      const neighbors = countNeighbors(grid, cols, rows, x, y);

      if ((alive && (neighbors === 2 || neighbors === 3)) || (!alive && neighbors === 3)) {
        next[index] = 1;
      }
    }
  }

  return next;
}

function resizeGrid(grid: Grid, oldCols: number, oldRows: number, nextCols: number, nextRows: number) {
  const next = createGrid(nextCols, nextRows);
  const copyCols = Math.min(oldCols, nextCols);
  const copyRows = Math.min(oldRows, nextRows);

  for (let y = 0; y < copyRows; y += 1) {
    for (let x = 0; x < copyCols; x += 1) {
      next[y * nextCols + x] = grid[y * oldCols + x];
    }
  }

  return next;
}

function drawRoundedCell(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  context.beginPath();
  context.roundRect(x, y, width, height, radius);
  context.fill();
}

export function GameOfLifeEffect() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) {
      return;
    }

    const canvasElement = canvas;
    const canvasContext = context;
    let animationFrame = 0;
    let lastStepAt = 0;
    let cols = 0;
    let rows = 0;
    let currentGrid = createGrid(0, 0);
    let nextGrid = createGrid(0, 0);
    let resizeTimeout = 0;
    let isResizing = false;
    let cycleStartAt = 0;

    function resize({ shouldSeed }: { shouldSeed: boolean }) {
      const pixelRatio = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvasElement.width = Math.ceil(width * pixelRatio);
      canvasElement.height = Math.ceil(height * pixelRatio);
      canvasElement.style.width = `${width}px`;
      canvasElement.style.height = `${height}px`;
      canvasContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const nextCols = Math.ceil(width / CELL_SIZE);
      const nextRows = Math.ceil(height / CELL_SIZE);

      if (shouldSeed || cols === 0 || rows === 0) {
        currentGrid = createGrid(nextCols, nextRows);
        seedFromRandomPoint(currentGrid, nextCols, nextRows);
        nextGrid = stepGrid(currentGrid, nextCols, nextRows);
      } else if (nextCols !== cols || nextRows !== rows) {
        currentGrid = resizeGrid(currentGrid, cols, rows, nextCols, nextRows);
        nextGrid = stepGrid(currentGrid, nextCols, nextRows);
      }

      cols = nextCols;
      rows = nextRows;
    }

    function handleResize() {
      isResizing = true;
      resize({ shouldSeed: false });

      window.clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        isResizing = false;
        cycleStartAt = window.performance.now();
        lastStepAt = cycleStartAt;
      }, RESIZE_SETTLE_MS);
    }

    function draw(progress: number) {
      canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);

      for (let y = 0; y < rows; y += 1) {
        for (let x = 0; x < cols; x += 1) {
          const index = y * cols + x;
          const currentAlpha = currentGrid[index] ? 1 : 0;
          const targetAlpha = nextGrid[index] ? 1 : 0;
          const interpolatedAlpha = currentAlpha + (targetAlpha - currentAlpha) * progress;

          if (interpolatedAlpha <= 0.01) {
            continue;
          }

          const alpha = 0.055 + ((x + y) % 4) * 0.007;
          canvasContext.fillStyle = `rgba(214, 215, 220, ${alpha * interpolatedAlpha})`;
          drawRoundedCell(
            canvasContext,
            x * CELL_SIZE + 1,
            y * CELL_SIZE + 1,
            CELL_SIZE - 3,
            CELL_SIZE - 3,
            3,
          );
        }
      }
    }

    function tick(timestamp: number) {
      if (!cycleStartAt) {
        cycleStartAt = timestamp;
        lastStepAt = timestamp;
      }

      if (!isResizing && timestamp - lastStepAt >= STEP_INTERVAL_MS) {
        currentGrid = nextGrid;
        nextGrid = stepGrid(currentGrid, cols, rows);
        lastStepAt = timestamp;
        cycleStartAt = timestamp;
      }

      const progress = isResizing ? 0 : Math.min(1, (timestamp - cycleStartAt) / STEP_INTERVAL_MS);
      draw(progress);
      animationFrame = window.requestAnimationFrame(tick);
    }

    resize({ shouldSeed: true });
    animationFrame = window.requestAnimationFrame(tick);
    window.addEventListener("resize", handleResize);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 opacity-70 mix-blend-screen" aria-hidden="true" />;
}
