"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!";

function randomChar() {
    return CHARS[Math.floor(Math.random() * CHARS.length)];
}

interface TextScrambleProps {
    text: string;
    className?: string;
    speed?: number;   // ms per frame
    delay?: number;   // ms before start
}

export const TextScramble = ({ text, className, speed = 35, delay = 0 }: TextScrambleProps) => {
    const [display, setDisplay] = useState<string>(text.replace(/./g, " "));
    const frameRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

    useEffect(() => {
        if (!inView) return;

        let iteration = 0;
        const total = text.length;

        const timer = setTimeout(() => {
            const run = () => {
                setDisplay(
                    text
                        .split("")
                        .map((char, i) => {
                            if (char === " ") return " ";
                            if (i < iteration) return char;
                            return randomChar();
                        })
                        .join("")
                );

                iteration += 0.5;

                if (iteration < total + 1) {
                    frameRef.current = setTimeout(run, speed);
                } else {
                    setDisplay(text);
                }
            };

            run();
        }, delay);

        return () => {
            clearTimeout(timer);
            if (frameRef.current) clearTimeout(frameRef.current);
        };
    }, [inView, text, speed, delay]);

    return (
        <span ref={ref} className={className}>
            {display}
        </span>
    );
};
