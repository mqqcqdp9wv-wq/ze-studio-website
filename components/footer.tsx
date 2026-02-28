import Link from "next/link";
import { Container } from "./container";

const footerLinks = [
  {
    title: "Протоколы",
    links: [
      { title: "Протокол Signal", href: "#" },
      { title: "Стандарт Carbon", href: "#" },
      { title: "Пакет Climate Control", href: "#" },
      { title: "Протокол Shield", href: "#" },
      { title: "Комплекс Factory Plus", href: "#" },
    ],
  },
  {
    title: "О студии",
    links: [
      { title: "Философия Engineering Cool", href: "#" },
      { title: "Инженерный подход", href: "#" },
      { title: "Мастер Елена Захарова", href: "#" },
    ],
  },
  {
    title: "Клиентам",
    links: [
      { title: "Система гарантий", href: "#" },
      { title: "Сертификация и контроль", href: "#" },
      { title: "FAQ", href: "#" },
    ],
  },
  {
    title: "Технологии",
    links: [
      { title: "Физика Nano-Carbon", href: "#" },
      { title: "Керамический императив", href: "#" },
      { title: "Протокол No-Touch", href: "#" },
    ],
  },
];

export const Footer = () => (
  <footer className="relative mt-12 border-t border-transparent-white py-[5.6rem] text-sm overflow-hidden">
    {/* top glow — subtle gradient matching the FAQ block above */}
    <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-[linear-gradient(to_right,transparent,rgba(93,52,221,0.4)_40%,rgba(93,52,221,0.4)_60%,transparent)]" />
    <div className="pointer-events-none absolute inset-x-0 top-0 h-[20rem] bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgba(93,52,221,0.06),transparent)]" />

    <Container className="flex flex-col justify-between lg:flex-row">
      <div>
        <div className="flex h-full flex-row justify-between lg:flex-col">
          <div className="flex flex-col gap-1 text-grey">
            <span className="logo-gradient text-md font-semibold tracking-[0.15em] uppercase">
              ze.studio
            </span>
            <span className="text-xs opacity-50 tracking-wide">
              Инженерное ателье защиты остекления
            </span>
          </div>
          <div className="mt-auto pt-6 text-xs text-grey opacity-60">
            ze.studio • Липецк
          </div>
        </div>
      </div>
      <div className="flex flex-wrap">
        {footerLinks.map((column) => (
          <div
            key={column.title}
            className="mt-10 min-w-[50%] lg:mt-0 lg:min-w-[18rem]"
          >
            <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-white/30">
              {column.title}
            </h3>
            <ul>
              {column.links.map((link) => (
                <li key={link.title} className="[&_a]:last:mb-0">
                  <Link
                    className="mb-3 block text-grey transition-colors hover:text-off-white"
                    href={link.href}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Container>
  </footer>
);
