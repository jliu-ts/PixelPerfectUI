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
  Loader2,
  Lightbulb,
  Filter,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Data
const FEEDS = [
  { id: 1, name: "TechCrunch AI", icon: "https://upload.wikimedia.org/wikipedia/commons/b/b9/TechCrunch_logo.svg", color: "#00D563" },
  { id: 2, name: "The Verge", icon: "https://upload.wikimedia.org/wikipedia/commons/a/a2/The_Verge_logo.svg", color: "#E1306C" }, // Mock color
  { id: 3, name: "Wired Culture", icon: "https://upload.wikimedia.org/wikipedia/commons/9/95/Wired_logo.svg", color: "#000000" },
];

const CATEGORIES = [
  { id: "all", label: "All Signals" },
  { id: "tech", label: "Tech & AI" },
  { id: "culture", label: "Pop Culture" },
  { id: "design", label: "Design" },
];

const ARTICLES = [
  { 
    id: 101, 
    source: "TechCrunch AI", 
    category: "tech",
    title: "Generative AI models are getting smaller and faster", 
    time: "2h ago",
    summary: "New techniques allow powerful models to run on edge devices, changing the landscape of mobile AI.",
    trendScore: 98
  },
  { 
    id: 102, 
    source: "The Verge", 
    category: "tech",
    title: "VR Headsets are finally becoming comfortable", 
    time: "4h ago",
    summary: "The latest wave of headsets focuses on weight distribution and breathability.",
    trendScore: 85
  },
  { 
    id: 103, 
    source: "Wired Culture", 
    category: "culture",
    title: "Why everyone is obsessed with 'Frutiger Aero' aesthetics", 
    time: "6h ago",
    summary: "Nostalgia for the early 2000s glossy UI design is taking over TikTok.",
    trendScore: 99
  },
  { 
    id: 104, 
    source: "Design Weekly", 
    category: "design",
    title: "Typography trends for 2025: Return of the Serif", 
    time: "8h ago",
    summary: "Designers are moving away from sterile sans-serifs back to character-rich typefaces.",
    trendScore: 92
  },
];

const GENERATED_IDEAS = {
  101: [
    { platform: "tiktok", type: "Explainer Video", title: "Edge AI Explained", prompt: "Fast-paced explainer video about Edge AI, cyber visuals, kinetic typography, 9:16", model: "Google Veo" },
    { platform: "linkedin", type: "Carousel", title: "The Shift to Local AI", prompt: "5-slide carousel explaining the benefits of local AI models: Privacy, Speed, Cost, Offline. Professional minimalist design.", model: "Midjourney v6" },
  ],
  103: [
    { platform: "instagram", type: "Visual", title: "Frutiger Aero Moodboard", prompt: "Glossy water droplets, tropical fish wallpaper, windows xp bliss, frutiger aero aesthetic, high resolution, 4k", model: "DALL-E 3" },
    { platform: "youtube", type: "Video Essay", title: "Nostalgia Deep Dive", prompt: "Cinematic documentary style intro about 2000s UI design, slow pan shots of old interfaces, lofi background", model: "Sora" },
    { platform: "tiktok", type: "Trend Alert", title: "Aesthetic History", prompt: "Split screen comparison of 2005 vs 2024 UI design, upbeat transition, trending audio style", model: "Runway Gen-2" },
  ]
};

export default function IdeaGenerator() {
  const [, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("all");
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
        usr: {
          prompt: idea.prompt,
          style: idea.type === "Carousel" ? "Minimalist" : "Cinematic",
          model: idea.model,
          mode: idea.type === "Carousel" ? "image" : idea.type.includes("Video") ? "video" : "image"
        }
      } 
    });
  };

  const filteredArticles = selectedCategory === "all" 
    ? ARTICLES 
    : ARTICLES.filter(a => a.category === selectedCategory);

  return (
    <Layout>
      <div className="min-h-screen bg-background pb-24 md:pb-8">
        
        {/* Hero / Header */}
        <div className="px-6 pt-8 pb-6 border-b border-white/5 bg-gradient-to-b from-[#1E1E1E] to-transparent">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-display font-bold text-white flex items-center gap-2 mb-2">
                Idea Lab
                <Sparkles size={20} className="text-accent" />
              </h1>
              <p className="text-sm text-gray-400 max-w-md">
                AI-powered content brainstorming engine. Connects to RSS feeds and social trends to generate infinite content ideas.
              </p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 rounded-xl bg-[#1E1E1E] border border-white/10 text-xs font-bold text-white hover:bg-white/5 transition-colors flex items-center gap-2">
                <Rss size={14} /> Manage Feeds
              </button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap border",
                  selectedCategory === cat.id
                    ? "bg-white text-black border-white"
                    : "bg-[#1E1E1E] text-gray-400 border-white/5 hover:text-white hover:border-white/20"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left: Trending Signals */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
               <h3 className="text-sm font-bold text-gray-400 uppercase flex items-center gap-2">
                  <TrendingUp size={16} /> Trending Signals
               </h3>
               <span className="text-xs text-accent animate-pulse">● Live Updates</span>
            </div>

            <div className="space-y-4">
              {filteredArticles.map((article) => (
                <div 
                  key={article.id} 
                  onClick={() => handleGenerate(article.id)}
                  className={cn(
                    "p-5 rounded-2xl border transition-all cursor-pointer group relative overflow-hidden hover:shadow-2xl",
                    selectedArticle === article.id 
                      ? "bg-[#1E1E1E] border-accent shadow-[0_0_30px_-10px_rgba(34,211,238,0.2)]" 
                      : "bg-[#121212] border-white/5 hover:bg-[#1A1A1A]"
                  )}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_10px_currentColor]"></span>
                      <span className="text-xs font-bold text-gray-300">{article.source}</span>
                      <span className="text-[10px] text-gray-500">• {article.time}</span>
                    </div>
                    <div className="px-2 py-1 rounded bg-white/5 text-[10px] font-bold text-gray-400 border border-white/5">
                      Trend Score: {article.trendScore}
                    </div>
                  </div>
                  
                  <h4 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-accent transition-colors">
                    {article.title}
                  </h4>
                  <p className="text-sm text-gray-400 line-clamp-2 mb-4">
                    {article.summary}
                  </p>

                  {/* Action Bar */}
                  <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-2">
                    <div className="flex gap-2">
                      <span className="px-2 py-1 rounded bg-white/5 text-[10px] text-gray-500 uppercase">#AI</span>
                      <span className="px-2 py-1 rounded bg-white/5 text-[10px] text-gray-500 uppercase">#Tech</span>
                    </div>
                    
                    <button className={cn(
                      "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                      selectedArticle === article.id 
                        ? "bg-accent text-black shadow-lg shadow-accent/20" 
                        : "bg-white/10 text-white hover:bg-white/20"
                    )}>
                      <Sparkles size={14} />
                      {selectedArticle === article.id ? "Analyzing..." : "Generate Ideas"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Generated Concepts */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-[#121212] rounded-2xl border border-white/5 p-5 min-h-[500px] flex flex-col">
                <h3 className="text-sm font-bold text-white mb-6 flex items-center gap-2 border-b border-white/5 pb-4">
                  <Lightbulb size={16} className="text-yellow-400" /> 
                  AI Concepts
                </h3>

                {!selectedArticle ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-4 opacity-50">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                      <TrendingUp size={32} className="text-gray-500" />
                    </div>
                    <p className="text-sm font-medium text-gray-400">Select a trending signal to brainstorm content angles</p>
                  </div>
                ) : (
                  <div className="flex-1">
                    {isGenerating ? (
                      <div className="flex flex-col items-center justify-center h-full gap-4 py-12">
                        <Loader2 size={32} className="text-accent animate-spin" />
                        <div className="text-center">
                          <p className="text-sm font-bold text-white">Analyzing Trends...</p>
                          <p className="text-xs text-gray-500 mt-1">Matching with viral formats</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                         <div className="flex items-center justify-between mb-2">
                           <span className="text-xs font-bold text-gray-500 uppercase">Results for Signal #{selectedArticle}</span>
                           <span className="text-[10px] text-accent bg-accent/10 px-2 py-1 rounded">
                             {generatedResults?.length || 0} Concepts
                           </span>
                         </div>

                         {generatedResults?.length ? generatedResults.map((idea, idx) => (
                            <div 
                              key={idx}
                              className="p-4 rounded-xl bg-[#1E1E1E] border border-white/10 hover:border-accent/50 transition-all group relative"
                            >
                              <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 rounded bg-black flex items-center justify-center text-white">
                                    {idea.platform === 'tiktok' && <span className="text-[8px] font-bold">TT</span>}
                                    {idea.platform === 'instagram' && <Instagram size={12} />}
                                    {idea.platform === 'youtube' && <Youtube size={12} />}
                                    {idea.platform === 'linkedin' && <span className="text-[8px] font-bold">IN</span>}
                                  </div>
                                  <span className="text-xs font-bold text-gray-300">{idea.type}</span>
                                </div>
                                <span className="text-[10px] text-gray-500 bg-black/50 px-1.5 py-0.5 rounded">{idea.model}</span>
                              </div>

                              <h5 className="text-sm font-bold text-white mb-2">{idea.title}</h5>
                              <p className="text-xs text-gray-400 mb-4 leading-relaxed">{idea.prompt}</p>

                              <button 
                                onClick={() => handleUseIdea(idea)}
                                className="w-full py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-white hover:bg-accent hover:text-black hover:border-accent transition-all flex items-center justify-center gap-2"
                              >
                                <Zap size={12} fill="currentColor" /> Create This
                              </button>
                            </div>
                         )) : (
                            <div className="text-center py-8 text-xs text-gray-500">
                              No specific concepts found. Try another signal!
                            </div>
                         )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}