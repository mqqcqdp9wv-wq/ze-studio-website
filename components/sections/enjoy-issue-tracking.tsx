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
            <span className="md:hidden text-white font-medium pl-1">защита</span>
            <FlipWords
              className="hidden md:inline-block text-white font-medium"
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

        {/* DESKTOP: horizontal accordion (Cruip-style) */}
        <div className="hidden md:flex group gap-3 relative w-full pt-20">
          {[
            {
              title: "MonoCarbon",
              description: "Nano-carbon пигмент. Нулевое выцветание. Стабильный угольный тон на десятилетие.",
              glowColor: "#1C3E6E",
              numberPrefix: "01",
              href: "/materials/monocarbon",
              // Carbon fiber: diagonal cross-hatch
              pattern: `repeating-linear-gradient(45deg, rgba(255,255,255,0.035) 0px, rgba(255,255,255,0.035) 1px, transparent 1px, transparent 10px), repeating-linear-gradient(-45deg, rgba(255,255,255,0.035) 0px, rgba(255,255,255,0.035) 1px, transparent 1px, transparent 10px)`,
            },
            {
              title: "Centum",
              description: "Атермальная нанокерамика. 99% ИК-блокировки. ГОСТ. EV-совместимость.",
              glowColor: "#0A4A5C",
              numberPrefix: "02",
              href: "/materials/centum",
              animClass: "anim-centum",
              // Ceramic / signal waves: horizontal lines
              pattern: `repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 14px), repeating-linear-gradient(90deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 40px)`,
            },
            {
              title: "Rescue",
              description: "Бронеплёнка для лобового. Поглощение удара без искажения оптики.",
              glowColor: "#2D1B5E",
              numberPrefix: "03",
              href: "/materials/rescue",
              // Armor: diamond / hexagonal grid
              pattern: `repeating-linear-gradient(60deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 12px), repeating-linear-gradient(-60deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 12px)`,
            },
          ].map((card) => (
            <a
              key={card.title}
              href={card.href}
              className="group/article relative w-full overflow-hidden cursor-pointer
                border border-white/[0.06]
                md:group-hover:[&:not(:hover)]:w-[20%]
                transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.15)]
                after:opacity-0 md:group-hover:[&:not(:hover)]:after:opacity-100
                after:absolute after:inset-0 after:bg-black/55 after:backdrop-blur-[2px] after:transition-all after:duration-300 after:z-20
                before:absolute before:inset-x-0 before:bottom-0 before:h-2/3 before:z-10
                before:bg-gradient-to-t before:from-black/80 before:via-black/30 before:to-transparent
                before:transition-opacity before:duration-300
                md:before:opacity-0 md:hover:before:opacity-100"
              style={{
                background: `${card.pattern}, linear-gradient(160deg, ${card.glowColor}30 0%, #000 40%, #000 100%)`,
                borderRadius: "2.8rem",
                minHeight: "420px",
              }}
            >
              {/* Central glow orb */}
              <div
                className="pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-500 group-hover/article:opacity-70"
                style={{ background: `radial-gradient(ellipse 70% 55% at 50% 42%, ${card.glowColor}cc, transparent 70%)` }}
              />

              {/* Top edge highlight */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              {/* Material animation layer (Centum only) */}
              {card.animClass && (
                <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden" style={{ borderRadius: "2.8rem" }}>
                  <div className={card.animClass} />
                </div>
              )}

              {/* Number badge — top left */}
              <div className="absolute top-7 left-7 z-30">
                <span
                  className="font-mono text-[11px] font-semibold tracking-[0.2em] uppercase px-2.5 py-1 rounded-full border"
                  style={{
                    color: `${card.glowColor}`,
                    borderColor: `${card.glowColor}40`,
                    background: `${card.glowColor}15`,
                    filter: `brightness(2.5)`,
                  }}
                >
                  {card.numberPrefix}
                </span>
              </div>

              {/* Content — title always visible; description reveals on hover */}
              <div className="absolute inset-x-0 bottom-0 z-20 px-8 py-8">
                {/* Description — grid-row reveal (no layout jump) */}
                <div className="grid grid-rows-[0fr] group-hover/article:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-[cubic-bezier(.5,.85,.25,1.15)]">
                  <div className="overflow-hidden">
                    <p className="font-sans text-[13px] leading-relaxed text-white/55 max-w-[280px] pb-2
                      opacity-0 translate-y-1
                      group-hover/article:opacity-100 group-hover/article:translate-y-0
                      transition-[opacity,transform] duration-300 ease-out
                      group-hover/article:[transition-delay:100ms]">
                      {card.description}
                    </p>
                  </div>
                </div>
                {/* Title — always visible */}
                <h3 className="font-mono text-[22px] font-bold uppercase tracking-tight text-white">
                  {card.title}
                </h3>
              </div>

              {/* Bottom edge glow line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px] z-30 opacity-0 transition-opacity duration-500 group-hover/article:opacity-60"
                style={{ background: `linear-gradient(90deg, transparent, ${card.glowColor}, transparent)`, filter: `brightness(2)` }}
              />
            </a>
          ))}
        </div>
      </Container>
    </Features>
  );
};
