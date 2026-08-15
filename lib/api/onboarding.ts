import { apiFetch } from "@/lib/api/client";
import type { OnboardingAnswers } from "@/types/onboarding";

export async function checkUsernameAvailable(
  username: string,
): Promise<boolean> {
  const data = await apiFetch<{ available: boolean }>(
    `/onboarding/username-available?username=${encodeURIComponent(username)}`,
  );
  return data.available;
}

export async function completeOnboarding(
  username: string,
  answers: OnboardingAnswers,
): Promise<{ id: string; username: string; onboardingCompleted: boolean }> {
  const data = await apiFetch<{
    user: { id: string; username: string; onboardingCompleted: boolean };
  }>("/onboarding/complete", {
    method: "POST",
    body: JSON.stringify({ username, answers }),
  });
  return data.user;
}

export async function mockUpgradeToPro(): Promise<{ plan: string }> {
  const data = await apiFetch<{ user: { plan: string } }>(
    "/onboarding/upgrade-mock",
    {
      method: "POST",
    },
  );
  return data.user;
}
