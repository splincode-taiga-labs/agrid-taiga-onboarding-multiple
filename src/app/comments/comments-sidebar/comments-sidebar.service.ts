import {Injectable, signal} from '@angular/core';

import {type TravelPlanDto} from '../../proposal.dto';

@Injectable()
export class TravelNotesSidebarService {
    public readonly travelPlan = signal<TravelPlanDto | null>(null);

    public open(travelPlan: TravelPlanDto): void {
        this.travelPlan.set(travelPlan);
    }

    public close(): void {
        this.travelPlan.set(null);
    }
}
