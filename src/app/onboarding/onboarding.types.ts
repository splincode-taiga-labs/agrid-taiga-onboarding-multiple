import {type PolymorpheusContent} from '@taiga-ui/polymorpheus';

export type OnboardingResult = 'completed' | 'dismissed' | 'skipped';

export interface OnboardingStepDefinition {
    readonly content: PolymorpheusContent;
    readonly onNext?: () => void;
}

export interface OnboardingOptions<
    TSteps extends readonly OnboardingStepDefinition[],
> {
    readonly id: string;
    readonly version?: number;
    readonly steps: TSteps;
}

export interface OnboardingStep extends OnboardingStepDefinition {
    readonly flowId: string;
    readonly index: number;
}

export type OnboardingSteps<
    TSteps extends readonly OnboardingStepDefinition[],
> = {
    readonly [K in keyof TSteps]: OnboardingStep;
};

export interface OnboardingFlow<
    TSteps extends readonly OnboardingStepDefinition[],
> {
    readonly steps: OnboardingSteps<TSteps>;

    run(): Promise<OnboardingResult>;
}
