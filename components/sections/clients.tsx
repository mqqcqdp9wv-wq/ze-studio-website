"use client";

import React, { useEffect, useState, useRef } from "react";
import classNames from "classnames";
import { useInView } from "react-intersection-observer";

const carBrands = [
  "Toyota", "Kia", "Hyundai", "Haval", "Geely",
  "BMW", "Mercedes-Benz", "Audi", "Volkswagen", "Mazda",
  "Nissan", "Honda", "Lexus", "Porsche", "Chery", "Skoda",
  "Mitsubishi", "Subaru", "Infiniti", "Land Rover",
  "Changan", "Omoda", "Exeed", "Lada",
];

const AnimatedNumber = ({ value, duration = 2000 }: { value: number, duration?: number }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });
  const countRef = useRef(0);

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = value;
      const range = end - start;
      const increment = end > start ? 1 : -1;
      const stepTime = Math.abs(Math.floor(duration / range));

      const timer = setInterval(() => {
        start += increment;
        setCount(start);
        if (start === end) {
          clearInterval(timer);
        }
      }, stepTime || 10);

      return () => clearInterval(timer);
    }
  }, [inView, value, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};

export const Clients = () => {
  return (
    <div className="py-24 border-y border-white/[0.05] relative overflow-hidden group">
      {/* Background sweep light effect */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />
      </div>

      <div className="relative z-10 mb-16 text-center flex flex-col items-center gap-6">
        <h2 className="text-4xl md:text-6xl font-semibold tracking-tighter text-white leading-[1.05] px-4">
          Работаем с любыми <br /> марками автомобилей
        </h2>
        <p className="text-white/40 text-xl md:text-2xl font-normal tabular-nums flex flex-wrap items-center justify-center gap-x-2">
          <span>Более <span className="text-white font-medium min-w-[70px] inline-block text-center"><AnimatedNumber value={20000} duration={1500} /></span> проектов</span>
          <span>выполнено за <span className="text-white font-medium min-w-[24px] inline-block text-center"><AnimatedNumber value={18} duration={1500} /></span> лет</span>
        </p>
      </div>

      <div
        className="relative overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
        }}
      >
        <div className="flex items-center gap-16 py-8 animate-marquee md:animate-marquee-desktop">
          {[...carBrands, ...carBrands].map((brand, i) => (
            <span
              key={i}
              className={classNames(
                "text-2xl md:text-3xl font-bold tracking-tighter cursor-default select-none whitespace-nowrap transition-all duration-500",
                "text-white/20 hover:text-white hover:drop-shadow-[0_0_15px_rgba(74,123,247,0.8)]"
              )}
            >
              {brand}
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};
