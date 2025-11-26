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
  Linkedin,
  Check, 
  Link2,
  Globe,
  Share2,
  Loader2,
  ShoppingBag
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
  { id: "linkedin", name: "LinkedIn", icon: Linkedin, color: "#0077B5" },
  { id: "pinterest", name: "Pinterest", icon: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" height="24" width="24">
      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.399.165-1.497-.698-2.433-2.889-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.173 0 7.41 2.967 7.41 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.62 0 12.017 0z"/>
    </svg>
  ), color: "#BD081C" },
  { id: "threads", name: "Threads", icon: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" height="24" width="24">
      <path d="M17.75 12.04c0-3.15-2.6-5.72-5.75-5.72-3.15 0-5.72 2.57-5.72 5.72 0 3.15 2.57 5.72 5.72 5.72 1.24 0 2.4-.4 3.35-1.08v1.5c-.98.66-2.18 1.08-3.35 1.08-4.25 0-7.72-3.47-7.72-7.72S7.75 4.32 12 4.32c3.86 0 7.08 2.85 7.63 6.56.1.63.12 1.24.05 1.84-.18 1.66-1.64 2.78-3.27 2.78-1.38 0-2.54-.88-2.87-2.17h-.05c-.57 1.28-1.78 2.17-3.23 2.17-2.04 0-3.72-1.68-3.72-3.72 0-2.04 1.68-3.72 3.72-3.72 1.44 0 2.66.89 3.23 2.16h.05V9.22h1.95v4.64c0 .33.03.66.1.97.2.93 1.06 1.51 1.96 1.51.98 0 1.82-.66 1.94-1.63.06-.48.05-.97-.04-1.45-.45-3.08-3.09-5.46-6.24-5.46-3.42 0-6.22 2.8-6.22 6.22 0 3.42 2.8 6.22 6.22 6.22 1.71 0 3.26-.7 4.38-1.82l1.42 1.42c-1.48 1.48-3.53 2.4-5.8 2.4-4.53 0-8.22-3.69-8.22-8.22S7.47 2.32 12 2.32c4.53 0 8.22 3.69 8.22 8.22 0 .67-.07 1.32-.19 1.96-.2.98-.64 1.87-1.26 2.61-.62.74-1.38 1.31-2.24 1.66-.86.35-1.79.53-2.78.53-2.04 0-3.88-.78-5.25-2.04l1.35-1.48c1.03.95 2.41 1.52 3.9 1.52 1.1 0 2.11-.33 2.94-.89.83-.56 1.45-1.36 1.75-2.31.14-.42.23-.87.23-1.33V12.04zm-5.75-3.72c-1.1 0-2 1-2 2 0 1.1.9 2 2 2 1.1 0 2-.9 2-2 0-1.1-.9-2-2-2z" fillRule="evenodd"/>
    </svg>
  ), color: "#000000" },
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

          {/* Link Injection (New) */}
          <div className="p-4 rounded-xl bg-[#1E1E1E] border border-white/5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-400 uppercase flex items-center gap-2">
                <ShoppingBag size={14} />
                Affiliate Link Injection
              </h3>
              <span className="text-[10px] text-green-400 font-bold bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">
                AUTO-GENERATED
              </span>
            </div>
            <div className="flex gap-2">
               <div className="flex-1 relative">
                 <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                   <Link2 size={14} />
                 </div>
                 <input 
                   type="text" 
                   defaultValue="https://amzn.to/3G8j2xL"
                   className="w-full bg-black/20 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-primary/50"
                 />
               </div>
               <button className="px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-bold text-white border border-white/10 transition-colors">
                 Edit
               </button>
            </div>
            <p className="text-[10px] text-gray-500 mt-2 flex items-center gap-1.5">
              <Check size={10} className="text-green-500" />
              Link will be added to bio/caption automatically
            </p>
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
