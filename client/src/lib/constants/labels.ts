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

// Prompt filter tabs (for PromptLibrary filtering)
export const PROMPT_FILTER_CATEGORIES = [
  { id: "All", label: "All" },
  { id: "Product", label: "Product" },
  { id: "Social", label: "Social" },
  { id: "Business", label: "Business" },
  { id: "Art", label: "Art" },
  { id: "Education", label: "Education" },
] as const;

export const PROMPT_FILTER_PLATFORMS = [
  { id: "All", label: "All" },
  { id: "Instagram", label: "Instagram" },
  { id: "TikTok", label: "TikTok" },
  { id: "YouTube", label: "YouTube" },
  { id: "LinkedIn", label: "LinkedIn" },
  { id: "General", label: "General" },
] as const;
