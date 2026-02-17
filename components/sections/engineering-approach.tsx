"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "../container";
import { AssemblyVisual } from "../visuals/assembly-visual";
import { SignalVisual } from "../visuals/signal-visual";
import { ProtectionVisual } from "../visuals/protection-visual";
import { FocusVisual } from "../visuals/focus-visual";

const cards = [
    {
        id: 1,
        title: "Культура заводской сборки",
        subtitle: "Для тех, кто ценит инженерную точность.",
        description:
            "Это осознанный выбор тех, кто предпочитает сохранение целостности всех скрытых узлов и дилерской гарантии.",
        visualType: "flowchart",
    },
    {
        id: 2,
        title: "Цифровой суверенитет",
        subtitle: "Ваш автомобиль всегда остается онлайн.",
        description:
            "Вы выбираете комфорт, который не создает барьеров для сигналов GPS и мобильного интернета.",
        visualType: "chart",
    },
    {
        id: 3,
        title: "Рациональная защита",
        subtitle: "Физика процесса вместо временного эффекта.",
        description:
            "Понимая природу фотодеструкции, вы выбираете стабильность нано-углеродной структуры, которая не выгорает и не меняет оттенок.",
        visualType: "chart",
    },
    {
        id: 4,
        title: "Ресурс внимания",
        subtitle: "Взгляд без скрытого напряжения.",
        description:
            "Материал с нулевым коэффициентом мутности (Zero Haze) снимает нагрузку со зрительного нерва, позволяя сохранять предельную концентрацию даже в длительных поездках.",
        visualType: "flowchart",
    },
];

const Card = ({ card, index }: { card: typeof cards[0]; index: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="relative overflow-hidden p-8 md:p-12"
        >
            {/* Visual placeholder (сверху, как в Linear) */}
            <div className="mb-8 flex h-80 items-center justify-center rounded-xl bg-transparent md:h-96">
                {/* Placeholder для будущих визуалов */}
            </div>

            {/* Title */}
            <h3 className="mb-2 text-lg font-normal text-white md:text-xl">
                {card.title}
            </h3>

            {/* Subtitle (if exists) */}
            {card.subtitle && (
                <p className="mb-3 text-sm font-normal text-white/80 md:text-base">
                    {card.subtitle}
                </p>
            )}

            {/* Description */}
            <p className="text-sm leading-relaxed text-white/60 md:text-base">
                {card.description}
            </p>
        </motion.div>
    );
};

export const EngineeringApproach = () => {
    return (
        <div className="relative py-24 text-white md:py-32">
            <Container>
                {/* Heading */}
                <div className="mb-12 text-center md:mb-16">
                    <h2 className="mb-4 text-3xl font-normal tracking-tight text-white md:text-5xl">
                        Инженерный подход к тонировке
                    </h2>
                    <p className="mx-auto max-w-[68rem] text-base text-white/50 md:text-lg">
                        Для владельцев, которые понимают ценность технологий.
                    </p>
                </div>

                {/* Cards Grid (1x2 - две большие карточки рядом) */}
                <div className="grid gap-8 md:grid-cols-2">
                    {cards.map((card, index) => (
                        <Card key={card.id} card={card} index={index} />
                    ))}
                </div>
            </Container>
        </div>
    );
};
