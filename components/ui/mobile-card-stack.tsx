"use client";

import { useState } from "react";

type CardData = {
    title: string;
    description: string;
    glowColor: string;
    numberPrefix?: string;
    href?: string;
};

// Z-depth transforms for each card (index 0 = back, 2 = front)
// Matches the freefrontend CSS demo logic
const STACK = [
    { z: -70, y: 22, opacity: 0.55, blur: 3.5 }, // card 1 — furthest back
    { z: 10, y: -8, opacity: 0.82, blur: 1.2 }, // card 2 — middle
    { z: 95, y: -36, opacity: 1, blur: 0 }, // card 3 — front / closest
];

export const MobileCardStack = ({ cards }: { cards: CardData[] }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="md:hidden flex flex-col items-center gap-6">
            <ul
                style={{
                    position: "relative",
                    transformStyle: "preserve-3d",
                    perspective: "500px",
                    display: "flex",
                    flexDirection: "column",
                    gap: expanded ? "14px" : "0",
                    transition: "gap 500ms ease",
                    width: "100%",
                }}
                onClick={() => setExpanded((e) => !e)}
            >
                {cards.map((card, i) => {
                    const t = STACK[i] ?? STACK[STACK.length - 1];

                    return (
                        <li
                            key={card.title}
                            style={{
                                listStyle: "none",
                                transform: expanded
                                    ? "translateZ(0) translateY(0)"
                                    : `translateZ(${t.z}px) translateY(${t.y}px)`,
                                opacity: expanded ? 1 : t.opacity,
                                filter: expanded ? "blur(0)" : `blur(${t.blur}px)`,
                                transition: `transform 500ms ${i * 60}ms ease, opacity 500ms ${i * 60}ms ease, filter 500ms ${i * 60}ms ease`,
                                borderRadius: "2.4rem",
                                overflow: "hidden",
                                border: "1px solid rgba(255,255,255,0.07)",
                                background: "#090909",
                                cursor: "pointer",
                                position: "relative",
                            }}
                        >
                            {/* Glow bg */}
                            <div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    pointerEvents: "none",
                                    background: `radial-gradient(ellipse 70% 55% at 65% 110%, ${card.glowColor}28, transparent)`,
                                }}
                            />

                            {/* Card content */}
                            <div
                                style={{
                                    position: "relative",
                                    zIndex: 1,
                                    padding: "1.8rem 2rem",
                                    display: "flex",
                                    gap: "1.4rem",
                                    alignItems: "center",
                                }}
                            >
                                {/* Dot */}
                                <div
                                    style={{
                                        flexShrink: 0,
                                        width: 36,
                                        height: 36,
                                        borderRadius: "50%",
                                        border: `1px solid ${card.glowColor}40`,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: 8,
                                            height: 8,
                                            borderRadius: "50%",
                                            background: card.glowColor,
                                            boxShadow: `0 0 10px 2px ${card.glowColor}70`,
                                        }}
                                    />
                                </div>

                                {/* Text */}
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                                        <span
                                            style={{
                                                fontFamily: "monospace",
                                                fontSize: 9,
                                                letterSpacing: "0.2em",
                                                textTransform: "uppercase",
                                                color: `${card.glowColor}90`,
                                            }}
                                        >
                                            {card.numberPrefix}
                                        </span>
                                        <h3
                                            style={{
                                                fontSize: 18,
                                                fontWeight: 700,
                                                letterSpacing: "-0.04em",
                                                color: "#fff",
                                                lineHeight: 1,
                                            }}
                                        >
                                            {card.title}
                                        </h3>
                                    </div>
                                    <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.42)", lineHeight: 1.5 }}>
                                        {card.description}
                                    </p>
                                </div>
                            </div>

                            {/* Bottom glow line */}
                            <div
                                style={{
                                    position: "absolute",
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    height: 1,
                                    background: `linear-gradient(90deg, transparent, ${card.glowColor}50, transparent)`,
                                }}
                            />
                        </li>
                    );
                })}
            </ul>

            {/* Hint */}
            <span
                style={{
                    fontFamily: "monospace",
                    fontSize: 10,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.2)",
                }}
            >
                {expanded ? "tap to collapse" : "tap to expand"}
            </span>
        </div>
    );
};
