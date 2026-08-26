import {inject, Injectable, signal} from '@angular/core';

import {OnboardingService} from '../onboarding/onboarding.service';
import {type OnboardingResult} from '../onboarding/onboarding.types';
import {BUDGET_STEP} from './trip-setup-steps/budget-step.component';
import {PRIORITY_STEP} from './trip-setup-steps/priority-step.component';
import {VIEW_STEP} from './trip-setup-steps/view-step.component';
import {ViewManagementService} from './view-management.service';

const VIEW_NAME = 'Бюджет поездки';
const BUDGET_COLUMN = 'budget';
const PRIORITY_COLUMN = 'priority';

@Injectable()
export class TripSetupOnboardingService {
    private readonly onboarding = inject(OnboardingService);
    private readonly viewManagement = inject(ViewManagementService);
    private readonly targetViewId = signal<number | null>(null);

    private readonly flow = this.onboarding.create({
        id: 'trip-setup',
        version: 1,
        steps: [
            {
                content: VIEW_STEP,
                onNext: () => {
                    this.viewManagement.closeViewMenu();
                    this.viewManagement.scrollToColumn(BUDGET_COLUMN);
                },
            },
            {
                content: BUDGET_STEP,
                onNext: () => this.viewManagement.scrollToColumn(PRIORITY_COLUMN),
            },
            {content: PRIORITY_STEP},
        ] as const,
    });

    public readonly steps = this.flow.steps;

    public async run(): Promise<OnboardingResult> {
        const viewId = this.viewManagement.findViewIdByName(VIEW_NAME);

        if (viewId === null) {
            return 'skipped';
        }

        const result = this.flow.run();

        if (!this.onboarding.isActive(this.steps[0])) {
            return await result;
        }

        this.targetViewId.set(viewId);
        this.viewManagement.selectView(viewId);
        this.viewManagement.openViewMenu();

        try {
            return await result;
        } finally {
            this.targetViewId.set(null);
            this.viewManagement.closeViewMenu();
        }
    }

    public isSelectedView(viewId: number): boolean {
        return this.onboarding.isActive(this.steps[0]) && this.targetViewId() === viewId;
    }
}
