import React, { useState } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { ArrowLeft, Search, X, TrendingUp, User, Sparkles, Layers, Clock, Instagram, Youtube, Twitter, Globe, Filter, Video, Image, Type, Mic, Smartphone, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Data
const RECENT_SEARCHES = ["Cyberpunk aesthetics", "Neon city loop", "Minimalist fonts"];
const TRENDING_TOPICS = ["#FrutigerAero", "#DarkFantasy", "#Y2K", "#Synthwave", "#Abstract3D"];

const RESULTS = {
  creators: [
    { id: 1, name: "NeonDreamer", handle: "@neondreamer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Neon", followers: "12.5k", platform: "instagram", platformIcon: Instagram, color: "#E1306C" },
    { id: 2, name: "PixelArtist", handle: "@pixelart", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pixel", followers: "8.2k", platform: "tiktok", platformIcon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" height="24" width="24">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
      </svg>
    ), color: "#FFFFFF" },
    { id: 3, name: "TechReviewer", handle: "TechDaily", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tech", followers: "450k", platform: "youtube", platformIcon: Youtube, color: "#FF0000" },
    { id: 4, name: "AI_News", handle: "@latest_ai", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AI", followers: "25k", platform: "twitter", platformIcon: Twitter, color: "#1DA1F2" },
  ],
  assets: [
    { id: 1, title: "Cyberpunk City Pack", type: "3D Model", downloads: "1.2k", image: "https://picsum.photos/seed/cybercity/100/100" },
    { id: 2, title: "Neon Glitch Overlay", type: "Video Effect", downloads: "3.5k", image: "https://picsum.photos/seed/glitch/100/100" },
  ],
  inspiration: [
    { id: 1, title: "Future Interfaces", source: "Pinterest", image: "https://picsum.photos/seed/interface/300/200" },
    { id: 2, title: "Holographic UI Design", source: "Behance", image: "https://picsum.photos/seed/holographic/300/200" },
    { id: 3, title: "Motion Graphics Showreel", source: "Vimeo", image: "https://picsum.photos/seed/motion/300/200" },
    { id: 4, title: "Typography Trends 2024", source: "Medium", image: "https://picsum.photos/seed/type/300/200" },
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

  const clearSearch = () => setQuery("");

  const togglePlatform = (id: string) => {
    setSelectedPlatform(prev => prev === id ? null : id);
  };

  const toggleFormat = (id: string) => {
    setSelectedFormat(prev => prev === id ? null : id);
  };

  return (
    <Layout hideTabs>
      <div className="min-h-screen bg-background pb-8">
        {/* Header / Search Bar */}
        <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b border-white/5">
          <div className="p-4 pt-8 flex items-center gap-3">
            <button 
              onClick={() => setLocation("/")}
              className="p-2 -ml-2 rounded-full hover:bg-white/10 text-white transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search creators, assets, trends..." 
                className="w-full bg-[#1E1E1E] border border-white/10 rounded-xl pl-10 pr-10 py-3 text-sm text-white focus:outline-none focus:border-accent/50 transition-colors placeholder:text-gray-600"
                autoFocus
              />
              {query && (
                <button 
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "p-3 rounded-xl border transition-colors",
                showFilters || selectedPlatform || selectedFormat
                  ? "bg-accent text-black border-accent shadow-[0_0_10px_rgba(124,58,237,0.3)]"
                  : "bg-[#1E1E1E] border-white/10 text-gray-400 hover:text-white hover:border-white/20"
              )}
            >
              <Filter size={20} />
            </button>
          </div>
          
          {/* Advanced Filters Panel */}
          {showFilters && (
            <div className="px-4 pb-4 animate-in slide-in-from-top-2 fade-in duration-200 border-b border-white/5 bg-[#151515]">
              <div className="space-y-4 pt-2">
                {/* Platforms */}
                <div>
                  <h3 className="text-[10px] font-bold text-gray-500 uppercase mb-2 tracking-wider">Platforms</h3>
                  <div className="flex flex-wrap gap-2">
                    {PLATFORMS.map(platform => (
                      <button
                        key={platform.id}
                        onClick={() => togglePlatform(platform.id)}
                        className={cn(
                          "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all",
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
                          "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all",
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
            <div className="flex gap-4 px-4 pb-0 overflow-x-auto no-scrollbar">
              {["all", "creators", "assets", "inspiration"].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={cn(
                    "text-xs font-bold capitalize pb-3 border-b-2 transition-colors whitespace-nowrap px-1",
                    activeTab === tab ? "text-white border-accent" : "text-gray-500 border-transparent hover:text-gray-300"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="p-6">
          {!query ? (
            /* Empty State / Discovery */
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
              {/* Recent Searches */}
              <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase mb-3 flex items-center gap-2">
                  <Clock size={12} /> Recent
                </h3>
                <div className="flex flex-wrap gap-2">
                  {RECENT_SEARCHES.map(term => (
                    <button 
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-3 py-1.5 rounded-lg bg-[#1E1E1E] border border-white/5 text-sm text-gray-300 hover:bg-white/5 hover:border-white/10 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              {/* Trending Topics */}
              <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase mb-3 flex items-center gap-2">
                  <TrendingUp size={12} /> Trending Now
                </h3>
                <div className="space-y-2">
                  {TRENDING_TOPICS.map((topic, i) => (
                    <button 
                      key={topic}
                      onClick={() => setQuery(topic)}
                      className="w-full p-3 rounded-xl bg-[#1E1E1E] border border-white/5 flex items-center justify-between hover:bg-white/5 group"
                    >
                      <span className="text-sm font-bold text-white">{topic}</span>
                      <span className="text-xs text-gray-500 group-hover:text-accent transition-colors">
                        {12 - i}k posts
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Search Results */
            <div className="space-y-6 animate-in fade-in">
              
              {/* Creators Section */}
              {(activeTab === "all" || activeTab === "creators") && (
                <div>
                  <h3 className="text-xs font-bold text-gray-500 uppercase mb-3 flex items-center gap-2">
                    <User size={12} /> Creators
                  </h3>
                  <div className="space-y-3">
                    {RESULTS.creators.map(creator => (
                      <div key={creator.id} className="flex items-center justify-between p-3 rounded-xl bg-[#1E1E1E] border border-white/5">
                        <div className="flex items-center gap-3">
                          <img src={creator.avatar} className="w-10 h-10 rounded-full bg-gray-700" alt={creator.name} />
                          <div>
                            <h4 className="text-sm font-bold text-white">{creator.name}</h4>
                            <p className="text-xs text-gray-500">{creator.handle}</p>
                          </div>
                        </div>
                        <button className="px-3 py-1 rounded-lg bg-white text-black text-xs font-bold hover:bg-gray-200">
                          Follow
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Assets Section */}
              {(activeTab === "all" || activeTab === "assets") && (
                <div>
                  <h3 className="text-xs font-bold text-gray-500 uppercase mb-3 flex items-center gap-2">
                    <Layers size={12} /> Assets
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {RESULTS.assets.map(asset => (
                      <div key={asset.id} className="rounded-xl bg-[#1E1E1E] border border-white/5 overflow-hidden group cursor-pointer" onClick={() => setLocation("/marketplace")}>
                        <div className="aspect-square relative">
                          <img src={asset.image} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt={asset.title} />
                          <div className="absolute bottom-2 right-2 text-[10px] bg-black/60 backdrop-blur px-1.5 py-0.5 rounded text-white">
                            {asset.type}
                          </div>
                        </div>
                        <div className="p-2">
                          <h4 className="text-xs font-bold text-white truncate">{asset.title}</h4>
                          <p className="text-[10px] text-gray-500">{asset.downloads} downloads</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Inspiration Section (Only show if specifically searching or active tab) */}
              {(activeTab === "all" || activeTab === "inspiration") && (
                 <div>
                   <h3 className="text-xs font-bold text-gray-500 uppercase mb-3 flex items-center gap-2">
                     <Sparkles size={12} /> Inspiration
                   </h3>
                   <div className="grid grid-cols-2 gap-3">
                     {RESULTS.inspiration.map(item => (
                       <div key={item.id} className="rounded-xl overflow-hidden relative group cursor-pointer" onClick={() => setLocation("/ideas")}>
                         <img src={item.image} className="w-full aspect-video object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt={item.title} />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-2">
                           <h4 className="text-xs font-bold text-white">{item.title}</h4>
                           <p className="text-[10px] text-gray-400">via {item.source}</p>
                         </div>
                       </div>
                     ))}
                   </div>
                 </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
