import React, { useState } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { ArrowLeft, User, Mic, Link2, CheckCircle2, Play, Plus, Loader2, Video, Eye, ShieldCheck, Sparkles, Languages, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { GradientButton } from "@/components/GradientButton";
import avatarImage from "@assets/generated_images/professional_ai_avatar_portrait.png";
import heyGenLogo from "@assets/stock_images/heygen_logo_icon_f9a51736.jpg";
import elevenLabsLogo from "@assets/stock_images/elevenlabs_logo_icon_080eebfa.jpg";

const AVATARS = [
  { id: "hg_1", name: "Studio Felix", image: avatarImage, type: "Instant Avatar", status: "ready", capabilities: ["4K Video", "Gestures"] },
  { id: "hg_2", name: "Casual Felix", image: "https://picsum.photos/seed/casual/200/200", type: "Photo Avatar", status: "processing", capabilities: ["Talking Photo"] },
];

const VOICES = [
  { id: "el_1", name: "Felix (Professional)", type: "Cloned", status: "ready", model: "Eleven Multilingual v2" },
  { id: "el_2", name: "Felix (Excited)", type: "Cloned", status: "ready", model: "Eleven Turbo v2.5" },
  { id: "el_pre_1", name: "Adam", type: "Premade", status: "ready", model: "Standard" },
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
              "p-4 rounded-xl border transition-all relative overflow-hidden",
              connectedServices.heygen ? "bg-[#1E1E1E] border-purple-500/30" : "bg-[#1E1E1E] border-white/5"
            )}>
              <div className="flex justify-between items-start mb-3 relative z-10">
                <div className="w-8 h-8 bg-white rounded-lg p-1 flex items-center justify-center overflow-hidden">
                   <img src={heyGenLogo} alt="HeyGen" className="w-full h-full object-contain" />
                </div>
                {connectedServices.heygen ? (
                  <div className="flex flex-col items-end">
                     <CheckCircle2 size={16} className="text-purple-500 mb-1" />
                     <span className="text-[9px] text-gray-500">API v2.0</span>
                  </div>
                ) : (
                  <button onClick={() => handleConnect("heygen")} className="text-[10px] bg-white/10 px-2 py-1 rounded text-white hover:bg-white/20">Connect</button>
                )}
              </div>
              <div className="relative z-10">
                <p className="text-xs font-bold text-white">HeyGen</p>
                <p className="text-[10px] text-gray-500 mb-2">Video Avatars</p>
                
                {connectedServices.heygen && (
                  <div className="flex gap-1 flex-wrap">
                     <span className="text-[8px] bg-purple-500/10 text-purple-300 px-1.5 py-0.5 rounded border border-purple-500/20">Instant Avatar</span>
                     <span className="text-[8px] bg-purple-500/10 text-purple-300 px-1.5 py-0.5 rounded border border-purple-500/20">Video Translate</span>
                  </div>
                )}
              </div>
            </div>

            <div className={cn(
              "p-4 rounded-xl border transition-all relative overflow-hidden",
              connectedServices.elevenlabs ? "bg-[#1E1E1E] border-orange-500/30" : "bg-[#1E1E1E] border-white/5"
            )}>
              <div className="flex justify-between items-start mb-3 relative z-10">
                <div className="w-8 h-8 bg-white rounded-lg p-1 flex items-center justify-center overflow-hidden">
                   <img src={elevenLabsLogo} alt="ElevenLabs" className="w-full h-full object-contain" />
                </div>
                {connectedServices.elevenlabs ? (
                  <div className="flex flex-col items-end">
                     <CheckCircle2 size={16} className="text-orange-500 mb-1" />
                     <span className="text-[9px] text-gray-500">Turbo v2.5</span>
                  </div>
                ) : (
                  <button 
                    onClick={() => handleConnect("elevenlabs")} 
                    disabled={isConnectingEleven}
                    className="text-[10px] bg-white/10 px-2 py-1 rounded text-white hover:bg-white/20"
                  >
                    {isConnectingEleven ? <Loader2 size={10} className="animate-spin" /> : "Connect"}
                  </button>
                )}
              </div>
              <div className="relative z-10">
                <p className="text-xs font-bold text-white">ElevenLabs</p>
                <p className="text-[10px] text-gray-500 mb-2">Voice Cloning</p>
                
                {connectedServices.elevenlabs && (
                  <div className="flex gap-1 flex-wrap">
                     <span className="text-[8px] bg-orange-500/10 text-orange-300 px-1.5 py-0.5 rounded border border-orange-500/20">Voice Design</span>
                     <span className="text-[8px] bg-orange-500/10 text-orange-300 px-1.5 py-0.5 rounded border border-orange-500/20">Multilingual</span>
                  </div>
                )}
              </div>
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
                <div className="flex items-center justify-between px-1">
                  <h3 className="text-xs font-bold text-gray-400 uppercase">Your Digital Twins</h3>
                  <span className="text-[10px] text-gray-500">Powered by HeyGen</span>
                </div>
                {AVATARS.map(avatar => (
                  <div key={avatar.id} className="bg-[#1E1E1E] border border-white/5 rounded-xl p-3 flex gap-4 items-center group hover:border-purple-500/30 transition-all">
                    <div className="w-20 h-24 rounded-lg overflow-hidden bg-black relative shrink-0">
                      <img src={avatar.image} className="w-full h-full object-cover" alt={avatar.name} />
                      {avatar.status === "processing" && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <Loader2 size={16} className="animate-spin text-white" />
                        </div>
                      )}
                      {avatar.status === "ready" && (
                        <div className="absolute bottom-1 right-1 bg-black/60 p-1 rounded-full">
                          <Video size={10} className="text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-bold text-white truncate">{avatar.name}</h3>
                            {isIrisVerified && <ShieldCheck size={12} className="text-blue-400 shrink-0" />}
                          </div>
                          <p className="text-[10px] text-gray-500 mb-2">{avatar.type}</p>
                        </div>
                        <span className={cn("text-[9px] px-1.5 py-0.5 rounded border capitalize", avatar.status === "ready" ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20")}>
                          {avatar.status}
                        </span>
                      </div>
                      
                      <div className="flex gap-1 mb-3 flex-wrap">
                        {avatar.capabilities?.map((cap, i) => (
                          <span key={i} className="text-[9px] px-1.5 py-0.5 bg-white/5 text-gray-400 rounded border border-white/5">
                            {cap}
                          </span>
                        ))}
                      </div>

                      <button 
                        onClick={() => handleCreateContent(avatar.id)}
                        disabled={avatar.status !== "ready"}
                        className="text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Play size={12} fill="currentColor" /> Create Video
                      </button>
                    </div>
                  </div>
                ))}
                
                <button className="w-full py-4 rounded-xl border border-dashed border-white/10 flex items-center justify-center gap-2 text-gray-500 hover:text-white hover:border-white/20 transition-all hover:bg-white/5">
                  <Plus size={18} />
                  <span className="text-sm font-medium">Create Instant Avatar (2 min video)</span>
                </button>
              </>
            )}

            {activeTab === "voice" && (
              <>
                {!connectedServices.elevenlabs && (
                  <div className="p-8 text-center border border-dashed border-white/10 rounded-xl bg-[#1E1E1E]/50">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                       <Mic size={24} className="text-gray-500" />
                    </div>
                    <h3 className="text-sm font-bold text-white mb-2">Unlock Voice Cloning</h3>
                    <p className="text-xs text-gray-400 mb-4 max-w-xs mx-auto leading-relaxed">
                      Connect your ElevenLabs account to clone your voice and generate lifelike speech in 29 languages.
                    </p>
                    <button 
                      onClick={() => handleConnect("elevenlabs")} 
                      className="px-6 py-2 bg-white text-black rounded-lg text-xs font-bold hover:bg-gray-200 transition-colors"
                    >
                      Connect ElevenLabs
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
                           <p className="text-[10px] text-gray-400 mt-1 leading-relaxed">
                             To prevent misuse, you must verify your identity with Iris ID before cloning new voices. This ensures ethical AI usage.
                           </p>
                         </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between px-1">
                      <h3 className="text-xs font-bold text-gray-400 uppercase">Your Voice Lab</h3>
                      <div className="flex items-center gap-2 text-[10px] text-gray-500">
                        <Globe size={10} /> 29 Languages
                      </div>
                    </div>

                    {VOICES.map(voice => (
                      <div key={voice.id} className="bg-[#1E1E1E] border border-white/5 rounded-xl p-4 flex justify-between items-center group hover:border-orange-500/30 transition-all">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 border border-orange-500/20">
                            <Mic size={18} />
                          </div>
                          <div>
                            <h3 className="text-sm font-bold text-white flex items-center gap-2">
                              {voice.name}
                              {isIrisVerified && voice.type === "Cloned" && <ShieldCheck size={12} className="text-blue-400" />}
                            </h3>
                            <div className="flex items-center gap-2">
                               <span className="text-[10px] text-gray-500">{voice.type}</span>
                               <span className="w-1 h-1 rounded-full bg-gray-600" />
                               <span className="text-[10px] text-gray-500">{voice.model}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                           <button className="p-2 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-colors" title="Use Voice">
                             <Sparkles size={16} />
                           </button>
                           <button className="p-2 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-colors" title="Play Sample">
                             <Play size={16} />
                           </button>
                        </div>
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
                      <div className="text-left">
                         <span className="block text-sm font-medium">Clone New Voice</span>
                         {!isIrisVerified && <span className="block text-[10px] opacity-70">Requires Iris ID Verification</span>}
                      </div>
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