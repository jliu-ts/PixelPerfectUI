import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { 
  ArrowLeft, 
  Search, 
  X, 
  TrendingUp, 
  User, 
  Sparkles, 
  Layers, 
  Clock, 
  Instagram, 
  Youtube, 
  Twitter, 
  Globe, 
  Filter, 
  Video, 
  Image, 
  Type, 
  Mic, 
  Smartphone, 
  Heart, 
  Play,
  ArrowUpRight,
  Hash,
  Grid,
  List,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Data
const RECENT_SEARCHES = [
  { term: "Cyberpunk aesthetics", time: "2m ago" },
  { term: "Neon city loop", time: "1h ago" },
  { term: "Minimalist fonts", time: "3h ago" },
  { term: "AI video generators", time: "1d ago" }
];

const TRENDING_TOPICS = [
  { tag: "#FrutigerAero", volume: "2.4M", change: "+12%" },
  { tag: "#DarkFantasy", volume: "1.8M", change: "+8%" },
  { tag: "#Y2K", volume: "1.2M", change: "+15%" },
  { tag: "#Synthwave", volume: "900k", change: "+5%" },
  { tag: "#Abstract3D", volume: "850k", change: "+22%" }
];

// Mock Explore Feed (IG Grid Style)
const EXPLORE_FEED = Array.from({ length: 24 }).map((_, i) => ({
  id: i,
  image: `https://picsum.photos/seed/explore${i}/500/500`,
  likes: Math.floor(Math.random() * 10000) + 500,
  type: i % 6 === 0 ? "video" : "image",
  isReel: i % 8 === 0,
  creator: "creator_" + i
}));

const RESULTS = {
  creators: [
    { id: 1, name: "NeonDreamer", handle: "@neondreamer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Neon", followers: "12.5k", platform: "instagram", platformIcon: Instagram, color: "#E1306C", bio: "Digital artist creating neon dreamscapes" },
    { id: 2, name: "PixelArtist", handle: "@pixelart", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pixel", followers: "8.2k", platform: "tiktok", platformIcon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" height="24" width="24">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
      </svg>
    ), color: "#FFFFFF", bio: "Pixel art tutorials & speedpaints" },
    { id: 3, name: "TechReviewer", handle: "TechDaily", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tech", followers: "450k", platform: "youtube", platformIcon: Youtube, color: "#FF0000", bio: "Daily tech reviews and news" },
    { id: 4, name: "AI_News", handle: "@latest_ai", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AI", followers: "25k", platform: "twitter", platformIcon: Twitter, color: "#1DA1F2", bio: "Breaking AI news 24/7" },
  ],
  assets: [
    { id: 1, title: "Cyberpunk City Pack", type: "3D Model", downloads: "1.2k", image: "https://picsum.photos/seed/cybercity/300/300", price: "$29", rating: 4.8 },
    { id: 2, title: "Neon Glitch Overlay", type: "Video Effect", downloads: "3.5k", image: "https://picsum.photos/seed/glitch/300/300", price: "$15", rating: 4.5 },
    { id: 3, title: "Analog Film Grain", type: "Texture", downloads: "8.2k", image: "https://picsum.photos/seed/grain/300/300", price: "Free", rating: 4.9 },
    { id: 4, title: "Holographic HUD", type: "UI Kit", downloads: "2.1k", image: "https://picsum.photos/seed/hud/300/300", price: "$45", rating: 4.7 },
    { id: 5, title: "Synthwave Audio Loop", type: "Audio", downloads: "5.4k", image: "https://picsum.photos/seed/synth/300/300", price: "$10", rating: 4.6 },
    { id: 6, title: "Abstract 3D Shapes", type: "3D Model", downloads: "3.3k", image: "https://picsum.photos/seed/shapes/300/300", price: "$25", rating: 4.8 },
  ],
  inspiration: [
    { id: 1, title: "Future Interfaces", source: "Pinterest", image: "https://picsum.photos/seed/interface/300/200", likes: 1200 },
    { id: 2, title: "Holographic UI Design", source: "Behance", image: "https://picsum.photos/seed/holographic/300/200", likes: 850 },
    { id: 3, title: "Motion Graphics Showreel", source: "Vimeo", image: "https://picsum.photos/seed/motion/300/200", likes: 2100 },
    { id: 4, title: "Typography Trends 2024", source: "Medium", image: "https://picsum.photos/seed/type/300/200", likes: 560 },
    { id: 5, title: "Generative Art Series", source: "ArtStation", image: "https://picsum.photos/seed/genart/300/200", likes: 3400 },
    { id: 6, title: "Cyber Fashion", source: "Instagram", image: "https://picsum.photos/seed/fashion/300/200", likes: 920 },
  ]
};

const PLATFORMS = [
  { id: "instagram", label: "Instagram", icon: Instagram },
  { id: "tiktok", label: "TikTok", icon: Smartphone },
  { id: "youtube", label: "YouTube", icon: Youtube },
  { id: "twitter", label: "Twitter/X", icon: Twitter },
  { id: "linkedin", label: "LinkedIn", icon: Globe },
];

const FORMATS = [
  { id: "video", label: "Video", icon: Video },
  { id: "image", label: "Image", icon: Image },
  { id: "text", label: "Text", icon: Type },
  { id: "audio", label: "Audio", icon: Mic },
];

export default function SearchPage() {
  const [, setLocation] = useLocation();
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "creators" | "assets" | "inspiration">("all");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Simulate loading state when typing
  useEffect(() => {
    if (query) {
      setIsSearching(true);
      const timer = setTimeout(() => setIsSearching(false), 600);
      return () => clearTimeout(timer);
    }
  }, [query]);

  const clearSearch = () => {
    setQuery("");
    setIsSearching(false);
  };

  const togglePlatform = (id: string) => {
    setSelectedPlatform(prev => prev === id ? null : id);
  };

  const toggleFormat = (id: string) => {
    setSelectedFormat(prev => prev === id ? null : id);
  };

  return (
    <Layout hideTabs>
      <div className="min-h-screen bg-background pb-24 md:pb-8">
        {/* Header / Search Bar */}
        <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-xl border-b border-white/5 transition-all duration-200">
          <div className="p-4 pt-6 flex items-center gap-3 max-w-5xl mx-auto w-full">
            <button 
              onClick={() => setLocation("/")}
              className="p-2 -ml-2 rounded-full hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex-1 relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-accent transition-colors h-4 w-4" />
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search creators, assets, trends..." 
                className="w-full bg-[#1E1E1E] border border-white/10 rounded-xl pl-10 pr-10 py-3 text-sm text-white focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all placeholder:text-gray-600 shadow-sm"
                autoFocus
              />
              {query && (
                <button 
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white p-1 rounded-full hover:bg-white/10 transition-all"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "p-3 rounded-xl border transition-all active:scale-95",
                showFilters || selectedPlatform || selectedFormat
                  ? "bg-accent text-black border-accent shadow-[0_0_15px_-3px_rgba(124,58,237,0.4)]"
                  : "bg-[#1E1E1E] border-white/10 text-gray-400 hover:text-white hover:border-white/20"
              )}
            >
              <Filter size={18} />
            </button>
          </div>
          
          {/* Advanced Filters Panel */}
          {showFilters && (
            <div className="px-4 pb-4 animate-in slide-in-from-top-2 fade-in duration-200 border-b border-white/5 bg-[#151515]">
              <div className="max-w-5xl mx-auto w-full space-y-4 pt-2">
                {/* Platforms */}
                <div>
                  <h3 className="text-[10px] font-bold text-gray-500 uppercase mb-2 tracking-wider">Platforms</h3>
                  <div className="flex flex-wrap gap-2">
                    {PLATFORMS.map(platform => (
                      <button
                        key={platform.id}
                        onClick={() => togglePlatform(platform.id)}
                        className={cn(
                          "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all active:scale-95",
                          selectedPlatform === platform.id
                            ? "bg-white text-black border-white shadow-sm"
                            : "bg-[#1E1E1E] text-gray-400 border-white/5 hover:border-white/20 hover:text-white"
                        )}
                      >
                        <platform.icon size={12} />
                        {platform.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content Formats */}
                <div>
                  <h3 className="text-[10px] font-bold text-gray-500 uppercase mb-2 tracking-wider">Format</h3>
                  <div className="flex flex-wrap gap-2">
                    {FORMATS.map(format => (
                      <button
                        key={format.id}
                        onClick={() => toggleFormat(format.id)}
                        className={cn(
                          "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all active:scale-95",
                          selectedFormat === format.id
                            ? "bg-white text-black border-white shadow-sm"
                            : "bg-[#1E1E1E] text-gray-400 border-white/5 hover:border-white/20 hover:text-white"
                        )}
                      >
                        <format.icon size={12} />
                        {format.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Filter Tabs (Only show when searching) */}
          {query && !showFilters && (
            <div className="max-w-5xl mx-auto w-full px-4 pb-0 overflow-x-auto no-scrollbar flex gap-6 border-b border-white/5">
              {[
                { id: "all", label: "Top Results" },
                { id: "creators", label: "Creators" },
                { id: "assets", label: "Assets" },
                { id: "inspiration", label: "Inspiration" }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    "text-xs font-bold pb-3 border-b-2 transition-colors whitespace-nowrap px-1 relative top-[1px]",
                    activeTab === tab.id ? "text-white border-accent" : "text-gray-500 border-transparent hover:text-gray-300"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 md:p-6 max-w-5xl mx-auto w-full">
          {!query ? (
            /* Empty State / Discovery */
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Recent Searches */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2 px-1">
                  <Clock size={12} /> Recent
                </h3>
                <div className="flex flex-wrap gap-2">
                  {RECENT_SEARCHES.map((item, i) => (
                    <button 
                      key={i}
                      onClick={() => setQuery(item.term)}
                      className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1E1E1E] border border-white/5 text-sm text-gray-300 hover:bg-white/5 hover:border-white/10 hover:text-white transition-all"
                    >
                      <span>{item.term}</span>
                      <span className="text-[10px] text-gray-600 group-hover:text-gray-500">{item.time}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Trending Topics */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2 px-1">
                  <TrendingUp size={12} className="text-accent" /> Trending Now
                </h3>
                <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                  {TRENDING_TOPICS.map((topic, i) => (
                    <button 
                      key={i}
                      onClick={() => setQuery(topic.tag)}
                      className="min-w-[160px] p-4 rounded-2xl bg-[#1E1E1E] border border-white/5 flex flex-col gap-2 hover:bg-[#252525] hover:border-white/10 hover:translate-y-[-2px] transition-all group"
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-gray-400 text-xs font-bold">#{i+1}</span>
                        <span className="text-[10px] font-bold text-green-500 bg-green-500/10 px-1.5 py-0.5 rounded">{topic.change}</span>
                      </div>
                      <div>
                        <span className="text-sm font-bold text-white block mb-0.5 group-hover:text-accent transition-colors">{topic.tag}</span>
                        <span className="text-xs text-gray-500">{topic.volume} posts</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Explore Grid (IG Style) */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2 px-1">
                  <Grid size={12} /> Explore
                </h3>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-0.5 md:gap-1 auto-rows-[minmax(120px,auto)] md:auto-rows-[minmax(200px,auto)] grid-flow-dense rounded-xl overflow-hidden">
                  {EXPLORE_FEED.map((item, i) => (
                    <div 
                      key={item.id} 
                      className={cn(
                        "relative bg-gray-900 group cursor-pointer overflow-hidden",
                        item.isReel ? "row-span-2 h-full" : "aspect-square"
                      )}
                      style={{ 
                        gridRow: item.isReel ? "span 2" : "auto",
                      }}
                    >
                      <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Explore content" />
                      
                      {/* Type Indicators */}
                      <div className="absolute top-2 right-2 z-10">
                        {item.type === "video" && <Video size={16} className="text-white drop-shadow-md" />}
                        {item.isReel && <Play size={16} fill="white" className="text-white drop-shadow-md" />}
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                         <div className="flex items-center gap-1.5 text-white">
                           <Heart className="fill-white" size={18} />
                           <span className="font-bold text-sm">{item.likes > 1000 ? (item.likes / 1000).toFixed(1) + 'k' : item.likes}</span>
                         </div>
                         <p className="text-[10px] text-gray-300 font-medium">@{item.creator}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Search Results */
            <div className="space-y-8 animate-in fade-in">
              {isSearching ? (
                <div className="flex flex-col items-center justify-center py-20 space-y-4">
                  <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                  <p className="text-sm text-gray-500 animate-pulse">Searching across platforms...</p>
                </div>
              ) : (
                <>
                  {/* Creators Section */}
                  {(activeTab === "all" || activeTab === "creators") && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between px-1">
                        <h3 className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2">
                          <User size={12} /> Creators
                        </h3>
                        {activeTab === "all" && (
                          <button onClick={() => setActiveTab("creators")} className="text-[10px] font-bold text-accent hover:underline flex items-center gap-1">
                            View All <ArrowUpRight size={10} />
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {RESULTS.creators.map(creator => (
                          <div key={creator.id} className="flex items-start gap-3 p-3 rounded-xl bg-[#1E1E1E] border border-white/5 hover:border-white/10 transition-all group cursor-pointer">
                            <div className="relative">
                              <img src={creator.avatar} className="w-12 h-12 rounded-full bg-gray-800 object-cover" alt={creator.name} />
                              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-black flex items-center justify-center border border-[#1E1E1E]">
                                {(() => {
                                  const PlatformIcon = creator.platformIcon;
                                  return <PlatformIcon size={12} className="text-white w-3 h-3" />;
                                })()}
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-bold text-white truncate group-hover:text-accent transition-colors">{creator.name}</h4>
                                <button className="px-3 py-1 rounded-full bg-white/10 text-white text-[10px] font-bold hover:bg-white hover:text-black transition-colors">
                                  Follow
                                </button>
                              </div>
                              <p className="text-xs text-gray-400 truncate">{creator.handle} • {creator.followers} followers</p>
                              <p className="text-[10px] text-gray-500 mt-1 line-clamp-1">{creator.bio}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Assets Section - Grid Layout */}
                  {(activeTab === "all" || activeTab === "assets") && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between px-1">
                        <h3 className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2">
                          <Layers size={12} /> Assets
                        </h3>
                        {activeTab === "all" && (
                          <button onClick={() => setActiveTab("assets")} className="text-[10px] font-bold text-accent hover:underline flex items-center gap-1">
                            View All <ArrowUpRight size={10} />
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {RESULTS.assets.map(asset => (
                          <div key={asset.id} className="group bg-[#1E1E1E] rounded-xl border border-white/5 overflow-hidden hover:border-white/10 transition-all cursor-pointer" onClick={() => setLocation("/marketplace")}>
                            <div className="aspect-square relative overflow-hidden">
                              <img src={asset.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={asset.title} />
                              <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-white border border-white/10">
                                {asset.price}
                              </div>
                            </div>
                            <div className="p-3">
                              <h4 className="text-xs font-bold text-white truncate mb-1 group-hover:text-accent transition-colors">{asset.title}</h4>
                              <div className="flex items-center justify-between text-[10px] text-gray-500">
                                <span>{asset.type}</span>
                                <div className="flex items-center gap-1">
                                  <Sparkles size={8} className="text-yellow-500" /> {asset.rating}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Inspiration Section - Grid Layout */}
                  {(activeTab === "all" || activeTab === "inspiration") && (
                    <div className="space-y-3">
                       <div className="flex items-center justify-between px-1">
                        <h3 className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2">
                          <Sparkles size={12} /> Inspiration
                        </h3>
                        {activeTab === "all" && (
                          <button onClick={() => setActiveTab("inspiration")} className="text-[10px] font-bold text-accent hover:underline flex items-center gap-1">
                            View All <ArrowUpRight size={10} />
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-3 gap-1 rounded-xl overflow-hidden">
                        {RESULTS.inspiration.map(item => (
                          <div key={item.id} className="relative aspect-square bg-[#1E1E1E] overflow-hidden group cursor-pointer" onClick={() => setLocation("/ideas")}>
                            <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={item.title} />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center">
                              <span className="text-[10px] font-bold text-white line-clamp-2">{item.title}</span>
                              <span className="text-[9px] text-gray-300 mt-1 flex items-center gap-1"><Heart size={8} fill="currentColor" /> {item.likes}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}