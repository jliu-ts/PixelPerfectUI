// Centralized URL management for all external images
// This makes it easy to swap CDNs, update broken links, or add caching

// Style preview images (Unsplash)
export const STYLE_IMAGES = {
  cinematic: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&auto=format&fit=crop&q=60",
  oilPainting: "https://images.unsplash.com/photo-1579783902614-a3fb39279c53?w=400&auto=format&fit=crop&q=60",
  ghibli: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&auto=format&fit=crop&q=60",
  polaroid: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&auto=format&fit=crop&q=60",
  vaporwave: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=400&auto=format&fit=crop&q=60",
  minimalist: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=400&auto=format&fit=crop&q=60",
  anime: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&auto=format&fit=crop&q=60",
  render3d: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&auto=format&fit=crop&q=60",
  cyberpunk: "https://images.unsplash.com/photo-1515630278258-407f66498911?w=400&auto=format&fit=crop&q=60",
};

// Article/content images (Unsplash)
export const ARTICLE_IMAGES = {
  aiContent: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60",
  socialTrends: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop&q=60",
  spaceX: "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=800&auto=format&fit=crop&q=60",
  minimalism: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=800&auto=format&fit=crop&q=60",
  virtualInfluencers: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&auto=format&fit=crop&q=60",
  generativeAudio: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&auto=format&fit=crop&q=60",
  seo: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&auto=format&fit=crop&q=60",
  greenTech: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&auto=format&fit=crop&q=60",
  metaverse: "https://images.unsplash.com/photo-1614724723656-40c4ac775def?w=800&auto=format&fit=crop&q=60",
  coding: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&auto=format&fit=crop&q=60",
  fashion: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=60",
  creatorEconomy: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&auto=format&fit=crop&q=60",
  aiRegulation: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=60",
  gaming: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&auto=format&fit=crop&q=60",
  slowContent: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800&auto=format&fit=crop&q=60",
  authenticity: "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=800&auto=format&fit=crop&q=60",
  communities: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=60",
  privacy: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=60",
  marketing: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=60",
};

// Marketplace product images (Picsum - seeded for consistency)
export const MARKETPLACE_IMAGES = {
  cyberPack: "https://picsum.photos/seed/cyber/300/200",
  tiktokHooks: "https://picsum.photos/seed/tiktok/300/200",
  fantasyLuts: "https://picsum.photos/seed/fantasy/300/200",
  brandKit: "https://picsum.photos/seed/brand/300/200",
};

// Ecommerce product images
export const ECOMMERCE_IMAGES = {
  hoodie: "https://picsum.photos/seed/hoodie/300/300",
  sneakers: "https://picsum.photos/seed/sneakers/300/300",
  headset: "https://picsum.photos/seed/headset/300/300",
  bottle: "https://picsum.photos/seed/bottle/300/300",
};

// Avatar generator (DiceBear)
export const getAvatarUrl = (seed: string, style: "avataaars" | "bottts" | "identicon" = "avataaars") =>
  `https://api.dicebear.com/7.x/${style}/svg?seed=${seed}`;

// Platform logos (Wikipedia commons - stable URLs)
export const PLATFORM_LOGOS = {
  instagram: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png",
  tiktok: "https://upload.wikimedia.org/wikipedia/commons/3/34/Ionicons_logo-tiktok.svg",
  youtube: "https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg",
  openai: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg",
};
