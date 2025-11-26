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
  Coins,
  Zap,
  Gem,
  BarChart3,
  PieChart,
  Activity,
  ArrowUpRight,
  ExternalLink,
  Clock,
  Users,
  Globe,
  Copy
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  Line, 
  LineChart, 
  ResponsiveContainer, 
  Tooltip, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid,
  BarChart,
  Bar,
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar,
  Legend
} from "recharts";

// Mock Data
const EARNINGS_DATA = [
  { day: "Mon", value: 120, clicks: 450 },
  { day: "Tue", value: 180, clicks: 520 },
  { day: "Wed", value: 150, clicks: 480 },
  { day: "Thu", value: 240, clicks: 600 },
  { day: "Fri", value: 300, clicks: 750 },
  { day: "Sat", value: 280, clicks: 690 },
  { day: "Sun", value: 350, clicks: 820 },
];

const CAMPAIGNS = [
  { 
    id: 1, 
    brand: "Nike", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg", 
    title: "Future of Sport", 
    reward: "$500", 
    status: "open", 
    type: "USDC",
    platform: "Instagram",
    spots: "3/5 Left",
    deadline: "2 Days" 
  },
  { 
    id: 2, 
    brand: "Samsung", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg", 
    title: "Galaxy AI Review", 
    reward: "$1,200", 
    status: "applied", 
    type: "USDT",
    platform: "YouTube",
    spots: "Full",
    deadline: "Closed"
  },
  { 
    id: 3, 
    brand: "Notion", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png", 
    title: "Productivity Setup", 
    reward: "$300", 
    status: "active", 
    type: "USDC",
    platform: "TikTok",
    spots: "Unlimited",
    deadline: "Ongoing"
  },
];

const REWARDS = [
  { id: 1, name: "Midjourney 1 Month", cost: "30 Credits", discount: "100% OFF", icon: "🎨", type: "Software" },
  { id: 2, name: "Adobe Creative Cloud", cost: "100 Credits", discount: "20% OFF", icon: "🖌️", type: "Software" },
  { id: 3, name: "Epidemic Sound", cost: "50 Credits", discount: "3 Months Free", icon: "🎵", type: "Service" },
  { id: 4, name: "Paris City Tour (Viator)", cost: "1200 Credits", discount: "Free Ticket", icon: "🗼", type: "Travel" },
  { id: 5, name: "Bali Digital Nomad Retreat", cost: "2500 Credits", discount: "All Inclusive", icon: "🌴", type: "Travel" },
  { id: 6, name: "NYC Helicopter Ride", cost: "1800 Credits", discount: "VIP Access", icon: "🚁", type: "Experience" },
];

const NETWORKS = [
  { id: "cj", name: "CJ Affiliate", logo: "CJ", status: "connected", campaigns: 12, clicks: "1.2k" },
  { id: "impact", name: "Impact Radius", logo: "IR", status: "connected", campaigns: 8, clicks: "850" },
  { id: "shareasale", name: "ShareASale", logo: "SS", status: "disconnected", campaigns: 0, clicks: "0" },
];

const TRANSACTIONS = [
  { 
    id: "tx_1", 
    source: "Instagram", 
    content: "Viral Reel #2", 
    contentType: "Video", 
    utm: "utm_source=ig&utm_medium=reel", 
    payout: 45.00, 
    status: "converted", 
    date: "Just now" 
  },
  { 
    id: "tx_2", 
    source: "TikTok", 
    content: "Bio Link", 
    contentType: "Link", 
    utm: "utm_source=tiktok&utm_medium=bio", 
    payout: 12.50, 
    status: "converted", 
    date: "15m ago" 
  },
  { 
    id: "tx_3", 
    source: "YouTube", 
    content: "Tech Review", 
    contentType: "Video", 
    utm: "utm_source=yt&utm_medium=desc", 
    payout: 120.00, 
    status: "converted", 
    date: "1h ago" 
  },
  { 
    id: "tx_4", 
    source: "Blog", 
    content: "Top 10 Tools", 
    contentType: "Article", 
    utm: "utm_source=web&utm_medium=seo", 
    payout: 0.00, 
    status: "click", 
    date: "2h ago" 
  },
  { 
    id: "tx_5", 
    source: "Twitter", 
    content: "Thread", 
    contentType: "Post", 
    utm: "utm_source=x&utm_medium=thread", 
    payout: 8.50, 
    status: "converted", 
    date: "3h ago" 
  },
];

const FORMAT_ROI = [
  { format: "Reels", rpm: 4.50, views: "150k", earnings: "$675" },
  { format: "Stories", rpm: 1.20, views: "45k", earnings: "$54" },
  { format: "YouTube", rpm: 12.50, views: "25k", earnings: "$312" },
  { format: "Blog", rpm: 0.80, views: "10k", earnings: "$8" },
];

const AUDIENCE_SEGMENTS = [
  { subject: 'Tech', A: 120, fullMark: 150 },
  { subject: 'Fashion', A: 98, fullMark: 150 },
  { subject: 'Finance', A: 86, fullMark: 150 },
  { subject: 'Travel', A: 99, fullMark: 150 },
  { subject: 'Gaming', A: 85, fullMark: 150 },
  { subject: 'Home', A: 65, fullMark: 150 },
];

export default function AffiliateDashboard() {
  const [, setLocation] = useLocation();
  const [walletConnected, setWalletConnected] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "campaigns" | "networks" | "rewards">("overview");
  
  // Mock Scoreboard Data
  const [genCredits, setGenCredits] = useState(450);
  const [rewardCredits, setRewardCredits] = useState(1200);

  const connectWallet = () => {
    // Simulate wallet connection
    setTimeout(() => setWalletConnected(true), 1000);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1E1E1E]/90 backdrop-blur-md border border-white/10 p-3 rounded-xl shadow-xl">
          <p className="text-gray-400 text-xs font-bold mb-1">{label}</p>
          <div className="flex flex-col gap-1">
             <p className="text-white text-sm font-bold flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-purple-500" />
               ${payload[0].value}
             </p>
             {payload[1] && (
               <p className="text-gray-300 text-xs font-medium flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-cyan-400" />
                 {payload[1].value} Clicks
               </p>
             )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Layout hideTabs>
      <div className="min-h-screen bg-background pb-20">
        {/* Header */}
        <div className="flex items-center gap-4 p-4 pt-8 bg-background/80 backdrop-blur-md sticky top-0 z-20 border-b border-white/5 justify-between">
          <div className="flex items-center gap-3">
             <button 
              onClick={() => setLocation("/profile")}
              className="p-2 -ml-2 rounded-full hover:bg-white/10 text-white transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-lg font-display font-bold text-white flex items-center gap-2">
                Creator Hub
              </h1>
              <p className="text-xs text-gray-400">Manage earnings & partnerships</p>
            </div>
          </div>

          {/* Scoreboard */}
          <div className="flex items-center gap-2 bg-black/40 p-1 rounded-lg border border-white/10">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30">
              <Zap size={12} className="text-yellow-400 fill-yellow-400" />
              <span className="text-xs font-bold text-white">{genCredits}</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-gradient-to-r from-emerald-600/20 to-cyan-600/20 border border-emerald-500/30">
              <Gem size={12} className="text-cyan-400 fill-cyan-400" />
              <span className="text-xs font-bold text-white">{rewardCredits}</span>
            </div>
          </div>
        </div>

        <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
          
          {/* Wallet Status Card - Modernized */}
          <div className="p-1 rounded-2xl bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20">
            <div className="bg-[#121212] rounded-xl p-4 flex items-center justify-between relative overflow-hidden">
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                  <Wallet size={24} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Payout Wallet</h3>
                  <p className="text-xs text-gray-400 mt-0.5 font-mono">
                    {walletConnected ? "0x71C...9A23 • Polygon" : "Connect to receive crypto payouts"}
                  </p>
                </div>
              </div>
              {walletConnected ? (
                <div className="flex items-center gap-2 text-green-400 text-xs font-bold bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/20 relative z-10">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Active
                </div>
              ) : (
                <button 
                  onClick={connectWallet}
                  className="px-4 py-2 rounded-lg bg-white text-black text-xs font-bold hover:bg-gray-200 transition-all relative z-10 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                >
                  Connect Wallet
                </button>
              )}
              
              {/* Background Glow */}
              <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
            </div>
          </div>

          {/* Navigation Tabs - Segmented Control */}
          <div className="flex p-1 bg-[#1E1E1E] rounded-xl border border-white/5 sticky top-20 z-10 shadow-xl">
            {[
              { id: "overview", label: "Dashboard", icon: BarChart3 },
              { id: "campaigns", label: "Campaigns", icon: Briefcase },
              { id: "networks", label: "Networks", icon: Globe },
              { id: "rewards", label: "Rewards", icon: Gem },
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "flex-1 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2", 
                  activeTab === tab.id 
                    ? "bg-[#2A2A2A] text-white shadow-lg border border-white/5" 
                    : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
                )}
              >
                <tab.icon size={14} className={activeTab === tab.id ? "text-accent" : ""} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="space-y-6 min-h-[400px]">
            
            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 space-y-6">
                {/* Primary Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-5 rounded-2xl bg-[#1E1E1E] border border-white/5 relative overflow-hidden group hover:border-white/10 transition-all">
                    <div className="flex justify-between items-start mb-4">
                       <div>
                         <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Total Revenue</p>
                         <h3 className="text-3xl font-display font-bold text-white tracking-tight">$1,240.50</h3>
                       </div>
                       <div className="p-2 bg-green-500/10 rounded-lg text-green-400">
                         <ArrowUpRight size={18} />
                       </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                       <span className="text-green-400 font-bold">+12.5%</span>
                       <span className="text-gray-500">vs last month</span>
                    </div>
                    <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-green-500/5 rounded-full blur-2xl group-hover:bg-green-500/10 transition-colors" />
                  </div>

                  <div className="p-5 rounded-2xl bg-[#1E1E1E] border border-white/5 relative overflow-hidden group hover:border-white/10 transition-all">
                    <div className="flex justify-between items-start mb-4">
                       <div>
                         <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Pending Payouts</p>
                         <h3 className="text-3xl font-display font-bold text-gray-300 tracking-tight">$450.00</h3>
                       </div>
                       <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-400">
                         <Clock size={18} />
                       </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                       <span className="text-gray-400">Next payout:</span>
                       <span className="text-white font-bold">Nov 30</span>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#1E1E1E] border border-white/5 relative overflow-hidden group hover:border-white/10 transition-all">
                    <div className="flex justify-between items-start mb-4">
                       <div>
                         <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Total Clicks</p>
                         <h3 className="text-3xl font-display font-bold text-white tracking-tight">24.5k</h3>
                       </div>
                       <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                         <Activity size={18} />
                       </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                       <span className="text-blue-400 font-bold">+5.2%</span>
                       <span className="text-gray-500">engagement rate</span>
                    </div>
                  </div>
                </div>

                {/* Advanced Creator Insights Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {/* Format ROI - Horizontal Bar */}
                  <div className="lg:col-span-2 p-6 rounded-2xl bg-[#1E1E1E] border border-white/5">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h3 className="text-base font-bold text-white flex items-center gap-2">
                          Format Efficiency
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30">RPM</span>
                        </h3>
                        <p className="text-xs text-gray-400">Revenue per 1,000 views by content type</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                       {FORMAT_ROI.map((item, i) => (
                         <div key={i} className="space-y-1">
                           <div className="flex justify-between text-xs font-bold">
                             <span className="text-white">{item.format}</span>
                             <span className="text-green-400">${item.rpm.toFixed(2)} RPM</span>
                           </div>
                           <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden flex">
                             <div 
                               className="h-full bg-gradient-to-r from-purple-600 to-blue-500 rounded-full" 
                               style={{ width: `${(item.rpm / 15) * 100}%` }}
                             />
                           </div>
                           <div className="flex justify-between text-[10px] text-gray-500">
                             <span>{item.views} views</span>
                             <span>Total: {item.earnings}</span>
                           </div>
                         </div>
                       ))}
                    </div>
                  </div>

                  {/* Audience Heatmap - Radar */}
                  <div className="p-6 rounded-2xl bg-[#1E1E1E] border border-white/5 flex flex-col">
                    <div className="mb-4">
                      <h3 className="text-base font-bold text-white">Audience Spend</h3>
                      <p className="text-xs text-gray-400">Purchase power by niche</p>
                    </div>
                    <div className="flex-1 min-h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={AUDIENCE_SEGMENTS}>
                          <PolarGrid stroke="#333" />
                          <PolarAngleAxis dataKey="subject" tick={{ fill: '#999', fontSize: 10 }} />
                          <Radar
                            name="Purchase Power"
                            dataKey="A"
                            stroke="#22D3EE"
                            strokeWidth={2}
                            fill="#22D3EE"
                            fillOpacity={0.3}
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Missed Opportunities Alert */}
                <div className="p-1 rounded-2xl bg-gradient-to-r from-red-500/20 to-orange-500/20">
                  <div className="bg-[#121212] rounded-xl p-4 flex items-center justify-between">
                     <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 border border-red-500/20 animate-pulse">
                         <Activity size={20} />
                       </div>
                       <div>
                         <h3 className="text-sm font-bold text-white">Revenue Alert: Broken Links</h3>
                         <p className="text-xs text-gray-400">3 Products in your "Tech Setup" post are out of stock. You missed approx. <span className="text-white font-bold">$145</span> today.</p>
                       </div>
                     </div>
                     <button className="px-4 py-2 rounded-lg bg-red-500 text-white text-xs font-bold hover:bg-red-600 transition-colors shadow-[0_0_15px_rgba(239,68,68,0.4)]">
                       Fix Links
                     </button>
                  </div>
                </div>

                {/* Main Chart */}
                <div className="p-6 rounded-2xl bg-[#1E1E1E] border border-white/5">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="text-base font-bold text-white">Performance Analytics</h3>
                      <p className="text-xs text-gray-400">Revenue vs. Clicks over time</p>
                    </div>
                    <select className="bg-black/30 border border-white/10 rounded-lg text-xs text-gray-300 px-3 py-1.5 focus:outline-none">
                      <option>Last 7 Days</option>
                      <option>Last 30 Days</option>
                      <option>This Year</option>
                    </select>
                  </div>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={EARNINGS_DATA}>
                        <defs>
                          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#22D3EE" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#22D3EE" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                        <XAxis dataKey="day" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
                        <Tooltip content={<CustomTooltip />} />
                        <Area 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#7C3AED" 
                          strokeWidth={3}
                          fillOpacity={1} 
                          fill="url(#colorValue)" 
                        />
                        <Area 
                          type="monotone" 
                          dataKey="clicks" 
                          stroke="#22D3EE" 
                          strokeWidth={3}
                          fillOpacity={1} 
                          fill="url(#colorClicks)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Transaction Table */}
                <div className="p-6 rounded-2xl bg-[#1E1E1E] border border-white/5">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-base font-bold text-white">Recent Conversions</h3>
                      <p className="text-xs text-gray-400">Real-time tracking from all channels</p>
                    </div>
                    <button className="text-xs font-bold text-accent hover:text-white transition-colors">
                      View All
                    </button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left border-b border-white/5">
                          <th className="pb-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Time</th>
                          <th className="pb-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Source</th>
                          <th className="pb-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Content</th>
                          <th className="pb-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">UTM Params</th>
                          <th className="pb-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-right">Payout</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {TRANSACTIONS.map((tx) => (
                          <tr key={tx.id} className="group hover:bg-white/5 transition-colors">
                            <td className="py-3 text-xs text-gray-400 font-mono">{tx.date}</td>
                            <td className="py-3">
                              <div className="flex items-center gap-2">
                                <span className={cn(
                                  "w-1.5 h-1.5 rounded-full",
                                  tx.status === "converted" ? "bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]" : "bg-blue-500"
                                )} />
                                <span className="text-sm font-bold text-white">{tx.source}</span>
                              </div>
                            </td>
                            <td className="py-3">
                              <div className="flex flex-col">
                                <span className="text-xs text-white font-medium">{tx.content}</span>
                                <span className="text-[10px] text-gray-500">{tx.contentType}</span>
                              </div>
                            </td>
                            <td className="py-3">
                              <code className="text-[10px] text-gray-500 bg-black/20 px-1.5 py-0.5 rounded border border-white/5 font-mono">
                                {tx.utm}
                              </code>
                            </td>
                            <td className="py-3 text-right">
                              {tx.status === "converted" ? (
                                <span className="text-sm font-bold text-green-400">
                                  +${tx.payout.toFixed(2)}
                                </span>
                              ) : (
                                <span className="text-xs font-bold text-gray-500">
                                  Click
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* CAMPAIGNS TAB */}
            {activeTab === "campaigns" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 grid gap-4">
                {CAMPAIGNS.map(campaign => (
                  <div key={campaign.id} className="p-5 rounded-2xl bg-[#1E1E1E] border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:border-white/10 transition-all relative overflow-hidden">
                    <div className="flex items-start gap-4 relative z-10">
                      <div className="w-14 h-14 rounded-xl bg-white p-2 flex items-center justify-center shadow-lg">
                        <img src={campaign.logo} alt={campaign.brand} className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-white text-base">{campaign.title}</h3>
                          <span className={cn(
                            "px-2 py-0.5 rounded text-[10px] font-bold uppercase border",
                            campaign.status === "active" ? "bg-green-500/10 text-green-400 border-green-500/20" :
                            campaign.status === "applied" ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" :
                            "bg-blue-500/10 text-blue-400 border-blue-500/20"
                          )}>
                            {campaign.status}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-400">
                          <span className="font-bold text-white">{campaign.brand}</span>
                          <span className="flex items-center gap-1"><DollarSign size={12} /> {campaign.reward} {campaign.type}</span>
                          <span className="flex items-center gap-1"><Globe size={12} /> {campaign.platform}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 md:border-l md:border-white/5 md:pl-6 relative z-10">
                       <div className="text-right hidden md:block">
                          <p className="text-[10px] text-gray-500 uppercase font-bold">Deadline</p>
                          <p className="text-xs text-white font-medium">{campaign.deadline}</p>
                       </div>
                       <div className="text-right hidden md:block mr-2">
                          <p className="text-[10px] text-gray-500 uppercase font-bold">Availability</p>
                          <p className="text-xs text-white font-medium">{campaign.spots}</p>
                       </div>

                      {campaign.status === "applied" ? (
                        <button className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 text-xs font-bold cursor-not-allowed flex items-center gap-2">
                          <Clock size={14} /> Processing
                        </button>
                      ) : campaign.status === "active" ? (
                        <button className="px-6 py-2.5 rounded-xl bg-green-500 text-black border border-green-400 text-xs font-bold hover:brightness-110 transition-all shadow-[0_0_15px_rgba(34,197,94,0.3)] flex items-center gap-2">
                           Submit Content
                        </button>
                      ) : (
                        <button className="px-6 py-2.5 rounded-xl bg-white text-black border border-white text-xs font-bold hover:bg-gray-200 transition-all flex items-center gap-2">
                          Apply Now <ArrowUpRight size={14} />
                        </button>
                      )}
                    </div>

                    {/* Hover Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </div>
                ))}
              </div>
            )}

            {/* NETWORKS TAB */}
            {activeTab === "networks" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 space-y-6">
                
                {/* Major Networks */}
                <div className="grid gap-4">
                  {NETWORKS.map(network => (
                    <div key={network.id} className="p-5 rounded-2xl bg-[#1E1E1E] border border-white/5 flex items-center justify-between group hover:border-white/10 transition-all">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center font-black text-lg text-black">
                            {network.logo}
                          </div>
                          <div>
                             <h3 className="font-bold text-white">{network.name}</h3>
                             <div className="flex items-center gap-3 mt-1">
                               <span className={cn(
                                 "text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1",
                                 network.status === "connected" ? "bg-green-500/10 text-green-400" : "bg-gray-500/10 text-gray-400"
                               )}>
                                 <div className={cn("w-1.5 h-1.5 rounded-full", network.status === "connected" ? "bg-green-500" : "bg-gray-400")} />
                                 {network.status === "connected" ? "Connected" : "Disconnected"}
                               </span>
                               {network.status === "connected" && (
                                 <span className="text-xs text-gray-500">{network.campaigns} Campaigns • {network.clicks} Clicks</span>
                               )}
                             </div>
                          </div>
                       </div>
                       <button className={cn(
                         "px-4 py-2 rounded-lg text-xs font-bold transition-colors border",
                         network.status === "connected" 
                           ? "bg-white/5 border-white/10 text-white hover:bg-white/10" 
                           : "bg-accent text-black border-accent hover:brightness-110"
                       )}>
                         {network.status === "connected" ? "Manage" : "Connect"}
                       </button>
                    </div>
                  ))}
                </div>

                {/* Custom Link Builder */}
                <div className="p-6 rounded-2xl bg-[#1E1E1E] border border-white/5">
                  <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                    <ExternalLink size={16} className="text-accent" /> 
                    Universal Link Builder
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500 uppercase">Product URL</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder="https://amazon.com/product..."
                          className="w-full bg-black/30 border border-white/10 rounded-xl pl-4 pr-4 py-3 text-sm text-white focus:outline-none focus:border-accent/50 transition-colors"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500 uppercase">Campaign Source</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder="e.g. Instagram Story"
                          className="w-full bg-black/30 border border-white/10 rounded-xl pl-4 pr-4 py-3 text-sm text-white focus:outline-none focus:border-accent/50 transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/5 flex justify-end">
                     <GradientButton className="px-6 py-2.5 text-xs">
                       Generate Trackable Link
                     </GradientButton>
                  </div>
                </div>

              </div>
            )}

            {/* REWARDS TAB */}
            {activeTab === "rewards" && (
              <div className="animate-in fade-in slide-in-from-bottom-4">
                 <div className="mb-6 p-6 rounded-2xl bg-gradient-to-br from-purple-900/40 to-blue-900/40 border border-white/10 relative overflow-hidden">
                    <div className="relative z-10 max-w-lg">
                       <h2 className="text-2xl font-display font-bold text-white mb-2">Creator Rewards Program</h2>
                       <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                         Redeem your hard-earned credits for exclusive software deals, travel experiences, and cash bonuses. You have <span className="text-white font-bold">{rewardCredits} credits</span> available.
                       </p>
                       <button className="px-5 py-2.5 bg-white text-black rounded-xl text-xs font-bold hover:bg-gray-200 transition-colors">
                         View History
                       </button>
                    </div>
                    <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-accent/10 to-transparent pointer-events-none" />
                    <Gem size={120} className="absolute -right-6 -bottom-12 text-white/5 rotate-12" />
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {REWARDS.map(reward => (
                    <div key={reward.id} className="p-5 rounded-2xl bg-[#1E1E1E] border border-white/5 relative overflow-hidden group cursor-pointer hover:border-accent/30 transition-all hover:-translate-y-1 hover:shadow-2xl">
                      <div className="flex justify-between items-start relative z-10 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-2xl border border-white/5 group-hover:bg-white/10 transition-colors">
                          {reward.icon}
                        </div>
                        <div className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-bold text-gray-400 uppercase">
                          {reward.type}
                        </div>
                      </div>
                      
                      <div className="relative z-10 mb-4 min-h-[60px]">
                        <h3 className="font-bold text-white text-base mb-1 group-hover:text-accent transition-colors">{reward.name}</h3>
                        <p className="text-xs text-green-400 font-bold bg-green-400/10 inline-block px-2 py-0.5 rounded">{reward.discount}</p>
                      </div>

                      <div className="pt-4 border-t border-white/5 flex justify-between items-center relative z-10">
                         <div className="flex items-center gap-1 text-white font-bold">
                           <Gem size={12} className="text-cyan-400" />
                           {reward.cost}
                         </div>
                         <button className="text-xs font-bold text-black bg-white px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-300">
                           Redeem
                         </button>
                      </div>
                      
                      {/* Glow effect */}
                      <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors" />
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </Layout>
  );
}
