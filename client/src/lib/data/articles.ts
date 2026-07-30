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
    title: "AI Video Got Cheap. Creator Output Is Up 10x",
    source: "TechCrunch",
    time: "2h ago",
    image: ARTICLE_IMAGES.aiContent,
    summary: "Generation costs dropped roughly 90% in eighteen months. The bottleneck moved from making the video to deciding which one is worth making."
  },
  {
    id: 2,
    title: "Top 10 Social Media Trends for 2025",
    source: "Social Media Today",
    time: "4h ago",
    image: ARTICLE_IMAGES.socialTrends,
    summary: "Long-form video is back, AR filters are table stakes, and public follower counts are quietly disappearing from profiles."
  },
  {
    id: 3,
    title: "SpaceX Launches Next Gen Starship",
    source: "The Verge",
    time: "6h ago",
    image: ARTICLE_IMAGES.spaceX,
    summary: "The booster landed intact for a fourth consecutive flight, putting reuse economics within range of the company's original projections."
  },
  {
    id: 4,
    title: "Minimalism is Back: Design Trends to Watch",
    source: "Behance Blog",
    time: "12h ago",
    image: ARTICLE_IMAGES.minimalism,
    summary: "Whitespace is winning again, mostly because dense dashboards kept testing badly with first-time users."
  },
  {
    id: 5,
    title: "The Rise of Virtual Influencers",
    source: "Wired",
    time: "14h ago",
    image: ARTICLE_IMAGES.virtualInfluencers,
    summary: "Brands are signing AI-generated personas because they don't age, don't tour, and don't post something regrettable at 2am."
  },
  {
    id: 6,
    title: "Generative Audio Comes for Voiceover Work",
    source: "The Verge",
    time: "1d ago",
    image: ARTICLE_IMAGES.generativeAudio,
    summary: "Synthetic voice is cheap enough now that mid-tier audiobook narration is being quoted at a third of last year's rate."
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
    summary: "Training runs now draw enough power that utilities are being consulted before a model launch date is set."
  },
  {
    id: 9,
    title: "The Metaverse: Dead or Evolving?",
    source: "Polygon",
    time: "2d ago",
    image: ARTICLE_IMAGES.metaverse,
    summary: "Consumer headset sales flattened. Surgical training and industrial simulation kept writing checks."
  },
  {
    id: 10,
    title: "Coding with AI Copilots",
    source: "GitHub Blog",
    time: "3d ago",
    image: ARTICLE_IMAGES.coding,
    summary: "Teams report faster first drafts and more hours in review. Net throughput is harder to measure than either camp admits."
  },
  {
    id: 11,
    title: "Digital Fashion Week 2025",
    source: "Vogue Business",
    time: "3d ago",
    image: ARTICLE_IMAGES.fashion,
    summary: "Four houses skipped the physical runway entirely this season and shipped the collection as a playable environment."
  },
  {
    id: 12,
    title: "The Creator Economy Recession?",
    source: "The Information",
    time: "4d ago",
    image: ARTICLE_IMAGES.creatorEconomy,
    summary: "Brand deals are down for a second straight quarter. Merch, courses, and paid communities are covering the gap."
  },
  {
    id: 13,
    title: "AI Regulation: EU Act Explained",
    source: "BBC News",
    time: "5d ago",
    image: ARTICLE_IMAGES.aiRegulation,
    summary: "What the tiered risk categories actually require, and which obligations land on smaller developers in 2027."
  },
  {
    id: 14,
    title: "Web3 Gaming: What Went Wrong?",
    source: "IGN",
    time: "5d ago",
    image: ARTICLE_IMAGES.gaming,
    summary: "Play-to-earn collapsed once token rewards stopped outpacing the grind. What survived is smaller and less loud about the chain."
  },
  {
    id: 16,
    title: "The Rise of Slow Content",
    source: "Medium",
    time: "1w ago",
    image: ARTICLE_IMAGES.slowContent,
    summary: "Ninety-minute video essays are beating shorts on total watch time, and ad rates follow watch time."
  },
  {
    id: 17,
    title: "Authenticity vs. AI Perfection",
    source: "AdAge",
    time: "1w ago",
    image: ARTICLE_IMAGES.authenticity,
    summary: "Engagement keeps climbing on visibly unedited footage. Agencies have started briefing for 'shot on a phone.'"
  },
  {
    id: 18,
    title: "Niche Communities are the New Mainstream",
    source: "Substack",
    time: "2w ago",
    image: ARTICLE_IMAGES.communities,
    summary: "A 2,000-person Discord now out-earns a 200,000-follower feed for a good number of creators."
  },
  {
    id: 19,
    title: "Data Privacy for Creators",
    source: "Electronic Frontier Foundation",
    time: "2w ago",
    image: ARTICLE_IMAGES.privacy,
    summary: "Most creator contracts hand over a perpetual license to your likeness. Here's what to strike before you sign."
  },
  {
    id: 20,
    title: "The Evolution of Influencer Marketing",
    source: "Marketing Dive",
    time: "2w ago",
    image: ARTICLE_IMAGES.marketing,
    summary: "One-off sponsored posts are losing budget to year-long retainers with creative control written in."
  }
];
