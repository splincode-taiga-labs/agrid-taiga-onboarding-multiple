import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {TuiHint, type TuiHintDirection} from '@taiga-ui/core';
import {IHeaderAngularComp} from 'ag-grid-angular';
import {type IHeaderParams} from 'ag-grid-community';

import {OnboardingStepDirective} from '../onboarding/onboarding-step.directive';
import {OnboardingService} from '../onboarding/onboarding.service';
import {type OnboardingStep} from '../onboarding/onboarding.types';

export interface OnboardingHeaderParams {
    readonly onboardingStep?: OnboardingStep | null;
    readonly onboardingStepDirection?: TuiHintDirection;
    readonly tooltip?: string;
}

type HeaderParams = IHeaderParams & OnboardingHeaderParams;

@Component({
    selector: 'onboarding-header',
    imports: [OnboardingStepDirective, TuiHint],
    template: `
        @if (isOnboardingStepActive()) {
            <span
                class="title"
                [onboardingStep]="params.onboardingStep ?? null"
                [onboardingStepDirection]="params.onboardingStepDirection ?? 'left'"
            >
                {{ params.displayName }}
            </span>
        } @else {
            <span
                tuiHintDirection="top"
                class="title"
                [tuiHint]="params.tooltip ?? null"
            >
                {{ params.displayName }}
            </span>
        }
    `,
    styles: `
        :host,
        .title {
            display: inline-flex;
            align-items: center;
            min-block-size: 1.75rem;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnboardingHeaderComponent implements IHeaderAngularComp {
    private readonly onboarding = inject(OnboardingService);

    protected params!: HeaderParams;

    public agInit(params: IHeaderParams): void {
        this.params = params as HeaderParams;
    }

    public refresh(params: IHeaderParams): boolean {
        this.params = params as HeaderParams;

        return true;
    }

    protected isOnboardingStepActive(): boolean {
        const step = this.params.onboardingStep;

        return step != null && this.onboarding.isActive(step);
    }
}
