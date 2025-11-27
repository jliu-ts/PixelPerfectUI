import { Square, RectangleHorizontal, RectangleVertical } from "lucide-react";
import { STYLE_IMAGES } from "../constants/urls";

// Creation Styles with centralized image URLs
export const CREATION_STYLES = [
  { id: "Anime", label: "Anime", image: STYLE_IMAGES.anime },
  { id: "Cinematic", label: "Cinematic", image: STYLE_IMAGES.cinematic },
  { id: "3D Render", label: "3D Render", image: STYLE_IMAGES.render3d },
  { id: "Oil Painting", label: "Oil Painting", image: STYLE_IMAGES.oilPainting },
  { id: "Cyberpunk", label: "Cyberpunk", image: STYLE_IMAGES.cyberpunk },
  { id: "Studio Ghibli", label: "Studio Ghibli", image: STYLE_IMAGES.ghibli },
  { id: "Polaroid", label: "Polaroid", image: STYLE_IMAGES.polaroid },
  { id: "Vaporwave", label: "Vaporwave", image: STYLE_IMAGES.vaporwave },
  { id: "Minimalist", label: "Minimalist", image: STYLE_IMAGES.minimalist }
];

// AI Models
export const VIDEO_MODELS = ["Google Veo", "Sora", "Runway Gen-2", "Pika 1.0", "HeyGen Avatar"];
export const IMAGE_MODELS = ["Midjourney v6", "DALL-E 3", "Stable Diffusion XL", "Adobe Firefly"];

// Avatars for video generation
export const AVATARS = [
  { id: "hg_1", name: "Studio Felix", type: "Instant", optimizedFor: ["16:9", "1:1"], image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" },
  { id: "hg_2", name: "Casual Felix", type: "Photo", optimizedFor: ["9:16", "4:5"], image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Casual" },
  { id: "hg_3", name: "Presenter Felix", type: "Studio", optimizedFor: ["16:9"], image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Presenter" },
];

// Voice options for audio generation
export const VOICES = [
  { id: "el_1", name: "Felix (Professional)", type: "Cloned", status: "ready", model: "Eleven Multilingual v2" },
  { id: "el_2", name: "Felix (Excited)", type: "Cloned", status: "ready", model: "Eleven Turbo v2.5" },
  { id: "el_pre_1", name: "Adam", type: "Premade", status: "ready", model: "Standard" },
];

// Aspect ratios for content creation
export const ASPECT_RATIOS = [
  { id: "1:1", label: "Square", icon: Square, desc: "Instagram Post" },
  { id: "16:9", label: "Landscape", icon: RectangleHorizontal, desc: "YouTube" },
  { id: "9:16", label: "Portrait", icon: RectangleVertical, desc: "TikTok / Reels" },
  { id: "4:5", label: "Vertical", icon: RectangleVertical, desc: "IG Portrait" },
];
