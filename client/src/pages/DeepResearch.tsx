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
  Layers
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Data for simulation
const SUGGESTIONS = [
  "What are the top TikTok trends today?",
  "Explain the 'Frutiger Aero' aesthetic history",
  "Best time to post on Instagram for artists?",
  "Generate a script for a tech review"
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

export default function DeepResearch() {
  const [, setLocation] = useLocation();
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [loadingStep, setLoadingStep] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loadingStep]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    
    // Add user message
    const userMsg = { id: Date.now(), role: "user", content: text };
    setMessages(prev => [...prev, userMsg]);
    setQuery("");
    setIsTyping(true);

    // Simulate Perplexity-style thinking steps
    setTimeout(() => setLoadingStep("Searching the web..."), 500);
    setTimeout(() => setLoadingStep("Reading 5 sources..."), 1500);
    setTimeout(() => setLoadingStep("Synthesizing answer..."), 2500);

    setTimeout(() => {
      setLoadingStep(null);
      setIsTyping(false);
      const botMsg = { 
        id: Date.now() + 1, 
        role: "assistant", 
        content: MOCK_RESPONSE.answer,
        sources: MOCK_RESPONSE.sources,
        related: MOCK_RESPONSE.related
      };
      setMessages(prev => [...prev, botMsg]);
    }, 3500);
  };

  return (
    <Layout hideTabs>
      <div className="flex flex-col h-[100dvh] bg-background">
        
        {/* Header */}
        <div className="flex items-center gap-4 p-4 pt-8 bg-background/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-20">
          <button 
            onClick={() => setLocation("/")}
            className="p-2 -ml-2 rounded-full hover:bg-white/10 text-white transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-xl font-display font-bold text-white flex items-center gap-2">
              Society AI
              <Sparkles size={16} className="text-accent" />
            </h1>
            <p className="text-xs text-gray-400">Deep Research Agent</p>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-0 animate-in fade-in duration-500">
              <div className="w-16 h-16 rounded-2xl bg-gradient-accent flex items-center justify-center mb-6 shadow-[0_0_30px_-10px_rgba(124,58,237,0.5)]">
                <Bot size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-display font-bold text-white mb-2">What do you want to know?</h2>
              <p className="text-sm text-gray-400 max-w-xs mb-8">
                I can browse the live web, analyze trends, and help you plan your next viral content.
              </p>

              <div className="grid grid-cols-1 gap-2 w-full max-w-md">
                {SUGGESTIONS.map((s, i) => (
                  <button 
                    key={i}
                    onClick={() => handleSend(s)}
                    className="p-3 rounded-xl bg-[#1E1E1E] border border-white/5 hover:border-accent/50 text-sm text-gray-300 hover:text-white text-left transition-all flex items-center justify-between group"
                  >
                    {s}
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-accent" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-8 pb-24">
              {messages.map((msg) => (
                <div key={msg.id} className={cn("animate-in fade-in slide-in-from-bottom-4", msg.role === "user" ? "flex justify-end" : "")}>
                  
                  {msg.role === "user" ? (
                    <div className="max-w-[80%] bg-[#1E1E1E] text-white px-4 py-3 rounded-2xl rounded-tr-none border border-white/10 text-sm">
                      {msg.content}
                    </div>
                  ) : (
                    <div className="w-full max-w-2xl mx-auto space-y-4">
                      
                      {/* Sources Grid */}
                      {msg.sources && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                          {msg.sources.map((source: any) => (
                            <a 
                              key={source.id} 
                              href="#" 
                              className="flex items-center gap-2 p-2 rounded-lg bg-[#1E1E1E] border border-white/5 hover:bg-white/5 transition-colors group"
                            >
                              <div className="w-6 h-6 rounded bg-white/5 flex items-center justify-center shrink-0">
                                <img src={source.icon} className="w-4 h-4 opacity-70" alt="" />
                              </div>
                              <div className="overflow-hidden">
                                <p className="text-[10px] font-bold text-white truncate group-hover:text-accent">{source.title}</p>
                                <p className="text-[10px] text-gray-500 truncate">{source.url}</p>
                              </div>
                            </a>
                          ))}
                        </div>
                      )}

                      {/* Answer Content */}
                      <div className="text-sm text-gray-200 leading-relaxed space-y-4">
                         {msg.content.split('\n').map((line: string, i: number) => (
                           <p key={i}>{line}</p>
                         ))}
                      </div>

                      {/* Action Footer */}
                      <div className="flex items-center gap-4 pt-2 border-t border-white/5">
                        <div className="flex gap-2">
                          <button className="p-1.5 rounded hover:bg-white/10 text-gray-500 hover:text-white transition-colors"><Copy size={14} /></button>
                          <button className="p-1.5 rounded hover:bg-white/10 text-gray-500 hover:text-white transition-colors"><ThumbsUp size={14} /></button>
                          <button className="p-1.5 rounded hover:bg-white/10 text-gray-500 hover:text-white transition-colors"><ThumbsDown size={14} /></button>
                        </div>
                        <div className="h-4 w-px bg-white/10" />
                        <span className="text-[10px] text-gray-500 flex items-center gap-1">
                          <Bot size={12} /> Generated by Society LLM-70B
                        </span>
                      </div>

                      {/* Related Questions */}
                      {msg.related && (
                        <div className="pt-2">
                          <h4 className="text-xs font-bold text-gray-500 uppercase mb-2 flex items-center gap-2">
                            <Layers size={12} /> Related
                          </h4>
                          <div className="space-y-1">
                             {msg.related.map((q: string, i: number) => (
                               <button 
                                 key={i} 
                                 onClick={() => handleSend(q)}
                                 className="block w-full text-left text-sm text-accent hover:underline py-1"
                               >
                                 {q}
                               </button>
                             ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {/* Loading State */}
              {isTyping && (
                <div className="w-full max-w-2xl mx-auto animate-in fade-in">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center animate-spin">
                       <Globe size={14} className="text-accent" />
                    </div>
                    <span className="text-xs font-bold text-accent animate-pulse">{loadingStep}</span>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-[#121212] border-t border-white/5">
          <div className="relative max-w-2xl mx-auto">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend(query)}
              placeholder="Ask anything..."
              className="w-full bg-[#1E1E1E] border border-white/10 rounded-2xl pl-4 pr-12 py-4 text-sm text-white focus:outline-none focus:border-accent/50 transition-colors shadow-lg"
              disabled={isTyping}
            />
            <button 
              onClick={() => handleSend(query)}
              disabled={!query.trim() || isTyping}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white text-black rounded-xl hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isTyping ? <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" /> : <ArrowUpRight size={18} />}
            </button>
          </div>
          <p className="text-[10px] text-center text-gray-600 mt-3">
            Society AI searches the web and may display inaccurate info.
          </p>
        </div>

      </div>
    </Layout>
  );
}
