import React, { useState } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { ArrowLeft, User, Mic, Link2, CheckCircle2, Play, Plus, Loader2, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import { GradientButton } from "@/components/GradientButton";
import avatarImage from "@assets/generated_images/professional_ai_avatar_portrait.png";

const AVATARS = [
  { id: "hg_1", name: "Studio Felix", image: avatarImage, type: "Instant Avatar", status: "ready" },
  { id: "hg_2", name: "Casual Felix", image: "https://picsum.photos/seed/casual/200/200", type: "Photo Avatar", status: "processing" },
];

const VOICES = [
  { id: "el_1", name: "Felix (Professional)", type: "Cloned", status: "ready" },
  { id: "el_2", name: "Felix (Excited)", type: "Cloned", status: "ready" },
  { id: "el_pre_1", name: "Adam", type: "Premade", status: "ready" },
];

export default function AvatarStudio() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<"avatar" | "voice">("avatar");
  const [isConnectingHeyGen, setIsConnectingHeyGen] = useState(false);
  const [isConnectingEleven, setIsConnectingEleven] = useState(false);
  const [connectedServices, setConnectedServices] = useState({ heygen: true, elevenlabs: false });

  const handleConnect = (service: "heygen" | "elevenlabs") => {
    if (service === "heygen") setIsConnectingHeyGen(true);
    else setIsConnectingEleven(true);

    setTimeout(() => {
      setConnectedServices(prev => ({ ...prev, [service]: true }));
      if (service === "heygen") setIsConnectingHeyGen(false);
      else setIsConnectingEleven(false);
    }, 1500);
  };

  const handleCreateContent = (avatarId: string) => {
    setLocation("/create", {
      state: {
        prompt: "Hi, I'm Felix! Welcome to my new video created entirely with AI.",
        mode: "video",
        model: "HeyGen Avatar",
        style: "Studio"
      }
    });
  };

  return (
    <Layout hideTabs>
      <div className="min-h-screen bg-background pb-8">
        {/* Header */}
        <div className="flex items-center gap-4 p-4 pt-8 bg-background/80 backdrop-blur-md sticky top-0 z-20 border-b border-white/5">
          <button 
            onClick={() => setLocation("/create")}
            className="p-2 -ml-2 rounded-full hover:bg-white/10 text-white transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-xl font-display font-bold text-white flex items-center gap-2">
              Avatar Studio
              <User size={18} className="text-purple-400" />
            </h1>
            <p className="text-xs text-gray-400">Manage Digital Twins & Voices</p>
          </div>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Service Status Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className={cn(
              "p-4 rounded-xl border transition-all",
              connectedServices.heygen ? "bg-[#1E1E1E] border-purple-500/30" : "bg-[#1E1E1E] border-white/5"
            )}>
              <div className="flex justify-between items-start mb-2">
                <div className="w-8 h-8 bg-white rounded-lg p-1 flex items-center justify-center">
                   {/* HeyGen Logo Mock */}
                   <div className="w-4 h-4 bg-purple-600 rounded-full" />
                </div>
                {connectedServices.heygen ? (
                  <CheckCircle2 size={16} className="text-purple-500" />
                ) : (
                  <button onClick={() => handleConnect("heygen")} className="text-[10px] bg-white/10 px-2 py-1 rounded text-white">Connect</button>
                )}
              </div>
              <p className="text-xs font-bold text-white">HeyGen</p>
              <p className="text-[10px] text-gray-500">Video Avatars</p>
            </div>

            <div className={cn(
              "p-4 rounded-xl border transition-all",
              connectedServices.elevenlabs ? "bg-[#1E1E1E] border-orange-500/30" : "bg-[#1E1E1E] border-white/5"
            )}>
              <div className="flex justify-between items-start mb-2">
                <div className="w-8 h-8 bg-white rounded-lg p-1 flex items-center justify-center">
                   {/* ElevenLabs Logo Mock */}
                   <div className="text-[10px] font-black text-black">11</div>
                </div>
                {connectedServices.elevenlabs ? (
                  <CheckCircle2 size={16} className="text-orange-500" />
                ) : (
                  <button 
                    onClick={() => handleConnect("elevenlabs")} 
                    disabled={isConnectingEleven}
                    className="text-[10px] bg-white/10 px-2 py-1 rounded text-white"
                  >
                    {isConnectingEleven ? <Loader2 size={10} className="animate-spin" /> : "Connect"}
                  </button>
                )}
              </div>
              <p className="text-xs font-bold text-white">ElevenLabs</p>
              <p className="text-[10px] text-gray-500">Voice Cloning</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex p-1 bg-[#1E1E1E] rounded-xl border border-white/5">
            <button 
              onClick={() => setActiveTab("avatar")}
              className={cn("flex-1 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2", activeTab === "avatar" ? "bg-[#2A2A2A] text-white shadow-sm" : "text-gray-500 hover:text-gray-300")}
            >
              <Video size={16} />
              Avatars
            </button>
            <button 
              onClick={() => setActiveTab("voice")}
              className={cn("flex-1 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2", activeTab === "voice" ? "bg-[#2A2A2A] text-white shadow-sm" : "text-gray-500 hover:text-gray-300")}
            >
              <Mic size={16} />
              Voices
            </button>
          </div>

          {/* Content Area */}
          <div className="space-y-4">
            {activeTab === "avatar" && (
              <>
                {AVATARS.map(avatar => (
                  <div key={avatar.id} className="bg-[#1E1E1E] border border-white/5 rounded-xl p-3 flex gap-4 items-center group">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-black relative">
                      <img src={avatar.image} className="w-full h-full object-cover" alt={avatar.name} />
                      {avatar.status === "processing" && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <Loader2 size={16} className="animate-spin text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="text-sm font-bold text-white">{avatar.name}</h3>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-gray-400 border border-white/5">{avatar.type}</span>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">Ready for generation</p>
                      <button 
                        onClick={() => handleCreateContent(avatar.id)}
                        className="text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1"
                      >
                        <Play size={12} fill="currentColor" /> Create Video
                      </button>
                    </div>
                  </div>
                ))}
                
                <button className="w-full py-4 rounded-xl border border-dashed border-white/10 flex items-center justify-center gap-2 text-gray-500 hover:text-white hover:border-white/20 transition-all hover:bg-white/5">
                  <Plus size={18} />
                  <span className="text-sm font-medium">Create Instant Avatar</span>
                </button>
              </>
            )}

            {activeTab === "voice" && (
              <>
                {!connectedServices.elevenlabs && (
                  <div className="p-6 text-center border border-dashed border-white/10 rounded-xl">
                    <p className="text-sm text-gray-400 mb-4">Connect ElevenLabs to access voice cloning.</p>
                    <button 
                      onClick={() => handleConnect("elevenlabs")} 
                      className="px-4 py-2 bg-white text-black rounded-lg text-xs font-bold"
                    >
                      Connect Now
                    </button>
                  </div>
                )}

                {connectedServices.elevenlabs && (
                  <>
                    {VOICES.map(voice => (
                      <div key={voice.id} className="bg-[#1E1E1E] border border-white/5 rounded-xl p-4 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
                            <Mic size={18} />
                          </div>
                          <div>
                            <h3 className="text-sm font-bold text-white">{voice.name}</h3>
                            <p className="text-xs text-gray-500">{voice.type}</p>
                          </div>
                        </div>
                        <button className="p-2 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-colors">
                          <Play size={16} />
                        </button>
                      </div>
                    ))}
                    
                    <button className="w-full py-4 rounded-xl border border-dashed border-white/10 flex items-center justify-center gap-2 text-gray-500 hover:text-white hover:border-white/20 transition-all hover:bg-white/5">
                      <Plus size={18} />
                      <span className="text-sm font-medium">Clone New Voice</span>
                    </button>
                  </>
                )}
              </>
            )}
          </div>

        </div>
      </div>
    </Layout>
  );
}
