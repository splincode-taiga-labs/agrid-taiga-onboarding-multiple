import {ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TuiButton, TuiTitle} from '@taiga-ui/core';

import {OnboardingStepDirective} from '../../onboarding/onboarding-step.directive';
import {type TravelPlanDto} from '../../proposal.dto';
import {TRAVEL_NOTES_ONBOARDING} from '../comment-onboarding/comment-onboarding.provider';

@Component({
    selector: 'travel-notes-sidebar',
    imports: [FormsModule, OnboardingStepDirective, TuiButton, TuiTitle],
    templateUrl: './comments-sidebar.component.html',
    styleUrl: './comments-sidebar.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TravelNotesSidebarComponent {
    protected readonly onboarding = inject(TRAVEL_NOTES_ONBOARDING);
    protected note = '';

    @Input({required: true})
    public travelPlan!: TravelPlanDto;

    @Output()
    public readonly closed = new EventEmitter<void>();
}
