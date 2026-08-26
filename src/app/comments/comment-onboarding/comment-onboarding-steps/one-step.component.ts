import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {TuiButton, TuiTitle} from '@taiga-ui/core';
import {PolymorpheusComponent} from '@taiga-ui/polymorpheus';

import {OnboardingStepComponent} from '../../../onboarding/onboarding-step.component';
import {OnboardingService} from '../../../onboarding/onboarding.service';

@Component({
    selector: 'travel-notes-onboarding-one-step',
    imports: [OnboardingStepComponent, TuiButton, TuiTitle],
    template: `
        <onboarding-step>
            <h3 tuiTitle>
                Заметки прямо из таблицы
                <span tuiSubtitle>У каждого маршрута есть отдельная панель для идей и деталей поездки</span>
            </h3>

            <p>Первый онбординг начинается с кнопки заметок в первой строке AG Grid.</p>

            <button
                appearance="flat"
                size="s"
                tuiButton
                type="button"
                (click)="onboarding.next()"
            >
                Далее
            </button>
        </onboarding-step>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OneStepComponent {
    protected readonly onboarding = inject(OnboardingService);
}

export const ONE_STEP = new PolymorpheusComponent(OneStepComponent);
