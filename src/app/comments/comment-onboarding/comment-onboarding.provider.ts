import {inject, InjectionToken, type Provider} from '@angular/core';

import {APP_CONFIG} from '../../app-config';
import {TravelNotesOnboardingService} from './comment-onboarding.service';

export const TRAVEL_NOTES_ONBOARDING =
    new InjectionToken<TravelNotesOnboardingService | null>(
        '[TRAVEL_NOTES_ONBOARDING]: TravelNotesOnboardingService',
    );

export function provideTravelNotesOnboarding(): Provider {
    return [
        TravelNotesOnboardingService,
        {
            provide: TRAVEL_NOTES_ONBOARDING,
            useFactory: () =>
                inject(APP_CONFIG).features?.enableTravelNotesOnboarding === true
                    ? inject(TravelNotesOnboardingService)
                    : null,
        },
    ];
}
