import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { GradientButton } from "@/components/GradientButton";
import { ArrowLeft, Zap, Trophy, Timer, Swords, CheckCircle2 } from "lucide-react";
import { clickable, cn } from "@/lib/utils";
import imageA from "@assets/generated_images/cyberpunk_samurai_for_battle_mode.webp";
import imageB from "@assets/generated_images/ethereal_fantasy_elf_for_battle_mode.webp";

export default function BattleMode() {
  const [, setLocation] = useLocation();
  const [voted, setVoted] = useState<"A" | "B" | null>(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [streak, setStreak] = useState(3);

  // Timer effect
  useEffect(() => {
    if (voted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [voted]);

  const handleVote = (selection: "A" | "B") => {
    setVoted(selection);
    // Simulate streak increment
    setTimeout(() => {
      setStreak(s => s + 1);
    }, 500);
  };

  return (
    <Layout hideTabs>
      <div className="min-h-screen bg-stage text-white flex flex-col relative overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -left-[20%] w-[70%] h-[70%] bg-purple-600/20 blur-[120px] rounded-full mix-blend-screen" />
          <div className="absolute -bottom-[20%] -right-[20%] w-[70%] h-[70%] bg-cyan-600/20 blur-[120px] rounded-full mix-blend-screen" />
        </div>

        {/* Header */}
        <div className="relative z-10 px-4 py-4 flex items-center justify-between">
          <button aria-label="Go back" 
            onClick={() => setLocation("/")}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className="flex items-center gap-2 px-4 py-1.5 bg-white/5 rounded-full border border-white/10 backdrop-blur-md">
            <Trophy size={16} className="text-yellow-400" />
            <span className="text-sm font-bold">Streak: {streak}</span>
          </div>

          <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-accent rounded-full text-black font-bold text-xs">
            <Zap size={14} fill="black" />
            <span>+50 XP</span>
          </div>
        </div>

        {/* Main Battle Arena */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 relative z-10">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-display font-bold italic tracking-wider mb-2 flex items-center justify-center gap-3">
              <Swords size={32} className="text-accent" />
              STYLE BATTLE
            </h1>
            <p className="text-gray-400 text-sm">Which generation captures "Future Warrior" better?</p>
          </div>

          {/* Images Container */}
          <div className="flex w-full gap-2 h-[45vh] mb-8">
            {/* Image A */}
            <div 
              {...clickable(() => !voted && handleVote("A"))}
              className={cn(
                "flex-1 h-full rounded-2xl overflow-hidden relative cursor-pointer transition-all duration-500 group border-2",
                voted === "A" ? "border-accent flex-[1.5] z-10 shadow-[0_0_30px_rgba(34,211,238,0.4)]" : 
                voted === "B" ? "border-transparent opacity-50 scale-90 grayscale" : 
                "border-transparent hover:border-white/30 active:scale-95"
              )}
            >
              <img loading="lazy" decoding="async" src={imageA} className="w-full h-full object-cover" alt="Candidate A" />
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 to-transparent flex justify-center">
                <span className="text-2xl font-bold text-white font-display">A</span>
              </div>
              {voted === "A" && (
                <div className="absolute inset-0 bg-accent/20 flex items-center justify-center animate-in fade-in zoom-in">
                  <CheckCircle2 size={48} className="text-white drop-shadow-lg" />
                </div>
              )}
              {voted && (
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-sm font-bold">
                  {voted === "A" ? "68%" : "32%"}
                </div>
              )}
            </div>

            {/* VS Divider */}
            <div className={cn(
              "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-black rounded-full border-2 border-white/20 flex items-center justify-center z-20 transition-all duration-500 font-black italic text-white",
              voted ? "opacity-0 scale-0" : "opacity-100 scale-100"
            )}>
              VS
            </div>

            {/* Image B */}
            <div 
              {...clickable(() => !voted && handleVote("B"))}
              className={cn(
                "flex-1 h-full rounded-2xl overflow-hidden relative cursor-pointer transition-all duration-500 group border-2",
                voted === "B" ? "border-accent flex-[1.5] z-10 shadow-[0_0_30px_rgba(34,211,238,0.4)]" : 
                voted === "A" ? "border-transparent opacity-50 scale-90 grayscale" : 
                "border-transparent hover:border-white/30 active:scale-95"
              )}
            >
              <img loading="lazy" decoding="async" src={imageB} className="w-full h-full object-cover" alt="Candidate B" />
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 to-transparent flex justify-center">
                <span className="text-2xl font-bold text-white font-display">B</span>
              </div>
              {voted === "B" && (
                <div className="absolute inset-0 bg-accent/20 flex items-center justify-center animate-in fade-in zoom-in">
                  <CheckCircle2 size={48} className="text-white drop-shadow-lg" />
                </div>
              )}
              {voted && (
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-sm font-bold">
                  {voted === "B" ? "68%" : "32%"}
                </div>
              )}
            </div>
          </div>

          {/* Timer / Action */}
          <div className="w-full max-w-xs">
            {!voted ? (
              <div className="flex flex-col items-center gap-2">
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-accent transition-all duration-1000 ease-linear"
                    style={{ width: `${(timeLeft / 15) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-gray-400 font-mono flex items-center gap-2">
                  <Timer size={12} />
                  {timeLeft}s remaining
                </span>
              </div>
            ) : (
              <div className="animate-in slide-in-from-bottom-4 fade-in duration-300">
                <GradientButton onClick={() => {
                  setVoted(null); 
                  setTimeLeft(15);
                  // In a real app, we'd load new images here
                }}>
                  NEXT BATTLE
                </GradientButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
