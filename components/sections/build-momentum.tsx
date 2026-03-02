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
            <span className="mt-2 flex items-center gap-2 text-[13px] md:text-2xl font-light text-white/40 uppercase tracking-[0.15em] md:tracking-[0.5em]">
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
            title: "No-Touch Protocol",
            text: "Инсталляция без разбора обшивок. Сохранность заводских клипс.",
          },
          {
            icon: ArmorShieldIcon,
            title: "Electro-Shield",
            text: "Защита электроники. Микрофибровые барьеры во всех узлах.",
          },
          {
            icon: StabilityIcon,
            title: "Schedule Sync",
            text: "Консистентная запись на любой день. Доступность 24/7.",
          },
          {
            icon: DiscussionIcon,
            title: "Heritage",
            text: "С 2007 года. Максимальный рейтинг доверия 5.0.",
          },
          {
            icon: AutomatedBacklogIcon,
            title: "Zero-Strip Standard",
            text: "Монтаж без извлечения стекол. Герметичность по заводу.",
          },
          {
            icon: IssuesIcon,
            title: "Velocity",
            text: "Высокоточная инсталляция от 30 минут без ущерба качеству.",
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
