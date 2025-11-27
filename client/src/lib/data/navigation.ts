import {
  Home, Search, Plus, Bell, User, Settings, Zap, ShoppingBag, Users, Store,
  Lightbulb, Briefcase, Library, Rss, Palette, BrainCircuit, Bot, Presentation,
  Scale, Handshake
} from "lucide-react";

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
