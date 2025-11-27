import { Video, Share2, Type, Image as ImageIcon } from "lucide-react";
import { ECOMMERCE_IMAGES } from "../constants/urls";

export interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  status: "active" | "draft";
  category: string;
}

export const ECOMMERCE_PRODUCTS: Product[] = [
  { id: 1, name: "Neon Cyber Hoodie", price: "$89.00", image: ECOMMERCE_IMAGES.hoodie, status: "active", category: "Apparel" },
  { id: 2, name: "Holographic Sneakers", price: "$145.00", image: ECOMMERCE_IMAGES.sneakers, status: "active", category: "Footwear" },
  { id: 3, name: "Neural Link Headset", price: "$299.00", image: ECOMMERCE_IMAGES.headset, status: "draft", category: "Electronics" },
  { id: 4, name: "Smart Water Bottle", price: "$45.00", image: ECOMMERCE_IMAGES.bottle, status: "active", category: "Accessories" },
];

export interface GenerationOption {
  id: string;
  label: string;
  icon: typeof Video;
  description: string;
  model: string;
  mode: "video" | "image" | "text";
  style: string;
}

export const ECOMMERCE_GENERATION_OPTIONS: GenerationOption[] = [
  {
    id: "video-ad",
    label: "Video Commercial",
    icon: Video,
    description: "High-energy cinematic product showcase",
    model: "Google Veo",
    mode: "video",
    style: "Cinematic"
  },
  {
    id: "social-post",
    label: "Social Media Post",
    icon: Share2,
    description: "Viral-ready Instagram/TikTok content",
    model: "Midjourney v6",
    mode: "image",
    style: "Lifestyle"
  },
  {
    id: "product-photo",
    label: "AI Photoshoot",
    icon: ImageIcon,
    description: "Studio quality product photography",
    model: "Stable Diffusion XL",
    mode: "image",
    style: "Studio"
  },
  {
    id: "copy",
    label: "Marketing Copy",
    icon: Type,
    description: "SEO-optimized product descriptions",
    model: "GPT-4",
    mode: "text",
    style: "Professional"
  }
];
