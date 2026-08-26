import {computed, inject, Injectable, signal} from '@angular/core';
import {WA_LOCAL_STORAGE} from '@ng-web-apis/common';

import {
    type OnboardingFlow,
    type OnboardingOptions,
    type OnboardingResult,
    type OnboardingStep,
    type OnboardingStepDefinition,
    type OnboardingSteps,
} from './onboarding.types';

const COMPLETED_STATE = 'completed';
const DEFAULT_VERSION = 1;

interface RegisteredFlow {
    readonly id: string;
    readonly storageKey: string;
    readonly steps: readonly OnboardingStep[];
}

@Injectable({providedIn: 'root'})
export class OnboardingService {
    private readonly localStorage = inject(WA_LOCAL_STORAGE);
    private readonly activeStep = signal<OnboardingStep | null>(null);
    private currentFlow: RegisteredFlow | null = null;
    private resolveRun: ((result: OnboardingResult) => void) | null = null;

    public readonly stepIndex = computed(() => this.activeStep()?.index ?? -1);
    public readonly isRunning = computed(() => this.activeStep() !== null);

    public get count(): number {
        return this.currentFlow?.steps.length ?? 0;
    }

    public create<const TSteps extends readonly OnboardingStepDefinition[]>(
        options: OnboardingOptions<TSteps>,
    ): OnboardingFlow<TSteps> {
        if (options.steps.length === 0) {
            throw new Error(`Onboarding "${options.id}" must contain at least one step`);
        }

        const steps = options.steps.map((step, index) => ({
            ...step,
            flowId: options.id,
            index,
        })) as OnboardingSteps<TSteps>;

        const flow: RegisteredFlow = {
            id: options.id,
            storageKey: `@onboarding.${options.id}.v${options.version ?? DEFAULT_VERSION}`,
            steps,
        };

        return {
            steps,
            run: () => this.run(flow),
        };
    }

    public isActive(step: OnboardingStep): boolean {
        const active = this.activeStep();

        return active?.flowId === step.flowId && active.index === step.index;
    }

    public next(): void {
        const flow = this.currentFlow;
        const currentStep = this.activeStep();

        if (!flow || !currentStep) {
            return;
        }

        currentStep.onNext?.();

        const nextStep = flow.steps[currentStep.index + 1];

        if (nextStep) {
            this.activeStep.set(nextStep);
        }
    }

    public complete(): void {
        this.finish('completed');
    }

    public dismiss(): void {
        this.finish('dismissed');
    }

    private run(flow: RegisteredFlow): Promise<OnboardingResult> {
        if (this.isRunning()) {
            throw new Error(`Onboarding "${this.currentFlow?.id ?? 'unknown'}" is already running`);
        }

        if (this.localStorage.getItem(flow.storageKey) === COMPLETED_STATE) {
            return Promise.resolve('skipped');
        }

        this.currentFlow = flow;
        this.activeStep.set(flow.steps[0] ?? null);

        return new Promise((resolve) => {
            this.resolveRun = resolve;
        });
    }

    private finish(result: 'completed' | 'dismissed'): void {
        const flow = this.currentFlow;
        const resolve = this.resolveRun;

        if (!flow || !this.activeStep()) {
            return;
        }

        this.localStorage.setItem(flow.storageKey, COMPLETED_STATE);
        this.activeStep.set(null);
        this.currentFlow = null;
        this.resolveRun = null;
        resolve?.(result);
    }
}
