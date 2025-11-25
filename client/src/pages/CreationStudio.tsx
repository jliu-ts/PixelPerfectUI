import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { GradientButton } from "@/components/GradientButton";
import { Image as ImageIcon, Film, Type, Sparkles, Camera as CameraIcon, Lightbulb, ChevronDown, Layers, Palette, BrainCircuit, ShoppingBag, User } from "lucide-react";
import { cn } from "@/lib/utils";

const styles = [
  "Anime", "Cinematic", "3D Render", "Oil Painting", "Cyberpunk", "Studio Ghibli", "Polaroid", "Vaporwave", "Minimalist"
];

const VIDEO_MODELS = ["Google Veo", "Sora", "Runway Gen-2", "Pika 1.0"];
const IMAGE_MODELS = ["Midjourney v6", "DALL-E 3", "Stable Diffusion XL", "Adobe Firefly"];

export default function CreationStudio() {
  const [location, setLocation] = useLocation();
  const locationState = window.history.state?.usr;
  
  const [activeTab, setActiveTab] = useState<"text" | "image" | "video">((locationState?.mode as any) || "image");
  const [selectedStyle, setSelectedStyle] = useState(locationState?.style || "Cinematic");
  const [prompt, setPrompt] = useState(locationState?.prompt || "");
  const [selectedModel, setSelectedModel] = useState(locationState?.model || (activeTab === "video" ? VIDEO_MODELS[0] : IMAGE_MODELS[0]));
  const [isCarouselMode, setIsCarouselMode] = useState(locationState?.prompt?.includes("carousel") || false);

  // Update default model when tab changes if not manually set from idea
  useEffect(() => {
    if (!locationState?.model) {
      setSelectedModel(activeTab === "video" ? VIDEO_MODELS[0] : IMAGE_MODELS[0]);
    }
  }, [activeTab]);

  const currentModels = activeTab === "video" ? VIDEO_MODELS : IMAGE_MODELS;

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

        {/* Brand & Context Tools (New) */}
        <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar pb-2 -mx-2 px-2">
          <button 
            onClick={() => setLocation("/brand")}
            className="min-w-[140px] py-3 px-4 rounded-xl bg-[#1E1E1E] border border-white/5 flex items-center justify-center gap-2 hover:bg-white/5 transition-colors group"
          >
            <Palette size={16} className="text-[#00C4CC]" />
            <div className="text-left">
              <span className="block text-xs font-bold text-white">Brand Kit</span>
              <span className="block text-[10px] text-gray-500 group-hover:text-gray-300">Canva Linked</span>
            </div>
          </button>

          <button 
            onClick={() => setLocation("/avatars")}
            className="min-w-[140px] py-3 px-4 rounded-xl bg-[#1E1E1E] border border-white/5 flex items-center justify-center gap-2 hover:bg-white/5 transition-colors group"
          >
            <User size={16} className="text-purple-400" />
            <div className="text-left">
              <span className="block text-xs font-bold text-white">Avatars</span>
              <span className="block text-[10px] text-gray-500 group-hover:text-gray-300">HeyGen + 11Labs</span>
            </div>
          </button>
          
          <button 
            onClick={() => setLocation("/store")}
            className="min-w-[140px] py-3 px-4 rounded-xl bg-[#1E1E1E] border border-white/5 flex items-center justify-center gap-2 hover:bg-white/5 transition-colors group"
          >
            <ShoppingBag size={16} className="text-[#95BF47]" />
            <div className="text-left">
              <span className="block text-xs font-bold text-white">Store</span>
              <span className="block text-[10px] text-gray-500 group-hover:text-gray-300">Shopify</span>
            </div>
          </button>
          
          <button 
            onClick={() => setLocation("/context")}
            className="min-w-[140px] py-3 px-4 rounded-xl bg-[#1E1E1E] border border-white/5 flex items-center justify-center gap-2 hover:bg-white/5 transition-colors group"
          >
            <BrainCircuit size={16} className="text-blue-400" />
            <div className="text-left">
              <span className="block text-xs font-bold text-white">Context</span>
              <span className="block text-[10px] text-gray-500 group-hover:text-gray-300">MCP Active</span>
            </div>
          </button>
        </div>

        {/* Model Selector (New) */}
        <div className="mb-6">
          <label className="text-xs font-medium text-gray-400 uppercase mb-2 block">Generation Model</label>
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

        {/* Tab Selector */}
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
            onClick={() => setLocation("/camera")}
            className="flex-1 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 text-accent hover:bg-accent/10 hover:text-accent"
          >
            <CameraIcon size={16} />
            AR Cam
          </button>
        </div>

        {/* Format Toggle for Carousel (New) */}
        {activeTab === "image" && (
          <div className="flex items-center gap-2 mb-4 px-1">
            <button 
              onClick={() => setIsCarouselMode(!isCarouselMode)}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border transition-all",
                isCarouselMode 
                  ? "bg-primary/20 border-primary text-primary" 
                  : "bg-white/5 border-transparent text-gray-400 hover:bg-white/10"
              )}
            >
              <Layers size={14} />
              Carousel Mode
            </button>
            {isCarouselMode && <span className="text-[10px] text-gray-500 animate-in fade-in">Generates 5 sequential slides</span>}
          </div>
        )}

        {/* Main Input */}
        <div className="relative mb-8 group">
          <textarea 
            className="w-full h-48 bg-[#1E1E1E] rounded-2xl p-4 text-lg text-white placeholder:text-gray-600 resize-none focus:outline-none border border-transparent focus:border-white/10 focus:bg-[#252525] transition-all"
            placeholder="Describe your dream..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <div className="absolute bottom-4 right-4">
             <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
               <Sparkles size={18} />
             </button>
          </div>
        </div>

        {/* Style Parameters */}
        <div className="mb-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Style Preset</h3>
            <button className="text-xs text-accent hover:underline">View All</button>
          </div>
          
          <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar -mx-6 px-6">
            {styles.map((style) => (
              <button
                key={style}
                onClick={() => setSelectedStyle(style)}
                className={cn(
                  "px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap border transition-all",
                  selectedStyle === style 
                    ? "bg-[#1E1E1E] text-white border-accent shadow-[0_0_15px_-5px_rgba(34,211,238,0.3)]" 
                    : "bg-[#1E1E1E] text-gray-400 border-white/5 hover:border-white/20 hover:text-gray-200"
                )}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <div className="mt-8">
          <GradientButton onClick={() => setLocation("/result")}>
            GENERATE <span className="opacity-70 text-sm ml-1 font-normal">(5 Credits)</span>
          </GradientButton>
        </div>
      </div>
    </Layout>
  );
}
