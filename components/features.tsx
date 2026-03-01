"use client";

import classNames from "classnames";
import { Container } from "./container";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { TextScramble } from "./ui/text-scramble";

type FeaturesProps = {
  children: React.ReactNode;
  color: string;
  colorDark: string;
};

export const Features = ({ children, color, colorDark }: FeaturesProps) => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: false });

  return (
    <section
      ref={ref}
      className={classNames(
        "after:bg-[radial-gradient(ellipse_80%_30%_at_50%_15%,rgba(var(--feature-color),0.12),transparent)] relative flex flex-col items-center overflow-x-clip before:pointer-events-none before:absolute before:h-[20rem] md:before:h-[40rem] before:w-full before:bg-[conic-gradient(from_90deg_at_80%_50%,#000212,rgb(var(--feature-color-dark))),conic-gradient(from_270deg_at_20%_50%,rgb(var(--feature-color-dark)),#000212)] before:bg-no-repeat before:transition-[transform,opacity] before:duration-1000 before:ease-in before:[mask:radial-gradient(ellipse_at_center,_black_10%,_transparent_70%)] before:[background-size:50%_100%,50%_100%] before:[background-position:1%_0%,99%_0%] after:pointer-events-none after:absolute after:inset-0",
        inView &&
        "is-visible before:opacity-100 before:[transform:rotate(180deg)_scale(2)]",
        !inView && "before:rotate-180 before:opacity-40"
      )}
      style={
        {
          "--feature-color": color,
          "--feature-color-dark": colorDark,
        } as React.CSSProperties
      }
    >
      <div className="mt-[12.8rem] mb-16 w-full md:mt-[25.2rem] md:mb-[12.8rem]">
        {children}
      </div>
    </section>
  );
};

type MainFeatureProps = {
  image: string | React.ReactNode;
  text: React.ReactNode;
  title: React.ReactNode;
  imageSize?: "small" | "large";
};

const MainFeature = ({
  image,
  text,
  title,
  imageSize = "small",
}: MainFeatureProps) => {
  return (
    <>
      <div className="relative before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_50%_50%_at_center,rgba(var(--feature-color),0.1),transparent)]">
        <Container
          className={classNames(
            "max-w-[90%] text-center",
            imageSize === "small" ? "w-[78rem]" : "w-[102.4rem]"
          )}
        >
          <h2 className="mb-11 translate-y-[40%] text-center [transition:transform_1000ms_cubic-bezier(0.3,_1.17,_0.55,_0.99)_0s] [.is-visible_&]:translate-y-0">
            {title}
          </h2>
          <div className="relative z-10 rounded-[14px] overflow-hidden backdrop-blur-[6px] before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(rgba(255,_255,_255,_0.3),_rgba(255,_255,_255,_0)_120%)] before:p-[1px] before:[mask:linear-gradient(black,_black)_content-box_content-box,_linear-gradient(black,_black)] before:[mask-composite:xor] after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:bg-[rgba(255,_255,_255,_0.15)] after:[mask:linear-gradient(black,transparent)]">
            {typeof image === "string" ? (
              <img src={image} className="h-auto w-full" />
            ) : (
              <div className="aspect-video w-full">{image}</div>
            )}
          </div>
        </Container>
      </div>
      <Container className="w-[78rem] max-w-[90%] text-center">
        <div className="mx-auto my-16 text-2xl leading-tight text-white md:w-[80%] md:text-4xl text-center">
          {text}
        </div>
        <hr className="mb-[7.2rem] h-[1px] border-none bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.1)_50%,transparent)]" />
      </Container>
    </>
  );
};

type FeatureGridProps = {
  features: {
    icon: React.FC;
    title: string;
    text: string;
  }[];
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const FeatureGrid = ({ features }: FeatureGridProps) => {
  return (
    <Container>
      {/* MOBILE: numbered 1-col list with TextScramble + stagger */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        transition={{ staggerChildren: 0.18 }}
        className="flex flex-col gap-7 mb-16 md:hidden"
      >
        {features.map(({ title, text }, i) => (
          <motion.div
            key={title}
            variants={itemVariants}
            className="flex items-start gap-5"
          >
            <span className="shrink-0 mt-[4px] text-[10px] font-mono select-none w-5 text-right text-white/20 uppercase tracking-widest leading-none">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <p
                className="relative flex items-center gap-1 font-semibold text-[17px] mb-1 leading-snug tracking-tighter font-mono uppercase"
                style={{
                  background: `linear-gradient(to bottom, #fff 20%, rgba(255,255,255,0.45))`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                <TextScramble text={title.replace(/\.$/, "")} delay={i * 180} />
                <span style={{ color: `rgb(var(--feature-color))` }}>.</span>
              </p>
              <p
                className="text-shimmer-desc text-sm leading-relaxed tracking-wide"
                style={{ animationDelay: `${i * 2}s` }}
              >{text}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* DESKTOP: original 3-col grid with icons */}
      <div className="hidden mb-16 md:grid w-full grid-cols-3 place-items-center gap-y-9 text-md text-primary-text md:mb-[14rem]">
        {features.map(({ title, text, icon: Icon }) => (
          <div
            className="max-w-[25.6rem] [&_svg]:mb-[4px] [&_svg]:fill-white md:[&_svg]:mr-[6px] md:[&_svg]:mb-[2px] md:[&_svg]:inline"
            key={title}
          >
            <Icon />
            <span className="block text-white md:inline">{title}</span> {text}
          </div>
        ))}
      </div>
    </Container>
  );
};

type FeatureCardsProps = {
  features: {
    image: string;
    imageClassName: string;
    title: string;
    text: string;
  }[];
};

const FeatureCards = ({ features }: FeatureCardsProps) => {
  return (
    <Container>
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
        {features.map(({ title, text, image, imageClassName }) => (
          <div
            key={title}
            className="relative aspect-[1.1/1] overflow-hidden rounded-[2.4rem] border border-transparent-white bg-[radial-gradient(ellipse_at_center,rgba(var(--feature-color),0.15),transparent)] py-6 px-8 before:pointer-events-none before:absolute before:inset-0 before:bg-glass-gradient md:rounded-[4.8rem] md:p-14"
          >
            <h3 className="mb-2 text-2xl text-white">{title}</h3>
            <p className="max-w-[31rem] text-md text-primary-text">{text}</p>
            <img
              className={classNames("absolute max-w-none", imageClassName)}
              src={image}
            />
          </div>
        ))}
      </div>
    </Container>
  );
};

Features.Main = MainFeature;
Features.Grid = FeatureGrid;
Features.Cards = FeatureCards;
