import {inject, InjectionToken, type Provider} from '@angular/core';

import {APP_CONFIG} from '../app-config';
import {TripSetupOnboardingService} from './trip-setup-onboarding.service';

export const TRIP_SETUP_ONBOARDING = new InjectionToken<TripSetupOnboardingService | null>(
    '[TRIP_SETUP_ONBOARDING]: TripSetupOnboardingService',
);

export function provideTripSetupOnboarding(): Provider {
    return [
        TripSetupOnboardingService,
        {
            provide: TRIP_SETUP_ONBOARDING,
            useFactory: () =>
                inject(APP_CONFIG).features?.enableTripSetupOnboarding === true
                    ? inject(TripSetupOnboardingService)
                    : null,
        },
    ];
}
