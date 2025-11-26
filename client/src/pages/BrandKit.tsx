import React, { useState, useRef } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { ArrowLeft, Palette, Type, Image as ImageIcon, CheckCircle2, RefreshCw, Plus, Upload, Trash2, X, MoreHorizontal, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import templateImage from "@assets/generated_images/instagram_story_template_tech.png";
import canvaLogo from "@assets/stock_images/canva_logo_icon_37e64db8.jpg";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock Data
const TEMPLATES = [
  { id: 1, name: "Instagram Story - Tech", image: templateImage },
  { id: 2, name: "LinkedIn Carousel", image: templateImage },
  { id: 3, name: "YouTube Thumbnail", image: templateImage },
];

const INITIAL_COLORS = ["#7C3AED", "#22D3EE", "#FFFFFF", "#000000", "#FF5733"];
const FONTS = ["Outfit", "Inter", "Roboto", "Playfair Display", "Montserrat", "Open Sans"];

export default function BrandKit() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false); // Default to false for the "journey"
  const [brandColors, setBrandColors] = useState(INITIAL_COLORS);
  const [fonts, setFonts] = useState({ primary: "Outfit", body: "Inter" });
  const [logos, setLogos] = useState([
    { id: 1, type: "Light", bg: "dark" },
    { id: 2, type: "Dark", bg: "light" }
  ]);

  // Handlers
  const handleConnect = () => {
    setIsConnecting(true);
    // Simulate connection delay
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      toast({
        title: "Canva Connected!",
        description: "Your brand kit and templates are now synced.",
      });
    }, 2000);
  };

  const handleAddColor = () => {
    // Mock adding a random color
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    setBrandColors([...brandColors, randomColor]);
    toast({
      title: "Color Added",
      description: `Added ${randomColor} to your palette.`,
    });
  };

  const handleRemoveColor = (colorToRemove: string) => {
    setBrandColors(brandColors.filter(c => c !== colorToRemove));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // Mock upload
      const newLogo = {
        id: Date.now(),
        type: "Custom",
        bg: "light" // Default mock
      };
      setLogos([...logos, newLogo]);
      toast({
        title: "Asset Uploaded",
        description: "Your logo has been added to the brand kit.",
      });
    }
  };

  const handleFontChange = (type: 'primary' | 'body', font: string) => {
    setFonts(prev => ({ ...prev, [type]: font }));
    toast({
      title: "Typography Updated",
      description: `${type === 'primary' ? 'Primary' : 'Body'} font set to ${font}.`,
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
            <h1 className="text-xl font-display font-bold text-white">Brand Kit</h1>
            <p className="text-xs text-gray-400">Manage your visual identity & integrations</p>
          </div>
        </div>

        <div className="p-6 space-y-8 max-w-4xl mx-auto">
          
          {/* Canva Integration - The "Hook" */}
          <div className="p-1 rounded-2xl bg-gradient-to-r from-[#00C4CC] via-[#7D2AE8] to-[#00C4CC] bg-[length:200%_100%] animate-gradient">
            <div className="bg-[#121212] rounded-xl p-6 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#00C4CC]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center overflow-hidden shadow-lg shrink-0">
                    <img src={canvaLogo} className="w-full h-full object-cover" alt="Canva" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white mb-1">Canva Connect</h2>
                    <p className="text-sm text-gray-400 max-w-md">
                      Sync your designs, templates, and brand assets directly from Canva. 
                      Edit in Canva and publish instantly to Trending Society.
                    </p>
                  </div>
                </div>

                {isConnected ? (
                  <div className="flex flex-col items-end gap-2">
                    <span className="px-4 py-1.5 rounded-full bg-[#00C4CC]/20 text-[#00C4CC] text-sm font-bold flex items-center gap-2 border border-[#00C4CC]/20">
                      <CheckCircle2 size={16} /> Connected
                    </span>
                    <p className="text-[10px] text-gray-500">Last synced: Just now</p>
                  </div>
                ) : (
                  <button 
                    onClick={handleConnect}
                    disabled={isConnecting}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00C4CC] to-[#7D2AE8] text-white text-sm font-bold hover:brightness-110 transition-all shadow-lg hover:shadow-[#00C4CC]/25 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isConnecting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      "Connect Account"
                    )}
                  </button>
                )}
              </div>

              {/* Synced Templates Section */}
              {isConnected && (
                <div className="mt-8 pt-6 border-t border-white/5 animate-in fade-in slide-in-from-top-4 duration-500">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-medium text-gray-300 flex items-center gap-2">
                      <RefreshCw size={14} className="text-[#00C4CC]" /> Synced Templates
                    </h3>
                    <button className="text-xs text-[#00C4CC] hover:underline">View All in Canva</button>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {TEMPLATES.map(t => (
                      <div key={t.id} className="group cursor-pointer relative">
                        <div className="aspect-[3/4] rounded-xl overflow-hidden relative border border-white/10 bg-[#1E1E1E] transition-all group-hover:border-[#00C4CC]/50 group-hover:shadow-[0_0_20px_rgba(0,196,204,0.1)]">
                          <img src={t.image} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all group-hover:scale-105" alt={t.name} />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                            <span className="px-3 py-1.5 rounded-full bg-[#00C4CC] text-black text-[10px] font-bold">Use Template</span>
                          </div>
                        </div>
                        <p className="text-[10px] text-gray-400 mt-2 truncate font-medium group-hover:text-white transition-colors">{t.name}</p>
                      </div>
                    ))}
                    
                    <button className="aspect-[3/4] rounded-xl border-2 border-dashed border-white/10 hover:border-[#00C4CC]/50 hover:bg-[#00C4CC]/5 transition-all flex flex-col items-center justify-center gap-3 group">
                      <div className="w-10 h-10 rounded-full bg-white/5 group-hover:bg-[#00C4CC]/20 flex items-center justify-center transition-colors">
                        <Plus size={20} className="text-gray-500 group-hover:text-[#00C4CC]" />
                      </div>
                      <span className="text-xs text-gray-500 group-hover:text-[#00C4CC] font-medium">Import New</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Brand Assets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Colors */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-400 uppercase flex items-center gap-2">
                <Palette size={14} /> Brand Colors
              </h3>
              <div className="bg-[#121212] border border-white/5 rounded-xl p-5">
                <div className="flex gap-3 flex-wrap">
                  {brandColors.map((color, i) => (
                    <DropdownMenu key={i}>
                      <DropdownMenuTrigger>
                        <div className="group relative">
                          <div 
                            className="w-12 h-12 rounded-full border-2 border-white/10 shadow-lg cursor-pointer transition-transform hover:scale-110 ring-2 ring-transparent hover:ring-white/20"
                            style={{ backgroundColor: color }}
                          />
                          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity font-mono bg-black/80 px-1 rounded">
                            {color}
                          </span>
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-[#1E1E1E] border-white/10 text-white">
                        <DropdownMenuItem onClick={() => {
                           navigator.clipboard.writeText(color);
                           toast({ description: "Hex code copied!" });
                        }}>
                          Copy Hex
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-400 focus:text-red-400" onClick={() => handleRemoveColor(color)}>
                          <Trash2 size={14} className="mr-2" /> Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ))}
                  <button 
                    onClick={handleAddColor}
                    className="w-12 h-12 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center text-gray-500 hover:text-white hover:border-white/50 hover:bg-white/5 transition-all"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Typography */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-400 uppercase flex items-center gap-2">
                <Type size={14} /> Typography
              </h3>
              <div className="space-y-3">
                {/* Primary Font */}
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="p-4 rounded-xl bg-[#121212] border border-white/5 flex justify-between items-center cursor-pointer hover:bg-white/5 transition-colors group">
                      <div>
                        <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider font-bold group-hover:text-accent transition-colors">Primary Font</p>
                        <p className="text-2xl text-white" style={{ fontFamily: fonts.primary }}>{fonts.primary}</p>
                      </div>
                      <span className="text-xs text-gray-500 group-hover:text-white">Edit</span>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="bg-[#1E1E1E] border-white/10 text-white">
                    <DialogHeader>
                      <DialogTitle>Select Primary Font</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      {FONTS.map(font => (
                        <button
                          key={font}
                          onClick={() => handleFontChange('primary', font)}
                          className={cn(
                            "p-3 rounded-lg border text-left transition-all",
                            fonts.primary === font ? "bg-accent/20 border-accent text-white" : "bg-white/5 border-transparent hover:bg-white/10 text-gray-300"
                          )}
                        >
                          <span className="text-lg" style={{ fontFamily: font }}>{font}</span>
                        </button>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>

                {/* Body Font */}
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="p-4 rounded-xl bg-[#121212] border border-white/5 flex justify-between items-center cursor-pointer hover:bg-white/5 transition-colors group">
                      <div>
                        <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider font-bold group-hover:text-accent transition-colors">Body Font</p>
                        <p className="text-lg text-white" style={{ fontFamily: fonts.body }}>{fonts.body}</p>
                      </div>
                      <span className="text-xs text-gray-500 group-hover:text-white">Edit</span>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="bg-[#1E1E1E] border-white/10 text-white">
                    <DialogHeader>
                      <DialogTitle>Select Body Font</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      {FONTS.map(font => (
                        <button
                          key={font}
                          onClick={() => handleFontChange('body', font)}
                          className={cn(
                            "p-3 rounded-lg border text-left transition-all",
                            fonts.body === font ? "bg-accent/20 border-accent text-white" : "bg-white/5 border-transparent hover:bg-white/10 text-gray-300"
                          )}
                        >
                          <span className="text-sm" style={{ fontFamily: font }}>{font}</span>
                        </button>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>

          {/* Assets Section */}
          <div>
            <div className="flex justify-between items-end mb-4">
              <h3 className="text-sm font-bold text-gray-400 uppercase flex items-center gap-2">
                <ImageIcon size={14} /> Logo Assets
              </h3>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="text-xs font-bold text-accent hover:underline flex items-center gap-1"
              >
                <Upload size={12} /> Upload New
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleLogoUpload} 
              />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {logos.map(logo => (
                <div key={logo.id} className="aspect-video rounded-xl border border-white/5 overflow-hidden relative group">
                  <div className={cn(
                    "w-full h-full flex items-center justify-center p-6",
                    logo.bg === 'light' ? "bg-white" : "bg-[#1E1E1E]"
                  )}>
                    <div className={cn(
                      "text-2xl font-bold tracking-widest",
                      logo.bg === 'light' ? "text-black" : "text-white"
                    )}>
                      LOGO
                    </div>
                  </div>
                  
                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button className="p-2 rounded-full bg-white text-black hover:bg-gray-200 transition-colors" title="Download">
                       <Upload size={14} className="rotate-180" />
                    </button>
                    <button className="p-2 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-colors" title="Delete">
                       <Trash2 size={14} />
                    </button>
                  </div>
                  
                  <div className="absolute top-2 right-2 text-[9px] font-bold bg-black/20 backdrop-blur px-2 py-0.5 rounded text-gray-500 uppercase">
                    {logo.type}
                  </div>
                </div>
              ))}
              
              {/* Upload Placeholder */}
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="aspect-video rounded-xl border-2 border-dashed border-white/10 hover:border-accent/50 hover:bg-accent/5 transition-all flex flex-col items-center justify-center gap-2 group"
              >
                <Upload size={24} className="text-gray-600 group-hover:text-accent transition-colors" />
                <span className="text-xs font-medium text-gray-500 group-hover:text-accent">Upload Asset</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}