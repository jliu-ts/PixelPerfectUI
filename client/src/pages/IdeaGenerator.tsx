import React, { useState } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { GradientButton } from "@/components/GradientButton";
import { 
  ArrowLeft, 
  Rss, 
  Plus, 
  Sparkles, 
  Newspaper, 
  TrendingUp, 
  Youtube, 
  Instagram, 
  Twitter, 
  CheckCircle2,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Data
const FEEDS = [
  { id: 1, name: "TechCrunch AI", icon: "https://upload.wikimedia.org/wikipedia/commons/b/b9/TechCrunch_logo.svg", color: "#00D563" },
  { id: 2, name: "The Verge", icon: "https://upload.wikimedia.org/wikipedia/commons/a/a2/The_Verge_logo.svg", color: "#E1306C" }, // Mock color
  { id: 3, name: "Wired Culture", icon: "https://upload.wikimedia.org/wikipedia/commons/9/95/Wired_logo.svg", color: "#000000" },
];

const ARTICLES = [
  { 
    id: 101, 
    source: "TechCrunch AI", 
    title: "Generative AI models are getting smaller and faster", 
    time: "2h ago",
    summary: "New techniques allow powerful models to run on edge devices, changing the landscape of mobile AI."
  },
  { 
    id: 102, 
    source: "The Verge", 
    title: "VR Headsets are finally becoming comfortable", 
    time: "4h ago",
    summary: "The latest wave of headsets focuses on weight distribution and breathability."
  },
  { 
    id: 103, 
    source: "Wired Culture", 
    title: "Why everyone is obsessed with 'Frutiger Aero' aesthetics", 
    time: "6h ago",
    summary: "Nostalgia for the early 2000s glossy UI design is taking over TikTok."
  },
];

const GENERATED_IDEAS = {
  101: [
    { platform: "tiktok", type: "Educational", title: "AI on your phone?", prompt: "Explain edge AI using simple visual metaphors, fast paced, cyber aesthetic, 9:16 aspect ratio" },
    { platform: "twitter", type: "Opinion", title: "The end of cloud reliance?", prompt: "Write a thread about privacy benefits of local AI models" },
  ],
  103: [
    { platform: "instagram", type: "Visual", title: "Frutiger Aero Moodboard", prompt: "Glossy water droplets, tropical fish wallpaper, windows xp bliss, frutiger aero aesthetic, high resolution, 4k" },
    { platform: "tiktok", type: "Trend", title: "Then vs Now", prompt: "Split screen video comparing flat design vs frutiger aero with upbeat 2000s techno music" },
  ]
};

export default function IdeaGenerator() {
  const [, setLocation] = useLocation();
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResults, setGeneratedResults] = useState<any[] | null>(null);

  const handleGenerate = (articleId: number) => {
    if (selectedArticle === articleId && generatedResults) return;
    
    setSelectedArticle(articleId);
    setIsGenerating(true);
    setGeneratedResults(null);

    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedResults(GENERATED_IDEAS[articleId as keyof typeof GENERATED_IDEAS] || []);
    }, 1500);
  };

  const handleUseIdea = (idea: any) => {
    setLocation("/create", { 
      state: { 
        prompt: idea.prompt,
        style: idea.platform === "instagram" ? "3D Render" : "Cinematic"
      } 
    });
  };

  return (
    <Layout hideTabs>
      <div className="min-h-screen bg-background pb-8">
        
        {/* Header */}
        <div className="flex items-center gap-4 p-4 pt-8 bg-background/80 backdrop-blur-md sticky top-0 z-20 border-b border-white/5">
          <button 
            onClick={() => setLocation("/create")}
            className="p-2 -ml-2 rounded-full hover:bg-white/10 text-white transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-xl font-display font-bold text-white flex items-center gap-2">
              Content Brainstorm
              <Sparkles size={16} className="text-accent" />
            </h1>
            <p className="text-xs text-gray-400">RSS-driven inspiration</p>
          </div>
        </div>

        <div className="p-6 space-y-8">
          
          {/* Feeds Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium text-gray-400 uppercase flex items-center gap-2">
                <Rss size={14} /> Connected Feeds
              </h3>
              <button className="text-xs text-primary flex items-center gap-1 hover:underline">
                <Plus size={12} /> Add New
              </button>
            </div>
            
            <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-6 px-6 pb-2">
              {FEEDS.map((feed) => (
                <div key={feed.id} className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1E1E1E] border border-white/5 shrink-0">
                  <div className="w-4 h-4 rounded-full bg-white overflow-hidden p-0.5">
                     {/* Placeholder for logo */}
                     <div className="w-full h-full rounded-full" style={{ backgroundColor: feed.color }} />
                  </div>
                  <span className="text-sm font-medium text-white">{feed.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Articles */}
          <div>
             <h3 className="text-sm font-medium text-gray-400 uppercase mb-4 flex items-center gap-2">
                <TrendingUp size={14} /> Trending Signals
              </h3>

              <div className="space-y-4">
                {ARTICLES.map((article) => (
                  <div 
                    key={article.id} 
                    onClick={() => handleGenerate(article.id)}
                    className={cn(
                      "p-4 rounded-2xl border transition-all cursor-pointer group relative overflow-hidden",
                      selectedArticle === article.id 
                        ? "bg-[#1E1E1E] border-accent shadow-[0_0_20px_-10px_rgba(34,211,238,0.3)]" 
                        : "bg-[#121212] border-white/5 hover:bg-[#1A1A1A]"
                    )}
                  >
                    {/* Source Badge */}
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/10 text-gray-300">
                        {article.source}
                      </span>
                      <span className="text-[10px] text-gray-500">{article.time}</span>
                    </div>
                    
                    <h4 className="text-base font-bold text-white mb-1 leading-snug group-hover:text-accent transition-colors">
                      {article.title}
                    </h4>
                    <p className="text-xs text-gray-400 line-clamp-2 mb-3">
                      {article.summary}
                    </p>

                    {/* Generation State */}
                    {selectedArticle === article.id && (
                      <div className="mt-4 pt-4 border-t border-white/5 animate-in fade-in slide-in-from-top-2">
                        {isGenerating ? (
                          <div className="flex items-center justify-center py-4 gap-2 text-accent">
                            <Loader2 size={16} className="animate-spin" />
                            <span className="text-xs font-bold">Analyzing Content Strategy...</span>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <p className="text-[10px] uppercase font-bold text-gray-500 mb-2">Suggested Content Angles</p>
                            {generatedResults?.length ? generatedResults.map((idea, idx) => (
                              <button 
                                key={idx}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleUseIdea(idea);
                                }}
                                className="w-full p-3 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between hover:bg-white/5 hover:border-accent/50 transition-all group/btn text-left"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-lg bg-[#1E1E1E] flex items-center justify-center text-gray-400 group-hover/btn:text-white group-hover/btn:bg-accent/20 transition-colors">
                                    {idea.platform === 'tiktok' && <span className="text-xs font-bold">TT</span>}
                                    {idea.platform === 'instagram' && <Instagram size={14} />}
                                    {idea.platform === 'twitter' && <Twitter size={14} />}
                                  </div>
                                  <div>
                                    <p className="text-xs font-bold text-white">{idea.type}: {idea.title}</p>
                                    <p className="text-[10px] text-gray-500 line-clamp-1">Prompt: {idea.prompt}</p>
                                  </div>
                                </div>
                                <div className="w-6 h-6 rounded-full bg-gradient-accent flex items-center justify-center opacity-0 group-hover/btn:opacity-100 transition-opacity">
                                  <Sparkles size={12} className="text-black" />
                                </div>
                              </button>
                            )) : (
                               <div className="text-center py-2 text-xs text-gray-500 italic">
                                 No specific ideas generated for this demo item. Try the Frutiger Aero one!
                               </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                    
                    {selectedArticle !== article.id && (
                       <div className="flex items-center gap-1 text-xs text-accent font-medium opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-4 right-4 bg-[#1A1A1A] px-2 py-1 rounded-md shadow-lg">
                         <Sparkles size={12} /> Generate Ideas
                       </div>
                    )}
                  </div>
                ))}
              </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}
