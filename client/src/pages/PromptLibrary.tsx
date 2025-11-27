import { useState } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { SearchInput, FilterTabs, EmptyState } from "@/components/common";
import {
  Library,
  Plus,
  Copy,
  Trash2,
  Edit,
  Smartphone,
  Monitor,
  Instagram,
  Youtube,
  Linkedin,
  Check,
  Sparkles,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePrompts, Prompt } from "@/hooks/usePrompts";
import { useFilter } from "@/hooks/useFilter";
import { PromptLibraryModal } from "@/components/PromptLibraryModal";
import { useToast } from "@/hooks/use-toast";
import { PROMPT_FILTER_CATEGORIES } from "@/lib/constants";

export default function PromptLibrary() {
  const [, setLocation] = useLocation();
  const { prompts, deletePrompt } = usePrompts();
  const { toast } = useToast();
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // Use the useFilter hook for filtering logic
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    filteredItems: filteredPrompts,
    resetFilters,
    hasResults,
  } = useFilter({
    items: prompts,
    searchFields: ["title", "prompt"],
    categoryField: "category",
    initialCategory: "All",
  });

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalView, setModalView] = useState<"list" | "create" | "edit">("list");
  const [selectedPromptForEdit, setSelectedPromptForEdit] = useState<Prompt | null>(null);

  const handleCopy = (id: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast({
      title: "Copied to clipboard",
      description: "Prompt is ready to paste",
    });
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
    toast({
      title: "Prompt deleted",
      description: "The prompt has been removed from your library.",
      variant: "destructive",
    });
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
    <Layout hideTabs>
      <div className="min-h-screen bg-background pb-24 md:pb-8">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b border-white/5">
          <div className="px-6 pt-6 pb-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
              <div>
                <h1 className="text-2xl font-display font-bold text-white flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center border border-accent/20">
                    <Library size={20} className="text-accent" />
                  </span>
                  Prompt Library
                </h1>
                <p className="text-sm text-gray-400 mt-2 max-w-md">
                  Your personal collection of high-performing prompts for consistent content creation.
                </p>
              </div>
              <button 
                onClick={handleCreate}
                className="px-5 py-2.5 rounded-xl bg-accent text-black text-sm font-bold hover:bg-accent/90 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(0,196,204,0.2)] hover:shadow-[0_0_30px_rgba(0,196,204,0.4)] hover:-translate-y-0.5"
              >
                <Plus size={18} /> Create Prompt
              </button>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <SearchInput
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search by keywords, tags..."
                className="flex-1 max-w-md"
              />

              <FilterTabs
                tabs={PROMPT_FILTER_CATEGORIES.map(cat => ({ id: cat.id, label: cat.label }))}
                activeTab={selectedCategory}
                onChange={setSelectedCategory}
                variant="buttons"
                className="overflow-x-auto no-scrollbar pb-2 md:pb-0"
              />
            </div>
          </div>
        </div>

        {/* Prompts Grid */}
        <div className="p-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrompts.length > 0 ? (
              filteredPrompts.map((prompt, idx) => (
                <div 
                  key={prompt.id} 
                  className="group relative flex flex-col bg-[#121212] border border-white/5 rounded-2xl hover:border-accent/30 transition-all hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:-translate-y-1 overflow-hidden"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  {/* Card Header */}
                  <div className="p-5 border-b border-white/5 bg-[#1A1A1A]/50">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex flex-wrap gap-2">
                        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 text-[10px] font-bold text-gray-300 border border-white/5 group-hover:border-accent/20 group-hover:text-white transition-colors">
                          {getPlatformIcon(prompt.platform)} {prompt.platform}
                        </span>
                        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 text-[10px] font-bold text-gray-300 border border-white/5">
                          <Sparkles size={10} className="text-purple-400" /> {prompt.category}
                        </span>
                      </div>
                      
                      {/* Action Menu */}
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleEdit(prompt)}
                          className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                          title="Edit"
                        >
                          <Edit size={14} />
                        </button>
                        <button 
                          onClick={() => handleDelete(prompt.id)}
                          className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-display font-bold text-white leading-tight group-hover:text-accent transition-colors line-clamp-1">
                      {prompt.title}
                    </h3>
                  </div>

                  {/* Prompt Content */}
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="relative flex-1 mb-4 group/code">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#121212] pointer-events-none opacity-50" />
                      <p className="text-sm text-gray-400 font-mono leading-relaxed line-clamp-4 group-hover:text-gray-300 transition-colors">
                        {prompt.prompt}
                      </p>
                      
                      <button 
                        onClick={() => handleCopy(prompt.id, prompt.prompt)}
                        className={cn(
                          "absolute bottom-0 right-0 p-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all shadow-lg backdrop-blur-md border",
                          copiedId === prompt.id 
                            ? "bg-green-500/20 text-green-400 border-green-500/30" 
                            : "bg-[#1E1E1E] text-white border-white/10 opacity-0 group-hover/code:opacity-100 hover:bg-white/10"
                        )}
                      >
                        {copiedId === prompt.id ? (
                          <>
                            <Check size={14} /> Copied
                          </>
                        ) : (
                          <>
                            <Copy size={14} /> Copy
                          </>
                        )}
                      </button>
                    </div>

                    <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                      <div className="flex gap-1.5 overflow-hidden">
                        {prompt.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="text-[10px] font-medium text-gray-500 px-2 py-1 bg-white/5 rounded-md border border-white/5">
                            #{tag}
                          </span>
                        ))}
                        {prompt.tags.length > 2 && (
                          <span className="text-[10px] font-medium text-gray-500 px-2 py-1 bg-white/5 rounded-md border border-white/5">
                            +{prompt.tags.length - 2}
                          </span>
                        )}
                      </div>
                      
                      <button 
                        onClick={() => handleUse(prompt)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black text-xs font-bold hover:bg-accent hover:scale-105 transition-all shadow-lg"
                      >
                        <Zap size={14} className="fill-black" /> Use Now
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <EmptyState
                variant="search"
                title="No prompts found"
                description="We couldn't find any prompts matching your search. Try adjusting your filters or create a new one."
                action={{
                  label: "Clear Filters",
                  onClick: resetFilters,
                }}
                className="col-span-full py-32"
              />
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
      </div>
    </Layout>
  );
}