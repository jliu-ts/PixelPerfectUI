import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { 
  ArrowLeft, 
  Send, 
  Sparkles, 
  Globe, 
  BookOpen, 
  ArrowUpRight, 
  MoreHorizontal, 
  Copy, 
  ThumbsUp, 
  ThumbsDown,
  Search,
  Bot,
  Layers,
  ChevronDown,
  ChevronUp,
  StopCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Data for simulation
const SUGGESTIONS = [
  { icon: "🎵", text: "What are the top TikTok trends today?" },
  { icon: "🎨", text: "Explain the 'Frutiger Aero' aesthetic history" },
  { icon: "📈", text: "Best time to post on Instagram for artists?" },
  { icon: "📝", text: "Generate a script for a tech review" }
];

const MOCK_RESPONSE = {
  answer: "The **'Frutiger Aero'** aesthetic, popular from roughly **2004 to 2013**, is characterized by glossy textures, skepticism, nature themes (tropical fish, water, grass), and skeuomorphism. \n\nIt represents a time of 'techno-optimism' where the future was depicted as clean, eco-friendly, and human-centric. It is currently experiencing a massive resurgence on TikTok and Instagram as Gen Z discovers this 'lost future'.\n\nKey visual elements include:\n- Glossy buttons and glass effects (Windows Aero)\n- High-saturation grassy fields (Windows XP Bliss)\n- Futurism mixed with nature (Eco-Futurism)",
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

export default function DeepResearch() {
  const [, setLocation] = useLocation();
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [thinkingStepIndex, setThinkingStepIndex] = useState(0);
  const [isThinkingExpanded, setIsThinkingExpanded] = useState(true);
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
      <div className="flex flex-col h-[100dvh] bg-[#0A0A0A]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 pt-8 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setLocation("/")}
              className="p-2 -ml-2 rounded-full hover:bg-white/10 text-white transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E1E1E] border border-white/10">
              <Sparkles size={14} className="text-cyan-400" />
              <span className="text-xs font-bold text-white">Society AI</span>
              <span className="text-[10px] text-gray-500 px-1.5 border-l border-white/10">Pro</span>
            </div>
          </div>
          <button className="p-2 rounded-full hover:bg-white/10 text-gray-400 transition-colors">
            <MoreHorizontal size={20} />
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-8">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in duration-700">
              <div className="mb-8 relative group">
                <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full group-hover:bg-cyan-500/30 transition-all duration-1000" />
                <div className="w-20 h-20 rounded-2xl bg-[#1E1E1E] border border-white/10 flex items-center justify-center relative z-10 shadow-2xl">
                  <Bot size={40} className="text-cyan-400" />
                </div>
              </div>
              
              <h2 className="text-3xl font-display font-bold text-white mb-3 tracking-tight">Deep Research</h2>
              <p className="text-sm text-gray-400 max-w-xs mb-10 leading-relaxed">
                Ask anything. I'll browse the web, analyze trends, and synthesize comprehensive answers.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
                {SUGGESTIONS.map((s, i) => (
                  <button 
                    key={i}
                    onClick={() => handleSend(s.text)}
                    className="p-4 rounded-xl bg-[#1E1E1E] border border-white/5 hover:border-cyan-500/30 hover:bg-white/5 text-left transition-all group relative overflow-hidden"
                  >
                    <div className="flex items-start justify-between mb-1">
                      <span className="text-lg">{s.icon}</span>
                      <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400 -translate-y-1 group-hover:translate-y-0 duration-300" />
                    </div>
                    <span className="text-xs font-medium text-gray-300 group-hover:text-white">{s.text}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-10 pb-32 max-w-3xl mx-auto">
              {messages.map((msg) => (
                <div key={msg.id} className={cn("animate-in fade-in slide-in-from-bottom-4 duration-500", msg.role === "user" ? "flex justify-end" : "")}>
                  
                  {msg.role === "user" ? (
                    <div className="max-w-[85%] bg-[#1E1E1E] text-white px-5 py-3.5 rounded-3xl rounded-tr-sm border border-white/10 text-sm leading-relaxed shadow-lg">
                      {msg.content}
                    </div>
                  ) : (
                    <div className="w-full space-y-6">
                      
                      {/* Sources Section */}
                      {msg.sources && (
                        <div>
                          <h4 className="text-xs font-bold text-gray-500 uppercase mb-3 flex items-center gap-2 tracking-wider">
                            <BookOpen size={14} /> Sources
                          </h4>
                          <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
                            {msg.sources.map((source: any) => (
                              <a 
                                key={source.id} 
                                href="#" 
                                className="flex-shrink-0 w-48 p-3 rounded-xl bg-[#151515] border border-white/10 hover:border-white/20 hover:bg-[#1A1A1A] transition-all group"
                              >
                                <p className="text-[10px] text-gray-500 mb-1 truncate flex items-center gap-1">
                                  <img src={source.icon} className="w-3 h-3 opacity-50" alt="" />
                                  {source.url}
                                </p>
                                <p className="text-xs font-bold text-gray-300 group-hover:text-cyan-400 truncate leading-tight">{source.title}</p>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Main Answer */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-6 h-6 rounded bg-gradient-accent flex items-center justify-center shadow-lg shadow-cyan-500/20">
                            <Sparkles size={14} className="text-black" />
                          </div>
                          <span className="text-sm font-bold text-white">Society AI</span>
                        </div>
                        <div className="text-[15px] text-gray-200 leading-relaxed space-y-4 font-light">
                           {msg.content.split('\n').map((line: string, i: number) => (
                             <p key={i} className={line.startsWith('-') ? "pl-4" : ""}>{line}</p>
                           ))}
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex gap-1">
                          <button className="p-2 rounded-full hover:bg-white/10 text-gray-500 hover:text-white transition-colors" title="Copy">
                            <Copy size={16} />
                          </button>
                          <button className="p-2 rounded-full hover:bg-white/10 text-gray-500 hover:text-white transition-colors">
                            <ThumbsUp size={16} />
                          </button>
                          <button className="p-2 rounded-full hover:bg-white/10 text-gray-500 hover:text-white transition-colors">
                            <ThumbsDown size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Related Follow-ups */}
                      {msg.related && (
                        <div className="pt-4 border-t border-white/5">
                          <h4 className="text-xs font-bold text-gray-500 uppercase mb-3 flex items-center gap-2 tracking-wider">
                            <Layers size={14} /> Explore Further
                          </h4>
                          <div className="grid gap-2">
                             {msg.related.map((q: string, i: number) => (
                               <button 
                                 key={i} 
                                 onClick={() => handleSend(q)}
                                 className="flex items-center justify-between w-full p-3 text-left text-sm text-gray-300 bg-[#151515] border border-white/5 rounded-xl hover:bg-[#1E1E1E] hover:border-white/10 hover:text-white transition-all group"
                               >
                                 {q}
                                 <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 text-gray-500 transition-opacity" />
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
                <div className="w-full animate-in fade-in duration-500">
                  <div className="bg-[#151515] border border-white/5 rounded-xl overflow-hidden">
                    <button 
                      onClick={() => setIsThinkingExpanded(!isThinkingExpanded)}
                      className="w-full p-3 flex items-center justify-between bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full border-2 border-cyan-500/30 border-t-cyan-500 animate-spin" />
                        <span className="text-xs font-bold text-cyan-400 animate-pulse">Thinking...</span>
                      </div>
                      {isThinkingExpanded ? <ChevronUp size={16} className="text-gray-500" /> : <ChevronDown size={16} className="text-gray-500" />}
                    </button>
                    
                    {isThinkingExpanded && (
                      <div className="p-4 space-y-3 bg-black/20">
                        {THINKING_STEPS.map((step, i) => (
                          <div key={i} className="flex items-center gap-3">
                            {i < thinkingStepIndex ? (
                              <div className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                              </div>
                            ) : i === thinkingStepIndex ? (
                              <div className="w-4 h-4 rounded-full bg-cyan-500/20 flex items-center justify-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                              </div>
                            ) : (
                              <div className="w-4 h-4 rounded-full border border-white/10" />
                            )}
                            <span className={cn("text-xs transition-colors", i <= thinkingStepIndex ? "text-gray-300" : "text-gray-600")}>
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
        <div className="p-4 bg-[#0A0A0A] border-t border-white/5">
          <div className="max-w-3xl mx-auto relative">
            <div className={cn(
              "relative transition-all duration-300 rounded-2xl bg-[#1E1E1E] border group",
              isTyping ? "border-cyan-500/30 shadow-[0_0_20px_-5px_rgba(6,182,212,0.1)]" : "border-white/10 focus-within:border-cyan-500/50"
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
                placeholder="Ask a follow-up..."
                className="w-full bg-transparent text-sm text-white placeholder:text-gray-500 p-4 pr-14 min-h-[56px] max-h-32 resize-none focus:outline-none scrollbar-hide"
                disabled={isTyping}
              />
              
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
            <div className="flex justify-center gap-4 mt-3">
              <button className="flex items-center gap-1.5 text-[10px] font-medium text-gray-500 hover:text-gray-300 transition-colors">
                <Globe size={12} /> Search Web
              </button>
              <button className="flex items-center gap-1.5 text-[10px] font-medium text-gray-500 hover:text-gray-300 transition-colors">
                <BookOpen size={12} /> Academic
              </button>
            </div>
          </div>
        </div>

      </div>
    </Layout>
  );
}
