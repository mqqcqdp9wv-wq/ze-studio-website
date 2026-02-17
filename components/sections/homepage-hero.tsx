import { Button, Highlight } from "../button";
import { Hero, HeroTitle, HeroSubtitle } from "../hero";
import { ChevronIcon } from "../icons/chevron";
import { Container } from "../container";

export const HomepageHero = () => (
  <div className="relative w-full h-screen overflow-hidden">
    {/* Video */}
    <video
      className="absolute inset-0 w-full h-full object-cover"
      src="/img/hero-video.mp4"
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

    {/* Text Content — on top of video, centered */}
    <Container className="relative z-10 flex flex-col items-center justify-center h-full text-center -mt-20">
      <Hero>
        <Button
          className="translate-y-[-1rem] animate-fade-in opacity-0"
          href="/monocarbon"
          variant="secondary"
          size="small"
        >
          <span>Rayno MonoCarbon</span>{" "}
          <Highlight>→</Highlight>
        </Button>
        <HeroTitle className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
          Тонировка нового поколения
        </HeroTitle>
        <HeroSubtitle className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
          Стабильная защита от жары. Физика нанокерамики на десятилетие.
        </HeroSubtitle>
        <Button
          className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms]"
          href="https://wa.me/79158582115"
          variant="primary"
          size="large"
        >
          <span>Записаться </span>
          <Highlight>
            <ChevronIcon />
          </Highlight>
        </Button>
      </Hero>
    </Container>
  </div>
);
