---
name: "Маршрут ЕГЭ"
description: "Спокойная EdTech-система подготовки к ЕГЭ и ОГЭ через диагностику, персональный маршрут, прогресс и наставника."
colors:
  route-navy: "#071e55"
  route-navy-soft: "#12306b"
  route-blue: "#1ea7ff"
  route-cyan: "#20d6d2"
  route-purple: "#7657ff"
  route-lavender: "#b7a7ff"
  surface-sky: "#f4f8ff"
  surface-sky-soft: "#eef6ff"
  surface-white: "#fffffe"
  text-primary: "#17264a"
  text-muted: "#667399"
  border-soft: "#e3ecfa"
  success: "#1f9d78"
  danger: "#c4475d"
typography:
  display:
    fontFamily: "Manrope, Inter, Golos Text, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "clamp(2.55rem, 5vw, 3.9rem)"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "0"
  headline:
    fontFamily: "Manrope, Inter, Golos Text, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "clamp(2rem, 4.4vw, 3.5rem)"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "0"
  title:
    fontFamily: "Manrope, Inter, Golos Text, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "1.35rem"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "0"
  body:
    fontFamily: "Manrope, Inter, Golos Text, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0"
  label:
    fontFamily: "Manrope, Inter, Golos Text, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "0.82rem"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "0.08em"
rounded:
  sm: "18px"
  md: "28px"
  lg: "36px"
  modal: "34px"
  panel: "40px"
  pill: "999px"
spacing:
  "1": "4px"
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "6": "24px"
  "8": "32px"
  "12": "48px"
  "16": "64px"
  "22": "88px"
components:
  button-primary:
    backgroundColor: "{colors.route-blue}"
    textColor: "{colors.surface-white}"
    rounded: "{rounded.pill}"
    padding: "14px 24px"
    height: "52px"
    typography: "{typography.label}"
  button-secondary:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.route-navy}"
    rounded: "{rounded.pill}"
    padding: "14px 24px"
    height: "52px"
    typography: "{typography.label}"
  card:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    padding: "clamp(22px, 3vw, 28px)"
  dashboard-panel:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
    padding: "clamp(20px, 4vw, 30px)"
  input-field:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.sm}"
    padding: "14px 16px"
---

# Design System: Маршрут ЕГЭ

## 1. Overview

**Creative North Star: "Спокойная навигационная карта"**

Маршрут ЕГЭ выглядит как светлая продуктовая навигация для ученика, которому нужно понять ближайший шаг, а не как рекламная школа с давлением. Визуальная система строится вокруг маршрута: диагностика, слабые темы, план недели, прогресс, пробники, наставник и родительская прозрачность должны постоянно появляться в интерфейсе как реальные механики.

Физическая сцена: ученик или родитель открывает сайт вечером на телефоне или ноутбуке, в состоянии тревоги перед экзаменом, и должен быстро почувствовать порядок. Поэтому тема светлая, фон мягкий голубой, поверхности чистые, акценты технологичные, а движение спокойное и управляемое.

Система отвергает агрессивный экзаменационный маркетинг, красные CTA, страх провала, кислотные цвета, черные фоны, мемную школьную стилистику, жесткие углы и обещания гарантированного результата.

**Key Characteristics:**
- Светлый технологичный EdTech, без паники и визуального шума.
- Маршрут и прогресс важнее абстрактных обещаний.
- Дашбордные элементы используются как доказательство продукта.
- Градиент работает как сигнал персонального маршрута, а не как заливка всей страницы.
- Мобильная компоновка считается основной, десктоп добавляет плотность и двухколоночные сцены.

## 2. Colors

Палитра холодная, чистая и навигационная: глубокий синий дает доверие, голубой и циан показывают движение, фиолетовый отвечает за персонализацию и технологичность.

### Primary

- **Route Navy** (`#071e55`): главный цвет заголовков, бренда, стратегических акцентов и затемнения модального backdrop. Он удерживает доверие и не дает странице стать детской.
- **Route Blue** (`#1ea7ff`): основной цвет действий, прогресса, активных элементов, фокусных состояний и начала главного градиента.

### Secondary

- **Calm Cyan** (`#20d6d2`): поддерживающий цвет заботы, обновления маршрута, прогресс-логики и средней точки градиента.
- **Personal Purple** (`#7657ff`): цвет персонализации, диагностических бейджей, eyebrow-текста, мягких выделений и завершающей точки градиента.

### Tertiary

- **Route Lavender** (`#b7a7ff`): мягкий декоративный оттенок для фоновых световых пятен и вторичных подложек. Использовать редко.
- **Progress Success** (`#1f9d78`): только для положительной динамики и подтверждений, например `+11 баллов`.
- **Validation Danger** (`#c4475d`): только для ошибок формы. Не использовать как маркетинговый CTA.

### Neutral

- **Surface Sky** (`#f4f8ff`): основной фон страницы и полноэкранных app-view.
- **Surface Sky Soft** (`#eef6ff`): подложки ближайшего шага, чеклистов, родительских блоков и внутренних дашбордных рядов.
- **Warm White Surface** (`#fffffe`): карточки, модальные окна, кнопки secondary, тосты и внутренние панели.
- **Text Primary** (`#17264a`): основной текст, когда navy слишком доминирует.
- **Text Muted** (`#667399`): пояснения, подписи, вторичные метки и спокойные описания.
- **Border Soft** (`#e3ecfa`): границы карточек, навигации, форм, разделителей и прогресс-треков.

### Named Rules

**The Route Gradient Rule.** Основной градиент `linear-gradient(135deg, #1ea7ff 0%, #20d6d2 45%, #7657ff 100%)` нужен для первичных действий, прогресса, CTA-панелей, номеров шагов, brand mark и аватаров. Не заливать им всю страницу.

**The No Panic Rule.** Красный используется только для ошибок в форме. Нельзя использовать danger-цвет для срочности, скидок, запугивания или экзаменационной тревоги.

**The Tinted Surface Rule.** Белые поверхности должны оставаться слегка теплыми (`#fffffe`) и почти всегда жить на голубом фоне или с голубой границей. Не вводить чистый белый и чистый черный.

## 3. Typography

**Display Font:** Manrope with Inter, Golos Text, system-ui fallback  
**Body Font:** Manrope with Inter, Golos Text, system-ui fallback  
**Label/Mono Font:** Manrope, no separate mono family

**Character:** Один уверенный гротеск делает бренд современным и собранным. Высокий вес заголовков создает ощущение маршрута и контроля, а спокойная строка тела удерживает родительскую понятность.

### Hierarchy

- **Display** (800, `clamp(2.55rem, 5vw, 3.9rem)`, 1.08): главный hero-заголовок. Держать коротким, около 12ch в первом экране.
- **Headline** (800, `clamp(2rem, 4.4vw, 3.5rem)`, 1.08): заголовки секций, результат диагностики и крупные сценарные переходы.
- **Title** (800, `1.35rem`, 1.08): карточки, панели, ближайшие шаги и названия продуктовых сущностей.
- **Body** (400, `1rem`, 1.6): описания, формы, списки и пояснения. Для длинного текста держать ширину около 62-66ch.
- **Lead** (400, `clamp(1.05rem, 2vw, 1.22rem)`, 1.62): вводный текст hero и важные объяснения.
- **Label** (800, `0.82rem`, `0.08em`, uppercase): eyebrow-метки секций. Использовать как навигационные маркеры, не как декоративный шум.
- **Metric** (800-900, `clamp(1.65rem, 3vw, 2.25rem)`, 1): проценты, счетчики, дни до экзамена и результаты. Включать tabular numerals.

### Named Rules

**The Plain Confidence Rule.** Текст должен звучать как продуктовая механика: диагностика, маршрут, слабые темы, пробник, прогресс, наставник. Не писать "качественное образование", "лучшие преподаватели" и похожие общие обещания.

**The No Decorative Type Rule.** Не добавлять serif-display, mono-стилизацию или отрицательный letter-spacing. Бренд уже держится на ясном гротеске и дашбордной структуре.

## 4. Elevation

Система использует гибрид: мягкие тени показывают интерактивные и дашбордные поверхности, а тональные голубые подложки показывают вложенность внутри карточек. Тень не должна превращать страницу в набор тяжелых всплывающих карточек, ее роль скорее ambient, чем драматическая.

### Shadow Vocabulary

- **Small Ambient** (`0 10px 24px rgba(25, 55, 120, 0.07)`): secondary-кнопки, floating chips, небольшие карточки и спокойные hover-состояния.
- **Medium Panel** (`0 18px 50px rgba(25, 55, 120, 0.08)`): основные карточки, дашбордные панели, модальные поверхности и мобильное меню.
- **Large Conversion** (`0 28px 70px rgba(25, 55, 120, 0.14)`): featured-тариф, CTA-панель, toast и наиболее важные overlay-поверхности.
- **Blue Action Glow** (`0 14px 32px rgba(30, 167, 255, 0.28)`): primary-кнопки и элементы маршрута с градиентом.

### Named Rules

**The Depth Means Product Rule.** Поднимать стоит только элементы, которые являются интерфейсом: маршрут, кабинет, диагностика, форма, CTA или состояние. Обычный контент лучше держать через spacing и тональный фон.

**The Focus Is Visible Rule.** Общий focus-visible: `3px solid rgba(30, 167, 255, 0.72)` с offset `4px`. У вариантов выбора focus идет на видимый `span`, чтобы клавиатурная навигация оставалась понятной.

## 5. Components

### Buttons

Кнопки крупные, округлые и уверенные, с иконкой-стрелкой там, где действие ведет дальше по маршруту.

- **Shape:** pill (`999px`), min-height `52px`, padding `14px 24px`, gap `10px`.
- **Primary:** основной маршрутный градиент, текст `#fffffe`, glow `0 14px 32px rgba(30, 167, 255, 0.28)`. Используется для диагностики, получения маршрута, открытия кабинета и ключевой заявки.
- **Secondary:** почти белая поверхность `rgba(255, 255, 254, 0.9)`, navy-текст, `border-soft`, small ambient shadow. Используется для просмотра маршрута, возврата и менее срочных действий.
- **Hover / Active:** hover поднимает на `-4px`; active возвращает вниз через `translateY(1px) scale(0.99)`. Не анимировать layout.

### Chips

Чипы показывают статус маршрута, формат, слабые темы и факты прогресса.

- **Status chips:** pill, `gradient-soft`, navy-текст, 34px min-height.
- **Floating chips:** белая полупрозрачная поверхность, border-soft, small shadow, blur `16px`. Использовать только вокруг dashboard-сцен, не рассыпать по всем секциям.
- **Topic tags:** purple tint `rgba(118, 87, 255, 0.1)`, navy-текст, compact padding `8px 11px`.

### Cards / Containers

Карточки являются продуктовым доказательством, а не универсальной рамкой для любого текста.

- **Corner Style:** обычные карточки `28px`, маленькие tiles `18-22px`, hero/app panels `36px`, modal `34px`, CTA panel `40px`.
- **Background:** чаще `rgba(255, 255, 254, 0.88)` с border `rgba(227, 236, 250, 0.9)`. Hero-dashboard добавляет два мягких градиентных слоя внутри.
- **Shadow Strategy:** default medium panel, featured large conversion, inner rows через тональный `surface-sky-soft` без тяжелых теней.
- **Internal Padding:** карточки `clamp(22px, 3vw, 28px)`, панели `clamp(20px, 4vw, 30px)`, CTA `clamp(28px, 5vw, 52px)`.
- **Grid Behavior:** repeated cards use `repeat(auto-fit, minmax(..., 1fr))`, no manual breakpoint clutter unless layout changes meaningfully.

### Inputs / Fields

Формы должны ощущаться как спокойная диагностика, не как лидогенерационная ловушка.

- **Style:** full-width fields, border `#e3ecfa`, radius `16px`, background `rgba(255, 255, 254, 0.9)`, padding `14px 16px`.
- **Choice grid:** radio inputs visually become rounded selectable tiles with 48px min-height. Checked state uses `gradient-soft`, blue border and soft blue shadow.
- **Focus:** blue border plus `0 0 0 4px rgba(30, 167, 255, 0.12)`.
- **Error:** danger border and `0 0 0 4px rgba(196, 71, 93, 0.1)`, with a concise status message. No red marketing states.

### Navigation

Header is sticky, translucent and calm: `rgba(244, 248, 255, 0.76)`, border-bottom `rgba(227, 236, 250, 0.78)`, blur `18px`. Brand mark is a 46px rounded square with the route gradient. Desktop shows inline menu and CTA; mobile uses a 46px icon toggle and a separate rounded menu panel.

### Dashboard Surfaces

Dashboard components must show concrete mechanics: progress, weak topics, weekly plan, nearest step, trial exam dynamics, mentor comment and parent visibility. Use progress bars, rings, line chart, checklist rows, facts grid and mentor row before inventing generic marketing cards.

### Modals, Views and Toasts

Diagnostics and lead forms use native `dialog` with rounded modal cards. Result and demo dashboard open as full-screen app views with their own sticky app header. Toast is centered at the bottom, 460px max width, white surface, large shadow and navy text.

## 6. Do's and Don'ts

### Do

- Show the route visually: plan, next step, weak topic, progress, mock exam dynamic, mentor recommendation.
- Keep the page light, spacious and precise, with section padding around `clamp(64px, 8vw, 88px)`.
- Use the gradient only where it means route movement or primary action.
- Keep copy concrete and product-led. Every personalization claim should map to goal, level, subject, weak topic or next step.
- Preserve accessibility: skip link, visible focus states, reduced-motion support, native form controls, readable labels and WCAG AA contrast.
- Use calm reveal motion: opacity plus `translateY(22px)` over `0.65s cubic-bezier(0.22, 1, 0.36, 1)`.
- Let mobile collapse to one column early. Buttons in hero and CTA become full width under 620px.

### Don't

- Do not use panic language, red CTAs, countdown pressure, "100 баллов за месяц", "гарантированный результат" or fear of failure.
- Do not add black backgrounds, acid colors, hard corners, side-stripe card accents, gradient text or decorative glassmorphism.
- Do not turn every section into identical icon-heading-text cards. Cards must either explain a product mechanic or support a concrete choice.
- Do not replace dashboard evidence with abstract claims like "лучшие преподаватели" or "качественное обучение".
- Do not add nested cards. Inner structure should use tonal rows, progress tracks, chips and dividers.
- Do not animate height, margin, padding or other layout properties. Use transforms, opacity or grid-row techniques.
- Do not introduce extra font families unless the brand strategy is intentionally changed.
