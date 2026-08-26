import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {TuiButton, TuiTitle} from '@taiga-ui/core';
import {PolymorpheusComponent} from '@taiga-ui/polymorpheus';

import {OnboardingStepComponent} from '../../../onboarding/onboarding-step.component';
import {OnboardingService} from '../../../onboarding/onboarding.service';

@Component({
    selector: 'travel-notes-onboarding-two-step',
    imports: [OnboardingStepComponent, TuiButton, TuiTitle],
    template: `
        <onboarding-step>
            <h3 tuiTitle>
                Разделы заметки
                <span tuiSubtitle>Сайдбар появился после действия предыдущего шага</span>
            </h3>

            <p>Anchor монтируется позже active step — директива должна подхватить состояние сама.</p>

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
export class TwoStepComponent {
    protected readonly onboarding = inject(OnboardingService);
}

export const TWO_STEP = new PolymorpheusComponent(TwoStepComponent);
