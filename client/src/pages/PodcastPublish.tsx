import React, { useState } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { GradientButton } from "@/components/GradientButton";
import { ArrowLeft, Check, Upload, Globe, Rss, Podcast, Music, Share2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import podcastCover from "@assets/generated_images/cyberpunk_city_vertical_video_thumbnail.png"; // Reusing asset for demo

export default function PodcastPublish() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isPublishing, setIsPublishing] = useState(false);
  const [connected, setConnected] = useState<string[]>([]);

  const PLATFORMS = [
    { id: "spotify", name: "Spotify for Podcasters", icon: Music, color: "#1DB954" },
    { id: "apple", name: "Apple Podcasts", icon: Podcast, color: "#A64AC9" },
    { id: "rss", name: "RSS Feed", icon: Rss, color: "#FFA500" },
  ];

  const toggleConnect = (id: string) => {
    if (connected.includes(id)) {
      setConnected(connected.filter(c => c !== id));
    } else {
      toast({
        title: "Connecting...",
        description: "Redirecting to platform authorization",
      });
      setTimeout(() => {
        setConnected([...connected, id]);
        toast({
          title: "Connected!",
          description: "Platform ready for distribution",
        });
      }, 1000);
    }
  };

  const handlePublish = () => {
    if (connected.length === 0) {
      toast({
        title: "No platforms selected",
        description: "Please connect at least one platform.",
        variant: "destructive",
      });
      return;
    }

    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      toast({
        title: "Published Successfully! 🚀",
        description: "Your episode is live on selected platforms.",
      });
      setLocation("/");
    }, 2500);
  };

  return (
    <Layout hideTabs>
      <div className="flex flex-col min-h-screen bg-background">
        {/* Header */}
        <div className="flex items-center gap-4 p-4 border-b border-white/5 bg-background/80 backdrop-blur-md sticky top-0 z-20">
          <button onClick={() => setLocation("/podcast/studio")} className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors text-white">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-display font-bold text-white">Distribute Episode</h1>
        </div>

        <div className="flex-1 p-6 space-y-8 pb-24">
          
          {/* Episode Details */}
          <div className="flex gap-4">
            <div className="w-32 h-32 rounded-xl bg-[#1E1E1E] border border-white/10 overflow-hidden shrink-0 relative group cursor-pointer">
              <img src={podcastCover} className="w-full h-full object-cover" alt="Cover Art" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <Upload size={24} className="text-white" />
              </div>
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <label className="text-xs text-gray-500 uppercase font-bold">Episode Title</label>
                <input 
                  type="text" 
                  defaultValue="Ep 1: The Future of AI Agents" 
                  className="w-full bg-transparent border-b border-white/10 py-2 text-white font-bold text-lg focus:outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase font-bold">Description</label>
                <textarea 
                  defaultValue="In this episode, we dive deep into..." 
                  className="w-full bg-transparent border-b border-white/10 py-2 text-gray-400 text-sm focus:outline-none focus:border-accent resize-none"
                  rows={2}
                />
              </div>
            </div>
          </div>

          {/* Distribution Channels */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-400 uppercase flex items-center gap-2">
              <Globe size={14} /> Distribution Channels
            </h3>

            <div className="space-y-3">
              {PLATFORMS.map((platform) => {
                const isConnected = connected.includes(platform.id);
                
                return (
                  <div 
                    key={platform.id}
                    className={cn(
                      "flex items-center justify-between p-4 rounded-xl border transition-all",
                      isConnected
                        ? "bg-[#1E1E1E] border-white/20 shadow-lg" 
                        : "bg-[#121212] border-white/5 hover:border-white/10"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: platform.color }}
                      >
                        <platform.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm">{platform.name}</p>
                        <p className="text-xs text-gray-500">
                          {isConnected ? "Ready to publish" : "Connect to distribute"}
                        </p>
                      </div>
                    </div>

                    <button 
                      onClick={() => toggleConnect(platform.id)}
                      className={cn(
                        "px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2",
                        isConnected 
                          ? "bg-green-500/10 text-green-500 border border-green-500/20" 
                          : "bg-white text-black hover:bg-gray-200"
                      )}
                    >
                      {isConnected ? (
                        <>
                          <Check size={14} /> Connected
                        </>
                      ) : (
                        "Connect"
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Hosting Info */}
          <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-start gap-3">
            <Rss size={20} className="text-blue-400 mt-1" />
            <div>
              <h4 className="text-sm font-bold text-blue-400">RSS Feed Hosting Included</h4>
              <p className="text-xs text-gray-400 mt-1">
                We automatically generate and host your RSS feed. Use this URL to submit to other directories manually.
              </p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/5 bg-[#121212]/80 backdrop-blur-md sticky bottom-0 z-20">
          <GradientButton onClick={handlePublish} disabled={isPublishing} className="w-full py-4 text-lg">
            {isPublishing ? (
               <span className="flex items-center gap-2">
                 <Loader2 className="animate-spin" /> Publishing...
               </span>
            ) : (
               "Publish to All Platforms"
            )}
          </GradientButton>
        </div>
      </div>
    </Layout>
  );
}
