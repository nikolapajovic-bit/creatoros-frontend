import type { AiTool } from "@/types/ai";

// Simulira generisane rezultate po alatu — u pravoj verziji ovo zamenjuje odgovor sa backend/AI servisa
export const MOCK_RESULTS: Record<AiTool, string[]> = {
  caption: [
    "Mornings hit different when your skin is glowing before your coffee even kicks in ☀️ Swipe for the 3-step routine that changed everything for me.",
    "Not sponsored, just obsessed. This is the routine I actually do every single morning (rain or shine, deadline or no deadline).",
  ],
  ideas: [
    "1. 'What $50/day actually gets you' — budget breakdown series\n2. Behind-the-scenes packing video with cost commentary\n3. 'I tried the cheapest vs. most expensive version' comparison\n4. Local hidden-gem spot no one talks about\n5. Mistakes I made on my first solo trip",
  ],
  hashtags: [
    "#homeworkout #beginnerfitness #workoutmotivation #fitnessjourney #noequipmentworkout #fitcheck #healthylifestyle #morningmovement #strengthtraining #fitnessforbeginners",
  ],
  "email-reply": [
    "Hi [Name],\n\nThanks so much for reaching out — I'd love to be part of this campaign! The concept sounds like a great fit for my audience.\n\nCould you share more details on timeline and deliverables? Happy to jump on a call this week if that's easier.\n\nLooking forward to it,\nAna",
  ],
};

export function getRandomResult(tool: AiTool): string {
  const options = MOCK_RESULTS[tool];
  return options[Math.floor(Math.random() * options.length)];
}
