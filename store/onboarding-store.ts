import { create } from "zustand";
import type { OnboardingAnswers } from "@/types/onboarding";

interface OnboardingState {
  step: number;
  username: string;
  answers: OnboardingAnswers;
  setStep: (step: number) => void;
  setUsername: (username: string) => void;
  setAnswer: (key: keyof OnboardingAnswers, value: string) => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  step: 0,
  username: "",
  answers: {},
  setStep: (step) => set({ step }),
  setUsername: (username) => set({ username }),
  setAnswer: (key, value) =>
    set((state) => ({ answers: { ...state.answers, [key]: value } })),
  reset: () => set({ step: 0, username: "", answers: {} }),
}));
