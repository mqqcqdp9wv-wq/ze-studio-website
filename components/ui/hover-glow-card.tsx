"use client";

import React, { useRef, useState } from "react";
import { useMotionValue, useMotionTemplate, motion } from "framer-motion";

type BentoCardProps = {
    title: string;
    description: string;
    glowColor?: string;
};

export const HoverGlowCard = ({
    title,
    description,
    glowColor = "#ffffff", // Default white glow
}: BentoCardProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative h-full w-full overflow-hidden rounded-[2.4rem] bg-[#0a0a0a] border border-white/10 md:rounded-[4.8rem] transition-all duration-300 transform-gpu"
        >
            {/* Background Glow Effect - Follows Mouse */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              ${glowColor}1A,
              transparent 40%
            )
          `,
                }}
            />

            {/* Border Glow Effect - Follows Mouse */}
            <motion.div
                className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              ${glowColor}66,
              transparent 40%
            )
          `,
                    WebkitMaskImage:
                        "linear-gradient(black, black) content-box, linear-gradient(black, black)",
                    WebkitMaskComposite: "xor",
                    padding: "1px",
                }}
            />

            <div className="relative z-10 flex h-full flex-col p-8 md:p-14 bg-gradient-to-b from-transparent to-[#0a0a0a]/50">
                <h3 className="mb-4 text-3xl font-semibold tracking-tight text-white">{title}</h3>
                <p className="max-w-[31rem] text-md leading-relaxed text-white/50">{description}</p>

                {/* Decorative subtle dot pattern on hover */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 opacity-0 transition-opacity duration-500 overflow-hidden mix-blend-overlay group-hover:opacity-20 pointer-events-none">
                    <svg width="100%" height="100%">
                        <pattern id="pattern-dots" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
                            <circle cx="2" cy="2" r="1" fill="#ffffff" />
                        </pattern>
                        <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-dots)" />
                    </svg>
                </div>
            </div>
        </div>
    );
};
