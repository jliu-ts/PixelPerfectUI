import React from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { GradientButton } from "@/components/GradientButton";
import { ArrowLeft, Palette, Type, Image as ImageIcon, Link2, CheckCircle2, RefreshCw, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Data
const TEMPLATES = [
  { id: 1, name: "Instagram Story - Tech", image: "https://picsum.photos/seed/canva1/200/355" },
  { id: 2, name: "LinkedIn Carousel", image: "https://picsum.photos/seed/canva2/300/300" },
  { id: 3, name: "YouTube Thumbnail", image: "https://picsum.photos/seed/canva3/320/180" },
];

const BRAND_COLORS = ["#7C3AED", "#22D3EE", "#FFFFFF", "#000000", "#FF5733"];

export default function BrandKit() {
  const [, setLocation] = useLocation();
  const [isConnecting, setIsConnecting] = React.useState(false);
  const [isConnected, setIsConnected] = React.useState(true); // Mock pre-connected state

  const handleConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
    }, 1500);
  };

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
          <h1 className="text-xl font-display font-bold text-white">Brand Kit</h1>
        </div>

        <div className="p-6 space-y-8">
          
          {/* Canva Integration */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#00C4CC]/10 to-[#7D2AE8]/10 border border-[#00C4CC]/20 relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Canva_icon_2021.svg" className="w-6 h-6" alt="Canva" />
                  Canva Connect
                </h2>
                <p className="text-xs text-gray-400 mt-1">Sync templates & assets directly</p>
              </div>
              {isConnected ? (
                <span className="px-3 py-1 rounded-full bg-[#00C4CC]/20 text-[#00C4CC] text-xs font-bold flex items-center gap-1">
                  <CheckCircle2 size={12} /> Active
                </span>
              ) : (
                <button 
                  onClick={handleConnect}
                  className="px-4 py-2 rounded-lg bg-[#00C4CC] text-black text-xs font-bold hover:brightness-110 transition-all"
                >
                  {isConnecting ? "Connecting..." : "Connect Account"}
                </button>
              )}
            </div>

            {isConnected && (
              <div className="mt-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-medium text-gray-300">Synced Templates</h3>
                  <button className="p-1.5 rounded-full hover:bg-white/10 text-gray-400">
                    <RefreshCw size={14} />
                  </button>
                </div>
                <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                  {TEMPLATES.map(t => (
                    <div key={t.id} className="shrink-0 w-32 group cursor-pointer">
                      <div className="aspect-[3/4] rounded-xl overflow-hidden relative border border-white/10 mb-2">
                        <img src={t.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt={t.name} />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-xs font-bold text-white">Select</span>
                        </div>
                      </div>
                      <p className="text-[10px] text-gray-400 truncate">{t.name}</p>
                    </div>
                  ))}
                  <div className="shrink-0 w-32 flex flex-col items-center justify-center aspect-[3/4] rounded-xl border-2 border-dashed border-white/10 hover:border-[#00C4CC]/50 hover:bg-[#00C4CC]/5 transition-all cursor-pointer">
                    <Plus size={24} className="text-gray-500 mb-2" />
                    <span className="text-xs text-gray-500">Import New</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Visual Identity */}
          <div>
            <h3 className="text-sm font-bold text-gray-400 uppercase mb-4 flex items-center gap-2">
              <Palette size={14} /> Brand Colors
            </h3>
            <div className="flex gap-3 flex-wrap">
              {BRAND_COLORS.map(color => (
                <div key={color} className="group relative">
                  <div 
                    className="w-12 h-12 rounded-full border-2 border-white/10 shadow-lg cursor-pointer transition-transform hover:scale-110"
                    style={{ backgroundColor: color }}
                  />
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    {color}
                  </span>
                </div>
              ))}
              <button className="w-12 h-12 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center text-gray-500 hover:text-white hover:border-white/50 transition-colors">
                <Plus size={20} />
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-400 uppercase mb-4 flex items-center gap-2">
              <Type size={14} /> Typography
            </h3>
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-[#1E1E1E] border border-white/5 flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Primary Font</p>
                  <p className="text-lg font-display text-white">Outfit</p>
                </div>
                <button className="text-xs text-accent hover:underline">Change</button>
              </div>
              <div className="p-4 rounded-xl bg-[#1E1E1E] border border-white/5 flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Body Font</p>
                  <p className="text-lg font-sans text-white">Inter</p>
                </div>
                <button className="text-xs text-accent hover:underline">Change</button>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-400 uppercase mb-4 flex items-center gap-2">
              <ImageIcon size={14} /> Logo Assets
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-video rounded-xl bg-[#1E1E1E] border border-white/5 flex items-center justify-center p-4 relative group">
                <div className="text-2xl font-bold text-white">LOGO</div>
                <div className="absolute top-2 right-2 text-[10px] bg-black/50 px-2 rounded text-gray-300">Light</div>
              </div>
              <div className="aspect-video rounded-xl bg-white border border-white/5 flex items-center justify-center p-4 relative group">
                <div className="text-2xl font-bold text-black">LOGO</div>
                <div className="absolute top-2 right-2 text-[10px] bg-black/10 px-2 rounded text-gray-600">Dark</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}
