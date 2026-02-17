---
description: Автоматическая сборка сайта через Stitch MCP
---

# Build Stitch Site Workflow

Этот workflow автоматизирует полный цикл создания сайта через Stitch.

## Шаги

1. **Улучши промпт пользователя** с помощью `enhance-prompt` skill.
   - Прочитай `/Users/lubimov/Documents/ZE.Studio/site/copyLinare/.agent/skills/enhance-prompt/SKILL.md`
   - Преобразуй пользовательский запрос в оптимизированный Stitch-промпт

2. **Запусти stitch-loop** для генерации многостраничного сайта через Stitch MCP.
   - Прочитай `/Users/lubimov/Documents/ZE.Studio/site/copyLinare/.agent/skills/stitch-loop/SKILL.md`
   - Создай `SITE.md` если не существует
   - Создай/обнови `next-prompt.md`
   - Итеративно генерируй страницы

3. **Конвертируй экраны в React** с помощью `react:components` skill.
   - Прочитай `/Users/lubimov/Documents/ZE.Studio/site/copyLinare/.agent/skills/react-components/SKILL.md`
   - Преобразуй HTML в чистые React-компоненты

4. **Сгенерируй DESIGN.md** с помощью `design-md` skill.
   - Прочитай `/Users/lubimov/Documents/ZE.Studio/site/copyLinare/.agent/skills/design-md/SKILL.md`
   - Документируй дизайн-систему

// turbo
5. **Запусти preview в браузере**

   ```bash
   npm run dev
   ```

1. **Спроси пользователя**: "Готово. Нужно доработать дизайн/функционал или деплоить на Netlify?"
