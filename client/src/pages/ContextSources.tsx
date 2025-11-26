import React from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { ArrowLeft, Database, Plus, RefreshCw, CheckCircle2, XCircle, BrainCircuit } from "lucide-react";
import { cn } from "@/lib/utils";

const SOURCES = [
  { id: "airtable", name: "Airtable", icon: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Airtable_Logo.svg", status: "connected", lastSync: "5m ago" },
  { id: "slack", name: "Slack", icon: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg", status: "connected", lastSync: "Live" },
  { id: "n8n", name: "n8n Workflows", icon: "https://upload.wikimedia.org/wikipedia/commons/f/f3/N8n-logo.png", status: "connected", lastSync: "1h ago" },
  { id: "pandadoc", name: "PandaDoc", icon: "https://upload.wikimedia.org/wikipedia/commons/e/e7/PandaDoc_logo.svg", status: "disconnected", lastSync: null },
  { id: "google", name: "Google Workspace", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1024px-Google_%22G%22_Logo.svg.png", status: "connected", lastSync: "10m ago" },
  { id: "canva", name: "Canva", icon: "https://upload.wikimedia.org/wikipedia/commons/0/08/Canva_icon_2021.svg", status: "connected", lastSync: "30m ago" },
];

export default function ContextSources() {
  const [, setLocation] = useLocation();

  return (
    <Layout hideTabs>
      <div className="min-h-screen bg-background pb-8">
        {/* Header */}
        <div className="flex items-center gap-4 p-4 pt-8 bg-background/80 backdrop-blur-md sticky top-0 z-20 border-b border-white/5">
          <button 
            onClick={() => setLocation("/create")}
            className="p-2 -ml-2 rounded-full hover:bg-white/10 text-white transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-xl font-display font-bold text-white flex items-center gap-2">
              Integrations Hub
              <BrainCircuit size={18} className="text-accent" />
            </h1>
            <p className="text-xs text-gray-400">Manage your connected ecosystem</p>
          </div>
        </div>

        <div className="p-6">
          {/* MCP Explanation */}
          <div className="mb-8 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <h3 className="text-sm font-bold text-blue-400 mb-1">Connected Ecosystem</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Your stack is synced. Society AI uses Perplexity & Tavily for search, Claude & OpenAI for reasoning, and Replicate for generation.
            </p>
          </div>

          {/* Active Sources */}
          <div className="space-y-4">
            {SOURCES.map(source => (
              <div 
                key={source.id}
                className="p-4 rounded-xl bg-[#1E1E1E] border border-white/5 flex items-center justify-between group hover:border-white/10 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white p-1.5 flex items-center justify-center">
                    <img src={source.icon} alt={source.name} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">{source.name}</h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      {source.status === "connected" ? (
                        <span className="text-green-500 flex items-center gap-1">
                          <CheckCircle2 size={10} /> Synced {source.lastSync}
                        </span>
                      ) : (
                        <span className="text-gray-500">Not connected</span>
                      )}
                    </p>
                  </div>
                </div>

                {source.status === "connected" ? (
                  <button className="p-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
                    <RefreshCw size={16} />
                  </button>
                ) : (
                  <button className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-white hover:bg-white/10 transition-colors">
                    Connect
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Add Custom Source */}
          <button className="w-full mt-4 py-4 rounded-xl border-2 border-dashed border-white/10 flex items-center justify-center gap-2 text-gray-500 hover:text-white hover:border-white/20 transition-all hover:bg-white/5">
            <Plus size={20} />
            <span className="font-bold text-sm">Add Custom MCP Server</span>
          </button>

        </div>
      </div>
    </Layout>
  );
}
