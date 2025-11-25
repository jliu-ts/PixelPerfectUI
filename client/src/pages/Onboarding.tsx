import React, { useState } from "react";
import { useLocation } from "wouter";
import { ArrowRight, Zap, Shield, Users, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import bgImage from "@assets/generated_images/abstract_digital_brutalism_gateway.png";

const STEPS = [
  {
    id: "welcome",
    title: "Welcome to the Society",
    subtitle: "The operating system for the new creator economy.",
    icon: <Sparkles size={32} className="text-purple-400" />,
  },
  {
    id: "create",
    title: "Create Without Limits",
    subtitle: "Access Veo, Sora, and Midjourney in one unified studio.",
    icon: <Zap size={32} className="text-yellow-400" />,
  },
  {
    id: "earn",
    title: "Own Your Growth",
    subtitle: "Monetize assets, collaborate in real-time, and get paid instantly.",
    icon: <Users size={32} className="text-blue-400" />,
  },
];

export default function Onboarding() {
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(curr => curr + 1);
    } else {
      setLocation("/");
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src={bgImage} 
          alt="Background" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/80 to-black" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-end p-8 pb-12">
        <div className="space-y-8">
          {/* Animated Icon */}
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center animate-in zoom-in duration-500 key={currentStep}">
            {STEPS[currentStep].icon}
          </div>

          {/* Text */}
          <div className="space-y-2 animate-in slide-in-from-bottom-4 duration-500 key={currentStep + 'text'}">
            <h1 className="text-4xl font-display font-bold text-white leading-tight">
              {STEPS[currentStep].title}
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed">
              {STEPS[currentStep].subtitle}
            </p>
          </div>

          {/* Progress & Action */}
          <div className="pt-8 flex items-center justify-between">
            <div className="flex gap-2">
              {STEPS.map((_, i) => (
                <div 
                  key={i}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-500",
                    i === currentStep ? "w-8 bg-white" : "w-2 bg-white/20"
                  )}
                />
              ))}
            </div>

            <button 
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-colors"
            >
              {currentStep === STEPS.length - 1 ? "Enter Society" : "Next"}
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
