import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {TuiButton, TuiTitle} from '@taiga-ui/core';
import {PolymorpheusComponent} from '@taiga-ui/polymorpheus';

import {OnboardingStepComponent} from '../../../onboarding/onboarding-step.component';
import {OnboardingService} from '../../../onboarding/onboarding.service';

@Component({
    selector: 'travel-notes-onboarding-third-step',
    imports: [OnboardingStepComponent, TuiButton, TuiTitle],
    template: `
        <onboarding-step>
            <h3 tuiTitle>
                Сохраняйте детали поездки
                <span tuiSubtitle>После завершения автоматически запустится второй доступный онбординг</span>
            </h3>

            <p>Прогресс сохраняется отдельно для каждого flow.</p>

            <button
                appearance="flat"
                size="s"
                tuiButton
                type="button"
                (click)="onboarding.complete()"
            >
                Понятно
            </button>
        </onboarding-step>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThirdStepComponent {
    protected readonly onboarding = inject(OnboardingService);
}

export const THIRD_STEP = new PolymorpheusComponent(ThirdStepComponent);
