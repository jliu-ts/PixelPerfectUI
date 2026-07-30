import React, { useState } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { 
  ArrowLeft, 
  User, 
  Mic, 
  Link2, 
  CheckCircle2, 
  Play, 
  Plus, 
  Loader2, 
  Video, 
  Eye, 
  ShieldCheck, 
  Sparkles, 
  Languages, 
  Globe,
  ScanFace,
  Fingerprint,
  MoreHorizontal,
  Settings,
  Wand2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import avatarImage from "@assets/generated_images/candid_avatar_portrait.png";
import heyGenLogo from "@assets/brand_logos/heygen-icon.png";
import elevenLabsLogo from "@assets/brand_logos/elevenlabs-icon.png";

// Enhanced Mock Data
const AVATARS = [
  { 
    id: "hg_1", 
    name: "Studio Felix", 
    image: avatarImage, 
    type: "Instant Avatar", 
    status: "ready", 
    capabilities: ["4K Video", "Gestures"],
    lastUsed: "2h ago"
  },
  { 
    id: "hg_2", 
    name: "Casual Felix", 
    image: "https://picsum.photos/seed/casual/200/200", 
    type: "Photo Avatar", 
    status: "processing", 
    capabilities: ["Talking Photo"],
    lastUsed: "Never" 
  },
];

const VOICES = [
  { id: "el_1", name: "Felix (Professional)", type: "Cloned", status: "ready", model: "Eleven Multilingual v2", accent: "American" },
  { id: "el_2", name: "Felix (Excited)", type: "Cloned", status: "ready", model: "Eleven Turbo v2.5", accent: "American" },
  { id: "el_pre_1", name: "Adam", type: "Premade", status: "ready", model: "Standard", accent: "British" },
];

export default function AvatarStudio() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
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
      toast({
        title: "Service Connected",
        description: `${service === 'heygen' ? 'HeyGen' : 'ElevenLabs'} integration active.`,
      });
    }, 1500);
  };

  const handleIrisVerification = () => {
    setIsVerifyingIris(true);
    setTimeout(() => {
      setIsVerifyingIris(false);
      setIsIrisVerified(true);
      toast({
        title: "Identity Verified",
        description: "Iris ID confirmed. Secure cloning features unlocked.",
      });
    }, 2000);
  };

  const handleCreateContent = (avatarId: string, model: string = "HeyGen Avatar") => {
    setLocation("/create", {
      state: {
        prompt: "Hi, I'm Felix! Welcome to my new video created entirely with AI.",
        mode: "video",
        model: model,
        style: "Studio"
      }
    });
  };

  return (
    <Layout hideTabs>
      <div className="min-h-screen bg-background pb-24 md:pb-8">
        
        {/* Sticky Header */}
        <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-white/5">
          <div className="px-6 pt-6 pb-6 max-w-5xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setLocation("/create")}
                className="p-2 -ml-2 rounded-full hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
                  Avatars
                  <User size={18} className="text-purple-400" />
                </h1>
                <p className="text-xs text-gray-400">Manage your Digital Twins & Voice Clones</p>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="flex gap-2">
              {isIrisVerified && (
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-[10px] font-bold text-green-400">
                  <ScanFace size={12} /> ID Verified
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-8">
          
          {/* Hero: Iris ID Verification (Conditional) */}
          <div className="relative overflow-hidden rounded-3xl border border-blue-500/20 p-1">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-purple-900/10" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />
            
            <div className="bg-[#121212]/80 backdrop-blur-sm rounded-[20px] p-6 md:p-8 relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-5">
                <div className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center border shadow-[0_0_20px_rgba(59,130,246,0.2)] shrink-0 relative",
                  isIrisVerified ? "bg-green-500/10 border-green-500/30 text-green-400" : "bg-blue-500/10 border-blue-500/30 text-blue-400"
                )}>
                  {isIrisVerified ? <ShieldCheck size={32} /> : <ScanFace size={32} />}
                  {isVerifyingIris && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-2xl backdrop-blur-[1px]">
                      <Loader2 size={20} className="animate-spin text-white" />
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                    Iris ID Verification
                    {isIrisVerified && <CheckCircle2 size={16} className="text-green-400" />}
                  </h2>
                  <p className="text-sm text-gray-400 max-w-lg leading-relaxed">
                    {isIrisVerified 
                      ? "Your biometric identity is confirmed. You have full access to create and use deepfake clones securely." 
                      : "Verify your identity to unlock advanced voice cloning and instant avatar creation features. This ensures ethical AI usage."}
                  </p>
                </div>
              </div>

              {!isIrisVerified && (
                <button 
                  onClick={handleIrisVerification}
                  disabled={isVerifyingIris}
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold transition-all shadow-lg shadow-blue-900/20 flex items-center gap-2 whitespace-nowrap"
                >
                  {isVerifyingIris ? "Scanning Biometrics..." : "Verify Identity Now"}
                  {!isVerifyingIris && <ArrowLeft className="rotate-180" size={16} />}
                </button>
              )}
            </div>
          </div>

          {/* Integrations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* HeyGen Card */}
            <div className={cn(
              "p-5 rounded-2xl border transition-all relative overflow-hidden group",
              connectedServices.heygen ? "bg-[#1A1A1A] border-purple-500/20" : "bg-[#121212] border-white/5"
            )}>
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl p-1.5 flex items-center justify-center shadow-lg">
                     <img src={heyGenLogo} alt="HeyGen" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">HeyGen</h3>
                    <p className="text-[10px] text-gray-500">Video Avatars</p>
                  </div>
                </div>
                {connectedServices.heygen ? (
                  <span className="px-2 py-1 rounded bg-purple-500/10 border border-purple-500/20 text-[10px] font-bold text-purple-400 flex items-center gap-1">
                    <CheckCircle2 size={10} /> Active
                  </span>
                ) : (
                  <button onClick={() => handleConnect("heygen")} className="text-xs font-bold bg-white text-black px-3 py-1.5 rounded-lg hover:bg-gray-200 transition-colors">
                    Connect
                  </button>
                )}
              </div>
              
              {connectedServices.heygen && (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <span className="text-[10px] px-2 py-1 rounded bg-white/5 border border-white/5 text-gray-400">Instant Avatar</span>
                    <span className="text-[10px] px-2 py-1 rounded bg-white/5 border border-white/5 text-gray-400">Photo Avatar</span>
                  </div>
                </div>
              )}
            </div>

            {/* ElevenLabs Card */}
            <div className={cn(
              "p-5 rounded-2xl border transition-all relative overflow-hidden group",
              connectedServices.elevenlabs ? "bg-[#1A1A1A] border-orange-500/20" : "bg-[#121212] border-white/5"
            )}>
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl p-1.5 flex items-center justify-center shadow-lg">
                     <img src={elevenLabsLogo} alt="ElevenLabs" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">ElevenLabs</h3>
                    <p className="text-[10px] text-gray-500">Voice Cloning</p>
                  </div>
                </div>
                {connectedServices.elevenlabs ? (
                  <span className="px-2 py-1 rounded bg-orange-500/10 border border-orange-500/20 text-[10px] font-bold text-orange-400 flex items-center gap-1">
                    <CheckCircle2 size={10} /> Active
                  </span>
                ) : (
                  <button 
                    onClick={() => handleConnect("elevenlabs")} 
                    disabled={isConnectingEleven}
                    className="text-xs font-bold bg-white text-black px-3 py-1.5 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                  >
                    {isConnectingEleven && <Loader2 size={12} className="animate-spin" />}
                    {isConnectingEleven ? "Connecting..." : "Connect"}
                  </button>
                )}
              </div>
              
              {connectedServices.elevenlabs && (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <span className="text-[10px] px-2 py-1 rounded bg-white/5 border border-white/5 text-gray-400">Voice Design</span>
                    <span className="text-[10px] px-2 py-1 rounded bg-white/5 border border-white/5 text-gray-400">Multilingual v2</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Content Tabs */}
          <div>
            <div className="flex p-1 bg-[#121212] rounded-xl border border-white/10 mb-6 w-full md:w-fit">
              <button 
                onClick={() => setActiveTab("avatar")}
                className={cn(
                  "flex-1 md:flex-none px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2", 
                  activeTab === "avatar" ? "bg-[#2A2A2A] text-white shadow-sm" : "text-gray-500 hover:text-gray-300"
                )}
              >
                <Video size={16} className={activeTab === "avatar" ? "text-purple-400" : ""} />
                Avatars
              </button>
              <button 
                onClick={() => setActiveTab("voice")}
                className={cn(
                  "flex-1 md:flex-none px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2", 
                  activeTab === "voice" ? "bg-[#2A2A2A] text-white shadow-sm" : "text-gray-500 hover:text-gray-300"
                )}
              >
                <Mic size={16} className={activeTab === "voice" ? "text-orange-400" : ""} />
                Voices
              </button>
            </div>

            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {activeTab === "avatar" && (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      My Avatars <span className="text-xs font-normal text-gray-500">({AVATARS.length})</span>
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Create New Card */}
                    <button className="aspect-[4/3] rounded-2xl border-2 border-dashed border-white/10 hover:border-purple-500/30 hover:bg-purple-500/5 transition-all flex flex-col items-center justify-center gap-3 group">
                      <div className="w-12 h-12 rounded-full bg-white/5 group-hover:bg-purple-500/20 flex items-center justify-center transition-colors">
                        <Plus size={24} className="text-gray-500 group-hover:text-purple-400" />
                      </div>
                      <span className="text-xs font-bold text-gray-500 group-hover:text-purple-400">Create New Avatar</span>
                    </button>

                    {AVATARS.map(avatar => (
                      <div key={avatar.id} className="group bg-[#121212] border border-white/5 rounded-2xl overflow-hidden hover:border-purple-500/30 transition-all hover:shadow-lg relative">
                        <div className="absolute top-3 right-3 z-10">
                           <button className="p-1.5 rounded-full bg-black/40 backdrop-blur hover:bg-black/60 text-white/80 hover:text-white transition-colors">
                             <MoreHorizontal size={16} />
                           </button>
                        </div>

                        <div className="aspect-video bg-black relative overflow-hidden">
                          <img src={avatar.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={avatar.name} />
                          {avatar.status === "processing" && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center flex-col gap-2">
                              <Loader2 size={24} className="animate-spin text-purple-400" />
                              <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">Processing</span>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                          
                          <div className="absolute bottom-3 left-3">
                            <div className="flex items-center gap-1.5 mb-1">
                              {avatar.status === "ready" ? (
                                <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
                              ) : (
                                <span className="w-2 h-2 rounded-full bg-yellow-500" />
                              )}
                              <span className="text-[10px] font-bold text-white uppercase tracking-wider">{avatar.status}</span>
                            </div>
                            <h3 className="text-base font-bold text-white">{avatar.name}</h3>
                          </div>
                        </div>
                        
                        <div className="p-4">
                          <div className="flex gap-2 mb-4">
                            {avatar.capabilities?.map((cap, i) => (
                              <span key={i} className="text-[10px] px-2 py-1 bg-white/5 text-gray-400 rounded-md border border-white/5">
                                {cap}
                              </span>
                            ))}
                          </div>

                          <button 
                            onClick={() => handleCreateContent(avatar.id, "HeyGen Avatar")}
                            disabled={avatar.status !== "ready"}
                            className="w-full py-2.5 rounded-xl bg-white text-black text-xs font-bold hover:bg-purple-400 hover:text-white hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Play size={14} fill="currentColor" /> Create Video
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {activeTab === "voice" && (
                <>
                  {!connectedServices.elevenlabs ? (
                    <div className="py-16 flex flex-col items-center justify-center text-center border border-dashed border-white/10 rounded-2xl bg-[#121212]">
                      <div className="w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center mb-4 border border-orange-500/20">
                         <Mic size={32} className="text-orange-500" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">Unlock Voice Cloning</h3>
                      <p className="text-sm text-gray-400 mb-6 max-w-sm mx-auto leading-relaxed">
                        Connect your ElevenLabs account to clone your voice and generate lifelike speech in 29 languages.
                      </p>
                      <button 
                        onClick={() => handleConnect("elevenlabs")} 
                        className="px-6 py-2.5 bg-white text-black rounded-xl text-sm font-bold hover:bg-gray-200 transition-all shadow-lg"
                      >
                        Connect ElevenLabs
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4">
                      {/* Create Voice Button */}
                      <button 
                        disabled={!isIrisVerified}
                        className={cn(
                          "w-full p-4 rounded-2xl border border-dashed flex items-center justify-center gap-3 transition-all group",
                          isIrisVerified 
                            ? "border-white/10 hover:border-orange-500/50 hover:bg-orange-500/5 cursor-pointer" 
                            : "border-white/5 bg-[#121212] cursor-not-allowed opacity-60"
                        )}
                      >
                        <div className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                          isIrisVerified ? "bg-white/5 group-hover:bg-orange-500/20 text-gray-400 group-hover:text-orange-500" : "bg-white/5 text-gray-600"
                        )}>
                           <Plus size={20} />
                        </div>
                        <div className="text-left">
                           <span className={cn("block text-sm font-bold", isIrisVerified ? "text-white" : "text-gray-500")}>Clone New Voice</span>
                           {!isIrisVerified && <span className="block text-[10px] text-red-400 flex items-center gap-1"><ScanFace size={10} /> Requires Iris Verification</span>}
                        </div>
                      </button>

                      {VOICES.map(voice => (
                        <div key={voice.id} className="bg-[#121212] border border-white/5 rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-center gap-4 group hover:border-orange-500/30 transition-all">
                          <div className="flex items-center gap-4 w-full sm:w-auto">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center text-orange-400 border border-orange-500/20 shadow-[0_0_15px_rgba(249,115,22,0.1)]">
                              <Mic size={20} />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="text-sm font-bold text-white">{voice.name}</h3>
                                {voice.type === "Cloned" && isIrisVerified && <ShieldCheck size={14} className="text-green-400" />}
                              </div>
                              <div className="flex items-center gap-3 mt-1">
                                 <span className="text-[10px] text-gray-500 flex items-center gap-1"><Fingerprint size={10} /> {voice.type}</span>
                                 <span className="w-1 h-1 rounded-full bg-white/20" />
                                 <span className="text-[10px] text-gray-500 flex items-center gap-1"><Globe size={10} /> {voice.accent}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                             <div className="hidden sm:flex h-8 items-end gap-0.5 mr-4">
                               {/* Fake Audio Waveform Visual */}
                               {[...Array(12)].map((_, i) => (
                                 <div key={i} className="w-1 bg-orange-500/40 rounded-full" style={{ height: `${Math.random() * 16 + 8}px` }} />
                               ))}
                             </div>
                             
                             <button className="p-2.5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-colors border border-transparent hover:border-white/10" title="Play Sample">
                               <Play size={16} fill="currentColor" />
                             </button>
                             <button 
                               onClick={() => handleCreateContent(voice.id, "ElevenLabs Voice")}
                               className="px-4 py-2 bg-white text-black rounded-xl text-xs font-bold hover:bg-orange-400 hover:text-white transition-all flex items-center gap-2"
                             >
                               <Wand2 size={14} /> Use Voice
                             </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}