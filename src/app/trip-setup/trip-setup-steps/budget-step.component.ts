import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {TuiButton, TuiTitle} from '@taiga-ui/core';
import {PolymorpheusComponent} from '@taiga-ui/polymorpheus';

import {OnboardingStepComponent} from '../../onboarding/onboarding-step.component';
import {OnboardingService} from '../../onboarding/onboarding.service';

@Component({
    selector: 'trip-setup-budget-step',
    imports: [OnboardingStepComponent, TuiButton, TuiTitle],
    template: `
        <onboarding-step>
            <h3 tuiTitle>
                Бюджет маршрута
                <span tuiSubtitle>Шаг привязан к AG Grid header, который получает params от grid</span>
            </h3>

            <p>Идентичность шага определяется через flowId + index, а не по ссылке на объект.</p>

            <button appearance="flat" size="s" tuiButton type="button" (click)="onboarding.next()">
                Далее
            </button>
        </onboarding-step>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetStepComponent {
    protected readonly onboarding = inject(OnboardingService);
}

export const BUDGET_STEP = new PolymorpheusComponent(BudgetStepComponent);
