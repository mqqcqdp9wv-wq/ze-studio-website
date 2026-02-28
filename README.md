# ZE Studio — Landing Page

Лендинг студии тонировки автомобилей **ZE Studio** (г. Липецк).
Сайт рассказывает о материалах, технологии монтажа и преимуществах студии.

🌐 **Живой сайт:** [ze-studio48.ru](https://ze-studio48.ru)
🔗 **Preview:** [mqqcqdp9wv-wq.github.io/ze-studio-website](https://mqqcqdp9wv-wq.github.io/ze-studio-website/)

---

## Стек

| Технология | Назначение |
|---|---|
| Next.js 13 (App Router) | Фреймворк, статический экспорт |
| TypeScript | Типизация |
| Tailwind CSS | Стилизация |
| Framer Motion | Анимации |

---

## Структура проекта

```
ze-studio-website/
├── app/
│   ├── layout.tsx               # Корневой layout (Header, Footer, шрифты)
│   └── page.tsx                 # Главная страница — порядок секций
│
├── components/
│   ├── sections/                # Секции страницы
│   │   ├── homepage-hero.tsx        # Главный экран (Hero)
│   │   ├── clients.tsx              # Марки авто (бегущая строка)
│   │   ├── enjoy-issue-tracking.tsx # Блок материалов Rayno
│   │   ├── build-momentum.tsx       # Блок исполнения / монтажа
│   │   └── set-direction.tsx        # Финальный CTA
│   │
│   ├── icons/                   # SVG-иконки
│   │   ├── features.tsx             # Иконки для фичей
│   │   ├── materials.tsx            # Иконки блока материалов
│   │   └── logo.tsx                 # Логотип ZE Studio
│   │
│   ├── ui/                      # Переиспользуемые UI-компоненты
│   │   └── flip-words.tsx           # Анимированная смена слов
│   │
│   ├── material-carousel.tsx    # Карточки материалов (MonoCarbon, Centum, Rescue)
│   ├── header.tsx               # Хедер с навигацией
│   ├── footer.tsx               # Футер
│   ├── features.tsx             # Обёртка для Feature-секций
│   └── container.tsx            # Контейнер с max-width
│
├── public/                      # Статика (изображения, видео)
├── styles/
│   └── globals.css              # Глобальные стили и утилиты
├── tailwind.config.js           # Кастомная тема Tailwind
└── next.config.js               # Конфиг Next.js (basePath, static export)
```

---

## Запуск локально

```bash
# Установить зависимости
npm install

# Запустить dev-сервер
npm run dev
# → http://localhost:3000

# Собрать статику для продакшена
npm run build
```

---

## Деплой

Деплой автоматический через **GitHub Actions** при пуше в `main`.
Собирается статический экспорт Next.js и публикуется на GitHub Pages.

Workflow: `.github/workflows/nextjs.yml`

---

## Автор

**Влад Любимов** — разработка и дизайн
Студия: [ZE Studio](https://ze-studio48.ru) — профессиональная тонировка, Липецк
