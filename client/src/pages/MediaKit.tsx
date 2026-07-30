import React, { useState } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { GradientButton } from "@/components/GradientButton";
import { 
  ArrowLeft,
  Download, 
  Share2, 
  Instagram, 
  Twitter, 
  Youtube, 
  Globe, 
  Mail,
  Check,
  ArrowRight,
  BarChart3,
  Users,
  MapPin,
  Calendar,
  DollarSign,
  TrendingUp,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BRAND_LOGOS } from "@/lib/constants/brandLogos";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

// Mock Data
const REACH_STATS = [
  { platform: "Instagram", followers: "125k", growth: "+12%", color: "#E1306C", icon: Instagram },
  { platform: "TikTok", followers: "850k", growth: "+45%", color: "#00F2EA", icon: Globe },
  { platform: "YouTube", followers: "240k", growth: "+8%", color: "#FF0000", icon: Youtube },
  { platform: "Twitter", followers: "55k", growth: "+5%", color: "#1DA1F2", icon: Twitter },
];

const DEMOGRAPHICS_AGE = [
  { name: "18-24", value: 45 },
  { name: "25-34", value: 35 },
  { name: "35-44", value: 15 },
  { name: "45+", value: 5 },
];

const DEMOGRAPHICS_GENDER = [
  { name: "Male", value: 60, color: "#3B82F6" },
  { name: "Female", value: 38, color: "#EC4899" },
  { name: "Other", value: 2, color: "#A855F7" },
];

const ENGAGEMENT_DATA = [
  { month: "Jan", avg: 4.5, industry: 2.1 },
  { month: "Feb", avg: 4.8, industry: 2.1 },
  { month: "Mar", avg: 5.2, industry: 2.2 },
  { month: "Apr", avg: 4.9, industry: 2.1 },
  { month: "May", avg: 6.1, industry: 2.3 },
  { month: "Jun", avg: 7.5, industry: 2.2 },
];

const PRICING_PACKAGES = [
  {
    title: "Basic Integration",
    price: "$1,500",
    features: ["1 Dedicated Instagram Story", "Product Link in Bio (24h)", "Raw Content Usage Rights (1 Year)"],
    popular: false
  },
  {
    title: "Viral Package",
    price: "$4,500",
    features: ["1 TikTok Video (30-60s)", "Cross-post to IG Reels & YouTube Shorts", "Comment Management (48h)", "Whitelisting Rights"],
    popular: true
  },
  {
    title: "Brand Ambassador",
    price: "$12,000",
    features: ["3-Month Partnership", "Monthly Dedicated Content", "Newsletter Feature", "Event Appearance", "Exclusive Category Rights"],
    popular: false
  },
];

const PAST_COLLABS = [
  { brand: "Nike", logo: BRAND_LOGOS.nikeWordmark },
  { brand: "Samsung", logo: BRAND_LOGOS.samsungWordmark },
  { brand: "Spotify", logo: BRAND_LOGOS.spotify },
  { brand: "Adobe", logo: BRAND_LOGOS.adobe },
];

export default function MediaKit() {
  const [isEditing, setIsEditing] = useState(false);
  const [, setLocation] = useLocation();

  return (
    <Layout hideTabs>
      <div className="min-h-screen bg-background pb-20">
        {/* Header */}
        <div className="flex items-center gap-4 p-4 pt-8 bg-background/80 backdrop-blur-md sticky top-0 z-20 border-b border-white/5 justify-between">
          <div className="flex items-center gap-3">
             <button aria-label="Go back" 
              onClick={() => setLocation("/profile")}
              className="p-2 -ml-2 rounded-full hover:bg-white/10 text-white transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-lg font-display font-bold text-white flex items-center gap-2">
                Media Kit
              </h1>
              <p className="text-xs text-gray-400">Showcase your stats & packages</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button aria-label="Share" className="p-2 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-white/10 border border-white/10 transition-colors">
              <Share2 size={18} />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-xs font-bold hover:bg-gray-200 transition-colors">
              <Download size={14} /> PDF
            </button>
          </div>
        </div>
        
        {/* Hero Section */}
        <div className="relative h-64 w-full bg-black overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 to-blue-900/40 z-0" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1200&auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay" />
          
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 bg-gradient-to-t from-background to-transparent z-10">
             <div className="flex flex-col md:flex-row md:items-end gap-6">
               <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl border-4 border-background bg-gray-800 overflow-hidden shadow-2xl relative">
                 <img loading="lazy" decoding="async" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" className="w-full h-full object-cover" />
                 <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
               </div>
               <div className="flex-1 mb-2">
                 <div className="flex items-center gap-2 mb-1">
                   <h1 className="text-3xl md:text-4xl font-display font-bold text-white">Felix Kjellberg</h1>
                   <span className="px-2 py-1 rounded-md bg-blue-500/20 text-blue-400 text-[10px] font-bold border border-blue-500/30 uppercase tracking-wider">
                     Verified Creator
                   </span>
                 </div>
                 <p className="text-gray-300 max-w-xl text-sm md:text-base leading-relaxed">
                   Futurist & Digital Artist exploring the intersection of AI, Tech, and Culture. Creating immersive visual stories for the next generation.
                 </p>
                 <div className="flex items-center gap-4 mt-4 text-xs text-gray-400">
                   <span className="flex items-center gap-1"><MapPin size={14} /> Tokyo, Japan</span>
                   <span className="flex items-center gap-1"><Mail size={14} /> business@felix.art</span>
                   <span className="flex items-center gap-1 text-green-400 font-bold"><Zap size={14} /> Responds in 2h</span>
                 </div>
               </div>
               <GradientButton className="px-8 py-3 text-sm font-bold shadow-xl">
                 Book Now
               </GradientButton>
             </div>
          </div>
        </div>

        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
          
          {/* Reach Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {REACH_STATS.map((stat) => (
              <div key={stat.platform} className="p-5 rounded-2xl bg-[#1E1E1E] border border-white/5 hover:border-white/10 transition-all group">
                <div className="flex justify-between items-start mb-2">
                  <div className="p-2 rounded-lg bg-white/5 text-white group-hover:scale-110 transition-transform" style={{ color: stat.color }}>
                    <stat.icon size={20} />
                  </div>
                  <span className="text-green-400 text-xs font-bold bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20">
                    {stat.growth}
                  </span>
                </div>
                <h3 className="text-2xl font-display font-bold text-white mt-2">{stat.followers}</h3>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">{stat.platform}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Analytics */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Engagement Chart */}
              <div className="p-6 rounded-2xl bg-[#1E1E1E] border border-white/5">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-white">Engagement Rate</h3>
                    <p className="text-xs text-gray-400">Consistently outperforming industry benchmarks</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="flex items-center gap-1 text-white"><span className="w-2 h-2 rounded-full bg-purple-500" /> Me</span>
                    <span className="flex items-center gap-1 text-gray-500"><span className="w-2 h-2 rounded-full bg-gray-600" /> Industry Avg</span>
                  </div>
                </div>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ENGAGEMENT_DATA}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                      <XAxis dataKey="month" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}%`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1E1E1E', border: '1px solid #333', borderRadius: '8px' }}
                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                      />
                      <Bar dataKey="avg" fill="#7C3AED" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="industry" fill="#4B5563" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Past Collaborations */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Trusted By</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {PAST_COLLABS.map((collab) => (
                    <div key={collab.brand} className="h-24 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center p-6 grayscale hover:grayscale-0 transition-all hover:bg-white/10">
                      <img loading="lazy" decoding="async" src={collab.logo} alt={collab.brand} className="max-h-full max-w-full object-contain opacity-70 hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Demographics & Pricing */}
            <div className="space-y-8">
              
              {/* Audience Demographics */}
              <div className="p-6 rounded-2xl bg-[#1E1E1E] border border-white/5">
                <h3 className="text-lg font-bold text-white mb-6">Audience</h3>
                
                <div className="space-y-6">
                  {/* Gender Split */}
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase mb-3">Gender Split</p>
                    <div className="flex h-4 rounded-full overflow-hidden">
                      {DEMOGRAPHICS_GENDER.map((g) => (
                        <div key={g.name} style={{ width: `${g.value}%`, backgroundColor: g.color }} />
                      ))}
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-gray-400">
                      {DEMOGRAPHICS_GENDER.map((g) => (
                        <span key={g.name} className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: g.color }} />
                          {g.name} {g.value}%
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Age Distribution */}
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase mb-3">Top Age Brackets</p>
                    <div className="space-y-2">
                      {DEMOGRAPHICS_AGE.map((age) => (
                        <div key={age.name} className="flex items-center gap-3 text-xs">
                          <span className="w-10 text-gray-400">{age.name}</span>
                          <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${age.value}%` }} />
                          </div>
                          <span className="w-8 text-right text-white font-bold">{age.value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Download Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-white/10 text-center">
                 <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                   <Calendar size={24} />
                 </div>
                 <h3 className="text-white font-bold mb-1">Ready to collaborate?</h3>
                 <p className="text-xs text-gray-400 mb-4">Download my full media kit with detailed case studies.</p>
                 <button className="w-full py-2.5 rounded-xl bg-white text-black text-xs font-bold hover:bg-gray-200 transition-colors">
                   Download Full Kit (PDF)
                 </button>
              </div>

            </div>
          </div>

          {/* Pricing Packages */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <DollarSign size={24} className="text-green-400" /> 
              Partnership Packages
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PRICING_PACKAGES.map((pkg) => (
                <div key={pkg.title} className={cn(
                  "p-6 rounded-2xl border transition-all relative overflow-hidden group",
                  pkg.popular 
                    ? "bg-[#1E1E1E] border-purple-500 shadow-[0_0_30px_rgba(124,58,237,0.2)]" 
                    : "bg-[#1E1E1E] border-white/5 hover:border-white/20"
                )}>
                  {pkg.popular && (
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-purple-500 text-white text-[10px] font-bold uppercase tracking-wide shadow-lg">
                      Most Popular
                    </div>
                  )}
                  <h4 className="text-lg font-bold text-white mb-1">{pkg.title}</h4>
                  <div className="text-2xl font-display font-bold text-white mb-6">{pkg.price}</div>
                  
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs text-gray-300">
                        <Check size={14} className="text-green-400 mt-0.5 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button className={cn(
                    "w-full py-3 rounded-xl text-sm font-bold transition-all",
                    pkg.popular
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:brightness-110 shadow-lg"
                      : "bg-white/10 text-white hover:bg-white/20"
                  )}>
                    Select Package
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}