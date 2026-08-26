import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {TuiButton} from '@taiga-ui/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {type ICellRendererParams} from 'ag-grid-community';

import {TRAVEL_NOTES_ONBOARDING} from '../comments/comment-onboarding/comment-onboarding.provider';
import {TravelNotesSidebarService} from '../comments/comments-sidebar/comments-sidebar.service';
import {OnboardingStepDirective} from '../onboarding/onboarding-step.directive';
import {type TravelPlanDto} from '../proposal.dto';

@Component({
    selector: 'travel-plan-cell',
    imports: [OnboardingStepDirective, TuiButton],
    templateUrl: './travel-plan-cell.component.html',
    styleUrl: './travel-plan-cell.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TravelPlanCellComponent implements ICellRendererAngularComp {
    protected readonly sidebar = inject(TravelNotesSidebarService);
    protected readonly travelNotesOnboarding = inject(TRAVEL_NOTES_ONBOARDING);
    protected readonly onboardingStep = this.travelNotesOnboarding?.steps[0] ?? null;
    protected travelPlan!: TravelPlanDto;

    public agInit(params: ICellRendererParams<TravelPlanDto>): void {
        if (params.data) {
            this.travelPlan = params.data;
        }
    }

    public refresh(params: ICellRendererParams<TravelPlanDto>): boolean {
        this.agInit(params);

        return true;
    }

    protected isOnboardingTarget(): boolean {
        return this.travelNotesOnboarding?.isFirstStepTarget(this.travelPlan) === true;
    }

    protected openNotes(): void {
        this.sidebar.open(this.travelPlan);
    }
}
