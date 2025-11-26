import React, { useState } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { ArrowLeft, Rss, Plus, Globe, Trash2, RefreshCw, Check, AlertCircle, ExternalLink, Search, Newspaper, Zap, Code, Palette } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { INITIAL_FEEDS, FEED_CATEGORIES } from "@/lib/mockData";

export default function ManageFeeds() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [feeds, setFeeds] = useState(INITIAL_FEEDS);
  const [newFeedUrl, setNewFeedUrl] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleAddFeed = () => {
    if (!newFeedUrl) return;
    
    setIsAdding(true);
    // Simulate verification delay
    setTimeout(() => {
      const newFeed = {
        id: Date.now(),
        name: "New Feed Source", // In real app, fetch from XML
        url: newFeedUrl,
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

  const filteredFeeds = selectedCategory === "all" 
    ? feeds 
    : feeds.filter(f => f.category === selectedCategory);

  return (
    <Layout hideTabs>
      <div className="min-h-screen bg-background pb-8">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b border-white/5">
          <div className="flex items-center gap-4 p-4 pt-8">
            <button 
              onClick={() => setLocation("/")}
              className="p-2 -ml-2 rounded-full hover:bg-white/10 text-white transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-xl font-display font-bold text-white flex items-center gap-2">
                Content Feeds
                <Rss size={18} className="text-orange-500" />
              </h1>
              <p className="text-xs text-gray-400">Manage RSS sources for your daily briefing</p>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="px-4 pb-0 overflow-x-auto no-scrollbar flex gap-4">
            {FEED_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "text-xs font-bold capitalize pb-3 border-b-2 transition-colors whitespace-nowrap px-1",
                  selectedCategory === cat.id ? "text-white border-orange-500" : "text-gray-500 border-transparent hover:text-gray-300"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 max-w-4xl mx-auto">
          
          {/* Add New Feed Card */}
          <Card className="mb-8 p-5 bg-[#1E1E1E] border-white/10">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-orange-500/10 text-orange-500">
                <Plus size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-white mb-1">Add New Source</h3>
                <p className="text-xs text-gray-400 mb-4">Enter an RSS, Atom, or JSON feed URL to connect.</p>
                
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Globe size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <Input 
                      placeholder="https://website.com/feed.xml" 
                      className="pl-10 bg-black/20 border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-orange-500/50"
                      value={newFeedUrl}
                      onChange={(e) => setNewFeedUrl(e.target.value)}
                    />
                  </div>
                  <Button 
                    onClick={handleAddFeed} 
                    disabled={isAdding || !newFeedUrl}
                    className="bg-white text-black hover:bg-gray-200 font-bold"
                  >
                    {isAdding ? "Verifying..." : "Connect"}
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Stats Overview */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <Card className="p-4 bg-[#1E1E1E] border-white/5 flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-bold text-white mb-1">{feeds.length}</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-wider">Active Feeds</span>
            </Card>
            <Card className="p-4 bg-[#1E1E1E] border-white/5 flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-bold text-white mb-1">142</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-wider">Articles Today</span>
            </Card>
            <Card className="p-4 bg-[#1E1E1E] border-white/5 flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-bold text-green-500 mb-1">98%</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-wider">Health Score</span>
            </Card>
          </div>

          {/* Feed List */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 px-1">Connected Sources</h3>
            
            {filteredFeeds.map(feed => (
              <Card 
                key={feed.id}
                className="p-4 flex items-center justify-between group hover:border-white/10 transition-all bg-[#151515] border-white/5"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#1E1E1E] flex items-center justify-center text-gray-400 group-hover:text-white transition-colors border border-white/5">
                    <feed.icon size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-white text-sm">{feed.name}</h3>
                      <Badge variant="outline" className="text-[10px] h-5 px-1.5 border-white/10 text-gray-500 uppercase">
                        {feed.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <a href={feed.url} target="_blank" rel="noreferrer" className="text-xs text-gray-500 hover:text-accent flex items-center gap-1 truncate max-w-[200px]">
                        {feed.url} <ExternalLink size={10} />
                      </a>
                      <span className="text-[10px] text-gray-600">•</span>
                      {feed.status === "active" ? (
                        <span className="text-[10px] text-green-500 flex items-center gap-1">
                          <Check size={10} /> Synced {feed.lastSync}
                        </span>
                      ) : (
                        <span className="text-[10px] text-red-500 flex items-center gap-1">
                          <AlertCircle size={10} /> Error
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors" title="Refresh">
                    <RefreshCw size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete(feed.id)}
                    className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-500 transition-colors" 
                    title="Disconnect"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </Card>
            ))}

            {filteredFeeds.length === 0 && (
              <div className="text-center py-12 border border-dashed border-white/10 rounded-xl">
                <p className="text-gray-500 text-sm">No feeds found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
