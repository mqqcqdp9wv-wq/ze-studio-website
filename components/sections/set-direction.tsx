"use client";

const bp = process.env.NEXT_PUBLIC_BASE_PATH || "";

import { Features } from "../features";
import {
  SignalWavesIcon,
  CarbonIcon,
  CeramicIcon,
  ArmorShieldIcon,
  StabilityIcon,
} from "../icons/materials";
import { WorkflowsIcon } from "../icons/features";

export const SetDirection = () => {
  return (
    <Features color="0,225,244" colorDark="31,49,64">
      <Features.Main
        title={
          <div className="flex flex-col items-center tracking-tighter text-white opacity-0 blur-[10px] translate-y-8 [transition:opacity_1s_ease,transform_1s_cubic-bezier(0.16,1,0.3,1),filter_1s_ease] [.is-visible_&]:opacity-100 [.is-visible_&]:blur-0 [.is-visible_&]:translate-y-0 text-center">
            <span className="text-gradient text-6xl font-semibold tracking-tighter md:text-8xl">
              Стратегия
            </span>
            <span className="mt-6 flex items-center gap-6 text-xl font-light text-white/40 md:gap-10 md:text-2xl uppercase tracking-[0.5em]">
              <span>Защита</span>
              <span className="text-white/10">•</span>
              <span>Активов</span>
            </span>
          </div>
        }
        image={`${bp}/roadmap.webp`}
        imageSize="large"
        text={
          <span className="block text-white/50 opacity-0 translate-y-4 [transition:opacity_1s_ease_0.2s,transform_1s_cubic-bezier(0.16,1,0.3,1)_0.2s] [.is-visible_&]:opacity-100 [.is-visible_&]:translate-y-0">
            Проектируйте визуально, доверяйте реализацию экспертам студии, и принимайте <span className="text-white font-medium">правильные решения</span> на основе замеров.
          </span>
        }
      />
      <Features.Grid
        features={[
          {
            icon: SignalWavesIcon,
            title: "Протокол Signal.",
            text: "Полный комплекс для EV. Радиопрозрачность антенн и автопилота.",
          },
          {
            icon: CarbonIcon,
            title: "Стандарт Carbon.",
            text: "Классическая углеродная защита. Глубокий черный тон без выцветания.",
          },
          {
            icon: CeramicIcon,
            title: "Пакет Climate Control.",
            text: "Прецизионное управление теплом. Максимальная ИК-блокировка.",
          },
          {
            icon: ArmorShieldIcon,
            title: "Протокол Shield.",
            text: "Бронирование Rescue для лобового стекла. Трассовая защита.",
          },
          {
            icon: StabilityIcon,
            title: "Комплекс Factory Plus.",
            text: "Идеальная эстетика и прозрачность. Для истинных перфекционистов.",
          },
          {
            icon: WorkflowsIcon,
            title: "Гарантия ГОСТ.",
            text: "Полное соответствие стандартам. Комфортное и легальное вождение.",
          },
        ]}
      />
      <Features.Cards
        features={[
          {
            image: `${bp}/card-updates.webp`,
            imageClassName: "top-[55%] md:top-[40%] w-full left-[7%]",
            title: "Жизненный цикл защищённого актива",
            text: "Интеграция → Активная эксплуатация → Factory Zero → Физика углерода. Каждый этап с инженерными метриками.",
          },
          {
            image: `${bp}/card-roadmaps.webp`,
            imageClassName: "top-[55%] md:top-[40%] w-full left-[2%]",
            title: "Сертификат интеграции",
            text: "Документ с показателями VLT и ИК до/после. Факт, зафиксированный приборами, а не маркетинговое обещание.",
          },
        ]}
      />
    </Features>
  );
};
