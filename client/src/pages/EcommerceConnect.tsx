import React, { useState } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { 
  ArrowLeft, 
  ShoppingBag, 
  CheckCircle2, 
  Search, 
  Sparkles, 
  Plus, 
  Video, 
  Image as ImageIcon, 
  Type, 
  Share2,
  BarChart3,
  TrendingUp,
  Package,
  RefreshCw,
  ExternalLink,
  MoreHorizontal,
  Store
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ECOMMERCE_PRODUCTS, ECOMMERCE_GENERATION_OPTIONS } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";
import { BRAND_LOGOS } from "@/lib/constants/brandLogos";

export default function EcommerceConnect() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<typeof ECOMMERCE_PRODUCTS[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      toast({
        title: "Store Connected",
        description: "Your Shopify products have been synced successfully.",
      });
    }, 1500);
  };

  const handleOpenGenerate = (product: typeof ECOMMERCE_PRODUCTS[0]) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const handleSelectOption = (option: typeof ECOMMERCE_GENERATION_OPTIONS[0]) => {
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
      <div className="min-h-screen bg-background pb-24 md:pb-8">
        {/* Sticky Header */}
        <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-white/5">
          <div className="px-6 pt-6 pb-6 max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button aria-label="Go back" 
                onClick={() => setLocation("/create")}
                className="p-2 -ml-2 rounded-full hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
                  My Store
                  <Store size={18} className="text-green-400" />
                </h1>
                <p className="text-xs text-gray-400">Manage inventory & generate marketing assets</p>
              </div>
            </div>
            
            {isConnected && (
              <div className="flex items-center gap-3">
                 <span className="hidden md:flex items-center gap-2 text-[10px] text-gray-500 px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
                   <RefreshCw size={10} /> Auto-sync on
                 </span>
                 <button aria-label="Open in new tab" className="p-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
                   <ExternalLink size={18} />
                 </button>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 max-w-7xl mx-auto space-y-8">
          
          {/* Connection / Overview Hero */}
          <div className={cn(
            "rounded-3xl border relative overflow-hidden transition-all duration-500",
            isConnected 
              ? "bg-[#121212] border-white/5 p-6 md:p-8" 
              : "bg-gradient-to-br from-[#95BF47]/10 to-[#5E8E3E]/5 border-[#95BF47]/20 p-8 md:p-12"
          )}>
            {/* Ambient Background */}
            {isConnected ? (
               <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/5 blur-[100px] rounded-full pointer-events-none" />
            ) : (
               <div className="absolute top-0 right-0 w-96 h-96 bg-[#95BF47]/10 blur-[80px] rounded-full pointer-events-none" />
            )}

            <div className="relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
                <div className="flex items-center gap-5">
                  <div className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg shrink-0 transition-all",
                    isConnected ? "bg-white p-3" : "bg-white p-3 shadow-[0_0_30px_rgba(149,191,71,0.3)]"
                  )}>
                     <img loading="lazy" decoding="async" 
                       src={BRAND_LOGOS.shopify} 
                       alt="Shopify" 
                       className="w-full h-full object-contain" 
                     />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-xl font-bold text-white">Shopify Store</h2>
                      {isConnected && (
                        <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20 text-[10px] h-5">
                          Connected
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-400 max-w-md">
                      {isConnected 
                        ? "Store synced. Ready to generate AI content." 
                        : "Connect your store to automatically import products and generate ads, descriptions, and social posts."}
                    </p>
                  </div>
                </div>

                {!isConnected && (
                  <button 
                    onClick={handleConnect}
                    disabled={isConnecting}
                    className="px-6 py-3 rounded-xl bg-[#95BF47] text-black text-sm font-bold hover:brightness-110 transition-all shadow-[0_0_20px_rgba(149,191,71,0.4)] flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isConnecting ? (
                      <>
                         <RefreshCw size={16} className="animate-spin" /> Syncing Store...
                      </>
                    ) : (
                      <>
                         <Store size={16} /> Connect Store
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Stats Dashboard (Only when connected) */}
              {isConnected && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/5 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <p className="text-xs font-bold text-gray-500 uppercase mb-1 flex items-center gap-2">
                      <Package size={12} /> Total Products
                    </p>
                    <p className="text-2xl font-display font-bold text-white">124</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <p className="text-xs font-bold text-gray-500 uppercase mb-1 flex items-center gap-2">
                      <TrendingUp size={12} /> Active Ads
                    </p>
                    <p className="text-2xl font-display font-bold text-white">12</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <p className="text-xs font-bold text-gray-500 uppercase mb-1 flex items-center gap-2">
                      <Video size={12} /> Generated Videos
                    </p>
                    <p className="text-2xl font-display font-bold text-white">45</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <p className="text-xs font-bold text-gray-500 uppercase mb-1 flex items-center gap-2">
                      <BarChart3 size={12} /> Conversion Lift
                    </p>
                    <p className="text-2xl font-display font-bold text-green-400">+24%</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Product Management Section */}
          {isConnected ? (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  Product Inventory
                  <span className="text-xs font-normal text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">Recently Updated</span>
                </h3>
                
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <div className="relative flex-1 md:w-64">
                     <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                     <input aria-label="Search products" 
                      type="text" 
                      placeholder="Search products..." 
                      className="w-full bg-[#121212] border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-white/30 transition-all placeholder:text-gray-600"
                     />
                  </div>
                  <button aria-label="Refresh" className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors">
                    <RefreshCw size={16} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {ECOMMERCE_PRODUCTS.map((product, idx) => (
                  <div 
                    key={product.id} 
                    className="bg-[#121212] border border-white/5 rounded-2xl overflow-hidden group relative hover:border-white/20 hover:shadow-lg transition-all hover:-translate-y-1"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="aspect-square relative overflow-hidden bg-black/20">
                      <img loading="lazy" decoding="async" 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105" 
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                      
                      <div className="absolute top-3 right-3">
                        <Badge className={cn(
                          "text-[10px] font-bold px-2 py-0.5 h-5 border-0 backdrop-blur-md shadow-sm",
                          product.status === "active" ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"
                        )}>
                          {product.status}
                        </Badge>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3">
                         <p className="text-[10px] text-gray-400 mb-1 bg-black/40 backdrop-blur-md inline-block px-2 py-0.5 rounded-md border border-white/5">{product.category}</p>
                         <h4 className="text-sm font-bold text-white truncate shadow-black drop-shadow-md">{product.name}</h4>
                         <p className="text-xs text-gray-300 font-mono">{product.price}</p>
                      </div>
                    </div>
                    
                    <div className="p-3">
                      <button 
                        onClick={() => handleOpenGenerate(product)}
                        className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white flex items-center justify-center gap-2 hover:bg-accent hover:text-black hover:border-accent transition-all group/btn shadow-sm"
                      >
                        <Sparkles size={14} className="text-accent group-hover/btn:text-black transition-colors" />
                        Generate Content
                      </button>
                    </div>
                  </div>
                ))}
                
                {/* Import Placeholder */}
                <button className="bg-[#121212] border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center aspect-[3/4] sm:aspect-auto gap-4 hover:bg-white/5 hover:border-white/20 transition-all group">
                  <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform border border-white/5 group-hover:border-white/20">
                    <Plus size={24} className="text-gray-500 group-hover:text-white" />
                  </div>
                  <div className="text-center">
                     <span className="block text-sm font-bold text-gray-500 group-hover:text-white mb-1">Import Product</span>
                     <span className="block text-[10px] text-gray-600">From Shopify</span>
                  </div>
                </button>
              </div>
            </div>
          ) : (
            /* Empty State / Teaser Skeletons */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 opacity-20 pointer-events-none select-none filter blur-[1px]">
               {[1,2,3,4].map(i => (
                 <div key={i} className="bg-[#1E1E1E] rounded-2xl aspect-[3/4] border border-white/5 flex flex-col">
                    <div className="flex-1 bg-white/5 m-4 rounded-xl"></div>
                    <div className="h-8 bg-white/5 mx-4 mb-4 rounded-lg"></div>
                 </div>
               ))}
            </div>
          )}

        </div>

        {/* Generation Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-[#1E1E1E] border-white/10 text-white sm:max-w-md p-0 overflow-hidden rounded-2xl gap-0">
            <div className="p-6 border-b border-white/5 bg-[#1A1A1A]">
              <DialogHeader>
                <DialogTitle className="text-xl font-display flex items-center gap-2">
                  <Sparkles size={20} className="text-accent" /> 
                  Create Content
                </DialogTitle>
                <DialogDescription className="text-gray-400">
                  Choose an AI generation workflow for <span className="text-white font-bold">{selectedProduct?.name}</span>
                </DialogDescription>
              </DialogHeader>
            </div>
            
            <div className="p-4 grid grid-cols-1 gap-2 max-h-[60vh] overflow-y-auto">
              {ECOMMERCE_GENERATION_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleSelectOption(option)}
                  className="flex items-center gap-4 p-4 rounded-xl bg-[#121212] border border-white/5 hover:bg-white/5 hover:border-accent/50 transition-all text-left group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-accent/0 to-accent/0 group-hover:from-accent/5 group-hover:to-transparent transition-all" />
                  
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-accent group-hover:bg-accent/10 transition-colors shrink-0 border border-white/5">
                    <option.icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm mb-1 group-hover:text-accent transition-colors">{option.label}</h4>
                    <p className="text-xs text-gray-500 leading-snug">{option.description}</p>
                  </div>
                  <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">
                     <ArrowLeft className="rotate-180 text-accent" size={16} />
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