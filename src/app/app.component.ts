import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {TuiButton, TuiRoot, TuiTitle} from '@taiga-ui/core';
import {AgGridAngular} from 'ag-grid-angular';
import {
    AllCommunityModule,
    type ColDef,
    type GridReadyEvent,
    ModuleRegistry,
} from 'ag-grid-community';

import {
    provideTravelNotesOnboarding,
    TRAVEL_NOTES_ONBOARDING,
} from './comments/comment-onboarding/comment-onboarding.provider';
import {TravelNotesSidebarComponent} from './comments/comments-sidebar/comments-sidebar.component';
import {TravelNotesSidebarService} from './comments/comments-sidebar/comments-sidebar.service';
import {TRAVEL_PLANS} from './data/proposals';
import {OnboardingHeaderComponent} from './grid/onboarding-header.component';
import {TravelPlanCellComponent} from './grid/travel-plan-cell.component';
import {OnboardingStepDirective} from './onboarding/onboarding-step.directive';
import {OnboardingService} from './onboarding/onboarding.service';
import {type OnboardingStep} from './onboarding/onboarding.types';
import {type TravelPlanDto} from './proposal.dto';
import {
    provideTripSetupOnboarding,
    TRIP_SETUP_ONBOARDING,
} from './trip-setup/trip-setup-onboarding.provider';
import {ViewManagementService} from './trip-setup/view-management.service';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
    selector: 'onboarding-demo',
    imports: [
        AgGridAngular,
        OnboardingStepDirective,
        TravelNotesSidebarComponent,
        TuiButton,
        TuiRoot,
        TuiTitle,
    ],
    providers: [
        TravelNotesSidebarService,
        ViewManagementService,
        provideTravelNotesOnboarding(),
        provideTripSetupOnboarding(),
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    protected readonly onboarding = inject(OnboardingService);
    protected readonly travelNotesOnboarding = inject(TRAVEL_NOTES_ONBOARDING);
    protected readonly tripSetupOnboarding = inject(TRIP_SETUP_ONBOARDING);
    protected readonly sidebar = inject(TravelNotesSidebarService);
    protected readonly viewManagement = inject(ViewManagementService);
    protected readonly rowData = TRAVEL_PLANS;

    protected readonly defaultColDef: ColDef<TravelPlanDto> = {
        sortable: true,
        filter: true,
        resizable: true,
        flex: 1,
        minWidth: 140,
        headerComponent: OnboardingHeaderComponent,
    };

    protected readonly columnDefs: ColDef<TravelPlanDto>[] = [
        {
            colId: 'title',
            field: 'title',
            headerName: 'Маршрут',
            cellRenderer: TravelPlanCellComponent,
            minWidth: 300,
            flex: 1.5,
            headerComponentParams: {tooltip: 'Название маршрута'},
        },
        {field: 'country', headerName: 'Страна'},
        {field: 'season', headerName: 'Сезон'},
        {field: 'durationDays', headerName: 'Дней', minWidth: 110},
        {field: 'status', headerName: 'Статус', minWidth: 170},
        {
            field: 'budget',
            headerName: 'Бюджет',
            hide: true,
            minWidth: 170,
            headerComponentParams: {
                tooltip: 'Планируемый бюджет',
                onboardingStep: this.tripSetupOnboarding?.steps[1] ?? null,
                onboardingStepDirection: 'left',
            },
        },
        {
            field: 'priority',
            headerName: 'Приоритет',
            hide: true,
            minWidth: 170,
            headerComponentParams: {
                tooltip: 'Приоритет поездки',
                onboardingStep: this.tripSetupOnboarding?.steps[2] ?? null,
                onboardingStepDirection: 'left',
            },
        },
    ];

    private autoStartAttempted = false;

    protected onGridReady(event: GridReadyEvent<TravelPlanDto>): void {
        this.viewManagement.setGridApi(event.api);
    }

    protected onFirstDataRendered(): void {
        if (this.autoStartAttempted) {
            return;
        }

        this.autoStartAttempted = true;
        void this.startOnboardings();
    }

    protected viewOnboardingStep(viewId: number): OnboardingStep | null {
        const onboarding = this.tripSetupOnboarding;

        return onboarding?.isSelectedView(viewId) ? onboarding.steps[0] : null;
    }

    protected selectView(viewId: number): void {
        this.viewManagement.selectView(viewId);
        this.viewManagement.closeViewMenu();
    }

    protected closeSidebar(): void {
        this.sidebar.close();

        const onboarding = this.travelNotesOnboarding;

        if (
            onboarding &&
            (this.onboarding.isActive(onboarding.steps[1]) ||
                this.onboarding.isActive(onboarding.steps[2]))
        ) {
            this.onboarding.dismiss();
        }
    }

    private async startOnboardings(): Promise<void> {
        const row = this.rowData[0];

        if (row && this.travelNotesOnboarding) {
            const result = await this.travelNotesOnboarding.run(row);

            if (result === 'dismissed') {
                return;
            }
        }

        await this.tripSetupOnboarding?.run();
    }
}
