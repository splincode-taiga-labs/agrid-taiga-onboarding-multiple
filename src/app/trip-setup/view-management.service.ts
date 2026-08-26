import {computed, Injectable, signal} from '@angular/core';
import {type GridApi} from 'ag-grid-community';

import {type TravelPlanDto} from '../proposal.dto';

interface TravelView {
    readonly id: number;
    readonly name: string;
}

@Injectable()
export class ViewManagementService {
    private gridApi: GridApi<TravelPlanDto> | null = null;

    public readonly views: readonly TravelView[] = [
        {id: 1, name: 'Все поездки'},
        {id: 2, name: 'Бюджет поездки'},
    ];
    public readonly menuOpened = signal(false);
    public readonly activeViewId = signal(1);
    public readonly activeViewName = computed(
        () => this.views.find(({id}) => id === this.activeViewId())?.name ?? '',
    );

    public setGridApi(gridApi: GridApi<TravelPlanDto>): void {
        this.gridApi = gridApi;
        this.applyView(this.activeViewId());
    }

    public toggleViewMenu(): void {
        this.menuOpened.update((opened) => !opened);
    }

    public openViewMenu(): void {
        this.menuOpened.set(true);
    }

    public closeViewMenu(): void {
        this.menuOpened.set(false);
    }

    public selectView(viewId: number): void {
        this.activeViewId.set(viewId);
        this.applyView(viewId);
    }

    public findViewIdByName(viewName: string): number | null {
        return this.views.find(({name}) => name === viewName)?.id ?? null;
    }

    public scrollToColumn(columnField: string): void {
        this.gridApi?.ensureColumnVisible(columnField);
    }

    private applyView(viewId: number): void {
        const showPlanningColumns = viewId === 2;

        this.gridApi?.setColumnsVisible(['budget', 'priority'], showPlanningColumns);
    }
}
