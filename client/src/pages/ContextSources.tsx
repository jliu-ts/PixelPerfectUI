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
  Zap
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
    icon: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Airtable_Logo.svg", 
    status: "connected", 
    lastSync: "5m ago",
    activeWorkflows: 3
  },
  { 
    id: "slack", 
    name: "Slack", 
    category: "Communication",
    description: "Monitor channels for trends & alerts.",
    icon: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg", 
    status: "connected", 
    lastSync: "Live",
    activeWorkflows: 12
  },
  { 
    id: "n8n", 
    name: "n8n Workflows", 
    category: "Productivity",
    description: "Orchestrate complex AI automation pipelines.",
    icon: "https://upload.wikimedia.org/wikipedia/commons/f/f3/N8n-logo.png", 
    status: "connected", 
    lastSync: "1h ago",
    activeWorkflows: 8
  },
  { 
    id: "pandadoc", 
    name: "PandaDoc", 
    category: "Productivity",
    description: "Auto-generate contracts and proposals.",
    icon: "https://upload.wikimedia.org/wikipedia/commons/e/e7/PandaDoc_logo.svg", 
    status: "disconnected", 
    lastSync: null,
    activeWorkflows: 0
  },
  { 
    id: "google", 
    name: "Google Workspace", 
    category: "Productivity",
    description: "Access Drive, Docs, and Calendar context.",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1024px-Google_%22G%22_Logo.svg.png", 
    status: "connected", 
    lastSync: "10m ago",
    activeWorkflows: 5
  },
  { 
    id: "canva", 
    name: "Canva", 
    category: "Creative",
    description: "Generate and edit visual assets directly.",
    icon: "https://upload.wikimedia.org/wikipedia/commons/0/08/Canva_icon_2021.svg", 
    status: "connected", 
    lastSync: "30m ago",
    activeWorkflows: 2
  },
  { 
    id: "notion", 
    name: "Notion", 
    category: "Productivity",
    description: "Sync wikis and project databases.",
    icon: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png", 
    status: "disconnected", 
    lastSync: null,
    activeWorkflows: 0
  },
  { 
    id: "figma", 
    name: "Figma", 
    category: "Creative",
    description: "Read design tokens and asset libraries.",
    icon: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg", 
    status: "disconnected", 
    lastSync: null,
    activeWorkflows: 0
  },
];

export default function ContextSources() {
  const [, setLocation] = useLocation();
  const [activeCategory, setActiveCategory] = useState("All");
  const [dragActive, setDragActive] = useState(false);

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
      <div className="min-h-screen bg-background pb-20">
        
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
          <button className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
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
                        <button className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
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