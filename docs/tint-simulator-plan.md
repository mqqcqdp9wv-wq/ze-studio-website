# 3D Симулятор тонировки — План разработки

> Страница `/simulator` — интерактивный 3D конфигуратор тонировки ZE Studio
> Статус: **В ПЛАНИРОВАНИИ**

---

## 1. КОНЦЕПЦИЯ

Отдельная страница с полноэкранным интерактивным 3D-конфигуратором.
Пользователь видит реалистичную модель кроссовера, выбирает плёнку (MonoCarbon / Centum / Rescue),
меняет VLT%, видит результат в реальном времени. Слайдер "До/После" через WebGL clipping planes.

### Визуальный стиль
- Dark mode, эстетика Linear.app
- Инженерная строгость: mono шрифты, тонкие border, без скругленных углов
- Цвета: bg `#0F0F0F`, text `#F5F5F5`, secondary `#8A8F98`
- Акценты: цвета плёнок (MonoCarbon blue, Centum teal, Rescue purple)

---

## 2. МАТЕРИАЛЫ RAYNO — ДАННЫЕ ДЛЯ КОНФИГУРАТОРА

### MonoCarbon (наноуглерод, поглощение)
- Визуал: глубокий угольно-чёрный, матовый
- VLT варианты: 5%, 15%, 35%, 50%
- ГОСТ: только 50% подходит для передних боковых
- WebGL параметры:
  - VLT 5%:  transmission=0.05, color=#050505, roughness=0.05
  - VLT 15%: transmission=0.20, color=#111111, roughness=0.05
  - VLT 35%: transmission=0.40, color=#212121, roughness=0.05
  - VLT 50%: transmission=0.60, color=#424242, roughness=0.05

### Centum (нанокерамика, спектральная фильтрация)
- Визуал: кристально-прозрачный, лёгкий холодный тон
- VLT: 80% (фиксированный)
- ГОСТ: 100% соответствие для лобового
- Блокировка ИК: до 99%
- WebGL: transmission=0.90, color=#b2dfdb, roughness=0.0

### Rescue (бронеплёнка)
- Визуал: прозрачный с лёгким оттенком
- VLT: зависит от толщины
- Основная фича: защита от удара, не затемнение

### Базовое стекло (для сравнения)
- transmission=0.95, color=#e0f7fa, roughness=0.0, ior=1.52

---

## 3. ТЕХНИЧЕСКАЯ АРХИТЕКТУРА

### Стек
```
React Three Fiber (@react-three/fiber)
Three.js (three)
@react-three/drei (helpers: useGLTF, OrbitControls, Environment, ContactShadows)
Next.js 13 App Router (существующий проект)
Tailwind CSS (существующий)
```

### Новые зависимости (установить)
```bash
npm install three @react-three/fiber @react-three/drei
npm install -D @types/three
```

### Структура файлов
```
app/
  simulator/
    page.tsx              ← страница /simulator
    layout.tsx            ← опционально (без header/footer для immersive)

components/
  simulator/
    tinting-simulator.tsx ← главный компонент
    vehicle-scene.tsx     ← 3D сцена с машиной
    glass-material.tsx    ← MeshPhysicalMaterial для стёкол
    control-panel.tsx     ← UI панель управления
    split-slider.tsx      ← слайдер До/После (clipping planes)
    mobile-fallback.tsx   ← 2D fallback для мобильных

public/
  models/
    crossover.glb         ← 3D модель автомобиля
```

### Физика стекла (MeshPhysicalMaterial)
```typescript
// Ключевые параметры
{
  transparent: true,
  transmission: number,      // 0.05 (5% VLT) → 0.95 (базовое стекло)
  ior: 1.52,                 // индекс преломления стекла
  thickness: 1,              // объём для преломления
  roughness: number,         // 0.0 (керамика) → 0.05 (углерод)
  metalness: 0.1,
  envMapIntensity: 1.5,      // отражения окружения
  clearcoat: 1,
  clearcoatRoughness: 0,
  color: THREE.Color,        // зависит от плёнки и VLT
}
```

### Слайдер До/После — Clipping Planes
```typescript
// Две плоскости: одна отсекает левую часть, другая правую
const clipLeft  = new THREE.Plane(new THREE.Vector3( 1, 0, 0), 0);
const clipRight = new THREE.Plane(new THREE.Vector3(-1, 0, 0), 0);

// В useFrame: синхронизация с UI слайдером (0-100 → мировые координаты)
const physicalX = (splitX / 100) * 4 - 2;
clipLeft.constant = physicalX;
clipRight.constant = -physicalX;

// gl.localClippingEnabled = true; — обязательно
```

### Анимация двери (Lerp)
```typescript
// В useFrame:
const targetAngle = doorOpen ? -Math.PI / 3 : 0; // -60°
doorRef.current.rotation.y = THREE.MathUtils.lerp(
  doorRef.current.rotation.y,
  targetAngle,
  0.1
);
```

---

## 4. UI ПАНЕЛЬ (Linear Style)

### Элементы управления
1. **Выбор плёнки**: кнопки MonoCarbon / Centum / Rescue
2. **VLT уровень**: кнопки 5% / 15% / 35% / 50% (для MonoCarbon)
   - Centum фиксирован на 80%
   - При смене плёнки VLT переключается автоматически
3. **Слайдер До/После**: range input сверху (0-100)
4. **Кнопка "Осмотр салона"**: открыть/закрыть дверь
5. **Бейдж VLT%**: текущее значение
6. **Статус ГОСТ**: зелёный/красный бейдж

### Текстовое наполнение
- MonoCarbon: "Наноуглеродная матрица. Абсолютный матовый чёрный. Гарантия стабильности цвета (<1% выцветания за 10 лет)"
- Centum: "Диэлектрический нано-керамический спектрофильтр. 99% защита от ИК-излучения"
- Rescue: "Бронеплёнка для защиты стекла. Поглощение удара без искажения оптики"

### Мобильная адаптация
- Панель снизу, полная ширина
- 3D сцена меньшей высоты (500px vs 650px desktop)
- Опционально: 2D CSS fallback (clip-path на фото) для слабых устройств

---

## 5. 3D МОДЕЛЬ — ТРЕБОВАНИЯ

### Что нужно в модели
- Формат: `.glb` (binary GLTF)
- Раздельные mesh-объекты для стёкол (именование: `glass`, `window`, `windshield`)
- Раздельный mesh для двери (именование: `door`)
- Кузов как отдельный mesh (`body`, `paint`)
- Оптимальный размер: 1-5 МБ
- Полигонаж: до 100К (для веба)

### Источники
- Sketchfab: https://sketchfab.com/tags/suv (фильтр: Free, GLTF)
- Рекомендация из отчёта: Haval F7 или абстрактный SUV
- Лицензия: CC-BY (указать автора)

### Оптимизация модели
```bash
# Если нужно оптимизировать:
npx gltf-transform optimize crossover.glb crossover-optimized.glb
# или через Blender: уменьшить полигонаж, удалить интерьер если не нужен
```

---

## 6. ОПТИМИЗАЦИЯ

1. **frameloop="demand"** — рендер только при изменениях (экономия батареи)
2. **useGLTF кеширование** — модель загружается один раз
3. **Lazy loading** — `dynamic(() => import('./TintingSimulator'), { ssr: false })`
4. **Environment preset** — "city" (процедурное HDRI, без загрузки файла)
5. **ContactShadows** вместо динамических теней (легче для GPU)
6. **DPR лимит** — `dpr={[1, 2]}` (не выше 2x на retina)
7. **Мобильный fallback** — определяем `window.innerWidth < 768`, показываем 2D версию

---

## 7. ПЛАН РЕАЛИЗАЦИИ (ПОШАГОВЫЙ)

### Фаза 1: Подготовка
- [ ] Установить зависимости: `three`, `@react-three/fiber`, `@react-three/drei`, `@types/three`
- [ ] Найти и скачать 3D модель кроссовера (.glb)
- [ ] Проверить структуру модели (названия mesh-объектов)
- [ ] Положить модель в `public/models/crossover.glb`

### Фаза 2: Базовая 3D сцена
- [ ] Создать `app/simulator/page.tsx`
- [ ] Создать `components/simulator/vehicle-scene.tsx`
- [ ] Загрузить модель через `useGLTF`
- [ ] Настроить `<Canvas>`, `<OrbitControls>`, `<Environment preset="city">`
- [ ] Добавить `<ContactShadows>`
- [ ] Проверить что модель рендерится и вращается

### Фаза 3: Материалы стёкол
- [ ] Создать `components/simulator/glass-material.tsx`
- [ ] Найти стёкла через `scene.traverse()` по именам mesh
- [ ] Применить `MeshPhysicalMaterial` с transmission + ior
- [ ] Подключить state для VLT% → пересчёт параметров материала
- [ ] Проверить визуальную разницу: 5% vs 50% vs 80% (Centum)

### Фаза 4: UI панель управления
- [ ] Создать `components/simulator/control-panel.tsx`
- [ ] Кнопки переключения плёнки (MonoCarbon / Centum / Rescue)
- [ ] Кнопки VLT% (динамически по выбранной плёнке)
- [ ] Бейдж VLT% и статус ГОСТ
- [ ] Описание текущей плёнки
- [ ] Стилизация под Linear.app (тёмный, инженерный)

### Фаза 5: Слайдер До/После
- [ ] Реализовать clipping planes (THREE.Plane)
- [ ] Range input для управления позицией плоскости
- [ ] Два материала на стёклах: заводское + тонировка
- [ ] Синхронизация useFrame → обновление plane.constant
- [ ] Визуальная линия-разделитель

### Фаза 6: Анимация двери
- [ ] Найти mesh двери через scene.traverse
- [ ] Кнопка "Осмотр салона" в UI
- [ ] Lerp анимация в useFrame (0 → -60°)
- [ ] Проверить pivot point (точка вращения двери)

### Фаза 7: Мобильная адаптация
- [ ] Определение мобильного устройства (width < 768)
- [ ] Уменьшенная высота 3D сцены
- [ ] Панель снизу на полную ширину
- [ ] Опционально: 2D fallback с CSS clip-path

### Фаза 8: Интеграция в сайт
- [ ] Ссылка с главной страницы → /simulator
- [ ] Добавить кнопку "Симулятор" в секцию материалов (enjoy-issue-tracking.tsx)
- [ ] Добавить в навигацию (header.tsx)
- [ ] Lazy loading компонента (next/dynamic, ssr: false)
- [ ] Проверить билд: `next build`
- [ ] Проверить деплой на Vercel

### Фаза 9: Полировка
- [ ] Лоадер при загрузке модели (Suspense fallback)
- [ ] Плавные переходы при смене плёнки (анимация transmission)
- [ ] Подсказка "Вращайте модель" с иконкой 360°
- [ ] SEO meta tags для страницы /simulator
- [ ] OG image для шаринга

---

## 8. ССЫЛКИ И РЕСУРСЫ

- [React Three Fiber docs](https://docs.pmnd.rs/react-three-fiber)
- [@react-three/drei](https://github.com/pmndrs/drei)
- [MeshPhysicalMaterial](https://threejs.org/docs/#api/en/materials/MeshPhysicalMaterial)
- [Sketchfab SUV models](https://sketchfab.com/tags/suv)
- [GLTF Transform CLI](https://gltf-transform.dev/cli)

---

## 9. БЛОКЕРЫ

| # | Блокер | Статус | Решение |
|---|--------|--------|---------|
| 1 | 3D модель авто (.glb) | ❌ НЕ НАЙДЕНА | Нужно найти на Sketchfab или предоставить |
| 2 | Структура mesh в модели | ❌ НЕ ПРОВЕРЕНА | После загрузки — обход scene.traverse |
| 3 | Rescue плёнка — VLT данные | ❓ УТОЧНИТЬ | Какие VLT% у Rescue? |

---

*Последнее обновление: 2026-03-03*
*Документ можно продолжить с любой фазы — все зависимости и контекст описаны выше*
