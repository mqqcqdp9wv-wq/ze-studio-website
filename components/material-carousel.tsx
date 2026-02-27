"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "./container";

const materials = [
  {
    name: "MonoCarbon",
    tag: "Carbon",
    description: "Nano-carbon пигмент. Нулевое выцветание. Стабильный угольный тон на десятилетие.",
    stat: "<1%",
    statLabel: "выцветание за 1000 ч",
    color: "#4A7BF7",
    colorDark: "rgba(74,123,247,0.12)",
    colorMid: "rgba(74,123,247,0.25)",
  },
  {
    name: "Centum",
    tag: "Ceramic",
    description: "Атермальная нанокерамика. 99% ИК-блокировки. ГОСТ. EV-совместимость.",
    stat: "99%",
    statLabel: "блокировка ИК",
    color: "#00E1F4",
    colorDark: "rgba(0,225,244,0.12)",
    colorMid: "rgba(0,225,244,0.25)",
  },
  {
    name: "Rescue",
    tag: "Shield",
    description: "Бронеплёнка для лобового. Поглощение удара без искажения оптики.",
    stat: "4 mil",
    statLabel: "толщина защиты",
    color: "#8B5CF6",
    colorDark: "rgba(139,92,246,0.12)",
    colorMid: "rgba(139,92,246,0.25)",
  },
];

export const MaterialCarousel = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <Container>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
        {materials.map((m, i) => (
          <motion.div
            key={m.name}
            onHoverStart={() => setHovered(i)}
            onHoverEnd={() => setHovered(null)}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.7,
              delay: i * 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
            className="group relative cursor-default"
          >
            <div
              className="relative flex h-[380px] flex-col overflow-hidden rounded-[24px] border border-white/[0.12] p-8 transition-colors duration-500 hover:border-white/[0.22] md:h-[420px] md:p-10"
              style={{
                background: `linear-gradient(160deg, ${m.colorMid} 0%, ${m.colorDark} 35%, rgba(14,14,18,1) 75%)`,
              }}
            >
              <motion.div
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-[100px]"
                style={{ background: m.color }}
                initial={{ opacity: 0 }}
                animate={{ opacity: hovered === i ? 0.4 : 0.15 }}
                transition={{ duration: 0.6 }}
              />

              <div
                className="relative z-10 mb-auto inline-flex w-fit items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em]"
                style={{
                  color: m.color,
                  borderColor: `${m.color}35`,
                  background: `${m.color}10`,
                }}
              >
                {m.tag}
              </div>

              <div className="relative z-10 mt-auto">
                <div className="mb-4 flex items-baseline gap-2">
                  <motion.span
                    className="text-5xl font-bold tracking-tight md:text-6xl"
                    style={{ color: m.color }}
                    initial={{ opacity: 0.7 }}
                    animate={{ opacity: hovered === i ? 1 : 0.7 }}
                  >
                    {m.stat}
                  </motion.span>
                  <span className="text-xs uppercase tracking-wider text-white/30">
                    {m.statLabel}
                  </span>
                </div>

                <h3 className="mb-2 text-2xl font-semibold tracking-tight text-white md:text-3xl">
                  {m.name}
                </h3>

                <div className="h-[40px] overflow-hidden">
                  <motion.p
                    className="text-sm leading-relaxed text-white/50"
                    initial={{ opacity: 0.6, y: 0 }}
                    animate={{
                      opacity: hovered === i ? 1 : 0.6,
                      y: hovered === i ? 0 : 4,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {m.description}
                  </motion.p>
                </div>
              </div>

              <motion.div
                className="absolute bottom-0 left-0 right-0 h-[2px]"
                style={{
                  background: `linear-gradient(90deg, transparent 0%, ${m.color} 50%, transparent 100%)`,
                }}
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{
                  opacity: hovered === i ? 1 : 0,
                  scaleX: hovered === i ? 1 : 0,
                }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </Container>
  );
};
