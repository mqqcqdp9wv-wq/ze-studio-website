# ZE Studio — План разработки

## Статус

**Активный этап:** Header ✅ → Hero ⏳

## Подход

Адаптируем клон Linear (не пишем с нуля).
Заменяем контент, сохраняем эффекты.

---

## Структура главной

1. Header ✅
2. Hero ⏳
3. Проблема
4. Решение (Rayno)
5. Преимущества
6. Цены
7. О мастере
8. Процесс
9. Гарантии
10. Отзывы
11. FAQ
12. Бронирование
13. Контакты
14. Footer

---

## Страницы

- /углерод (monocarbon)
- /ceramic
- /tinting-model
- /broneplenka
- /blog

---

## Бриф

См. файл: `.gemini/antigravity/brain/.../brief.md`

## Детальный план

См. файл: `.gemini/antigravity/brain/.../implementation_plan.md`

---

## Журнал изменений

### 2026-02-10 — Hero Section: Full-Screen Video

**Файлы:**

- `components/sections/homepage-hero.tsx` — полная переработка
- `components/hero.tsx` — обновлены стили заголовка и подзаголовка
- `components/button.tsx` — новый стиль primary-кнопки
- `tailwind.config.js` — фон изменён на чистый чёрный
- `styles/globals.css` — html/body background: #000

**Что сделано:**

- Видео на весь экран (100vh), edge-to-edge, с текстом поверх
- Градиенты сверху/снизу (55%) для бесшовного слияния с чёрным фоном
- Фон сайта — чистый `#000000` (был `#08090A`)
- html/body `background-color: #000` — убран серый зазор при overscroll
- Убрали «Smart Premium.» из заголовка → «Тонировка нового поколения»
- Заголовок: `text-8xl`, `font-medium`, `tracking-tighter`, `leading-tight`, `text-shadow`
- Подзаголовок: `text-2xl`, `font-light`, `tracking-wide`, `text-shadow`
- Кнопка «Записаться»: стекло-стиль вместо фиолетового градиента
- Текстовый блок сдвинут чуть выше центра (`-mt-20`) для оптического баланса
