"use client";

import type { CSSProperties } from "react";
import { RitualCard } from "@/components/card";
import type { DrawnTarotCard, TarotCard } from "@/lib/types";

type TarotCardViewProps = {
  card?: TarotCard | DrawnTarotCard;
  label?: string;
  ariaLabel?: string;
  size?: "standard" | "deck" | "workbench" | "mini";
  isBack?: boolean;
  isEmpty?: boolean;
  isInteractive?: boolean;
  isSelected?: boolean;
  isRevealed?: boolean;
  layoutEnabled?: boolean;
  onSelect?: () => void;
  layoutId?: string;
  style?: CSSProperties;
};

export function TarotCardView({
  card,
  label,
  ariaLabel,
  size = "standard",
  isBack = false,
  isEmpty = false,
  isInteractive = false,
  isSelected = false,
  isRevealed = false,
  layoutEnabled = true,
  onSelect,
  layoutId,
  style,
}: TarotCardViewProps) {
  const orientation = "orientation" in (card ?? {}) ? (card as DrawnTarotCard).orientation : undefined;
  const isCardReversed = "isReversed" in (card ?? {}) ? (card as DrawnTarotCard).isReversed : false;

  if (isEmpty) {
    return <RitualCard face="empty" size={size} layoutEnabled={layoutEnabled} style={style} />;
  }

  if (isBack) {
    return (
      <RitualCard
        face="back"
        size={size}
        ariaLabel={ariaLabel ?? "Select card"}
        isInteractive={isInteractive}
        isSelected={isSelected}
        isRevealed={isRevealed}
        layoutEnabled={layoutEnabled}
        isReversed={isCardReversed}
        onSelect={onSelect}
        layoutId={layoutId}
        style={style}
      />
    );
  }

  return (
    <RitualCard
      face="front"
      size={size}
      ariaLabel={ariaLabel ?? card?.name}
      isInteractive={isInteractive}
      isSelected={isSelected}
      isRevealed={isRevealed}
      layoutEnabled={layoutEnabled}
      isReversed={isCardReversed}
      onSelect={onSelect}
      layoutId={layoutId}
      style={style}
      artworkSrc={card?.imageSrc}
      artworkAlt={card?.name}
      footer={
        <div>
          <div className="mb-3 h-16 rounded-full border border-white/30 bg-[radial-gradient(circle,rgba(214,215,220,0.10),rgba(17,17,20,0)_70%)]" />
          <p className="text-sm font-light leading-5 text-white">{card?.name}</p>
          {orientation ? (
            <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-white/45">
              {orientation === "reversed" ? "Reversed" : "Upright"}
            </p>
          ) : null}
          {label ? <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-white/45">{label}</p> : null}
        </div>
      }
    >
      <div className="text-[10px] uppercase tracking-[0.22em] text-white/45">{card?.number}</div>
    </RitualCard>
  );
}
