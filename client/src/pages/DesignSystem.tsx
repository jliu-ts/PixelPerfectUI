import React from "react";
import { Layout } from "@/components/Layout";
import { GradientButton } from "@/components/GradientButton";
import { Sparkles, ArrowRight, Check, X, AlertCircle } from "lucide-react";

export default function DesignSystem() {
  return (
    <Layout hideTabs>
      <div className="min-h-screen bg-background p-6 pb-24 space-y-12">
        
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-display font-bold text-white">Design System</h1>
          <p className="text-gray-400">The visual language of Trending Society.</p>
        </div>

        {/* Colors */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white border-b border-white/10 pb-2">Colors</h2>
          
          <div className="space-y-2">
            <h3 className="text-sm text-gray-500 uppercase">Primary & Accents</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="h-20 rounded-xl bg-[#7C3AED] shadow-lg flex items-center justify-center text-white font-bold">Primary</div>
                <p className="text-xs text-gray-500">#7C3AED (Electric Purple)</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 rounded-xl bg-[#22D3EE] shadow-lg flex items-center justify-center text-black font-bold">Accent</div>
                <p className="text-xs text-gray-500">#22D3EE (Cyan)</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm text-gray-500 uppercase">Surfaces</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="h-20 rounded-xl bg-[#121212] border border-white/10 flex items-center justify-center text-gray-400">Bg</div>
                <p className="text-xs text-gray-500">#121212</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 rounded-xl bg-[#1E1E1E] border border-white/10 flex items-center justify-center text-gray-400">Card</div>
                <p className="text-xs text-gray-500">#1E1E1E</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 rounded-xl bg-[#2A2A2A] border border-white/10 flex items-center justify-center text-gray-400">Muted</div>
                <p className="text-xs text-gray-500">#2A2A2A</p>
              </div>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white border-b border-white/10 pb-2">Typography</h2>
          
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-display font-bold text-white">Display Heading</h1>
              <p className="text-xs text-gray-500 mt-1">Outfit / Bold / 4xl</p>
            </div>
            <div>
              <h2 className="text-2xl font-display font-bold text-white">Section Heading</h2>
              <p className="text-xs text-gray-500 mt-1">Outfit / Bold / 2xl</p>
            </div>
            <div>
              <p className="text-base text-gray-300 leading-relaxed">
                Body text should be legible and comfortable to read. We use Inter for all body copy to ensure maximum readability across devices. The color is usually a soft gray (gray-300) rather than pure white to reduce eye strain.
              </p>
              <p className="text-xs text-gray-500 mt-1">Inter / Regular / Base</p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Label / Overline</p>
              <p className="text-xs text-gray-500 mt-1">Inter / Bold / XS / Uppercase</p>
            </div>
          </div>
        </section>

        {/* Components */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white border-b border-white/10 pb-2">Core Components</h2>
          
          <div className="space-y-4">
            <div className="p-6 rounded-xl border border-white/10 bg-[#1E1E1E] space-y-4">
              <h3 className="text-sm text-gray-400 mb-4">Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <GradientButton>Primary Action</GradientButton>
                <button className="px-4 py-2 rounded-xl bg-white text-black font-bold text-sm hover:bg-gray-200 transition-colors">
                  Secondary
                </button>
                <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors">
                  Tertiary
                </button>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-white/10 bg-[#1E1E1E] space-y-4">
              <h3 className="text-sm text-gray-400 mb-4">Status Indicators</h3>
              <div className="flex gap-4">
                <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold flex items-center gap-1 border border-green-500/20">
                  <Check size={12} /> Active
                </span>
                <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-500 text-xs font-bold flex items-center gap-1 border border-yellow-500/20">
                  <AlertCircle size={12} /> Pending
                </span>
                <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold flex items-center gap-1 border border-red-500/20">
                  <X size={12} /> Error
                </span>
              </div>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
}
