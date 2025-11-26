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
        <div className="flex p-1 bg-[#1E1E1E] rounded-xl mb-6 border border-white/5">
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

        {/* Main Input Area */}
        <div className="relative mb-6 group">
          <div className="absolute top-4 right-4 z-10 flex gap-2">
             <button 
               onClick={() => setIsLibraryOpen(true)}
               className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
               title="Browse Library"
             >
               <BookOpen size={16} />
             </button>
             <button 
               onClick={() => setShowHistory(!showHistory)}
               className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
               title="History"
             >
               <History size={16} />
             </button>
             <button 
               onClick={handleSavePrompt}
               className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
               title="Save to Library"
             >
               <Save size={16} />
             </button>
          </div>

          <textarea 
            className="w-full h-48 bg-[#1E1E1E] rounded-2xl p-4 pt-12 text-lg text-white placeholder:text-gray-600 resize-none focus:outline-none border border-transparent focus:border-white/10 focus:bg-[#252525] transition-all"
            placeholder={activeTab === "text" ? "What would you like to write?" : "Describe your dream..."}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          
          {/* Floating Actions */}
          <div className="absolute bottom-4 right-4 flex gap-2">
             {activeTab === "image" && (
               <button 
                 onClick={() => setIsCarouselMode(!isCarouselMode)}
                 className={cn(
                   "px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2 text-xs font-bold border border-transparent",
                   isCarouselMode ? "bg-primary/20 text-primary border-primary/20" : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                 )}
               >
                 <Layers size={14} />
                 {isCarouselMode ? "Carousel" : "Carousel"}
               </button>
             )}
             
             <button 
               onClick={handleEnhance}
               disabled={isEnhancing}
               className={cn(
                 "px-3 py-1.5 rounded-lg transition-all flex items-center gap-2 text-xs font-bold border",
                 isEnhancing 
                   ? "bg-accent/20 text-accent border-accent/50 animate-pulse cursor-wait" 
                   : "bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border-white/5 hover:border-white/20"
               )}
             >
               <Wand2 size={14} className={isEnhancing ? "animate-spin" : ""} />
               {isEnhancing ? "Enhancing..." : "Enhance"}
             </button>
          </div>

          {/* Quick History Popover */}
          {showHistory && (
            <div className="absolute top-12 right-4 w-64 bg-[#252525] border border-white/10 rounded-xl shadow-2xl z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between p-3 border-b border-white/5">
                <span className="text-xs font-bold text-gray-400 uppercase">Recent</span>
                <button onClick={() => setShowHistory(false)} className="text-gray-500 hover:text-white">
                  <X size={14} />
                </button>
              </div>
              <div className="max-h-48 overflow-y-auto">
                {MOCK_HISTORY.map((h, i) => (
                  <button 
                    key={i}
                    onClick={() => {
                      setPrompt(h);
                      setShowHistory(false);
                    }}
                    className="w-full text-left p-3 text-xs text-gray-300 hover:bg-white/5 hover:text-white border-b border-white/5 last:border-0 transition-colors line-clamp-2"
                  >
                    {h}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Model & Style Settings */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div>
            <label className="text-xs font-medium text-gray-400 uppercase mb-2 block">Model</label>
            <div className="relative">
              <select 
                value={selectedModel} 
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full appearance-none bg-[#1E1E1E] border border-white/10 rounded-xl px-4 py-3 text-sm font-medium text-white focus:outline-none focus:border-primary/50 transition-all"
              >
                {currentModels.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-400 uppercase mb-2 block">Style</label>
            <div className="relative">
              <select 
                value={selectedStyle} 
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="w-full appearance-none bg-[#1E1E1E] border border-white/10 rounded-xl px-4 py-3 text-sm font-medium text-white focus:outline-none focus:border-primary/50 transition-all"
              >
                {styles.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
            </div>
          </div>
          {/* Avatar Selector (Only for Video + Avatar Model) */}
          {activeTab === "video" && selectedModel.includes("Avatar") && (
            <div className="col-span-2 md:col-span-1">
              <label className="text-xs font-medium text-gray-400 uppercase mb-2 block">Avatar</label>
              <div className="relative group">
                <button className="w-full bg-[#1E1E1E] border border-white/10 rounded-xl px-4 py-3 text-sm font-medium text-white focus:outline-none focus:border-primary/50 transition-all flex items-center justify-between text-left group-focus-within:border-primary/50">
                  <span className="flex items-center gap-2">
                    <User size={16} />
                    {selectedAvatar ? AVATARS.find(a => a.id === selectedAvatar)?.name : "Select Avatar"}
                  </span>
                  <ChevronDown size={16} className="text-gray-500" />
                </button>
                
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#252525] border border-white/10 rounded-xl shadow-xl overflow-hidden z-20 hidden group-focus-within:block hover:block">
                  {AVATARS.map((avatar) => (
                    <button
                      key={avatar.id}
                      onClick={() => setSelectedAvatar(avatar.id)}
                      className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white flex items-center justify-between transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <User size={14} />
                        {avatar.name}
                      </span>
                      <div className="flex items-center gap-2">
                        {avatar.optimizedFor?.includes(selectedRatio) && (
                          <span className="text-[8px] font-bold bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded border border-green-500/20">
                            BEST MATCH
                          </span>
                        )}
                        <span className="text-[10px] text-gray-500">{avatar.type}</span>
                      </div>
                    </button>
                  ))}
                  <button
                     onClick={() => setLocation("/avatars")}
                     className="w-full text-left px-4 py-3 text-xs text-accent font-bold hover:bg-white/5 border-t border-white/5 flex items-center gap-2"
                   >
                     <Plus size={12} /> Create New Avatar
                   </button>
                </div>
              </div>
            </div>
          )}

          {/* Aspect Ratio Selector (Only for Image/Video) */}
          {(activeTab === "image" || activeTab === "video") && (
            <div className="col-span-2 md:col-span-1">
              <label className="text-xs font-medium text-gray-400 uppercase mb-2 block">Format</label>
              <div className="relative group">
                <button className="w-full bg-[#1E1E1E] border border-white/10 rounded-xl px-4 py-3 text-sm font-medium text-white focus:outline-none focus:border-primary/50 transition-all flex items-center justify-between text-left group-focus-within:border-primary/50">
                  <span className="flex items-center gap-2">
                    {(() => {
                      const Icon = ASPECT_RATIOS.find(r => r.id === selectedRatio)?.icon;
                      return Icon && <Icon size={16} />;
                    })()}
                    {ASPECT_RATIOS.find(r => r.id === selectedRatio)?.label}
                  </span>
                  <ChevronDown size={16} className="text-gray-500" />
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#252525] border border-white/10 rounded-xl shadow-xl overflow-hidden z-20 hidden group-focus-within:block hover:block">
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
                      <span className="text-[10px] text-gray-500">{ratio.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Generate Button */}
        <div className="mb-10">
          <GradientButton onClick={() => setLocation("/result")}>
            GENERATE <span className="opacity-70 text-sm ml-1 font-normal">(5 Credits)</span>
          </GradientButton>
        </div>

        {/* Studio Toolkit (Reorganized) */}
        <div className="mb-8">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Rocket size={14} /> Studio Toolkit
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {/* Essentials */}
            <button onClick={() => setLocation("/library")} className="p-3 rounded-xl bg-[#1E1E1E] border border-white/5 hover:border-white/20 transition-all text-left group">
              <Library size={20} className="text-orange-400 mb-2 group-hover:scale-110 transition-transform" />
              <span className="block text-sm font-bold text-white">Prompts</span>
              <span className="block text-[10px] text-gray-500">My Library</span>
            </button>
            <button onClick={() => setLocation("/brand")} className="p-3 rounded-xl bg-[#1E1E1E] border border-white/5 hover:border-white/20 transition-all text-left group">
              <Palette size={20} className="text-[#00C4CC] mb-2 group-hover:scale-110 transition-transform" />
              <span className="block text-sm font-bold text-white">Brand Kit</span>
              <span className="block text-[10px] text-gray-500">Assets & Logos</span>
            </button>

            <button onClick={() => setLocation("/context")} className="p-3 rounded-xl bg-[#1E1E1E] border border-white/5 hover:border-white/20 transition-all text-left group">
              <BrainCircuit size={20} className="text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
              <span className="block text-sm font-bold text-white">Context</span>
              <span className="block text-[10px] text-gray-500">Knowledge Base</span>
            </button>

            <button onClick={() => setLocation("/avatars")} className="p-3 rounded-xl bg-[#1E1E1E] border border-white/5 hover:border-white/20 transition-all text-left group">
              <User size={20} className="text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
              <span className="block text-sm font-bold text-white">Avatars</span>
              <span className="block text-[10px] text-gray-500">Digital Twins</span>
            </button>

            <button onClick={() => setLocation("/camera")} className="p-3 rounded-xl bg-[#1E1E1E] border border-white/5 hover:border-white/20 transition-all text-left group">
              <CameraIcon size={20} className="text-pink-400 mb-2 group-hover:scale-110 transition-transform" />
              <span className="block text-sm font-bold text-white">AR Cam</span>
              <span className="block text-[10px] text-gray-500">Filters & Lenses</span>
            </button>

            {/* Advanced */}
            <button onClick={() => setLocation("/research")} className="p-3 rounded-xl bg-[#1E1E1E] border border-white/5 hover:border-white/20 transition-all text-left group">
              <Bot size={20} className="text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
              <span className="block text-sm font-bold text-white">Society AI</span>
              <span className="block text-[10px] text-gray-500">Deep Research</span>
            </button>

            <button onClick={() => setLocation("/collab")} className="p-3 rounded-xl bg-[#1E1E1E] border border-white/5 hover:border-white/20 transition-all text-left group">
              <Users size={20} className="text-green-400 mb-2 group-hover:scale-110 transition-transform" />
              <span className="block text-sm font-bold text-white">Collab</span>
              <span className="block text-[10px] text-gray-500">Writer's Room</span>
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
