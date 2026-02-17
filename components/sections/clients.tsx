"use client";

import { useState } from "react";
import classNames from "classnames";

const carBrands = [
  "Toyota", "Kia", "Hyundai", "Haval", "Geely",
  "BMW", "Mercedes-Benz", "Audi", "Volkswagen", "Mazda",
  "Nissan", "Honda", "Lexus", "Porsche", "Chery", "Škoda",
  "Mitsubishi", "Subaru", "Infiniti", "Land Rover",
  "Changan", "Omoda", "Exeed", "Lada",
];

export const Clients = () => {
  // Duplicate for seamless loop
  const allBrands = [...carBrands, ...carBrands];

  return (
    <>
      <p className="mb-12 text-center text-2xl md:text-4xl font-medium tracking-tight text-white">
        <span className="text-white">
          Работаем с любыми марками автомобилей.
        </span>
        <br className="hidden md:block" />
        <span className="text-white/50 text-lg md:text-xl font-normal">
          Более 20 000 авто затонировано за 18 лет.
        </span>
      </p>

      {/* Marquee Container with mask */}
      <div
        className="relative overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
        }}
      >
        {/* Scrolling track */}
        <div className="flex items-center gap-4 py-6 animate-marquee">
          {allBrands.map((brand, i) => (
            <div
              key={`${brand}-${i}`}
              className="flex-shrink-0"
            >
              <span className="text-sm md:text-lg font-normal tracking-wide uppercase cursor-default select-none px-6 py-3 whitespace-nowrap text-white/30">
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
