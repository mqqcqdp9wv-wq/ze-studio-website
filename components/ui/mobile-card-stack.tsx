"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import classNames from "classnames";

type CardData = {
    title: string;
    description: string;
    glowColor: string;
    numberPrefix?: string;
    href?: string;
};

// Z-depth transforms for each card (index 0 = back, 2 = front)
// Matches the freefrontend CSS demo logic but enhanced for Framer Motion
const STACK = [
    { z: -70, y: 22, opacity: 0.55, blur: 4 }, // card 1 — furthest back
    { z: 10, y: -8, opacity: 0.85, blur: 1.5 }, // card 2 — middle
    { z: 95, y: -36, opacity: 1, blur: 0 }, // card 3 — front / closest
];

export const MobileCardStack = ({ cards }: { cards: CardData[] }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="md:hidden flex flex-col items-center gap-7 py-8">
            <motion.ul
                className="relative w-full cursor-pointer flex flex-col"
                style={{
                    transformStyle: "preserve-3d",
                    perspective: "800px",
                }}
                animate={{ gap: expanded ? "14px" : "0px" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setExpanded((e) => !e)}
            >
                {cards.map((card, i) => {
                    const t = STACK[i] ?? STACK[STACK.length - 1];

                    return (
                        <motion.li
                            key={card.title}
                            className="relative list-none origin-bottom overflow-hidden border border-white/[0.08] backdrop-blur-md"
                            style={{
                                background: "rgba(10, 10, 10, 0.75)",
                                borderRadius: "2rem",
                            }}
                            animate={{
                                transform: expanded
                                    ? "translateZ(0px) translateY(0px)"
                                    : `translateZ(${t.z}px) translateY(${t.y}px)`,
                                opacity: expanded ? 1 : t.opacity,
                                filter: expanded ? "blur(0px)" : `blur(${t.blur}px)`,
                            }}
                            transition={{
                                duration: 0.6,
                                delay: i * 0.05,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                        >
                            {/* Internal Glow Effect */}
                            <div
                                className="pointer-events-none absolute inset-0 opacity-40"
                                style={{
                                    background: `radial-gradient(ellipse 65% 50% at 80% 110%, ${card.glowColor}, transparent)`,
                                }}
                            />

                            {/* Glass subtle top highlight */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none" />

                            <div className="relative z-10 flex items-center gap-5 p-6 pr-8">
                                {/* Visual Indicator (Dot) */}
                                <div
                                    className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border"
                                    style={{ borderColor: `${card.glowColor}40` }}
                                >
                                    <motion.div
                                        className="h-2 w-2 rounded-full"
                                        style={{
                                            background: card.glowColor,
                                            boxShadow: `0 0 12px ${card.glowColor}`,
                                        }}
                                        animate={
                                            !expanded
                                                ? { scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }
                                                : { scale: 1, opacity: 1 }
                                        }
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }}
                                    />
                                    {!expanded && (
                                        <motion.div
                                            className="absolute inset-0 rounded-full"
                                            style={{ border: `1px solid ${card.glowColor}` }}
                                            animate={{ scale: [1, 1.3], opacity: [0.5, 0] }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: "easeOut",
                                            }}
                                        />
                                    )}
                                </div>

                                {/* Text Content */}
                                <div className="flex-1 overflow-hidden">
                                    <div className="mb-1 flex items-center gap-3">
                                        <span
                                            className="font-mono text-[9px] uppercase tracking-[0.2em]"
                                            style={{ color: `${card.glowColor}aa` }}
                                        >
                                            {card.numberPrefix}
                                        </span>
                                        <h3 className="font-mono text-md font-bold uppercase tracking-tighter text-white">
                                            {card.title}
                                        </h3>
                                    </div>
                                    <p className="line-clamp-2 font-sans text-xs leading-relaxed text-white/45">
                                        {card.description}
                                    </p>
                                </div>
                            </div>

                            {/* Technical Bottom Line */}
                            <div
                                className="absolute bottom-0 left-0 right-0 h-[1px] opacity-30"
                                style={{
                                    background: `linear-gradient(90deg, transparent, ${card.glowColor}, transparent)`,
                                }}
                            />
                        </motion.li>
                    );
                })}
            </motion.ul>

            {/* Control Hint */}
            <div className="flex items-center gap-3 opacity-30 group">
                <div className="h-[1px] w-4 bg-white/50" />
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] font-medium text-white select-none">
                    {expanded ? "protocol: collapse" : "protocol: expand"}
                </span>
                <div className="h-[1px] w-4 bg-white/50" />
            </div>
        </div>
    );
};
