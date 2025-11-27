import { Instagram, Youtube, Twitter, Linkedin, Podcast } from "lucide-react";

export interface ConnectedAccount {
  id: string;
  name: string;
  icon: typeof Instagram | null;
  color: string;
  handle: string;
  connected: boolean;
  isCustomIcon?: boolean;
}

export const CONNECTED_ACCOUNTS: ConnectedAccount[] = [
  { id: "instagram", name: "Instagram", icon: Instagram, color: "#E1306C", handle: "@felix.art", connected: true },
  { id: "tiktok", name: "TikTok", icon: null, color: "#FFFFFF", handle: "@felix_k", connected: true, isCustomIcon: true },
  { id: "youtube", name: "YouTube", icon: Youtube, color: "#FF0000", handle: "Felix Kjellberg", connected: false },
  { id: "twitter", name: "X", icon: Twitter, color: "#1DA1F2", handle: "@felix", connected: true },
  { id: "linkedin", name: "LinkedIn", icon: Linkedin, color: "#0077B5", handle: "Felix Kjellberg", connected: true },
  { id: "pinterest", name: "Pinterest", icon: null, color: "#BD081C", handle: "@felix_pins", connected: false, isCustomIcon: true },
  { id: "threads", name: "Threads", icon: null, color: "#FFFFFF", handle: "@felix", connected: true, isCustomIcon: true },
  { id: "spotify", name: "Spotify", icon: null, color: "#1DB954", handle: "Future Tech", connected: true, isCustomIcon: true },
  { id: "apple", name: "Apple Podcasts", icon: Podcast, color: "#A64AC9", handle: "Future Tech", connected: true },
];
