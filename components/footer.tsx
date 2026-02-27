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
  <footer className="mt-12 border-t border-transparent-white py-[5.6rem] text-sm">
    <Container className="flex flex-col justify-between lg:flex-row">
      <div>
        <div className="flex h-full flex-row justify-between lg:flex-col">
          <div className="flex flex-col gap-1 text-grey">
            <span className="logo-gradient text-md font-bold">ze.studio</span>
            <span className="text-xs opacity-50">
              Инженерное ателье защиты остекления
            </span>
          </div>
          <div className="mt-auto pt-6 text-xs text-grey opacity-40">
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
            <h3 className="mb-3 font-medium">{column.title}</h3>
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
