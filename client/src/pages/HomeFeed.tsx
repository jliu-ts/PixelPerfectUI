import React, { useState } from "react";
import { useLocation } from "wouter";
import { Heart, Send, X } from "lucide-react";
import { Layout } from "@/components/Layout";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { FEED_ITEMS, MOCK_COMMENTS } from "@/lib/mockData";
import { FeedItem } from "@/components/feed/FeedItem";
import { StoriesRail } from "@/components/feed/StoriesRail";

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
      {/* Top Stories Rail */}
      <StoriesRail />

      {/* Feed Container - Snap Scrolling */}
      <div className="h-[100dvh] w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar bg-black">
        {FEED_ITEMS.map((item) => (
          <FeedItem 
            key={item.id}
            item={item}
            isLiked={!!likedPosts[item.id]}
            likeCount={likeCounts[item.id]}
            onToggleLike={toggleLike}
            onComment={(id) => setActiveCommentPost(id)}
            onRemix={handleRemix}
          />
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
