import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { 
  ArrowLeft, 
  Sparkles, 
  Globe, 
  BookOpen, 
  ArrowUpRight, 
  MoreHorizontal, 
  Copy, 
  ThumbsUp, 
  ThumbsDown,
  Bot,
  Layers,
  ChevronDown,
  ChevronUp,
  StopCircle,
  Paperclip,
  Plus,
  History,
  Share2,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Data for simulation
const SUGGESTIONS = [
  { icon: "🎵", text: "What are the top TikTok trends today?", category: "Social" },
  { icon: "🎨", text: "Explain the 'Frutiger Aero' aesthetic history", category: "Design" },
  { icon: "📈", text: "Best time to post on Instagram for artists?", category: "Growth" },
  { icon: "📝", text: "Generate a script for a tech review", category: "Content" }
];

const MOCK_RESPONSE = {
  answer: "The **'Frutiger Aero'** aesthetic, popular from roughly **2004 to 2013**, is characterized by glossy textures, water and bubble motifs, nature themes (tropical fish, grass, open sky), and skeuomorphism. \n\nIt comes from a stretch of techno-optimism where the future was drawn as clean, eco-friendly, and human-centric. It is resurging on TikTok and Instagram as Gen Z finds this 'lost future'.\n\nKey visual elements include:\n- Glossy buttons and glass effects (Windows Aero)\n- High-saturation grassy fields (Windows XP Bliss)\n- Futurism mixed with nature (Eco-Futurism)",
  sources: [
    { id: 1, title: "Aesthetics Wiki: Frutiger Aero", url: "aesthetics.fandom.com", icon: "https://upload.wikimedia.org/wikipedia/commons/6/6a/External_link_font_awesome.svg" },
    { id: 2, title: "The Verge: Why Gen Z loves 2000s UI", url: "theverge.com", icon: "https://upload.wikimedia.org/wikipedia/commons/a/a2/The_Verge_logo.svg" },
    { id: 3, title: "TikTok Trend Report 2024", url: "newsroom.tiktok.com", icon: "https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg" }
  ],
  related: [
    "How to create Frutiger Aero art in Midjourney?",
    "What replaced Frutiger Aero?",
    "Is Flat Design dead?"
  ]
};

const THINKING_STEPS = [
  "Searching the web for 'Frutiger Aero history'...",
  "Analyzing 5 key sources...",
  "Identifying visual patterns...",
  "Synthesizing answer..."
];

const CONTEXT_OPTIONS = [
  { id: "all", label: "Full Context", icon: Sparkles, color: "text-cyan-400" },
  { id: "web", label: "Web Search", icon: Globe, color: "text-blue-400" },
  { id: "workspace", label: "Google Drive", icon: "https://cdn.simpleicons.org/google/4285F4", type: "img" },
  { id: "slack", label: "Slack", icon: "https://cdn.simpleicons.org/slack/4A154B", type: "img" },
  { id: "notion", label: "Notion", icon: "https://cdn.simpleicons.org/notion/FFFFFF", type: "img" },
];

export default function DeepResearch() {
  const [, setLocation] = useLocation();
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [thinkingStepIndex, setThinkingStepIndex] = useState(0);
  const [isThinkingExpanded, setIsThinkingExpanded] = useState(true);
  const [activeContext, setActiveContext] = useState("all");
  const [isContextOpen, setIsContextOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, thinkingStepIndex]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    
    const userMsg = { id: Date.now(), role: "user", content: text };
    setMessages(prev => [...prev, userMsg]);
    setQuery("");
    setIsTyping(true);
    setThinkingStepIndex(0);
    setIsThinkingExpanded(true);

    // Simulate progressive thinking
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < THINKING_STEPS.length) {
        setThinkingStepIndex(step);
      } else {
        clearInterval(interval);
        setIsTyping(false);
        const botMsg = { 
          id: Date.now() + 1, 
          role: "assistant", 
          content: MOCK_RESPONSE.answer,
          sources: MOCK_RESPONSE.sources,
          related: MOCK_RESPONSE.related
        };
        setMessages(prev => [...prev, botMsg]);
      }
    }, 1200);
  };

  return (
    <Layout hideTabs>
      <div className="flex flex-col h-[100dvh] bg-background">
        
        {/* Standard Sticky Header */}
        <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b border-white/5 p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setLocation("/")}
              className="p-2 -ml-2 rounded-full hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-xl font-bold text-foreground">Deep Research</h1>
              <span className="text-[10px] font-bold bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/20 uppercase tracking-wider">
                Agent
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors">
              <History size={20} />
            </button>
            <button className="p-2 rounded-full hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors">
              <MoreHorizontal size={20} />
            </button>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-8 pb-32">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in duration-700 px-4">
              <div className="mb-8 relative group">
                <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full group-hover:bg-cyan-500/30 transition-all duration-1000" />
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#1E1E1E] to-black border border-white/10 flex items-center justify-center relative z-10 shadow-2xl group-hover:scale-105 transition-transform duration-500">
                  <Bot size={48} className="text-cyan-400" />
                  <div className="absolute top-2 right-2 w-3 h-3 bg-green-500 rounded-full border-2 border-[#1E1E1E]" />
                </div>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-3 tracking-tight">
                What are we solving today?
              </h2>
              <p className="text-base text-gray-400 max-w-md mb-12 leading-relaxed">
                Access real-time web data, analyze trends, and synthesize comprehensive reports in seconds.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
                {SUGGESTIONS.map((s, i) => (
                  <button 
                    key={i}
                    onClick={() => handleSend(s.text)}
                    className="p-4 rounded-xl bg-[#1E1E1E] border border-white/5 hover:border-cyan-500/30 hover:bg-white/5 text-left transition-all group relative overflow-hidden hover:shadow-lg"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xl">{s.icon}</span>
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{s.category}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-300 group-hover:text-white line-clamp-2">{s.text}</span>
                    <div className="absolute bottom-0 left-0 h-0.5 bg-cyan-500 w-0 group-hover:w-full transition-all duration-500" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-8 max-w-3xl mx-auto">
              {messages.map((msg) => (
                <div key={msg.id} className={cn("animate-in fade-in slide-in-from-bottom-4 duration-500", msg.role === "user" ? "flex justify-end" : "")}>
                  
                  {msg.role === "user" ? (
                    <div className="max-w-[85%] bg-[#1E1E1E] text-white px-6 py-4 rounded-3xl rounded-tr-sm border border-white/10 text-base leading-relaxed shadow-lg">
                      {msg.content}
                    </div>
                  ) : (
                    <div className="w-full space-y-6">
                      
                      {/* Sources Section - Horizontal Scroll */}
                      {msg.sources && (
                        <div className="relative">
                           <div className="flex items-center gap-2 mb-3">
                              <BookOpen size={14} className="text-cyan-400" />
                              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Citations</h4>
                           </div>
                          <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
                            {msg.sources.map((source: any) => (
                              <a 
                                key={source.id} 
                                href="#" 
                                className="flex-shrink-0 w-64 p-3 rounded-xl bg-[#151515] border border-white/10 hover:border-cyan-500/30 hover:bg-[#1A1A1A] transition-all group flex items-start gap-3"
                              >
                                <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center shrink-0">
                                  <img src={source.icon} className="w-4 h-4 opacity-70 group-hover:opacity-100" alt="" />
                                </div>
                                <div className="min-w-0">
                                  <p className="text-xs font-bold text-gray-200 group-hover:text-cyan-400 truncate leading-tight mb-1">{source.title}</p>
                                  <p className="text-[10px] text-gray-500 truncate">{source.url}</p>
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Main Answer */}
                      <div className="bg-transparent pl-4 border-l-2 border-white/10">
                        <div className="flex items-center gap-2 mb-4">
                          <Bot size={18} className="text-cyan-400" />
                          <span className="text-sm font-bold text-white">Analysis</span>
                        </div>
                        <div className="prose prose-invert prose-sm max-w-none text-gray-300 leading-relaxed">
                           {msg.content.split('\n').map((line: string, i: number) => (
                             <p key={i} className={cn("mb-3", line.startsWith('-') && "pl-4 text-gray-400")}>
                               {line.split(/(\*\*[^*]+\*\*)/g).map((part: string, j: number) =>
                                 part.startsWith('**') && part.endsWith('**')
                                   ? <strong key={j} className="text-white font-semibold">{part.slice(2, -2)}</strong>
                                   : part
                               )}
                             </p>
                           ))}
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="flex items-center justify-between pt-2 pl-4">
                        <div className="flex gap-2">
                          <button className="p-2 rounded-lg hover:bg-white/10 text-gray-500 hover:text-white transition-colors" title="Copy">
                            <Copy size={16} />
                          </button>
                          <button className="p-2 rounded-lg hover:bg-white/10 text-gray-500 hover:text-white transition-colors">
                            <Share2 size={16} />
                          </button>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 rounded-lg hover:bg-white/10 text-gray-500 hover:text-white transition-colors">
                            <ThumbsUp size={16} />
                          </button>
                          <button className="p-2 rounded-lg hover:bg-white/10 text-gray-500 hover:text-white transition-colors">
                            <ThumbsDown size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Related Follow-ups */}
                      {msg.related && (
                        <div className="pt-6 pl-4">
                          <h4 className="text-xs font-bold text-gray-500 uppercase mb-3 flex items-center gap-2 tracking-wider">
                            <Layers size={14} /> Deepen Research
                          </h4>
                          <div className="grid gap-2">
                             {msg.related.map((q: string, i: number) => (
                               <button 
                                 key={i} 
                                 onClick={() => handleSend(q)}
                                 className="flex items-center justify-between w-full p-3 text-left text-sm text-gray-300 bg-[#151515] border border-white/5 rounded-xl hover:bg-[#1E1E1E] hover:border-cyan-500/30 hover:text-cyan-400 transition-all group"
                               >
                                 {q}
                                 <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 text-cyan-400 transition-opacity" />
                               </button>
                             ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {/* Thinking Process Animation */}
              {isTyping && (
                <div className="w-full animate-in fade-in duration-500 max-w-3xl mx-auto">
                  <div className="bg-[#151515] border border-white/5 rounded-xl overflow-hidden shadow-lg">
                    <button 
                      onClick={() => setIsThinkingExpanded(!isThinkingExpanded)}
                      className="w-full p-4 flex items-center justify-between bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-5 h-5 rounded-full border-2 border-cyan-500/30 border-t-cyan-500 animate-spin" />
                          <div className="absolute inset-0 flex items-center justify-center">
                             <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                          </div>
                        </div>
                        <span className="text-sm font-bold text-cyan-400">
                          Researching... <span className="text-xs font-normal text-cyan-500/70 ml-2">Step {thinkingStepIndex + 1}/{THINKING_STEPS.length}</span>
                        </span>
                      </div>
                      {isThinkingExpanded ? <ChevronUp size={16} className="text-gray-500" /> : <ChevronDown size={16} className="text-gray-500" />}
                    </button>
                    
                    {isThinkingExpanded && (
                      <div className="p-4 space-y-4 bg-black/20 border-t border-white/5">
                        {THINKING_STEPS.map((step, i) => (
                          <div key={i} className="flex items-center gap-3">
                            {i < thinkingStepIndex ? (
                              <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 shrink-0">
                                <Zap size={10} fill="currentColor" />
                              </div>
                            ) : i === thinkingStepIndex ? (
                              <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0">
                                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                              </div>
                            ) : (
                              <div className="w-5 h-5 rounded-full border border-white/10 shrink-0" />
                            )}
                            <span className={cn("text-xs transition-colors", i <= thinkingStepIndex ? "text-gray-200 font-medium" : "text-gray-600")}>
                              {step}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-background border-t border-white/5">
          <div className="max-w-3xl mx-auto relative">
            <div className={cn(
              "relative transition-all duration-300 rounded-2xl bg-[#1E1E1E] border group shadow-xl",
              isTyping ? "border-cyan-500/30 shadow-[0_0_20px_-5px_rgba(6,182,212,0.1)]" : "border-white/10 focus-within:border-cyan-500/50 focus-within:bg-[#252525]"
            )}>
              <textarea 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend(query);
                  }
                }}
                placeholder="Ask a follow-up question..."
                className="w-full bg-transparent text-sm text-white placeholder:text-gray-500 p-4 pr-14 min-h-[80px] max-h-32 resize-none focus:outline-none scrollbar-hide"
                disabled={isTyping}
              />
              
              <div className="absolute left-4 bottom-3 flex items-center gap-2">
                 {/* Context Selector Pill */}
                 <div className="relative">
                   <button 
                     onClick={() => setIsContextOpen(!isContextOpen)}
                     className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-xs font-medium text-gray-300 hover:text-white"
                   >
                     {(() => {
                       const ctx = CONTEXT_OPTIONS.find(c => c.id === activeContext);
                       if (!ctx) return null;
                       return (
                         <>
                           {ctx.type === "img" ? (
                             <img src={ctx.icon as string} className="w-3.5 h-3.5 object-contain" alt="" />
                           ) : (
                             <ctx.icon size={14} className={ctx.color} />
                           )}
                           {ctx.label}
                           <ChevronUp size={12} className={cn("text-gray-500 transition-transform", isContextOpen ? "rotate-180" : "")} />
                         </>
                       );
                     })()}
                   </button>

                   {/* Context Dropdown */}
                   {isContextOpen && (
                     <div className="absolute bottom-full left-0 mb-2 w-56 bg-[#1E1E1E] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-bottom-2 ring-1 ring-black">
                       <div className="p-2">
                         <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider px-2 py-1">Data Sources</div>
                         {CONTEXT_OPTIONS.map((ctx) => (
                           <button
                             key={ctx.id}
                             onClick={() => { setActiveContext(ctx.id); setIsContextOpen(false); }}
                             className={cn(
                               "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors",
                               activeContext === ctx.id ? "bg-cyan-500/10 text-cyan-400" : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
                             )}
                           >
                             {ctx.type === "img" ? (
                               <img src={ctx.icon as string} className="w-4 h-4 object-contain" alt="" />
                             ) : (
                               <ctx.icon size={14} className={ctx.color} />
                             )}
                             {ctx.label}
                             {activeContext === ctx.id && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                           </button>
                         ))}
                       </div>
                       <div className="p-2 border-t border-white/5 bg-black/20">
                         <button 
                           onClick={() => setLocation("/context")}
                           className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-gray-500 hover:text-white hover:bg-white/5 transition-colors"
                         >
                           <Plus size={12} /> Connect New Source
                         </button>
                       </div>
                     </div>
                   )}
                 </div>

                 <button className="p-1.5 rounded-lg hover:bg-white/10 text-gray-500 hover:text-white transition-colors">
                   <Paperclip size={16} />
                 </button>
              </div>

              <div className="absolute right-2 bottom-2">
                {isTyping ? (
                  <button 
                    className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                    title="Stop generating"
                  >
                    <StopCircle size={18} />
                  </button>
                ) : (
                  <button 
                    onClick={() => handleSend(query)}
                    disabled={!query.trim()}
                    className="p-2 rounded-xl bg-white text-black hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg transform active:scale-95"
                  >
                    <ArrowUpRight size={18} />
                  </button>
                )}
              </div>
            </div>
            
            <div className="flex justify-center text-[10px] text-gray-600 mt-3">
              Deep Research Mode • Powered by GPT-4 & Perplexity
            </div>
          </div>
        </div>

      </div>
    </Layout>
  );
}