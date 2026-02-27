"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";

type TiltRevealCardProps = {
    title: string;
    description: string;
    glowColor?: string;
    numberPrefix?: string;
    href?: string;
};

export const TiltRevealCard = ({
    title,
    description,
    glowColor = "#ffffff",
    numberPrefix,
    href,
}: TiltRevealCardProps) => {
    const ref = useRef<HTMLDivElement>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const tiltX = useMotionValue(0);
    const tiltY = useMotionValue(0);

    const tiltXSpring = useSpring(tiltX, { stiffness: 300, damping: 30 });
    const tiltYSpring = useSpring(tiltY, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(tiltYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(tiltXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);
    const shadowValue = useTransform(
        tiltYSpring,
        [-0.5, 0.5],
        ["0px 5px 20px rgba(0,0,0,0.5)", "0px 20px 40px rgba(0,0,0,0.7)"]
    );

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();

        const mX = e.clientX - rect.left;
        const mY = e.clientY - rect.top;

        mouseX.set(mX);
        mouseY.set(mY);
        tiltX.set(mX / rect.width - 0.5);
        tiltY.set(mY / rect.height - 0.5);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
        tiltX.set(0);
        tiltY.set(0);
    };

    const cardContent = (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                boxShadow: shadowValue,
            }}
            className="group relative cursor-pointer flex h-[350px] w-full flex-col justify-end overflow-hidden rounded-[2.4rem] border border-white/5 bg-[#0a0a0a] p-8 md:p-10 transition-colors duration-300 hover:border-white/20 hover:bg-[#111111]"
        >
            {/* LASER GLOW EFFECT follows mouse coordinates directly */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                    translateZ: "1px",
                    background: useMotionTemplate`
                    radial-gradient(
                      250px circle at ${mouseX}px ${mouseY}px,
                      ${glowColor}cc,
                      transparent 80%
                    )
                  `,
                }}
            />

            {/* ANIMATED DOT PATTERN (revealed on hover) */}
            <div className="absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-20"
                style={{
                    backgroundImage: `radial-gradient(circle at center, ${glowColor} 1.5px, transparent 1.5px)`,
                    backgroundSize: '24px 24px',
                }}
            />

            {/* Dynamic Colored Glow at the top left that shifts on tilt */}
            <motion.div
                className="absolute -left-1/4 -top-1/4 h-[150%] w-[150%] rounded-full opacity-10 blur-[80px] transition-all duration-500 group-hover:opacity-20"
                style={{
                    background: `radial-gradient(circle at center, ${glowColor}, transparent 50%)`,
                    x: useTransform(tiltXSpring, [-0.5, 0.5], [40, -40]),
                    y: useTransform(tiltYSpring, [-0.5, 0.5], [40, -40]),
                }}
            />

            {/* Floating Big Number behind text */}
            {numberPrefix && (
                <motion.div
                    style={{ translateZ: "50px" }}
                    className="pointer-events-none absolute right-6 top-6 select-none text-[8rem] font-bold leading-none tracking-tighter text-white/5 opacity-50 transition-opacity duration-500 group-hover:text-white/10 group-hover:opacity-100"
                >
                    {numberPrefix}
                </motion.div>
            )}

            {/* Content wrapped in Z-translation for true 3D pop effect */}
            <motion.div
                style={{ translateZ: "80px" }}
                className="relative z-10 flex flex-col gap-3"
            >
                <div className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: glowColor, boxShadow: `0 0 10px ${glowColor}` }} />
                    <h3 className="text-3xl font-bold tracking-tight text-white">{title}</h3>
                </div>

                {/* A cool arrow icon that slides in from the right */}
                <div className="absolute top-1/2 -right-12 -translate-y-1/2 opacity-0 transition-all duration-500 ease-[0.16,1,0.3,1] group-hover:right-8 group-hover:opacity-100">
                    <div
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
                        style={{ boxShadow: `0 0 20px ${glowColor}20` }}
                    >
                        <svg className="h-5 w-5" style={{ color: glowColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </div>
                </div>
            </motion.div>

            {/* Subtle border highlight line at the bottom */}
            <div
                className="absolute bottom-0 left-0 h-[2px] w-full scale-x-0 transition-transform duration-700 ease-out group-hover:scale-x-100"
                style={{ background: `linear-gradient(90deg, transparent, ${glowColor}, transparent)` }}
            />
        </motion.div>
    );

    if (href) {
        return (
            <Link href={href} className="w-full block appearance-none outline-none">
                {cardContent}
            </Link>
        );
    }

    return cardContent;
};
