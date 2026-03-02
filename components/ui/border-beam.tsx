"use client";

import { motion } from "framer-motion";

interface BorderBeamProps {
    duration?: number;
    size?: number;
    color?: string;
    delay?: number;
    borderWidth?: number;
}

export const BorderBeam = ({
    duration = 6,
    size = 40,
    color = "#fff",
    delay = 0,
    borderWidth = 1
}: BorderBeamProps) => {
    return (
        <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-[inherit]">
            <svg
                className="h-full w-full overflow-visible"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="beam-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor={color} stopOpacity="0" />
                        <stop offset="100%" stopColor={color} stopOpacity="1" />
                    </linearGradient>
                </defs>
                <motion.rect
                    width="100%"
                    height="100%"
                    rx="2rem"
                    fill="none"
                    stroke="url(#beam-grad)"
                    strokeWidth={borderWidth}
                    strokeLinecap="round"
                    strokeDasharray={`${size} 1000`}
                    initial={{ strokeDashoffset: 1000 }}
                    animate={{ strokeDashoffset: -1000 }}
                    transition={{
                        duration,
                        repeat: Infinity,
                        ease: "linear",
                        delay,
                    }}
                    style={{
                        filter: "blur(0.5px)",
                        opacity: 0.9
                    }}
                />
            </svg>
        </div>
    );
};
