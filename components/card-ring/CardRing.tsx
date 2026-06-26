"use client";

import { useEffect, useMemo, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { motion } from "framer-motion";
import {
  CARD_RING_RADIUS,
  getCardRingPoint,
  getWorkbenchStackOffset,
  WORKBENCH_CARD_OFFSET,
} from "@/components/tarot/workbenchCardMetrics";

export type CardRingItem = {
  id: string;
};

type CardRingProps<TItem extends CardRingItem> = {
  items: TItem[];
  selectedIds: string[];
  maxSelected: number;
  disabled?: boolean;
  enterFromTopPile?: boolean;
  label?: string;
  renderItem: (item: TItem, state: { index: number; canSelect: boolean; isEntering: boolean; isHovered: boolean }) => ReactNode;
  onSelect: (item: TItem) => void;
};

export function CardRing<TItem extends CardRingItem>({
  items,
  selectedIds,
  maxSelected,
  disabled = false,
  enterFromTopPile = false,
  label = "Choose cards",
  renderItem,
  onSelect,
}: CardRingProps<TItem>) {
  const dragStartRef = useRef<{ x: number; angle: number } | null>(null);
  const didDragRef = useRef(false);
  const pendingSelectionRef = useRef<TItem | null>(null);
  const [rotationOffset, setRotationOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isEntering, setIsEntering] = useState(enterFromTopPile);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const ringLayout = useMemo(
    () =>
      items.map((item, index) => {
        const point = getCardRingPoint(index, items.length, rotationOffset);

        return {
          angle: point.angle,
          index,
          item,
          x: point.x,
          y: point.y,
        };
      }),
    [items, rotationOffset],
  );

  useEffect(() => {
    if (!enterFromTopPile) {
      return;
    }

    const timeout = window.setTimeout(() => setIsEntering(false), 2520);
    return () => window.clearTimeout(timeout);
  }, [enterFromTopPile]);

  function startDrag(event: PointerEvent<HTMLElement>) {
    const target = event.target as HTMLElement;
    const itemId = target.closest<HTMLElement>("[data-ring-item-id]")?.dataset.ringItemId;
    const pendingItem = itemId ? items.find((item) => item.id === itemId) : null;

    dragStartRef.current = { x: event.clientX, angle: rotationOffset };
    didDragRef.current = false;
    pendingSelectionRef.current =
      pendingItem && !isEntering && !disabled && !selectedIds.includes(pendingItem.id) && selectedIds.length < maxSelected
        ? pendingItem
        : null;
    setHoveredId(null);
    setIsDragging(false);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function dragRing(event: PointerEvent<HTMLElement>) {
    if (!dragStartRef.current) {
      return;
    }

    const deltaX = event.clientX - dragStartRef.current.x;
    if (Math.abs(deltaX) > 4) {
      didDragRef.current = true;
      setHoveredId(null);
      setIsDragging(true);
    }

    setRotationOffset(dragStartRef.current.angle + deltaX * 0.16);
  }

  function endDrag(event: PointerEvent<HTMLElement>) {
    const pendingItem = pendingSelectionRef.current;
    if (pendingItem && !didDragRef.current) {
      onSelect(pendingItem);
    }

    dragStartRef.current = null;
    pendingSelectionRef.current = null;
    setHoveredId(null);
    window.setTimeout(() => setIsDragging(false), 0);

    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      // Pointer capture may already be released by the browser.
    }
  }

  return (
    <section
      className="fixed inset-x-0 bottom-0 z-30 w-full overflow-hidden pt-2"
      aria-label={label}
      onPointerDown={startDrag}
      onPointerMove={dragRing}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={() => setHoveredId(null)}
    >
      <div className="relative h-[276px] touch-none select-none sm:h-[332px]">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-24 bg-gradient-to-r from-[#0b0b0f] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-24 bg-gradient-to-l from-[#0b0b0f] to-transparent" />
        <div className="absolute left-1/2 top-[520px] h-0 w-0 sm:top-[600px]" data-card-arc-origin>
          {ringLayout.map(({ angle, index, item, x, y }) => {
            const isSelected = selectedIds.includes(item.id);
            const isNearViewport = Math.abs(x) < 760 && y < -20;
            const shouldRender = isNearViewport && !isSelected;
            const canSelect = !isEntering && !disabled && !isSelected && selectedIds.length < maxSelected;
            const opacity = isNearViewport ? 1 : 0.22;
            const stackOrder = Math.round(x + 1000);
            const transition = isDragging
              ? { duration: 0.04, ease: "linear" as const }
              : { duration: 2.4, ease: [0.19, 1, 0.22, 1] as const };

            return (
              <motion.div
                key={item.id}
                className="absolute left-0 top-0"
                initial={
                  enterFromTopPile
                    ? {
                        opacity: 1,
                        x: -WORKBENCH_CARD_OFFSET.x + getWorkbenchStackOffset(index).x,
                        y: -CARD_RING_RADIUS - WORKBENCH_CARD_OFFSET.y + getWorkbenchStackOffset(index).y,
                        rotate: getWorkbenchStackOffset(index).rotate,
                        scale: 1,
                      }
                    : false
                }
                data-ring-item-id={shouldRender ? item.id : undefined}
                onPointerEnter={() => {
                  if (shouldRender && canSelect && !isDragging && !isEntering) {
                    setHoveredId(item.id);
                  }
                }}
                onPointerLeave={() => {
                  if (hoveredId === item.id) {
                    setHoveredId(null);
                  }
                }}
                animate={{
                  opacity,
                  x: x - WORKBENCH_CARD_OFFSET.x,
                  y: y - WORKBENCH_CARD_OFFSET.y,
                  rotate: angle,
                  scale: isNearViewport ? 1 : 0.92,
                }}
                transition={transition}
                style={{
                  pointerEvents: shouldRender && !isEntering ? "auto" : "none",
                  transformOrigin: "50% 155%",
                  zIndex: isSelected ? 5000 + stackOrder : stackOrder,
                }}
              >
                {shouldRender ? (
                  <motion.div
                    className="relative"
                    animate={{ y: !isEntering && canSelect && hoveredId === item.id ? -20 : 0 }}
                    transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="pointer-events-none absolute left-0 -top-4 z-10 text-[9px] font-light leading-none text-white/20">
                      {index + 1}
                    </span>
                    {renderItem(item, { index, canSelect, isEntering, isHovered: hoveredId === item.id })}
                  </motion.div>
                ) : null}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
