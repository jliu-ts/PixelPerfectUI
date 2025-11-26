import React, { useState, useRef } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  Scissors, 
  Music, 
  Type, 
  Sticker, 
  Wand2, 
  Zap, 
  Timer, 
  Check,
  Undo2,
  Redo2,
  ChevronRight,
  Layers,
  Palette,
  Download
} from "lucide-react";
import { cn } from "@/lib/utils";
import { GradientButton } from "@/components/GradientButton";
import { useToast } from "@/hooks/use-toast";
import resultImage from "@assets/generated_images/cyberpunk_anime_character_for_generation_result.png";

// Mock data for tools
const TOOLS = [
  { id: "trim", icon: Scissors, label: "Trim" },
  { id: "music", icon: Music, label: "Music" },
  { id: "text", icon: Type, label: "Text" },
  { id: "stickers", icon: Sticker, label: "Stickers" },
  { id: "effects", icon: Wand2, label: "Effects" },
  { id: "filters", icon: Palette, label: "Filters" },
  { id: "speed", icon: Timer, label: "Speed" },
  { id: "beauty", icon: Zap, label: "Beauty" },
];

const FILTERS = [
  { id: "none", name: "Normal", color: "#333" },
  { id: "vivid", name: "Vivid", color: "#FF5733" },
  { id: "mono", name: "Mono", color: "#000" },
  { id: "cool", name: "Cool", color: "#33C1FF" },
  { id: "warm", name: "Warm", color: "#FFC300" },
  { id: "cyber", name: "Cyber", color: "#D500F9" },
];

const EFFECTS = [
  { id: "none", name: "None" },
  { id: "glitch", name: "Glitch" },
  { id: "particles", name: "Particles" },
  { id: "neon", name: "Neon Glow" },
  { id: "mirror", name: "Mirror" },
];

export default function VideoEditor() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("none");
  const [selectedEffect, setSelectedEffect] = useState("none");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Simulate playing state
  const togglePlay = () => setIsPlaying(!isPlaying);

  const handleSave = () => {
    toast({
      title: "Project Saved",
      description: "Your edits have been saved to your draft.",
    });
  };

  return (
    <Layout hideTabs>
      <div className="flex flex-col h-[100dvh] bg-[#090909] text-white overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 z-10 bg-gradient-to-b from-black/80 to-transparent">
          <button 
            onClick={() => setLocation("/result")}
            className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className="flex gap-4">
            <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
              <Undo2 size={20} className="text-gray-400" />
            </button>
            <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
              <Redo2 size={20} className="text-gray-400" />
            </button>
            <button 
              onClick={handleSave}
              className="px-4 py-1.5 bg-white text-black font-bold rounded-full text-sm hover:bg-gray-200 transition-colors"
            >
              Save
            </button>
          </div>
        </div>

        {/* Main Preview Area */}
        <div className="flex-1 relative flex items-center justify-center overflow-hidden group">
          {/* Video Placeholder */}
          <div className="relative w-full h-full max-h-[60vh] aspect-[9/16] bg-black shadow-2xl mx-auto overflow-hidden">
            <img 
              src={resultImage} 
              alt="Video Preview" 
              className={cn(
                "w-full h-full object-cover transition-all duration-300",
                selectedFilter === "mono" && "grayscale",
                selectedFilter === "vivid" && "saturate-150 contrast-110",
                selectedFilter === "cool" && "hue-rotate-180",
                selectedFilter === "cyber" && "contrast-125 hue-rotate-90 saturate-150",
                selectedEffect === "glitch" && "animate-pulse"
              )}
            />
            
            {/* Overlays (Simulated) */}
            {activeTool === "text" && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <h2 className="text-4xl font-display font-bold text-white drop-shadow-[0_0_10px_rgba(0,0,0,0.8)] animate-in zoom-in duration-300">
                  CYBER DREAM
                </h2>
              </div>
            )}

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors cursor-pointer" onClick={togglePlay}>
              {!isPlaying && (
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                  <Play size={32} className="ml-1 fill-white text-white" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Editor Controls Area */}
        <div className="bg-[#121212] border-t border-white/5 flex flex-col pb-safe">
          
          {/* Timeline (Always visible unless a complex tool is open) */}
          <div className="h-24 bg-[#0F0F0F] relative overflow-hidden py-4 px-2 border-b border-white/5">
            {/* Playhead */}
            <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white z-20 shadow-[0_0_10px_white]" />
            
            {/* Track */}
            <div className="flex items-center gap-1 h-16 px-[50vw] overflow-x-auto no-scrollbar snap-x">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="flex-shrink-0 w-16 h-16 bg-gray-800 rounded-md overflow-hidden relative group border border-white/5 snap-center">
                  <img src={resultImage} className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity" />
                </div>
              ))}
            </div>
          </div>

          {/* Active Tool Controls (Contextual) */}
          {activeTool ? (
            <div className="h-16 flex items-center px-4 gap-4 bg-[#1A1A1A] animate-in slide-in-from-bottom-4 fade-in duration-200">
              <button onClick={() => setActiveTool(null)} className="mr-2 text-gray-400 hover:text-white">
                <ArrowLeft size={20} />
              </button>
              
              <div className="flex-1 overflow-x-auto no-scrollbar flex items-center gap-4">
                {activeTool === "filters" && FILTERS.map(f => (
                  <button 
                    key={f.id}
                    onClick={() => setSelectedFilter(f.id)}
                    className={cn(
                      "flex flex-col items-center gap-1 min-w-[60px]",
                      selectedFilter === f.id ? "text-accent" : "text-gray-400"
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-full border-2 transition-all",
                      selectedFilter === f.id ? "border-accent scale-110" : "border-transparent bg-gray-800"
                    )} style={{ backgroundColor: f.color === "#333" ? undefined : f.color }} />
                    <span className="text-[10px] font-medium">{f.name}</span>
                  </button>
                ))}

                {activeTool === "effects" && EFFECTS.map(e => (
                  <button 
                    key={e.id}
                    onClick={() => setSelectedEffect(e.id)}
                    className={cn(
                      "px-4 py-1.5 rounded-full text-xs font-medium border transition-all whitespace-nowrap",
                      selectedEffect === e.id 
                        ? "bg-accent/10 border-accent text-accent" 
                        : "bg-white/5 border-transparent text-gray-400"
                    )}
                  >
                    {e.name}
                  </button>
                ))}

                {(activeTool !== "filters" && activeTool !== "effects") && (
                  <div className="w-full text-center text-gray-500 text-sm italic">
                    {TOOLS.find(t => t.id === activeTool)?.label} options coming soon
                  </div>
                )}
              </div>

              <button onClick={() => setActiveTool(null)} className="ml-2 p-2 rounded-full bg-white text-black">
                <Check size={16} />
              </button>
            </div>
          ) : (
            /* Main Tool Selector */
            <div className="h-20 flex items-center justify-between px-2 overflow-x-auto no-scrollbar gap-2">
              {TOOLS.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => setActiveTool(tool.id)}
                  className="flex flex-col items-center justify-center w-16 h-full gap-1.5 text-gray-400 hover:text-white active:scale-95 transition-all group flex-shrink-0"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#1E1E1E] border border-white/5 flex items-center justify-center group-hover:border-white/20 group-hover:bg-[#252525] transition-all">
                    <tool.icon size={20} className="group-hover:text-accent transition-colors" />
                  </div>
                  <span className="text-[10px] font-medium tracking-wide">{tool.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* Export Action */}
          <div className="p-4 border-t border-white/5 bg-black/40">
            <GradientButton onClick={() => setLocation("/share")} className="py-3 text-sm">
              NEXT: SHARE
            </GradientButton>
          </div>
        </div>
      </div>
    </Layout>
  );
}
