export interface Prompt {
  id: number;
  title: string;
  prompt: string;
  category: string;
  platform: string;
  tags: string[];
  lastUsed: string;
}

export const MOCK_PROMPTS: Prompt[] = [
  {
    id: 1,
    title: "Tech Product Showcase",
    prompt: "Cinematic 4K product shot of [PRODUCT], floating in zero gravity, studio lighting, sleek black background with neon blue rim light, highly detailed textures, macro lens, 8k resolution",
    category: "Product",
    platform: "Instagram",
    tags: ["Cinematic", "Product", "Tech"],
    lastUsed: "2h ago"
  },
  {
    id: 2,
    title: "Viral TikTok Hook",
    prompt: "POV: You just discovered [TOPIC] and it changed your life. Fast cuts, dynamic text overlay, high energy background music, trending audio style.",
    category: "Social",
    platform: "TikTok",
    tags: ["Viral", "Short Form", "Hook"],
    lastUsed: "1d ago"
  },
  {
    id: 3,
    title: "LinkedIn Thought Leadership",
    prompt: "Professional headshot of a diverse team collaborating in a modern glass office, natural lighting, candid style, depth of field, corporate but approachable atmosphere.",
    category: "Business",
    platform: "LinkedIn",
    tags: ["Professional", "Corporate", "Team"],
    lastUsed: "3d ago"
  },
  {
    id: 4,
    title: "Cyberpunk Cityscape",
    prompt: "Futuristic city street at night, raining, neon signs reflecting in puddles, towering skyscrapers with holographic ads, cyberpunk aesthetic, blade runner style, volumetric fog.",
    category: "Art",
    platform: "General",
    tags: ["Cyberpunk", "Scifi", "Atmospheric"],
    lastUsed: "1w ago"
  },
  {
    id: 5,
    title: "Minimalist Packaging",
    prompt: "Clean minimalist packaging design for organic skincare brand, pastel colors, soft lighting, white background, high end aesthetic",
    category: "Product",
    platform: "Instagram",
    tags: ["Minimalist", "Packaging", "Design"],
    lastUsed: "5d ago"
  },
  {
    id: 6,
    title: "Abstract 3D Render",
    prompt: "Abstract 3D shape render, glass dispersion effect, iridescent colors, dark background, octane render, 8k, wallpaper",
    category: "Art",
    platform: "General",
    tags: ["Abstract", "3D", "Wallpaper"],
    lastUsed: "2d ago"
  },
  {
    id: 7,
    title: "Instagram Lifestyle",
    prompt: "Candid lifestyle photo of a digital nomad working from a bali cafe, natural sunlight, aesthetic coffee latte art, macbook pro, lush greenery, depth of field",
    category: "Social",
    platform: "Instagram",
    tags: ["Lifestyle", "Travel", "Aesthetic"],
    lastUsed: "4h ago"
  }
];
