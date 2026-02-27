"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

const pairs = [
    { title: "RAYNO", subtitle: "Один производитель", arrow: true },
    { title: "ЕЛЕНА", subtitle: "Один мастер", arrow: true },
    { title: "ПРОТОКОЛ", subtitle: "Один подход", arrow: true },
];

const closing = "Для тех, кто выбирает осознанно.";

const allWordsList = [
    ...pairs.flatMap((p) => [
        ...p.title.split(" "),
        ...p.subtitle.split(" "),
        "→",
    ]),
    ...closing.split(" "),
];
const totalWords = allWordsList.length;

function Word({
    word,
    index,
    scrollYProgress,
    className = "",
}: {
    word: string;
    index: number;
    scrollYProgress: MotionValue<number>;
    className?: string;
}) {
    // Words reveal in first 30% of scroll — rest is reading time
    const start = (index / totalWords) * 0.30;
    const end = start + 0.05;

    const opacity = useTransform(scrollYProgress, [start, end], [0.05, 1]);
    const blur = useTransform(scrollYProgress, [start, end], [8, 0]);
    const filter = useTransform(blur, (b) => `blur(${b}px)`);

    return (
        <motion.span style={{ opacity, filter }} className={`inline-block ${className}`}>
            {word}&nbsp;
        </motion.span>
    );
}

export const Philosophy = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    // Track scroll within the scrollable wrapper (not the sticky viewport)
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start center", "end center"],
    });

    let cursor = 0;

    const renderedPairs = pairs.map((pair, pi) => {
        const titleWords = pair.title.split(" ");
        const subWords = pair.subtitle.split(" ");

        const titleNodes = titleWords.map((word, wi) => {
            const idx = cursor + wi;
            return (
                <Word key={`t-${pi}-${wi}`} word={word} index={idx} scrollYProgress={scrollYProgress} />
            );
        });
        cursor += titleWords.length;

        const subNodes = subWords.map((word, wi) => {
            const idx = cursor + wi;
            return (
                <Word key={`s-${pi}-${wi}`} word={word} index={idx} scrollYProgress={scrollYProgress} />
            );
        });
        cursor += subWords.length;

        const arrowIdx = cursor;
        cursor += 1;

        return (
            <div key={pi} className="mb-10 md:mb-12">
                <p className="text-5xl font-black uppercase leading-none tracking-[-0.02em] text-white md:text-7xl lg:text-[6rem]">
                    {titleNodes}
                </p>
                <p className="mt-2 text-xl font-light tracking-wide text-white/50 md:text-2xl lg:text-3xl">
                    {subNodes}
                    {pair.arrow && (
                        <Word
                            key={`a-${pi}`}
                            word="→"
                            index={arrowIdx}
                            scrollYProgress={scrollYProgress}
                            className="font-light text-white/40"
                        />
                    )}
                </p>
            </div>
        );
    });

    const closingNodes = closing.split(" ").map((word, wi) => {
        const idx = cursor + wi;
        return (
            <Word key={`c-${wi}`} word={word} index={idx} scrollYProgress={scrollYProgress} />
        );
    });

    return (
        <section
            ref={sectionRef}
            className="relative"
            style={{ height: "350vh" }}
        >
            <div className="sticky top-0 flex h-screen w-full items-center bg-background">
                <div className="mx-auto w-full max-w-4xl px-6 md:px-12 lg:px-20">
                    {renderedPairs}
                    <p className="mt-2 text-lg font-light italic tracking-wide text-white/30 md:text-xl lg:text-2xl">
                        {closingNodes}
                    </p>
                </div>
            </div>
        </section>
    );
};
