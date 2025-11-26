import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { GradientButton } from "@/components/GradientButton";
import { Image as ImageIcon, Film, Type, Sparkles, Camera as CameraIcon, Lightbulb, ChevronDown, Layers, Palette, BrainCircuit, ShoppingBag, User, Users, Store, Bot, Mic, Rocket, Library, Wand2, Save, History, X, Monitor, Smartphone, RectangleHorizontal, RectangleVertical, Square, Plus, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { MOCK_PROMPTS } from "@/lib/mockData";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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

          {/* Aspect Ratio Selector (Inline) */}
          {(activeTab === "image" || activeTab === "video") && (
            <div className="relative group w-40">
              <button className="w-full h-full bg-[#1E1E1E] border border-white/10 rounded-xl px-3 flex items-center justify-between text-sm font-medium text-white hover:bg-white/5 transition-colors">
                <span className="flex items-center gap-2">
                  {(() => {
                    const Icon = ASPECT_RATIOS.find(r => r.id === selectedRatio)?.icon;
                    return Icon && <Icon size={16} />;
                  })()}
                  {ASPECT_RATIOS.find(r => r.id === selectedRatio)?.label}
                </span>
                <ChevronDown size={14} className="text-gray-500" />
              </button>
              
              <div className="absolute top-full right-0 mt-2 w-48 bg-[#252525] border border-white/10 rounded-xl shadow-xl overflow-hidden z-20 hidden group-focus-within:block hover:block">
                {ASPECT_RATIOS.map((ratio) => (
                  <button
                    key={ratio.id}
                    onClick={() => setSelectedRatio(ratio.id)}
                    className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white flex items-center justify-between transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <ratio.icon size={14} />
                      {ratio.label}
                    </span>
                    <span className="text-[10px] text-gray-500">{ratio.id}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
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

        {/* Main Input Area (Compact) */}
        <div className="relative mb-8 group">
          <div className="absolute top-3 right-3 z-10 flex gap-1 bg-black/40 backdrop-blur rounded-lg p-1 border border-white/5">
             <button 
               onClick={() => setIsLibraryOpen(true)}
               className="p-2 rounded-md hover:bg-white/10 text-gray-400 hover:text-accent transition-colors group/tooltip relative"
             >
               <BookOpen size={16} />
             </button>
             <button 
               onClick={() => setShowHistory(!showHistory)}
               className="p-2 rounded-md hover:bg-white/10 text-gray-400 hover:text-white transition-colors group/tooltip relative"
             >
               <History size={16} />
             </button>
             <div className="w-px h-4 bg-white/10 my-auto mx-1" />
             <button 
               onClick={handleSavePrompt}
               className="p-2 rounded-md hover:bg-white/10 text-gray-400 hover:text-white transition-colors group/tooltip relative"
             >
               <Save size={16} />
             </button>
          </div>

          <textarea 
            className="w-full h-32 bg-[#1E1E1E] rounded-2xl p-6 pt-6 text-lg text-white placeholder:text-gray-600 resize-none focus:outline-none border border-white/5 focus:border-accent/50 focus:bg-[#222222] transition-all shadow-inner"
            placeholder={activeTab === "text" ? "What would you like to write?" : "Describe your dream image or video..."}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          
          {/* Floating Actions */}
          <div className="absolute bottom-3 right-3 flex gap-2">
             {activeTab === "image" && (
               <button 
                 onClick={() => setIsCarouselMode(!isCarouselMode)}
                 className={cn(
                   "px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2 text-[10px] font-bold border border-transparent backdrop-blur-md",
                   isCarouselMode ? "bg-primary/20 text-primary border-primary/20" : "bg-black/40 text-gray-400 hover:text-white hover:bg-black/60"
                 )}
               >
                 <Layers size={12} />
                 {isCarouselMode ? "Carousel On" : "Carousel Off"}
               </button>
             )}
             
             <button 
               onClick={handleEnhance}
               disabled={isEnhancing}
               className={cn(
                 "px-3 py-1.5 rounded-lg transition-all flex items-center gap-2 text-[10px] font-bold border backdrop-blur-md",
                 isEnhancing 
                   ? "bg-accent/20 text-accent border-accent/50 animate-pulse cursor-wait" 
                   : "bg-black/40 text-gray-300 hover:text-white hover:bg-black/60 border-white/5 hover:border-white/20"
               )}
             >
               <Wand2 size={12} className={isEnhancing ? "animate-spin" : ""} />
               {isEnhancing ? "Enhancing..." : "Magic Enhance"}
             </button>
          </div>
        </div>

        {/* Configuration Panel (Side by Side) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Left Column: Model */}
          <div>
             <label className="text-xs font-bold text-gray-500 uppercase mb-3 block tracking-wider">AI Model</label>
             <div className="flex flex-wrap gap-2">
               {currentModels.map(m => (
                 <button
                   key={m}
                   onClick={() => setSelectedModel(m)}
                   className={cn(
                     "px-3 py-2 rounded-lg text-xs font-bold border transition-all",
                     selectedModel === m
                       ? "bg-white text-black border-white shadow-lg scale-105"
                       : "bg-[#1E1E1E] text-gray-400 border-white/5 hover:text-white hover:border-white/20"
                   )}
                 >
                   {m}
                 </button>
               ))}
             </div>
          </div>

          {/* Right Column: Style */}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase mb-3 block tracking-wider">Visual Style</label>
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
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
              <Rocket size={14} /> Studio Toolkit
            </h3>
            <button className="text-[10px] text-accent hover:underline">Customize Toolbar</button>
          </div>
          
          <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-2">
            {/* Compact Toolbar Items */}
            <button onClick={() => setLocation("/library")} className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#1E1E1E] border border-white/5 hover:border-white/20 hover:bg-white/5 transition-all group">
              <Library size={18} className="text-orange-400 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-medium text-gray-400 group-hover:text-white">Prompts</span>
            </button>
            <button onClick={() => setLocation("/brand")} className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#1E1E1E] border border-white/5 hover:border-white/20 hover:bg-white/5 transition-all group">
              <Palette size={18} className="text-[#00C4CC] mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-medium text-gray-400 group-hover:text-white">Brand</span>
            </button>
            <button onClick={() => setLocation("/context")} className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#1E1E1E] border border-white/5 hover:border-white/20 hover:bg-white/5 transition-all group">
              <BrainCircuit size={18} className="text-blue-400 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-medium text-gray-400 group-hover:text-white">Context</span>
            </button>
            <button onClick={() => setLocation("/avatars")} className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#1E1E1E] border border-white/5 hover:border-white/20 hover:bg-white/5 transition-all group">
              <User size={18} className="text-purple-400 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-medium text-gray-400 group-hover:text-white">Avatars</span>
            </button>
            <button onClick={() => setLocation("/camera")} className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#1E1E1E] border border-white/5 hover:border-white/20 hover:bg-white/5 transition-all group">
              <CameraIcon size={18} className="text-pink-400 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-medium text-gray-400 group-hover:text-white">AR Cam</span>
            </button>
            <button onClick={() => setLocation("/research")} className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#1E1E1E] border border-white/5 hover:border-white/20 hover:bg-white/5 transition-all group">
              <Bot size={18} className="text-cyan-400 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-medium text-gray-400 group-hover:text-white">AI Agent</span>
            </button>
            <button onClick={() => setLocation("/collab")} className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#1E1E1E] border border-white/5 hover:border-white/20 hover:bg-white/5 transition-all group">
              <Users size={18} className="text-green-400 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-medium text-gray-400 group-hover:text-white">Collab</span>
            </button>
            <button className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#1E1E1E] border border-dashed border-white/10 hover:border-white/20 hover:bg-white/5 transition-all group">
              <Plus size={18} className="text-gray-600 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-medium text-gray-500 group-hover:text-white">Add</span>
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
