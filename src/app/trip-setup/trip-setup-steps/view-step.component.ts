import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {TuiButton, TuiTitle} from '@taiga-ui/core';
import {PolymorpheusComponent} from '@taiga-ui/polymorpheus';

import {OnboardingStepComponent} from '../../onboarding/onboarding-step.component';
import {OnboardingService} from '../../onboarding/onboarding.service';

@Component({
    selector: 'trip-setup-view-step',
    imports: [OnboardingStepComponent, TuiButton, TuiTitle],
    template: `
        <onboarding-step>
            <h3 tuiTitle>
                Отдельный вид для планирования
                <span tuiSubtitle>Второй flow запускается только после первого и сам открывает меню видов</span>
            </h3>

            <p>Выбран вид «Бюджет поездки», который показывает дополнительные колонки.</p>

            <button appearance="flat" size="s" tuiButton type="button" (click)="onboarding.next()">
                Далее
            </button>
        </onboarding-step>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewStepComponent {
    protected readonly onboarding = inject(OnboardingService);
}

export const VIEW_STEP = new PolymorpheusComponent(ViewStepComponent);
