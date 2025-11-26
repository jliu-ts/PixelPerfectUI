import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { GradientButton } from "@/components/GradientButton";
import { Image as ImageIcon, Film, Type, Sparkles, Camera as CameraIcon, Lightbulb, ChevronDown, Layers, Palette, BrainCircuit, ShoppingBag, User, Users, Store, Bot, Mic, Rocket, Library } from "lucide-react";
import { cn } from "@/lib/utils";

const styles = [
  "Anime", "Cinematic", "3D Render", "Oil Painting", "Cyberpunk", "Studio Ghibli", "Polaroid", "Vaporwave", "Minimalist"
];

const VIDEO_MODELS = ["Google Veo", "Sora", "Runway Gen-2", "Pika 1.0"];
const IMAGE_MODELS = ["Midjourney v6", "DALL-E 3", "Stable Diffusion XL", "Adobe Firefly"];

export default function CreationStudio() {
  const [location, setLocation] = useLocation();
  const locationState = window.history.state?.usr;
  
  const [activeTab, setActiveTab] = useState<"text" | "image" | "video" | "audio">((locationState?.mode as any) || "image");
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
          <textarea 
            className="w-full h-40 bg-[#1E1E1E] rounded-2xl p-4 text-lg text-white placeholder:text-gray-600 resize-none focus:outline-none border border-transparent focus:border-white/10 focus:bg-[#252525] transition-all"
            placeholder={activeTab === "text" ? "What would you like to write?" : "Describe your dream..."}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <div className="absolute bottom-4 right-4 flex gap-2">
             {activeTab === "image" && (
               <button 
                 onClick={() => setIsCarouselMode(!isCarouselMode)}
                 className={cn(
                   "p-2 rounded-lg transition-colors flex items-center gap-2 text-xs font-bold",
                   isCarouselMode ? "bg-primary/20 text-primary" : "bg-white/5 text-gray-400 hover:text-white"
                 )}
               >
                 <Layers size={16} />
                 {isCarouselMode ? "Carousel On" : ""}
               </button>
             )}
             <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
               <Sparkles size={18} />
             </button>
          </div>
        </div>

        {/* Model & Style Settings */}
        <div className="grid grid-cols-2 gap-4 mb-8">
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
    </Layout>
  );
}
