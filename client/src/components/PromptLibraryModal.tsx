import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Library, Plus, ChevronLeft, Edit2, Trash2, Save } from "lucide-react";
import { usePrompts, Prompt } from "@/hooks/usePrompts";

interface PromptLibraryModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectPrompt: (promptText: string) => void;
}

export function PromptLibraryModal({ isOpen, onOpenChange, onSelectPrompt }: PromptLibraryModalProps) {
  const { getPromptsByCategory, addPrompt, updatePrompt, deletePrompt } = usePrompts();
  const [view, setView] = useState<"list" | "edit" | "create">("list");
  const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    title: "",
    prompt: "",
    category: "General",
    platform: "General",
    tags: ""
  });

  const resetForm = () => {
    setFormData({ title: "", prompt: "", category: "General", platform: "General", tags: "" });
    setEditingPrompt(null);
  };

  const handleEditClick = (prompt: Prompt, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingPrompt(prompt);
    setFormData({
      title: prompt.title,
      prompt: prompt.prompt,
      category: prompt.category,
      platform: prompt.platform,
      tags: prompt.tags.join(", ")
    });
    setView("edit");
  };

  const handleDeleteClick = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    deletePrompt(id);
  };

  const handleSave = () => {
    if (!formData.title || !formData.prompt) return;

    const tagsArray = formData.tags.split(",").map(t => t.trim()).filter(Boolean);
    const promptData = {
      title: formData.title,
      prompt: formData.prompt,
      category: formData.category,
      platform: formData.platform,
      tags: tagsArray
    };

    if (view === "create") {
      addPrompt(promptData);
    } else if (view === "edit" && editingPrompt) {
      updatePrompt({
        ...editingPrompt,
        ...promptData,
        lastUsed: "Just now"
      });
    }

    setView("list");
    resetForm();
  };

  const groupedPrompts = getPromptsByCategory();

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1E1E1E] border-white/10 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <Library className="text-accent" size={20} /> 
              {view === "list" ? "Prompt Library" : view === "create" ? "Create Prompt" : "Edit Prompt"}
            </div>
          </DialogTitle>
          
          <div className="flex justify-end pt-2">
            {view === "list" && (
              <button 
                onClick={() => {
                  resetForm();
                  setView("create");
                }}
                className="text-xs bg-accent text-black px-3 py-1.5 rounded-lg font-bold hover:bg-accent/80 flex items-center gap-1 z-20 relative"
              >
                <Plus size={14} /> New Prompt
              </button>
            )}
            {view !== "list" && (
               <button 
                 onClick={() => {
                   setView("list");
                   resetForm();
                 }}
                 className="text-xs bg-white/10 text-white px-3 py-1.5 rounded-lg font-bold hover:bg-white/20 flex items-center gap-1 z-20 relative"
               >
                 <ChevronLeft size={14} /> Back to List
               </button>
            )}
          </div>
        </DialogHeader>
        
        {view === "list" ? (
          <div className="space-y-6 mt-2">
            {groupedPrompts.map((category, i) => (
              <div key={i}>
                <h4 className="text-xs font-bold text-gray-500 uppercase mb-3 tracking-wider">{category.category}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {category.items.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        onSelectPrompt(item.prompt);
                        onOpenChange(false);
                      }}
                      className="relative text-left p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-accent/50 transition-all group h-full flex flex-col cursor-pointer"
                    >
                      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-[#1E1E1E] rounded-lg p-1 shadow-lg border border-white/5 z-10">
                         <button 
                           onClick={(e) => handleEditClick(item, e)}
                           className="p-1.5 hover:bg-white/10 rounded-md text-gray-400 hover:text-white transition-colors"
                           title="Edit Prompt"
                         >
                           <Edit2 size={12} />
                         </button>
                         <button 
                           onClick={(e) => handleDeleteClick(item.id, e)}
                           className="p-1.5 hover:bg-red-500/20 rounded-md text-gray-400 hover:text-red-400 transition-colors"
                           title="Delete Prompt"
                         >
                           <Trash2 size={12} />
                         </button>
                      </div>

                      <div className="flex items-center justify-between mb-2 pr-12">
                        <span className="font-bold text-sm text-white group-hover:text-accent transition-colors">{item.title}</span>
                      </div>
                      <span className="text-[10px] text-gray-500 mb-2 block">{item.platform}</span>
                      <p className="text-xs text-gray-400 line-clamp-3 mb-3 flex-1">
                        "{item.prompt}"
                      </p>
                      <div className="flex flex-wrap gap-1 mt-auto">
                        {item.tags.map((tag, k) => (
                          <span key={k} className="text-[9px] px-1.5 py-0.5 bg-black/30 rounded text-gray-500 border border-white/5">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {groupedPrompts.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <Library size={48} className="mx-auto mb-4 opacity-20" />
                <p>No prompts found. Create one to get started!</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4 mt-2">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase">Title</label>
              <input 
                type="text" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-accent focus:outline-none"
                placeholder="e.g. Viral TikTok Hook"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase">Category</label>
                <input 
                  type="text" 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-accent focus:outline-none"
                  placeholder="e.g. Social"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase">Platform</label>
                <input 
                  type="text" 
                  value={formData.platform}
                  onChange={(e) => setFormData({...formData, platform: e.target.value})}
                  className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-accent focus:outline-none"
                  placeholder="e.g. Instagram"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase">Prompt</label>
              <textarea 
                value={formData.prompt}
                onChange={(e) => setFormData({...formData, prompt: e.target.value})}
                className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-accent focus:outline-none min-h-[120px] resize-none"
                placeholder="Write your prompt here..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase">Tags (comma separated)</label>
              <input 
                type="text" 
                value={formData.tags}
                onChange={(e) => setFormData({...formData, tags: e.target.value})}
                className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-accent focus:outline-none"
                placeholder="e.g. Viral, Tech, 4K"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button 
                onClick={handleSave}
                className="flex-1 bg-accent text-black py-3 rounded-xl font-bold hover:bg-accent/80 transition-colors flex items-center justify-center gap-2"
              >
                <Save size={16} /> Save Prompt
              </button>
              <button 
                onClick={() => {
                  setView("list");
                  resetForm();
                }}
                className="px-6 bg-white/5 text-white py-3 rounded-xl font-bold hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
