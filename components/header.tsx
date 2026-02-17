"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./button";
import { Container } from "./container";
import { HamburgerIcon } from "./icons/hamburger";
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

const navItems = [
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
      "fixed top-0 left-0 z-10 w-full transition-all duration-500",
      hasScrolled
        ? "border-b border-white/[0.08] backdrop-blur-[12px] bg-black/80"
        : "border-b border-transparent bg-transparent"
    )}>
      <Container className="flex h-navigation-height items-center">
        <Link className="flex items-center gap-2" href="/">
          <span className="logo-gradient text-xl font-black tracking-tighter">ze.studio</span>
        </Link>

        <div
          className={classNames(
            "flex-1 flex justify-center transition-[visibility] md:visible",
            hamburgerMenuIsOpen ? "visible" : "delay-500 invisible"
          )}
        >
          <nav
            className={classNames(
              "fixed top-navigation-height left-0 h-[calc(100vh_-_var(--navigation-height))] w-full overflow-auto bg-background transition-opacity duration-500 md:relative md:top-0 md:block md:h-auto md:w-auto md:translate-x-0 md:overflow-hidden md:bg-transparent md:opacity-100 md:transition-none",
              hamburgerMenuIsOpen
                ? "translate-x-0 opacity-100"
                : "translate-x-[-100vw] opacity-0"
            )}
          >
            <ul
              className={classNames(
                "flex h-full flex-col md:flex-row md:items-center md:gap-x-8 [&_li]:border-b [&_li]:border-grey-dark md:[&_li]:border-none",
                "ease-in [&_a:hover]:text-grey [&_a]:flex [&_a]:h-navigation-height [&_a]:w-full [&_a]:translate-y-8 [&_a]:items-center [&_a]:gap-2 [&_a]:text-lg [&_a]:transition-[color,transform] [&_a]:duration-300 md:[&_a]:translate-y-0 md:[&_a]:text-sm [&_a]:md:transition-colors",
                hamburgerMenuIsOpen && "[&_a]:translate-y-0"
              )}
            >
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link className="nav-icon-link" href={item.href} title={item.label}>
                      <div className="nav-icon-wrapper">
                        <Icon className="nav-icon w-5 h-5 opacity-80" />
                      </div>
                      <span className="md:hidden ml-2">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="ml-auto flex h-full items-center">
          <Link href="#" className="nav-action-btn">
            Записаться
          </Link>
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
