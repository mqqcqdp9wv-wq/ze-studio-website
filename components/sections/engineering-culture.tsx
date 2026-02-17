"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "../container";
import { Shield, Radio, Sun, X } from "lucide-react";

const cards = [
    {
        id: 1,
        icon: Shield,
        title: "Культура заводской сборки",
        subtitle: "Для тех, кто ценит инженерную точность.",
        points: [
            "Вы понимаете ценность каждого заводского шва и герметичности.",
            "Мы внедрили стандарт инсталляции без разбора дверей — особенно для Zeekr, Li Auto, Monjaro.",
            "Это осознанный выбор: сохранение целостности узлов и дилерской гарантии.",
        ],
    },
    {
        id: 2,
        icon: Radio,
        title: "Цифровой суверенитет",
        subtitle: "Ваш автомобиль всегда остается онлайн.",
        points: [
            "Вы цените точность ADAS и скорость обновления данных.",
            "Rayno S9 nano-ceramic — полная radio-transparency для GPS и 5G.",
            "Комфорт без барьеров для сигналов.",
        ],
    },
    {
        id: 3,
        icon: Sun,
        title: "Рациональная защита",
        subtitle: "Физика процесса вместо временных эффектов.",
        points: [
            "Вы инвестируете в результат, который остается неизменным годами.",
            "Нано-углеродная структура не выгорает и не меняет оттенок.",
            "92% IR-блокировка = -15°C в салоне. Невидимый климат-контроль.",
        ],
    },
];

export const EngineeringCulture = () => {
    const [expandedId, setExpandedId] = useState<number | null>(null);

    return (
        <div className="relative py-32 text-white">
            <Container>
                <div className="mb-16 text-center">
                    <h2 className="mb-4 text-4xl font-medium tracking-tight md:text-7xl">
                        Инженерный подход
                        <br className="hidden md:inline-block" /> к тонировке
                    </h2>
                    <p className="mx-auto max-w-[68rem] text-lg text-white/50 md:text-xl">
                        Для владельцев, которые понимают ценность технологий.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {cards.map((card) => {
                        const Icon = card.icon;
                        const isExpanded = expandedId === card.id;

                        return (
                            <motion.div
                                key={card.id}
                                layout
                                className={`relative cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all ${isExpanded ? "md:col-span-3" : ""
                                    }`}
                                onClick={() => setExpandedId(isExpanded ? null : card.id)}
                            >
                                <div className="p-8 md:p-12">
                                    {/* Icon */}
                                    <motion.div
                                        layout
                                        className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10"
                                    >
                                        <Icon className="h-8 w-8 text-white" />
                                    </motion.div>

                                    {/* Title */}
                                    <motion.h3
                                        layout
                                        className="mb-2 text-2xl font-medium md:text-3xl"
                                    >
                                        {card.title}
                                    </motion.h3>

                                    {/* Subtitle */}
                                    <motion.p layout className="text-lg text-white/70">
                                        {card.subtitle}
                                    </motion.p>

                                    {/* Expanded Content */}
                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="mt-8"
                                            >
                                                <ul className="space-y-4">
                                                    {card.points.map((point, idx) => (
                                                        <motion.li
                                                            key={idx}
                                                            initial={{ opacity: 0, x: -20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: idx * 0.1 }}
                                                            className="flex items-start gap-3 text-lg text-white/80"
                                                        >
                                                            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-white/50" />
                                                            {point}
                                                        </motion.li>
                                                    ))}
                                                </ul>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Close button (only when expanded) */}
                                    {isExpanded && (
                                        <motion.button
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="absolute right-8 top-8 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setExpandedId(null);
                                            }}
                                        >
                                            <X className="h-5 w-5" />
                                        </motion.button>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </Container>
        </div>
    );
};
