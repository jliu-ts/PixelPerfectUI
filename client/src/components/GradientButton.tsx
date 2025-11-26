import React from "react";
import { cn } from "@/lib/utils";

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "default" | "sm";
}

export function GradientButton({ children, className, variant = "primary", size = "default", ...props }: GradientButtonProps) {
  const baseStyles = "font-display font-bold tracking-wide relative overflow-hidden transition-transform active:scale-[0.98]";
  
  const sizeStyles = size === "default" 
    ? "w-full py-4 rounded-2xl text-lg" 
    : "w-auto px-4 py-2 rounded-full text-xs uppercase tracking-wider";

  if (variant === "secondary") {
    return (
      <button 
        className={cn(
          baseStyles,
          sizeStyles,
          "text-white group bg-[#1E1E1E] border border-white/10",
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
        baseStyles,
        sizeStyles,
        "text-white shadow-xl shadow-primary/20 bg-gradient-accent",
        className
      )}
      {...props}
    >
      <span className="relative z-10 drop-shadow-md flex items-center justify-center gap-2">{children}</span>
    </button>
  );
}
