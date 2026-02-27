"use client";

import { motion } from "framer-motion";

export const TechnologyGraphic = () => {
    return (
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#0a0a0a]">
            {/* Background Grid */}
            <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                    backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            {/* Glowing Backdrop */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="h-64 w-64 rounded-full bg-[#4A7BF7]/10 blur-[100px]" />
            </div>

            {/* Main Abstract Composition */}
            <div className="relative h-64 w-full max-w-lg">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <svg className="h-full w-full" viewBox="0 0 200 100" overflow="visible">
                        {/* Base Layers */}
                        <path
                            d="M20 70 L100 90 L180 70"
                            fill="none"
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth="1"
                        />
                        <path
                            d="M30 60 L100 78 L170 60"
                            fill="none"
                            stroke="rgba(255,255,255,0.2)"
                            strokeWidth="1"
                        />

                        {/* Top Layer - The Film */}
                        <motion.path
                            d="M40 50 L100 65 L160 50"
                            fill="none"
                            stroke="#4A7BF7"
                            strokeWidth="2"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                        />

                        {/* Force Field / Shield over the layer */}
                        <motion.path
                            d="M50 35 Q 100 10 150 35"
                            fill="none"
                            stroke="#00E1F4"
                            strokeWidth="1.5"
                            strokeDasharray="4 4"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 0.8 }}
                            viewport={{ once: true }}
                            transition={{ delay: 1, duration: 1.5 }}
                        />

                        {/* Laser / Energy Deflection */}
                        <motion.line
                            x1="100" y1="0" x2="100" y2="45"
                            stroke="#8B5CF6"
                            strokeWidth="2"
                            initial={{ strokeDasharray: "0, 100" }}
                            whileInView={{ strokeDasharray: "45, 100" }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                        />

                        {/* Deflection particles */}
                        <motion.circle cx="100" cy="45" r="2" fill="#8B5CF6"
                            whileInView={{ scale: [1, 3], opacity: [1, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        <motion.circle cx="85" cy="40" r="1.5" fill="#00E1F4"
                            whileInView={{ x: -20, y: -10, opacity: [1, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                        />
                        <motion.circle cx="115" cy="40" r="1.5" fill="#4A7BF7"
                            whileInView={{ x: 20, y: -10, opacity: [1, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
                        />
                    </svg>
                </motion.div>
            </div>

            {/* Technical Labels */}
            <div className="absolute right-8 top-8 flex flex-col items-end gap-1">
                <span className="text-[10px] uppercase tracking-widest text-white/30">Nano-Matrix</span>
                <span className="text-[10px] uppercase tracking-widest text-[#00E1F4]/50">IR Rejected: 99%</span>
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                <div className="h-1 w-1 bg-[#4A7BF7]/50 rounded-full" />
                <span className="text-[9px] uppercase tracking-[0.4em] text-white/20">ZE.Studio Optical Engine</span>
                <div className="h-1 w-1 bg-[#4A7BF7]/50 rounded-full" />
            </div>
        </div>
    );
};
