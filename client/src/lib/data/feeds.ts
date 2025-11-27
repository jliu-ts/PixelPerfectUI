import { Code, Zap, Palette, Newspaper } from "lucide-react";

export interface Feed {
  id: number;
  name: string;
  url: string;
  category: string;
  status: "active" | "error";
  lastSync: string;
  icon: typeof Code;
}

export const INITIAL_FEEDS: Feed[] = [
  { id: 1, name: "TechCrunch", url: "https://techcrunch.com/feed", category: "tech", status: "active", lastSync: "2m ago", icon: Code },
  { id: 2, name: "The Verge", url: "https://www.theverge.com/rss/index.xml", category: "tech", status: "active", lastSync: "5m ago", icon: Zap },
  { id: 3, name: "Behance Popular", url: "https://www.behance.net/feeds/projects", category: "design", status: "active", lastSync: "1h ago", icon: Palette },
  { id: 4, name: "Dribbble Popular", url: "https://dribbble.com/shots/popular.rss", category: "design", status: "error", lastSync: "Failed", icon: Palette },
  { id: 5, name: "NYT Technology", url: "https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml", category: "news", status: "active", lastSync: "15m ago", icon: Newspaper },
];

export interface FeedCategory {
  id: string;
  label: string;
}

export const FEED_CATEGORIES: FeedCategory[] = [
  { id: "all", label: "All Feeds" },
  { id: "tech", label: "Technology" },
  { id: "design", label: "Design & Art" },
  { id: "news", label: "News & Trends" },
];
