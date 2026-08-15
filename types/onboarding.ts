export interface OnboardingAnswers {
  platform?: string;
  goal?: string;
  painPoint?: string;
}

export const CREATOR_QUESTIONS = [
  {
    key: "platform" as const,
    question: "Which platform do you focus on most?",
    options: ["Instagram", "TikTok", "YouTube", "Multiple platforms"],
  },
  {
    key: "goal" as const,
    question: "What's your main goal on CreatorOS?",
    options: [
      "Land more brand deals",
      "Get organized & save time",
      "Get paid faster",
      "Grow my audience",
    ],
  },
  {
    key: "painPoint" as const,
    question: "What's your biggest struggle right now?",
    options: [
      "Finding brand deals",
      "Managing contracts & payments",
      "Staying organized",
      "Creating content",
    ],
  },
];

export const BRAND_QUESTIONS = [
  {
    key: "platform" as const,
    question: "How many creators do you typically work with?",
    options: ["1-5", "5-20", "20+"],
  },
  {
    key: "goal" as const,
    question: "What's your monthly influencer marketing budget?",
    options: ["Under $1,000", "$1,000-5,000", "$5,000-20,000", "$20,000+"],
  },
  {
    key: "painPoint" as const,
    question: "What's your biggest challenge?",
    options: [
      "Finding the right creators",
      "Managing contracts",
      "Tracking ROI",
      "Communication",
    ],
  },
];
