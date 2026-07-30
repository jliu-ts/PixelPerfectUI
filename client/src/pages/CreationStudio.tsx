import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { Image as ImageIcon, Film, Sparkles, ChevronDown, Palette, User, Rocket, Library, Zap, Square, RectangleHorizontal, RectangleVertical, Mic, CheckCircle2, X, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { MOCK_ARTICLES, CREATION_STYLES, VIDEO_MODELS, IMAGE_MODELS, AVATARS, ASPECT_RATIOS, VOICES } from "@/lib/mockData";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Newspaper, Bot } from "lucide-react";
import { PromptLibraryModal } from "@/components/PromptLibraryModal";
import { Prompt } from "@/hooks/usePrompts";

export default function CreationStudio() {
  const [location, setLocation] = useLocation();
  const locationState = window.history.state?.usr;
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState<"text" | "image" | "video" | "audio">((locationState?.mode as any) || "image");
  const [selectedStyle, setSelectedStyle] = useState(locationState?.style || "Cinematic");
  const [selectedRatio, setSelectedRatio] = useState("1:1");
  const [prompt, setPrompt] = useState(locationState?.prompt || "");
  const [selectedModel, setSelectedModel] = useState(locationState?.model || (activeTab === "video" ? VIDEO_MODELS[0] : IMAGE_MODELS[0]));
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [inputMode, setInputMode] = useState<"prompt" | "rss">("prompt");
  const [selectedPromptTitle, setSelectedPromptTitle] = useState<string | null>(null);

  // Update default model when tab changes if not manually set from idea
  useEffect(() => {
    if (!locationState?.model) {
      setSelectedModel(activeTab === "video" ? VIDEO_MODELS[0] : IMAGE_MODELS[0]);
    }
  }, [activeTab]);

  // Effect to handle incoming state updates (like from Library)
  useEffect(() => {
    if (locationState?.mode) setActiveTab(locationState.mode);
    if (locationState?.prompt) setPrompt(locationState.prompt);
    if (locationState?.style) setSelectedStyle(locationState.style);
  }, [locationState]);

  const currentModels = activeTab === "video" ? VIDEO_MODELS : IMAGE_MODELS;

  // Helper for dynamic preview sizing
  const getPreviewDimensions = () => {
    switch(selectedRatio) {
      case "16:9": return "aspect-video w-full max-w-3xl";
      case "9:16": return "aspect-[9/16] max-w-[300px] w-full";
      case "4:5": return "aspect-[4/5] max-w-[360px] w-full";
      case "1:1": default: return "aspect-square max-w-[400px] w-full";
    }
  };

  const handleSelectPrompt = (prompt: Prompt) => {
    setPrompt(prompt.prompt);
    setSelectedPromptTitle(prompt.title);
    setIsLibraryOpen(false);
  };

  const clearSelectedPrompt = () => {
    setSelectedPromptTitle(null);
  };

  return (
    <Layout hideTabs>
      <div className="flex flex-col h-screen bg-background relative">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b border-white/5 p-4 flex items-center gap-4">
          <button aria-label="Go back" 
            onClick={() => setLocation("/")}
            className="p-2 -ml-2 rounded-full hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="font-display text-xl font-bold text-foreground">Creation Studio</h1>
        </div>

        {/* AI Preview Canvas (Full Height Focus) */}
        <div className="flex-1 flex items-center justify-center pb-32 px-4 overflow-hidden">
           <div className={cn(
             "relative overflow-hidden transition-all duration-500 ease-out shadow-2xl flex items-center justify-center group",
             getPreviewDimensions()
           )}>
              {/* Grid Pattern Overlay */}
              <div className="absolute inset-0 opacity-20 pointer-events-none z-0" 
                   style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #444 1px, transparent 0)', backgroundSize: '20px 20px' }}>
              </div>

              {activeTab === "video" && selectedModel.includes("Avatar") ? (
                <div className="w-full h-full bg-[#151515] rounded-2xl border border-white/10 p-6 overflow-y-auto relative z-10">
                   <div className="flex items-center justify-between mb-4 sticky top-0 bg-[#151515]/80 backdrop-blur z-10 py-2">
                     <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Select Digital Avatar</label>
                     <span className="text-[10px] text-accent bg-accent/10 px-2 py-1 rounded-full">Avatar Mode Active</span>
                   </div>
                   
                   <div className="grid grid-cols-1 gap-3">
                      {AVATARS.map((avatar) => (
                        <button
                          key={avatar.id}
                          onClick={() => setSelectedAvatar(avatar.id)}
                          className={cn(
                            "w-full text-left px-4 py-4 rounded-xl border transition-all flex items-center justify-between group",
                            selectedAvatar === avatar.id 
                              ? "bg-white/10 border-accent text-white" 
                              : "bg-black/40 border-white/5 hover:bg-white/5 text-gray-400"
                          )}
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center ring-2 ring-white/5 group-hover:ring-white/20 transition-all overflow-hidden">
                              {/* Assuming avatar.image is available from mockData */}
                              <img loading="lazy" decoding="async" src={avatar.image || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"} alt={avatar.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <span className="block text-sm font-bold mb-0.5">{avatar.name}</span>
                              <span className="block text-[10px] opacity-70">{avatar.type}</span>
                            </div>
                          </div>
                          {selectedAvatar === avatar.id && (
                            <CheckCircle2 size={16} className="text-accent" />
                          )}
                        </button>
                      ))}
                   </div>
                </div>
              ) : (
                <div className="text-center relative z-10 bg-[#151515] rounded-2xl border border-white/10 w-full h-full flex flex-col items-center justify-center">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center border border-white/5 shadow-inner">
                    <Sparkles size={32} className="text-white/50" />
                  </div>
                  <h2 className="text-xl font-display font-bold text-white mb-2">Ready to Create?</h2>
                  <p className="text-sm text-gray-400 max-w-xs mx-auto leading-relaxed">
                    Describe your vision in the bar below and watch it come to life.
                  </p>
                  <div className="mt-6 flex gap-2">
                     <div className="text-[10px] text-gray-500 bg-white/5 border border-white/5 px-3 py-1.5 rounded-full">
                        {selectedRatio}
                     </div>
                     <div className="text-[10px] text-gray-500 bg-white/5 border border-white/5 px-3 py-1.5 rounded-full">
                        {selectedModel}
                     </div>
                  </div>
                </div>
              )}
           </div>
        </div>

        {/* Floating Input Bar (Bottom Fixed) */}
        <div className="fixed bottom-8 left-0 right-0 z-50 px-4 flex justify-center pointer-events-none">
           <div className="w-full max-w-3xl bg-[#1E1E1E]/90 backdrop-blur-xl border border-white/10 rounded-[32px] p-2 shadow-2xl pointer-events-auto transition-all duration-300 ring-1 ring-white/5 hover:ring-white/10 flex flex-col gap-2">
              
              {/* Context / Mode Tabs (Integrated Top) */}
              <div className="flex items-center px-4 pt-2 gap-2">
                 <div className="flex p-1 bg-black/20 rounded-lg border border-white/5">
                    <button 
                      onClick={() => setActiveTab("image")}
                      className={cn(
                        "px-3 py-1.5 rounded-md text-[10px] font-bold transition-all inline-flex items-center gap-1.5 min-h-6",
                        activeTab === "image" ? "bg-white text-black shadow-sm" : "text-gray-400 hover:text-white"
                      )}
                    >
                      <ImageIcon size={10} /> Image
                    </button>
                    <button 
                      onClick={() => setActiveTab("video")}
                      className={cn(
                        "px-3 py-1.5 rounded-md text-[10px] font-bold transition-all inline-flex items-center gap-1.5 min-h-6",
                        activeTab === "video" ? "bg-white text-black shadow-sm" : "text-gray-400 hover:text-white"
                      )}
                    >
                      <Film size={10} /> Video
                    </button>
                 </div>
                 <div className="w-px h-3 bg-white/10 mx-1" />
                 <button 
                   onClick={() => setInputMode(inputMode === "prompt" ? "rss" : "prompt")}
                   className={cn(
                     "text-[10px] font-medium transition-colors inline-flex items-center gap-1.5 px-2 py-1.5 rounded-md min-h-6 hover:bg-white/5",
                     inputMode === "rss" ? "text-orange-400 bg-orange-400/10" : "text-gray-500 hover:text-white"
                   )}
                 >
                   <Newspaper size={10} /> {inputMode === "rss" ? "Feed Active" : "Add Context"}
                 </button>
                 <div className="w-px h-3 bg-white/10 mx-1" />
                 <button 
                   onClick={() => {
                     setIsLibraryOpen(true);
                   }}
                   className="text-[10px] font-medium transition-colors inline-flex items-center gap-1.5 px-2 py-1.5 rounded-md min-h-6 hover:bg-white/5 text-accent"
                 >
                   <Library size={10} /> Library
                 </button>
              </div>

              {/* Input Area */}
              <div className="relative px-2">
                {/* Active Prompt Pill */}
                {selectedPromptTitle && inputMode === "prompt" && (
                  <div className="absolute -top-3 left-4 z-10">
                    <div className="flex items-center gap-1.5 bg-accent text-black text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-lg cursor-default animate-in fade-in slide-in-from-bottom-2">
                      <Library size={10} />
                      Using: {selectedPromptTitle}
                      <button aria-label="Close" 
                        onClick={clearSelectedPrompt}
                        className="ml-1 hover:bg-black/10 rounded-full p-0.5"
                      >
                        <X size={10} />
                      </button>
                    </div>
                  </div>
                )}

                 {inputMode === "prompt" ? (
                    <textarea 
                      className="w-full bg-transparent p-3 text-base text-white placeholder:text-gray-500 resize-none focus:outline-none min-h-[60px] max-h-[200px]"
                      placeholder={activeTab === "image" ? "Describe the image you want to generate..." : "Describe the video you want to create..."}
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      rows={2}
                    />
                 ) : (
                    <div className="h-[80px] overflow-x-auto flex gap-2 items-center px-2 no-scrollbar">
                       {MOCK_ARTICLES.map((article) => (
                          <button 
                            key={article.id}
                            onClick={() => {
                              setPrompt(`Create a concept based on: "${article.title}"`);
                              setInputMode("prompt");
                            }}
                            className="min-w-[200px] h-16 bg-black/40 rounded-xl p-2 border border-white/5 hover:border-accent/50 text-left flex gap-2 group transition-all"
                          >
                            <img alt="" loading="lazy" decoding="async" src={article.image} className="w-12 h-full rounded-lg object-cover opacity-70 group-hover:opacity-100" />
                            <div className="flex-1 overflow-hidden">
                               <div className="text-[9px] text-orange-400 font-bold truncate">{article.category}</div>
                               <div className="text-[10px] text-white font-medium leading-tight line-clamp-2">{article.title}</div>
                            </div>
                          </button>
                       ))}
                    </div>
                 )
                 }
              </div>

              {/* Bottom Toolbar (Pill Style) */}
              <div className="flex items-center justify-between px-2 pb-1">
                 <div className="flex items-center gap-2">
                    {/* Model Picker (Rich) */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/20 hover:bg-black/40 text-[11px] font-medium text-gray-300 hover:text-white transition-colors border border-white/5 hover:border-white/10">
                           <Bot size={12} className="text-accent" />
                           {selectedModel}
                           <ChevronDown size={10} className="opacity-50" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-[#1E1E1E]/95 backdrop-blur-xl border-white/10 text-white w-[340px] p-2 rounded-xl shadow-2xl mb-2" sideOffset={10}>
                         <div className="px-2 py-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Recommended Models</div>
                         {currentModels.map(m => (
                           <DropdownMenuItem
                             key={m}
                             onClick={() => setSelectedModel(m)}
                             className={cn(
                               "flex items-start gap-3 p-2.5 rounded-lg focus:bg-white/10 cursor-pointer mb-1 border border-transparent",
                               selectedModel === m ? "bg-white/5 border-accent/20" : ""
                             )}
                           >
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center flex-shrink-0 border border-white/5">
                                 {activeTab === "video" ? <Film size={14} className="text-gray-400" /> : <ImageIcon size={14} className="text-gray-400" />}
                              </div>
                              <div className="flex-1">
                                 <div className="flex items-center justify-between">
                                    <span className={cn("text-sm font-bold", selectedModel === m ? "text-accent" : "text-white")}>{m}</span>
                                    {selectedModel === m && <div className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_currentColor]" />}
                                 </div>
                                 <p className="text-[10px] text-gray-500 mt-0.5 leading-tight">High fidelity generation with enhanced prompt adherence.</p>
                                 <div className="flex items-center gap-2 mt-1.5">
                                    <span className="text-[9px] bg-white/5 px-1.5 py-0.5 rounded text-gray-400">1080p</span>
                                    <span className="text-[9px] bg-white/5 px-1.5 py-0.5 rounded text-gray-400">Fast</span>
                                 </div>
                              </div>
                           </DropdownMenuItem>
                         ))}
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Voice Selector (Conditional) */}
                    {(activeTab === "video" && (selectedModel.includes("Avatar") || selectedModel.includes("HeyGen"))) && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/20 hover:bg-black/40 text-[11px] font-medium text-gray-300 hover:text-white transition-colors border border-white/5 hover:border-white/10">
                             <Mic size={12} className={selectedVoice ? "text-orange-400" : ""} />
                             {selectedVoice ? VOICES.find(v => v.id === selectedVoice)?.name.split(" ")[0] : "Voice"}
                             <ChevronDown size={10} className="opacity-50" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-[#1E1E1E]/95 backdrop-blur-xl border-white/10 text-white w-[280px] p-2 rounded-xl shadow-2xl mb-2" sideOffset={10}>
                           <div className="px-2 py-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Select Voice</div>
                           {VOICES.map(v => (
                             <DropdownMenuItem
                               key={v.id}
                               onClick={() => setSelectedVoice(v.id)}
                               className={cn(
                                 "flex items-center justify-between p-2.5 rounded-lg focus:bg-white/10 cursor-pointer mb-1",
                                 selectedVoice === v.id ? "bg-white/5 border border-orange-500/20" : "border border-transparent"
                               )}
                             >
                                <div className="flex items-center gap-3">
                                   <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
                                      <Mic size={14} />
                                   </div>
                                   <div>
                                      <span className={cn("text-xs font-bold block", selectedVoice === v.id ? "text-orange-400" : "text-white")}>{v.name}</span>
                                      <span className="text-[9px] text-gray-500">{v.model}</span>
                                   </div>
                                </div>
                                {selectedVoice === v.id && <CheckCircle2 size={14} className="text-orange-400" />}
                             </DropdownMenuItem>
                           ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}

                    {/* Aspect Ratio */}
                    {(activeTab === "image" || activeTab === "video") && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/20 hover:bg-black/40 text-[11px] font-medium text-gray-300 hover:text-white transition-colors border border-white/5 hover:border-white/10">
                             {(() => {
                               const Icon = ASPECT_RATIOS.find(r => r.id === selectedRatio)?.icon || Square;
                               return <Icon size={12} />;
                             })()}
                             {selectedRatio}
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-[#1E1E1E] border-white/10 text-white w-40 mb-2" sideOffset={10}>
                          {ASPECT_RATIOS.map((ratio) => (
                            <DropdownMenuItem
                              key={ratio.id}
                              onClick={() => setSelectedRatio(ratio.id)}
                              className={cn(
                                "text-xs focus:bg-white/10 cursor-pointer flex items-center gap-2",
                                selectedRatio === ratio.id ? "text-blue-400 font-bold" : "text-gray-400"
                              )}
                            >
                              <ratio.icon size={12} />
                              {ratio.label}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}

                    {/* Style (Pill) */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/20 hover:bg-black/40 text-[11px] font-medium text-gray-300 hover:text-white transition-colors border border-white/5 hover:border-white/10">
                             <Palette size={12} />
                             {CREATION_STYLES.find(s => s.id === selectedStyle)?.label || "Style"}
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-[#1E1E1E] border-white/10 text-white w-64 p-2 mb-2" sideOffset={10}>
                           <div className="grid grid-cols-2 gap-2">
                              {CREATION_STYLES.map(s => (
                                <DropdownMenuItem
                                  key={s.id}
                                  onClick={() => setSelectedStyle(s.id)}
                                  className={cn(
                                    "text-xs focus:bg-white/10 cursor-pointer p-0 rounded-md overflow-hidden relative h-16 group border border-transparent hover:border-white/20",
                                    selectedStyle === s.id ? "ring-1 ring-accent" : ""
                                  )}
                                >
                                  <div className="absolute inset-0">
                                    <img loading="lazy" decoding="async" src={s.image} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt={s.label} />
                                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-colors" />
                                  </div>
                                  <span className="relative z-10 p-2 font-bold text-white drop-shadow-md">{s.label}</span>
                                </DropdownMenuItem>
                              ))}
                           </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                 </div>

                 {/* Generate Action */}
                 <div className="flex items-center gap-3">
                    <div className="text-[10px] text-gray-500 font-medium flex items-center gap-1">
                       <Zap size={10} className="text-yellow-400" fill="currentColor" /> 5
                    </div>
                    <button aria-label="Launch" 
                       onClick={() => setLocation("/result")}
                       className="w-8 h-8 rounded-full bg-white hover:bg-gray-200 text-black flex items-center justify-center transition-all hover:scale-110 shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                    >
                       <Rocket size={16} className="ml-0.5" />
                    </button>
                 </div>
              </div>
           </div>
        </div>

      </div>      
      
      {/* Use the new Reusable Prompt Library Modal */}
      <PromptLibraryModal 
        isOpen={isLibraryOpen} 
        onOpenChange={setIsLibraryOpen}
        onSelectPrompt={handleSelectPrompt}
      />
    </Layout>
  );
}
