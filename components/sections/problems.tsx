"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Container } from "../container";
import {
    ThermometerSun,
    Sun,
    ShieldAlert,
    AlertCircle,
    Car,
} from "lucide-react";

const messages = [
    {
        icon: ThermometerSun,
        text: "Салон раскаляется за 10 минут на парковке. Кондиционер орёт — толку ноль.",
        author: "Владелец Camry 70",
    },
    {
        icon: Sun,
        text: "Солнце в лобовое слепит даже в поляризованных очках. На трассе страшно.",
        author: "Geely Monjaro",
    },
    {
        icon: ShieldAlert,
        text: "Плёнка пузырится и отходит по углам. Выглядит как колхоз через год.",
        author: "Haval Jolion 2024",
    },
    {
        icon: AlertCircle,
        text: "Опять штраф 5 тысяч за «зеркалку». Остановили прямо у дома.",
        author: "Toyota RAV4",
    },
    {
        icon: Car,
        text: "UV выжигает кожу на руле и сиденья. Дорогие кресла выцвели за один сезон.",
        author: "Chery Tiggo 8 Pro",
    },
];

/* ─── Individual Card ─── */
function ProblemCard({
    msg,
    index,
    total,
    progress,
    isInView,
}: {
    msg: (typeof messages)[0];
    index: number;
    total: number;
    progress: any;
    isInView: boolean;
}) {
    const Icon = msg.icon;

    // Each card reveals over its own slice of the scroll progress
    const start = index / total;
    const end = (index + 1) / total;

    const y = useTransform(progress, [start, end], [index * 40, 0]);
    const x = useTransform(progress, [start, end], [index * 20, 0]);
    const scale = useTransform(progress, [start, end], [0.92 - index * 0.03, 1]);
    const opacity = useTransform(progress, [start, end - 0.05], [0.3, 1]);

    return (
        <motion.div
            className="absolute w-full max-w-lg bg-black/40 backdrop-blur-xl border border-white/[0.08] rounded-3xl shadow-2xl overflow-hidden"
            style={{
                y,
                x,
                scale,
                opacity: isInView ? opacity : 0,
                zIndex: total - index,
                rotate: index * 1.2 - 2.5,
            }}
            initial={{ opacity: 0, y: 80 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: index * 0.12, ease: "easeOut" }}
        >
            <div className="p-8">
                <div className="flex items-start gap-4">
                    <Icon className="w-7 h-7 text-white/40 flex-shrink-0 mt-1" />
                    <div>
                        <p className="text-lg md:text-xl leading-relaxed text-white/85">
                            {msg.text}
                        </p>
                        <p className="mt-4 text-sm text-white/30">{msg.author}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

/* ─── Main Section ─── */
export const Problems = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    // Map raw scroll 0→1 to a usable 0→1 range that activates in the middle
    const progress = useTransform(scrollYProgress, [0.15, 0.65], [0, 1]);

    return (
        <section ref={sectionRef} className="relative py-32 md:py-48 text-white overflow-hidden">
            {/* Background glow */}
            <div
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[160px] transition-opacity duration-1000 ${isInView ? "opacity-100" : "opacity-0"
                    }`}
                style={{ background: "radial-gradient(circle, rgba(120,119,198,0.15) 0%, transparent 70%)" }}
            />

            <Container>
                <motion.h2
                    className="text-4xl md:text-6xl font-medium text-center mb-24 tracking-tight"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    Знакомо?
                </motion.h2>

                {/* Card Stack */}
                <div className="relative h-[500px] md:h-[600px] flex items-center justify-center">
                    {messages.map((msg, i) => (
                        <ProblemCard
                            key={i}
                            msg={msg}
                            index={i}
                            total={messages.length}
                            progress={progress}
                            isInView={isInView}
                        />
                    ))}
                </div>

                {/* Bridge to Solution */}
                <motion.div
                    className="text-center mt-20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <p className="text-xl md:text-2xl text-white/50 mb-8">
                        Хватит это терпеть каждый день.
                    </p>
                </motion.div>
            </Container>
        </section>
    );
};
