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

const styles = [
  "Anime", "Cinematic", "3D Render", "Oil Painting", "Cyberpunk", "Studio Ghibli", "Polaroid", "Vaporwave", "Minimalist"
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

        {/* Main Input Area */}
        <div className="relative mb-6 group">
          <div className="absolute top-3 right-3 z-10 flex gap-1 bg-black/40 backdrop-blur rounded-lg p-1 border border-white/5">
             <button 
               onClick={() => setIsLibraryOpen(true)}
               className="p-2 rounded-md hover:bg-white/10 text-gray-400 hover:text-accent transition-colors group/tooltip relative"
             >
               <BookOpen size={16} />
               <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">Browse Library</span>
             </button>
             <button 
               onClick={() => setShowHistory(!showHistory)}
               className="p-2 rounded-md hover:bg-white/10 text-gray-400 hover:text-white transition-colors group/tooltip relative"
             >
               <History size={16} />
               <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none">History</span>
             </button>
             <div className="w-px h-4 bg-white/10 my-auto mx-1" />
             <button 
               onClick={handleSavePrompt}
               className="p-2 rounded-md hover:bg-white/10 text-gray-400 hover:text-white transition-colors group/tooltip relative"
             >
               <Save size={16} />
               <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none">Save Prompt</span>
             </button>
          </div>

          <textarea 
            className="w-full h-64 bg-[#1E1E1E] rounded-2xl p-6 pt-12 text-lg text-white placeholder:text-gray-600 resize-none focus:outline-none border border-white/5 focus:border-accent/50 focus:bg-[#222222] transition-all shadow-inner"
            placeholder={activeTab === "text" ? "What would you like to write?" : "Describe your dream image or video..."}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          
          {/* Helper Chips */}
          {!prompt && (
            <div className="absolute top-1/2 left-6 -translate-y-1/2 flex flex-wrap gap-2 max-w-lg pointer-events-none opacity-50">
               <span className="px-2 py-1 rounded bg-white/5 text-xs text-gray-400">Cinematic lighting</span>
               <span className="px-2 py-1 rounded bg-white/5 text-xs text-gray-400">4k resolution</span>
               <span className="px-2 py-1 rounded bg-white/5 text-xs text-gray-400">Cyberpunk style</span>
            </div>
          )}
          
          {/* Floating Actions */}
          <div className="absolute bottom-4 right-4 flex gap-2">
             {activeTab === "image" && (
               <button 
                 onClick={() => setIsCarouselMode(!isCarouselMode)}
                 className={cn(
                   "px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2 text-xs font-bold border border-transparent backdrop-blur-md",
                   isCarouselMode ? "bg-primary/20 text-primary border-primary/20" : "bg-black/40 text-gray-400 hover:text-white hover:bg-black/60"
                 )}
               >
                 <Layers size={14} />
                 {isCarouselMode ? "Carousel On" : "Carousel Off"}
               </button>
             )}
             
             <button 
               onClick={handleEnhance}
               disabled={isEnhancing}
               className={cn(
                 "px-4 py-1.5 rounded-lg transition-all flex items-center gap-2 text-xs font-bold border backdrop-blur-md",
                 isEnhancing 
                   ? "bg-accent/20 text-accent border-accent/50 animate-pulse cursor-wait" 
                   : "bg-black/40 text-gray-300 hover:text-white hover:bg-black/60 border-white/5 hover:border-white/20"
               )}
             >
               <Wand2 size={14} className={isEnhancing ? "animate-spin" : ""} />
               {isEnhancing ? "Enhancing..." : "Magic Enhance"}
             </button>
          </div>
        </div>

        {/* Configuration Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Left Column: Model & Style */}
          <div className="space-y-4">
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

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase mb-3 block tracking-wider">Visual Style</label>
              <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                {styles.map(s => (
                  <button
                    key={s}
                    onClick={() => setSelectedStyle(s)}
                    className={cn(
                      "px-4 py-6 rounded-xl text-xs font-bold border transition-all min-w-[100px] text-center relative overflow-hidden group",
                      selectedStyle === s
                        ? "bg-accent text-black border-accent shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                        : "bg-[#1E1E1E] text-gray-400 border-white/5 hover:text-white hover:border-white/20"
                    )}
                  >
                    <span className="relative z-10">{s}</span>
                    {/* Abstract BG Pattern */}
                    <div className={cn(
                      "absolute inset-0 opacity-20 transition-opacity",
                      selectedStyle === s ? "bg-white/20" : "bg-transparent group-hover:bg-white/5"
                    )} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Avatar (Conditional) or Preview Placeholder */}
          <div className="bg-[#1E1E1E] rounded-2xl border border-white/5 p-1 flex items-center justify-center min-h-[200px] relative overflow-hidden">
            {activeTab === "video" && selectedModel.includes("Avatar") ? (
              <div className="w-full h-full p-4">
                 <label className="text-xs font-bold text-gray-500 uppercase mb-3 block tracking-wider">Digital Avatar</label>
                 <div className="grid grid-cols-1 gap-2">
                    {AVATARS.map((avatar) => (
                      <button
                        key={avatar.id}
                        onClick={() => setSelectedAvatar(avatar.id)}
                        className={cn(
                          "w-full text-left px-4 py-3 rounded-xl border transition-all flex items-center justify-between group",
                          selectedAvatar === avatar.id 
                            ? "bg-white/10 border-accent text-white" 
                            : "bg-black/20 border-transparent hover:bg-white/5 text-gray-400"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                            <User size={14} />
                          </div>
                          <div>
                            <span className="block text-sm font-bold">{avatar.name}</span>
                            <span className="block text-[10px] opacity-70">{avatar.type}</span>
                          </div>
                        </div>
                        {avatar.optimizedFor?.includes(selectedRatio) && (
                          <span className="text-[9px] font-bold bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                            BEST MATCH
                          </span>
                        )}
                      </button>
                    ))}
                 </div>
              </div>
            ) : (
              <div className="text-center opacity-30 p-6">
                <Sparkles size={48} className="mx-auto mb-4 text-white" />
                <p className="text-sm font-medium text-white">AI Preview Canvas</p>
                <p className="text-xs text-gray-400 mt-1">Your generation will appear here</p>
              </div>
            )}
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
