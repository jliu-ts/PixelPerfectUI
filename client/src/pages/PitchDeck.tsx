import React, { useState } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { ArrowLeft, ArrowRight, ChevronRight, Target, Zap, Shield, Globe, Layers, Coins, Users, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

const SLIDES = [
  {
    id: "intro",
    title: "Trending Society",
    subtitle: "The Operating System for the AI Creator Economy",
    content: (
      <div className="space-y-6">
        <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-white/10 backdrop-blur-md">
          <h3 className="text-xl font-display font-bold text-white mb-2">The Problem</h3>
          <p className="text-gray-400">
            Creators today use 10+ fragmented tools: one for video gen, one for editing, another for link-in-bio, and yet another for brand deals. The workflow is broken, data is siloed, and monetization is friction-heavy.
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-white/10 backdrop-blur-md">
          <h3 className="text-xl font-display font-bold text-white mb-2">The Solution</h3>
          <p className="text-gray-400">
            **Trending Society** is the vertical "Super App" that consolidates generation, editing, collaboration, and monetization into a single, mobile-first OS. We don't just build tools; we own the rails.
          </p>
        </div>
      </div>
    )
  },
  {
    id: "product",
    title: "Product Ecosystem",
    subtitle: "A unified creative suite powered by multi-model AI",
    content: (
      <div className="grid grid-cols-2 gap-3">
        {[
          { icon: <Zap />, title: "Creation Studio", desc: "Aggregates Veo, Sora, Midjourney into one interface." },
          { icon: <Shield />, title: "Iris ID Auth", desc: "Biometric verification for anti-deepfake voice cloning." },
          { icon: <Users />, title: "Writer's Room", desc: "Real-time multiplayer collaboration for teams." },
          { icon: <Layers />, title: "Asset Market", desc: "Buy/sell prompts & templates (Economic Moat)." },
        ].map((item, i) => (
          <div key={i} className="p-4 rounded-xl bg-[#1E1E1E] border border-white/5">
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white mb-3">
              {item.icon}
            </div>
            <h4 className="font-bold text-white text-sm mb-1">{item.title}</h4>
            <p className="text-[10px] text-gray-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
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
            <h4 className="font-bold text-white">Economic Lock-in</h4>
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
            <h4 className="font-bold text-white">Data Gravity</h4>
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
            <h4 className="font-bold text-white">Fintech Rails</h4>
            <p className="text-xs text-gray-400 mt-1">
              Integrated Web3 wallets allow instant global payouts for brand deals, bypassing traditional banking friction and fees.
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
            <h4 className="font-bold text-white text-sm">Architect Tier</h4>
            <p className="text-[10px] text-gray-400">Pro Creators</p>
          </div>
          <span className="text-lg font-bold text-white">$29<span className="text-xs text-gray-500">/mo</span></span>
        </div>
        <div className="p-3 rounded-xl bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 flex justify-between items-center">
          <div>
            <h4 className="font-bold text-white text-sm">Syndicate Tier</h4>
            <p className="text-[10px] text-gray-400">Agencies & Teams</p>
          </div>
          <span className="text-lg font-bold text-white">$99<span className="text-xs text-gray-500">/mo</span></span>
        </div>
        <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center">
          <div>
            <h4 className="font-bold text-white text-sm">Marketplace Fee</h4>
            <p className="text-[10px] text-gray-400">On Asset Sales</p>
          </div>
          <span className="text-lg font-bold text-white">15-30<span className="text-xs text-gray-500">%</span></span>
        </div>
        <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center">
          <div>
            <h4 className="font-bold text-white text-sm">Enterprise API</h4>
            <p className="text-[10px] text-gray-400">Platform Infrastructure</p>
          </div>
          <span className="text-lg font-bold text-white">Custom</span>
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
      <div className="p-6 flex justify-between items-center">
        <button 
          onClick={() => setLocation("/profile")}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="text-xs font-bold tracking-widest text-gray-500 uppercase">
          Investor Deck • {currentSlide + 1}/{SLIDES.length}
        </div>
        <div className="w-10" /> {/* Spacer */}
      </div>

      {/* Slide Content */}
      <div className="flex-1 flex flex-col justify-center px-6 pb-12">
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500 key={currentSlide}">
          <h1 className="text-3xl font-display font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
            {SLIDES[currentSlide].title}
          </h1>
          <p className="text-sm text-accent font-medium uppercase tracking-wide mb-8">
            {SLIDES[currentSlide].subtitle}
          </p>
          
          {SLIDES[currentSlide].content}
        </div>
      </div>

      {/* Navigation */}
      <div className="p-6 bg-[#121212] border-t border-white/5 flex justify-between items-center">
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
