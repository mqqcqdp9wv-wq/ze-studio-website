"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import classNames from "classnames";

type CardData = {
    title: string;
    description: string;
    glowColor: string;
    numberPrefix?: string;
    href?: string;
    icon?: React.FC;
};

// Z-depth transforms for each card (index 0 = back, 2 = front)
const STACK = [
    { z: -70, y: 22, opacity: 0.55, blur: 4 },
    { z: 10, y: -8, opacity: 0.85, blur: 1.5 },
    { z: 95, y: -36, opacity: 1, blur: 0 },
];

export const MobileCardStack = ({ cards }: { cards: CardData[] }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="md:hidden relative flex flex-col items-center gap-10 py-12 w-full overflow-visible">
            {/* Background Glow */}
            <div
                className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-[500px] w-full opacity-10 blur-[120px] transition-colors duration-1000"
                style={{
                    background: `radial-gradient(circle at center, ${cards[0].glowColor}, transparent 70%)`,
                    display: expanded ? 'none' : 'block'
                }}
            />

            <motion.ul
                className="relative w-full cursor-pointer flex flex-col items-center z-10 px-4"
                style={{
                    transformStyle: "preserve-3d",
                    perspective: "1000px",
                }}
                animate={{
                    gap: expanded ? "16px" : "0px",
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setExpanded((e) => !e)}
            >
                {cards.map((card, i) => {
                    const t = STACK[i] ?? STACK[STACK.length - 1];

                    return (
                        <motion.li
                            key={card.title}
                            className={classNames(
                                "relative list-none origin-bottom overflow-hidden backdrop-blur-2xl w-full max-w-[600px] transition-all duration-500 border border-white/[0.08]"
                            )}
                            style={{
                                background: `linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 50%, ${card.glowColor}15 100%)`,
                                borderRadius: "2rem",
                                boxShadow: `inset 0 1px 0 rgba(255,255,255,0.12), 0 0 40px 0 ${card.glowColor}08`,
                            }}
                            animate={{
                                transform: expanded
                                    ? "translateZ(0px) translateY(0px)"
                                    : `translateZ(${t.z}px) translateY(${t.y}px)`,
                                opacity: expanded ? 1 : t.opacity,
                                filter: expanded ? "blur(0px)" : `blur(${t.blur}px)`,
                            }}
                            whileHover={expanded ? {
                                boxShadow: `inset 0 1px 0 rgba(255,255,255,0.2), 0 0 60px 0 ${card.glowColor}20`,
                                x: 4,
                            } : {}}
                            transition={{
                                duration: 0.6,
                                delay: i * 0.05,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                        >
                            {/* Accent Glow */}
                            <div
                                className="pointer-events-none absolute bottom-0 left-0 right-0 h-3/4 opacity-20"
                                style={{
                                    background: `radial-gradient(ellipse 80% 60% at 50% 120%, ${card.glowColor}, transparent)`,
                                }}
                            />

                            {/* Top Highlight Lines */}
                            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                            <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/[0.04] to-transparent" />

                            <div className="relative z-10 flex items-center gap-6 p-6 pr-10">
                                {/* Number Circle (No more icons) */}
                                <div
                                    className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border"
                                    style={{
                                        borderColor: `${card.glowColor}40`,
                                        background: `${card.glowColor}10`
                                    }}
                                >
                                    <span
                                        className="font-mono text-[13px] font-bold leading-none"
                                        style={{ color: card.glowColor }}
                                    >
                                        {card.numberPrefix}
                                    </span>
                                </div>

                                {/* Content - Clearly separated */}
                                <div className="flex-1 overflow-hidden">
                                    <h3 className="font-mono text-[16px] font-bold uppercase tracking-tight text-white/90 mb-1">
                                        {card.title}
                                    </h3>
                                    <p className="line-clamp-2 md:line-clamp-none font-sans text-[13px] leading-relaxed text-white/45 font-normal">
                                        {card.description}
                                    </p>
                                </div>
                            </div>
                        </motion.li>
                    );
                })}
            </motion.ul>

            {/* Hint */}
            <div className="flex items-center gap-4 opacity-30 mt-2">
                <div className="h-[1px] w-5 bg-white/40" />
                <span className="font-mono text-[9px] uppercase tracking-[0.4em] font-bold text-white/80">
                    {expanded ? "protocol: system_collapse" : "protocol: access_stack"}
                </span>
                <div className="h-[1px] w-5 bg-white/40" />
            </div>
        </div>
    );
};
