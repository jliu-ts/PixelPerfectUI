import { ARTICLE_IMAGES } from "../constants/urls";

export interface Article {
  id: number;
  title: string;
  source: string;
  time: string;
  image: string;
  summary: string;
}

export const MOCK_ARTICLES: Article[] = [
  {
    id: 1,
    title: "The Future of AI in Content Creation: What Creators Need to Know",
    source: "TechCrunch",
    time: "2h ago",
    image: ARTICLE_IMAGES.aiContent,
    summary: "AI tools are rapidly evolving, offering new ways for creators to generate video, images, and text. The key is to leverage these tools for efficiency while maintaining a unique human voice."
  },
  {
    id: 2,
    title: "Top 10 Social Media Trends for 2025",
    source: "Social Media Today",
    time: "4h ago",
    image: ARTICLE_IMAGES.socialTrends,
    summary: "From immersive AR experiences to the return of long-form video, here are the trends that will define the social media landscape in 2025."
  },
  {
    id: 3,
    title: "SpaceX Launches Next Gen Starship",
    source: "The Verge",
    time: "6h ago",
    image: ARTICLE_IMAGES.spaceX,
    summary: "A successful launch marks a new era for space travel as SpaceX pushes the boundaries of reusable rocket technology."
  },
  {
    id: 4,
    title: "Minimalism is Back: Design Trends to Watch",
    source: "Behance Blog",
    time: "12h ago",
    image: ARTICLE_IMAGES.minimalism,
    summary: "After years of maximalism, clean lines and whitespace are making a strong comeback in digital product design."
  },
  {
    id: 5,
    title: "The Rise of Virtual Influencers",
    source: "Wired",
    time: "14h ago",
    image: ARTICLE_IMAGES.virtualInfluencers,
    summary: "Virtual influencers are gaining traction, with brands partnering with AI-generated personas to reach younger audiences."
  },
  {
    id: 6,
    title: "Generative Audio: The Next Frontier",
    source: "The Verge",
    time: "1d ago",
    image: ARTICLE_IMAGES.generativeAudio,
    summary: "From music generation to realistic voice synthesis, AI audio tools are becoming more sophisticated and accessible."
  },
  {
    id: 7,
    title: "SEO in the Age of AI Search",
    source: "Search Engine Land",
    time: "1d ago",
    image: ARTICLE_IMAGES.seo,
    summary: "How to optimize your content for AI-powered search engines like Google SGE and Bing Chat."
  },
  {
    id: 8,
    title: "Sustainable Tech: Green Computing",
    source: "TechCrunch",
    time: "2d ago",
    image: ARTICLE_IMAGES.greenTech,
    summary: "As AI models grow larger, the environmental impact of computing power is coming under scrutiny."
  },
  {
    id: 9,
    title: "The Metaverse: Dead or Evolving?",
    source: "Polygon",
    time: "2d ago",
    image: ARTICLE_IMAGES.metaverse,
    summary: "While the hype has settled, spatial computing and VR continue to develop in interesting niche directions."
  },
  {
    id: 10,
    title: "Coding with AI Copilots",
    source: "GitHub Blog",
    time: "3d ago",
    image: ARTICLE_IMAGES.coding,
    summary: "Developers are reporting significant productivity boosts using AI pair programmers, but is code quality suffering?"
  },
  {
    id: 11,
    title: "Digital Fashion Week 2025",
    source: "Vogue Business",
    time: "3d ago",
    image: ARTICLE_IMAGES.fashion,
    summary: "Top luxury brands are showcasing their latest collections in fully immersive digital environments."
  },
  {
    id: 12,
    title: "The Creator Economy Recession?",
    source: "The Information",
    time: "4d ago",
    image: ARTICLE_IMAGES.creatorEconomy,
    summary: "As brand deals slow down, creators are diversifying revenue streams through direct-to-consumer products."
  },
  {
    id: 13,
    title: "AI Regulation: EU Act Explained",
    source: "BBC News",
    time: "5d ago",
    image: ARTICLE_IMAGES.aiRegulation,
    summary: "A deep dive into the comprehensive AI regulations recently passed by the European Union."
  },
  {
    id: 14,
    title: "Web3 Gaming: What Went Wrong?",
    source: "IGN",
    time: "5d ago",
    image: ARTICLE_IMAGES.gaming,
    summary: "Analyzing the crash of play-to-earn models and the future of blockchain integration in video games."
  },
  {
    id: 16,
    title: "The Rise of Slow Content",
    source: "Medium",
    time: "1w ago",
    image: ARTICLE_IMAGES.slowContent,
    summary: "Counter to the fast-paced short-form trend, creators are finding success with long, meditative, and highly produced content."
  },
  {
    id: 17,
    title: "Authenticity vs. AI Perfection",
    source: "AdAge",
    time: "1w ago",
    image: ARTICLE_IMAGES.authenticity,
    summary: "Audiences are craving raw, unpolished moments as a reaction to increasingly perfect AI-generated imagery."
  },
  {
    id: 18,
    title: "Niche Communities are the New Mainstream",
    source: "Substack",
    time: "2w ago",
    image: ARTICLE_IMAGES.communities,
    summary: "Mass appeal is out. Deeply engaged micro-communities are where the real value and connection happen."
  },
  {
    id: 19,
    title: "Data Privacy for Creators",
    source: "Electronic Frontier Foundation",
    time: "2w ago",
    image: ARTICLE_IMAGES.privacy,
    summary: "Protecting your digital footprint and understanding platform terms of service is more critical than ever."
  },
  {
    id: 20,
    title: "The Evolution of Influencer Marketing",
    source: "Marketing Dive",
    time: "2w ago",
    image: ARTICLE_IMAGES.marketing,
    summary: "Brands are moving away from transactional posts towards long-term partnerships and co-creation."
  }
];
