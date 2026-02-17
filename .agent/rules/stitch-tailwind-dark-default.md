# Stitch Tailwind Dark Default

## Activation: Always On

## Правила

Всегда используй React + Tailwind CSS для UI.

Предпочитай тёмную тему (dark mode) по умолчанию, если не указано обратное.

Добавляй JSDoc-комментарии к каждому компоненту: @description, @param, @returns.

Делай responsive дизайн с mobile-first (sm, md, lg breakpoints).

Используй дизайн-токены из DESIGN.md, если файл существует в проекте.

Никогда не используй inline-стили — только Tailwind-классы.

Интегрируй stitch-skills автоматически: если задача про UI/сайт — вызывай enhance-prompt, потом stitch-loop, потом react:components.

## Применение

Это правило применяется ко всем проектам, использующим Stitch MCP.

### Порядок вызова skills для UI-задач

1. **enhance-prompt** — улучшить промпт
2. **stitch-loop** — сгенерировать через Stitch
3. **react:components** — конвертировать в React
4. **design-md** — документировать стили

### Дефолтные настройки Tailwind

```css
/* Тёмная тема по умолчанию */
:root {
  --bg-primary: #080808;
  --bg-surface: #121212;
  --bg-elevated: #1A1A1A;
  --text-primary: #FAFAFA;
  --text-secondary: #A1A1AA;
  --accent-primary: #00E599; /* ZE Green */
}
```

### Структура компонента

```tsx
/**
 * @description Краткое описание компонента
 * @param {Props} props - Пропсы компонента
 * @returns {JSX.Element} Рендер компонента
 */
export const ComponentName = ({ prop1, prop2 }: Props): JSX.Element => {
  return (
    <div className="bg-bg-primary text-text-primary">
      {/* Mobile-first responsive */}
      <div className="p-4 sm:p-6 md:p-8 lg:p-12">
        {/* Content */}
      </div>
    </div>
  );
};
```
