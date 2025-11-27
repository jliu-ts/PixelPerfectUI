// DEPRECATED: This file is maintained for backward compatibility.
// Please import from @/lib/data or @/lib/constants instead.
//
// Example migrations:
//   OLD: import { CREATION_STYLES } from "@/lib/mockData"
//   NEW: import { CREATION_STYLES } from "@/lib/data"
//
//   OLD: import { MARKETPLACE_ITEMS } from "@/lib/mockData"
//   NEW: import { MARKETPLACE_ITEMS } from "@/lib/data"

// Re-export everything from the new data modules
export {
  SIDEBAR_NAVIGATION,
  CREATION_STYLES,
  VIDEO_MODELS,
  IMAGE_MODELS,
  AVATARS,
  VOICES,
  ASPECT_RATIOS,
  MARKETPLACE_ITEMS,
  ECOMMERCE_PRODUCTS,
  ECOMMERCE_GENERATION_OPTIONS,
  FEED_ITEMS,
  STORIES,
  MOCK_COMMENTS,
  INITIAL_FEEDS,
  FEED_CATEGORIES,
  MOCK_PROMPTS,
  MOCK_ARTICLES,
  CONNECTED_ACCOUNTS,
} from "./data";

// Re-export types
export type {
  MarketplaceItem,
  Product,
  GenerationOption,
  FeedItem,
  Story,
  Comment,
  Feed,
  FeedCategory,
  Prompt,
  Article,
  ConnectedAccount,
} from "./data";
