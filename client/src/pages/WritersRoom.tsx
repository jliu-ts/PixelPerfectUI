import React, { useState } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { GradientButton } from "@/components/GradientButton";
import { 
  ArrowLeft, 
  Type, 
  Image as ImageIcon, 
  MoreHorizontal, 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  List, 
  Link2, 
  Sparkles, 
  History,
  Bot,
  CheckCircle2,
  Share2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock Lexical Editor State
const INITIAL_CONTENT = [
  { type: "heading", content: "Cyber Sneakers Launch Campaign" },
  { type: "paragraph", content: "The goal of this campaign is to target Gen Z creators with a futuristic, high-energy vibe. We need to emphasize the holographic leather and the adaptive fit technology." },
  { type: "bullet", content: "Hook: Tired of sneakers that look... boring?" },
  { type: "bullet", content: "Body: Meet the Cyber-X. Holographic leather that changes with your mood." },
  { type: "bullet", content: "CTA: Link in bio to cop the drop." },
];

export default function WritersRoom() {
  const [, setLocation] = useLocation();
  const [content, setContent] = useState(INITIAL_CONTENT);
  const [isAIActive, setIsAIActive] = useState(false);

  const handleAIImprove = () => {
    setIsAIActive(true);
    setTimeout(() => {
      setIsAIActive(false);
      // Mock improvement
      const newContent = [...content];
      newContent[1].content = "Our mission: Captivate Gen Z creators with a neon-soaked, high-voltage aesthetic. Spotlight the chromatic leather shift and neural-adaptive fit.";
      setContent(newContent);
    }, 1500);
  };

  return (
    <Layout hideTabs>
      <div className="min-h-screen bg-background flex flex-col">
        
        {/* Header */}
        <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b border-white/5 p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setLocation("/collab")}
              className="p-2 -ml-2 rounded-full hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
                Writer's Room
                <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-[10px] px-1.5 h-5">
                  Lexical Powered
                </Badge>
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
             <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full border-2 border-[#121212] bg-purple-500 flex items-center justify-center text-xs font-bold text-white">FK</div>
                <div className="w-8 h-8 rounded-full border-2 border-[#121212] bg-green-500 flex items-center justify-center text-xs font-bold text-white">SJ</div>
             </div>
             <button className="p-2 rounded-full hover:bg-white/10 text-white transition-colors">
               <Share2 size={20} />
             </button>
          </div>
        </div>

        {/* Editor Toolbar */}
        <div className="px-4 py-2 bg-[#1E1E1E] border-b border-white/5 flex items-center gap-4 overflow-x-auto no-scrollbar">
           <div className="flex items-center gap-1 border-r border-white/10 pr-4">
             <button className="p-2 rounded hover:bg-white/5 text-gray-400 hover:text-white"><Bold size={18} /></button>
             <button className="p-2 rounded hover:bg-white/5 text-gray-400 hover:text-white"><Italic size={18} /></button>
             <button className="p-2 rounded hover:bg-white/5 text-gray-400 hover:text-white"><Underline size={18} /></button>
           </div>
           <div className="flex items-center gap-1 border-r border-white/10 pr-4">
             <button className="p-2 rounded hover:bg-white/5 text-gray-400 hover:text-white"><AlignLeft size={18} /></button>
             <button className="p-2 rounded hover:bg-white/5 text-gray-400 hover:text-white"><AlignCenter size={18} /></button>
             <button className="p-2 rounded hover:bg-white/5 text-gray-400 hover:text-white"><AlignRight size={18} /></button>
           </div>
           <div className="flex items-center gap-1">
             <button className="p-2 rounded hover:bg-white/5 text-gray-400 hover:text-white"><List size={18} /></button>
             <button className="p-2 rounded hover:bg-white/5 text-gray-400 hover:text-white"><Link2 size={18} /></button>
             <button className="p-2 rounded hover:bg-white/5 text-gray-400 hover:text-white"><ImageIcon size={18} /></button>
           </div>
        </div>

        {/* Editor Content Area */}
        <div className="flex-1 p-6 max-w-3xl mx-auto w-full">
          <div className="min-h-[60vh] bg-transparent outline-none text-gray-200 space-y-6 font-sans">
            {content.map((block, i) => (
              <div key={i} className={cn(
                "relative group transition-all",
                block.type === "heading" && "text-3xl font-bold text-white mb-6",
                block.type === "paragraph" && "text-base leading-relaxed text-gray-300",
                block.type === "bullet" && "flex gap-3 items-start pl-4 border-l-2 border-white/10"
              )}>
                {block.type === "bullet" && <div className="w-1.5 h-1.5 rounded-full bg-gray-500 mt-2 shrink-0" />}
                <p className="outline-none focus:bg-white/5 rounded px-1">{block.content}</p>
                
                {/* AI Assistant Trigger (Hover) */}
                <div className="absolute -right-12 top-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={handleAIImprove}
                    className="p-2 rounded-full bg-gradient-accent text-black shadow-lg hover:scale-110 transition-transform"
                    title="AI Rewrite"
                  >
                    <Sparkles size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Floating Action Bar */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-md">
           {isAIActive ? (
             <Card className="p-4 bg-[#1E1E1E] border-accent/50 shadow-[0_0_30px_-10px_rgba(34,211,238,0.3)] flex items-center gap-3 animate-in slide-in-from-bottom-4">
               <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center animate-spin">
                 <Bot size={16} className="text-accent" />
               </div>
               <div className="flex-1">
                 <p className="text-xs font-bold text-white">Rewriting with creative flair...</p>
                 <p className="text-[10px] text-gray-400">Powered by Llama 3</p>
               </div>
             </Card>
           ) : (
             <div className="flex justify-center">
               <button 
                 onClick={handleAIImprove}
                 className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#1E1E1E] border border-white/10 shadow-xl hover:bg-[#252525] transition-all group"
               >
                 <Sparkles size={16} className="text-accent group-hover:rotate-12 transition-transform" />
                 <span className="text-sm font-bold text-white">Ask Society AI to edit</span>
               </button>
             </div>
           )}
        </div>

      </div>
    </Layout>
  );
}
