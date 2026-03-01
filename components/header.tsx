"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Container } from "./container";
import { HamburgerIcon } from "./icons/hamburger";
import { NavTabs } from "./shifting-drop-down";
import classNames from "classnames";
import {
  Home,
  Droplets,
  Thermometer,
  Sliders,
  User,
  Newspaper,
  Phone,
} from "lucide-react";
import { SparkleButton } from "./ui/sparkle-button";

const mobileNavItems = [
  { label: "Главная", href: "/", icon: Home },
  { label: "Углерод", href: "/monocarbon", icon: Droplets },
  { label: "Керамика", href: "/ceramic", icon: Thermometer },
  { label: "Подбор", href: "/tinting-model", icon: Sliders },
  { label: "О мастере", href: "#about", icon: User },
  { label: "Новости", href: "/blog", icon: Newspaper },
  { label: "Контакты", href: "#contacts", icon: Phone },
];

export const Header = () => {
  const [hamburgerMenuIsOpen, setHamburgerMenuIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const html = document.querySelector("html");
    if (html) html.classList.toggle("overflow-hidden", hamburgerMenuIsOpen);
  }, [hamburgerMenuIsOpen]);

  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const closeHamburgerNavigation = () => setHamburgerMenuIsOpen(false);

    window.addEventListener("orientationchange", closeHamburgerNavigation);
    window.addEventListener("resize", closeHamburgerNavigation);

    return () => {
      window.removeEventListener("orientationchange", closeHamburgerNavigation);
      window.removeEventListener("resize", closeHamburgerNavigation);
    };
  }, [setHamburgerMenuIsOpen]);

  return (
    <header className={classNames(
      "fixed top-0 left-0 z-50 w-full transition-all duration-500",
      hasScrolled
        ? "border-b border-white/[0.05] backdrop-blur-[32px] bg-black/30"
        : "border-b border-transparent bg-transparent"
    )}>
      <Container className="flex h-navigation-height items-center !max-w-[1400px]">
        <Link className="flex items-center gap-4 group" href="/">
          <div className="flex items-center gap-3">
            <span className="text-gradient text-2xl font-bold tracking-tighter select-none">
              ZE
            </span>
            <div className="w-[1px] h-5 bg-white/30 transition-all duration-500 group-hover:bg-white/60" />
            <span className="logo-gradient text-lg font-light tracking-[0.3em] uppercase opacity-80 group-hover:opacity-100 transition-opacity">
              Studio
            </span>
          </div>
        </Link>

        {/* Desktop: новое выпадающее меню */}
        <div className="hidden md:flex flex-1 justify-center">
          <NavTabs />
        </div>

        {/* Mobile: гамбургер-меню с иконками */}
        <div
          className={classNames(
            "flex-1 flex justify-center transition-[visibility] md:hidden",
            hamburgerMenuIsOpen ? "visible" : "delay-500 invisible"
          )}
        >
          <nav
            className={classNames(
              "fixed top-navigation-height left-0 h-[calc(100vh_-_var(--navigation-height))] w-full overflow-auto bg-background transition-opacity duration-500",
              hamburgerMenuIsOpen
                ? "translate-x-0 opacity-100"
                : "translate-x-[-100vw] opacity-0"
            )}
          >
            <ul
              className={classNames(
                "flex h-full flex-col [&_li]:border-b [&_li]:border-grey-dark",
                "ease-in [&_a:hover]:text-grey [&_a]:flex [&_a]:h-navigation-height [&_a]:w-full [&_a]:translate-y-8 [&_a]:items-center [&_a]:gap-2 [&_a]:text-lg [&_a]:transition-[color,transform] [&_a]:duration-300",
                hamburgerMenuIsOpen && "[&_a]:translate-y-0"
              )}
            >
              {mobileNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      className="nav-icon-link"
                      href={item.href}
                      title={item.label}
                      onClick={() => setHamburgerMenuIsOpen(false)}
                    >
                      <div className="nav-icon-wrapper">
                        <Icon className="nav-icon w-5 h-5 opacity-80" />
                      </div>
                      <span className="ml-2">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="ml-auto flex h-full items-center">
          <SparkleButton href="https://wa.me/79158582115" external className="nav-action-btn">
            Записаться
          </SparkleButton>
        </div>

        <button
          className="ml-6 md:hidden"
          onClick={() => setHamburgerMenuIsOpen((open) => !open)}
        >
          <span className="sr-only">Toggle menu</span>
          <HamburgerIcon />
        </button>
      </Container>
    </header>
  );
};
