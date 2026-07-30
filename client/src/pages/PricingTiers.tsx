import React, { useState } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { ArrowLeft, Check, X, Crown, Zap, Globe, ShieldCheck, BarChart3, Users, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { GradientButton } from "@/components/GradientButton";

const TIERS = [
  {
    id: "starter",
    name: "Initiate",
    price: "0",
    description: "For new creators exploring the possibilities of AI.",
    features: [
      "50 Generation Credits / mo",
      "1 Social Connection (Instagram)",
      "Standard Resolution (720p)",
      "Basic AI Models",
      "Watermarked Exports"
    ],
    notIncluded: [
      "Multi-Platform Publishing",
      "Brand Kit & Voice Cloning",
      "Commercial License",
      "Shopify Integration"
    ],
    cta: "Start Creating",
    popular: false
  },
  {
    id: "creator",
    name: "Architect",
    price: "39",
    description: "For serious creators building a global media empire.",
    features: [
      "5,000 Generation Credits / mo",
      "All Socials (LinkedIn, Threads, Pinterest+)",
      "AI Brand Kit & Voice Cloning",
      "4K Ultra HD Exports",
      "No Watermarks",
      "Commercial License",
      "RSS Trend Context"
    ],
    notIncluded: [
      "Team Collaboration",
      "White-label Portals",
      "API Access"
    ],
    cta: "Upgrade to Architect",
    popular: true,
    highlight: "Most Popular"
  },
  {
    id: "agency",
    name: "Syndicate",
    price: "149",
    description: "For agencies and collectives dominating the feed.",
    features: [
      "Unlimited Generation Credits",
      "Writer's Room (5 Team Seats)",
      "White-label Client Portals",
      "Shopify E-commerce Connect",
      "Viral Trend Prediction Engine",
      "Priority GPU Rendering",
      "Dedicated Account Manager"
    ],
    notIncluded: [],
    cta: "Join the Syndicate",
    popular: false,
    gradient: "from-primary to-primary"
  }
];

export default function PricingTiers() {
  const [, setLocation] = useLocation();
  const [billingInterval, setBillingInterval] = useState<"monthly" | "yearly">("monthly");

  return (
    <Layout hideTabs>
      <div className="min-h-screen bg-background pb-12">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b border-white/5 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button aria-label="Go back" 
              onClick={() => setLocation("/profile")}
              className="p-2 -ml-2 rounded-full hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="font-display text-xl font-bold text-foreground">Membership</h1>
            </div>
          </div>

          {/* Billing Toggle */}
          <div className="flex justify-center">
            <div className="bg-card p-1 rounded-xl border border-white/10 flex relative">
              <button 
                onClick={() => setBillingInterval("monthly")}
                className={cn(
                  "px-6 py-2 rounded-lg text-xs font-bold transition-all relative z-10",
                  billingInterval === "monthly" ? "text-white" : "text-gray-500 hover:text-gray-300"
                )}
              >
                Monthly
              </button>
              <button 
                onClick={() => setBillingInterval("yearly")}
                className={cn(
                  "px-6 py-2 rounded-lg text-xs font-bold transition-all relative z-10",
                  billingInterval === "yearly" ? "text-white" : "text-gray-500 hover:text-gray-300"
                )}
              >
                Yearly <span className="text-[10px] text-green-400 ml-1">-20%</span>
              </button>
              
              {/* Sliding Background */}
              <div className={cn(
                "absolute top-1 bottom-1 w-[calc(50%-4px)] bg-muted rounded-lg transition-all duration-300",
                billingInterval === "yearly" ? "left-[calc(50%+2px)]" : "left-1"
              )} />
            </div>
          </div>
        </div>

        {/* Tiers Grid */}
        <div className="p-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {TIERS.map(tier => (
              <div 
                key={tier.id} 
                className={cn(
                  "rounded-2xl border relative overflow-hidden transition-all flex flex-col",
                  tier.popular ? "bg-card border-purple-500/50 shadow-lg shadow-purple-900/20 transform md:-translate-y-2" : "bg-background border-white/10",
                  tier.id === "agency" && "bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border-blue-500/30"
                )}
              >
                {tier.highlight && (
                  <div className="absolute top-0 right-0 bg-purple-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl">
                    {tier.highlight}
                  </div>
                )}

                <div className="p-6 flex flex-col h-full">
                  <h2 className="text-lg font-display font-bold text-white mb-1 flex items-center gap-2">
                    {tier.name}
                    {tier.id === "agency" && <Crown size={16} className="text-yellow-400" />}
                    {tier.id === "creator" && <Sparkles size={16} className="text-purple-400" />}
                  </h2>
                  <p className="text-xs text-gray-400 mb-4 h-8 line-clamp-2">{tier.description}</p>
                  
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-3xl font-bold text-white">${tier.price}</span>
                    <span className="text-sm text-gray-500">/mo</span>
                  </div>

                  <button 
                    className={cn(
                      "w-full py-3 rounded-xl text-sm font-bold mb-6 transition-all",
                      tier.popular 
                        ? "bg-white text-black hover:bg-gray-200" 
                        : tier.id === "agency" 
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90"
                          : "bg-white/10 text-white hover:bg-white/20"
                    )}
                  >
                    {tier.cta}
                  </button>

                  <div className="space-y-3 flex-1">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Includes:</p>
                    {tier.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className={cn(
                          "mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0",
                          tier.id === "agency" ? "bg-blue-500/20 text-blue-400" : "bg-green-500/10 text-green-500"
                        )}>
                          <Check size={10} />
                        </div>
                        <span className="text-sm text-gray-300">{feature}</span>
                      </div>
                    ))}
                    
                    {tier.notIncluded.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3 opacity-50">
                        <div className="mt-0.5 w-4 h-4 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 text-red-500">
                          <X size={10} />
                        </div>
                        <span className="text-sm text-gray-500">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Enterprise / Data Upsell */}
          <div className="p-8 rounded-2xl bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-500/20 text-center md:flex md:items-center md:justify-between md:text-left">
            <div className="mb-4 md:mb-0 md:flex md:items-center md:gap-6">
              <div className="w-16 h-16 mx-auto md:mx-0 bg-yellow-500/10 rounded-full flex items-center justify-center text-yellow-500 shrink-0">
                <Globe size={32} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white mb-1">Society Enterprise</h2>
                <p className="text-sm text-gray-400 max-w-md mx-auto md:mx-0">
                  Own the rails. Custom model training, dedicated GPU clusters, and full API access for platforms.
                </p>
              </div>
            </div>
            <button className="px-6 py-3 bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/50 rounded-xl text-yellow-500 text-sm font-bold transition-colors whitespace-nowrap">
              Contact Sales →
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
