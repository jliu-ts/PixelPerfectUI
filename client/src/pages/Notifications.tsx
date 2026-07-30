import React, { useState } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { 
  ArrowLeft, 
  Bell, 
  Heart, 
  UserPlus, 
  DollarSign, 
  CheckCircle2, 
  MessageSquare, 
  Zap, 
  ShoppingBag, 
  Settings,
  Filter,
  Trash2,
  Clock,
  ShieldAlert,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

// Enhanced Mock Data
const NOTIFICATIONS = [
  {
    id: 1,
    type: "collab",
    category: "mentions",
    title: "Collab Invite",
    message: "Sarah (Editor) invited you to 'Cyber Sneakers Launch'",
    time: "2m ago",
    read: false,
    icon: UserPlus,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    actions: [
      { label: "Accept", primary: true },
      { label: "Decline", primary: false }
    ]
  },
  {
    id: 2,
    type: "sale",
    category: "shop",
    title: "Asset Sold",
    message: "Someone purchased your 'Cyberpunk Pack'",
    time: "1h ago",
    read: false,
    icon: DollarSign,
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    value: "+50 Credits"
  },
  {
    id: 3,
    type: "system",
    category: "system",
    title: "Generation Complete",
    message: "Your video 'Neon City Flyover' is ready for review",
    time: "3h ago",
    read: true,
    icon: Zap,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    image: "https://picsum.photos/seed/neon/100/100",
    link: "/result"
  },
  {
    id: 4,
    type: "social",
    category: "mentions",
    title: "New Follower",
    message: "@design_pro started following you",
    time: "5h ago",
    read: true,
    icon: Heart,
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20"
  },
  {
    id: 5,
    type: "comment",
    category: "mentions",
    title: "New Comment",
    message: "@alex_k commented: 'This tutorial is fire! 🔥'",
    time: "1d ago",
    read: true,
    icon: MessageSquare,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    image: "https://picsum.photos/seed/tutorial/100/100"
  },
  {
    id: 6,
    type: "security",
    category: "system",
    title: "Security Alert",
    message: "New login detected from San Francisco, CA",
    time: "2d ago",
    read: true,
    icon: ShieldAlert,
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20"
  }
];

const TABS = [
  { id: "all", label: "All" },
  { id: "mentions", label: "Mentions" },
  { id: "system", label: "System" },
  { id: "shop", label: "Shop" }
];

export default function Notifications() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const filteredNotifications = activeTab === "all" 
    ? notifications 
    : notifications.filter(n => n.category === activeTab);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Layout hideTabs>
      <div className="min-h-screen bg-background pb-8">
        
        {/* Sticky Header */}
        <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-white/5">
          <div className="flex items-center justify-between p-4 pt-8">
            <div className="flex items-center gap-4">
              <button aria-label="Go back" 
                onClick={() => setLocation("/")}
                className="p-2 -ml-2 rounded-full hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-xl font-bold text-foreground">Notifications</h1>
                {unreadCount > 0 && (
                  <span className="bg-accent text-black text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {unreadCount} New
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={markAllRead}
                className="text-xs font-bold text-gray-500 hover:text-accent transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5"
              >
                Mark all read
              </button>
              <button aria-label="Settings" className="p-2 rounded-full hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors">
                <Settings size={18} />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="px-4 pb-0 overflow-x-auto no-scrollbar flex gap-6 border-b border-white/5">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "text-xs font-bold pb-3 border-b-2 transition-all whitespace-nowrap px-1 relative top-[1px]",
                  activeTab === tab.id 
                    ? "text-white border-accent" 
                    : "text-gray-500 border-transparent hover:text-gray-300"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 max-w-3xl mx-auto space-y-4 min-h-[60vh]">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notif, idx) => (
              <div 
                key={notif.id} 
                className={cn(
                  "group relative p-4 rounded-2xl border transition-all animate-in fade-in slide-in-from-bottom-2 hover:bg-surface-2",
                  notif.read 
                    ? "bg-transparent border-white/5 opacity-70 hover:opacity-100" 
                    : "bg-card border-white/10 shadow-lg"
                )}
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="flex gap-4">
                  {/* Icon */}
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border",
                    notif.bg,
                    notif.border
                  )}>
                    <notif.icon size={18} className={notif.color} />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h2 className={cn("text-sm font-bold truncate pr-4", notif.read ? "text-gray-300" : "text-white")}>
                        {notif.title}
                      </h2>
                      <span className="text-[10px] text-gray-500 shrink-0 flex items-center gap-1">
                        <Clock size={10} /> {notif.time}
                      </span>
                    </div>
                    
                    <p className="text-xs text-gray-400 leading-relaxed mb-3">
                      {notif.message}
                    </p>
                    
                    {/* Action Buttons */}
                    {notif.actions && (
                      <div className="flex gap-2 mb-2">
                        {notif.actions.map((action, i) => (
                          <button 
                            key={i}
                            className={cn(
                              "px-4 py-1.5 rounded-lg text-xs font-bold transition-colors",
                              action.primary 
                                ? "bg-white text-black hover:bg-gray-200" 
                                : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                            )}
                          >
                            {action.label}
                          </button>
                        ))}
                      </div>
                    )}
                    
                    {/* Value Badge (for sales) */}
                    {notif.value && (
                      <div className="inline-block px-2 py-1 rounded bg-green-500/10 border border-green-500/20 text-[10px] font-bold text-green-400">
                        {notif.value}
                      </div>
                    )}

                    {/* Thumbnail Image */}
                    {notif.image && (
                       <div className="mt-3 flex items-center gap-3 p-2 rounded-lg bg-black/20 border border-white/5 hover:border-white/10 transition-colors cursor-pointer group/item">
                         <div className="w-10 h-10 rounded overflow-hidden shrink-0">
                           <img loading="lazy" decoding="async" src={notif.image} className="w-full h-full object-cover" alt="Thumbnail" />
                         </div>
                         <div className="flex-1 min-w-0">
                           <p className="text-[10px] font-bold text-gray-300 group-hover/item:text-white transition-colors">View Content</p>
                           <p className="text-[9px] text-gray-500">Tap to open details</p>
                         </div>
                         <ChevronRight size={14} className="text-gray-500" />
                       </div>
                    )}
                  </div>

                  {/* Unread Indicator */}
                  {!notif.read && (
                    <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_currentColor]" />
                  )}
                  
                  {/* Delete Action (Hover only on desktop, swipe on mobile ideally) */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNotification(notif.id);
                    }}
                    className="absolute top-4 right-4 p-1.5 rounded-lg bg-red-500/10 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/20"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-card flex items-center justify-center mb-4 border border-white/5">
                <Bell size={24} className="text-gray-600" />
              </div>
              <h2 className="text-sm font-bold text-white mb-1">All caught up!</h2>
              <p className="text-xs text-gray-500 max-w-[200px]">
                No new notifications in this category. Check back later for updates.
              </p>
            </div>
          )}
        </div>
        
        {filteredNotifications.length > 0 && (
          <div className="text-center py-8 border-t border-white/5 mt-4">
            <p className="text-[10px] text-gray-600 uppercase tracking-widest">End of List</p>
          </div>
        )}
      </div>
    </Layout>
  );
}