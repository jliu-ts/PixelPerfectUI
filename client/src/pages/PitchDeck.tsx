import React, { useState } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { ArrowLeft, ArrowRight, ChevronRight, Target, Zap, Shield, Globe, Layers, Coins, Users, Cpu, Plane, BarChart3, Smartphone, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

const SLIDES = [
  {
    id: "intro",
    title: "Trending Society",
    subtitle: "The AI Content Super App for the Creator Economy",
    content: (
      <div className="space-y-6">
        <div className="p-6 rounded-2xl bg-surface-2 border border-primary/15 backdrop-blur-md">
          <h2 className="text-xl font-display font-bold text-white mb-2">The Problem: Fragmentation</h2>
          <p className="text-gray-400">
            Creators today juggle 10+ isolated apps: CapCut for editing, Midjourney for assets, Linktree for bio, Instagram/TikTok for distribution, and separate affiliate dashboards. None of it talks to each other.
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-white/10 backdrop-blur-md">
          <h2 className="text-xl font-display font-bold text-white mb-2">The Solution: One Super App</h2>
          <p className="text-gray-400">
            <strong className="text-white font-semibold">Trending Society</strong> is one app: generate the asset, cut it, push it to every platform, and collect the affiliate revenue without leaving the tab. Mobile-first.
          </p>
        </div>
      </div>
    )
  },
  {
    id: "superapp",
    title: "The Social Super App",
    subtitle: "Unified Identity & Cross-Platform Discovery",
    content: (
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2 p-4 rounded-xl bg-card border border-white/5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Globe size={24} />
          </div>
          <div>
            <h3 className="font-bold text-white">Universal Profile</h3>
            <p className="text-xs text-gray-400">One identity connecting Instagram, TikTok, YouTube, and X.</p>
          </div>
        </div>
        {[
          { icon: <Share2 />, title: "Unified Feed", desc: "Aggregate content from all platforms in one view." },
          { icon: <Users />, title: "Apify Intelligence", desc: "Cross-platform creator discovery & following." },
          { icon: <Zap />, title: "1-Click Re-Style", desc: "Remix any viral post style instantly with AI." },
          { icon: <Smartphone />, title: "Mobile First", desc: "Native experiences for the vertical video era." },
        ].map((item, i) => (
          <div key={i} className="p-4 rounded-xl bg-card border border-white/5">
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white mb-3">
              {item.icon}
            </div>
            <h3 className="font-bold text-white text-sm mb-1">{item.title}</h3>
            <p className="text-[10px] text-gray-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    )
  },
  {
    id: "monetization",
    title: "Monetization & Rewards",
    subtitle: "Embedded Finance for Creators",
    content: (
      <div className="space-y-4">
        <div className="p-4 rounded-xl bg-gradient-to-r from-card to-surface-3 border border-white/10">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                 <Coins size={20} />
               </div>
               <div>
                 <h3 className="font-bold text-white">Affiliate Engine</h3>
                 <p className="text-xs text-gray-400">Integrated CJ & Impact Radius</p>
               </div>
            </div>
            <span className="text-xs font-mono text-green-400 bg-green-500/10 px-2 py-1 rounded">LIVE</span>
          </div>
          <p className="text-xs text-gray-400">Creators generate tracking links instantly and embed them in AI content. No more copy-pasting from 5 different dashboards.</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
           <div className="p-4 rounded-xl bg-card border border-white/10">
             <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 mb-2">
               <Plane size={16} />
             </div>
             <h3 className="font-bold text-white text-sm">Viator Rewards</h3>
             <p className="text-[10px] text-gray-400 mt-1">Redeem earnings for real-world travel experiences.</p>
           </div>
           <div className="p-4 rounded-xl bg-card border border-white/10">
             <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center text-yellow-400 mb-2">
               <BarChart3 size={16} />
             </div>
             <h3 className="font-bold text-white text-sm">Gamified Scoreboard</h3>
             <p className="text-[10px] text-gray-400 mt-1">Generation Credits (⚡) vs Reward Gems (💎).</p>
           </div>
        </div>
      </div>
    )
  },
  {
    id: "moat",
    title: "Defensibility (The Moat)",
    subtitle: "Why Trending Society wins in the long term",
    content: (
      <div className="space-y-4">
        <div className="flex gap-4 items-start">
          <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500 shrink-0">
            <Coins size={20} />
          </div>
          <div>
            <h3 className="font-bold text-white">Economic Lock-in</h3>
            <p className="text-xs text-gray-400 mt-1">
              Creators earn credits by selling assets in our Marketplace. These credits are stuck in our ecosystem, incentivizing them to stay and spend on our tools.
            </p>
          </div>
        </div>
        <div className="flex gap-4 items-start">
          <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
            <Cpu size={20} />
          </div>
          <div>
            <h3 className="font-bold text-white">Data Gravity</h3>
            <p className="text-xs text-gray-400 mt-1">
              By owning the "Writer's Room" (pre-production) and "Editor" (post-production), we capture the entire creative metadata pipeline, training our "Viral Prediction Engine."
            </p>
          </div>
        </div>
        <div className="flex gap-4 items-start">
          <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500 shrink-0">
            <Globe size={20} />
          </div>
          <div>
            <h3 className="font-bold text-white">Platform Agnostic</h3>
            <p className="text-xs text-gray-400 mt-1">
              We are the neutral layer above the "Walled Gardens" (TikTok, IG). We aggregate the audience, owning the relationship regardless of which platform is trending.
            </p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "business",
    title: "Business Model",
    subtitle: "High-margin SaaS + Transactional Upside",
    content: (
      <div className="space-y-3">
        <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-white text-sm">Architect Tier</h3>
            <p className="text-[10px] text-gray-400">Pro Creators</p>
          </div>
          <span className="text-lg font-bold text-white">$29<span className="text-xs text-gray-500">/mo</span></span>
        </div>
        <div className="p-3 rounded-xl bg-surface-2 border border-purple-500/30 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-white text-sm">Syndicate Tier</h3>
            <p className="text-[10px] text-gray-400">Agencies & Teams</p>
          </div>
          <span className="text-lg font-bold text-white">$99<span className="text-xs text-gray-500">/mo</span></span>
        </div>
        <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-white text-sm">Marketplace Fee</h3>
            <p className="text-[10px] text-gray-400">On Asset Sales</p>
          </div>
          <span className="text-lg font-bold text-white">15-30<span className="text-xs text-gray-500">%</span></span>
        </div>
        <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-white text-sm">Affiliate Revenue</h3>
            <p className="text-[10px] text-gray-400">Commission on Sales</p>
          </div>
          <span className="text-lg font-bold text-white">5-10<span className="text-xs text-gray-500">%</span></span>
        </div>
      </div>
    )
  }
];

export default function PitchDeck() {
  const [, setLocation] = useLocation();
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < SLIDES.length - 1) {
      setCurrentSlide(curr => curr + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(curr => curr - 1);
    }
  };

  return (
    <div className="min-h-screen bg-black font-sans text-white flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b border-white/5 p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button aria-label="Go back" 
            onClick={() => setLocation("/profile")}
            className="p-2 -ml-2 rounded-full hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="font-display text-xl font-bold text-foreground">Investor Deck</h1>
        </div>
        <div className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
          {currentSlide + 1}/{SLIDES.length}
        </div>
      </div>

      {/* Slide Content */}
      <div className="flex-1 flex flex-col justify-center px-6 pb-12">
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500 key={currentSlide}">
          <h2 className="text-3xl font-display font-bold mb-2 text-foreground">
            {SLIDES[currentSlide].title}
          </h2>
          <p className="text-sm text-accent font-medium uppercase tracking-wide mb-8">
            {SLIDES[currentSlide].subtitle}
          </p>
          
          {SLIDES[currentSlide].content}
        </div>
      </div>

      {/* Navigation */}
      <div className="p-6 bg-background border-t border-white/5 flex justify-between items-center">
        <button 
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className={cn(
            "px-6 py-3 rounded-xl text-sm font-bold transition-colors",
            currentSlide === 0 ? "text-gray-600 cursor-not-allowed" : "bg-white/10 hover:bg-white/20 text-white"
          )}
        >
          Back
        </button>

        <div className="flex gap-2">
          {SLIDES.map((_, i) => (
            <div 
              key={i}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                i === currentSlide ? "bg-accent w-6" : "bg-white/20"
              )}
            />
          ))}
        </div>

        <button 
          onClick={nextSlide}
          className={cn(
            "px-6 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2",
            currentSlide === SLIDES.length - 1 
              ? "bg-green-500 text-black hover:bg-green-400" 
              : "bg-white text-black hover:bg-gray-200"
          )}
        >
          {currentSlide === SLIDES.length - 1 ? "Finish" : "Next"}
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
