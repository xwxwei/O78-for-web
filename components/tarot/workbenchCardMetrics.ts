export const WORKBENCH_CARD_SIZE = "workbench" as const;
export const WORKBENCH_CARD_OFFSET = {
  x: 41.5,
  y: 70.5,
};

export const CARD_RING_RADIUS = 430;
export const CARD_RING_HEIGHT = {
  base: 276,
  sm: 332,
};
export const CARD_RING_ORIGIN_TOP = {
  base: 520,
  sm: 600,
};

export function getWorkbenchStackOffset(index: number) {
  return {
    x: (index % 7) * 0.45,
    y: (index % 9) * 0.35,
    rotate: (index % 5 - 2) * 0.35,
  };
}

export function getCardRingPoint(index: number, total: number, rotationOffset = 0) {
  const angleStep = total > 0 ? 360 / total : 0;
  const angle = index * angleStep + rotationOffset;
  const radians = (angle * Math.PI) / 180;

  return {
    angle,
    x: Math.sin(radians) * CARD_RING_RADIUS,
    y: -Math.cos(radians) * CARD_RING_RADIUS,
  };
}

export function getCardRingOriginY(viewportHeight: number, viewportWidth: number) {
  const isSmallViewport = viewportWidth >= 640;
  const height = isSmallViewport ? CARD_RING_HEIGHT.sm : CARD_RING_HEIGHT.base;
  const originTop = isSmallViewport ? CARD_RING_ORIGIN_TOP.sm : CARD_RING_ORIGIN_TOP.base;

  return viewportHeight - height + originTop;
}
