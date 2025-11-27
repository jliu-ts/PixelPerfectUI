// Centralized labels and string constants
// Prevents typos and makes i18n easier in the future

// Platform names (consistent across the app)
export const PLATFORMS = {
  instagram: "Instagram",
  tiktok: "TikTok",
  youtube: "YouTube",
  twitter: "X",
  linkedin: "LinkedIn",
  pinterest: "Pinterest",
  threads: "Threads",
  spotify: "Spotify",
  apple: "Apple Podcasts",
} as const;

// Content categories
export const CATEGORIES = {
  product: "Product",
  social: "Social",
  business: "Business",
  art: "Art",
  general: "General",
} as const;

// Status labels
export const STATUS = {
  active: "Active",
  draft: "Draft",
  pending: "Pending",
  error: "Error",
  ready: "Ready",
  processing: "Processing",
  completed: "Completed",
} as const;

// Feed categories
export const FEED_CATEGORIES = {
  all: "All Feeds",
  tech: "Technology",
  design: "Design & Art",
  news: "News & Trends",
} as const;

// Prompt platform options (for forms)
export const PROMPT_PLATFORMS = [
  { value: "Instagram", label: "Instagram" },
  { value: "TikTok", label: "TikTok" },
  { value: "YouTube", label: "YouTube" },
  { value: "LinkedIn", label: "LinkedIn" },
  { value: "Twitter", label: "X (Twitter)" },
  { value: "General", label: "General" },
] as const;

// Prompt category options (for forms)
export const PROMPT_CATEGORIES = [
  { value: "Product", label: "Product" },
  { value: "Social", label: "Social" },
  { value: "Business", label: "Business" },
  { value: "Art", label: "Art" },
] as const;
