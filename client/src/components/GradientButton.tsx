import React from "react";
import { cn } from "@/lib/utils";

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

export function GradientButton({ children, className, variant = "primary", ...props }: GradientButtonProps) {
  if (variant === "secondary") {
    return (
      <button 
        className={cn(
          "w-full py-4 rounded-2xl font-display font-bold text-lg tracking-wide text-white relative overflow-hidden group",
          "bg-[#1E1E1E] border border-white/10",
          "active:scale-[0.98] transition-transform",
          className
        )}
        {...props}
      >
        {/* Subtle gradient glow on hover/active */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#7C3AED]/10 to-[#22D3EE]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="relative z-10 text-gradient">{children}</span>
      </button>
    );
  }

  return (
    <button 
      className={cn(
        "w-full py-4 rounded-2xl font-display font-bold text-lg tracking-wide text-white shadow-xl shadow-primary/20 relative overflow-hidden",
        "bg-gradient-accent",
        "active:scale-[0.98] transition-transform",
        className
      )}
      {...props}
    >
      <span className="relative z-10 drop-shadow-md">{children}</span>
    </button>
  );
}
