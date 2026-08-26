# AG Grid + Taiga UI multiple onboarding prototype

Учебный прототип **двух последовательных независимых онбордингов** на Angular 19, Taiga UI 4.69 и AG Grid 34.2 без отдельной tour-библиотеки.

Он продолжает идею `taiga-family-labs/agrid-taiga-onboarding`, но показывает сценарий, где на одном экране есть несколько feature-onboardings и продуктовый порядок заранее известен.

## Сценарий

1. `TravelNotesOnboardingService` показывает три шага: кнопка заметок в строке → разделы сайдбара → поле заметки.
2. После завершения первого flow страница явно запускает `TripSetupOnboardingService`.
3. Второй flow открывает меню видов → показывает колонку `Бюджет` → показывает колонку `Приоритет`.

Если первый flow уже завершен, `run()` возвращает `skipped`, и второй запускается сразу. Если пользователь закрыл первый крестиком, `run()` возвращает `dismissed`, и цепочка останавливается.

```ts
private async startOnboardings(): Promise<void> {
    const row = this.rowData[0];

    if (row && this.travelNotesOnboarding) {
        const result = await this.travelNotesOnboarding.run(row);

        if (result === 'dismissed') {
            return;
        }
    }

    await this.tripSetupOnboarding?.run();
}
```

## Почему здесь нет queue

Порядок двух сценариев — часть продукта, а не динамическая регистрация неизвестного количества туров. Поэтому orchestration остается на уровне страницы и читается сверху вниз.

`OnboardingService` знает только про один активный flow и предоставляет минимальный API:

```ts
export type OnboardingResult = 'completed' | 'dismissed' | 'skipped';

export interface OnboardingFlow<TSteps extends readonly OnboardingStepDefinition[]> {
    readonly steps: OnboardingSteps<TSteps>;

    run(): Promise<OnboardingResult>;
}
```

Нет `queue`, `priority`, `autoStartNext`, `cancel()` и transition timeout.

## `create()` вместо глобального `register()`

Каждый feature-сервис создает собственный typed flow:

```ts
private readonly flow = this.onboarding.create({
    id: 'trip-setup',
    version: 1,
    steps: [
        {content: VIEW_STEP},
        {content: BUDGET_STEP},
        {content: PRIORITY_STEP},
    ] as const,
});

public readonly steps = this.flow.steps;
```

`run()` остается адресным: feature запускает именно свой flow, а не «первый элемент общей очереди».

## Стабильная идентичность шага в AG Grid

AG Grid может передать `headerComponentParams` как объект с другой JS-ссылкой. Поэтому active step нельзя определять через `activeStep === step`.

Runtime step получает стабильную пару:

```ts
{
    flowId: 'trip-setup',
    index: 1,
}
```

и `isActive()` сравнивает ее:

```ts
public isActive(step: OnboardingStep): boolean {
    const active = this.activeStep();

    return active?.flowId === step.flowId && active.index === step.index;
}
```

Так два разных flow могут иметь `step 1`, но не конфликтуют, и shallow clone AG Grid не ломает hint.

## Hint в header без double matching

Обычный hover tooltip и onboarding hint не висят одновременно на одном/вложенных элементах. Header выбирает один режим через `@if`:

```html
@if (isOnboardingStepActive()) {
    <span [onboardingStep]="params.onboardingStep ?? null">
        {{ params.displayName }}
    </span>
} @else {
    <span [tuiHint]="params.tooltip ?? null">
        {{ params.displayName }}
    </span>
}
```

Это исключает вложенность `[tuiHint] -> [onboardingStep]` и конфликт нескольких hint drivers.

## Feature flags

Оба feature-сервиса доступны через nullable DI tokens. Factory сначала проверяет flag и только затем создает сервис:

```ts
useFactory: () =>
    inject(APP_CONFIG).features?.enableTripSetupOnboarding === true
        ? inject(TripSetupOnboardingService)
        : null
```

`OnboardingService` — один root instance для feature-сервисов, AG Grid cell renderers и header components.

## Persistence

Каждый flow хранит свой ключ:

```text
@onboarding.travel-notes.v1
@onboarding.trip-setup.v1
```

`completed` и `dismissed` сохраняют `completed`. `skipped` означает, что текущая версия уже была пройдена.

Для повторной проверки в DevTools удалите соответствующие `@onboarding.*` keys и перезагрузите страницу.

## Запуск

```bash
npm install
npm start
```

Production build:

```bash
npm run build
```
