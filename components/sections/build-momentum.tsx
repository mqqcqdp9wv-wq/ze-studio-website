"use client";

const bp = process.env.NEXT_PUBLIC_BASE_PATH || "";

import { Features } from "../features";
import {
  AutomatedBacklogIcon,
  DiscussionIcon,
  IssuesIcon,
  ParentSubIcon,
  WorkflowsIcon,
} from "../icons/features";
import {
  ArmorShieldIcon,
  StabilityIcon,
  SignalWavesIcon,
} from "../icons/materials";
import { Logo } from "../icons/logo";

export const BuildMomentum = () => {
  return (
    <Features color="0,191,165" colorDark="10,40,35">
      <Features.Main
        title={
          <span className="flex flex-col items-center tracking-tighter text-white opacity-0 blur-[10px] translate-y-8 [transition:opacity_1s_ease,transform_1s_cubic-bezier(0.16,1,0.3,1),filter_1s_ease] [.is-visible_&]:opacity-100 [.is-visible_&]:blur-0 [.is-visible_&]:translate-y-0 text-center">
            <span className="text-gradient text-6xl font-semibold tracking-tighter md:text-8xl">
              Исполнение
            </span>
            <span className="mt-6 flex items-center gap-6 text-xl font-light text-white/40 md:gap-10 md:text-2xl uppercase tracking-[0.5em]">
              <span>Инженерная</span>
              <span className="text-white/10">•</span>
              <span>Точность</span>
            </span>
          </span>
        }
        image={`${bp}/cycles.webp`}
        imageSize="large"
        text={
          <span className="block text-white/50 opacity-0 translate-y-4 [transition:opacity_1s_ease_0.2s,transform_1s_cubic-bezier(0.16,1,0.3,1)_0.2s] [.is-visible_&]:opacity-100 [.is-visible_&]:translate-y-0">
            Протокол монтажа. <span className="text-white font-medium">Заводская сборка</span> без разбора.
          </span>
        }
      />
      <Features.Grid
        features={[
          {
            icon: WorkflowsIcon,
            title: "No-Touch.",
            text: "Дверные карты на месте. Сохранность клипс и тишины.",
          },
          {
            icon: ArmorShieldIcon,
            title: "Защита электроники.",
            text: "Микрофибровые жгуты.",
          },
          {
            icon: StabilityIcon,
            title: "Доступность 24/7.",
            text: "Запись на любой день недели.",
          },
          {
            icon: DiscussionIcon,
            title: "Опыт.",
            text: "С 2007 года. Максимальный рейтинг 5.0.",
          },
          {
            icon: AutomatedBacklogIcon,
            title: "Zero-Strip протокол.",
            text: "Без извлечения стекол.",
          },
          {
            icon: IssuesIcon,
            title: "Скорость.",
            text: "Тонировка от 30 минут без потери качества.",
          },
        ]}
      />
      <Features.Cards
        features={[
          {
            image: `${bp}/card-updates.webp`,
            imageClassName: "top-[55%] md:top-[40%] w-full left-[7%]",
            title: "Thermal Load Burndown",
            text: "Жёлтая линия — рост температуры в салоне. Синяя — стабилизация с Rayno Centum.",
          },
          {
            image: `${bp}/card-roadmaps.webp`,
            imageClassName: "top-[55%] md:top-[40%] w-full left-[2%]",
            title: "Safe-Install в деталях",
            text: "Защитные барьеры электроники и No-Touch технология в каждом из протоколов.",
          },
        ]}
      />
    </Features>
  );
};
