import React, { useState } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { ArrowLeft, ShoppingBag, Link2, CheckCircle2, Search, Sparkles, Plus, ExternalLink, Video, Image as ImageIcon, Type, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { GradientButton } from "@/components/GradientButton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

// Mock Products
const PRODUCTS = [
  { id: 1, name: "Neon Cyber Hoodie", price: "$89.00", image: "https://picsum.photos/seed/hoodie/300/300", status: "active", category: "Apparel" },
  { id: 2, name: "Holographic Sneakers", price: "$145.00", image: "https://picsum.photos/seed/sneakers/300/300", status: "active", category: "Footwear" },
  { id: 3, name: "Neural Link Headset", price: "$299.00", image: "https://picsum.photos/seed/headset/300/300", status: "draft", category: "Electronics" },
  { id: 4, name: "Smart Water Bottle", price: "$45.00", image: "https://picsum.photos/seed/bottle/300/300", status: "active", category: "Accessories" },
];

const GENERATION_OPTIONS = [
  {
    id: "video-ad",
    label: "Video Commercial",
    icon: Video,
    description: "High-energy cinematic product showcase",
    model: "Google Veo",
    mode: "video",
    style: "Cinematic"
  },
  {
    id: "social-post",
    label: "Social Media Post",
    icon: Share2,
    description: "Viral-ready Instagram/TikTok content",
    model: "Midjourney v6",
    mode: "image",
    style: "Lifestyle"
  },
  {
    id: "product-photo",
    label: "AI Photoshoot",
    icon: ImageIcon,
    description: "Studio quality product photography",
    model: "Stable Diffusion XL",
    mode: "image",
    style: "Studio"
  },
  {
    id: "copy",
    label: "Marketing Copy",
    icon: Type,
    description: "SEO-optimized product descriptions",
    model: "GPT-4",
    mode: "text",
    style: "Professional"
  }
];

export default function EcommerceConnect() {
  const [, setLocation] = useLocation();
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<typeof PRODUCTS[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
    }, 1500);
  };

  const handleOpenGenerate = (product: typeof PRODUCTS[0]) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const handleSelectOption = (option: typeof GENERATION_OPTIONS[0]) => {
    if (!selectedProduct) return;
    
    setLocation("/create", { 
      state: { 
        usr: {
          prompt: `Create a ${option.style.toLowerCase()} ${option.label.toLowerCase()} for ${selectedProduct.name} (${selectedProduct.category}). Focus on features, high quality, 4k.`,
          mode: option.mode,
          style: option.style,
          model: option.model
        }
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
                <div className="w-12 h-12 bg-white rounded-xl p-2 flex items-center justify-center shadow-lg">
                   <img 
                     src="https://cdn.worldvectorlogo.com/logos/shopify.svg" 
                     alt="Shopify" 
                     className="w-full h-full object-contain" 
                   />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Shopify Store</h2>
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
                  className="px-4 py-2 rounded-lg bg-[#95BF47] text-black text-xs font-bold hover:brightness-110 transition-all flex items-center gap-1 shadow-[0_0_15px_rgba(149,191,71,0.3)]"
                >
                  {isConnecting ? "Syncing..." : "Connect Store"}
                </button>
              )}
            </div>
            
            {!isConnected && (
              <p className="text-xs text-gray-300 mt-2 leading-relaxed max-w-md">
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
                   <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                   <input 
                    type="text" 
                    placeholder="Search products..." 
                    className="bg-[#1E1E1E] border border-white/10 rounded-full pl-9 pr-4 py-2 text-xs text-white w-48 focus:outline-none focus:border-white/30 transition-all"
                   />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {PRODUCTS.map(product => (
                  <div key={product.id} className="bg-[#1E1E1E] border border-white/5 rounded-xl overflow-hidden group relative hover:border-white/20 transition-colors">
                    <div className="aspect-square relative overflow-hidden">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className={cn(
                          "text-[10px] font-bold px-2 py-0.5 h-auto",
                          product.status === "active" ? "bg-green-500/20 text-green-400 hover:bg-green-500/30" : "bg-gray-500/20 text-gray-400"
                        )}>
                          {product.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="p-3">
                      <h4 className="text-sm font-bold text-white truncate mb-1">{product.name}</h4>
                      <p className="text-xs text-gray-500 mb-3">{product.price}</p>
                      
                      <button 
                        onClick={() => handleOpenGenerate(product)}
                        className="w-full py-2.5 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-white flex items-center justify-center gap-2 hover:bg-accent hover:text-black hover:border-accent transition-all group/btn"
                      >
                        <Sparkles size={14} className="text-accent group-hover/btn:text-black" />
                        Create Content
                      </button>
                    </div>
                  </div>
                ))}
                
                {/* Add New Placeholder */}
                <div className="bg-[#1E1E1E] border border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center aspect-[2/3] gap-3 hover:bg-white/5 cursor-pointer transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Plus size={24} className="text-gray-400 group-hover:text-white" />
                  </div>
                  <span className="text-xs font-bold text-gray-500 group-hover:text-white">Import Product</span>
                </div>
              </div>
            </div>
          )}

          {/* Promo / Info Skeleton */}
          {!isConnected && (
            <div className="grid grid-cols-2 gap-4 opacity-30 pointer-events-none select-none">
               {[1,2].map(i => (
                 <div key={i} className="bg-[#1E1E1E] rounded-xl h-64 border border-white/5"></div>
               ))}
            </div>
          )}

        </div>

        {/* Generation Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-[#1E1E1E] border-white/10 text-white sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-display">Create Content</DialogTitle>
              <DialogDescription className="text-gray-400">
                What would you like to generate for <span className="text-white font-bold">{selectedProduct?.name}</span>?
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 gap-3 mt-2">
              {GENERATION_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleSelectOption(option)}
                  className="flex items-center gap-4 p-4 rounded-xl bg-black/20 border border-white/5 hover:bg-white/5 hover:border-accent/50 transition-all text-left group"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-accent group-hover:bg-accent/10 transition-colors">
                    <option.icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm mb-0.5">{option.label}</h4>
                    <p className="text-xs text-gray-500">{option.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </DialogContent>
        </Dialog>

      </div>
    </Layout>
  );
}
