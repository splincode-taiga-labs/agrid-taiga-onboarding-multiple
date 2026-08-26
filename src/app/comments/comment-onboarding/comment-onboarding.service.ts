import {inject, Injectable, signal} from '@angular/core';

import {OnboardingService} from '../../onboarding/onboarding.service';
import {type OnboardingResult} from '../../onboarding/onboarding.types';
import {type TravelPlanDto} from '../../proposal.dto';
import {TravelNotesSidebarService} from '../comments-sidebar/comments-sidebar.service';
import {ONE_STEP} from './comment-onboarding-steps/one-step.component';
import {THIRD_STEP} from './comment-onboarding-steps/third-step.component';
import {TWO_STEP} from './comment-onboarding-steps/two-step.component';

@Injectable()
export class TravelNotesOnboardingService {
    private readonly onboarding = inject(OnboardingService);
    private readonly sidebar = inject(TravelNotesSidebarService);
    private readonly targetTravelPlan = signal<TravelPlanDto | null>(null);

    private readonly flow = this.onboarding.create({
        id: 'travel-notes',
        version: 1,
        steps: [
            {
                content: ONE_STEP,
                onNext: () => {
                    const travelPlan = this.targetTravelPlan();

                    if (travelPlan) {
                        this.sidebar.open(travelPlan);
                    }
                },
            },
            {content: TWO_STEP},
            {content: THIRD_STEP},
        ] as const,
    });

    public readonly steps = this.flow.steps;

    public async run(travelPlan: TravelPlanDto): Promise<OnboardingResult> {
        this.targetTravelPlan.set(travelPlan);

        try {
            return await this.flow.run();
        } finally {
            this.targetTravelPlan.set(null);
            this.sidebar.close();
        }
    }

    public isFirstStepTarget(travelPlan: TravelPlanDto): boolean {
        return (
            this.onboarding.isActive(this.steps[0]) &&
            this.targetTravelPlan()?.id === travelPlan.id
        );
    }
}
