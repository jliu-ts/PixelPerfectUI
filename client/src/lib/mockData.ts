import bgImage from "@assets/generated_images/cosmic_space_nebula_background_for_video_placeholder.png";
import cyberpunkImage from "@assets/generated_images/cyberpunk_city_vertical_video_thumbnail.png";
import natureImage from "@assets/generated_images/nature_waterfall_vertical_video_thumbnail.png";
import { Home, Search, Plus, Bell, User, Settings, Zap, ShoppingBag, Users, Store, Lightbulb, Briefcase, Library, Rss, Palette, BrainCircuit, Bot, Camera, Square, RectangleHorizontal, RectangleVertical, Instagram, Youtube, Twitter, Linkedin, Podcast, Code, Newspaper, Video, Share2, Type, Image as ImageIcon, Presentation, Scale, Handshake } from "lucide-react";

// Stock Images for Styles (Mock Imports for data structure)
// Ideally these would be actual imports in the component or handled via a proper asset manager
const cinematicImg = "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&auto=format&fit=crop&q=60";
const oilPaintingImg = "https://images.unsplash.com/photo-1579783902614-a3fb39279c53?w=400&auto=format&fit=crop&q=60";
const ghibliImg = "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&auto=format&fit=crop&q=60";
const polaroidImg = "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&auto=format&fit=crop&q=60";
const vaporwaveImg = "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=400&auto=format&fit=crop&q=60";
const minimalistImg = "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=400&auto=format&fit=crop&q=60";
const animeImg = "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&auto=format&fit=crop&q=60";
const render3dImg = "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&auto=format&fit=crop&q=60";
const cyberpunkImg = "https://images.unsplash.com/photo-1515630278258-407f66498911?w=400&auto=format&fit=crop&q=60";

// --- Sidebar Navigation Data ---
export const SIDEBAR_NAVIGATION = [
  {
    title: "Start",
    items: [
      { href: "/", icon: Home, label: "Home" },
      { href: "/create", icon: Plus, label: "Studio", highlight: true },
      { href: "/profile", icon: User, label: "Profile" },
      { href: "/notifications", icon: Bell, label: "Notifications", indicator: true },
    ]
  },
  {
    title: "Create",
    items: [
      { href: "/ideas", icon: Lightbulb, label: "Idea Lab", badge: "NEW" },
      { href: "/collab", icon: Users, label: "Collab Room" },
      { href: "/research", icon: Bot, label: "AI Agent" },
      { href: "/brand", icon: Palette, label: "Brand Kit" },
      { href: "/library", icon: Library, label: "Prompt Library" },
      { href: "/avatars", icon: User, label: "Avatars" },
    ]
  },
  {
    title: "Growth",
    items: [
      { href: "/sponsorships", icon: Handshake, label: "Sponsorships" },
      { href: "/affiliate", icon: Briefcase, label: "Creator Hub" },
      { href: "/store", icon: ShoppingBag, label: "My Store" },
      { href: "/media-kit", icon: Presentation, label: "Media Kit", badge: "LIVE" },
      { href: "/legal", icon: Scale, label: "Legal Guard" },
    ]
  },
  {
    title: "Discover",
    items: [
      { href: "/feeds", icon: Rss, label: "My Feeds" },
      { href: "/search", icon: Search, label: "Explore" },
      { href: "/marketplace", icon: Store, label: "Marketplace" },
      { href: "/context", icon: BrainCircuit, label: "Context" },
    ]
  }
];

// --- Creation Studio Data ---
export const CREATION_STYLES = [
  { id: "Anime", label: "Anime", image: animeImg },
  { id: "Cinematic", label: "Cinematic", image: cinematicImg },
  { id: "3D Render", label: "3D Render", image: render3dImg },
  { id: "Oil Painting", label: "Oil Painting", image: oilPaintingImg },
  { id: "Cyberpunk", label: "Cyberpunk", image: cyberpunkImg },
  { id: "Studio Ghibli", label: "Studio Ghibli", image: ghibliImg },
  { id: "Polaroid", label: "Polaroid", image: polaroidImg },
  { id: "Vaporwave", label: "Vaporwave", image: vaporwaveImg },
  { id: "Minimalist", label: "Minimalist", image: minimalistImg }
];

export const VIDEO_MODELS = ["Google Veo", "Sora", "Runway Gen-2", "Pika 1.0", "HeyGen Avatar"];
export const IMAGE_MODELS = ["Midjourney v6", "DALL-E 3", "Stable Diffusion XL", "Adobe Firefly"];

export const AVATARS = [
  { id: "hg_1", name: "Studio Felix", type: "Instant", optimizedFor: ["16:9", "1:1"], image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" },
  { id: "hg_2", name: "Casual Felix", type: "Photo", optimizedFor: ["9:16", "4:5"], image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Casual" },
  { id: "hg_3", name: "Presenter Felix", type: "Studio", optimizedFor: ["16:9"], image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Presenter" },
];

export const VOICES = [
  { id: "el_1", name: "Felix (Professional)", type: "Cloned", status: "ready", model: "Eleven Multilingual v2" },
  { id: "el_2", name: "Felix (Excited)", type: "Cloned", status: "ready", model: "Eleven Turbo v2.5" },
  { id: "el_pre_1", name: "Adam", type: "Premade", status: "ready", model: "Standard" },
];

export const ASPECT_RATIOS = [
  { id: "1:1", label: "Square", icon: Square, desc: "Instagram Post" },
  { id: "16:9", label: "Landscape", icon: RectangleHorizontal, desc: "YouTube" },
  { id: "9:16", label: "Portrait", icon: RectangleVertical, desc: "TikTok / Reels" },
  { id: "4:5", label: "Vertical", icon: RectangleVertical, desc: "IG Portrait" },
];

// --- Feed Data ---
export const INITIAL_FEEDS = [
  { id: 1, name: "TechCrunch", url: "https://techcrunch.com/feed", category: "tech", status: "active", lastSync: "2m ago", icon: Code },
  { id: 2, name: "The Verge", url: "https://www.theverge.com/rss/index.xml", category: "tech", status: "active", lastSync: "5m ago", icon: Zap },
  { id: 3, name: "Behance Popular", url: "https://www.behance.net/feeds/projects", category: "design", status: "active", lastSync: "1h ago", icon: Palette },
  { id: 4, name: "Dribbble Popular", url: "https://dribbble.com/shots/popular.rss", category: "design", status: "error", lastSync: "Failed", icon: Palette },
  { id: 5, name: "NYT Technology", url: "https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml", category: "news", status: "active", lastSync: "15m ago", icon: Newspaper },
];

export const FEED_CATEGORIES = [
  { id: "all", label: "All Feeds" },
  { id: "tech", label: "Technology" },
  { id: "design", label: "Design & Art" },
  { id: "news", label: "News & Trends" },
];

// --- Marketplace Data ---
export const MARKETPLACE_ITEMS = [
  { 
    id: 1, 
    title: "Cinematic Cyberpunk Pack", 
    creator: "NeonDreamer", 
    type: "Prompt Pack", 
    price: 50, 
    rating: 4.9, 
    downloads: 1200,
    image: "https://picsum.photos/seed/cyber/300/200",
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
    image: "https://picsum.photos/seed/tiktok/300/200",
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
    image: "https://picsum.photos/seed/fantasy/300/200",
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
    image: "https://picsum.photos/seed/brand/300/200",
    tags: ["Canva", "Branding"] 
  },
];

// --- Ecommerce Data ---
export const ECOMMERCE_PRODUCTS = [
  { id: 1, name: "Neon Cyber Hoodie", price: "$89.00", image: "https://picsum.photos/seed/hoodie/300/300", status: "active", category: "Apparel" },
  { id: 2, name: "Holographic Sneakers", price: "$145.00", image: "https://picsum.photos/seed/sneakers/300/300", status: "active", category: "Footwear" },
  { id: 3, name: "Neural Link Headset", price: "$299.00", image: "https://picsum.photos/seed/headset/300/300", status: "draft", category: "Electronics" },
  { id: 4, name: "Smart Water Bottle", price: "$45.00", image: "https://picsum.photos/seed/bottle/300/300", status: "active", category: "Accessories" },
];

export const ECOMMERCE_GENERATION_OPTIONS = [
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

// --- Profile Data ---
export const CONNECTED_ACCOUNTS = [
  { id: "instagram", name: "Instagram", icon: Instagram, color: "#E1306C", handle: "@felix.art", connected: true },
  { id: "tiktok", name: "TikTok", icon: null, color: "#FFFFFF", handle: "@felix_k", connected: true, isCustomIcon: true }, // Using a flag for custom icons
  { id: "youtube", name: "YouTube", icon: Youtube, color: "#FF0000", handle: "Felix Kjellberg", connected: false },
  { id: "twitter", name: "X", icon: Twitter, color: "#1DA1F2", handle: "@felix", connected: true },
  { id: "linkedin", name: "LinkedIn", icon: Linkedin, color: "#0077B5", handle: "Felix Kjellberg", connected: true },
  { id: "pinterest", name: "Pinterest", icon: null, color: "#BD081C", handle: "@felix_pins", connected: false, isCustomIcon: true },
  { id: "threads", name: "Threads", icon: null, color: "#FFFFFF", handle: "@felix", connected: true, isCustomIcon: true },
  { id: "spotify", name: "Spotify", icon: null, color: "#1DB954", handle: "Future Tech", connected: true, isCustomIcon: true },
  { id: "apple", name: "Apple Podcasts", icon: Podcast, color: "#A64AC9", handle: "Future Tech", connected: true },
];

// Mock Feed Data
export const FEED_ITEMS = [
  {
    id: 1,
    username: "cosmic_dreamer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
    description: "Exploring the depths of the nebula with the new V4 model. The colors are absolutely insane! 🌌✨ #AIart #Space",
    likes: 4200,
    comments: 842,
    music: "Original Audio - cosmic_dreamer",
    image: bgImage,
    verified: true
  },
  {
    id: 2,
    username: "pixel_ninja",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ninja",
    description: "Cyberpunk cityscapes are my jam. Generated this in 4K using the new 'Neon Noir' preset. 🏙️🤖 #Cyberpunk #DigitalArt",
    likes: 12500,
    comments: 1200,
    music: "Cyber City - Neon Beats",
    image: cyberpunkImage,
    verified: false
  },
  {
    id: 3,
    username: "nature_whisperer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Annie",
    description: "Found this hidden waterfall in the latent space. 🌿💧 So peaceful. #Nature #AI #Relax",
    likes: 8900,
    comments: 560,
    music: "Forest Sounds - Nature",
    image: natureImage,
    verified: true
  }
];

// Expanded Mock Stories Data (Super App Channels)
export const STORIES = [
  { id: "battle", type: "live", name: "Live Battle", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Battle" },
  { id: 1, type: "story", name: "Instagram", avatar: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png", hasNew: true },
  { id: 2, type: "story", name: "TikTok", avatar: "https://upload.wikimedia.org/wikipedia/commons/3/34/Ionicons_logo-tiktok.svg", hasNew: true },
  { id: 3, type: "story", name: "YouTube", avatar: "https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg", hasNew: false },
  { id: 4, type: "story", name: "OpenAI", avatar: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg", hasNew: true },
  { id: 5, type: "story", name: "Midjourney", avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=Midjourney", hasNew: true },
  { id: 6, type: "story", name: "Runway", avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=Runway", hasNew: false },
  { id: 7, type: "story", name: "Stable Diff", avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=Stable", hasNew: true },
  { id: 8, type: "story", name: "Pika Labs", avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=Pika", hasNew: true },
  { id: 9, type: "story", name: "ElevenLabs", avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=Eleven", hasNew: false },
  { id: 10, type: "story", name: "HuggingFace", avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=Hugging", hasNew: true },
  { id: 11, type: "story", name: "Leonardo", avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=Leonardo", hasNew: false },
];

// Mock Comments Data
export const MOCK_COMMENTS = [
  { id: 1, user: "art_lover_99", text: "This is incredible! Which model did you use?", time: "2m" },
  { id: 2, user: "prompt_engineer", text: "The lighting is perfect. Mind sharing the seed?", time: "5m" },
  { id: 3, user: "cyber_punk", text: "🔥🔥🔥", time: "12m" },
  { id: 4, user: "future_vision", text: "AI art just keeps getting better.", time: "1h" },
];

// Mock Prompt Data
export const MOCK_PROMPTS = [
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

export const MOCK_ARTICLES = [
  {
    id: 1,
    title: "The Future of AI in Content Creation: What Creators Need to Know",
    source: "TechCrunch",
    time: "2h ago",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60",
    summary: "AI tools are rapidly evolving, offering new ways for creators to generate video, images, and text. The key is to leverage these tools for efficiency while maintaining a unique human voice."
  },
  {
    id: 2,
    title: "Top 10 Social Media Trends for 2025",
    source: "Social Media Today",
    time: "4h ago",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop&q=60",
    summary: "From immersive AR experiences to the return of long-form video, here are the trends that will define the social media landscape in 2025."
  },
  {
    id: 3,
    title: "SpaceX Launches Next Gen Starship",
    source: "The Verge",
    time: "6h ago",
    image: "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=800&auto=format&fit=crop&q=60",
    summary: "A successful launch marks a new era for space travel as SpaceX pushes the boundaries of reusable rocket technology."
  },
  {
    id: 4,
    title: "Minimalism is Back: Design Trends to Watch",
    source: "Behance Blog",
    time: "12h ago",
    image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=800&auto=format&fit=crop&q=60",
    summary: "After years of maximalism, clean lines and whitespace are making a strong comeback in digital product design."
  },
  {
    id: 5,
    title: "The Rise of Virtual Influencers",
    source: "Wired",
    time: "14h ago",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&auto=format&fit=crop&q=60",
    summary: "Virtual influencers are gaining traction, with brands partnering with AI-generated personas to reach younger audiences."
  },
  {
    id: 6,
    title: "Generative Audio: The Next Frontier",
    source: "The Verge",
    time: "1d ago",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&auto=format&fit=crop&q=60",
    summary: "From music generation to realistic voice synthesis, AI audio tools are becoming more sophisticated and accessible."
  },
  {
    id: 7,
    title: "SEO in the Age of AI Search",
    source: "Search Engine Land",
    time: "1d ago",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&auto=format&fit=crop&q=60",
    summary: "How to optimize your content for AI-powered search engines like Google SGE and Bing Chat."
  },
  {
    id: 8,
    title: "Sustainable Tech: Green Computing",
    source: "TechCrunch",
    time: "2d ago",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&auto=format&fit=crop&q=60",
    summary: "As AI models grow larger, the environmental impact of computing power is coming under scrutiny."
  },
  {
    id: 9,
    title: "The Metaverse: Dead or Evolving?",
    source: "Polygon",
    time: "2d ago",
    image: "https://images.unsplash.com/photo-1614724723656-40c4ac775def?w=800&auto=format&fit=crop&q=60",
    summary: "While the hype has settled, spatial computing and VR continue to develop in interesting niche directions."
  },
  {
    id: 10,
    title: "Coding with AI Copilots",
    source: "GitHub Blog",
    time: "3d ago",
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&auto=format&fit=crop&q=60",
    summary: "Developers are reporting significant productivity boosts using AI pair programmers, but is code quality suffering?"
  },
  {
    id: 11,
    title: "Digital Fashion Week 2025",
    source: "Vogue Business",
    time: "3d ago",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=60",
    summary: "Top luxury brands are showcasing their latest collections in fully immersive digital environments."
  },
  {
    id: 12,
    title: "The Creator Economy Recession?",
    source: "The Information",
    time: "4d ago",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&auto=format&fit=crop&q=60",
    summary: "As brand deals slow down, creators are diversifying revenue streams through direct-to-consumer products."
  },
  {
    id: 13,
    title: "AI Regulation: EU Act Explained",
    source: "BBC News",
    time: "5d ago",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=60",
    summary: "A deep dive into the comprehensive AI regulations recently passed by the European Union."
  },
  {
    id: 14,
    title: "Web3 Gaming: What Went Wrong?",
    source: "IGN",
    time: "5d ago",
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&auto=format&fit=crop&q=60",
    summary: "Analyzing the crash of play-to-earn models and the future of blockchain integration in video games."
  },
  {
    id: 16,
    title: "The Rise of Slow Content",
    source: "Medium",
    time: "1w ago",
    image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800&auto=format&fit=crop&q=60",
    summary: "Counter to the fast-paced short-form trend, creators are finding success with long, meditative, and highly produced content."
  },
  {
    id: 17,
    title: "Authenticity vs. AI Perfection",
    source: "AdAge",
    time: "1w ago",
    image: "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=800&auto=format&fit=crop&q=60",
    summary: "Audiences are craving raw, unpolished moments as a reaction to increasingly perfect AI-generated imagery."
  },
  {
    id: 18,
    title: "Niche Communities are the New Mainstream",
    source: "Substack",
    time: "2w ago",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=60",
    summary: "Mass appeal is out. Deeply engaged micro-communities are where the real value and connection happen."
  },
  {
    id: 19,
    title: "Data Privacy for Creators",
    source: "Electronic Frontier Foundation",
    time: "2w ago",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=60",
    summary: "Protecting your digital footprint and understanding platform terms of service is more critical than ever."
  },
  {
    id: 20,
    title: "The Evolution of Influencer Marketing",
    source: "Marketing Dive",
    time: "2w ago",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=60",
    summary: "Brands are moving away from transactional posts towards long-term partnerships and co-creation."
  }
];
