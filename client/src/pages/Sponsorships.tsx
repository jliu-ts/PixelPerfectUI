import React, { useState } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { GradientButton } from "@/components/GradientButton";
import { 
  ArrowLeft,
  Inbox, 
  MessageSquare, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  MoreHorizontal, 
  Plus, 
  Search, 
  Filter,
  Sparkles,
  Send,
  Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BRAND_LOGOS } from "@/lib/constants/brandLogos";

// Mock Kanban Data
const COLUMNS = [
  { id: "inbox", label: "Inbound Requests", color: "#3B82F6", count: 3 },
  { id: "negotiation", label: "Negotiation", color: "#EAB308", count: 2 },
  { id: "active", label: "Active / Content", color: "#A855F7", count: 2 },
  { id: "completed", label: "Completed & Paid", color: "#22C55E", count: 12 },
];

const DEALS = [
  {
    id: 1,
    brand: "NordVPN",
    logo: BRAND_LOGOS.nordvpn,
    title: "Q4 Integration Campaign",
    value: "$3,500",
    status: "inbox",
    lastActivity: "2h ago",
    contact: "Sarah M.",
    nextStep: "Reply to offer"
  },
  {
    id: 2,
    brand: "Skillshare",
    logo: BRAND_LOGOS.skillshare,
    title: "Learning Month Series",
    value: "$2,800",
    status: "inbox",
    lastActivity: "1d ago",
    contact: "Mike T.",
    nextStep: "Review brief"
  },
  {
    id: 3,
    brand: "Squarespace",
    logo: BRAND_LOGOS.squarespace,
    title: "Website Builder Showcase",
    value: "$5,000",
    status: "negotiation",
    lastActivity: "4h ago",
    contact: "Jessica L.",
    nextStep: "Counter-offer sent"
  },
  {
    id: 4,
    brand: "Raycon",
    logo: BRAND_LOGOS.raycon,
    title: "Everyday Earbuds",
    value: "$1,200",
    status: "negotiation",
    lastActivity: "2d ago",
    contact: "Alex B.",
    nextStep: "Waiting for approval"
  },
  {
    id: 5,
    brand: "HelloFresh",
    logo: BRAND_LOGOS.hellofresh,
    title: "Healthy Eating Challenge",
    value: "$4,200",
    status: "active",
    lastActivity: "1w ago",
    contact: "Emily R.",
    nextStep: "Filming draft"
  },
  {
    id: 6,
    brand: "Epidemic Sound",
    logo: BRAND_LOGOS.epidemicsound,
    title: "Music for Creators",
    value: "$2,000",
    status: "active",
    lastActivity: "3d ago",
    contact: "Tom H.",
    nextStep: "Submit for review"
  }
];

export default function Sponsorships() {
  const [, setLocation] = useLocation();
  const [selectedDeal, setSelectedDeal] = useState<typeof DEALS[0] | null>(null);

  return (
    <Layout hideTabs>
      <div className="min-h-screen bg-background pb-20 flex flex-col h-screen overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-white/5 bg-[#121212] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <button aria-label="Go back" 
              onClick={() => setLocation("/")}
              className="p-2 -ml-2 rounded-full hover:bg-white/10 text-white transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-2xl font-display font-bold text-white flex items-center gap-2">
                Sponsorship Pipeline
              </h1>
              <p className="text-sm text-gray-400">Manage your brand deals and negotiations.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input aria-label="Search deals" 
                type="text" 
                placeholder="Search deals..." 
                className="bg-black/30 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500/50 w-64"
              />
            </div>
            <GradientButton className="flex items-center gap-2 px-4 py-2 text-xs">
              <Plus size={16} /> New Deal
            </GradientButton>
          </div>
        </div>

        {/* Kanban Board Area */}
        <div className="flex-1 overflow-x-auto p-6">
          <div className="flex gap-6 h-full min-w-[1000px]">
            
            {COLUMNS.map((col) => {
              const colDeals = DEALS.filter(d => d.status === col.id);
              
              return (
                <div key={col.id} className="flex-1 min-w-[300px] flex flex-col h-full">
                  {/* Column Header */}
                  <div className="flex items-center justify-between mb-4 px-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: col.color }} />
                      <h3 className="text-sm font-bold text-white uppercase tracking-wide">{col.label}</h3>
                      <span className="bg-white/10 text-gray-400 text-[10px] px-2 py-0.5 rounded-full font-bold">
                        {colDeals.length}
                      </span>
                    </div>
                    <button aria-label="More options" className="text-gray-500 hover:text-white">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>

                  {/* Deals List */}
                  <div className="flex-1 bg-[#161616] rounded-xl border border-white/5 p-2 space-y-3 overflow-y-auto">
                    {colDeals.map((deal) => (
                      <div 
                        key={deal.id}
                        onClick={() => setSelectedDeal(deal)}
                        className="p-4 rounded-lg bg-[#1E1E1E] border border-white/5 hover:border-white/20 cursor-pointer transition-all group shadow-sm hover:shadow-md relative overflow-hidden"
                      >
                        <div className="flex items-start justify-between mb-3 relative z-10">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-md bg-white p-1 flex items-center justify-center">
                              <img loading="lazy" decoding="async" src={deal.logo} alt={deal.brand} className="max-w-full max-h-full object-contain" />
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-white leading-tight">{deal.brand}</h4>
                              <p className="text-[10px] text-gray-400">{deal.lastActivity}</p>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">
                            {deal.value}
                          </span>
                        </div>
                        
                        <h5 className="text-xs font-medium text-gray-300 mb-3 line-clamp-1 relative z-10">
                          {deal.title}
                        </h5>

                        <div className="flex items-center justify-between pt-3 border-t border-white/5 relative z-10">
                          <div className="flex items-center gap-1 text-[10px] text-gray-500">
                             <Clock size={12} />
                             {deal.nextStep}
                          </div>
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-[10px] font-bold text-white">
                             {deal.contact.charAt(0)}
                          </div>
                        </div>

                        {/* Hover Highlight */}
                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: col.color }} />
                      </div>
                    ))}
                    
                    {/* Add Button placeholder */}
                    <button className="w-full py-3 rounded-lg border border-dashed border-white/10 text-gray-500 text-xs font-bold hover:bg-white/5 hover:text-gray-300 transition-colors flex items-center justify-center gap-2">
                      <Plus size={14} /> Add Deal
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Deal Detail Modal (Simulated) */}
        {selectedDeal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelectedDeal(null)}>
            <div className="bg-[#1E1E1E] w-full max-w-2xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]" onClick={e => e.stopPropagation()}>
              
              {/* Modal Header */}
              <div className="p-6 border-b border-white/5 flex justify-between items-start bg-[#161616]">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-white p-2 flex items-center justify-center shadow-lg">
                    <img loading="lazy" decoding="async" src={selectedDeal.logo} alt={selectedDeal.brand} className="max-w-full max-h-full object-contain" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{selectedDeal.title}</h2>
                    <p className="text-sm text-gray-400 flex items-center gap-2">
                      {selectedDeal.brand} • <span className="text-green-400 font-bold">{selectedDeal.value}</span>
                    </p>
                  </div>
                </div>
                <button aria-label="More options" onClick={() => setSelectedDeal(null)} className="p-2 hover:bg-white/10 rounded-full text-gray-400">
                  <MoreHorizontal size={20} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto flex-1 space-y-6">
                
                {/* AI Reply Generator */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-blue-500/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                      <Sparkles size={18} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">AI Assistant</h3>
                      <p className="text-xs text-gray-400">Suggested next step: Negotiation</p>
                    </div>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3 mb-3 border border-white/5">
                    <p className="text-xs text-gray-300 italic leading-relaxed">
                      "Hi {selectedDeal.contact}, thanks for the offer. Given my current engagement rates (5.2%) and recent viral performance, I typically charge $4,500 for this scope. However, I'd love to make this work..."
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 rounded-lg bg-blue-500 text-white text-xs font-bold hover:bg-blue-600 transition-colors flex items-center gap-2">
                      <Send size={12} /> Use Draft
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-white/5 text-gray-300 text-xs font-bold hover:bg-white/10 transition-colors">
                      Regenerate
                    </button>
                  </div>
                </div>

                {/* Thread */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-gray-500 uppercase">Email Thread</h3>
                  
                  <div className="flex gap-4">
                     <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold text-white shrink-0">
                        {selectedDeal.contact.charAt(0)}
                     </div>
                     <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-bold text-white">{selectedDeal.contact} <span className="text-gray-500 font-normal">from {selectedDeal.brand}</span></span>
                          <span className="text-xs text-gray-500">Yesterday</span>
                        </div>
                        <div className="text-sm text-gray-300 leading-relaxed bg-white/5 p-4 rounded-xl rounded-tl-none border border-white/5">
                          <p>Hi Felix, we'd love to move forward with the Q4 campaign. Our budget is currently capped at {selectedDeal.value}, but we can offer 3 months of whitelisting...</p>
                        </div>
                     </div>
                  </div>

                  <div className="flex gap-4 flex-row-reverse">
                     <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
                        Me
                     </div>
                     <div className="flex-1">
                        <div className="flex items-center justify-between mb-1 flex-row-reverse">
                          <span className="text-sm font-bold text-white">You</span>
                          <span className="text-xs text-gray-500">2 days ago</span>
                        </div>
                        <div className="text-sm text-gray-300 leading-relaxed bg-purple-500/10 p-4 rounded-xl rounded-tr-none border border-purple-500/20">
                          <p>Thanks for reaching out! I'm interested. Could you share more details about the creative deliverables required?</p>
                        </div>
                     </div>
                  </div>

                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-white/5 bg-[#161616] flex justify-between items-center">
                 <div className="flex items-center gap-2 text-xs text-gray-400">
                   <Calendar size={14} /> Due: Nov 30, 2025
                 </div>
                 <div className="flex gap-2">
                   <button className="px-4 py-2 rounded-lg bg-white/5 text-white text-xs font-bold hover:bg-white/10 transition-colors">
                     Mark Lost
                   </button>
                   <button className="px-6 py-2 rounded-lg bg-white text-black text-xs font-bold hover:bg-gray-200 transition-colors">
                     Move to Active
                   </button>
                 </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </Layout>
  );
}