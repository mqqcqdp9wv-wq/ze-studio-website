"use client";

import { useState } from "react";
import { motion, PanInfo } from "framer-motion";

type CardData = {
    title: string;
    description: string;
    glowColor: string;
    numberPrefix?: string;
    href?: string;
    icon?: React.FC;
    pattern?: string;
    animClass?: string;
};

// pos 0 = front, 1 = middle, 2 = back
const POSITIONS = [
    { y: 0,  scale: 1,    opacity: 1,    blur: 0, zIndex: 30 },
    { y: 14, scale: 0.97, opacity: 0.72, blur: 1, zIndex: 20 },
    { y: 26, scale: 0.94, opacity: 0.45, blur: 2, zIndex: 10 },
];

export const MobileCardStack = ({ cards }: { cards: CardData[] }) => {
    // Last card (Rescue = index 2) starts on top
    const [activeIndex, setActiveIndex] = useState(cards.length - 1);
    const [flyingCardIndex, setFlyingCardIndex] = useState<number | null>(null);

    // Distance from active card: 0 = front, 1 = middle, 2 = back
    const getPos = (i: number) =>
        (activeIndex - i + cards.length) % cards.length;

    const handleSwipeLeft = (cardIndex: number) => {
        if (flyingCardIndex !== null) return; // prevent double-swipe
        setFlyingCardIndex(cardIndex);
        setTimeout(() => {
            setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);
            setFlyingCardIndex(null);
        }, 380);
    };

    return (
        <div className="md:hidden relative flex flex-col items-center pt-12 pb-8 w-full overflow-visible">
            {/* Background glow — shifts with active card */}
            <div
                className="pointer-events-none absolute inset-x-0 top-1/3 h-[400px] w-full opacity-10 blur-[100px] transition-all duration-700"
                style={{
                    background: `radial-gradient(circle at center, ${cards[activeIndex].glowColor}, transparent 70%)`,
                }}
            />

            {/* Card stack */}
            <div className="relative w-full px-4" style={{ height: "180px" }}>
                {cards.map((card, i) => {
                    const pos = getPos(i);
                    const p = POSITIONS[pos] ?? POSITIONS[POSITIONS.length - 1];
                    const isFront = pos === 0;
                    const isFlying = flyingCardIndex === i;

                    return (
                        <motion.div
                            key={card.title}
                            className="absolute inset-x-4 overflow-hidden border border-white/[0.06]"
                            style={{
                                background: card.pattern
                                    ? `${card.pattern}, linear-gradient(160deg, ${card.glowColor}30 0%, #000 40%, #000 100%)`
                                    : `linear-gradient(160deg, ${card.glowColor}30 0%, #000 60%)`,
                                borderRadius: "2rem",
                                minHeight: "140px",
                                zIndex: p.zIndex,
                                cursor: isFront ? "pointer" : "default",
                                touchAction: isFront ? "none" : "auto",
                            }}
                            animate={
                                isFlying
                                    ? { x: -440, y: -30, opacity: 0, rotate: -18, scale: 0.88 }
                                    : { x: 0, y: p.y, scale: p.scale, opacity: p.opacity, filter: `blur(${p.blur}px)`, rotate: 0 }
                            }
                            transition={{
                                duration: isFlying ? 0.38 : 0.55,
                                ease: isFlying ? [0.4, 0, 1, 1] : [0.16, 1, 0.3, 1],
                                delay: isFlying ? 0 : pos * 0.04,
                            }}
                            drag={isFront && !isFlying ? "x" : false}
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={{ left: 0.8, right: 0.12 }}
                            onDragEnd={(_: unknown, info: PanInfo) => {
                                if (info.offset.x < -70 || info.velocity.x < -500) {
                                    handleSwipeLeft(i);
                                }
                            }}
                            onTap={() => {
                                if (isFront && card.href) {
                                    window.location.href = card.href;
                                }
                            }}
                        >
                            {/* Glow orb */}
                            <div
                                className="pointer-events-none absolute inset-0 opacity-50"
                                style={{ background: `radial-gradient(ellipse 80% 55% at 50% 30%, ${card.glowColor}cc, transparent 70%)` }}
                            />
                            {/* Top edge highlight */}
                            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                            {/* Material animation */}
                            {card.animClass && (
                                <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden" style={{ borderRadius: "2rem" }}>
                                    <div className={card.animClass} />
                                </div>
                            )}

                            {/* Content */}
                            <div className="relative z-20 flex items-center gap-5 p-6 pr-5">
                                {/* Number badge */}
                                <div
                                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border"
                                    style={{
                                        borderColor: `${card.glowColor}40`,
                                        background: `${card.glowColor}15`,
                                        filter: "brightness(2.5)",
                                    }}
                                >
                                    <span className="font-mono text-[13px] font-bold leading-none" style={{ color: card.glowColor }}>
                                        {card.numberPrefix}
                                    </span>
                                </div>
                                {/* Text */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-mono text-[16px] font-bold uppercase tracking-tight text-white mb-1">
                                        {card.title}
                                    </h3>
                                    <p className="line-clamp-2 font-sans text-[13px] leading-relaxed text-white/50">
                                        {card.description}
                                    </p>
                                </div>
                                {/* Arrow → navigate to article (front card only) */}
                                {isFront && (
                                    <svg className="shrink-0 opacity-35" width="18" height="18" viewBox="0 0 16 16" fill="none">
                                        <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )}
                            </div>

                            {/* Bottom glow line */}
                            <div
                                className="absolute bottom-0 left-0 right-0 h-[2px] z-30"
                                style={{ background: `linear-gradient(90deg, transparent, ${card.glowColor}, transparent)`, filter: "brightness(2)" }}
                            />
                        </motion.div>
                    );
                })}
            </div>

            {/* Dot indicators */}
            <div className="flex items-center gap-2 mt-8 z-20">
                {cards.map((card, i) => (
                    <motion.div
                        key={i}
                        animate={{ width: i === activeIndex ? 20 : 6 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="h-[3px] rounded-full"
                        style={{
                            background: i === activeIndex ? card.glowColor : "rgba(255,255,255,0.2)",
                            filter: i === activeIndex ? "brightness(2.5)" : "none",
                        }}
                    />
                ))}
            </div>

            {/* Hint */}
            <div className="flex items-center gap-4 mt-5 opacity-25">
                <div className="h-[1px] w-5 bg-white/40" />
                <span className="font-mono text-[9px] uppercase tracking-[0.4em] font-bold text-white/80">
                    swipe ← next · tap → read
                </span>
                <div className="h-[1px] w-5 bg-white/40" />
            </div>
        </div>
    );
};
