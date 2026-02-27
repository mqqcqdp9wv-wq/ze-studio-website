"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type RevealCardProps = {
    title: string;
    description: string;
    glowColor?: string;
};

export const RevealCard = ({
    title,
    description,
    glowColor = "#ffffff",
}: RevealCardProps) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="group relative flex h-[320px] w-full flex-col justify-end overflow-hidden rounded-[2.4rem] border border-white/[0.08] bg-[#050505] p-8 transition-colors duration-500 hover:border-white/[0.15] md:p-10"
        >
            {/* Background Animated Pattern */}
            <AnimatePresence>
                {hovered && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="absolute inset-0 z-0"
                    >
                        {/* Dot grid pattern */}
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage: `radial-gradient(circle at center, ${glowColor}30 1px, transparent 1px)`,
                                backgroundSize: '24px 24px',
                            }}
                        />
                        {/* Overlay gradient to fade smoothly into the black background */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/10 to-transparent opacity-80" />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="relative z-10 mt-auto">
                <motion.div
                    animate={{ y: hovered ? -10 : 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* Accent icon/dot */}
                    <div
                        className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-500"
                        style={{ boxShadow: hovered ? `0 0 20px ${glowColor}40` : 'none', borderColor: hovered ? `${glowColor}50` : '' }}
                    >
                        <div className="h-3 w-3 rounded-full transition-transform duration-500 group-hover:scale-150" style={{ backgroundColor: glowColor, boxShadow: `0 0 10px ${glowColor}` }} />
                    </div>

                    <h3 className="text-3xl font-bold tracking-tight text-white mb-2">{title}</h3>
                </motion.div>

                {/* Description that reveals by sliding up into view */}
                <div className="relative h-0 lg:h-auto overflow-hidden lg:overflow-visible">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 20 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: hovered ? 0.1 : 0 }}
                        className="w-full pt-2"
                    >
                        <p className="text-md leading-relaxed text-white/60">
                            {description}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Large subtle glow orb at the bottom right */}
            <motion.div
                className="pointer-events-none absolute -bottom-12 -right-12 h-64 w-64 rounded-full blur-[100px]"
                style={{ background: glowColor }}
                initial={{ opacity: 0.05 }}
                animate={{ opacity: hovered ? 0.2 : 0.05, scale: hovered ? 1.1 : 1 }}
                transition={{ duration: 0.6 }}
            />
        </div>
    );
};
