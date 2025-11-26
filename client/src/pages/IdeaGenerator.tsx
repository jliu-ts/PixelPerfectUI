import React, { useState } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { 
  ArrowLeft, 
  Rss, 
  Sparkles, 
  TrendingUp, 
  Youtube, 
  Instagram, 
  Twitter, 
  Loader2,
  Lightbulb,
  Zap,
  ArrowRight,
  RefreshCw,
  Bot,
  Share2,
  Flame
} from "lucide-react";
import { cn } from "@/lib/utils";

// Enhanced Mock Data for a Richer Experience
const CATEGORIES = [
  { id: "all", label: "All Signals" },
  { id: "tech", label: "Tech & AI" },
  { id: "culture", label: "Pop Culture" },
  { id: "design", label: "Design" },
  { id: "finance", label: "Crypto & Finance" },
];

const ARTICLES = [
  { 
    id: 101, 
    source: "TechCrunch", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b9/TechCrunch_logo.svg",
    category: "tech",
    title: "Generative AI models are shrinking to run on your phone", 
    time: "2h ago",
    summary: "New quantization techniques allow powerful LLMs to run locally on edge devices, changing the landscape of mobile AI privacy and speed.",
    trendScore: 98,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60",
    tags: ["#AI", "#Mobile", "#Tech"]
  },
  { 
    id: 102, 
    source: "The Verge", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a2/The_Verge_logo.svg",
    category: "tech",
    title: "VR Headsets are finally becoming comfortable enough for work", 
    time: "4h ago",
    summary: "The latest wave of headsets focuses on weight distribution and breathability, making spatial computing viable for 8-hour shifts.",
    trendScore: 85,
    image: "https://images.unsplash.com/photo-1622979135225-d2ba269fb1a2?w=800&auto=format&fit=crop&q=60",
    tags: ["#VR", "#FutureOfWork"]
  },
  { 
    id: 103, 
    source: "Wired", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Wired_logo.svg",
    category: "culture",
    title: "Why everyone is obsessed with 'Frutiger Aero' aesthetics", 
    time: "6h ago",
    summary: "Nostalgia for the early 2000s glossy UI design is taking over TikTok, rejecting the flat design era of the last decade.",
    trendScore: 99,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60",
    tags: ["#Aesthetic", "#Nostalgia"]
  },
  { 
    id: 104, 
    source: "CoinDesk", 
    logo: null,
    category: "finance",
    title: "Bitcoin hits new ATH as institutional adoption surges", 
    time: "1h ago",
    summary: "Major ETFs and sovereign wealth funds are allocating significant capital to digital assets this quarter.",
    trendScore: 94,
    image: "https://images.unsplash.com/photo-1518546305927-5a455dee42a8?w=800&auto=format&fit=crop&q=60",
    tags: ["#Crypto", "#Finance"]
  },
];

const GENERATED_IDEAS = {
  101: [
    { platform: "tiktok", type: "Explainer", title: "Your Phone is the New Server", prompt: "Fast-paced tech explainer video about Edge AI, cyber visuals, kinetic typography, 9:16 vertical format", model: "Google Veo" },
    { platform: "linkedin", type: "Carousel", title: "The Shift to Local AI", prompt: "5-slide carousel explaining benefits: Privacy, Speed, Cost. Professional minimalist design.", model: "Midjourney v6" },
    { platform: "twitter", type: "Thread", title: "Why Cloud AI is Dead", prompt: "Controversial hook about the end of cloud dependency, 5 tweet thread structure", model: "GPT-4" },
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

    // Simulate AI generation with random delay for realism
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedResults(GENERATED_IDEAS[articleId as keyof typeof GENERATED_IDEAS] || []);
    }, 1800);
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
    <Layout hideTabs>
      <div className="min-h-screen bg-background flex flex-col">
        
        {/* Standard Sticky Header */}
        <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-white/5 p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setLocation("/")}
              className="p-2 -ml-2 rounded-full hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
              Idea Lab
              <Sparkles size={16} className="text-accent" />
            </h1>
          </div>
          <button 
            onClick={() => setLocation("/feeds")}
            className="px-4 py-2 rounded-xl bg-[#1E1E1E] border border-white/10 text-xs font-bold text-white hover:bg-white/5 transition-colors flex items-center gap-2"
          >
            <Rss size={14} /> Manage Feeds
          </button>
        </div>

        <div className="flex-1 flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
          
          {/* Left Panel: Trending Signals (Scrollable) */}
          <div className="flex-1 flex flex-col border-r border-white/5 bg-[#0A0A0A] overflow-hidden relative">
            
            {/* Sub-header: Categories */}
            <div className="p-4 border-b border-white/5 bg-background/50 backdrop-blur-sm z-10">
              <div className="flex gap-2 overflow-x-auto no-scrollbar">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={cn(
                      "px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap border flex items-center gap-2",
                      selectedCategory === cat.id
                        ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                        : "bg-[#1E1E1E] text-gray-400 border-white/5 hover:text-white hover:border-white/20"
                    )}
                  >
                    {cat.id === "all" && <TrendingUp size={12} />}
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Articles List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24 md:pb-4">
              <div className="flex items-center justify-between px-2 mb-2">
                 <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                    <Flame size={14} className="text-orange-500" fill="currentColor" /> Viral Signals
                 </h3>
                 <span className="text-[10px] text-accent bg-accent/10 px-2 py-0.5 rounded-full border border-accent/20 animate-pulse">
                   Live Updates
                 </span>
              </div>

              {filteredArticles.map((article) => (
                <div 
                  key={article.id} 
                  onClick={() => handleGenerate(article.id)}
                  className={cn(
                    "group relative rounded-2xl border overflow-hidden transition-all cursor-pointer",
                    selectedArticle === article.id 
                      ? "bg-[#1E1E1E] border-accent shadow-[0_0_30px_-10px_rgba(34,211,238,0.15)] ring-1 ring-accent/50" 
                      : "bg-[#121212] border-white/5 hover:bg-[#1A1A1A] hover:border-white/10"
                  )}
                >
                  {/* Background Image Overlay (Subtle) */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                    <img src={article.image} className="w-full h-full object-cover grayscale" />
                  </div>

                  <div className="p-5 relative z-10">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2.5">
                        {article.logo ? (
                          <img src={article.logo} className="h-4 w-auto opacity-80" alt={article.source} />
                        ) : (
                          <span className="text-xs font-bold text-gray-300">{article.source}</span>
                        )}
                        <span className="text-[10px] text-gray-500 border-l border-white/10 pl-2.5">{article.time}</span>
                      </div>
                      <div className={cn(
                        "px-2 py-1 rounded text-[10px] font-bold border flex items-center gap-1",
                        article.trendScore > 90 
                          ? "bg-green-500/10 text-green-400 border-green-500/20" 
                          : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                      )}>
                        <TrendingUp size={10} /> Score: {article.trendScore}
                      </div>
                    </div>
                    
                    <h4 className="text-base md:text-lg font-bold text-white mb-2 leading-snug group-hover:text-accent transition-colors pr-8">
                      {article.title}
                    </h4>
                    <p className="text-sm text-gray-400 line-clamp-2 mb-4 leading-relaxed">
                      {article.summary}
                    </p>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex gap-2">
                        {article.tags.map(tag => (
                          <span key={tag} className="text-[10px] text-gray-500 font-medium">{tag}</span>
                        ))}
                      </div>
                      
                      <button className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all",
                        selectedArticle === article.id 
                          ? "bg-accent text-black shadow-lg shadow-accent/20 scale-105" 
                          : "bg-white/5 text-white group-hover:bg-white/10"
                      )}>
                        {selectedArticle === article.id ? (
                          <>
                            <RefreshCw size={14} className="animate-spin" /> Analyzing
                          </>
                        ) : (
                          <>
                            <Sparkles size={14} /> Brainstorm
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  
                  {/* Active Indicator Bar */}
                  {selectedArticle === article.id && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent shadow-[0_0_10px_#22d3ee]" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel: AI Brainstorming Canvas */}
          <div className={cn(
            "fixed inset-0 z-40 bg-background md:static md:z-auto md:w-[450px] xl:w-[500px] border-l border-white/5 flex flex-col transition-transform duration-300 ease-in-out",
            selectedArticle ? "translate-y-0" : "translate-y-full md:translate-y-0"
          )}>
            {/* Mobile Close Handle */}
            <div className="md:hidden flex justify-center pt-2 pb-1" onClick={() => setSelectedArticle(null)}>
               <div className="w-12 h-1.5 rounded-full bg-gray-800" />
            </div>

            <div className="flex-1 flex flex-col bg-[#121212] md:bg-transparent">
              <div className="p-6 border-b border-white/5 bg-[#121212]">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Bot size={18} className="text-accent" /> 
                  AI Strategy Engine
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Generating cross-platform content angles based on viral formats.
                </p>
              </div>

              <div className="flex-1 overflow-y-auto p-6 relative">
                {!selectedArticle ? (
                   <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 opacity-40">
                     <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center mb-6 shadow-inner border border-white/5">
                       <Lightbulb size={32} className="text-gray-500" />
                     </div>
                     <h4 className="text-lg font-bold text-white mb-2">Ready to Ideate</h4>
                     <p className="text-sm text-gray-400 max-w-[240px]">
                       Select a trending signal from the feed to generate tailored content concepts.
                     </p>
                   </div>
                ) : isGenerating ? (
                   <div className="flex flex-col items-center justify-center h-full gap-6">
                     <div className="relative">
                       <div className="w-16 h-16 border-4 border-white/5 border-t-accent rounded-full animate-spin" />
                       <div className="absolute inset-0 flex items-center justify-center">
                         <Bot size={24} className="text-white" />
                       </div>
                     </div>
                     <div className="text-center space-y-2">
                       <p className="text-sm font-bold text-white animate-pulse">Analyzing Trend Velocity...</p>
                       <div className="flex gap-1 justify-center">
                         <span className="w-1.5 h-1.5 rounded-full bg-gray-600 animate-bounce" style={{ animationDelay: "0ms" }} />
                         <span className="w-1.5 h-1.5 rounded-full bg-gray-600 animate-bounce" style={{ animationDelay: "150ms" }} />
                         <span className="w-1.5 h-1.5 rounded-full bg-gray-600 animate-bounce" style={{ animationDelay: "300ms" }} />
                       </div>
                       <p className="text-xs text-gray-500">Matching with 50+ viral templates</p>
                     </div>
                   </div>
                ) : (
                   <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-500">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Generated Concepts</span>
                        <button 
                          onClick={() => handleGenerate(selectedArticle!)}
                          className="text-[10px] flex items-center gap-1 text-accent hover:underline"
                        >
                          <RefreshCw size={10} /> Regenerate
                        </button>
                      </div>

                      {generatedResults?.map((idea, idx) => (
                        <div 
                          key={idx}
                          className="bg-[#1E1E1E] rounded-xl border border-white/10 p-1 overflow-hidden group hover:border-accent/40 transition-all hover:shadow-xl"
                        >
                          {/* Platform Header */}
                          <div className="px-4 py-3 flex items-center justify-between border-b border-white/5 bg-white/5">
                             <div className="flex items-center gap-2">
                               <div className="w-6 h-6 rounded bg-black flex items-center justify-center text-white shrink-0">
                                 {idea.platform === 'tiktok' && <span className="text-[8px] font-bold">TT</span>}
                                 {idea.platform === 'instagram' && <Instagram size={12} />}
                                 {idea.platform === 'youtube' && <Youtube size={12} />}
                                 {idea.platform === 'linkedin' && <span className="text-[8px] font-bold">IN</span>}
                                 {idea.platform === 'twitter' && <Twitter size={12} />}
                               </div>
                               <span className="text-xs font-bold text-white">{idea.type}</span>
                             </div>
                             <span className="text-[9px] font-medium text-gray-400 px-2 py-0.5 rounded bg-black/40 border border-white/5">
                               {idea.model}
                             </span>
                          </div>

                          {/* Content Body */}
                          <div className="p-4">
                             <h5 className="text-sm font-bold text-white mb-2 leading-tight">{idea.title}</h5>
                             <p className="text-xs text-gray-400 mb-4 leading-relaxed border-l-2 border-white/10 pl-3 py-1 italic">
                               "{idea.prompt}"
                             </p>
                             
                             <div className="flex gap-2 mt-2">
                               <button 
                                 onClick={() => handleUseIdea(idea)}
                                 className="flex-1 py-2.5 rounded-lg bg-white text-black text-xs font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                               >
                                 <Zap size={14} fill="currentColor" /> Create
                               </button>
                               <button className="px-3 rounded-lg border border-white/10 hover:bg-white/5 text-white transition-colors">
                                 <Share2 size={14} />
                               </button>
                             </div>
                          </div>
                        </div>
                      ))}
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