import classNames from "classnames";

interface HeroProps {
  children: React.ReactNode;
}

interface HeroElementProps {
  children: React.ReactNode;
  className?: string;
}

export const HeroTitle = ({ children, className }: HeroElementProps) => {
  return (
    <h1
      className={classNames(
        "text-gradient my-6 text-6xl md:text-8xl font-medium tracking-tighter leading-tight",
        className
      )}
      style={{ textShadow: "0 4px 24px rgba(0,0,0,0.4)" }}
    >
      {children}
    </h1>
  );
};

export const HeroSubtitle = ({ children, className }: HeroElementProps) => {
  return (
    <p
      className={classNames(
        "mb-12 text-xl text-primary-text md:text-2xl font-light tracking-wide max-w-lg md:max-w-3xl md:mx-auto",
        className
      )}
      style={{ textShadow: "0 2px 16px rgba(0,0,0,0.5)" }}
    >
      {children}
    </p>
  );
};

export const Hero = ({ children, className }: HeroProps & { className?: string }) => {
  return <div className={classNames("text-left md:text-center w-full", className)}>{children}</div>;
};
