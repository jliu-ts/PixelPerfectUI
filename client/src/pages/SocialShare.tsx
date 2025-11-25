import React, { useState } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { GradientButton } from "@/components/GradientButton";
import { 
  ArrowLeft, 
  Instagram, 
  Twitter, 
  Youtube, 
  Facebook, 
  Check, 
  Link2,
  Globe,
  Share2,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import resultImage from "@assets/generated_images/cyberpunk_anime_character_for_generation_result.png";

// Mock social platforms
const PLATFORMS = [
  { id: "instagram", name: "Instagram", icon: Instagram, color: "#E1306C" },
  { id: "tiktok", name: "TikTok", icon: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" height="24" width="24">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
    </svg>
  ), color: "#000000" }, // TikTok usually black/white, handled in component
  { id: "youtube", name: "YouTube Shorts", icon: Youtube, color: "#FF0000" },
  { id: "twitter", name: "X (Twitter)", icon: Twitter, color: "#1DA1F2" },
  { id: "facebook", name: "Facebook", icon: Facebook, color: "#1877F2" },
];

export default function SocialShare() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [connected, setConnected] = useState<string[]>(["instagram"]); // Mock pre-connected
  const [selected, setSelected] = useState<string[]>(["instagram"]);
  const [isPosting, setIsPosting] = useState(false);
  const [caption, setCaption] = useState("Check out my latest AI creation! #AIart #Cyberpunk #Creative");

  const toggleConnect = (id: string) => {
    if (connected.includes(id)) {
      setConnected(connected.filter(c => c !== id));
      setSelected(selected.filter(s => s !== id));
    } else {
      // Simulate connection flow
      toast({
        title: "Connecting Account...",
        description: "Redirecting to authorization page",
      });
      setTimeout(() => {
        setConnected([...connected, id]);
        setSelected([...selected, id]);
        toast({
          title: "Connected!",
          description: `Successfully connected to ${PLATFORMS.find(p => p.id === id)?.name}`,
        });
      }, 1000);
    }
  };

  const toggleSelect = (id: string) => {
    if (!connected.includes(id)) return;
    if (selected.includes(id)) {
      setSelected(selected.filter(s => s !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handlePost = () => {
    if (selected.length === 0) {
      toast({
        title: "No platforms selected",
        description: "Please select at least one platform to post to.",
        variant: "destructive"
      });
      return;
    }

    setIsPosting(true);
    // Simulate API call
    setTimeout(() => {
      setIsPosting(false);
      toast({
        title: "Posted Successfully!",
        description: "Your content is now live on selected platforms.",
      });
      setTimeout(() => setLocation("/"), 1500);
    }, 2000);
  };

  return (
    <Layout hideTabs>
      <div className="flex flex-col min-h-screen bg-background pb-8">
        
        {/* Header */}
        <div className="flex items-center gap-4 p-4 pt-8 bg-background/80 backdrop-blur-md sticky top-0 z-20 border-b border-white/5">
          <button 
            onClick={() => setLocation("/result")}
            className="p-2 -ml-2 rounded-full hover:bg-white/10 text-white transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-display font-bold text-white">Share to Socials</h1>
        </div>

        <div className="p-6 space-y-8">
          
          {/* Content Preview */}
          <div className="flex gap-4 items-start">
            <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-800 border border-white/10 shrink-0 shadow-lg">
              <img src={resultImage} className="w-full h-full object-cover" alt="Preview" />
            </div>
            <div className="flex-1">
              <label className="text-xs font-medium text-gray-400 uppercase mb-1.5 block">Caption</label>
              <textarea 
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full bg-[#1E1E1E] border border-white/10 rounded-lg p-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-primary/50 min-h-[96px] resize-none"
              />
            </div>
          </div>

          {/* Platforms List */}
          <div>
            <h3 className="text-sm font-medium text-gray-400 uppercase mb-4 flex items-center justify-between">
              <span>Destinations</span>
              <button className="text-xs text-primary flex items-center gap-1 hover:underline">
                <Globe size={12} />
                Manage Accounts
              </button>
            </h3>

            <div className="space-y-3">
              {PLATFORMS.map((platform) => {
                const isConnected = connected.includes(platform.id);
                const isSelected = selected.includes(platform.id);

                return (
                  <div 
                    key={platform.id}
                    className={cn(
                      "flex items-center justify-between p-4 rounded-xl border transition-all",
                      isSelected 
                        ? "bg-[#1E1E1E] border-primary/50 shadow-[0_0_15px_-5px_rgba(124,58,237,0.2)]" 
                        : "bg-[#121212] border-white/5 hover:border-white/10"
                    )}
                  >
                    <div className="flex items-center gap-4 cursor-pointer flex-1" onClick={() => toggleSelect(platform.id)}>
                      <div 
                        className={cn("w-10 h-10 rounded-full flex items-center justify-center transition-colors", isSelected ? "bg-white text-black" : "bg-gray-800 text-gray-400")}
                        style={{ color: isSelected ? platform.color : undefined }}
                      >
                        <platform.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className={cn("font-medium", isSelected ? "text-white" : "text-gray-400")}>
                          {platform.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {isConnected ? "Connected" : "Not connected"}
                        </p>
                      </div>
                    </div>

                    {isConnected ? (
                      <div 
                        onClick={() => toggleSelect(platform.id)}
                        className={cn(
                          "w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all",
                          isSelected ? "bg-primary border-primary" : "border-gray-600"
                        )}
                      >
                        {isSelected && <Check size={14} className="text-white" />}
                      </div>
                    ) : (
                      <button 
                        onClick={() => toggleConnect(platform.id)}
                        className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-white border border-white/10 flex items-center gap-1.5 transition-colors"
                      >
                        <Link2 size={12} />
                        Connect
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="mt-auto p-6 border-t border-white/5 bg-[#121212]/80 backdrop-blur-md sticky bottom-0 z-20">
          <GradientButton onClick={handlePost} disabled={isPosting} className="flex items-center justify-center gap-2">
            {isPosting ? (
              <>
                <Loader2 className="animate-spin" />
                POSTING...
              </>
            ) : (
              <>
                <Share2 size={20} />
                POST TO {selected.length} PLATFORMS
              </>
            )}
          </GradientButton>
        </div>
      </div>
    </Layout>
  );
}
