import React from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { ArrowLeft, Bell, Heart, UserPlus, DollarSign, Star, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const NOTIFICATIONS = [
  {
    id: 1,
    type: "collab",
    title: "Collab Invite",
    message: "Sarah (Editor) invited you to 'Cyber Sneakers Launch'",
    time: "2m ago",
    read: false,
    icon: <UserPlus size={16} className="text-blue-400" />,
    bg: "bg-blue-500/10",
    action: "Join"
  },
  {
    id: 2,
    type: "sale",
    title: "Asset Sold",
    message: "Someone purchased your 'Cyberpunk Pack'",
    time: "1h ago",
    read: false,
    icon: <DollarSign size={16} className="text-green-400" />,
    bg: "bg-green-500/10",
    value: "+50 Credits"
  },
  {
    id: 3,
    type: "system",
    title: "Generation Complete",
    message: "Your video 'Neon City Flyover' is ready",
    time: "3h ago",
    read: true,
    icon: <CheckCircle2 size={16} className="text-purple-400" />,
    bg: "bg-purple-500/10",
    image: "https://picsum.photos/seed/neon/100/100"
  },
  {
    id: 4,
    type: "social",
    title: "New Follower",
    message: "@design_pro started following you",
    time: "5h ago",
    read: true,
    icon: <Heart size={16} className="text-pink-400" />,
    bg: "bg-pink-500/10"
  }
];

export default function Notifications() {
  const [, setLocation] = useLocation();

  return (
    <Layout hideTabs>
      <div className="min-h-screen bg-background pb-8">
        {/* Header */}
        <div className="flex items-center justify-between p-4 pt-8 bg-background/80 backdrop-blur-md sticky top-0 z-20 border-b border-white/5">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setLocation("/")}
              className="p-2 -ml-2 rounded-full hover:bg-white/10 text-white transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-xl font-display font-bold text-white">The Pulse</h1>
          </div>
          <button className="text-xs font-bold text-gray-500 hover:text-white transition-colors">
            Mark all read
          </button>
        </div>

        <div className="p-4 space-y-4">
          {NOTIFICATIONS.map(notif => (
            <div 
              key={notif.id} 
              className={cn(
                "p-4 rounded-xl border transition-all flex gap-4",
                notif.read ? "bg-transparent border-transparent opacity-70" : "bg-[#1E1E1E] border-white/10"
              )}
            >
              <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0", notif.bg)}>
                {notif.icon}
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-sm font-bold text-white">{notif.title}</h3>
                  <span className="text-[10px] text-gray-500">{notif.time}</span>
                </div>
                <p className="text-xs text-gray-400 mb-3">{notif.message}</p>
                
                {notif.action && (
                  <button className="px-4 py-1.5 rounded-lg bg-white text-black text-xs font-bold hover:bg-gray-200 transition-colors">
                    {notif.action}
                  </button>
                )}
                
                {notif.value && (
                  <span className="text-xs font-bold text-green-400">{notif.value}</span>
                )}

                {notif.image && (
                   <div className="w-24 h-14 rounded-lg overflow-hidden border border-white/10 mt-2">
                     <img src={notif.image} className="w-full h-full object-cover" />
                   </div>
                )}
              </div>
              
              {!notif.read && (
                <div className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0" />
              )}
            </div>
          ))}
          
          <div className="text-center py-8">
            <p className="text-xs text-gray-600">That's all for now.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
