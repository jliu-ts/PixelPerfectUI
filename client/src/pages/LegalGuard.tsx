import React, { useState, useRef } from "react";
import { Layout } from "@/components/Layout";
import { GradientButton } from "@/components/GradientButton";
import { 
  Shield, 
  FileText, 
  UploadCloud, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Info,
  Search,
  Scale,
  Lock,
  Eye
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Analysis Data
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

export default function LegalGuard() {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<typeof MOCK_ANALYSIS | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const startAnalysis = () => {
    if (!file) return;
    setIsAnalyzing(true);
    // Simulate AI processing time
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysis(MOCK_ANALYSIS);
    }, 2000);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background pb-20">
        
        {/* Header */}
        <div className="p-6 border-b border-white/5 bg-[#121212] sticky top-0 z-20">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-1">
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-blue-400">
                <Scale size={24} />
              </div>
              <h1 className="text-2xl font-display font-bold text-white">Legal Guard</h1>
            </div>
            <p className="text-sm text-gray-400 ml-12">AI-powered contract review to protect your creative rights.</p>
          </div>
        </div>

        <div className="p-6 max-w-4xl mx-auto space-y-8">
          
          {/* Upload Section */}
          {!analysis && (
            <div className="animate-in fade-in slide-in-from-bottom-4">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                  "border-2 border-dashed rounded-3xl p-12 text-center transition-all cursor-pointer group relative overflow-hidden",
                  file ? "border-green-500/50 bg-green-500/5" : "border-white/10 hover:border-blue-500/50 hover:bg-blue-500/5"
                )}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                  className="hidden" 
                  accept=".pdf,.doc,.docx,.txt"
                />
                
                <div className="relative z-10 flex flex-col items-center justify-center">
                  <div className={cn(
                    "w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-colors shadow-2xl",
                    file ? "bg-green-500 text-black" : "bg-[#1E1E1E] text-gray-400 group-hover:text-blue-400"
                  )}>
                    {file ? <FileText size={40} /> : <UploadCloud size={40} />}
                  </div>
                  
                  {file ? (
                    <>
                      <h3 className="text-xl font-bold text-white mb-2">{file.name}</h3>
                      <p className="text-sm text-green-400 font-medium">Ready to analyze</p>
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold text-white mb-2">Drop your contract here</h3>
                      <p className="text-sm text-gray-400 max-w-sm mx-auto">
                        Support for PDF, DOCX, or TXT. We value your privacy—documents are not stored after analysis.
                      </p>
                    </>
                  )}
                </div>

                {/* Background Grid Animation */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
              </div>

              {file && (
                <div className="mt-6 flex justify-center">
                  <GradientButton 
                    onClick={startAnalysis} 
                    disabled={isAnalyzing}
                    className="px-12 py-4 text-base shadow-[0_0_30px_rgba(59,130,246,0.3)]"
                  >
                    {isAnalyzing ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Scanning Clauses...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Shield size={20} /> Scan for Risks
                      </span>
                    )}
                  </GradientButton>
                </div>
              )}
            </div>
          )}

          {/* Analysis Results */}
          {analysis && (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
              
              {/* Score Card */}
              <div className="p-6 rounded-2xl bg-[#1E1E1E] border border-white/10 relative overflow-hidden">
                <div className="flex items-center justify-between relative z-10">
                  <div>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Risk Score</p>
                    <div className="flex items-baseline gap-2">
                      <h2 className={cn(
                        "text-5xl font-display font-bold",
                        analysis.score < 70 ? "text-red-500" : analysis.score < 90 ? "text-yellow-400" : "text-green-400"
                      )}>
                        {analysis.score}/100
                      </h2>
                      <span className={cn(
                        "px-3 py-1 rounded-full text-xs font-bold border",
                        analysis.riskLevel === "High" ? "bg-red-500/10 text-red-500 border-red-500/20" : "bg-green-500/10 text-green-400 border-green-500/20"
                      )}>
                        {analysis.riskLevel} Risk
                      </span>
                    </div>
                    <p className="text-gray-300 mt-4 max-w-xl leading-relaxed">
                      {analysis.summary}
                    </p>
                  </div>
                  
                  {/* Circular Chart Visualization Placeholder */}
                  <div className="hidden md:flex items-center justify-center w-32 h-32 rounded-full border-8 border-white/5 relative">
                     <Shield size={40} className={analysis.score < 70 ? "text-red-500" : "text-green-400"} />
                  </div>
                </div>
                
                {/* Background Glow */}
                <div className={cn(
                  "absolute right-0 top-0 w-64 h-64 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 opacity-20",
                  analysis.score < 70 ? "bg-red-500" : "bg-green-500"
                )} />
              </div>

              {/* Clauses Breakdown */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <FileText size={20} /> Clause Breakdown
                </h3>
                
                {analysis.clauses.map((clause) => (
                  <div key={clause.id} className={cn(
                    "p-5 rounded-xl border transition-all",
                    clause.type === "risk" ? "bg-red-500/5 border-red-500/20 hover:border-red-500/40" : 
                    clause.type === "warning" ? "bg-yellow-500/5 border-yellow-500/20 hover:border-yellow-500/40" :
                    "bg-green-500/5 border-green-500/20 hover:border-green-500/40"
                  )}>
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        "p-2 rounded-lg shrink-0 mt-1",
                        clause.type === "risk" ? "bg-red-500/10 text-red-500" : 
                        clause.type === "warning" ? "bg-yellow-500/10 text-yellow-400" :
                        "bg-green-500/10 text-green-400"
                      )}>
                        {clause.type === "risk" ? <AlertTriangle size={20} /> : 
                         clause.type === "warning" ? <Info size={20} /> :
                         <CheckCircle size={20} />}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-white text-sm">{clause.title}</h4>
                          <span className="text-[10px] font-mono text-gray-500 bg-black/20 px-2 py-1 rounded">
                            Line 42
                          </span>
                        </div>
                        
                        <div className="p-3 bg-black/30 rounded-lg border border-white/5 mb-3">
                          <p className="text-xs font-mono text-gray-300 italic leading-relaxed">
                            "{clause.text}"
                          </p>
                        </div>

                        <div className="flex flex-col md:flex-row gap-4 text-xs">
                          <div className="flex-1">
                            <span className="font-bold text-gray-400 block mb-1">Plain English Translation:</span>
                            <p className="text-white">{clause.explanation}</p>
                          </div>
                          {clause.recommendation && (
                            <div className="flex-1 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                              <span className="font-bold text-blue-400 block mb-1 flex items-center gap-1">
                                <Lock size={12} /> Recommendation:
                              </span>
                              <p className="text-blue-100">{clause.recommendation}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-4">
                <button 
                  onClick={() => { setAnalysis(null); setFile(null); }}
                  className="text-sm text-gray-400 hover:text-white underline decoration-dashed"
                >
                  Scan another document
                </button>
              </div>

            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}