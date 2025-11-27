import { MARKETPLACE_IMAGES } from "../constants/urls";

export interface MarketplaceItem {
  id: number;
  title: string;
  creator: string;
  type: string;
  price: number;
  rating: number;
  downloads: number;
  image: string;
  tags: string[];
}

export const MARKETPLACE_ITEMS: MarketplaceItem[] = [
  {
    id: 1,
    title: "Cinematic Cyberpunk Pack",
    creator: "NeonDreamer",
    type: "Prompt Pack",
    price: 50,
    rating: 4.9,
    downloads: 1200,
    image: MARKETPLACE_IMAGES.cyberPack,
    tags: ["Midjourney", "Video"]
  },
  {
    id: 2,
    title: "Viral TikTok Hooks",
    creator: "ContentKing",
    type: "Script Template",
    price: 25,
    rating: 4.7,
    downloads: 850,
    image: MARKETPLACE_IMAGES.tiktokHooks,
    tags: ["Scripts", "Viral"]
  },
  {
    id: 3,
    title: "Ethereal Fantasy LUTS",
    creator: "VisualArtist",
    type: "Filter Preset",
    price: 0,
    rating: 4.8,
    downloads: 5000,
    image: MARKETPLACE_IMAGES.fantasyLuts,
    tags: ["Filters", "Free"]
  },
  {
    id: 4,
    title: "Minimalist Brand Kit",
    creator: "DesignPro",
    type: "Template",
    price: 100,
    rating: 5.0,
    downloads: 320,
    image: MARKETPLACE_IMAGES.brandKit,
    tags: ["Canva", "Branding"]
  },
];

// Extended items for pagination/infinite scroll demos
export const EXTENDED_MARKETPLACE_ITEMS: MarketplaceItem[] = [
  ...MARKETPLACE_ITEMS,
  // Add more items as needed for testing
];
