import React, { useState } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { ArrowLeft, CreditCard, DollarSign, Wallet as WalletIcon, Check, ChevronRight, Smartphone, Building } from "lucide-react";
import { cn } from "@/lib/utils";
import { GradientButton } from "@/components/GradientButton";
import { useToast } from "@/hooks/use-toast";

export default function Wallet() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"deposit" | "withdraw">("deposit");
  const [amount, setAmount] = useState("25.00");
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const DEPOSIT_METHODS = [
    { id: "stripe", name: "Credit Card", icon: CreditCard, description: "Instant • 2.9% fee", color: "text-blue-400" },
    { id: "paypal", name: "PayPal", icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" height="24" width="24">
        <path d="M7.076 21.337l.756-4.788h-2.124a.69.69 0 0 1-.686-.796l2.6-12.58c.076-.367.396-.635.771-.635h5.59c2.904 0 5.367 1.54 6.032 4.63.234 1.088.15 2.19-.244 3.184-.854 2.16-2.977 3.62-5.297 3.62h-1.56l-.585 3.71c-.06.378-.387.655-.77.655H7.847a.69.69 0 0 1-.771-.8z"/>
      </svg>
    ), description: "Instant • 3.5% fee", color: "text-blue-600" },
    { id: "venmo", name: "Venmo", icon: Smartphone, description: "Instant • No fee", color: "text-blue-500" },
  ];

  const WITHDRAW_METHODS = [
    { id: "venmo_payout", name: "Venmo", icon: Smartphone, description: "1-2 business days • No fee", color: "text-blue-500" },
    { id: "paypal_payout", name: "PayPal", icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" height="24" width="24">
        <path d="M7.076 21.337l.756-4.788h-2.124a.69.69 0 0 1-.686-.796l2.6-12.58c.076-.367.396-.635.771-.635h5.59c2.904 0 5.367 1.54 6.032 4.63.234 1.088.15 2.19-.244 3.184-.854 2.16-2.977 3.62-5.297 3.62h-1.56l-.585 3.71c-.06.378-.387.655-.77.655H7.847a.69.69 0 0 1-.771-.8z"/>
      </svg>
    ), description: "Instant • 1% fee", color: "text-blue-600" },
    { id: "bank", name: "Bank Transfer", icon: Building, description: "3-5 business days • No fee", color: "text-gray-400" },
  ];

  const handleTransaction = () => {
    if (!selectedMethod) {
      toast({
        title: "Select a method",
        description: "Please choose a payment method to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: activeTab === "deposit" ? "Funds Added!" : "Withdrawal Initiated",
        description: activeTab === "deposit" 
          ? `Successfully added $${amount} to your wallet.`
          : `Your withdrawal of $${amount} is being processed.`,
      });
      setTimeout(() => setLocation("/profile"), 1500);
    }, 2000);
  };

  return (
    <Layout hideTabs>
      <div className="min-h-screen bg-background pb-8">
        {/* Header */}
        <div className="p-4 pt-8 flex items-center gap-3 sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b border-white/5">
          <button aria-label="Go back" 
            onClick={() => setLocation("/profile")}
            className="p-2 -ml-2 rounded-full hover:bg-white/10 text-white transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-bold text-white">Wallet</h1>
        </div>

        <div className="p-6 space-y-8">
          {/* Balance Card */}
          <div className="w-full p-6 rounded-2xl bg-gradient-to-br from-[#1E1E1E] to-[#252525] border border-white/10 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
               <WalletIcon size={80} className="text-white" />
             </div>
             <p className="text-sm font-medium text-gray-400 uppercase mb-1">Total Balance</p>
             <h2 className="text-4xl font-display font-bold text-white mb-6">$1,560.50</h2>
             
             <div className="flex p-1 rounded-xl bg-black/40 backdrop-blur-sm border border-white/5">
               <button 
                 onClick={() => setActiveTab("deposit")}
                 className={cn(
                   "flex-1 py-2 rounded-lg text-sm font-bold transition-all",
                   activeTab === "deposit" ? "bg-white text-black shadow-lg" : "text-gray-400 hover:text-white"
                 )}
               >
                 Add Funds
               </button>
               <button 
                 onClick={() => setActiveTab("withdraw")}
                 className={cn(
                   "flex-1 py-2 rounded-lg text-sm font-bold transition-all",
                   activeTab === "withdraw" ? "bg-white text-black shadow-lg" : "text-gray-400 hover:text-white"
                 )}
               >
                 Withdraw
               </button>
             </div>
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">
              {activeTab === "deposit" ? "Amount to Add" : "Withdrawal Amount"}
            </label>
            <div className="relative">
              <DollarSign size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-white" />
              <input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-[#1E1E1E] border border-white/10 rounded-xl pl-12 pr-4 py-4 text-2xl font-bold text-white focus:outline-none focus:border-accent/50 transition-colors placeholder:text-gray-600"
              />
            </div>
          </div>

          {/* Payment Methods */}
          <div className="space-y-3">
             <label className="text-xs font-bold text-gray-500 uppercase ml-1">Select Method</label>
             <div className="space-y-2">
               {(activeTab === "deposit" ? DEPOSIT_METHODS : WITHDRAW_METHODS).map((method) => (
                 <button
                   key={method.id}
                   onClick={() => setSelectedMethod(method.id)}
                   className={cn(
                     "w-full p-4 rounded-xl border flex items-center justify-between transition-all group",
                     selectedMethod === method.id 
                       ? "bg-white/10 border-accent shadow-[0_0_15px_rgba(124,58,237,0.2)]" 
                       : "bg-[#1E1E1E] border-white/5 hover:bg-white/5"
                   )}
                 >
                   <div className="flex items-center gap-4">
                     <div className={cn("w-10 h-10 rounded-full bg-white/5 flex items-center justify-center", method.color)}>
                       <method.icon size={20} />
                     </div>
                     <div className="text-left">
                       <h4 className="text-sm font-bold text-white">{method.name}</h4>
                       <p className="text-xs text-gray-500">{method.description}</p>
                     </div>
                   </div>
                   {selectedMethod === method.id && (
                     <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-black animate-in zoom-in">
                       <Check size={14} />
                     </div>
                   )}
                 </button>
               ))}
             </div>
          </div>

          {/* Action Button */}
          <GradientButton 
            onClick={handleTransaction}
            className="w-full py-6 text-lg"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">Processing...</span>
            ) : (
              activeTab === "deposit" ? "Add Funds Now" : "Request Payout"
            )}
          </GradientButton>

          <p className="text-center text-[10px] text-gray-600 uppercase tracking-widest">
            Secure Payment Processing via Stripe Connect
          </p>
        </div>
      </div>
    </Layout>
  );
}
