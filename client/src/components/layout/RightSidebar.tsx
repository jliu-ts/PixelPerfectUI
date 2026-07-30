import React from "react";
import { Link, useLocation } from "wouter";
import { 
  Search, 
  Zap, 
  Newspaper, 
  ChevronRight, 
  ChevronLeft, 
  Plus, 
  TrendingUp, 
  X, 
  PanelRightOpen,
  Sparkles,
  ExternalLink,
  Clock,
  Bookmark,
  Share2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MOCK_ARTICLES } from "@/lib/mockData";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function RightSidebar() {
  const [, setLocation] = useLocation();
  const [isRightSidebarOpen, setIsRightSidebarOpen] = React.useState(true);
  const [articlePage, setArticlePage] = React.useState(0);
  const [selectedArticle, setSelectedArticle] = React.useState<typeof MOCK_ARTICLES[0] | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");

  const ITEMS_PER_PAGE = 5;
  
  const filteredArticles = MOCK_ARTICLES.filter(article => 
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.source.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
  const displayedArticles = filteredArticles.slice(articlePage * ITEMS_PER_PAGE, (articlePage + 1) * ITEMS_PER_PAGE);

  return (
    <>
      {/* Toggle Button */}
      <div className={cn(
        "hidden lg:flex flex-col h-screen sticky top-0 border-l border-white/5 bg-[#0A0A0A] transition-all duration-300 ease-in-out relative",
        isRightSidebarOpen ? "w-[320px]" : "w-0 overflow-hidden border-l-0"
      )}>
         <button 
           onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
           className="absolute -left-3 top-6 bg-[#0A0A0A] border border-white/10 rounded-full p-1 text-gray-400 hover:text-white transition-colors z-50 hidden lg:flex items-center justify-center w-6 h-6 hover:border-white/30"
           style={{ left: isRightSidebarOpen ? '-12px' : '-36px' }} 
         >
           {isRightSidebarOpen ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
         </button>

         <div className={cn("flex flex-col h-full transition-opacity duration-200", isRightSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none")}>
           
           {/* Header */}
           <div className="p-4 border-b border-white/5 flex items-center justify-between">
             <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
               <TrendingUp size={14} className="text-accent" />
               Trend Watch
             </h3>
             <button className="p-1.5 hover:bg-white/5 rounded-lg text-gray-500 hover:text-white transition-colors">
               <Search size={14} />
             </button>
           </div>

           {/* Quick Actions Grid */}
           <div className="p-4 grid grid-cols-2 gap-2">
              <button 
                onClick={() => setLocation("/create")}
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-accent/30 transition-all text-left group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight size={10} className="text-gray-400" />
                </div>
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center mb-2 text-white shadow-lg group-hover:scale-110 transition-transform">
                  <Plus size={16} />
                </div>
                <span className="text-xs font-bold text-white block">New Post</span>
                <span className="text-[10px] text-gray-500">Create Content</span>
              </button>
              <button 
                onClick={() => setLocation("/research")}
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-cyan-400/30 transition-all text-left group relative overflow-hidden"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center mb-2 text-black shadow-lg group-hover:scale-110 transition-transform">
                  <Sparkles size={16} fill="currentColor" />
                </div>
                <span className="text-xs font-bold text-white block">AI Research</span>
                <span className="text-[10px] text-gray-500">Deep Dive</span>
              </button>
           </div>

           {/* Trending Feed */}
           <div className="flex-1 flex flex-col min-h-0 px-4 pb-4">
             <div className="flex items-center justify-between mb-3 mt-2">
               <h4 className="text-[10px] font-bold text-gray-500 uppercase">Latest Signals</h4>
               <button onClick={() => setLocation("/feeds")} className="text-[10px] text-accent hover:underline flex items-center gap-1">
                 View All <ChevronRight size={10} />
               </button>
             </div>
             
             <div className="space-y-3 overflow-y-auto no-scrollbar flex-1 pr-1 -mr-2">
               {displayedArticles.map((article) => (
                 <div 
                   key={article.id}
                   onClick={() => setSelectedArticle(article)}
                   className="group cursor-pointer"
                 >
                   <div className="flex gap-3 p-2 rounded-xl hover:bg-white/5 transition-all">
                     <div className="w-14 h-14 rounded-lg bg-gray-800 overflow-hidden flex-shrink-0 relative border border-white/5">
                       <img src={article.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                     </div>
                     <div className="flex-1 min-w-0 py-0.5">
                       <div className="flex items-center gap-1.5 mb-1">
                         <span className="text-[9px] font-bold text-blue-400 truncate max-w-[80px]">{article.category}</span>
                         <span className="text-[9px] text-gray-600">• {article.time}</span>
                       </div>
                       <h4 className="text-[11px] font-bold text-gray-200 leading-snug line-clamp-2 group-hover:text-white transition-colors">
                         {article.title}
                       </h4>
                     </div>
                   </div>
                 </div>
               ))}
             </div>

             {/* Compact Pagination */}
             <div className="flex items-center justify-between mt-2 pt-3 border-t border-white/5">
                <button 
                  onClick={() => setArticlePage(p => Math.max(0, p - 1))}
                  disabled={articlePage === 0}
                  className="p-1.5 rounded-md hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent text-gray-400 transition-colors"
                >
                  <ChevronLeft size={14} />
                </button>
                <div className="flex gap-1">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <div 
                      key={i} 
                      className={cn(
                        "w-1.5 h-1.5 rounded-full transition-all",
                        articlePage === i ? "bg-accent w-3" : "bg-white/20"
                      )} 
                    />
                  ))}
                </div>
                <button 
                  onClick={() => setArticlePage(p => Math.min(totalPages - 1, p + 1))}
                  disabled={articlePage === totalPages - 1}
                  className="p-1.5 rounded-md hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent text-gray-400 transition-colors"
                >
                  <ChevronRight size={14} />
                </button>
             </div>
           </div>
         </div>
      </div>

      {/* Collapsed Floating Button */}
      {!isRightSidebarOpen && (
         <button 
           onClick={() => setIsRightSidebarOpen(true)}
           className="hidden lg:flex absolute right-0 top-6 bg-[#0A0A0A] border border-white/10 border-r-0 rounded-l-md p-2 text-gray-400 hover:text-white transition-colors z-50 shadow-lg group"
         >
           <PanelRightOpen size={16} className="group-hover:scale-110 transition-transform" />
         </button>
      )}

      {/* Enhanced Article Modal */}
      <Dialog open={!!selectedArticle} onOpenChange={(open) => !open && setSelectedArticle(null)}>
        <DialogContent className="bg-[#1E1E1E] border-white/10 text-white max-w-2xl p-0 gap-0 overflow-hidden shadow-2xl">
           {selectedArticle && (
             <div className="flex flex-col max-h-[85vh]">
               {/* Sticky Modal Header with Image */}
               <div className="relative w-full h-48 flex-shrink-0">
                 <img src={selectedArticle.image} className="w-full h-full object-cover" alt={selectedArticle.title} />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1E] via-[#1E1E1E]/50 to-transparent" />
                 
                 <button 
                   onClick={() => setSelectedArticle(null)}
                   className="absolute top-4 right-4 p-2 rounded-full bg-black/40 backdrop-blur-md text-white/70 hover:text-white hover:bg-black/60 transition-colors border border-white/5"
                 >
                   <X size={16} />
                 </button>

                 <div className="absolute bottom-4 left-6 right-6">
                   <div className="flex items-center gap-2 mb-2">
                     <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500 text-white shadow-lg shadow-blue-500/20">
                       {selectedArticle.source}
                     </span>
                     <span className="text-[10px] text-gray-300 flex items-center gap-1 bg-black/30 px-2 py-0.5 rounded backdrop-blur-sm">
                       <Clock size={10} /> {selectedArticle.time}
                     </span>
                   </div>
                   <DialogTitle className="text-xl md:text-2xl font-display font-bold text-white leading-tight shadow-black drop-shadow-lg">
                     {selectedArticle.title}
                   </DialogTitle>
                 </div>
               </div>
               
               {/* Scrollable Content */}
               <div className="p-6 overflow-y-auto">
                 <div className="flex items-start gap-4 mb-6">
                   <div className="flex-1">
                     <p className="text-sm text-gray-300 leading-relaxed font-light">
                       {selectedArticle.summary}
                     </p>
                   </div>
                   <div className="flex flex-col gap-2">
                     <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors" title="Save">
                       <Bookmark size={16} />
                     </button>
                     <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors" title="Share">
                       <Share2 size={16} />
                     </button>
                   </div>
                 </div>

                 <div className="space-y-4 text-sm text-gray-400 leading-relaxed">
                   <p>
                     Published on {selectedArticle.source} under {selectedArticle.category}. The summary above is the top line; the full piece works through the numbers.
                   </p>
                   
                   <div className="p-4 rounded-xl bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/20 my-4">
                     <h4 className="text-xs font-bold text-purple-300 mb-2 flex items-center gap-2">
                       <Sparkles size={12} /> AI Insight
                     </h4>
                     <p className="text-xs text-gray-300 italic">
                       "Top 5% of tech discussion volume this week. Creators posting on this angle are averaging 3x their usual engagement."
                     </p>
                   </div>

                   <p>
                     Early movers get about a two-month window before the format saturates. After that it reads as a trend you joined late.
                   </p>
                 </div>
               </div>

               {/* Sticky Footer Actions */}
               <div className="p-4 border-t border-white/5 bg-[#1E1E1E] flex gap-3">
                 <button 
                   onClick={() => {
                      setLocation("/create");
                      setSelectedArticle(null);
                   }}
                   className="flex-1 py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-gray-200 transition-all flex items-center justify-center gap-2 shadow-lg shadow-white/5"
                 >
                   <Zap size={16} fill="currentColor" />
                   Remix with AI
                 </button>
                 <a
                   href={selectedArticle.url}
                   target="_blank"
                   rel="noreferrer"
                   className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-white/10 transition-colors flex items-center gap-2"
                 >
                   <ExternalLink size={16} />
                   Read Source
                 </a>
               </div>
             </div>
           )}
        </DialogContent>
      </Dialog>
    </>
  );
}

// Helper Component for ArrowRight (since it was missing in imports for the Quick Actions)
function ArrowRight({ size, className }: { size: number, className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}