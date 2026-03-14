"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import classNames from "classnames";
import { Container } from "../container";

const faqs = [
    {
        q: "Ресурс и стабильность цвета.",
        a: "Основа — наноуглерод, а не краситель. Углерод химически инертен: он не выцветает и не меняет спектр пропускания. Адгезия сохраняется десятилетиями.",
    },
    {
        q: "Оптическая чистота. ADAS / HUD.",
        a: "Оптическая мутность — 0.6%. Дисторсия исключена. Не влияет на работу камер ADAS, датчиков света и проекцию (HUD).",
    },
    {
        q: "Соответствие ГОСТ 32565-2013.",
        a: "Светопропускание лобового стекла ~80%. Полное соответствие техническому регламенту. Замер сертифицированным люксметром при выдаче.",
    },
    {
        q: "Тайминг инсталляции.",
        a: "Задняя полусфера: 45 минут. Полная тонировка: 120 минут. Строго по записи. Потоковый прием исключен.",
    },
    {
        q: "Протокол контроля качества.",
        a: "Приёмка по 12 пунктам. Проверка на оптические искажения, чистоту канта и прилегание наноуглеродного слоя. Финальный акт допуска.",
    },
    {
        q: "Структура стоимости.",
        a: "Материалы Rayno Centum исключают переклейку через 2-3 года. Это разовая инвестиция на весь срок владения автомобилем без потери свойств.",
    },
];

export const Faq = () => {
    const [open, setOpen] = useState<number | null>(0);
    const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: false });

    return (
        <div
            ref={ref}
            className={classNames(
                "relative overflow-hidden",
                inView && "is-visible"
            )}
        >
            {/* subtle glow */}
            <div className="pointer-events-none absolute left-0 top-1/2 h-[60rem] w-[60rem] -translate-y-1/2 -translate-x-1/2 rounded-full opacity-0 transition-opacity duration-1000 [.is-visible_&]:opacity-100" style={{ background: 'radial-gradient(ellipse, rgba(var(--feature-color),0.12), transparent 70%)' }} />

            <Container>
                {/* Centered title — same style as all sections */}
                <div className="mb-12 text-center">
                    <div className="flex flex-col items-center tracking-tighter text-white opacity-0 blur-[10px] translate-y-8 [transition:opacity_1s_ease,transform_1s_cubic-bezier(0.16,1,0.3,1),filter_1s_ease] [.is-visible_&]:opacity-100 [.is-visible_&]:blur-0 [.is-visible_&]:translate-y-0">
                        <span className="text-gradient text-6xl font-semibold tracking-tighter md:text-8xl">
                            Вопросы
                        </span>
                        <span className="mt-2 flex items-center gap-3 text-[12px] font-light text-white/40 md:gap-10 md:text-2xl uppercase tracking-[0.3em] md:tracking-[0.5em]">
                            <span>Частые</span>
                            <span className="text-white/10">•</span>
                            <span>Ответы</span>
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-24 items-start">
                    {/* LEFT — CTA (on mobile: after questions) */}
                    <div className="order-2 md:order-1 md:sticky md:top-32">
                        <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur-md">
                            {/* glow */}
                            <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 20% 10%, rgba(var(--feature-color),0.15), transparent)' }} />

                            <div className="relative">
                                <p className="mb-2 text-xs uppercase tracking-[0.4em] text-white/30">
                                    ZE Studio
                                </p>
                                <h3 className="mb-6 text-3xl font-semibold text-white leading-tight tracking-tight">
                                    Готовы к<br />инсталляции?
                                </h3>

                                <div className="mb-8 space-y-4">
                                    {[
                                        { label: "Запись по протоколу", color: "rgba(var(--feature-color),1)" },
                                        { label: "Установка за 1 рабочий день", color: "rgba(var(--feature-color),0.7)" },
                                        { label: "Сертификация ГОСТ", color: "rgba(var(--feature-color),0.4)" },
                                        { label: "Гарантия 10 лет", color: "rgba(255,255,255,0.15)" },
                                    ].map(({ label, color }) => (
                                        <div key={label} className="flex items-center gap-3">
                                            <div
                                                className="h-1.5 w-1.5 rounded-full flex-shrink-0"
                                                style={{ backgroundColor: color }}
                                            />
                                            <span className="text-sm text-white/40">{label}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Pulsing CTA button */}
                                <div className="relative">
                                    <motion.div
                                        className="absolute inset-0 rounded-xl"
                                        style={{ background: "rgba(var(--feature-color),0.15)" }}
                                        animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.15, 0.5] }}
                                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                                    />
                                    <motion.a
                                        href="#"
                                        className="relative flex w-full items-center justify-between rounded-xl px-5 py-4 text-sm font-medium text-white transition-colors"
                                        style={{ border: "1px solid rgba(var(--feature-color),0.25)", background: "rgba(var(--feature-color),0.06)" }}
                                        whileHover={{ x: 4 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Записаться в студию
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: "rgba(var(--feature-color),1)" }}>
                                            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </motion.a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT — questions with stagger (on mobile: first) */}
                    <motion.div
                        className="order-1 md:order-2 space-y-2"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={{
                            hidden: {},
                            visible: { transition: { staggerChildren: 0.09 } },
                        }}
                    >
                        {faqs.map((faq, i) => {
                            const isOpen = open === i;
                            return (
                                <motion.div
                                    key={i}
                                    variants={{
                                        hidden: { opacity: 0, y: 14 },
                                        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
                                    }}
                                    className={classNames(
                                        "overflow-hidden rounded-2xl border transition-all duration-500 backdrop-blur-xl cursor-pointer",
                                        isOpen ? "border-white/20 bg-white/[0.05]" : "border-white/[0.06] bg-white/[0.02] hover:border-white/15"
                                    )}
                                    onClick={() => setOpen(isOpen ? null : i)}
                                >
                                    <div className="relative flex items-center gap-6 px-7 py-6">
                                        {/* Status Line Indicator */}
                                        <div
                                            className="absolute left-0 top-0 bottom-0 w-[2px] transition-all duration-500"
                                            style={{
                                                backgroundColor: isOpen ? 'rgb(var(--feature-color))' : 'transparent',
                                                boxShadow: isOpen ? `0 0 15px rgb(var(--feature-color))` : 'none'
                                            }}
                                        />

                                        {/* Number */}
                                        <span className="flex-shrink-0 text-[10px] font-mono font-bold text-white/20 w-5 tracking-widest leading-none">
                                            {String(i + 1).padStart(2, "0")}
                                        </span>

                                        <span className={classNames(
                                            "flex-1 font-mono text-[14px] md:text-[15px] font-bold uppercase tracking-tight transition-colors duration-300",
                                            isOpen ? "text-white" : "text-white/60"
                                        )}>
                                            {faq.q}
                                        </span>

                                        {/* Minimalist Switch */}
                                        <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full border border-white/10 group-hover:border-white/20 transition-colors">
                                            <div
                                                className="h-[1px] w-3 bg-white/40 transition-transform duration-500"
                                                style={{ transform: isOpen ? 'rotate(180deg) scaleX(1.5)' : 'rotate(90deg)' }}
                                            />
                                        </div>
                                    </div>

                                    <AnimatePresence initial={false}>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                                            >
                                                <div className="pl-[76px] pr-8 pb-7">
                                                    <p
                                                        className="text-shimmer-desc text-[13.5px] md:text-[14.5px] leading-relaxed font-sans"
                                                        style={{ '--shimmer-delay': '0s' } as React.CSSProperties}
                                                    >
                                                        {faq.a}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </Container>
        </div>
    );
};
