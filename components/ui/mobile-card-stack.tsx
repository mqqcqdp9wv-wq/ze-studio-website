"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

type CardData = {
    title: string;
    description: string;
    glowColor: string;
    numberPrefix?: string;
    href?: string;
};

export const MobileCardStack = ({ cards }: { cards: CardData[] }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleTap = () => {
        setActiveIndex((prev) => (prev + 1) % cards.length);
    };

    return (
        <div className="flex flex-col items-center gap-6 md:hidden">
            {/* Stack area */}
            <div
                className="relative w-full"
                style={{ height: "300px", perspective: "900px" }}
            >
                {cards.map((card, i) => {
                    const offset = (i - activeIndex + cards.length) % cards.length;
                    const isActive = offset === 0;
                    const isMid = offset === 1;
                    // isFar = offset === 2

                    return (
                        <motion.div
                            key={card.title}
                            onClick={handleTap}
                            animate={{
                                scale: isActive ? 1 : isMid ? 0.93 : 0.87,
                                y: isActive ? 0 : isMid ? 22 : 44,
                                rotateX: isActive ? 0 : isMid ? 3 : 6,
                                opacity: isActive ? 1 : isMid ? 0.75 : 0.45,
                                filter: `blur(${isActive ? 0 : isMid ? 1.5 : 3}px)`,
                            }}
                            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                                position: "absolute",
                                inset: 0,
                                transformStyle: "preserve-3d",
                                transformOrigin: "top center",
                                zIndex: cards.length - offset,
                                cursor: "pointer",
                            }}
                            className="overflow-hidden rounded-[2.4rem] border border-white/[0.06] bg-[#0a0a0a]"
                        >
                            {/* Glow bg */}
                            <div
                                className="pointer-events-none absolute inset-0 opacity-20"
                                style={{
                                    background: `radial-gradient(ellipse 70% 60% at 60% 110%, ${card.glowColor}55, transparent)`,
                                }}
                            />

                            {/* Card content */}
                            <div className="relative z-10 flex h-full flex-col justify-between p-7">
                                {/* Top row: number + dot */}
                                <div className="flex items-center justify-between">
                                    <span
                                        className="font-mono text-[10px] font-medium tracking-[0.2em] uppercase opacity-40"
                                        style={{ color: card.glowColor }}
                                    >
                                        {card.numberPrefix}
                                    </span>
                                    <span
                                        className="h-2 w-2 rounded-full"
                                        style={{
                                            background: card.glowColor,
                                            boxShadow: `0 0 8px ${card.glowColor}`,
                                        }}
                                    />
                                </div>

                                {/* Bottom: title + description */}
                                <div>
                                    <h3 className="mb-2 text-2xl font-bold tracking-tighter text-white">
                                        {card.title}
                                    </h3>
                                    <p className="text-sm leading-relaxed text-white/50">
                                        {card.description}
                                    </p>
                                </div>
                            </div>

                            {/* Bottom border glow line */}
                            <div
                                className="absolute bottom-0 left-0 h-[1px] w-full"
                                style={{
                                    background: `linear-gradient(90deg, transparent, ${card.glowColor}80, transparent)`,
                                }}
                            />
                        </motion.div>
                    );
                })}
            </div>

            {/* Indicators + hint */}
            <div className="flex flex-col items-center gap-3">
                <div className="flex gap-2">
                    {cards.map((card, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveIndex(i)}
                            className="h-[3px] rounded-full transition-all duration-300"
                            style={{
                                width: i === activeIndex ? "20px" : "6px",
                                background: i === activeIndex ? card.glowColor : "rgba(255,255,255,0.2)",
                            }}
                        />
                    ))}
                </div>
                <span className="text-[11px] text-white/25 tracking-widest uppercase font-mono">
                    tap to explore
                </span>
            </div>
        </div>
    );
};
