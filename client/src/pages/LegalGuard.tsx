import React, { useState, useRef } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { GradientButton } from "@/components/GradientButton";
import { 
  ArrowLeft,
  Shield, 
  FileText, 
  UploadCloud, 
  AlertTriangle, 
  CheckCircle, 
  Info,
  Scale,
  Lock,
  Eye,
  Sparkles,
  FileSignature,
  ScrollText,
  ShieldAlert,
  Download,
  History,
  ChevronRight,
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { NOISE_TEXTURE } from "@/lib/constants/urls";

// Enhanced Mock Analysis Data
const MOCK_ANALYSIS = {
  score: 65,
  riskLevel: "High",
  summary: "This contract contains several high-risk clauses regarding intellectual property rights and payment terms. Proceed with caution.",
  clauses: [
    {
      id: 1,
      type: "risk",
      title: "Perpetual Usage Rights",
      text: "...granting the Brand worldwide, perpetual, irrevocable, royalty-free license to use, reproduce, modify...",
      explanation: "The brand owns your content forever without paying you extra. Standard terms usually limit usage to 6-12 months.",
      recommendation: "Negotiate for a 12-month term with renewal options."
    },
    {
      id: 2,
      type: "warning",
      title: "Exclusivity (Broad)",
      text: "...Creator agrees not to work with any 'competitors' in the lifestyle, tech, or beverage categories...",
      explanation: "The definition of 'competitor' is too broad and limits your ability to earn from other potential partners.",
      recommendation: "Define specific competitor list (max 3-5)."
    },
    {
      id: 3,
      type: "safe",
      title: "Payment Terms",
      text: "Payment shall be made within 30 days of invoice receipt (Net 30).",
      explanation: "Standard industry payment term. This is acceptable.",
      recommendation: null
    }
  ]
};

const RECENT_SCANS = [
  { id: 1, name: "Brand_Deal_Nike_v2.pdf", date: "2 days ago", status: "Safe", score: 92 },
  { id: 2, name: "Agency_Rep_Contract.docx", date: "1 week ago", status: "Risk", score: 45 },
];

export default function LegalGuard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<typeof MOCK_ANALYSIS | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      toast({
        title: "File Uploaded",
        description: "Ready to scan for legal risks.",
      });
    }
  };

  const startAnalysis = () => {
    if (!file) return;
    setIsAnalyzing(true);
    // Simulate AI processing time
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysis(MOCK_ANALYSIS);
      toast({
        title: "Analysis Complete",
        description: "We found some potential risks in your contract.",
      });
    }, 2000);
  };

  return (
    <Layout hideTabs>
      <div className="min-h-screen bg-background pb-20">
        
        {/* Sticky Header */}
        <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-white/5">
          <div className="px-6 pt-6 pb-6 max-w-5xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setLocation("/")}
                className="p-2 -ml-2 rounded-full hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
                  Legal Guard
                  <Scale size={18} className="text-blue-400" />
                </h1>
                <p className="text-xs text-gray-400">AI Contract Review & Protection</p>
              </div>
            </div>
            
            {analysis && (
              <button 
                onClick={() => { setAnalysis(null); setFile(null); }}
                className="text-xs font-bold text-gray-400 hover:text-white flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors"
              >
                <UploadCloud size={14} /> New Scan
              </button>
            )}
          </div>
        </div>

        <div className="p-6 max-w-5xl mx-auto space-y-8">
          
          {/* Hero / Upload Section */}
          {!analysis && (
            <div className="animate-in fade-in slide-in-from-bottom-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Main Upload Area */}
                <div className="md:col-span-2 space-y-6">
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className={cn(
                      "border-2 border-dashed rounded-3xl p-12 text-center transition-all cursor-pointer group relative overflow-hidden min-h-[400px] flex flex-col items-center justify-center",
                      file 
                        ? "border-green-500/50 bg-green-500/5" 
                        : "border-white/10 hover:border-blue-500/50 hover:bg-blue-500/5"
                    )}
                  >
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileUpload} 
                      className="hidden" 
                      accept=".pdf,.doc,.docx,.txt"
                    />
                    
                    <div className="relative z-10 flex flex-col items-center justify-center max-w-md mx-auto">
                      <div className={cn(
                        "w-24 h-24 rounded-3xl flex items-center justify-center mb-8 transition-all shadow-2xl group-hover:scale-110 duration-500",
                        file ? "bg-green-500 text-black" : "bg-[#1E1E1E] text-gray-400 group-hover:text-blue-400 border border-white/5"
                      )}>
                        {file ? <FileText size={48} /> : <UploadCloud size={48} />}
                      </div>
                      
                      {file ? (
                        <>
                          <h3 className="text-2xl font-display font-bold text-white mb-2">{file.name}</h3>
                          <p className="text-green-400 font-medium flex items-center gap-2 mb-8">
                            <CheckCircle2 size={16} /> File loaded successfully
                          </p>
                          <GradientButton 
                            onClick={(e) => { e.stopPropagation(); startAnalysis(); }}
                            disabled={isAnalyzing}
                            className="px-8 py-3 text-sm font-bold shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-[0_0_50px_rgba(59,130,246,0.5)] transition-all"
                          >
                            {isAnalyzing ? (
                              <span className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Analyzing Contract...
                              </span>
                            ) : (
                              <span className="flex items-center gap-2">
                                <Shield size={18} /> Start Risk Analysis
                              </span>
                            )}
                          </GradientButton>
                        </>
                      ) : (
                        <>
                          <h3 className="text-2xl font-display font-bold text-white mb-3">Drop your contract here</h3>
                          <p className="text-gray-400 leading-relaxed mb-8">
                            Upload PDF, DOCX, or TXT files. Our AI will analyze clauses, highlight risks, and suggest negotiation points in seconds.
                          </p>
                          <div className="flex gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                              <ShieldAlert size={12} /> Private & Secure
                            </span>
                            <span className="flex items-center gap-1 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                              <Sparkles size={12} /> AI-Powered
                            </span>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Background Animation */}
                    <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: `url("${NOISE_TEXTURE}")` }} />
                    {!file && (
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    )}
                  </div>
                </div>

                {/* Sidebar: Recent Scans & Tools */}
                <div className="space-y-6">
                  <div className="bg-[#121212] border border-white/5 rounded-3xl p-6 h-full">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                      <History size={14} /> Recent Scans
                    </h3>
                    <div className="space-y-4">
                      {RECENT_SCANS.map(scan => (
                        <div key={scan.id} className="group p-4 rounded-2xl bg-[#1E1E1E] border border-white/5 hover:border-white/10 transition-all cursor-pointer">
                          <div className="flex justify-between items-start mb-2">
                            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-white group-hover:bg-white/10 transition-colors">
                              <FileText size={16} />
                            </div>
                            <Badge className={cn(
                              "text-[10px] px-2 py-0.5 border-0",
                              scan.status === "Safe" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
                            )}>
                              {scan.score}/100
                            </Badge>
                          </div>
                          <h4 className="text-sm font-bold text-white truncate mb-1">{scan.name}</h4>
                          <div className="flex justify-between items-center text-[10px] text-gray-500">
                            <span>{scan.date}</span>
                            <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 pt-8 border-t border-white/5">
                       <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                          <Sparkles size={14} /> Quick Tools
                       </h3>
                       <div className="grid grid-cols-2 gap-2">
                          <button className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium text-gray-300 hover:text-white transition-colors text-left">
                             Contract Generator
                          </button>
                          <button className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium text-gray-300 hover:text-white transition-colors text-left">
                             NDA Creator
                          </button>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Analysis Results */}
          {analysis && (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
              
              {/* Score Card */}
              <div className="p-8 rounded-3xl bg-[#121212] border border-white/10 relative overflow-hidden">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative z-10">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                       <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Legal Health Score</span>
                       <Info size={14} className="text-gray-500" />
                    </div>
                    <div className="flex items-baseline gap-4 mb-4">
                      <h2 className={cn(
                        "text-6xl font-display font-bold tracking-tight",
                        analysis.score < 70 ? "text-red-500" : analysis.score < 90 ? "text-yellow-400" : "text-green-400"
                      )}>
                        {analysis.score}
                      </h2>
                      <div className={cn(
                        "px-4 py-1.5 rounded-full text-sm font-bold border flex items-center gap-2",
                        analysis.riskLevel === "High" ? "bg-red-500/10 text-red-500 border-red-500/20" : "bg-green-500/10 text-green-400 border-green-500/20"
                      )}>
                        {analysis.riskLevel === "High" ? <AlertTriangle size={14} /> : <CheckCircle2 size={14} />}
                        {analysis.riskLevel} Risk Detected
                      </div>
                    </div>
                    <p className="text-gray-300 max-w-2xl text-sm leading-relaxed border-l-2 border-white/10 pl-4">
                      {analysis.summary}
                    </p>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex flex-col gap-3 w-full md:w-auto">
                    <button className="px-6 py-3 rounded-xl bg-white text-black text-sm font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 shadow-lg">
                      <FileSignature size={16} /> Negotiate with AI
                    </button>
                    <button className="px-6 py-3 rounded-xl bg-[#1E1E1E] text-white text-sm font-bold border border-white/10 hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
                      <Download size={16} /> Export Report
                    </button>
                  </div>
                </div>
                
                {/* Ambient Background Glow */}
                <div className={cn(
                  "absolute right-0 top-0 w-96 h-96 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 opacity-20 pointer-events-none",
                  analysis.score < 70 ? "bg-red-500" : "bg-green-500"
                )} />
              </div>

              {/* Clauses Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <ScrollText size={20} className="text-gray-400" /> Clause Analysis
                    </h3>
                    <div className="flex gap-2">
                      <span className="text-[10px] font-bold px-2 py-1 rounded bg-red-500/10 text-red-500 border border-red-500/20">1 Risk</span>
                      <span className="text-[10px] font-bold px-2 py-1 rounded bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">1 Warning</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {analysis.clauses.map((clause) => (
                      <div key={clause.id} className={cn(
                        "p-6 rounded-2xl border transition-all relative overflow-hidden group",
                        clause.type === "risk" ? "bg-red-500/5 border-red-500/20 hover:border-red-500/40" : 
                        clause.type === "warning" ? "bg-yellow-500/5 border-yellow-500/20 hover:border-yellow-500/40" :
                        "bg-green-500/5 border-green-500/20 hover:border-green-500/40"
                      )}>
                        <div className="flex items-start gap-5">
                          <div className={cn(
                            "w-10 h-10 rounded-xl shrink-0 flex items-center justify-center shadow-lg",
                            clause.type === "risk" ? "bg-red-500/10 text-red-500" : 
                            clause.type === "warning" ? "bg-yellow-500/10 text-yellow-400" :
                            "bg-green-500/10 text-green-400"
                          )}>
                            {clause.type === "risk" ? <AlertTriangle size={20} /> : 
                             clause.type === "warning" ? <Info size={20} /> :
                             <CheckCircle size={20} />}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-bold text-white text-base">{clause.title}</h4>
                              <span className="text-[10px] font-mono text-gray-500 bg-black/40 px-2 py-1 rounded border border-white/5">
                                Line 42
                              </span>
                            </div>
                            
                            <div className="p-4 bg-[#121212] rounded-xl border border-white/5 mb-4 relative group/code">
                              <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/10 rounded-l-xl group-hover/code:bg-white/20 transition-colors" />
                              <p className="text-xs font-mono text-gray-300 italic leading-relaxed pl-2">
                                "{clause.text}"
                              </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                              <div>
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Plain English</span>
                                <p className="text-gray-300 text-xs leading-relaxed">{clause.explanation}</p>
                              </div>
                              {clause.recommendation && (
                                <div className="p-3 bg-blue-500/5 rounded-xl border border-blue-500/10">
                                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block mb-1 flex items-center gap-1">
                                    <Lock size={10} /> Recommendation
                                  </span>
                                  <p className="text-blue-100/80 text-xs leading-relaxed">{clause.recommendation}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Sidebar: Resources */}
                <div className="space-y-6">
                   <div className="bg-[#121212] border border-white/5 rounded-3xl p-6 sticky top-24">
                      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Shield size={14} /> Protection Plan
                      </h3>
                      <div className="p-4 rounded-xl bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/20 mb-6">
                         <p className="text-xs font-bold text-white mb-1">Legal Guard Pro</p>
                         <p className="text-[10px] text-gray-400 mb-3">Unlimited contract scans + attorney consultation.</p>
                         <button className="w-full py-2 rounded-lg bg-white text-black text-xs font-bold hover:bg-gray-200 transition-colors">
                           Upgrade Plan
                         </button>
                      </div>

                      <div className="space-y-3">
                        <p className="text-xs font-bold text-white">Common Clauses Library</p>
                        {["IP Ownership", "Payment Terms", "Termination", "Exclusivity"].map(item => (
                          <button key={item} className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-gray-300 hover:text-white transition-colors text-left flex justify-between items-center group">
                            {item}
                            <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                          </button>
                        ))}
                      </div>
                   </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", className)}>
      {children}
    </span>
  );
}