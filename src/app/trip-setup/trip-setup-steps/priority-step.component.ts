import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {TuiButton, TuiTitle} from '@taiga-ui/core';
import {PolymorpheusComponent} from '@taiga-ui/polymorpheus';

import {OnboardingStepComponent} from '../../onboarding/onboarding-step.component';
import {OnboardingService} from '../../onboarding/onboarding.service';

@Component({
    selector: 'trip-setup-priority-step',
    imports: [OnboardingStepComponent, TuiButton, TuiTitle],
    template: `
        <onboarding-step>
            <h3 tuiTitle>
                Приоритет поездки
                <span tuiSubtitle>Последний шаг второго независимого flow</span>
            </h3>

            <p>После «Понятно» только этот onboarding получает completed в localStorage.</p>

            <button appearance="flat" size="s" tuiButton type="button" (click)="onboarding.complete()">
                Понятно
            </button>
        </onboarding-step>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PriorityStepComponent {
    protected readonly onboarding = inject(OnboardingService);
}

export const PRIORITY_STEP = new PolymorpheusComponent(PriorityStepComponent);
