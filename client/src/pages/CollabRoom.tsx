import React, { useState } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { GradientButton } from "@/components/GradientButton";
import { ArrowLeft, Users, MessageSquare, Play, Mic, Layers, Plus, CheckCircle2, Loader2, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import collabBg from "@assets/generated_images/futuristic_holographic_collaborative_workspace.png";

const TEAM_MEMBERS = [
  { id: 1, name: "Sarah (Editor)", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah", status: "online" },
  { id: 2, name: "Mike (Script)", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike", status: "editing" },
  { id: 3, name: "AI Agent", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=AI", status: "generating" },
];

const CHAT_MESSAGES = [
  { id: 1, user: "Mike (Script)", text: "I changed the hook to be more punchy. Check line 3.", time: "2m ago" },
  { id: 2, user: "Sarah (Editor)", text: "Love it. I'm syncing the B-roll to that beat now.", time: "1m ago" },
  { id: 3, user: "AI Agent", text: "Generated 3 variations of the thumbnail based on the new hook.", time: "Just now" },
];

export default function CollabRoom() {
  const [, setLocation] = useLocation();
  const [activeScriptLine, setActiveScriptLine] = useState(2);

  return (
    <Layout hideTabs>
      <div className="min-h-screen bg-background flex flex-col">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b border-white/5 p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setLocation("/create")}
              className="p-2 -ml-2 rounded-full hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
                Writer's Room
                <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-[10px] border border-green-500/20 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Live
                </span>
              </h1>
            </div>
          </div>
          
          <div className="flex -space-x-2">
            {TEAM_MEMBERS.map(member => (
              <div key={member.id} className="w-8 h-8 rounded-full border-2 border-[#121212] bg-gray-800 overflow-hidden relative tooltip" title={member.name}>
                <img src={member.avatar} alt={member.name} className="w-full h-full" />
                {member.status === "online" && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#121212] rounded-full" />}
              </div>
            ))}
            <button className="w-8 h-8 rounded-full border-2 border-[#121212] bg-[#2A2A2A] flex items-center justify-center text-white hover:bg-[#333] transition-colors">
              <Plus size={14} />
            </button>
          </div>
        </div>

        {/* Main Workspace */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          
          {/* Script Editor Section */}
          <div className="bg-[#1E1E1E] border border-white/5 rounded-xl overflow-hidden">
            <div className="p-3 bg-white/5 border-b border-white/5 flex justify-between items-center">
              <h3 className="text-xs font-bold text-gray-400 uppercase">Script & Storyboard</h3>
              <button 
                onClick={() => setLocation("/writer")}
                className="text-[10px] text-accent hover:text-white flex items-center gap-1 transition-colors"
              >
                Open in Writer <ArrowUpRight size={10} />
              </button>
            </div>
            <div className="p-4 space-y-4">
              {[
                { id: 1, role: "Hook", text: "Tired of sneakers that look... boring?", type: "video" },
                { id: 2, role: "Body", text: "Meet the Cyber-X. Holographic leather that changes with your mood.", type: "video" },
                { id: 3, role: "CTA", text: "Link in bio to cop the drop.", type: "audio" },
              ].map((line) => (
                <div 
                  key={line.id} 
                  onClick={() => setActiveScriptLine(line.id)}
                  className={cn(
                    "p-3 rounded-lg border transition-all cursor-pointer group relative",
                    activeScriptLine === line.id 
                      ? "bg-primary/10 border-primary/50" 
                      : "bg-black/20 border-white/5 hover:border-white/10"
                  )}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-bold text-gray-500 uppercase bg-white/5 px-2 py-0.5 rounded">{line.role}</span>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {line.type === "video" && <Play size={12} className="text-gray-400" />}
                      {line.type === "audio" && <Mic size={12} className="text-gray-400" />}
                    </div>
                  </div>
                  <p className="text-sm text-white font-medium">{line.text}</p>
                  
                  {/* User Cursor Indicator */}
                  {line.id === 2 && (
                    <div className="absolute -right-2 -top-2 flex items-center bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded-full shadow-lg z-10">
                      Mike is editing...
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Asset Stream */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase mb-3 flex items-center gap-2">
              <Layers size={14} /> Generated Assets
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="aspect-video bg-black rounded-lg border border-white/10 relative overflow-hidden group">
                <img src="https://picsum.photos/seed/shoe1/300/169" className="w-full h-full object-cover opacity-70" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Play size={24} className="text-white drop-shadow-lg" />
                </div>
                <div className="absolute bottom-2 left-2">
                  <span className="text-[10px] bg-black/60 backdrop-blur px-2 py-0.5 rounded text-white">Scene 1 v2</span>
                </div>
              </div>
              <div className="aspect-video bg-black rounded-lg border border-white/10 relative overflow-hidden flex items-center justify-center">
                <Loader2 size={24} className="text-accent animate-spin" />
                <span className="absolute bottom-4 text-[10px] text-accent">Generating Scene 2...</span>
              </div>
            </div>
          </div>

        </div>

        {/* Live Chat / Activity */}
        <div className="h-48 border-t border-white/10 bg-[#121212] flex flex-col">
          <div className="px-4 py-2 border-b border-white/5 flex items-center gap-2">
            <MessageSquare size={14} className="text-gray-400" />
            <span className="text-xs font-bold text-gray-300">Team Chat</span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {CHAT_MESSAGES.map(msg => (
              <div key={msg.id} className="flex gap-2">
                <div className="w-6 h-6 rounded-full bg-gray-700 shrink-0 overflow-hidden">
                   <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${msg.user}`} className="w-full h-full" />
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-[10px] font-bold text-white">{msg.user}</span>
                    <span className="text-[10px] text-gray-600">{msg.time}</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-tight">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-2 border-t border-white/5">
            <input 
              type="text" 
              placeholder="Type a message..." 
              className="w-full bg-[#1E1E1E] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-white/30"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
