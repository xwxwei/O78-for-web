"use client";

import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

export type RitualCardSize = "standard" | "deck" | "workbench" | "mini";
export type RitualCardFace = "front" | "back" | "empty";

type RitualCardProps = {
  face?: RitualCardFace;
  size?: RitualCardSize;
  ariaLabel?: string;
  artworkSrc?: string;
  artworkAlt?: string;
  children?: ReactNode;
  footer?: ReactNode;
  isInteractive?: boolean;
  isSelected?: boolean;
  isRevealed?: boolean;
  isReversed?: boolean;
  layoutEnabled?: boolean;
  onSelect?: () => void;
  layoutId?: string;
  style?: CSSProperties;
};

export function RitualCard({
  face = "front",
  size = "standard",
  ariaLabel,
  artworkSrc,
  artworkAlt = "",
  children,
  footer,
  isInteractive = false,
  isSelected = false,
  isRevealed = false,
  isReversed = false,
  layoutEnabled = true,
  onSelect,
  layoutId,
  style,
}: RitualCardProps) {
  const interactive = isInteractive || Boolean(onSelect);
  const sizeClass =
    size === "mini"
      ? "h-24 w-14 sm:h-28 sm:w-16"
      : size === "workbench"
        ? "h-[141px] w-[83px]"
      : size === "deck"
        ? "h-36 w-20 sm:h-44 sm:w-[104px]"
        : "h-40 w-24 sm:h-48 sm:w-28";
  const orientationClass = isReversed ? "rotate-180" : "";

  if (face === "empty") {
    return (
      <motion.div
        layout={layoutEnabled}
        className={`relative shrink-0 rounded-md border border-dashed border-white/45 bg-[#0b0b0f]/90 opacity-95 shadow-[inset_0_0_34px_rgba(214,215,220,0.08),0_0_28px_rgba(11,11,15,0.92)] transition duration-700 ${sizeClass}`}
        style={style}
        aria-hidden="true"
      >
        <div className="absolute inset-[7px] rounded-[3px] border border-dashed border-white/[0.22]" />
        <div className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-[#0b0b0f]" />
      </motion.div>
    );
  }

  return (
    <motion.button
      layout={layoutEnabled}
      layoutId={layoutId}
      type="button"
      className={`relative shrink-0 overflow-hidden rounded-md border bg-[#111114] text-left transition-[transform,border-color,box-shadow,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${sizeClass} ${
        interactive ? "cursor-pointer hover:border-white/65 hover:shadow-[0_18px_48px_rgba(214,215,220,0.11)]" : "cursor-default"
      } ${isSelected ? "-translate-y-4 border-white/70" : "border-white/18"} ${
        isRevealed ? "shadow-[0_0_34px_rgba(214,215,220,0.12)]" : ""
      }`}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
      onClick={onSelect}
      disabled={!interactive}
      style={style}
      aria-label={ariaLabel}
    >
      <div className="absolute inset-[7px] rounded-[3px] border border-white/18" />
      {face === "back" ? (
        <div className={`absolute inset-0 ${orientationClass}`}>
          <img
            src="/cardback.png"
            alt=""
            className="h-full w-full object-cover"
            draggable={false}
          />
        </div>
      ) : (
        <div className={`relative flex h-full flex-col justify-between p-4 ${orientationClass}`}>
          {artworkSrc ? (
            <img
              src={artworkSrc}
              alt={artworkAlt}
              className="absolute inset-0 h-full w-full object-cover"
              draggable={false}
            />
          ) : (
            <>
              {children}
              {footer}
            </>
          )}
        </div>
      )}
    </motion.button>
  );
}
