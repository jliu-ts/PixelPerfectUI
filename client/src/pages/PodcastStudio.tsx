import React, { useState } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { GradientButton } from "@/components/GradientButton";
import { Mic, Play, Square, Music, Wand2, Type, Settings, Users, ArrowLeft, Upload, MoreVertical, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export default function PodcastStudio() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [script, setScript] = useState("Welcome to the Future Tech Podcast! Today we're discussing the rise of AI agents...");
  const [hostVoice, setHostVoice] = useState("Adam (Deep)");
  const [guestVoice, setGuestVoice] = useState("Sarah (Soft)");
  const [recordingTime, setRecordingTime] = useState(0);

  // Simulate recording timer
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      toast({ title: "Recording Started", description: "Microphone active" });
    } else {
      toast({ title: "Recording Saved", description: "Audio segment added to timeline" });
    }
  };

  const handleGenerate = () => {
    toast({
      title: "Generating Audio...",
      description: "Synthesizing voices with ElevenLabs...",
    });
    setTimeout(() => {
      toast({
        title: "Generation Complete",
        description: "Podcast ready for review",
      });
      setLocation("/podcast/publish");
    }, 2000);
  };

  return (
    <Layout hideTabs>
      <div className="flex flex-col h-screen bg-background">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/5 bg-background/80 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button aria-label="Go back" onClick={() => setLocation("/create")} className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors text-white">
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-xl font-display font-bold text-white">Podcast Studio</h1>
          </div>
          <div className="flex gap-2">
            <button aria-label="Settings" className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors">
              <Settings size={20} />
            </button>
            <GradientButton onClick={handleGenerate} className="px-4">
              Next: Publish
            </GradientButton>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-24">
          
          {/* Script Editor Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
               <h2 className="text-sm font-bold text-gray-400 uppercase flex items-center gap-2">
                 <Type size={14} /> Script & Voices
               </h2>
               <button className="text-xs text-accent flex items-center gap-1 hover:underline">
                 <Sparkles size={12} /> AI Auto-Write
               </button>
            </div>
            
            <div className="bg-card border border-white/10 rounded-xl p-4 space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-xs text-gray-500 mb-1 block">Host Voice</label>
                  <select 
                    value={hostVoice} 
                    onChange={(e) => setHostVoice(e.target.value)}
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-accent"
                  >
                    <option>Adam (Deep)</option>
                    <option>Bella (Energetic)</option>
                    <option>Charlie (News)</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="text-xs text-gray-500 mb-1 block">Guest Voice</label>
                  <select 
                    value={guestVoice} 
                    onChange={(e) => setGuestVoice(e.target.value)}
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-accent"
                  >
                    <option>Sarah (Soft)</option>
                    <option>Dave (Casual)</option>
                    <option>Emily (Professional)</option>
                  </select>
                </div>
              </div>

              <textarea 
                value={script}
                onChange={(e) => setScript(e.target.value)}
                className="w-full h-48 bg-black/20 rounded-lg p-4 text-white placeholder:text-gray-600 resize-none focus:outline-none focus:bg-black/30 transition-colors font-mono text-sm leading-relaxed"
                placeholder="Type your script here or use AI to generate..."
              />
            </div>
          </div>

          {/* Recording Section */}
          <div className="space-y-4">
             <h2 className="text-sm font-bold text-gray-400 uppercase flex items-center gap-2">
               <Mic size={14} /> Studio Recording
             </h2>
             
             <div className="bg-card border border-white/10 rounded-xl p-8 flex flex-col items-center justify-center gap-6 relative overflow-hidden">
               {isRecording && (
                 <div className="absolute inset-0 bg-red-500/5 animate-pulse pointer-events-none" />
               )}
               
               <div className="text-4xl font-mono font-bold text-white tracking-widest">
                 {formatTime(recordingTime)}
               </div>
               
               <div className="flex items-center gap-6">
                 <button aria-label="Music" className="p-4 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-gray-400 hover:text-white">
                   <Music size={24} />
                 </button>
                 
                 <button 
                   onClick={toggleRecording}
                   className={cn(
                     "w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-lg border-4",
                     isRecording 
                       ? "bg-red-500 border-red-900 hover:bg-red-600 shadow-red-500/20" 
                       : "bg-white border-gray-200 hover:bg-gray-200"
                   )}
                 >
                   {isRecording ? (
                     <Square size={32} className="fill-white text-white" />
                   ) : (
                     <div className="w-8 h-8 rounded-full bg-red-500" />
                   )}
                 </button>

                 <button aria-label="Enhance" className="p-4 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-gray-400 hover:text-white">
                   <Wand2 size={24} />
                 </button>
               </div>
               
               <p className="text-xs text-gray-500">
                 {isRecording ? "Recording in progress..." : "Tap to record intro/outro or voiceover"}
               </p>
             </div>
          </div>

          {/* Timeline Preview (Visual Only) */}
          <div className="h-24 bg-card rounded-xl border border-white/10 relative overflow-hidden flex items-center px-4">
            <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-white/10" />
            <div className="flex gap-1 w-full items-center justify-center opacity-40">
              {[...Array(40)].map((_, i) => (
                 <div key={i} className="w-1 bg-accent rounded-full" style={{ height: `${Math.random() * 40 + 10}px` }} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}
