import React, { useState } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { 
  ArrowLeft, 
  Rss, 
  Plus, 
  Globe, 
  Trash2, 
  RefreshCw, 
  Check, 
  AlertCircle, 
  ExternalLink, 
  Search, 
  Newspaper, 
  Zap, 
  Code, 
  Palette,
  MoreHorizontal,
  LayoutGrid,
  List,
  Filter,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { INITIAL_FEEDS, FEED_CATEGORIES, type Feed } from "@/lib/mockData";

// Enhanced mock data for suggestions
const SUGGESTED_FEEDS = [
  { name: "Hacker News", url: "https://news.ycombinator.com/rss", category: "tech", icon: Code },
  { name: "Smashing Magazine", url: "https://www.smashingmagazine.com/feed", category: "design", icon: Palette },
  { name: "Wired Top Stories", url: "https://www.wired.com/feed/rss", category: "news", icon: Zap },
];

export default function ManageFeeds() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [feeds, setFeeds] = useState(INITIAL_FEEDS);
  const [newFeedUrl, setNewFeedUrl] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddFeed = (url?: string) => {
    const targetUrl = url || newFeedUrl;
    if (!targetUrl) return;
    
    setIsAdding(true);
    // Simulate verification delay
    setTimeout(() => {
      const newFeed: Feed = {
        id: Date.now(),
        name: "New Feed Source", // In real app, fetch from XML
        url: targetUrl,
        category: "tech", // Default for now
        status: "active",
        lastSync: "Just now",
        icon: Rss
      };
      
      setFeeds([newFeed, ...feeds]);
      setNewFeedUrl("");
      setIsAdding(false);
      toast({
        title: "Feed Connected",
        description: "Successfully added new RSS source.",
      });
    }, 1500);
  };

  const handleDelete = (id: number) => {
    setFeeds(feeds.filter(f => f.id !== id));
    toast({
      title: "Feed Removed",
      description: "Source has been disconnected.",
      variant: "destructive"
    });
  };

  const filteredFeeds = feeds.filter(f => {
    const matchesCategory = selectedCategory === "all" || f.category === selectedCategory;
    const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          f.url.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Layout hideTabs>
      <div className="min-h-screen bg-background pb-24 md:pb-8">
        
        {/* Sticky Header */}
        <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-white/5">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setLocation("/")}
                className="p-2 -ml-2 rounded-full hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
                  My Feeds
                  <Rss size={16} className="text-orange-500" />
                </h1>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="relative hidden md:block">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input 
                  type="text" 
                  placeholder="Search feeds..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-9 w-48 rounded-xl bg-[#1E1E1E] border border-white/10 pl-9 pr-3 text-xs text-white focus:outline-none focus:border-orange-500/50 transition-all"
                />
              </div>
              <div className="flex bg-[#1E1E1E] rounded-lg p-1 border border-white/10">
                <button 
                  onClick={() => setViewMode("list")}
                  className={cn(
                    "p-1.5 rounded-md transition-all",
                    viewMode === "list" ? "bg-white/10 text-white shadow-sm" : "text-gray-500 hover:text-gray-300"
                  )}
                >
                  <List size={14} />
                </button>
                <button 
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "p-1.5 rounded-md transition-all",
                    viewMode === "grid" ? "bg-white/10 text-white shadow-sm" : "text-gray-500 hover:text-gray-300"
                  )}
                >
                  <LayoutGrid size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Category Pills */}
          <div className="px-4 pb-4 overflow-x-auto no-scrollbar flex gap-2">
            {FEED_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap border flex items-center gap-2",
                  selectedCategory === cat.id
                    ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                    : "bg-[#1E1E1E] text-gray-400 border-white/5 hover:text-white hover:border-white/20"
                )}
              >
                {cat.id === "all" && <Filter size={12} />}
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-8">
          
          {/* Add New Feed Section */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
               {/* Add Card */}
               <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1E1E1E] to-[#151515] border border-white/10 p-1">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-[60px] rounded-full pointer-events-none" />
                 
                 <div className="p-5">
                   <div className="flex items-center gap-3 mb-4">
                     <div className="p-2 rounded-lg bg-orange-500/20 text-orange-500">
                       <Plus size={18} />
                     </div>
                     <div>
                       <h3 className="text-sm font-bold text-white">Connect New Source</h3>
                       <p className="text-xs text-gray-400">Add any RSS, Atom, or JSON feed URL</p>
                     </div>
                   </div>
                   
                   <div className="flex gap-2">
                     <div className="relative flex-1 group">
                       <Globe size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-orange-500 transition-colors" />
                       <input 
                         placeholder="https://website.com/feed.xml" 
                         className="w-full h-10 pl-9 pr-3 rounded-xl bg-black/40 border border-white/10 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-orange-500/50 transition-all"
                         value={newFeedUrl}
                         onChange={(e) => setNewFeedUrl(e.target.value)}
                       />
                     </div>
                     <Button 
                       onClick={() => handleAddFeed()} 
                       disabled={isAdding || !newFeedUrl}
                       className="bg-white text-black hover:bg-gray-200 font-bold rounded-xl h-10 px-6"
                     >
                       {isAdding ? <RefreshCw size={16} className="animate-spin" /> : "Connect"}
                     </Button>
                   </div>
                 </div>
               </div>

               {/* Stats Overview */}
               <div className="grid grid-cols-3 gap-3">
                 <div className="p-4 rounded-2xl bg-[#1E1E1E] border border-white/5 flex flex-col items-center justify-center text-center group hover:border-white/10 transition-colors">
                   <span className="text-2xl font-display font-bold text-white mb-1 group-hover:scale-110 transition-transform">{feeds.length}</span>
                   <span className="text-[10px] text-gray-500 uppercase tracking-wider">Active Feeds</span>
                 </div>
                 <div className="p-4 rounded-2xl bg-[#1E1E1E] border border-white/5 flex flex-col items-center justify-center text-center group hover:border-white/10 transition-colors">
                   <span className="text-2xl font-display font-bold text-white mb-1 group-hover:scale-110 transition-transform">142</span>
                   <span className="text-[10px] text-gray-500 uppercase tracking-wider">Articles Today</span>
                 </div>
                 <div className="p-4 rounded-2xl bg-[#1E1E1E] border border-white/5 flex flex-col items-center justify-center text-center group hover:border-white/10 transition-colors">
                   <span className="text-2xl font-display font-bold text-green-400 mb-1 group-hover:scale-110 transition-transform">98%</span>
                   <span className="text-[10px] text-gray-500 uppercase tracking-wider">Health Score</span>
                 </div>
               </div>

               {/* Feed List */}
               <div className="space-y-4">
                 <div className="flex items-center justify-between px-1">
                   <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                     <Check size={12} className="text-green-500" /> Connected Sources
                   </h3>
                   <span className="text-[10px] text-gray-600">Last synced 2 mins ago</span>
                 </div>
                 
                 <div className={cn(
                   "grid gap-3",
                   viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"
                 )}>
                   {filteredFeeds.map((feed, idx) => (
                     <div 
                       key={feed.id}
                       className={cn(
                         "group relative bg-[#151515] border border-white/5 hover:border-white/10 rounded-xl transition-all hover:bg-[#1A1A1A] animate-in fade-in slide-in-from-bottom-2",
                         viewMode === "list" ? "p-4 flex items-center justify-between" : "p-5 flex flex-col"
                       )}
                       style={{ animationDelay: `${idx * 50}ms` }}
                     >
                       <div className={cn("flex items-center gap-4", viewMode === "grid" && "mb-4")}>
                         <div className="w-10 h-10 rounded-xl bg-[#1E1E1E] flex items-center justify-center text-gray-400 group-hover:text-white group-hover:scale-110 transition-all border border-white/5 shrink-0">
                           <feed.icon size={20} />
                         </div>
                         <div className="min-w-0">
                           <div className="flex items-center gap-2">
                             <h3 className="font-bold text-white text-sm truncate">{feed.name}</h3>
                             {viewMode === "list" && (
                               <Badge variant="outline" className="text-[9px] h-4 px-1 border-white/10 text-gray-500 uppercase">
                                 {feed.category}
                               </Badge>
                             )}
                           </div>
                           <div className="flex items-center gap-2 mt-1">
                             <a href={feed.url} target="_blank" rel="noreferrer" className="text-xs text-gray-500 hover:text-orange-400 flex items-center gap-1 truncate max-w-[150px] transition-colors">
                               <Globe size={10} /> {new URL(feed.url).hostname}
                             </a>
                           </div>
                         </div>
                       </div>

                       {viewMode === "grid" && (
                         <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                           <Badge variant="outline" className="text-[9px] h-5 px-1.5 border-white/10 text-gray-500 uppercase bg-black/20">
                             {feed.category}
                           </Badge>
                           <div className="flex items-center gap-1">
                             {feed.status === "active" ? (
                               <span className="w-1.5 h-1.5 rounded-full bg-green-500" title="Active" />
                             ) : (
                               <span className="w-1.5 h-1.5 rounded-full bg-red-500" title="Error" />
                             )}
                           </div>
                         </div>
                       )}

                       <div className={cn(
                         "flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity",
                         viewMode === "grid" && "absolute top-2 right-2 opacity-100 md:opacity-0"
                       )}>
                         <button className="p-2 rounded-lg hover:bg-white/10 text-gray-500 hover:text-white transition-colors" title="Refresh">
                           <RefreshCw size={14} />
                         </button>
                         <button 
                           onClick={() => handleDelete(feed.id)}
                           className="p-2 rounded-lg hover:bg-red-500/10 text-gray-500 hover:text-red-500 transition-colors" 
                           title="Disconnect"
                         >
                           <Trash2 size={14} />
                         </button>
                       </div>
                     </div>
                   ))}

                   {filteredFeeds.length === 0 && (
                     <div className="col-span-full text-center py-16 border border-dashed border-white/10 rounded-2xl bg-white/5">
                       <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3 text-gray-500">
                         <Search size={20} />
                       </div>
                       <p className="text-gray-400 text-sm font-medium">No feeds found</p>
                       <p className="text-gray-600 text-xs mt-1">Try adjusting your filters or search query</p>
                     </div>
                   )}
                 </div>
               </div>
            </div>

            {/* Sidebar: Suggestions */}
            <div className="space-y-6">
              <div className="bg-[#1E1E1E] rounded-2xl border border-white/5 p-5 sticky top-24">
                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                  <Sparkles size={14} className="text-yellow-400" /> Suggested
                </h3>
                
                <div className="space-y-3">
                  {SUGGESTED_FEEDS.map((suggestion, i) => (
                    <div key={i} className="p-3 rounded-xl bg-black/20 border border-white/5 hover:border-white/10 transition-colors group">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded-lg bg-white/5 text-gray-400">
                            <suggestion.icon size={14} />
                          </div>
                          <span className="text-xs font-bold text-gray-200">{suggestion.name}</span>
                        </div>
                        <button 
                          onClick={() => handleAddFeed(suggestion.url)}
                          className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <p className="text-[10px] text-gray-500 truncate pl-1">{suggestion.url}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-white/5">
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Import</h3>
                  <button className="w-full py-2 rounded-xl border border-dashed border-white/20 text-xs font-medium text-gray-400 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                     <Code size={12} /> Upload OPML
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
}