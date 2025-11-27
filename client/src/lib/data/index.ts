// Data layer - centralized exports
// Import from here for clean, organized data access

// Navigation
export { SIDEBAR_NAVIGATION } from "./navigation";

// Creation studio
export {
  CREATION_STYLES,
  VIDEO_MODELS,
  IMAGE_MODELS,
  AVATARS,
  VOICES,
  ASPECT_RATIOS,
} from "./creation";

// Marketplace
export { MARKETPLACE_ITEMS, EXTENDED_MARKETPLACE_ITEMS } from "./marketplace";
export type { MarketplaceItem } from "./marketplace";

// Ecommerce
export { ECOMMERCE_PRODUCTS, ECOMMERCE_GENERATION_OPTIONS } from "./ecommerce";
export type { Product, GenerationOption } from "./ecommerce";

// Social/Feed
export { FEED_ITEMS, STORIES, MOCK_COMMENTS } from "./social";
export type { FeedItem, Story, Comment } from "./social";

// Feeds (RSS)
export { INITIAL_FEEDS, FEED_CATEGORIES } from "./feeds";
export type { Feed, FeedCategory } from "./feeds";

// Prompts
export { MOCK_PROMPTS } from "./prompts";
export type { Prompt } from "./prompts";

// Articles
export { MOCK_ARTICLES } from "./articles";
export type { Article } from "./articles";

// Profile
export { CONNECTED_ACCOUNTS } from "./profile";
export type { ConnectedAccount } from "./profile";
