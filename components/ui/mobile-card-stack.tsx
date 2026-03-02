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
    pattern?: string;
    animClass?: string;
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
                transition={{ duration: 0.8, ease: "easeInOut" }}
                onClick={() => setExpanded((e) => !e)}
            >
                {cards.map((card, i) => {
                    const t = STACK[i] ?? STACK[STACK.length - 1];

                    return (
                        <motion.li
                            key={card.title}
                            className="relative list-none origin-bottom overflow-hidden w-full max-w-[600px] border border-white/[0.06]"
                            style={{
                                background: card.pattern
                                    ? `${card.pattern}, linear-gradient(160deg, ${card.glowColor}30 0%, #000 40%, #000 100%)`
                                    : `linear-gradient(160deg, ${card.glowColor}30 0%, #000 60%)`,
                                borderRadius: "2rem",
                                minHeight: "140px",
                            }}
                            animate={{
                                transform: expanded
                                    ? "translateZ(0px) translateY(0px)"
                                    : `translateZ(${t.z}px) translateY(${t.y}px)`,
                                opacity: expanded ? 1 : t.opacity,
                                filter: expanded ? "blur(0px)" : `blur(${t.blur}px)`,
                            }}
                            transition={{
                                duration: 0.8,
                                delay: i * 0.06,
                                ease: "easeInOut",
                            }}
                        >
                            {/* Central glow orb */}
                            <div
                                className="pointer-events-none absolute inset-0 opacity-50"
                                style={{ background: `radial-gradient(ellipse 80% 55% at 50% 30%, ${card.glowColor}cc, transparent 70%)` }}
                            />
                            {/* Top edge highlight */}
                            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                            {/* Animation layer */}
                            {card.animClass && (
                                <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden" style={{ borderRadius: "2rem" }}>
                                    <div className={card.animClass} />
                                </div>
                            )}

                            {/* Content */}
                            <div className="relative z-20 flex items-center gap-5 p-6 pr-8">
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
                                <div className="flex-1 overflow-hidden">
                                    <h3 className="font-mono text-[16px] font-bold uppercase tracking-tight text-white mb-1">
                                        {card.title}
                                    </h3>
                                    <p className="line-clamp-2 font-sans text-[13px] leading-relaxed text-white/50">
                                        {card.description}
                                    </p>
                                </div>
                            </div>
                            {/* Bottom edge glow */}
                            <div
                                className="absolute bottom-0 left-0 right-0 h-[2px] z-30"
                                style={{ background: `linear-gradient(90deg, transparent, ${card.glowColor}, transparent)`, filter: "brightness(2)" }}
                            />
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
