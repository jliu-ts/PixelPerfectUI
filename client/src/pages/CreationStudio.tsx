import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { GradientButton } from "@/components/GradientButton";
import { Image as ImageIcon, Film, Type, Sparkles, Camera as CameraIcon, Lightbulb, ChevronDown, Layers, Palette, BrainCircuit, ShoppingBag, User, Users, Store, Bot, Mic, Rocket, Library, Wand2, Save, History, X, Monitor, Smartphone, RectangleHorizontal, RectangleVertical, Square, Plus, BookOpen, MoreHorizontal, Maximize2, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { MOCK_PROMPTS, MOCK_ARTICLES } from "@/lib/mockData";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Newspaper, FileText, Link as LinkIcon } from "lucide-react";

// Stock Images for Styles
import cinematicImg from '@assets/stock_images/cinematic_movie_scen_822514bc.jpg';
import oilPaintingImg from '@assets/stock_images/classic_oil_painting_28485a67.jpg';
import ghibliImg from '@assets/stock_images/anime_fantasy_landsc_a6de3658.jpg';
import polaroidImg from '@assets/stock_images/vintage_polaroid_pho_adc9f752.jpg';
import vaporwaveImg from '@assets/stock_images/vaporwave_aesthetic__fe2a5089.jpg';
import minimalistImg from '@assets/stock_images/minimalist_design_cl_951de8ce.jpg';
import animeImg from '@assets/stock_images/anime_character_acti_3ec23b6b.jpg';
import render3dImg from '@assets/stock_images/3d_render_abstract_s_bdea587d.jpg';
import cyberpunkImg from '@assets/stock_images/cyberpunk_city_neon__75c69652.jpg';

const STYLES = [
  { id: "Anime", label: "Anime", image: animeImg },
  { id: "Cinematic", label: "Cinematic", image: cinematicImg },
  { id: "3D Render", label: "3D Render", image: render3dImg },
  { id: "Oil Painting", label: "Oil Painting", image: oilPaintingImg },
  { id: "Cyberpunk", label: "Cyberpunk", image: cyberpunkImg },
  { id: "Studio Ghibli", label: "Studio Ghibli", image: ghibliImg },
  { id: "Polaroid", label: "Polaroid", image: polaroidImg },
  { id: "Vaporwave", label: "Vaporwave", image: vaporwaveImg },
  { id: "Minimalist", label: "Minimalist", image: minimalistImg }
];

// Group prompts by category for the quick selector
const GROUPED_PROMPTS = MOCK_PROMPTS.reduce((acc, prompt) => {
  const existingCategory = acc.find(c => c.category === prompt.category);
  if (existingCategory) {
    existingCategory.items.push(prompt);
  } else {
    acc.push({ category: prompt.category, items: [prompt] });
  }
  return acc;
}, [] as { category: string, items: typeof MOCK_PROMPTS }[]);

const VIDEO_MODELS = ["Google Veo", "Sora", "Runway Gen-2", "Pika 1.0", "HeyGen Avatar"];
const IMAGE_MODELS = ["Midjourney v6", "DALL-E 3", "Stable Diffusion XL", "Adobe Firefly"];

const AVATARS = [
  { id: "hg_1", name: "Studio Felix", type: "Instant", optimizedFor: ["16:9", "1:1"] },
  { id: "hg_2", name: "Casual Felix", type: "Photo", optimizedFor: ["9:16", "4:5"] },
  { id: "hg_3", name: "Presenter Felix", type: "Studio", optimizedFor: ["16:9"] },
];

const ASPECT_RATIOS = [
  { id: "1:1", label: "Square", icon: Square, desc: "Instagram Post" },
  { id: "16:9", label: "Landscape", icon: RectangleHorizontal, desc: "YouTube" },
  { id: "9:16", label: "Portrait", icon: RectangleVertical, desc: "TikTok / Reels" },
  { id: "4:5", label: "Vertical", icon: RectangleVertical, desc: "IG Portrait" },
];

const MOCK_HISTORY = [
  "A futuristic city with flying cars and neon lights",
  "Portrait of a cat wearing a spacesuit",
  "Marketing copy for a new coffee brand"
];

export default function CreationStudio() {
  const [location, setLocation] = useLocation();
  const locationState = window.history.state?.usr;
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState<"text" | "image" | "video" | "audio">((locationState?.mode as any) || "image");
  const [selectedStyle, setSelectedStyle] = useState(locationState?.style || "Cinematic");
  const [selectedRatio, setSelectedRatio] = useState("1:1");
  const [prompt, setPrompt] = useState(locationState?.prompt || "");
  const [selectedModel, setSelectedModel] = useState(locationState?.model || (activeTab === "video" ? VIDEO_MODELS[0] : IMAGE_MODELS[0]));
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [isCarouselMode, setIsCarouselMode] = useState(locationState?.prompt?.includes("carousel") || false);
  const [showHistory, setShowHistory] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [inputMode, setInputMode] = useState<"prompt" | "rss">("prompt");
  const [isExpanded, setIsExpanded] = useState(false);

  // Update default model when tab changes if not manually set from idea
  useEffect(() => {
    if (!locationState?.model) {
      setSelectedModel(activeTab === "video" ? VIDEO_MODELS[0] : IMAGE_MODELS[0]);
    }
  }, [activeTab]);

  // Effect to handle incoming state updates (like from Library)
  useEffect(() => {
    if (locationState?.mode) setActiveTab(locationState.mode);
    if (locationState?.prompt) setPrompt(locationState.prompt);
    if (locationState?.style) setSelectedStyle(locationState.style);
  }, [locationState]);

  const currentModels = activeTab === "video" ? VIDEO_MODELS : IMAGE_MODELS;

  const handleEnhance = () => {
    if (!prompt) return;
    setIsEnhancing(true);
    // Mock AI enhancement
    setTimeout(() => {
      setPrompt((prev: string) => prev + ", highly detailed, 8k resolution, professional lighting, trending on artstation, masterpiece");
      setIsEnhancing(false);
      toast({
        title: "Prompt Enhanced",
        description: "AI has added details to your prompt for better results.",
      });
    }, 1500);
  };

  const handleSavePrompt = () => {
    if (!prompt) return;
    toast({
      title: "Prompt Saved",
      description: "Added to your library successfully.",
    });
  };

  // Helper for dynamic preview sizing
  const getPreviewDimensions = () => {
    switch(selectedRatio) {
      case "16:9": return "aspect-video w-full max-w-3xl";
      case "9:16": return "aspect-[9/16] max-w-[300px] w-full";
      case "4:5": return "aspect-[4/5] max-w-[360px] w-full";
      case "1:1": default: return "aspect-square max-w-[400px] w-full";
    }
  };

  return (
    <Layout>
      <div className="p-6 pt-12 flex flex-col h-full min-h-[80vh]">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-display font-bold text-white">Creation Studio</h1>
          <div className="flex gap-2">
            <button 
              onClick={() => setLocation("/ideas")}
              className="flex items-center gap-1 bg-white/5 hover:bg-white/10 px-3 py-1 rounded-full border border-white/5 transition-colors"
            >
              <Lightbulb size={14} className="text-yellow-400" />
              <span className="text-xs font-medium text-white">Ideas</span>
            </button>
            <div className="flex items-center gap-1 bg-white/5 px-3 py-1 rounded-full border border-white/5">
              <Sparkles size={14} className="text-accent" />
              <span className="text-xs font-medium text-white">320</span>
            </div>
          </div>
        </div>

        {/* Tab Selector (Optimized) */}
        <div className="flex items-center gap-2 mb-6">
          <div className="flex-1 flex p-1 bg-[#1E1E1E] rounded-xl border border-white/5">
            <button 
              onClick={() => setActiveTab("text")}
              className={cn("flex-1 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2", activeTab === "text" ? "bg-[#2A2A2A] text-white shadow-sm" : "text-gray-500 hover:text-gray-300")}
            >
              <Type size={16} />
              Text
            </button>
            <button 
              onClick={() => setActiveTab("image")}
              className={cn("flex-1 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2", activeTab === "image" ? "bg-[#2A2A2A] text-white shadow-sm" : "text-gray-500 hover:text-gray-300")}
            >
              <ImageIcon size={16} />
              Image
            </button>
            <button 
              onClick={() => setActiveTab("video")}
              className={cn("flex-1 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2", activeTab === "video" ? "bg-[#2A2A2A] text-white shadow-sm" : "text-gray-500 hover:text-gray-300")}
            >
              <Film size={16} />
              Video
            </button>
            <button 
              onClick={() => {
                setActiveTab("audio");
                setLocation("/podcast/studio");
              }}
              className={cn("flex-1 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2", activeTab === "audio" ? "bg-[#2A2A2A] text-white shadow-sm" : "text-gray-500 hover:text-gray-300")}
            >
              <Mic size={16} />
              Audio
            </button>
          </div>
        </div>

        {/* AI Preview Canvas (Dynamic & Prominent) */}
        <div className="mb-6 flex justify-center w-full">
           <div className={cn(
             "bg-[#151515] rounded-2xl border border-white/10 relative overflow-hidden transition-all duration-500 ease-out shadow-2xl flex items-center justify-center group",
             getPreviewDimensions()
           )}>
              {/* Grid Pattern Overlay */}
              <div className="absolute inset-0 opacity-20 pointer-events-none" 
                   style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #444 1px, transparent 0)', backgroundSize: '20px 20px' }}>
              </div>

              {activeTab === "video" && selectedModel.includes("Avatar") ? (
                <div className="w-full h-full p-6 overflow-y-auto">
                   <div className="flex items-center justify-between mb-4 sticky top-0 bg-[#151515]/80 backdrop-blur z-10 py-2">
                     <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Select Digital Avatar</label>
                     <span className="text-[10px] text-accent bg-accent/10 px-2 py-1 rounded-full">Avatar Mode Active</span>
                   </div>
                   
                   <div className="grid grid-cols-1 gap-3">
                      {AVATARS.map((avatar) => (
                        <button
                          key={avatar.id}
                          onClick={() => setSelectedAvatar(avatar.id)}
                          className={cn(
                            "w-full text-left px-4 py-4 rounded-xl border transition-all flex items-center justify-between group",
                            selectedAvatar === avatar.id 
                              ? "bg-white/10 border-accent text-white" 
                              : "bg-black/40 border-white/5 hover:bg-white/5 text-gray-400"
                          )}
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center ring-2 ring-white/5 group-hover:ring-white/20 transition-all">
                              <User size={20} />
                            </div>
                            <div>
                              <span className="block text-sm font-bold mb-0.5">{avatar.name}</span>
                              <span className="block text-[10px] opacity-70">{avatar.type}</span>
                            </div>
                          </div>
                          {avatar.optimizedFor?.includes(selectedRatio) && (
                            <span className="text-[9px] font-bold bg-green-500/20 text-green-400 px-2 py-1 rounded-full border border-green-500/20">
                              BEST MATCH
                            </span>
                          )}
                        </button>
                      ))}
                   </div>
                </div>
              ) : (
                <div className="text-center opacity-40 p-6 relative z-10">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center border border-white/5">
                    <Sparkles size={24} className="text-white" />
                  </div>
                  <p className="text-sm font-medium text-white">AI Preview Canvas</p>
                  <p className="text-xs text-gray-400 mt-1">Your masterpiece will appear here</p>
                  <div className="mt-4 text-[10px] text-gray-600 border border-dashed border-white/10 px-3 py-1 rounded-full inline-block">
                    Ratio: {selectedRatio}
                  </div>
                </div>
              )}
           </div>
        </div>

        {/* Main Input Area (Consolidated & Expandable) */}
        <div className={cn(
          "relative mb-8 group bg-[#1E1E1E] border border-white/5 rounded-2xl transition-all duration-300 flex flex-col",
          isExpanded ? "fixed inset-4 z-50 shadow-2xl h-auto bg-[#151515] border-white/20" : ""
        )}>
          {/* Input Mode Tabs & Actions */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setInputMode("prompt")}
                className={cn(
                  "text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2",
                  inputMode === "prompt" ? "text-white" : "text-gray-500 hover:text-gray-300"
                )}
              >
                <Sparkles size={12} />
                Custom Prompt
              </button>
              <div className="w-px h-3 bg-white/10" />
              <button 
                onClick={() => setInputMode("rss")}
                className={cn(
                  "text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2",
                  inputMode === "rss" ? "text-orange-400" : "text-gray-500 hover:text-gray-300"
                )}
              >
                <Newspaper size={12} />
                From Feed
              </button>
            </div>
            
            <div className="flex items-center gap-2">
               {isExpanded && (
                 <button 
                   onClick={() => setIsExpanded(false)} 
                   className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white"
                 >
                   <Minimize2 size={14} />
                 </button>
               )}
               {!isExpanded && (
                 <button 
                   onClick={() => setIsExpanded(true)} 
                   className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white"
                 >
                   <Maximize2 size={14} />
                 </button>
               )}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 relative">
            {inputMode === "prompt" ? (
              <>
                <textarea 
                  className={cn(
                    "w-full bg-transparent p-4 text-lg text-white placeholder:text-gray-600 resize-none focus:outline-none",
                    isExpanded ? "h-[calc(100vh-250px)]" : "h-32"
                  )}
                  placeholder={activeTab === "text" ? "What would you like to write?" : "Describe your dream image or video..."}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
                
                {/* Floating Tools inside text area */}
                <div className="absolute top-2 right-2 flex flex-col gap-1">
                   <button 
                     onClick={() => setIsLibraryOpen(true)}
                     className="p-2 rounded-lg bg-black/20 hover:bg-black/40 text-gray-400 hover:text-accent transition-colors"
                     title="Library"
                   >
                     <BookOpen size={14} />
                   </button>
                   <button 
                     onClick={() => setShowHistory(!showHistory)}
                     className="p-2 rounded-lg bg-black/20 hover:bg-black/40 text-gray-400 hover:text-white transition-colors"
                     title="History"
                   >
                     <History size={14} />
                   </button>
                </div>
              </>
            ) : (
              <div className="p-4 h-40 overflow-hidden flex flex-col">
                 <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar h-full items-center">
                    {MOCK_ARTICLES.map((article) => (
                      <button 
                        key={article.id}
                        onClick={() => {
                          setPrompt(`Create a ${activeTab === "video" ? "short form video script" : "visual concept"} about: "${article.title}".\n\nContext: ${article.summary}`);
                          setInputMode("prompt");
                          toast({
                            title: "Article Selected",
                            description: "Content context added to your prompt.",
                          });
                        }}
                        className="min-w-[240px] w-[240px] h-full bg-black/20 rounded-xl p-3 border border-white/5 hover:border-orange-400/50 hover:bg-white/5 transition-all text-left group flex flex-col relative overflow-hidden"
                      >
                        <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-30 transition-opacity">
                          <img src={article.image} alt="" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/80" />
                        </div>
                        <div className="relative z-10 flex flex-col h-full">
                          <span className="text-[9px] text-orange-400 font-bold mb-1">{article.source} • {article.time}</span>
                          <h5 className="text-xs font-bold text-white leading-tight line-clamp-2 mb-auto group-hover:text-orange-100 transition-colors">{article.title}</h5>
                          <div className="mt-2 flex items-center gap-1 text-[10px] text-gray-400">
                             <Plus size={10} /> Use this story
                          </div>
                        </div>
                      </button>
                    ))}
                 </div>
              </div>
            )}
          </div>

          {/* Integrated Toolbar (Bottom of Input) */}
          <div className="p-2 border-t border-white/5 bg-black/20 rounded-b-2xl flex flex-wrap items-center justify-between gap-2">
             <div className="flex items-center gap-2 flex-wrap">
                {/* Model Selector (Integrated) */}
                <div className="relative group">
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-gray-300 hover:text-white transition-colors border border-transparent hover:border-white/10">
                    <Bot size={12} className="text-accent" />
                    {selectedModel}
                    <ChevronDown size={10} className="opacity-50" />
                  </button>
                  <div className="absolute bottom-full left-0 mb-2 w-48 bg-[#252525] border border-white/10 rounded-xl shadow-xl overflow-hidden z-50 hidden group-hover:block">
                    {currentModels.map(m => (
                      <button
                        key={m}
                        onClick={() => setSelectedModel(m)}
                        className={cn(
                          "w-full text-left px-3 py-2 text-xs hover:bg-white/5 transition-colors",
                          selectedModel === m ? "text-accent font-bold bg-white/5" : "text-gray-400"
                        )}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Aspect Ratio Selector (Integrated) */}
                {(activeTab === "image" || activeTab === "video") && (
                  <div className="relative group">
                    <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-gray-300 hover:text-white transition-colors border border-transparent hover:border-white/10">
                      {(() => {
                        const Icon = ASPECT_RATIOS.find(r => r.id === selectedRatio)?.icon || Square;
                        return <Icon size={12} className="text-blue-400" />;
                      })()}
                      {ASPECT_RATIOS.find(r => r.id === selectedRatio)?.label}
                      <ChevronDown size={10} className="opacity-50" />
                    </button>
                    <div className="absolute bottom-full left-0 mb-2 w-40 bg-[#252525] border border-white/10 rounded-xl shadow-xl overflow-hidden z-50 hidden group-hover:block">
                      {ASPECT_RATIOS.map((ratio) => (
                        <button
                          key={ratio.id}
                          onClick={() => setSelectedRatio(ratio.id)}
                          className={cn(
                            "w-full text-left px-3 py-2 text-xs hover:bg-white/5 transition-colors flex items-center gap-2",
                            selectedRatio === ratio.id ? "text-blue-400 font-bold bg-white/5" : "text-gray-400"
                          )}
                        >
                          <ratio.icon size={12} />
                          {ratio.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Style Indicator */}
                <div className="px-3 py-1.5 rounded-lg bg-white/5 text-xs font-medium text-gray-400 border border-dashed border-white/10 flex items-center gap-2">
                  <Palette size={12} className="text-pink-400" />
                  {STYLES.find(s => s.id === selectedStyle)?.label || selectedStyle}
                </div>
             </div>

             {/* Action Buttons */}
             <div className="flex items-center gap-2">
                {activeTab === "image" && (
                   <button 
                     onClick={() => setIsCarouselMode(!isCarouselMode)}
                     className={cn(
                       "p-1.5 rounded-lg transition-colors",
                       isCarouselMode ? "bg-primary/20 text-primary" : "hover:bg-white/10 text-gray-400"
                     )}
                     title="Carousel Mode"
                   >
                     <Layers size={14} />
                   </button>
                 )}
                <button 
                   onClick={handleEnhance}
                   disabled={isEnhancing}
                   className={cn(
                     "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all",
                     isEnhancing 
                       ? "bg-accent/20 text-accent cursor-wait" 
                       : "bg-gradient-to-r from-indigo-500/20 to-purple-500/20 hover:from-indigo-500/30 hover:to-purple-500/30 text-white border border-white/5"
                   )}
                 >
                   <Wand2 size={12} className={isEnhancing ? "animate-spin" : ""} />
                   {isEnhancing ? "Magic..." : "Enhance"}
                 </button>
             </div>
          </div>
        </div>

        {/* Style Browser (Bottom Visual Strip) */}
        <div className="mb-8">
          <label className="text-xs font-bold text-gray-500 uppercase mb-3 block tracking-wider">Visual Style</label>
          <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
            {STYLES.map(s => (
              <button
                key={s.id}
                onClick={() => setSelectedStyle(s.id)}
                className={cn(
                  "px-3 py-8 rounded-xl text-xs font-bold border transition-all min-w-[80px] text-center relative overflow-hidden group flex flex-col justify-end",
                  selectedStyle === s.id
                    ? "border-accent shadow-[0_0_15px_rgba(34,211,238,0.3)] scale-105"
                    : "border-white/5 hover:border-white/20 hover:scale-105"
                )}
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <img 
                    src={s.image} 
                    alt={s.label} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-60 group-hover:opacity-80" 
                  />
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity",
                    selectedStyle === s.id ? "opacity-80" : "opacity-100"
                  )} />
                </div>
                
                <span className={cn(
                  "relative z-10 transition-colors drop-shadow-md text-[10px]",
                  selectedStyle === s.id ? "text-accent" : "text-white"
                )}>{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <div className="mb-10">
          <GradientButton onClick={() => setLocation("/result")}>
            GENERATE <span className="opacity-70 text-sm ml-1 font-normal">(5 Credits)</span>
          </GradientButton>
        </div>

        {/* Studio Toolkit (Reorganized) */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <Rocket size={14} /> Creative Suite
            </h3>
          </div>
          
          <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar -mx-2 px-2">
            {[
              { icon: Library, label: "Library", color: "text-orange-400", path: "/library", desc: "Saved prompts" },
              { icon: Palette, label: "Brand Kit", color: "text-[#00C4CC]", path: "/brand", desc: "Logos & assets" },
              { icon: BrainCircuit, label: "Context", color: "text-blue-400", path: "/context", desc: "Knowledge" },
              { icon: User, label: "Avatars", color: "text-purple-400", path: "/avatars", desc: "Digital twins" },
              { icon: CameraIcon, label: "AR Cam", color: "text-pink-400", path: "/camera", desc: "Filters" },
              { icon: Bot, label: "AI Agent", color: "text-cyan-400", path: "/research", desc: "Research" },
              { icon: Users, label: "Collab", color: "text-green-400", path: "/collab", desc: "Team work" },
            ].map((tool) => (
              <button 
                key={tool.label}
                onClick={() => setLocation(tool.path)}
                className="min-w-[80px] flex flex-col items-center gap-2 group p-2 rounded-xl hover:bg-white/5 transition-colors"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#1E1E1E] border border-white/5 flex items-center justify-center group-hover:bg-[#252525] group-hover:scale-105 group-hover:border-white/20 transition-all shadow-sm relative overflow-hidden">
                   <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-current", tool.color.replace('text-', 'bg-'))} />
                   <tool.icon size={24} className={cn("transition-colors relative z-10", tool.color)} />
                </div>
                <div className="text-center">
                  <span className="text-[11px] font-semibold text-gray-300 group-hover:text-white transition-colors block leading-tight">{tool.label}</span>
                  <span className="text-[9px] text-gray-600 group-hover:text-gray-500 transition-colors block mt-0.5">{tool.desc}</span>
                </div>
              </button>
            ))}
            
            {/* Add Button */}
             <button className="min-w-[80px] flex flex-col items-center gap-2 group p-2 rounded-xl hover:bg-white/5 transition-colors">
                <div className="w-14 h-14 rounded-2xl border border-dashed border-white/10 flex items-center justify-center group-hover:bg-white/5 group-hover:border-white/30 transition-all">
                   <Plus size={20} className="text-gray-600 group-hover:text-white transition-colors" />
                </div>
                <div className="text-center">
                  <span className="text-[11px] font-semibold text-gray-500 group-hover:text-gray-400 transition-colors block leading-tight">Add App</span>
                </div>
              </button>
          </div>
        </div>

      </div>
      
      {/* Prompt Library Modal */}
      <Dialog open={isLibraryOpen} onOpenChange={setIsLibraryOpen}>
        <DialogContent className="bg-[#1E1E1E] border-white/10 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-xl flex items-center gap-2">
              <Library className="text-accent" size={20} /> 
              Select a Prompt
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 mt-4">
            {GROUPED_PROMPTS.map((category, i) => (
              <div key={i}>
                <h4 className="text-xs font-bold text-gray-500 uppercase mb-3 tracking-wider">{category.category}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {category.items.map((item, j) => (
                    <button
                      key={j}
                      onClick={() => {
                        setPrompt(item.prompt);
                        setIsLibraryOpen(false);
                      }}
                      className="text-left p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-accent/50 transition-all group h-full flex flex-col"
                    >
                      <h5 className="font-bold text-white text-sm mb-2 group-hover:text-accent transition-colors">{item.title}</h5>
                      <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed">{item.prompt}</p>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
