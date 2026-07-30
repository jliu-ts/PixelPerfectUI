import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { 
  ArrowLeft, 
  Camera as CameraIcon, 
  RotateCcw, 
  Zap, 
  Image as ImageIcon,
  Sparkles,
  Smile,
  Glasses,
  Crown,
  Ghost
} from "lucide-react";
import { cn } from "@/lib/utils";
import cameraFeed from "@assets/generated_images/candid_ar_camera_feed.webp";

const FILTERS = [
  { id: "none", name: "Normal", icon: Smile },
  { id: "cyber", name: "Cyber", icon: Glasses },
  { id: "neon", name: "Neon", icon: Zap },
  { id: "royal", name: "Royal", icon: Crown },
  { id: "ghost", name: "Ghost", icon: Ghost },
];

export default function ARCamera() {
  const [, setLocation] = useLocation();
  const [activeFilter, setActiveFilter] = useState("none");
  const [isRecording, setIsRecording] = useState(false);
  const [flash, setFlash] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Simulate AR Face Mesh drawing
  useEffect(() => {
    if (!canvasRef.current || activeFilter === "none") return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const drawMesh = () => {
      if (!canvasRef.current) return;
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      
      // Mock face points
      ctx.strokeStyle = activeFilter === "cyber" ? "#22D3EE" : 
                       activeFilter === "neon" ? "#D946EF" : 
                       "rgba(255,255,255,0.5)";
      ctx.lineWidth = 2;
      
      // Draw a tech-circle around the eye (simulated)
      const time = Date.now() / 1000;
      
      if (activeFilter === "cyber" || activeFilter === "neon") {
        ctx.beginPath();
        ctx.arc(180, 220, 30 + Math.sin(time * 5) * 2, 0, Math.PI * 2);
        ctx.stroke();
        
        // Draw connecting lines
        ctx.beginPath();
        ctx.moveTo(100, 300);
        ctx.lineTo(150 + Math.sin(time) * 10, 350);
        ctx.lineTo(250, 350);
        ctx.stroke();
      }
      
      requestAnimationFrame(drawMesh);
    };
    
    const animationId = requestAnimationFrame(drawMesh);
    return () => cancelAnimationFrame(animationId);
  }, [activeFilter]);

  const handleCapture = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      // Navigate to editor with the "captured" content
      setLocation("/editor");
    }, 1500); // Simulate short video capture
  };

  return (
    <Layout hideTabs>
      <h1 className="sr-only">AR camera</h1>
      <div className="h-[100dvh] bg-black flex flex-col relative overflow-hidden">
        {/* Camera Feed Simulation */}
        <div className="absolute inset-0 z-0">
          <img loading="lazy" decoding="async" 
            src={cameraFeed} 
            alt="Camera Feed" 
            className={cn(
              "w-full h-full object-cover transition-all duration-300",
              activeFilter === "cyber" && "contrast-125 saturate-150 hue-rotate-15",
              activeFilter === "ghost" && "grayscale opacity-80 invert",
            )}
          />
          {/* AR Overlay Canvas */}
          <canvas 
            ref={canvasRef} 
            width={400} 
            height={800} 
            className="absolute inset-0 w-full h-full pointer-events-none" 
          />
          
          {/* Flash Effect */}
          <div className={cn(
            "absolute inset-0 bg-white pointer-events-none transition-opacity duration-100",
            isRecording ? "opacity-50" : "opacity-0"
          )} />
        </div>

        {/* UI Overlay */}
        <div className="relative z-10 flex flex-col justify-between h-full pb-8 pt-4 px-4">
          
          {/* Top Bar */}
          <div className="flex justify-between items-center">
            <button aria-label="Go back" onClick={() => setLocation("/create")} className="p-2 rounded-full bg-black/20 backdrop-blur-md text-white">
              <ArrowLeft size={24} />
            </button>
            
            <div className="flex gap-4">
              <button aria-label="Boost" 
                onClick={() => setFlash(!flash)}
                className={cn("p-2 rounded-full backdrop-blur-md transition-colors", flash ? "bg-yellow-500 text-black" : "bg-black/20 text-white")}
              >
                <Zap size={24} fill={flash ? "currentColor" : "none"} />
              </button>
              <button aria-label="Reset" className="p-2 rounded-full bg-black/20 backdrop-blur-md text-white">
                <RotateCcw size={24} />
              </button>
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="flex flex-col items-center gap-8">
            
            {/* Filter Carousel */}
            <div className="w-full overflow-x-auto no-scrollbar flex gap-4 px-4 pb-2 justify-center">
              {FILTERS.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={cn(
                    "flex flex-col items-center gap-1 min-w-[60px] transition-all duration-300",
                    activeFilter === filter.id ? "scale-110 -translate-y-2" : "opacity-70 scale-90"
                  )}
                >
                  <div className={cn(
                    "w-14 h-14 rounded-full border-2 flex items-center justify-center backdrop-blur-md bg-black/40 transition-colors",
                    activeFilter === filter.id ? "border-accent text-accent" : "border-white/20 text-white"
                  )}>
                    <filter.icon size={24} />
                  </div>
                  <span className={cn(
                    "text-[10px] font-bold uppercase tracking-wider shadow-black drop-shadow-md",
                    activeFilter === filter.id ? "text-accent" : "text-white"
                  )}>
                    {filter.name}
                  </span>
                </button>
              ))}
            </div>

            {/* Capture Row */}
            <div className="flex items-center justify-between w-full px-8">
              <button aria-label="Choose image" className="w-12 h-12 rounded-xl bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                <ImageIcon size={24} />
              </button>

              {/* Shutter Button */}
              <button 
                onClick={handleCapture}
                className={cn(
                  "w-20 h-20 rounded-full border-4 border-white flex items-center justify-center transition-all duration-200 active:scale-90",
                  isRecording ? "bg-red-500 scale-110" : "bg-white/20 backdrop-blur-sm hover:bg-white/30"
                )}
              >
                <div className={cn(
                  "rounded-full transition-all duration-200",
                  isRecording ? "w-8 h-8 bg-white rounded-sm" : "w-16 h-16 bg-white"
                )} />
              </button>

              <button aria-label="Generate with AI" className="w-12 h-12 rounded-xl bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                <Sparkles size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
