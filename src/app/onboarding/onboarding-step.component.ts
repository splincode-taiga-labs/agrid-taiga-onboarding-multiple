import {
    ChangeDetectionStrategy,
    Component,
    inject,
    ViewEncapsulation,
} from '@angular/core';
import {TuiButton} from '@taiga-ui/core';

import {OnboardingService} from './onboarding.service';

@Component({
    selector: 'onboarding-step',
    imports: [TuiButton],
    templateUrl: './onboarding-step.component.html',
    styleUrl: './onboarding-step.component.less',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnboardingStepComponent {
    protected readonly onboarding = inject(OnboardingService);
}
