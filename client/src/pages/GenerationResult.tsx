import React from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { GradientButton } from "@/components/GradientButton";
import { ArrowLeft, Wand2, Scaling, SlidersHorizontal, Download, Share2 } from "lucide-react";
import resultImage from "@assets/generated_images/cyberpunk_anime_character_for_generation_result.png";

export default function GenerationResult() {
  const [, setLocation] = useLocation();

  return (
    <Layout hideTabs>
      <div className="p-6 pt-12 flex flex-col h-full min-h-screen bg-background">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => setLocation("/create")}
            className="p-2 -ml-2 rounded-full hover:bg-white/10 text-white transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-display font-bold text-white">Generation Result</h1>
          <div className="ml-auto flex gap-2">
             <button className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
               <Download size={20} />
             </button>
          </div>
        </div>

        {/* Result Preview */}
        <div className="aspect-square w-full rounded-2xl overflow-hidden bg-[#1E1E1E] border border-white/10 relative shadow-2xl mb-8 group">
          <img 
            src={resultImage} 
            alt="Generated Result" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none" />
        </div>

        {/* Action Row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-[#1E1E1E] border border-white/5 hover:bg-[#252525] hover:border-white/10 transition-all group">
            <Wand2 size={20} className="text-gray-400 group-hover:text-accent transition-colors" />
            <span className="text-xs font-medium text-gray-400 group-hover:text-white">Vary</span>
          </button>
          
          <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-[#1E1E1E] border border-white/5 hover:bg-[#252525] hover:border-white/10 transition-all group">
            <Scaling size={20} className="text-gray-400 group-hover:text-accent transition-colors" />
            <span className="text-xs font-medium text-gray-400 group-hover:text-white">Upscale</span>
          </button>

          <button 
            onClick={() => setLocation("/editor")}
            className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-[#1E1E1E] border border-white/5 hover:bg-[#252525] hover:border-white/10 transition-all group"
          >
            <SlidersHorizontal size={20} className="text-gray-400 group-hover:text-accent transition-colors" />
            <span className="text-xs font-medium text-gray-400 group-hover:text-white">Edit</span>
          </button>
        </div>

        {/* Prompt Details (Optional expansion) */}
        <div className="mb-auto px-2">
          <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Prompt</h4>
          <p className="text-sm text-gray-300 leading-relaxed">
            Cyberpunk anime character portrait, female, glowing neon purple and cyan accents, futuristic city background...
          </p>
        </div>

        {/* Post Button */}
        <div className="mt-8 pb-8">
          <GradientButton variant="secondary" onClick={() => setLocation("/")}>
            POST TO FEED
          </GradientButton>
        </div>
      </div>
    </Layout>
  );
}
