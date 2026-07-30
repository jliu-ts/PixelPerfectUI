import React, { useState, useRef } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { 
  ArrowLeft, 
  Palette, 
  Type, 
  Image as ImageIcon, 
  CheckCircle2, 
  RefreshCw, 
  Plus, 
  Upload, 
  Trash2, 
  X, 
  MoreHorizontal, 
  Loader2,
  Wand2,
  Download,
  Layers,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import templateImage from "@assets/generated_images/instagram_story_template_tech.webp";
import canvaLogo from "@assets/brand_logos/canva-icon.png";
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
  { id: 1, name: "Instagram Story - Tech", image: templateImage, type: "Story" },
  { id: 2, name: "LinkedIn Carousel", image: "https://picsum.photos/seed/linkedin/300/400", type: "Carousel" },
  { id: 3, name: "YouTube Thumbnail", image: "https://picsum.photos/seed/yt/400/225", type: "Thumbnail" },
];

const INITIAL_COLORS = [
  { hex: "#7C3AED", name: "Electric Violet" },
  { hex: "#22D3EE", name: "Cyan Pop" },
  { hex: "#FFFFFF", name: "Clean White" },
  { hex: "#000000", name: "Deep Black" },
  { hex: "#FF5733", name: "Accent Orange" }
];

const FONTS = [
  { name: "Outfit", category: "Sans Serif", style: "Modern" },
  { name: "Inter", category: "Sans Serif", style: "Clean" },
  { name: "Playfair Display", category: "Serif", style: "Elegant" },
  { name: "Space Mono", category: "Monospace", style: "Tech" },
  { name: "Montserrat", category: "Sans Serif", style: "Geometric" }
];

const BRAND_VOICE_TRAITS = ["Professional", "Futuristic", "Engaging", "Bold"];

export default function BrandKit() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false); 
  const [brandColors, setBrandColors] = useState(INITIAL_COLORS);
  const [fonts, setFonts] = useState({ primary: "Outfit", body: "Inter" });
  const [logos, setLogos] = useState<{ id: number; type: string; bg: string; url: string | null }[]>([
    { id: 1, type: "Primary", bg: "dark", url: null },
    { id: 2, type: "Monochrome", bg: "light", url: null }
  ]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Handlers
  const handleConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      toast({
        title: "Canva Connected!",
        description: "Your brand kit and templates are now synced.",
      });
    }, 2000);
  };

  const handleGenerateBrand = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setBrandColors([
        { hex: "#FF0080", name: "Neon Pink" },
        { hex: "#7928CA", name: "Cyber Purple" },
        { hex: "#0070F3", name: "Azure" },
        { hex: "#FAFAFA", name: "Off White" },
        { hex: "#111111", name: "Charcoal" }
      ]);
      setFonts({ primary: "Space Mono", body: "Inter" });
      toast({
        title: "Brand Identity Generated",
        description: "AI has suggested a new visual direction for you.",
      });
    }, 1500);
  };

  const handleAddColor = () => {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    setBrandColors([...brandColors, { hex: randomColor, name: "Custom Color" }]);
    toast({
      title: "Color Added",
      description: `Added ${randomColor} to your palette.`,
    });
  };

  const handleRemoveColor = (hexToRemove: string) => {
    setBrandColors(brandColors.filter(c => c.hex !== hexToRemove));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newLogo = {
        id: Date.now(),
        type: "Custom",
        bg: "light",
        url: URL.createObjectURL(e.target.files[0])
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
      <div className="min-h-screen bg-background pb-24 md:pb-8">
        
        {/* Sticky Header */}
        <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-white/5">
          <div className="flex items-center justify-between p-4 pt-6">
            <div className="flex items-center gap-4">
              <button aria-label="Go back" 
                onClick={() => setLocation("/create")}
                className="p-2 -ml-2 rounded-full hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
                  Brand Kit
                  <Palette size={16} className="text-accent" />
                </h1>
              </div>
            </div>
            <button 
              onClick={handleGenerateBrand}
              disabled={isGenerating}
              className="px-4 py-2 rounded-xl bg-card hover:bg-white/5 border border-white/10 text-xs font-bold text-white transition-all flex items-center gap-2"
            >
              {isGenerating ? <Loader2 size={14} className="animate-spin" /> : <Wand2 size={14} className="text-purple-400" />}
              {isGenerating ? "Generating..." : "AI Generate"}
            </button>
          </div>
        </div>

        <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-8">
          
          {/* Canva Integration Hero */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#00C4CC]/20 via-[#7D2AE8]/20 to-card border border-white/10 p-1">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-[80px] rounded-full pointer-events-none" />
            
            <div className="bg-background/80 backdrop-blur-sm rounded-[22px] p-6 md:p-8 relative overflow-hidden">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-start gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-white p-3 shadow-lg shrink-0">
                    <img loading="lazy" decoding="async" src={canvaLogo} className="w-full h-full object-contain" alt="Canva" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white mb-2">Canva Connect</h2>
                    <p className="text-sm text-gray-400 max-w-lg leading-relaxed">
                      Sync your designs, templates, and brand assets.
                      Edit in Canva, publish straight to Trending Society.
                    </p>
                  </div>
                </div>

                {isConnected ? (
                  <div className="flex flex-col items-end gap-2">
                    <span className="px-4 py-2 rounded-full bg-[#00C4CC]/10 text-[#00C4CC] text-sm font-bold flex items-center gap-2 border border-[#00C4CC]/20 shadow-[0_0_15px_rgba(0,196,204,0.2)]">
                      <CheckCircle2 size={16} /> Connected
                    </span>
                    <p className="text-[10px] text-gray-500 flex items-center gap-1">
                      <RefreshCw size={10} /> Auto-sync enabled
                    </p>
                  </div>
                ) : (
                  <button 
                    onClick={handleConnect}
                    disabled={isConnecting}
                    className="px-6 py-3 rounded-xl bg-white text-black text-sm font-bold hover:bg-gray-200 transition-all shadow-lg flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group"
                  >
                    {isConnecting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      <>
                        Connect Account
                        <ArrowLeft className="rotate-180 group-hover:translate-x-1 transition-transform" size={16} />
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Synced Templates Preview */}
              {isConnected && (
                <div className="mt-8 pt-8 border-t border-white/5 animate-in fade-in slide-in-from-top-4 duration-700">
                  <div className="flex justify-between items-center mb-5">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Layers size={14} className="text-[#00C4CC]" /> Synced Templates
                    </h3>
                    <button className="text-xs font-bold text-[#00C4CC] hover:text-white transition-colors">
                      Open in Canva
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {TEMPLATES.map(t => (
                      <div key={t.id} className="group cursor-pointer relative">
                        <div className="aspect-[3/4] rounded-xl overflow-hidden relative border border-white/10 bg-card transition-all group-hover:border-[#00C4CC]/50 group-hover:shadow-[0_0_20px_rgba(0,196,204,0.1)]">
                          <img loading="lazy" decoding="async" src={t.image} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all group-hover:scale-105 duration-500" alt={t.name} />
                          <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur text-[9px] font-bold text-white border border-white/10">
                            {t.type}
                          </div>
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                            <span className="px-3 py-1.5 rounded-full bg-[#00C4CC] text-black text-[10px] font-bold transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                              Use Template
                            </span>
                          </div>
                        </div>
                        <p className="text-[10px] text-gray-400 mt-2 truncate font-medium group-hover:text-white transition-colors">{t.name}</p>
                      </div>
                    ))}
                    
                    <button className="aspect-[3/4] rounded-xl border-2 border-dashed border-white/10 hover:border-[#00C4CC]/50 hover:bg-[#00C4CC]/5 transition-all flex flex-col items-center justify-center gap-3 group">
                      <div className="w-12 h-12 rounded-full bg-white/5 group-hover:bg-[#00C4CC]/20 flex items-center justify-center transition-colors shadow-inner">
                        <Plus size={24} className="text-gray-500 group-hover:text-[#00C4CC]" />
                      </div>
                      <span className="text-xs text-gray-500 group-hover:text-[#00C4CC] font-bold">Import New</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Colors & Voice */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Color Palette */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-gray-400 uppercase flex items-center gap-2 tracking-wider">
                    <Palette size={14} /> Brand Colors
                  </h3>
                  <span className="text-[10px] text-gray-600">{brandColors.length} colors defined</span>
                </div>
                
                <div className="bg-background border border-white/5 rounded-2xl p-6">
                  <div className="flex gap-4 flex-wrap">
                    {brandColors.map((color, i) => (
                      <DropdownMenu key={i}>
                        <DropdownMenuTrigger className="outline-none">
                          <div className="group relative flex flex-col items-center gap-2">
                            <div 
                              className="w-16 h-16 rounded-2xl border border-white/10 shadow-lg cursor-pointer transition-all hover:scale-105 hover:shadow-xl ring-2 ring-transparent hover:ring-white/20 relative overflow-hidden"
                              style={{ backgroundColor: color.hex }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50" />
                            </div>
                            <div className="text-center">
                              <p className="text-[10px] font-bold text-gray-300 group-hover:text-white">{color.hex}</p>
                              <p className="text-[9px] text-gray-500 max-w-[60px] truncate">{color.name}</p>
                            </div>
                          </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-card border-white/10 text-white">
                          <DropdownMenuItem onClick={() => {
                             navigator.clipboard.writeText(color.hex);
                             toast({ description: "Hex code copied!" });
                          }}>
                            Copy Hex
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-400 focus:text-red-400" onClick={() => handleRemoveColor(color.hex)}>
                            <Trash2 size={14} className="mr-2" /> Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ))}
                    <button aria-label="Add" 
                      onClick={handleAddColor}
                      className="w-16 h-16 rounded-2xl border-2 border-dashed border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:border-accent/50 hover:bg-accent/5 transition-all group"
                    >
                      <Plus size={24} className="group-hover:scale-110 transition-transform" />
                    </button>
                  </div>
                </div>
              </section>

              {/* Brand Voice */}
              <section>
                 <h3 className="text-sm font-bold text-gray-400 uppercase flex items-center gap-2 tracking-wider mb-4">
                    <Sparkles size={14} /> Brand Voice
                 </h3>
                 <div className="bg-background border border-white/5 rounded-2xl p-6">
                   <div className="flex flex-wrap gap-2 mb-4">
                     {BRAND_VOICE_TRAITS.map(trait => (
                       <span key={trait} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs font-bold text-gray-300">
                         {trait}
                       </span>
                     ))}
                     <button className="px-3 py-1.5 rounded-lg border border-dashed border-white/20 text-xs font-medium text-gray-500 hover:text-white hover:border-white/40 transition-colors">
                       + Add Trait
                     </button>
                   </div>
                   <div className="p-4 rounded-xl bg-card border border-white/5">
                     <p className="text-xs text-gray-400 italic leading-relaxed">
                       "Our brand speaks with a confident, forward-thinking tone. We use concise language, avoid jargon, and always prioritize clarity and inspiration."
                     </p>
                   </div>
                 </div>
              </section>

            </div>

            {/* Right Column: Typography & Logos */}
            <div className="space-y-8">
              
              {/* Typography */}
              <section>
                <h3 className="text-sm font-bold text-gray-400 uppercase flex items-center gap-2 tracking-wider mb-4">
                  <Type size={14} /> Typography
                </h3>
                <div className="space-y-3">
                  {/* Primary Font */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="p-5 rounded-2xl bg-background border border-white/5 flex justify-between items-center cursor-pointer hover:bg-white/5 hover:border-white/10 transition-all group">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-[10px] font-bold text-accent bg-accent/10 px-1.5 py-0.5 rounded uppercase tracking-wider">Primary</span>
                            <span className="text-[10px] text-gray-500">Headings</span>
                          </div>
                          <p className="text-3xl text-white leading-none" style={{ fontFamily: fonts.primary }}>{fonts.primary}</p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                           <MoreHorizontal size={16} className="text-gray-400" />
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="bg-card border-white/10 text-white">
                      <DialogHeader>
                        <DialogTitle>Select Primary Font</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-2 mt-4 max-h-[300px] overflow-y-auto pr-2">
                        {FONTS.map(font => (
                          <button
                            key={font.name}
                            onClick={() => handleFontChange('primary', font.name)}
                            className={cn(
                              "p-3 rounded-xl border text-left transition-all flex items-center justify-between group",
                              fonts.primary === font.name ? "bg-accent/20 border-accent" : "bg-white/5 border-transparent hover:bg-white/10"
                            )}
                          >
                            <div>
                              <span className="text-lg block leading-tight" style={{ fontFamily: font.name }}>{font.name}</span>
                              <span className={cn("text-[10px]", fonts.primary === font.name ? "text-accent" : "text-gray-500")}>{font.category}</span>
                            </div>
                            {fonts.primary === font.name && <CheckCircle2 size={16} className="text-accent" />}
                          </button>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>

                  {/* Body Font */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="p-5 rounded-2xl bg-background border border-white/5 flex justify-between items-center cursor-pointer hover:bg-white/5 hover:border-white/10 transition-all group">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-[10px] font-bold text-gray-400 bg-white/5 px-1.5 py-0.5 rounded uppercase tracking-wider">Secondary</span>
                            <span className="text-[10px] text-gray-500">Body Text</span>
                          </div>
                          <p className="text-xl text-gray-200 leading-none" style={{ fontFamily: fonts.body }}>{fonts.body}</p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                           <MoreHorizontal size={16} className="text-gray-400" />
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="bg-card border-white/10 text-white">
                      <DialogHeader>
                        <DialogTitle>Select Body Font</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-2 mt-4 max-h-[300px] overflow-y-auto pr-2">
                        {FONTS.map(font => (
                          <button
                            key={font.name}
                            onClick={() => handleFontChange('body', font.name)}
                            className={cn(
                              "p-3 rounded-xl border text-left transition-all flex items-center justify-between group",
                              fonts.body === font.name ? "bg-accent/20 border-accent" : "bg-white/5 border-transparent hover:bg-white/10"
                            )}
                          >
                            <div>
                              <span className="text-base block leading-tight" style={{ fontFamily: font.name }}>{font.name}</span>
                              <span className={cn("text-[10px]", fonts.body === font.name ? "text-accent" : "text-gray-500")}>{font.category}</span>
                            </div>
                            {fonts.body === font.name && <CheckCircle2 size={16} className="text-accent" />}
                          </button>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </section>

              {/* Logo Assets */}
              <section>
                <div className="flex justify-between items-end mb-4">
                  <h3 className="text-sm font-bold text-gray-400 uppercase flex items-center gap-2 tracking-wider">
                    <ImageIcon size={14} /> Logo Assets
                  </h3>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleLogoUpload} 
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {logos.map(logo => (
                    <div key={logo.id} className="aspect-square rounded-xl border border-white/5 overflow-hidden relative group">
                      <div className={cn(
                        "w-full h-full flex items-center justify-center p-4 transition-colors",
                        logo.bg === 'light' ? "bg-[#F5F5F5]" : "bg-card"
                      )}>
                        {logo.url ? (
                          <img loading="lazy" decoding="async" src={logo.url} className="w-full h-full object-contain" alt="Logo" />
                        ) : (
                          <div className={cn(
                            "text-lg font-bold tracking-widest",
                            logo.bg === 'light' ? "text-black" : "text-white"
                          )}>
                            LOGO
                          </div>
                        )}
                      </div>
                      
                      {/* Overlay Actions */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-2">
                        <button className="p-2 rounded-lg bg-white text-black hover:bg-gray-200 transition-colors" title="Download">
                           <Download size={14} />
                        </button>
                        <button className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-colors" title="Delete">
                           <Trash2 size={14} />
                        </button>
                      </div>
                      
                      <div className="absolute top-2 left-2 text-[8px] font-bold bg-black/40 backdrop-blur px-1.5 py-0.5 rounded text-white uppercase">
                        {logo.type}
                      </div>
                    </div>
                  ))}
                  
                  {/* Upload Placeholder */}
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-square rounded-xl border-2 border-dashed border-white/10 hover:border-accent/50 hover:bg-accent/5 transition-all flex flex-col items-center justify-center gap-2 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-white/5 group-hover:bg-accent/10 flex items-center justify-center transition-colors">
                      <Upload size={18} className="text-gray-500 group-hover:text-accent transition-colors" />
                    </div>
                    <span className="text-[10px] font-bold text-gray-500 group-hover:text-accent uppercase tracking-wider">Upload</span>
                  </button>
                </div>
              </section>

            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
}