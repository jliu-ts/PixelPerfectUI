import React, { useState } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { GradientButton } from "@/components/GradientButton";
import { 
  Library, 
  Plus, 
  Copy, 
  Trash2, 
  Edit, 
  Tag, 
  Filter, 
  Search,
  Smartphone,
  Monitor,
  Instagram,
  Youtube,
  Linkedin,
  Check,
  ArrowRight,
  Bookmark
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePrompts, Prompt } from "@/hooks/usePrompts";
import { PromptLibraryModal } from "@/components/PromptLibraryModal";

// Mock Data
const CATEGORIES = ["All", "Product", "Social", "Business", "Art", "Education"];
const PLATFORMS = ["All", "Instagram", "TikTok", "YouTube", "LinkedIn", "General"];

export default function PromptLibrary() {
  const [, setLocation] = useLocation();
  const { prompts, deletePrompt } = usePrompts();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPlatform, setSelectedPlatform] = useState("All");
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalView, setModalView] = useState<"list" | "create" | "edit">("list");
  const [selectedPromptForEdit, setSelectedPromptForEdit] = useState<Prompt | null>(null);

  const filteredPrompts = prompts.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.prompt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchesPlatform = selectedPlatform === "All" || p.platform === selectedPlatform;
    return matchesSearch && matchesCategory && matchesPlatform;
  });

  const handleCopy = (id: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleUse = (prompt: any) => {
    // Infer mode based on platform/category
    let mode = "text";
    if (["Instagram", "Art", "Product"].includes(prompt.platform) || prompt.category === "Art") mode = "image";
    if (["TikTok", "YouTube"].includes(prompt.platform)) mode = "video";
    if (prompt.platform === "LinkedIn" || prompt.platform === "Twitter") mode = "text";

    setLocation("/create", { 
      state: { 
        prompt: prompt.prompt,
        mode: mode,
        style: prompt.tags[0] || "Cinematic"
      } 
    });
  };

  const handleDelete = (id: number) => {
    deletePrompt(id);
  };

  const handleCreate = () => {
    setModalView("create");
    setSelectedPromptForEdit(null);
    setIsModalOpen(true);
  };

  const handleEdit = (prompt: Prompt) => {
    setModalView("edit");
    setSelectedPromptForEdit(prompt);
    setIsModalOpen(true);
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "Instagram": return <Instagram size={14} />;
      case "TikTok": return <Smartphone size={14} />;
      case "YouTube": return <Youtube size={14} />;
      case "LinkedIn": return <Linkedin size={14} />;
      default: return <Monitor size={14} />;
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background pb-24 md:pb-8">
        {/* Header */}
        <div className="px-6 pt-8 pb-6 border-b border-white/5 bg-gradient-to-b from-[#1E1E1E] to-transparent sticky top-0 z-10 backdrop-blur-md">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-display font-bold text-white flex items-center gap-2 mb-2">
                Prompt Library
                <Library size={20} className="text-accent" />
              </h1>
              <p className="text-sm text-gray-400 max-w-md">
                Organize and reuse your best prompts for consistent content creation across platforms.
              </p>
            </div>
            <button 
              onClick={handleCreate}
              className="px-4 py-2 rounded-xl bg-gradient-accent text-black text-xs font-bold hover:brightness-110 transition-all flex items-center gap-2 shadow-lg"
            >
              <Plus size={16} /> New Prompt
            </button>
          </div>

          {/* Search and Filters */}
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input 
                type="text" 
                placeholder="Search prompts..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1E1E1E] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-accent/50 transition-all"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2 mr-2 border-r border-white/10 pr-4">
                <Filter size={14} className="text-gray-500" />
                <span className="text-xs font-bold text-gray-500 uppercase">Filters</span>
              </div>
              
              {/* Categories */}
              <div className="flex gap-2 overflow-x-auto no-scrollbar">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap border",
                      selectedCategory === cat
                        ? "bg-white/10 text-white border-white/20"
                        : "bg-transparent text-gray-500 border-transparent hover:text-gray-300 hover:bg-white/5"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Prompts Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPrompts.length > 0 ? (
            filteredPrompts.map((prompt) => (
              <div 
                key={prompt.id} 
                className="bg-[#1E1E1E] border border-white/5 rounded-2xl p-5 flex flex-col group hover:border-white/20 transition-all relative"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 px-2 py-1 rounded bg-white/5 text-[10px] font-bold text-gray-300 border border-white/5">
                      {getPlatformIcon(prompt.platform)} {prompt.platform}
                    </span>
                    <span className="text-[10px] text-gray-500">• {prompt.category}</span>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleEdit(prompt)}
                      className="p-1.5 rounded hover:bg-white/10 text-gray-400 hover:text-white"
                    >
                      <Edit size={14} />
                    </button>
                    <button 
                      onClick={() => handleDelete(prompt.id)}
                      className="p-1.5 rounded hover:bg-red-500/20 text-gray-400 hover:text-red-500"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <h3 className="text-base font-bold text-white mb-2 group-hover:text-accent transition-colors">
                  {prompt.title}
                </h3>
                
                <div className="bg-black/40 rounded-xl p-3 mb-4 border border-white/5 flex-1 relative group/code">
                  <p className="text-xs text-gray-400 line-clamp-3 font-mono leading-relaxed">
                    {prompt.prompt}
                  </p>
                  <button 
                    onClick={() => handleCopy(prompt.id, prompt.prompt)}
                    className="absolute top-2 right-2 p-1.5 rounded bg-[#1E1E1E] text-gray-400 hover:text-white opacity-0 group-hover/code:opacity-100 transition-opacity shadow-lg border border-white/10"
                  >
                    {copiedId === prompt.id ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
                  </button>
                </div>

                <div className="flex items-center justify-between mt-auto pt-2">
                  <div className="flex gap-1 flex-wrap">
                    {prompt.tags.map(tag => (
                      <span key={tag} className="text-[10px] text-gray-500 px-1.5 py-0.5 bg-white/5 rounded">#{tag}</span>
                    ))}
                  </div>
                  
                  <button 
                    onClick={() => handleUse(prompt)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-accent hover:text-black text-xs font-bold text-white transition-all border border-white/5 hover:border-accent"
                  >
                    Use <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-center opacity-50">
              <Bookmark size={48} className="mb-4 text-gray-600" />
              <h3 className="text-lg font-bold text-white mb-2">No prompts found</h3>
              <p className="text-sm text-gray-400">Try adjusting your search or create a new one.</p>
            </div>
          )}
        </div>
      </div>

      {/* Prompt Library Modal used for Creating/Editing */}
      <PromptLibraryModal 
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        initialView={modalView}
        promptToEdit={selectedPromptForEdit}
      />
    </Layout>
  );
}
