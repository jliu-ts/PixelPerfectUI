import bgImage from "@assets/generated_images/cosmic_space_nebula_background_for_video_placeholder.png";
import cyberpunkImage from "@assets/generated_images/cyberpunk_city_vertical_video_thumbnail.png";
import natureImage from "@assets/generated_images/nature_waterfall_vertical_video_thumbnail.png";
import { BRAND_LOGOS } from "../constants/brandLogos";
import { getAvatarUrl, PLATFORM_LOGOS } from "../constants/urls";

export interface FeedItem {
  id: number;
  username: string;
  avatar: string;
  description: string;
  likes: number;
  comments: number;
  music: string;
  image: string;
  verified: boolean;
}

export const FEED_ITEMS: FeedItem[] = [
  {
    id: 1,
    username: "cosmic_dreamer",
    avatar: getAvatarUrl("Felix"),
    description: "Exploring the depths of the nebula with the new V4 model. The colors are absolutely insane! #AIart #Space",
    likes: 4200,
    comments: 842,
    music: "Original Audio - cosmic_dreamer",
    image: bgImage,
    verified: true
  },
  {
    id: 2,
    username: "pixel_ninja",
    avatar: getAvatarUrl("Ninja"),
    description: "Cyberpunk cityscapes are my jam. Generated this in 4K using the new 'Neon Noir' preset. #Cyberpunk #DigitalArt",
    likes: 12500,
    comments: 1200,
    music: "Cyber City - Neon Beats",
    image: cyberpunkImage,
    verified: false
  },
  {
    id: 3,
    username: "nature_whisperer",
    avatar: getAvatarUrl("Annie"),
    description: "Found this hidden waterfall in the latent space. So peaceful. #Nature #AI #Relax",
    likes: 8900,
    comments: 560,
    music: "Forest Sounds - Nature",
    image: natureImage,
    verified: true
  }
];

export interface Story {
  id: string | number;
  type: "live" | "story";
  name: string;
  avatar: string;
  hasNew?: boolean;
}

export const STORIES: Story[] = [
  { id: "battle", type: "live", name: "Live Battle", avatar: getAvatarUrl("Battle", "bottts") },
  { id: 1, type: "story", name: "Instagram", avatar: PLATFORM_LOGOS.instagram, hasNew: true },
  { id: 2, type: "story", name: "TikTok", avatar: PLATFORM_LOGOS.tiktok, hasNew: true },
  { id: 3, type: "story", name: "YouTube", avatar: PLATFORM_LOGOS.youtube, hasNew: false },
  { id: 4, type: "story", name: "OpenAI", avatar: PLATFORM_LOGOS.openai, hasNew: true },
  { id: 5, type: "story", name: "Midjourney", avatar: BRAND_LOGOS.midjourney, hasNew: true },
  { id: 6, type: "story", name: "Runway", avatar: BRAND_LOGOS.runway, hasNew: false },
  { id: 7, type: "story", name: "Stable Diff", avatar: BRAND_LOGOS.stability, hasNew: true },
  { id: 8, type: "story", name: "Pika Labs", avatar: BRAND_LOGOS.pika, hasNew: true },
  { id: 9, type: "story", name: "ElevenLabs", avatar: BRAND_LOGOS.elevenlabs, hasNew: false },
  { id: 10, type: "story", name: "HuggingFace", avatar: BRAND_LOGOS.huggingface, hasNew: true },
  { id: 11, type: "story", name: "Leonardo", avatar: BRAND_LOGOS.leonardo, hasNew: false },
];

export interface Comment {
  id: number;
  user: string;
  text: string;
  time: string;
}

export const MOCK_COMMENTS: Comment[] = [
  { id: 1, user: "art_lover_99", text: "This is incredible! Which model did you use?", time: "2m" },
  { id: 2, user: "prompt_engineer", text: "The lighting is perfect. Mind sharing the seed?", time: "5m" },
  { id: 3, user: "cyber_punk", text: "🔥🔥🔥", time: "12m" },
  { id: 4, user: "future_vision", text: "AI art just keeps getting better.", time: "1h" },
];
