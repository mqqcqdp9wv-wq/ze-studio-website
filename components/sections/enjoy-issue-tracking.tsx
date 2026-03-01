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
            title: "Углерод.",
            text: "Максимальная защита от выцветания. Гарантия 10 лет.",
          },
          {
            icon: CeramicIcon,
            title: "Керамика.",
            text: "Прохлада без штрафов. 99% ИК-фильтрация. ГОСТ.",
          },
          {
            icon: SignalWavesIcon,
            title: "Сигнал.",
            text: "Без металла. Стабильная работа 5G, GPS и систем ADAS.",
          },
          {
            icon: CustomViewsIcon,
            title: "Оптика.",
            text: "Глубокий угольный тон без цветовых искажений.",
          },
          {
            icon: StabilityIcon,
            title: "Стойкость.",
            text: "Удержание цвета <1% после 1000 часов. В 8 раз выше аналогов.",
          },
          {
            icon: ArmorShieldIcon,
            title: "Броня.",
            text: "Новый уровень невидимой защиты.",
          },
        ]}
      />
      <Container>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5 perspective-[1000px]">
          <TiltRevealCard
            title="MonoCarbon"
            description="Nano-carbon пигмент. Нулевое выцветание. Стабильный угольный тон на десятилетие."
            glowColor="#4A7BF7"
            numberPrefix="01"
            href="/materials/monocarbon"
          />
          <TiltRevealCard
            title="Centum"
            description="Атермальная нанокерамика. 99% ИК-блокировки. ГОСТ. EV-совместимость."
            glowColor="#00E1F4"
            numberPrefix="02"
            href="/materials/centum"
          />
          <TiltRevealCard
            title="Rescue"
            description="Бронеплёнка для лобового. Поглощение удара без искажения оптики."
            glowColor="#8B5CF6"
            numberPrefix="03"
            href="/materials/rescue"
          />
        </div>
      </Container>
    </Features>
  );
};
