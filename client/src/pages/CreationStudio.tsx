import React, { useState } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { GradientButton } from "@/components/GradientButton";
import { Image as ImageIcon, Film, Type, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const styles = [
  "Anime", "Cinematic", "3D Render", "Oil Painting", "Cyberpunk", "Studio Ghibli", "Polaroid", "Vaporwave"
];

export default function CreationStudio() {
  const [activeTab, setActiveTab] = useState<"text" | "image" | "video">("image");
  const [selectedStyle, setSelectedStyle] = useState("Cinematic");
  const [, setLocation] = useLocation();

  return (
    <Layout>
      <div className="p-6 pt-12 flex flex-col h-full min-h-[80vh]">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-display font-bold text-white">Creation Studio</h1>
          <div className="flex items-center gap-1 bg-white/5 px-3 py-1 rounded-full border border-white/5">
            <Sparkles size={14} className="text-accent" />
            <span className="text-xs font-medium text-white">320 Credits</span>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex p-1 bg-[#1E1E1E] rounded-xl mb-8 border border-white/5">
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
        </div>

        {/* Main Input */}
        <div className="relative mb-8 group">
          <textarea 
            className="w-full h-48 bg-[#1E1E1E] rounded-2xl p-4 text-lg text-white placeholder:text-gray-600 resize-none focus:outline-none border border-transparent focus:border-white/10 focus:bg-[#252525] transition-all"
            placeholder="Describe your dream..."
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
