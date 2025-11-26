import React from "react";
import { Link, useLocation } from "wouter";
import { Search, Bell, Plus, TrendingUp, Zap, Newspaper, ChevronRight, ChevronLeft, PanelRightOpen, X } from "lucide-react";
import { BottomTabs } from "./BottomTabs";
import { Sidebar } from "./Sidebar";
import { AppBreadcrumbs } from "./Breadcrumbs";
import { MOCK_ARTICLES } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface LayoutProps {
  children: React.ReactNode;
  hideTabs?: boolean;
}

export function Layout({ children, hideTabs = false }: LayoutProps) {
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
    <div className="min-h-screen w-full bg-background text-foreground flex justify-center md:justify-start overflow-hidden">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex relative h-screen overflow-hidden">
        <div className="flex-1 w-full h-full min-h-screen relative bg-background flex flex-col overflow-hidden">
          
          {/* Top Navigation Overlay (Mobile Only) */}
          {!hideTabs && (
            <nav className="md:hidden fixed top-0 w-full z-50 p-4 flex justify-between items-center pointer-events-none">
              <div className="pointer-events-auto flex items-center gap-2">
                 <div className="w-8 h-8 rounded-lg bg-gradient-accent flex items-center justify-center font-display font-bold text-black text-sm shadow-[0_0_15px_rgba(124,58,237,0.5)]">
                   TS
                 </div>
              </div>
              
              <div className="flex gap-4 pointer-events-auto">
                 <Link href="/search">
                   <div className="p-2 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors cursor-pointer">
                      <Search size={20} />
                   </div>
                 </Link>
                 <Link href="/notifications">
                   <div className="p-2 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors cursor-pointer relative">
                      <Bell size={20} />
                      <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-black" />
                   </div>
                 </Link>
              </div>
            </nav>
          )}

          <main className="flex-1 relative overflow-y-auto no-scrollbar pb-24 md:pb-0 h-full">
            <div className="hidden md:block pt-4">
              <AppBreadcrumbs />
            </div>
            {children}
          </main>
          {!hideTabs && <div className="md:hidden"><BottomTabs /></div>}
        </div>

        {/* Desktop Right Sidebar (Widgets) */}
        <div className={cn(
          "hidden lg:flex flex-col h-screen sticky top-0 border-l border-white/5 bg-[#0A0A0A] transition-all duration-300 ease-in-out relative",
          isRightSidebarOpen ? "w-80 p-6" : "w-0 p-0 overflow-hidden border-l-0"
        )}>
           {/* Toggle Button */}
           <button 
             onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
             className="absolute -left-3 top-6 bg-[#0A0A0A] border border-white/10 rounded-full p-1 text-gray-400 hover:text-white transition-colors z-50 hidden lg:flex"
             style={{ left: isRightSidebarOpen ? '-12px' : '-36px' }} 
           >
             {isRightSidebarOpen ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
           </button>

           <div className={cn("flex flex-col h-full transition-opacity duration-200", isRightSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none")}>
             {/* Quick Create Widget */}
             <div className="mb-8">
               <h3 className="text-xs font-bold text-gray-500 uppercase mb-4 tracking-wider flex items-center gap-2">
                 <Zap size={14} className="text-yellow-400" /> Quick Actions
               </h3>
               <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setLocation("/create")}
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-accent/30 transition-all text-left group"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-accent flex items-center justify-center mb-2 text-black group-hover:scale-110 transition-transform">
                      <Plus size={16} />
                    </div>
                    <span className="text-xs font-bold text-white block">New Post</span>
                  </button>
                  <button 
                    onClick={() => setLocation("/podcast/studio")}
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-orange-400/30 transition-all text-left group"
                  >
                    <div className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center mb-2 text-black group-hover:scale-110 transition-transform">
                      <TrendingUp size={16} />
                    </div>
                    <span className="text-xs font-bold text-white block">Analysis</span>
                  </button>
               </div>
             </div>

             {/* Trending Articles Widget */}
             <div className="mb-8 flex-1 flex flex-col min-h-0">
               <div className="flex items-center justify-between mb-4">
                 <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                   <Newspaper size={14} className="text-blue-400" /> Trending News
                 </h3>
                 <button onClick={() => setLocation("/feeds")} className="text-[10px] text-accent hover:underline">View All</button>
               </div>

               {/* Search Bar */}
               <div className="relative mb-4">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
                 <input 
                   type="text" 
                   placeholder="Search topics..." 
                   value={searchQuery}
                   onChange={(e) => {
                     setSearchQuery(e.target.value);
                     setArticlePage(0); // Reset to first page on search
                   }}
                   className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-accent/50 transition-colors"
                 />
               </div>
               
               <div className="space-y-3 overflow-y-auto no-scrollbar flex-1 pr-1">
                 {displayedArticles.map((article) => (
                   <button 
                     key={article.id}
                     onClick={() => setSelectedArticle(article)}
                     className="w-full flex gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/10 transition-all group text-left"
                   >
                     <div className="w-16 h-16 rounded-lg bg-gray-800 overflow-hidden flex-shrink-0">
                       <img src={article.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                     </div>
                     <div className="flex-1 min-w-0">
                       <span className="text-[9px] font-bold text-blue-400 mb-1 block">{article.source}</span>
                       <h4 className="text-xs font-bold text-white leading-snug line-clamp-2 mb-1 group-hover:text-accent transition-colors">
                         {article.title}
                       </h4>
                       <span className="text-[10px] text-gray-500">{article.time}</span>
                     </div>
                   </button>
                 ))}
               </div>

               {/* Pagination Controls */}
               <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                  <button 
                    onClick={() => setArticlePage(p => Math.max(0, p - 1))}
                    disabled={articlePage === 0}
                    className="p-2 rounded-lg hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent text-white transition-colors"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <span className="text-[10px] text-gray-500 font-medium">
                    Page {articlePage + 1} of {totalPages}
                  </span>
                  <button 
                    onClick={() => setArticlePage(p => Math.min(totalPages - 1, p + 1))}
                    disabled={articlePage === totalPages - 1}
                    className="p-2 rounded-lg hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent text-white transition-colors"
                  >
                    <ChevronRight size={14} />
                  </button>
               </div>
             </div>
           </div>
        </div>
        
        {/* Floating Toggle Button when collapsed (so users can open it back up) */}
        {!isRightSidebarOpen && (
           <button 
             onClick={() => setIsRightSidebarOpen(true)}
             className="hidden lg:flex absolute right-0 top-6 bg-[#0A0A0A] border border-white/10 border-r-0 rounded-l-md p-2 text-gray-400 hover:text-white transition-colors z-50 shadow-lg"
           >
             <PanelRightOpen size={16} />
           </button>
        )}

      </div>

      {/* Article Modal */}
      <Dialog open={!!selectedArticle} onOpenChange={(open) => !open && setSelectedArticle(null)}>
        <DialogContent className="bg-[#1E1E1E] border-white/10 text-white max-w-2xl max-h-[85vh] overflow-y-auto p-0 gap-0">
           {selectedArticle && (
             <>
               <div className="relative h-64 w-full">
                 <img src={selectedArticle.image} className="w-full h-full object-cover" alt={selectedArticle.title} />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1E] via-transparent to-transparent" />
                 <button 
                   onClick={() => setSelectedArticle(null)}
                   className="absolute top-4 right-4 p-2 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-black/70 transition-colors"
                 >
                   <X size={16} />
                 </button>
               </div>
               
               <div className="p-6">
                 <div className="flex items-center gap-2 mb-4">
                   <span className="px-2 py-1 rounded-md bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-wider border border-blue-500/20">
                     {selectedArticle.source}
                   </span>
                   <span className="text-xs text-gray-500">{selectedArticle.time}</span>
                 </div>
                 
                 <DialogHeader>
                   <DialogTitle className="text-2xl font-display font-bold text-white mb-2 leading-tight">
                     {selectedArticle.title}
                   </DialogTitle>
                 </DialogHeader>
                 
                 <div className="space-y-4 mt-4 text-gray-300 leading-relaxed text-sm">
                   <p>{selectedArticle.summary}</p>
                   <p>
                     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                   </p>
                   <p>
                     Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                   </p>
                   <div className="p-4 rounded-xl bg-black/30 border border-white/5 my-6">
                     <h4 className="text-xs font-bold text-white mb-2 uppercase tracking-wider">AI Analysis</h4>
                     <p className="text-xs text-gray-400 italic">
                       "This trend suggests a significant shift in creator monetization strategies, moving away from traditional ad revenue towards direct community support and digital goods."
                     </p>
                   </div>
                   <p>
                     Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                   </p>
                 </div>

                 <div className="flex gap-3 mt-8 pt-6 border-t border-white/5">
                   <button 
                     onClick={() => {
                        setLocation("/create");
                        // In a real app, we'd pass the article as context
                     }}
                     className="flex-1 py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                   >
                     <Zap size={16} />
                     Remix with AI
                   </button>
                   <button className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-white/10 transition-colors">
                     Save
                   </button>
                 </div>
               </div>
             </>
           )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
