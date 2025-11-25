import React, { useState } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { ArrowLeft, User, Mic, Link2, CheckCircle2, Play, Plus, Loader2, Video, Eye, ShieldCheck } from "lucide-react";
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
  const [isIrisVerified, setIsIrisVerified] = useState(false);
  const [isVerifyingIris, setIsVerifyingIris] = useState(false);

  const handleConnect = (service: "heygen" | "elevenlabs") => {
    if (service === "heygen") setIsConnectingHeyGen(true);
    else setIsConnectingEleven(true);

    setTimeout(() => {
      setConnectedServices(prev => ({ ...prev, [service]: true }));
      if (service === "heygen") setIsConnectingHeyGen(false);
      else setIsConnectingEleven(false);
    }, 1500);
  };

  const handleIrisVerification = () => {
    setIsVerifyingIris(true);
    setTimeout(() => {
      setIsVerifyingIris(false);
      setIsIrisVerified(true);
    }, 2000);
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
          
          {/* Iris ID Verification Card */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/30 relative overflow-hidden">
            <div className="flex justify-between items-center relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                  <Eye size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    Iris ID Verification
                    {isIrisVerified && <ShieldCheck size={14} className="text-green-400" />}
                  </h3>
                  <p className="text-xs text-gray-400">
                    {isIrisVerified 
                      ? "Identity verified. Secure cloning enabled." 
                      : "Verify identity to unlock voice cloning features."}
                  </p>
                </div>
              </div>
              
              {isIrisVerified ? (
                <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold flex items-center gap-1 border border-green-500/20">
                  <CheckCircle2 size={12} /> Verified
                </span>
              ) : (
                <button 
                  onClick={handleIrisVerification}
                  disabled={isVerifyingIris}
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors flex items-center gap-2"
                >
                  {isVerifyingIris ? (
                    <>
                      <Loader2 size={12} className="animate-spin" /> Scanning...
                    </>
                  ) : (
                    <>
                      <Eye size={12} /> Verify Now
                    </>
                  )}
                </button>
              )}
            </div>
            {/* Decorative background effect */}
            <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
          </div>

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
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-white">{avatar.name}</h3>
                          {isIrisVerified && <ShieldCheck size={12} className="text-blue-400" />}
                        </div>
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
                    {!isIrisVerified && (
                      <div className="p-4 mb-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-start gap-3">
                         <ShieldCheck size={20} className="text-yellow-500 shrink-0 mt-0.5" />
                         <div>
                           <h4 className="text-xs font-bold text-white">Verification Required</h4>
                           <p className="text-[10px] text-gray-400 mt-1">
                             To prevent misuse, you must verify your identity with Iris ID before cloning new voices.
                           </p>
                         </div>
                      </div>
                    )}

                    {VOICES.map(voice => (
                      <div key={voice.id} className="bg-[#1E1E1E] border border-white/5 rounded-xl p-4 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
                            <Mic size={18} />
                          </div>
                          <div>
                            <h3 className="text-sm font-bold text-white flex items-center gap-2">
                              {voice.name}
                              {isIrisVerified && voice.type === "Cloned" && <ShieldCheck size={12} className="text-blue-400" />}
                            </h3>
                            <p className="text-xs text-gray-500">{voice.type}</p>
                          </div>
                        </div>
                        <button className="p-2 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-colors">
                          <Play size={16} />
                        </button>
                      </div>
                    ))}
                    
                    <button 
                      disabled={!isIrisVerified}
                      className={cn(
                        "w-full py-4 rounded-xl border border-dashed flex items-center justify-center gap-2 transition-all",
                        isIrisVerified 
                          ? "border-white/10 text-gray-500 hover:text-white hover:border-white/20 hover:bg-white/5 cursor-pointer" 
                          : "border-white/5 text-gray-600 cursor-not-allowed opacity-50"
                      )}
                    >
                      <Plus size={18} />
                      <span className="text-sm font-medium">Clone New Voice {isIrisVerified ? "" : "(Requires Iris ID)"}</span>
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
