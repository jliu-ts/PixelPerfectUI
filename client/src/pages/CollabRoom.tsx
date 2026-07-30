import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { GradientButton } from "@/components/GradientButton";
import { 
  ArrowLeft, 
  Users, 
  MessageSquare, 
  Play, 
  Mic, 
  Layers, 
  Plus, 
  CheckCircle2, 
  Loader2, 
  ArrowUpRight,
  Video,
  Image as ImageIcon,
  MoreHorizontal,
  Send,
  Paperclip,
  Smile,
  Bot,
  Sparkles,
  Settings,
  Share2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import sceneOneImage from "@assets/generated_images/cyber_sneaker_scene_1.webp";
import sceneTwoImage from "@assets/generated_images/cyber_sneaker_scene_2.webp";
import thumbnailImage from "@assets/generated_images/cyber_sneaker_thumbnail.webp";

// Enhanced Mock Data
const TEAM_MEMBERS = [
  { id: 1, name: "Sarah (Editor)", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah", status: "online", role: "Editor" },
  { id: 2, name: "Mike (Script)", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike", status: "editing", role: "Writer" },
  { id: 3, name: "AI Agent", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=AI", status: "generating", role: "AI Assistant" },
  { id: 4, name: "Felix (Director)", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix", status: "online", role: "You" },
];

const INITIAL_MESSAGES = [
  { id: 1, user: "Mike (Script)", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike", text: "I changed the hook to be more punchy. Check line 3.", time: "2m ago" },
  { id: 2, user: "Sarah (Editor)", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah", text: "Love it. I'm syncing the B-roll to that beat now.", time: "1m ago" },
  { id: 3, user: "AI Agent", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=AI", text: "Generated 3 variations of the thumbnail based on the new hook.", time: "Just now", isAi: true },
];

const SCRIPT_LINES = [
  { id: 1, role: "Hook", text: "Tired of sneakers that look... boring?", type: "video", duration: "0:05" },
  { id: 2, role: "Body", text: "Meet the Cyber-X. Holographic leather that changes with your mood.", type: "video", duration: "0:12" },
  { id: 3, role: "CTA", text: "Link in bio to cop the drop.", type: "audio", duration: "0:03" },
];

interface Asset {
  id: number;
  label: string;
  image: string;
  status: "ready" | "generating";
  kind: "video" | "image";
}

// Scene 2 starts in flight so the live-session fiction is visible on load, then lands via
// GENERATING_MS. Held in state because a hardcoded generating card can never finish.
const INITIAL_ASSETS: Asset[] = [
  { id: 1, label: "Scene 1 v2", image: sceneOneImage, status: "ready", kind: "video" },
  { id: 2, label: "Thumbnail", image: thumbnailImage, status: "ready", kind: "image" },
  { id: 3, label: "Scene 2", image: sceneTwoImage, status: "generating", kind: "video" },
];

const GENERATING_MS = 5000;

export default function CollabRoom() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [activeScriptLine, setActiveScriptLine] = useState(2);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [newMessage, setNewMessage] = useState("");
  const [assets, setAssets] = useState<Asset[]>(INITIAL_ASSETS);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const isAgentGenerating = assets.some(a => a.status === "generating");

  useEffect(() => {
    if (!isAgentGenerating) return;
    const timer = setTimeout(() => {
      const landed = assets.filter(a => a.status === "generating").map(a => a.label);
      setAssets(prev => prev.map(a => a.status === "generating" ? { ...a, status: "ready" } : a));
      setMessages(prev => [...prev, {
        id: Date.now(),
        user: "AI Agent",
        avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=AI",
        text: `${landed.join(" and ")} finished rendering. Ready for review.`,
        time: "Just now",
        isAi: true,
      }]);
      toast({ title: "Render Complete", description: `${landed.join(", ")} added to Generated Assets.` });
    }, GENERATING_MS);
    return () => clearTimeout(timer);
  }, [assets, isAgentGenerating, toast]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!newMessage.trim()) return;

    const msg = {
      id: Date.now(),
      user: "Felix (Director)",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
      text: newMessage,
      time: "Just now",
      isAi: false
    };

    setMessages([...messages, msg]);
    setNewMessage("");

    // Simulate AI response
    if (newMessage.toLowerCase().includes("ai") || newMessage.toLowerCase().includes("generate")) {
      setTimeout(() => {
        const aiMsg = {
          id: Date.now() + 1,
          user: "AI Agent",
          avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=AI",
          text: "I'm on it. Processing your request now...",
          time: "Just now",
          isAi: true
        };
        setMessages(prev => [...prev, aiMsg]);
      }, 1500);
    }
  };

  return (
    <Layout hideTabs>
      <div className="min-h-screen bg-background flex flex-col h-screen overflow-hidden">
        
        {/* Header */}
        <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b border-white/5 p-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <button aria-label="Go back" 
              onClick={() => setLocation("/create")}
              className="p-2 -ml-2 rounded-full hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="font-display text-xl font-bold text-foreground flex items-center gap-3">
                Collab Room
                <span className="px-2.5 py-0.5 rounded-full bg-green-500/10 text-green-400 text-[10px] border border-green-500/20 flex items-center gap-1.5 animate-in fade-in">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  Live Session
                </span>
              </h1>
              <p className="text-xs text-gray-400 hidden md:block">Project: Cyber Sneakers Launch • v2.4</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {TEAM_MEMBERS.map(member => {
                // The agent's badge tracks the render queue, so it stops pulsing when work lands.
                const status = member.status === "generating" && !isAgentGenerating ? "online" : member.status;
                return (
                <div key={member.id} className="group relative">
                  <div className={cn(
                    "w-9 h-9 rounded-full border-2 border-[#121212] overflow-hidden transition-transform hover:scale-110 hover:z-10 cursor-pointer",
                    status === "generating" ? "ring-2 ring-purple-500 ring-offset-2 ring-offset-black" : ""
                  )} title={`${member.name} - ${status}`}>
                    <img loading="lazy" decoding="async" src={member.avatar} alt={member.name} className="w-full h-full bg-gray-800" />
                  </div>
                  {status === "online" && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#121212] rounded-full" />}
                  {status === "editing" && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-blue-500 border-2 border-[#121212] rounded-full" />}
                  {status === "generating" && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-purple-500 border-2 border-[#121212] rounded-full animate-pulse" />}
                </div>
                );
              })}
              <button aria-label="Add" className="w-9 h-9 rounded-full border-2 border-[#121212] bg-[#2A2A2A] flex items-center justify-center text-white hover:bg-[#333] transition-colors z-0">
                <Plus size={14} />
              </button>
            </div>
            
            <div className="h-8 w-[1px] bg-white/10 hidden md:block" />
            
            <button aria-label="Settings" className="p-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
              <Settings size={20} />
            </button>
            <GradientButton size="sm" className="hidden md:flex gap-2">
              <Share2 size={14} /> Share
            </GradientButton>
          </div>
        </div>

        {/* Main Workspace Grid */}
        <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
          
          {/* Left Panel: Script & Assets */}
          <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            
            {/* Script Editor */}
            <div className="bg-[#121212] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
              <div className="p-4 bg-[#1A1A1A] border-b border-white/5 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                    <Video size={16} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Script & Storyboard</h3>
                    <p className="text-[10px] text-gray-500">Last edited by Mike • 2m ago</p>
                  </div>
                </div>
                <button 
                  onClick={() => setLocation("/writer")}
                  className="text-xs font-bold text-accent hover:text-white flex items-center gap-1.5 transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5"
                >
                  Open Writer <ArrowUpRight size={12} />
                </button>
              </div>
              
              <div className="p-4 space-y-1">
                {SCRIPT_LINES.map((line, index) => (
                  <div 
                    key={line.id} 
                    onClick={() => setActiveScriptLine(line.id)}
                    className={cn(
                      "p-4 rounded-xl border transition-all cursor-pointer group relative flex gap-4 items-start",
                      activeScriptLine === line.id 
                        ? "bg-accent/5 border-accent/30" 
                        : "bg-transparent border-transparent hover:bg-white/5"
                    )}
                  >
                    {/* Line Number */}
                    <span className="text-xs font-mono text-gray-600 pt-1 w-6 text-right shrink-0">
                      {index + 1}
                    </span>

                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            "text-[10px] font-bold uppercase px-2 py-0.5 rounded border",
                            line.role === "Hook" ? "bg-pink-500/10 text-pink-400 border-pink-500/20" :
                            line.role === "CTA" ? "bg-green-500/10 text-green-400 border-green-500/20" :
                            "bg-blue-500/10 text-blue-400 border-blue-500/20"
                          )}>
                            {line.role}
                          </span>
                          <span className="text-[10px] text-gray-500 font-mono">{line.duration}</span>
                        </div>
                        
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          {line.type === "video" && <button aria-label="Play" className="p-1.5 hover:text-white text-gray-500 min-h-6 min-w-6 inline-flex items-center justify-center"><Play size={12} /></button>}
                          {line.type === "audio" && <button aria-label="Record audio" className="p-1.5 hover:text-white text-gray-500 min-h-6 min-w-6 inline-flex items-center justify-center"><Mic size={12} /></button>}
                        </div>
                      </div>
                      
                      <p className={cn(
                        "text-sm font-medium leading-relaxed",
                        activeScriptLine === line.id ? "text-white" : "text-gray-300"
                      )}>
                        {line.text}
                      </p>
                    </div>
                    
                    {/* Collaboration Cursor */}
                    {line.id === 2 && (
                      <div className="absolute -right-2 top-2 flex items-center gap-1 bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg z-10 animate-pulse">
                        <span className="w-1.5 h-1.5 bg-white rounded-full" />
                        Mike
                      </div>
                    )}
                  </div>
                ))}
                
                <button className="w-full py-3 text-xs font-medium text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors border border-dashed border-transparent hover:border-white/10 flex items-center justify-center gap-2">
                  <Plus size={14} /> Add Scene
                </button>
              </div>
            </div>

            {/* Generated Assets */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-gray-400 uppercase flex items-center gap-2">
                  <Layers size={14} /> Generated Assets
                </h3>
                <button className="text-[10px] text-accent hover:underline inline-flex items-center min-h-6">View All</button>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {assets.map(asset => asset.status === "generating" ? (
                  <div key={asset.id} className="aspect-video bg-[#121212] rounded-xl border border-dashed border-white/10 relative overflow-hidden flex flex-col items-center justify-center gap-2 cursor-wait">
                    <div className="relative">
                      <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full animate-pulse" />
                      <Loader2 size={24} className="text-accent animate-spin relative z-10" />
                    </div>
                    <span className="text-[10px] font-bold text-accent/80 animate-pulse">Generating {asset.label}...</span>
                  </div>
                ) : (
                  <div key={asset.id} className="aspect-video bg-black rounded-xl border border-white/10 relative overflow-hidden group cursor-pointer animate-in fade-in duration-500">
                    <img loading="lazy" decoding="async" src={asset.image} alt={asset.label} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    {asset.kind === "video" ? (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all bg-black/40 backdrop-blur-[1px]">
                        <Play size={32} className="text-white drop-shadow-lg scale-90 group-hover:scale-100 transition-transform" />
                      </div>
                    ) : (
                      <div className="absolute top-2 right-2">
                        <div className="p-1 rounded-md bg-black/60 text-white"><ImageIcon size={12} /></div>
                      </div>
                    )}
                    <div className="absolute bottom-2 left-2 right-2 flex justify-between items-end">
                      <span className="text-[10px] font-bold bg-black/60 backdrop-blur-md px-2 py-1 rounded text-white border border-white/10">{asset.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Panel: Live Chat */}
          <div className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-white/10 bg-[#0F0F0F] flex flex-col h-[40vh] lg:h-auto shrink-0">
            <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between bg-[#121212]">
              <div className="flex items-center gap-2">
                <MessageSquare size={14} className="text-gray-400" />
                <span className="text-xs font-bold text-white">Team Chat</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] text-gray-500">3 Online</span>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {messages.map((msg) => (
                <div key={msg.id} className={cn("flex gap-3 group", msg.user === "Felix (Director)" && "flex-row-reverse")}>
                  <div className={cn(
                    "w-8 h-8 rounded-full shrink-0 overflow-hidden border border-white/10",
                    msg.isAi ? "bg-purple-500/10 p-1" : "bg-gray-800"
                  )}>
                     <img alt="" loading="lazy" decoding="async" src={msg.avatar} className="w-full h-full object-cover rounded-full" />
                  </div>
                  
                  <div className={cn("flex flex-col max-w-[80%]", msg.user === "Felix (Director)" && "items-end")}>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className={cn(
                        "text-[10px] font-bold",
                        msg.isAi ? "text-purple-400 flex items-center gap-1" : "text-gray-300"
                      )}>
                        {msg.isAi && <Sparkles size={8} />}
                        {msg.user}
                      </span>
                      <span className="text-[10px] text-gray-600">{msg.time}</span>
                    </div>
                    
                    <div className={cn(
                      "p-3 rounded-2xl text-xs leading-relaxed",
                      msg.isAi 
                        ? "bg-purple-500/10 text-purple-100 border border-purple-500/20 rounded-tl-none" 
                        : msg.user === "Felix (Director)"
                          ? "bg-accent text-black font-medium rounded-tr-none"
                          : "bg-[#1E1E1E] text-gray-300 border border-white/5 rounded-tl-none"
                    )}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            
            <div className="p-4 border-t border-white/5 bg-[#121212]">
              <form 
                onSubmit={handleSendMessage}
                className="flex items-center gap-2 bg-[#1A1A1A] border border-white/10 rounded-xl p-1.5 focus-within:border-accent/50 transition-colors"
              >
                <button aria-label="Attach file" type="button" className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-colors">
                  <Paperclip size={16} />
                </button>
                <input 
                  type="text" 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..." 
                  className="flex-1 bg-transparent text-xs text-white focus:outline-none placeholder:text-gray-600"
                />
                <button aria-label="AI assistant" type="button" className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-colors">
                  <Bot size={16} />
                </button>
                <button aria-label="Send" 
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="p-2 rounded-lg bg-accent text-black disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110 transition-all"
                >
                  <Send size={14} />
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}