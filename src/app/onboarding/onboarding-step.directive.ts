import {
    ChangeDetectionStrategy,
    Component,
    computed,
    Directive,
    inject,
    input,
    ViewEncapsulation,
} from '@angular/core';
import {tuiDirectiveBinding, tuiWithStyles} from '@taiga-ui/cdk';
import {
    type TuiHintDirection,
    TuiHintDirective,
    TuiHintManual,
    TuiHintPosition,
} from '@taiga-ui/core';

import {OnboardingService} from './onboarding.service';
import {type OnboardingStep} from './onboarding.types';

@Component({
    standalone: true,
    template: '',
    styles: `
        .onboarding-step-anchor._active {
            position: relative;
            z-index: 2;
            pointer-events: none;
            mask-image: none;
            box-shadow:
                0 0 0 2px #6aa5ff,
                0 0 0 4px #fff,
                0 0 0 6px #b5d2ff;
        }

        tui-hint[data-appearance='onboarding'] {
            inline-size: min(29rem, calc(100vw - 1rem));
            max-inline-size: calc(100vw - 1rem);
            pointer-events: auto;
        }
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class OnboardingAnchorStyles {}

@Directive({
    selector: '[onboardingStep]',
    hostDirectives: [TuiHintDirective, TuiHintManual],
    host: {
        class: 'onboarding-step-anchor',
        '[class._active]': 'active()',
    },
})
export class OnboardingStepDirective {
    private readonly onboarding = inject(OnboardingService);

    public readonly step = input<OnboardingStep | null>(null, {alias: 'onboardingStep'});
    public readonly direction = input<TuiHintDirection>('left', {
        alias: 'onboardingStepDirection',
    });

    protected readonly active = computed(() => {
        const step = this.step();

        return step !== null && this.onboarding.isActive(step);
    });

    protected readonly styles = tuiWithStyles(OnboardingAnchorStyles);

    protected readonly content = tuiDirectiveBinding(
        TuiHintDirective,
        'content',
        computed(() => this.step()?.content ?? null),
    );

    protected readonly appearance = tuiDirectiveBinding(
        TuiHintDirective,
        'appearance',
        'onboarding',
    );

    protected readonly manual = tuiDirectiveBinding(
        TuiHintManual,
        'tuiHintManual',
        this.active,
    );

    protected readonly position = tuiDirectiveBinding(
        TuiHintPosition,
        'direction',
        this.direction,
    );
}
