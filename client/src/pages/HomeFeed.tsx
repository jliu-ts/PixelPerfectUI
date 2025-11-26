import React, { useState } from "react";
import { useLocation } from "wouter";
import { Heart, MessageCircle, Share2, Repeat, Swords, Music2, Verified, Plus, Zap, Sparkles, X, Send } from "lucide-react";
import { Layout } from "@/components/Layout";
import { GradientButton } from "@/components/GradientButton";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import bgImage from "@assets/generated_images/cosmic_space_nebula_background_for_video_placeholder.png";
import cyberpunkImage from "@assets/generated_images/cyberpunk_city_vertical_video_thumbnail.png";
import natureImage from "@assets/generated_images/nature_waterfall_vertical_video_thumbnail.png";

// Mock Feed Data
const FEED_ITEMS = [
  {
    id: 1,
    username: "cosmic_dreamer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
    description: "Exploring the depths of the nebula with the new V4 model. The colors are absolutely insane! 🌌✨ #AIart #Space",
    likes: 4200,
    comments: 842,
    music: "Original Audio - cosmic_dreamer",
    image: bgImage,
    verified: true
  },
  {
    id: 2,
    username: "pixel_ninja",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ninja",
    description: "Cyberpunk cityscapes are my jam. Generated this in 4K using the new 'Neon Noir' preset. 🏙️🤖 #Cyberpunk #DigitalArt",
    likes: 12500,
    comments: 1200,
    music: "Cyber City - Neon Beats",
    image: cyberpunkImage,
    verified: false
  },
  {
    id: 3,
    username: "nature_whisperer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Annie",
    description: "Found this hidden waterfall in the latent space. 🌿💧 So peaceful. #Nature #AI #Relax",
    likes: 8900,
    comments: 560,
    music: "Forest Sounds - Nature",
    image: natureImage,
    verified: true
  }
];

// Expanded Mock Stories Data (Super App Channels)
const STORIES = [
  { id: "battle", type: "live", name: "Live Battle", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Battle" },
  { id: 1, type: "story", name: "Instagram", avatar: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png", hasNew: true },
  { id: 2, type: "story", name: "TikTok", avatar: "https://upload.wikimedia.org/wikipedia/commons/3/34/Ionicons_logo-tiktok.svg", hasNew: true },
  { id: 3, type: "story", name: "YouTube", avatar: "https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg", hasNew: false },
  { id: 4, type: "story", name: "OpenAI", avatar: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg", hasNew: true },
  { id: 5, type: "story", name: "Midjourney", avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=Midjourney", hasNew: true },
  { id: 6, type: "story", name: "Runway", avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=Runway", hasNew: false },
  { id: 7, type: "story", name: "Stable Diff", avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=Stable", hasNew: true },
  { id: 8, type: "story", name: "Pika Labs", avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=Pika", hasNew: true },
  { id: 9, type: "story", name: "ElevenLabs", avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=Eleven", hasNew: false },
  { id: 10, type: "story", name: "HuggingFace", avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=Hugging", hasNew: true },
  { id: 11, type: "story", name: "Leonardo", avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=Leonardo", hasNew: false },
];

// Mock Comments Data
const MOCK_COMMENTS = [
  { id: 1, user: "art_lover_99", text: "This is incredible! Which model did you use?", time: "2m" },
  { id: 2, user: "prompt_engineer", text: "The lighting is perfect. Mind sharing the seed?", time: "5m" },
  { id: 3, user: "cyber_punk", text: "🔥🔥🔥", time: "12m" },
  { id: 4, user: "future_vision", text: "AI art just keeps getting better.", time: "1h" },
];

export default function HomeFeed() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  // State for interactions
  const [likedPosts, setLikedPosts] = useState<Record<number, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<number, number>>(
    FEED_ITEMS.reduce((acc, item) => ({ ...acc, [item.id]: item.likes }), {})
  );
  
  // Comment Modal State
  const [activeCommentPost, setActiveCommentPost] = useState<number | null>(null);
  const [commentText, setCommentText] = useState("");
  const [postComments, setPostComments] = useState<Record<number, typeof MOCK_COMMENTS>>(
    FEED_ITEMS.reduce((acc, item) => ({ ...acc, [item.id]: [...MOCK_COMMENTS] }), {})
  );

  const handleRemix = () => {
    setLocation("/create", { 
      state: { 
        prompt: "Exploring the depths of the nebula with the new V4 model. The colors are absolutely insane! 🌌✨ #AIart #Space",
        style: "Cinematic"
      } 
    });
  };

  const toggleLike = (postId: number) => {
    const isLiked = likedPosts[postId];
    setLikedPosts(prev => ({ ...prev, [postId]: !isLiked }));
    setLikeCounts(prev => ({ 
      ...prev, 
      [postId]: isLiked ? prev[postId] - 1 : prev[postId] + 1 
    }));
    
    // Trigger haptic feedback pattern visually
    if (!isLiked) {
      // Could add animation trigger here
    }
  };

  const handlePostComment = () => {
    if (!commentText.trim() || activeCommentPost === null) return;
    
    const newComment = {
      id: Date.now(),
      user: "You",
      text: commentText,
      time: "Just now"
    };
    
    setPostComments(prev => ({
      ...prev,
      [activeCommentPost]: [newComment, ...prev[activeCommentPost]]
    }));
    
    setCommentText("");
    toast({
      title: "Comment posted",
      description: "Your thought has been shared with the community.",
    });
  };

  const formatNumber = (num: number) => {
    return num >= 1000 ? (num / 1000).toFixed(1) + 'k' : num.toString();
  };

  return (
    <Layout>
      {/* Top Stories Rail (Instagram/Snapchat Pattern) */}
      <div className="absolute top-0 left-0 right-0 z-30 pt-6 pb-8 bg-gradient-to-b from-black/90 via-black/50 to-transparent pointer-events-none">
        <div className="flex gap-4 overflow-x-auto no-scrollbar px-4 items-center pointer-events-auto">
          
          {/* Add Yours / Create */}
          <div className="flex flex-col items-center gap-1 min-w-[64px] cursor-pointer" onClick={() => setLocation("/create")}>
            <div className="w-16 h-16 rounded-full border-2 border-dashed border-white/30 flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors relative">
              <Plus size={24} className="text-white" />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center border border-black">
                <Plus size={12} className="text-white" />
              </div>
            </div>
            <span className="text-[10px] text-gray-300 font-medium">Create</span>
          </div>

          {/* Live Battle (TikTok Live Pattern) */}
          <div className="flex flex-col items-center gap-1 min-w-[64px] cursor-pointer group" onClick={() => setLocation("/battle")}>
            <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-red-500 to-purple-600 animate-pulse relative">
              <div className="w-full h-full rounded-full border-2 border-black bg-gray-900 overflow-hidden relative">
                <img src={STORIES[0].avatar} className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <Swords size={20} className="text-white" />
                </div>
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-red-500 px-2 py-0.5 rounded text-[8px] font-bold text-white uppercase tracking-wider border border-black shadow-lg">
                LIVE
              </div>
            </div>
            <span className="text-[10px] text-white font-bold">Battle</span>
          </div>

          {/* Stories (Model Updates) */}
          {STORIES.slice(1).map(story => (
            <div key={story.id} className="flex flex-col items-center gap-1 min-w-[64px] cursor-pointer group">
              <div className={cn(
                "w-16 h-16 rounded-full p-[2px] relative transition-transform group-active:scale-95",
                story.hasNew ? "bg-gradient-accent" : "bg-white/20"
              )}>
                <div className="w-full h-full rounded-full border-2 border-black bg-black overflow-hidden p-0.5">
                  <img src={story.avatar} className="w-full h-full rounded-full object-cover bg-white" />
                </div>
              </div>
              <span className="text-[10px] text-gray-300 font-medium truncate max-w-[64px]">{story.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Feed Container - Snap Scrolling */}
      <div className="h-[100dvh] w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar bg-black">
        
        {FEED_ITEMS.map((item) => (
          <div key={item.id} className="relative w-full h-[100dvh] snap-start bg-black overflow-hidden">
            {/* Background Image (Simulating Video) */}
            <img 
              src={item.image} 
              alt="Feed Content" 
              className="w-full h-full object-cover opacity-90"
            />
            
            {/* Gradient Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/90 pointer-events-none" />

            {/* CapCut Style Template Button (Innovation) */}
            <div className="absolute left-4 top-24 z-20 md:left-8">
              <button 
                onClick={handleRemix}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:bg-black/60 transition-colors"
              >
                <Sparkles size={12} className="text-yellow-400" />
                <span className="text-[10px] font-bold text-white md:text-xs">Try this Style</span>
              </button>
            </div>

            {/* Right Sidebar Actions */}
            <div className="absolute right-4 bottom-28 flex flex-col items-center gap-6 z-20 md:right-8 md:bottom-32 md:gap-8">
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-white p-0.5 mb-2 relative transition-transform hover:scale-110">
                  <img src={item.avatar} alt="User" className="w-full h-full rounded-full bg-white/20" />
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-red-500 rounded-full p-0.5 border border-black cursor-pointer hover:bg-red-600">
                    <Plus size={10} className="text-white md:w-3 md:h-3" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-1 group">
                <div 
                  onClick={() => toggleLike(item.id)}
                  className="p-2 rounded-full bg-white/10 backdrop-blur-md group-hover:bg-white/20 transition-colors cursor-pointer active:scale-90 duration-200 md:p-3"
                >
                  <Heart 
                    size={28} 
                    className={cn(
                      "transition-colors md:w-8 md:h-8",
                      likedPosts[item.id] ? "fill-red-500 text-red-500" : "text-white group-hover:text-red-500"
                    )} 
                  />
                </div>
                <span className="text-xs font-medium drop-shadow-md text-white md:text-sm">
                  {formatNumber(likeCounts[item.id])}
                </span>
              </div>

              <div className="flex flex-col items-center gap-1 group">
                 <div 
                   onClick={() => setActiveCommentPost(item.id)}
                   className="p-2 rounded-full bg-white/10 backdrop-blur-md group-hover:bg-white/20 transition-colors cursor-pointer active:scale-90 duration-200 md:p-3"
                 >
                  <MessageCircle size={28} className="text-white md:w-8 md:h-8" />
                </div>
                <span className="text-xs font-medium drop-shadow-md text-white md:text-sm">
                  {formatNumber(item.comments)}
                </span>
              </div>

              <div className="flex flex-col items-center gap-1 group">
                 <div className="p-2 rounded-full bg-white/10 backdrop-blur-md group-hover:bg-white/20 transition-colors cursor-pointer active:scale-90 duration-200 md:p-3">
                  <Share2 size={28} className="text-white md:w-8 md:h-8" />
                </div>
                <span className="text-xs font-medium drop-shadow-md text-white md:text-sm">Share</span>
              </div>
              
              <div className="flex flex-col items-center gap-1 mt-2">
                 <button 
                   onClick={handleRemix}
                   className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-tr from-purple-600 to-cyan-500 flex items-center justify-center animate-[spin_4s_linear_infinite] shadow-lg border-2 border-white/20"
                 >
                   <img src={item.avatar} className="w-6 h-6 md:w-8 md:h-8 rounded-full" />
                </button>
              </div>
            </div>

            {/* Bottom Overlay */}
            <div className="absolute bottom-20 left-4 right-16 z-20 text-left pointer-events-none md:left-8 md:right-24 md:bottom-12 flex flex-col items-start max-w-[70%] md:max-w-[60%]">
              <div className="flex items-center gap-2 mb-2 pointer-events-auto">
                <span className="font-bold text-white text-lg shadow-black drop-shadow-md flex items-center gap-1 md:text-xl">
                  @{item.username}
                  {item.verified && <Verified size={14} className="text-blue-400 md:w-5 md:h-5" />}
                </span>
              </div>
              <p className="text-white/90 text-sm leading-relaxed line-clamp-3 mb-3 drop-shadow-md pointer-events-auto md:text-base">
                {item.description}
              </p>
              
              <div className="flex items-center gap-2 text-white/80 text-xs font-medium mb-4 md:text-sm bg-black/20 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/5 pointer-events-auto">
                 <Music2 size={12} className="md:w-4 md:h-4" />
                 <div className="overflow-hidden w-32 md:w-48">
                   <p className="whitespace-nowrap animate-marquee">{item.music}</p>
                 </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Comments Sheet / Modal */}
      <Dialog open={activeCommentPost !== null} onOpenChange={(open) => !open && setActiveCommentPost(null)}>
        <DialogContent className="bg-[#1E1E1E] border-t border-white/10 text-white w-full max-w-md h-[70vh] fixed bottom-0 top-auto left-1/2 -translate-x-1/2 translate-y-0 rounded-t-3xl p-0 gap-0 shadow-2xl overflow-hidden md:rounded-2xl md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:h-[600px]">
          <div className="p-4 border-b border-white/10 flex items-center justify-between sticky top-0 bg-[#1E1E1E] z-10">
            <h3 className="font-bold text-center flex-1">Comments ({formatNumber(activeCommentPost ? likeCounts[activeCommentPost] : 0)})</h3>
            <button onClick={() => setActiveCommentPost(null)} className="absolute right-4 text-gray-400 hover:text-white">
              <X size={20} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar pb-20">
            {activeCommentPost && postComments[activeCommentPost]?.map((comment) => (
              <div key={comment.id} className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.user}`} className="w-full h-full rounded-full" />
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs font-bold text-gray-300">{comment.user}</span>
                    <span className="text-[10px] text-gray-500">{comment.time}</span>
                  </div>
                  <p className="text-sm text-white leading-snug mt-0.5">{comment.text}</p>
                </div>
                <button className="text-gray-500 hover:text-red-500">
                  <Heart size={14} />
                </button>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-white/10 bg-[#1E1E1E] absolute bottom-0 w-full">
            <div className="flex items-center gap-2 bg-black/30 rounded-full px-4 py-2 border border-white/10 focus-within:border-white/30 transition-colors">
              <input 
                type="text" 
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handlePostComment()}
                placeholder="Add a comment..."
                className="flex-1 bg-transparent text-sm text-white placeholder:text-gray-500 focus:outline-none"
              />
              <button 
                onClick={handlePostComment}
                disabled={!commentText.trim()}
                className="text-blue-500 disabled:opacity-50 hover:text-blue-400 font-bold"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
