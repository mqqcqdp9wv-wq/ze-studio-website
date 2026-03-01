"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type CardData = {
    title: string;
    description: string;
    glowColor: string;
    numberPrefix?: string;
    href?: string;
};

const CARD_HEIGHT = 270;
const PEEK = 20; // px each behind card peeks below

export const MobileCardStack = ({ cards }: { cards: CardData[] }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const total = cards.length;

    const handleTap = () => {
        setActiveIndex((prev) => (prev + 1) % total);
    };

    return (
        <div className="md:hidden flex flex-col items-center gap-5">
            {/* Stack */}
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    height: CARD_HEIGHT + (total - 1) * PEEK,
                }}
            >
                {cards.map((card, i) => {
                    // offset: 0 = active/front, 1 = mid, 2 = back
                    const offset = (i - activeIndex + total) % total;

                    return (
                        <motion.div
                            key={card.title}
                            onClick={handleTap}
                            animate={{
                                top: offset * PEEK,
                                scale: 1 - offset * 0.05,
                                zIndex: total - offset,
                                filter: `blur(${offset * 1.2}px)`,
                                opacity: offset === total - 1 ? 0.55 : 1,
                            }}
                            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                                position: "absolute",
                                left: 0,
                                right: 0,
                                height: CARD_HEIGHT,
                                transformOrigin: "top center",
                                cursor: "pointer",
                            }}
                            className="overflow-hidden rounded-[2.4rem] border border-white/[0.07] bg-[#080808]"
                        >
                            {/* Glow background */}
                            <div
                                className="pointer-events-none absolute inset-0"
                                style={{
                                    background: `radial-gradient(ellipse 80% 60% at 65% 110%, ${card.glowColor}30, transparent)`,
                                }}
                            />

                            {/* Content */}
                            <div className="relative z-10 flex h-full flex-col justify-between p-7">
                                {/* Top row */}
                                <div className="flex items-center justify-between">
                                    <span
                                        className="font-mono text-[10px] tracking-[0.2em] uppercase"
                                        style={{ color: `${card.glowColor}99` }}
                                    >
                                        {card.numberPrefix}
                                    </span>
                                    <span
                                        className="h-[7px] w-[7px] rounded-full"
                                        style={{
                                            background: card.glowColor,
                                            boxShadow: `0 0 10px 2px ${card.glowColor}80`,
                                        }}
                                    />
                                </div>

                                {/* Title + desc */}
                                <div>
                                    <h3 className="mb-2 text-[26px] font-bold tracking-tighter text-white leading-none">
                                        {card.title}
                                    </h3>
                                    <p className="text-[13px] leading-relaxed text-white/45">
                                        {card.description}
                                    </p>
                                </div>
                            </div>

                            {/* Bottom glow line */}
                            <div
                                className="absolute bottom-0 left-0 h-[1px] w-full"
                                style={{
                                    background: `linear-gradient(90deg, transparent, ${card.glowColor}60, transparent)`,
                                }}
                            />
                        </motion.div>
                    );
                })}
            </div>

            {/* Dot indicators */}
            <div className="flex items-center gap-2 pt-1">
                {cards.map((card, i) => (
                    <button
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        style={{
                            width: i === activeIndex ? 18 : 5,
                            height: 5,
                            borderRadius: 99,
                            background: i === activeIndex ? card.glowColor : "rgba(255,255,255,0.18)",
                            transition: "all 0.35s ease",
                        }}
                    />
                ))}
            </div>

            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/20">
                tap to explore
            </span>
        </div>
    );
};
