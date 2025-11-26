import React, { useState } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { 
  ArrowLeft, 
  Database, 
  Plus, 
  RefreshCw, 
  CheckCircle2, 
  XCircle, 
  BrainCircuit,
  FileText,
  UploadCloud,
  Settings,
  MoreHorizontal,
  Link as LinkIcon,
  Shield,
  Zap,
  X,
  Save,
  Trash2,
  RotateCcw
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GradientButton } from "@/components/GradientButton";

const INTEGRATION_CATEGORIES = ["All", "Productivity", "Creative", "Data", "Communication"];

const SOURCES = [
  { 
    id: "airtable", 
    name: "Airtable", 
    category: "Data",
    description: "Sync bases for content calendars & CRM.",
    icon: "https://cdn.simpleicons.org/airtable/18BFFF", 
    status: "connected", 
    lastSync: "5m ago",
    activeWorkflows: 3
  },
  { 
    id: "slack", 
    name: "Slack", 
    category: "Communication",
    description: "Monitor channels for trends & alerts.",
    icon: "https://cdn.simpleicons.org/slack/4A154B", 
    status: "connected", 
    lastSync: "Live",
    activeWorkflows: 12
  },
  { 
    id: "n8n", 
    name: "n8n Workflows", 
    category: "Productivity",
    description: "Orchestrate complex AI automation pipelines.",
    icon: "https://cdn.simpleicons.org/n8n/FF6584", 
    status: "connected", 
    lastSync: "1h ago",
    activeWorkflows: 8
  },
  { 
    id: "pandadoc", 
    name: "PandaDoc", 
    category: "Productivity",
    description: "Auto-generate contracts and proposals.",
    icon: "https://cdn.simpleicons.org/pandadoc/43A047", 
    status: "disconnected", 
    lastSync: null,
    activeWorkflows: 0
  },
  { 
    id: "google", 
    name: "Google Workspace", 
    category: "Productivity",
    description: "Access Drive, Docs, and Calendar context.",
    icon: "https://cdn.simpleicons.org/google/4285F4", 
    status: "connected", 
    lastSync: "10m ago",
    activeWorkflows: 5
  },
  { 
    id: "canva", 
    name: "Canva", 
    category: "Creative",
    description: "Generate and edit visual assets directly.",
    icon: "https://cdn.simpleicons.org/canva/00C4CC", 
    status: "connected", 
    lastSync: "30m ago",
    activeWorkflows: 2
  },
  { 
    id: "notion", 
    name: "Notion", 
    category: "Productivity",
    description: "Sync wikis and project databases.",
    icon: "https://cdn.simpleicons.org/notion/FFFFFF", 
    status: "disconnected", 
    lastSync: null,
    activeWorkflows: 0
  },
  { 
    id: "figma", 
    name: "Figma", 
    category: "Creative",
    description: "Read design tokens and asset libraries.",
    icon: "https://cdn.simpleicons.org/figma/F24E1E", 
    status: "disconnected", 
    lastSync: null,
    activeWorkflows: 0
  },
];

export default function ContextSources() {
  const [, setLocation] = useLocation();
  const [activeCategory, setActiveCategory] = useState("All");
  const [dragActive, setDragActive] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [selectedSource, setSelectedSource] = useState<typeof SOURCES[0] | null>(null);

  const filteredSources = activeCategory === "All" 
    ? SOURCES 
    : SOURCES.filter(s => s.category === activeCategory);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  return (
    <Layout hideTabs>
      <div className="min-h-screen bg-background pb-20 relative">
        
        {/* Global Settings Modal */}
        {settingsOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSettingsOpen(false)}>
            <div className="bg-[#1E1E1E] w-full max-w-md rounded-2xl border border-white/10 shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
              <div className="p-6 border-b border-white/5 flex justify-between items-center">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Settings size={18} /> Context Settings
                </h2>
                <button onClick={() => setSettingsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white">Auto-Sync</h3>
                      <p className="text-xs text-gray-400">Automatically refresh connected sources</p>
                    </div>
                    <div className="w-10 h-5 bg-green-500 rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white">Notifications</h3>
                      <p className="text-xs text-gray-400">Alerts on sync failures or updates</p>
                    </div>
                    <div className="w-10 h-5 bg-white/10 rounded-full relative cursor-pointer">
                      <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Sync Frequency</label>
                  <select className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none">
                    <option>Every 15 minutes</option>
                    <option>Every hour</option>
                    <option>Daily</option>
                    <option>Manual only</option>
                  </select>
                </div>
                
                <div className="pt-4 border-t border-white/5 flex justify-end gap-2">
                  <button onClick={() => setSettingsOpen(false)} className="px-4 py-2 rounded-lg text-xs font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                    Cancel
                  </button>
                  <GradientButton className="px-6 py-2 text-xs">
                    Save Changes
                  </GradientButton>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* App Settings Modal */}
        {selectedSource && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelectedSource(null)}>
            <div className="bg-[#1E1E1E] w-full max-w-lg rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]" onClick={e => e.stopPropagation()}>
              <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#161616]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white p-1.5 flex items-center justify-center shadow-lg">
                    <img src={selectedSource.icon} alt={selectedSource.name} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">{selectedSource.name} Settings</h2>
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "w-2 h-2 rounded-full",
                        selectedSource.status === "connected" ? "bg-green-500" : "bg-gray-500"
                      )} />
                      <span className="text-xs text-gray-400 capitalize">{selectedSource.status}</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => setSelectedSource(null)} className="text-gray-400 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-6 overflow-y-auto">
                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <div className="flex items-start gap-3">
                    <Zap size={18} className="text-blue-400 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-bold text-white mb-1">Active Workflows</h3>
                      <p className="text-xs text-gray-300 leading-relaxed">
                        This integration is currently powering {selectedSource.activeWorkflows} active workflows, including "Daily Summary" and "Content Sync".
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-white">Permissions</h3>
                  <div className="space-y-2">
                    {["Read Access", "Write Access", "Metadata Access"].map((perm, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                        <span className="text-sm text-gray-300">{perm}</span>
                        <CheckCircle2 size={16} className="text-green-500" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-white">Actions</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center gap-2 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-colors text-xs font-bold text-white">
                      <RotateCcw size={14} /> Re-sync Now
                    </button>
                    <button className="flex items-center justify-center gap-2 p-3 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 transition-colors text-xs font-bold text-red-400">
                      <Trash2 size={14} /> Disconnect
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border-t border-white/5 bg-[#161616] flex justify-end">
                <GradientButton onClick={() => setSelectedSource(null)} className="px-6 py-2 text-xs">
                  Done
                </GradientButton>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between p-6 pt-8 bg-background/80 backdrop-blur-md sticky top-0 z-20 border-b border-white/5">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setLocation("/create")}
              className="p-2 -ml-2 rounded-full hover:bg-white/10 text-white transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-xl font-display font-bold text-white flex items-center gap-2">
                Context Hub
                <div className="px-2 py-0.5 rounded bg-accent/10 text-accent text-[10px] font-bold border border-accent/20">
                  BETA
                </div>
              </h1>
              <p className="text-xs text-gray-400">Manage your AI's knowledge base & tools</p>
            </div>
          </div>
          <button 
            onClick={() => setSettingsOpen(true)}
            className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <Settings size={20} />
          </button>
        </div>

        <div className="p-6 max-w-7xl mx-auto space-y-8">
          
          {/* Visual Context Graph (Abstract Representation) */}
          <div className="relative h-48 rounded-2xl bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-white/10 overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
            
            <div className="relative z-10 text-center">
              <div className="w-16 h-16 mx-auto bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 mb-4 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                <BrainCircuit size={32} className="text-white" />
              </div>
              <h2 className="text-lg font-bold text-white">Knowledge Graph Active</h2>
              <p className="text-xs text-gray-400 mt-1">
                Synced with <span className="text-white font-bold">12 sources</span> • Last update: <span className="text-green-400 font-bold">Just now</span>
              </p>
            </div>

            {/* Floating Particles/Nodes Animation (Simulated) */}
            {[...Array(6)].map((_, i) => (
              <div 
                key={i}
                className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-40 animate-pulse"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.5}s`,
                  boxShadow: "0 0 10px rgba(59,130,246,0.5)"
                }}
              />
            ))}
          </div>

          {/* Knowledge Upload Zone */}
          <div 
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            className={cn(
              "border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer group",
              dragActive 
                ? "border-accent bg-accent/5 scale-[1.01]" 
                : "border-white/10 hover:border-white/20 hover:bg-white/5"
            )}
          >
            <div className="w-12 h-12 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <UploadCloud size={24} className="text-gray-400 group-hover:text-white" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1">Upload Knowledge Files</h3>
            <p className="text-xs text-gray-500 mb-4">
              Drag & drop PDFs, TXT, or MD files to train your AI context.
            </p>
            <div className="flex justify-center gap-2">
              <span className="text-[10px] px-2 py-1 rounded bg-white/5 text-gray-400 border border-white/5">
                .pdf
              </span>
              <span className="text-[10px] px-2 py-1 rounded bg-white/5 text-gray-400 border border-white/5">
                .docx
              </span>
              <span className="text-[10px] px-2 py-1 rounded bg-white/5 text-gray-400 border border-white/5">
                .txt
              </span>
            </div>
          </div>

          {/* Integrations Section */}
          <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <LinkIcon size={18} className="text-accent" />
                Connected Apps
              </h2>
              
              {/* Category Filter */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
                {INTEGRATION_CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors border",
                      activeCategory === cat 
                        ? "bg-white text-black border-white" 
                        : "bg-transparent text-gray-400 border-transparent hover:bg-white/5 hover:text-white"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSources.map(source => (
                <div 
                  key={source.id}
                  className="p-5 rounded-2xl bg-[#1E1E1E] border border-white/5 hover:border-white/10 transition-all group relative overflow-hidden"
                >
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <div className="w-10 h-10 rounded-lg bg-white p-1.5 flex items-center justify-center shadow-lg">
                      <img src={source.icon} alt={source.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex items-center gap-2">
                      {source.status === "connected" ? (
                        <div className="flex items-center gap-1.5 bg-green-500/10 px-2 py-1 rounded-md border border-green-500/20">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                          <span className="text-[10px] font-bold text-green-400">Active</span>
                        </div>
                      ) : (
                        <div className="bg-white/5 px-2 py-1 rounded-md border border-white/5">
                          <span className="text-[10px] font-bold text-gray-500">Inactive</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="relative z-10 mb-4 min-h-[60px]">
                    <h3 className="font-bold text-white text-sm mb-1">{source.name}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">{source.description}</p>
                  </div>

                  {/* Stats/Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5 relative z-10">
                    {source.status === "connected" ? (
                      <>
                        <span className="text-[10px] text-gray-500 flex items-center gap-1">
                          <Zap size={12} className="text-yellow-400" />
                          {source.activeWorkflows} Workflows
                        </span>
                        <button 
                          onClick={() => setSelectedSource(source)}
                          className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                        >
                          <Settings size={14} />
                        </button>
                      </>
                    ) : (
                      <button className="w-full py-2 rounded-lg bg-white/5 text-white text-xs font-bold hover:bg-white/10 border border-white/10 transition-colors">
                        Connect App
                      </button>
                    )}
                  </div>

                  {/* Hover Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>
              ))}

              {/* Add New Card */}
              <button className="p-5 rounded-2xl border-2 border-dashed border-white/10 hover:border-accent/50 hover:bg-accent/5 transition-all flex flex-col items-center justify-center gap-3 text-gray-500 hover:text-accent group h-full min-h-[200px]">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Plus size={24} />
                </div>
                <span className="text-sm font-bold">Add Custom MCP</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}