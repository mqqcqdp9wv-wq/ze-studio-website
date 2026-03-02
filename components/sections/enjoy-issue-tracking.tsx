"use client";

const bp = process.env.NEXT_PUBLIC_BASE_PATH || "";

import { Features } from "../features";
import { FlipWords } from "../ui/flip-words";
import {
  CarbonIcon,
  CeramicIcon,
  SignalWavesIcon,
  StabilityIcon,
  ArmorShieldIcon,
} from "../icons/materials";
import { CustomViewsIcon } from "../icons/features";
import { TiltRevealCard } from "../ui/tilt-reveal-card";
import { MobileCardStack } from "../ui/mobile-card-stack";
import { Container } from "../container";

export const EnjoyIssueTracking = () => {
  return (
    <Features color="80,140,255" colorDark="15,30,80">
      <Features.Main
        title={
          <span className="flex flex-col items-center tracking-tighter text-white opacity-0 blur-[10px] translate-y-8 [transition:opacity_1s_ease,transform_1s_cubic-bezier(0.16,1,0.3,1),filter_1s_ease] [.is-visible_&]:opacity-100 [.is-visible_&]:blur-0 [.is-visible_&]:translate-y-0 text-center">
            <span className="text-gradient text-6xl font-semibold tracking-tighter md:text-8xl">
              Инновации
            </span>
            <span className="mt-2 flex items-center gap-2 text-[13px] md:text-2xl font-light text-white/40 uppercase tracking-[0.15em] md:tracking-[0.5em]">
              <span>Структурная</span>
              <span className="text-white/10">•</span>
              <span>Логика</span>
            </span>
          </span>
        }
        image={`${bp}/issues.webp`}
        text={
          <span className="block text-white/50 opacity-0 translate-y-4 [transition:opacity_1s_ease_0.2s,transform_1s_cubic-bezier(0.16,1,0.3,1)_0.2s] [.is-visible_&]:opacity-100 [.is-visible_&]:translate-y-0">
            Одна линейка. Одна{" "}
            <FlipWords
              className="text-white font-medium"
              words={["защита", "прохлада", "ясность", "логика"]}
            />
          </span>
        }
      />
      <Features.Grid
        features={[
          {
            icon: CarbonIcon,
            title: "Carbon Core",
            text: "Стабилизация наноуглерода. Полная защита от выцветания. Ресурс — 10 лет.",
          },
          {
            icon: CeramicIcon,
            title: "Nano-Ceramic",
            text: "Интеллектуальная прохлада. 99% ИК-блокировки без системных помех.",
          },
          {
            icon: SignalWavesIcon,
            title: "Signal Pass",
            text: "Диэлектрическая структура. Стабильная работа 5G, GPS и систем ADAS.",
          },
          {
            icon: CustomViewsIcon,
            title: "Optical Zero",
            text: "Нулевая дисторсия. Глубокий угольный тон без цветовых артефактов.",
          },
          {
            icon: StabilityIcon,
            title: "Lab-Tested",
            text: "Удержание спектра <0.8% после 1000 часов УФ. Протокол стабильности.",
          },
          {
            icon: ArmorShieldIcon,
            title: "Armored",
            text: "Новый стандарт незаметной защиты фронтальной полусферы.",
          },
        ]}
      />
      <Container>
        {/* MOBILE: 3D stacking cards */}
        <MobileCardStack cards={[
          {
            title: "MonoCarbon",
            description: "Nano-carbon пигмент. Нулевое выцветание. Стабильный угольный тон на десятилетие.",
            glowColor: "#1C3E6E", /* Глубокий синий */
            numberPrefix: "01",
            href: "/materials/monocarbon",
            icon: CarbonIcon,
          },
          {
            title: "Centum",
            description: "Атермальная нанокерамика. 99% ИК-блокировки. ГОСТ. EV-совместимость.",
            glowColor: "#0A4A5C", /* Глубокий циан/изумруд */
            numberPrefix: "02",
            href: "/materials/centum",
            icon: CeramicIcon,
          },
          {
            title: "Rescue",
            description: "Бронеплёнка для лобового. Поглощение удара без искажения оптики.",
            glowColor: "#2D1B5E", /* Глубокий индиго/фиолетовый */
            numberPrefix: "03",
            href: "/materials/rescue",
            icon: ArmorShieldIcon,
          },
        ]} />

        {/* DESKTOP: 3-column refined glass grid */}
        <div className="hidden md:grid grid-cols-3 gap-8 relative w-full pt-20 overflow-visible">
          {/* Subtle background diffusion */}
          <div
            className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-full w-full opacity-[0.03] blur-[150px]"
            style={{ background: `radial-gradient(circle at center, #1C3E6E, transparent 70%)` }}
          />

          {[
            {
              title: "MonoCarbon",
              description: "Nano-carbon пигмент. Нулевое выцветание. Стабильный угольный тон на десятилетие.",
              glowColor: "#1C3E6E",
              numberPrefix: "01",
            },
            {
              title: "Centum",
              description: "Атермальная нанокерамика. 99% ИК-блокировки. ГОСТ. EV-совместимость.",
              glowColor: "#0A4A5C",
              numberPrefix: "02",
            },
            {
              title: "Rescue",
              description: "Бронеплёнка для лобового. Поглощение удара без искажения оптики.",
              glowColor: "#2D1B5E",
              numberPrefix: "03",
            }
          ].map((card, i) => (
            <div
              key={card.title}
              className="group relative overflow-hidden backdrop-blur-2xl w-full transition-all duration-700 border border-white/[0.08] hover:-translate-y-3 cursor-pointer"
              style={{
                background: `linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 50%, ${card.glowColor}15 100%)`,
                borderRadius: "2.8rem",
                boxShadow: `inset 0 1px 0 rgba(255,255,255,0.1), 0 0 40px 0 ${card.glowColor}05`,
              }}
            >
              {/* Dynamic Surface Glow */}
              <div
                className="pointer-events-none absolute bottom-0 left-0 right-0 h-3/4 opacity-20 transition-opacity duration-700 group-hover:opacity-50"
                style={{
                  background: `radial-gradient(ellipse 80% 60% at 50% 120%, ${card.glowColor}, transparent)`,
                }}
              />

              {/* Glass Highlights */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/[0.04] to-transparent" />

              <div className="relative z-10 flex flex-col items-center gap-7 pt-14 pb-12 px-10 text-center">
                {/* Number Circle (Sole primary identifier) */}
                <div
                  className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-white/5 transition-all duration-700 group-hover:scale-110 group-hover:border-white/10"
                  style={{
                    background: `${card.glowColor}20`,
                    borderColor: `${card.glowColor}40`,
                    boxShadow: `0 0 25px ${card.glowColor}15`
                  }}
                >
                  <span
                    className="font-mono text-[18px] font-bold leading-none"
                    style={{ color: card.glowColor }}
                  >
                    {card.numberPrefix}
                  </span>
                </div>

                {/* Content Block - Clean Hierarchy */}
                <div className="flex flex-col items-center gap-3">
                  <h3 className="font-mono text-[20px] font-bold uppercase tracking-tight text-white/90">
                    {card.title}
                  </h3>
                  <p className="font-sans text-[15px] leading-relaxed text-white/45 font-normal max-w-[280px]">
                    {card.description}
                  </p>
                </div>
              </div>

              {/* Technical Bottom Edge */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 transition-opacity duration-700 group-hover:opacity-40"
                style={{
                  background: `linear-gradient(90deg, transparent, ${card.glowColor}, transparent)`,
                }}
              />
            </div>
          ))}
        </div>
      </Container>
    </Features>
  );
};
