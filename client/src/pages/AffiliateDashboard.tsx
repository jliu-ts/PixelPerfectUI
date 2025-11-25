import React, { useState } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { GradientButton } from "@/components/GradientButton";
import { 
  ArrowLeft, 
  DollarSign, 
  TrendingUp, 
  Briefcase, 
  ShoppingBag, 
  Wallet, 
  ChevronRight, 
  CheckCircle2,
  CreditCard,
  Coins
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";

// Mock Data
const EARNINGS_DATA = [
  { day: "Mon", value: 120 },
  { day: "Tue", value: 180 },
  { day: "Wed", value: 150 },
  { day: "Thu", value: 240 },
  { day: "Fri", value: 300 },
  { day: "Sat", value: 280 },
  { day: "Sun", value: 350 },
];

const CAMPAIGNS = [
  { id: 1, brand: "Nike", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg", title: "Future of Sport", reward: "$500", status: "open", type: "USDC" },
  { id: 2, brand: "Samsung", logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg", title: "Galaxy AI Review", reward: "$1,200", status: "applied", type: "USDT" },
  { id: 3, brand: "Notion", logo: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png", title: "Productivity Setup", reward: "$300", status: "open", type: "USDC" },
];

const REWARDS = [
  { id: 1, name: "Midjourney 1 Month", cost: "30 Credits", discount: "100% OFF", icon: "🎨" },
  { id: 2, name: "Adobe Creative Cloud", cost: "100 Credits", discount: "20% OFF", icon: "🖌️" },
  { id: 3, name: "Epidemic Sound", cost: "50 Credits", discount: "3 Months Free", icon: "🎵" },
];

export default function AffiliateDashboard() {
  const [, setLocation] = useLocation();
  const [walletConnected, setWalletConnected] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "campaigns" | "rewards">("overview");

  const connectWallet = () => {
    // Simulate wallet connection
    setTimeout(() => setWalletConnected(true), 1000);
  };

  return (
    <Layout hideTabs>
      <div className="min-h-screen bg-background pb-8">
        {/* Header */}
        <div className="flex items-center gap-4 p-4 pt-8 bg-background/80 backdrop-blur-md sticky top-0 z-20 border-b border-white/5">
          <button 
            onClick={() => setLocation("/profile")}
            className="p-2 -ml-2 rounded-full hover:bg-white/10 text-white transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-xl font-display font-bold text-white flex items-center gap-2">
              Creator Hub
              <Briefcase size={18} className="text-green-400" />
            </h1>
            <p className="text-xs text-gray-400">Monetize your content</p>
          </div>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Wallet Status */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#1E1E1E] to-[#252525] border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                <Wallet size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Payout Wallet</h3>
                <p className="text-xs text-gray-400">
                  {walletConnected ? "0x71C...9A23 • Polygon" : "Connect to receive crypto"}
                </p>
              </div>
            </div>
            {walletConnected ? (
              <div className="flex items-center gap-1 text-green-400 text-xs font-bold bg-green-500/10 px-2 py-1 rounded-full">
                <CheckCircle2 size={12} /> Active
              </div>
            ) : (
              <button 
                onClick={connectWallet}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors"
              >
                Connect
              </button>
            )}
          </div>

          {/* Navigation Tabs */}
          <div className="flex p-1 bg-[#1E1E1E] rounded-xl border border-white/5">
            <button 
              onClick={() => setActiveTab("overview")}
              className={cn("flex-1 py-2 rounded-lg text-xs font-bold transition-all", activeTab === "overview" ? "bg-[#2A2A2A] text-white shadow-sm" : "text-gray-500 hover:text-gray-300")}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveTab("campaigns")}
              className={cn("flex-1 py-2 rounded-lg text-xs font-bold transition-all", activeTab === "campaigns" ? "bg-[#2A2A2A] text-white shadow-sm" : "text-gray-500 hover:text-gray-300")}
            >
              Brand Deals
            </button>
            <button 
              onClick={() => setActiveTab("rewards")}
              className={cn("flex-1 py-2 rounded-lg text-xs font-bold transition-all", activeTab === "rewards" ? "bg-[#2A2A2A] text-white shadow-sm" : "text-gray-500 hover:text-gray-300")}
            >
              Rewards
            </button>
          </div>

          {/* Content Area */}
          <div className="space-y-6">
            
            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
              <div className="animate-in fade-in slide-in-from-bottom-4">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="p-4 rounded-xl bg-[#1E1E1E] border border-white/5">
                    <p className="text-xs text-gray-500 uppercase mb-1">Available (USDC)</p>
                    <h3 className="text-2xl font-display font-bold text-white flex items-center gap-1">
                      $1,240.50
                    </h3>
                  </div>
                  <div className="p-4 rounded-xl bg-[#1E1E1E] border border-white/5">
                    <p className="text-xs text-gray-500 uppercase mb-1">Pending</p>
                    <h3 className="text-2xl font-display font-bold text-gray-400">$450.00</h3>
                  </div>
                </div>

                {/* Chart */}
                <div className="p-4 rounded-xl bg-[#1E1E1E] border border-white/5 h-64 mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-white">Earnings History</h3>
                    <span className="text-xs text-green-400 flex items-center gap-1">
                      <TrendingUp size={12} /> +12%
                    </span>
                  </div>
                  <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={EARNINGS_DATA}>
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#121212', border: '1px solid #333', borderRadius: '8px' }}
                          itemStyle={{ color: '#fff' }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#7C3AED" 
                          strokeWidth={3}
                          dot={{ r: 4, fill: "#22D3EE" }} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {/* CAMPAIGNS TAB */}
            {activeTab === "campaigns" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 space-y-3">
                {CAMPAIGNS.map(campaign => (
                  <div key={campaign.id} className="p-4 rounded-xl bg-[#1E1E1E] border border-white/5 flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-white p-2 flex items-center justify-center">
                        <img src={campaign.logo} alt={campaign.brand} className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-sm">{campaign.title}</h3>
                        <p className="text-xs text-gray-400 flex items-center gap-1">
                          {campaign.brand} • <span className="text-green-400 font-bold">{campaign.reward}</span> {campaign.type}
                        </p>
                      </div>
                    </div>
                    
                    {campaign.status === "applied" ? (
                      <span className="px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-500 text-[10px] font-bold border border-yellow-500/20">
                        Applied
                      </span>
                    ) : (
                      <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white transition-colors">
                        Apply
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* REWARDS TAB */}
            {activeTab === "rewards" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 grid grid-cols-1 gap-3">
                {REWARDS.map(reward => (
                  <div key={reward.id} className="p-4 rounded-xl bg-gradient-to-br from-[#1E1E1E] to-black border border-white/5 relative overflow-hidden group cursor-pointer hover:border-accent/30 transition-colors">
                    <div className="flex justify-between items-start relative z-10">
                      <div className="flex gap-3">
                        <div className="text-2xl">{reward.icon}</div>
                        <div>
                          <h3 className="font-bold text-white text-sm">{reward.name}</h3>
                          <p className="text-xs text-accent font-bold mt-0.5">{reward.discount}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="block text-xs font-medium text-gray-400">Cost</span>
                        <span className="block text-sm font-bold text-white">{reward.cost}</span>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-white/5 flex justify-between items-center relative z-10">
                       <span className="text-[10px] text-gray-500">Valid until Dec 31</span>
                       <button className="text-xs font-bold text-white bg-white/10 px-3 py-1 rounded hover:bg-white/20 transition-colors">
                         Redeem
                       </button>
                    </div>
                    {/* Glow effect */}
                    <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-colors" />
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>
      </div>
    </Layout>
  );
}
