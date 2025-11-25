import React, { useState } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { ArrowLeft, ShoppingBag, Link2, CheckCircle2, Search, Sparkles, Plus, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { GradientButton } from "@/components/GradientButton";

// Mock Products
const PRODUCTS = [
  { id: 1, name: "Neon Cyber Hoodie", price: "$89.00", image: "https://picsum.photos/seed/hoodie/300/300", status: "active" },
  { id: 2, name: "Holographic Sneakers", price: "$145.00", image: "https://picsum.photos/seed/sneakers/300/300", status: "active" },
  { id: 3, name: "Neural Link Headset", price: "$299.00", image: "https://picsum.photos/seed/headset/300/300", status: "draft" },
  { id: 4, name: "Smart Water Bottle", price: "$45.00", image: "https://picsum.photos/seed/bottle/300/300", status: "active" },
];

export default function EcommerceConnect() {
  const [, setLocation] = useLocation();
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
    }, 1500);
  };

  const handleGenerateForProduct = (product: any) => {
    setLocation("/create", { 
      state: { 
        prompt: `High-energy commercial shot of ${product.name}, studio lighting, 4k, promotional video`,
        mode: "video",
        style: "Cinematic",
        model: "Google Veo"
      } 
    });
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
          <div>
            <h1 className="text-xl font-display font-bold text-white flex items-center gap-2">
              Store Connect
              <ShoppingBag size={18} className="text-green-400" />
            </h1>
            <p className="text-xs text-gray-400">Import products for content generation</p>
          </div>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Connection Card */}
          <div className={cn(
            "p-6 rounded-2xl border relative overflow-hidden transition-all",
            isConnected 
              ? "bg-[#1E1E1E] border-green-500/30" 
              : "bg-gradient-to-br from-[#95BF47]/10 to-[#5E8E3E]/10 border-[#95BF47]/20"
          )}>
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-lg p-2 flex items-center justify-center">
                   <img src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_icon_2021.svg" alt="Shopify" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Shopify</h2>
                  <p className="text-xs text-gray-400">Sync products & inventory</p>
                </div>
              </div>
              {isConnected ? (
                <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold flex items-center gap-1">
                  <CheckCircle2 size={12} /> Connected
                </span>
              ) : (
                <button 
                  onClick={handleConnect}
                  className="px-4 py-2 rounded-lg bg-[#95BF47] text-black text-xs font-bold hover:brightness-110 transition-all flex items-center gap-1"
                >
                  {isConnecting ? "Syncing..." : "Connect Store"}
                </button>
              )}
            </div>
            
            {!isConnected && (
              <p className="text-xs text-gray-300 mt-2 leading-relaxed">
                Connect your store to automatically import product images and descriptions. Generate ads, social posts, and product showcases in seconds.
              </p>
            )}
          </div>

          {/* Product Grid */}
          {isConnected && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-bold text-gray-400 uppercase">Recent Products</h3>
                <div className="relative">
                   <Search size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
                   <input 
                    type="text" 
                    placeholder="Search..." 
                    className="bg-[#1E1E1E] border border-white/10 rounded-full pl-8 pr-3 py-1 text-xs text-white w-32 focus:outline-none focus:border-white/30"
                   />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {PRODUCTS.map(product => (
                  <div key={product.id} className="bg-[#1E1E1E] border border-white/5 rounded-xl overflow-hidden group relative">
                    <div className="aspect-square relative overflow-hidden">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute top-2 right-2">
                        <span className={cn(
                          "text-[10px] font-bold px-2 py-0.5 rounded-full",
                          product.status === "active" ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"
                        )}>
                          {product.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-3">
                      <h4 className="text-sm font-bold text-white truncate mb-1">{product.name}</h4>
                      <p className="text-xs text-gray-500 mb-3">{product.price}</p>
                      
                      <button 
                        onClick={() => handleGenerateForProduct(product)}
                        className="w-full py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-white flex items-center justify-center gap-1 hover:bg-white/10 hover:border-accent/50 transition-all group/btn"
                      >
                        <Sparkles size={12} className="text-accent group-hover/btn:animate-pulse" />
                        Generate Ad
                      </button>
                    </div>
                  </div>
                ))}
                
                {/* Add New Placeholder */}
                <div className="bg-[#1E1E1E] border border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center aspect-[2/3] gap-2 hover:bg-white/5 cursor-pointer transition-colors">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Plus size={20} className="text-gray-400" />
                  </div>
                  <span className="text-xs font-bold text-gray-500">Add Product</span>
                </div>
              </div>
            </div>
          )}

          {/* Promo / Info */}
          {!isConnected && (
            <div className="grid grid-cols-2 gap-3 opacity-50 pointer-events-none">
               {[1,2].map(i => (
                 <div key={i} className="bg-[#1E1E1E] rounded-xl h-48"></div>
               ))}
            </div>
          )}

        </div>
      </div>
    </Layout>
  );
}
