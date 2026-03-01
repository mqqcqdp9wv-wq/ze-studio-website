"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import classNames from "classnames";

interface Particle {
  id: number;
  x: number;
  y: number;
  tx: number;
  ty: number;
  rot: number;
  size: number;
  dur: number;
  color: string;
  glyph: string;
}

let pid = 0;

// ZE Studio brand colors — blue, cyan, purple, white
const COLORS = [
  "#4A7BF7",          // MonoCarbon blue
  "#00E1F4",          // Centum cyan
  "#8B5CF6",          // Rescue purple
  "rgba(255,255,255,0.9)", // white
  "#7AAEFF",          // light blue
  "#C4B5FD",          // light purple
];

// Mix of star glyphs — different sizes feel
const GLYPHS = ["✦", "✦", "✦", "·", "✧", "⋆"];

export const SparkleButton = ({
  children,
  href,
  external = false,
  className,
  onClick,
}: {
  children: React.ReactNode;
  href?: string;
  external?: boolean;
  className?: string;
  onClick?: () => void;
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const activeRef = useRef(false);
  const wrapRef = useRef<HTMLElement>(null);

  const spawn = useCallback(() => {
    if (!activeRef.current) return;
    const angle = Math.random() * Math.PI * 2;
    const dist = 24 + Math.random() * 36;
    const p: Particle = {
      id: pid++,
      x: 8 + Math.random() * 84,
      y: 10 + Math.random() * 80,
      tx: Math.cos(angle) * dist,
      ty: Math.sin(angle) * dist - 14,
      rot: (Math.random() - 0.5) * 220,
      size: 6 + Math.random() * 9,
      dur: 500 + Math.random() * 400,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      glyph: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
    };
    setParticles((prev) => [...prev, p]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((s) => s.id !== p.id));
    }, p.dur + 60);
  }, []);

  const start = useCallback(() => {
    activeRef.current = true;
    spawn();
    timerRef.current = setInterval(spawn, 80);
  }, [spawn]);

  const stop = useCallback(() => {
    activeRef.current = false;
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => () => stop(), [stop]);

  const handlers = { onMouseEnter: start, onMouseLeave: stop };

  const inner = (
    <>
      {particles.map((p) => (
        <span
          key={p.id}
          aria-hidden
          className="pointer-events-none absolute select-none leading-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: p.size,
            color: p.color,
            filter: `drop-shadow(0 0 4px ${p.color})`,
            animation: `ze-sparkle ${p.dur}ms ease-out forwards`,
            "--tx": `${p.tx}px`,
            "--ty": `${p.ty}px`,
            "--rot": `${p.rot}deg`,
          } as React.CSSProperties}
        >
          {p.glyph}
        </span>
      ))}
      {children}
    </>
  );

  const cls = classNames("relative overflow-visible", className);

  if (href && external) {
    return (
      <a ref={wrapRef as React.RefObject<HTMLAnchorElement>} href={href} className={cls} {...handlers}>
        {inner}
      </a>
    );
  }

  if (href) {
    return (
      <Link ref={wrapRef as React.RefObject<HTMLAnchorElement>} href={href} className={cls} {...handlers}>
        {inner}
      </Link>
    );
  }

  return (
    <button ref={wrapRef as React.RefObject<HTMLButtonElement>} className={cls} onClick={onClick} {...handlers}>
      {inner}
    </button>
  );
};
