"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&!?";

function randomChar() {
    return CHARS[Math.floor(Math.random() * CHARS.length)];
}

interface TextScrambleProps {
    text: string;
    className?: string;
    delay?: number;  // ms before starting
}

export const TextScramble = ({ text, className, delay = 0 }: TextScrambleProps) => {
    const [display, setDisplay] = useState<string[]>(() => text.split("").map(() => " "));
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
    const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

    useEffect(() => {
        if (!inView) return;

        timersRef.current.forEach(clearTimeout);
        timersRef.current = [];

        const chars = text.split("");

        chars.forEach((targetChar, idx) => {
            if (targetChar === " ") {
                setDisplay(prev => {
                    const next = [...prev];
                    next[idx] = " ";
                    return next;
                });
                return;
            }

            // Each character gets a unique random start delay and scramble duration
            const charDelay = delay + Math.random() * 700 + idx * 55;
            const scrambleDuration = 450 + Math.random() * 1000; // 450–1450ms of scrambling
            const intervalSpeed = 65 + Math.random() * 90;        // 65–155ms per frame (slow & chaotic)

            let elapsed = 0;
            let settled = false;

            const startScramble = () => {
                const tick = () => {
                    if (settled) return;
                    elapsed += intervalSpeed;

                    if (elapsed >= scrambleDuration) {
                        settled = true;
                        setDisplay(prev => {
                            const next = [...prev];
                            next[idx] = targetChar;
                            return next;
                        });
                        return;
                    }

                    setDisplay(prev => {
                        const next = [...prev];
                        next[idx] = randomChar();
                        return next;
                    });

                    const jitter = Math.random() * 60 - 30;
                    const timer = setTimeout(tick, intervalSpeed + jitter);
                    timersRef.current.push(timer);
                };

                tick();
            };

            const startTimer = setTimeout(startScramble, charDelay);
            timersRef.current.push(startTimer);
        });

        return () => {
            timersRef.current.forEach(clearTimeout);
        };
    }, [inView, text, delay]);

    return (
        <span ref={ref} className={className}>
            {display.join("")}
        </span>
    );
};
