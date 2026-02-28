"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "../container";

const faqs = [
  {
    q: "Сколько служит Rayno MonoCarbon?",
    a: "Гарантия — 10 лет. Плёнка удерживает цвет: менее 1% изменения после 1000 часов УФ-излучения. Ставим и снимаем без следов при необходимости.",
  },
  {
    q: "Мешает ли тонировка GPS и 5G?",
    a: "Нет. Rayno не содержит металлического напыления, поэтому не блокирует сигналы GPS, 5G, CarPlay и ADAS-камеры работают штатно.",
  },
  {
    q: "Допустима ли тонировка по ГОСТ?",
    a: "Да. Все плёнки Rayno имеют российскую сертификацию. Оклеиваем в зонах, разрешённых ПДД. По запросу — комплект документов для ГИБДД.",
  },
  {
    q: "Как долго длится установка?",
    a: "Стандартная установка — 1 рабочий день. Лобовое стекло (Rescue) — до 4 часов. Запись на конкретное время, без ожидания в очереди.",
  },
  {
    q: "Чем Centum отличается от MonoCarbon?",
    a: "Centum — керамическая плёнка: блокирует 99% ИК-излучения (тепло), MonoCarbon — углеродная: максимальный тёмный тон. Выбор зависит от приоритета — климат или визуал.",
  },
];

export const Faq = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-[12rem] overflow-hidden">
      {/* subtle glow */}
      <div className="pointer-events-none absolute left-0 top-1/2 h-[60rem] w-[60rem] -translate-y-1/2 -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(74,123,247,0.08),transparent_70%)]" />

      <Container>
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-24 items-start">

          {/* LEFT — sticky visual */}
          <div className="md:sticky md:top-32">
            <p className="mb-4 text-xs uppercase tracking-[0.4em] text-white/30">
              Часто спрашивают
            </p>
            <h2 className="text-gradient mb-8 text-5xl font-semibold leading-tight tracking-tight md:text-6xl">
              Остались
              <br />
              вопросы?
            </h2>
            <p className="mb-12 text-md leading-relaxed text-white/40">
              Собрали ответы на самые частые — остальное расскажем при записи.
            </p>

            {/* decorative glass card */}
            <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 backdrop-blur-md">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_30%_20%,rgba(74,123,247,0.12),transparent)]" />
              <div className="relative space-y-5">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-[#4A7BF7]/20 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-[#4A7BF7]" />
                  </div>
                  <span className="text-sm text-white/60">Гарантия 10 лет</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-[#00E1F4]/20 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-[#00E1F4]" />
                  </div>
                  <span className="text-sm text-white/60">Сертификация ГОСТ</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-[#8B5CF6]/20 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-[#8B5CF6]" />
                  </div>
                  <span className="text-sm text-white/60">Без металла — 5G/GPS работает</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-white/60" />
                  </div>
                  <span className="text-sm text-white/60">Запись на конкретное время</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — questions */}
          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              return (
                <motion.div
                  key={i}
                  className="overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-md cursor-pointer"
                  onClick={() => setOpen(isOpen ? null : i)}
                  whileHover={{ borderColor: "rgba(255,255,255,0.1)" }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center justify-between gap-4 px-6 py-5">
                    <span className="text-sm font-medium text-white md:text-md">
                      {faq.q}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex-shrink-0 text-white/30"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </motion.div>
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <p className="px-6 pb-5 text-sm leading-relaxed text-white/50">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};
