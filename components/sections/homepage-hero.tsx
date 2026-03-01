import { Button, Highlight } from "../button";
import { Hero, HeroTitle, HeroSubtitle } from "../hero";
import { ChevronIcon } from "../icons/chevron";
import { Container } from "../container";

export const HomepageHero = () => (
  <div className="relative w-full h-screen overflow-hidden">
    {/* Video */}
    <video
      className="absolute inset-0 w-full h-full object-cover"
      src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/img/hero-video.mp4`}
      autoPlay
      muted
      loop
      playsInline
    />
    {/* Darkening overlay */}
    <div className="absolute inset-0 bg-black/60" />
    {/* Top gradient fade — ultra smooth */}
    <div className="absolute top-0 left-0 right-0 h-[55%] bg-gradient-to-b from-black via-black/90 via-50% to-transparent" />
    {/* Bottom gradient fade — ultra smooth */}
    <div className="absolute bottom-0 left-0 right-0 h-[55%] bg-gradient-to-t from-black via-black/90 via-50% to-transparent" />

    {/* Text Content — on top of video, centered on desktop */}
    <Container className="relative z-10 flex flex-col items-start md:items-center justify-center h-full text-left md:text-center -mt-20">
      <Hero className="flex flex-col items-start md:items-center">
        <Button
          className="translate-y-[-1rem] animate-fade-in opacity-0 !bg-white/5 !border-white/10 !text-white/50 hover:!text-white hover:!bg-white/10 transition-all"
          href="/monocarbon"
          variant="secondary"
          size="small"
        >
          <span className="font-medium tracking-wider uppercase text-[10px]">Rayno MonoCarbon</span>{" "}
          <Highlight>→</Highlight>
        </Button>
        <HeroTitle className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms] !font-bold !tracking-tighter !leading-[1.1] md:!text-9xl">
          Тонировка нового поколения
        </HeroTitle>
        <HeroSubtitle className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms] !font-normal !text-white/80">
          Стабильная защита от жары. Физика нанокерамики на десятилетие.
        </HeroSubtitle>
        <Button
          className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms] !bg-white/[0.05] !backdrop-blur-[20px] !border !border-white/20 !text-white hover:!bg-white/[0.08] hover:!border-white/40 !px-12 !h-14 !text-lg !font-bold tracking-tight shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all active:scale-95 group/btn"
          href="https://wa.me/79158582115"
          variant="primary"
          size="large"
        >
          <span className="flex items-center gap-2 relative">
            Записаться
            <ChevronIcon className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
          </span>
        </Button>
      </Hero>
    </Container>
  </div>
);
