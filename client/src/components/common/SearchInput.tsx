import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  showClear?: boolean;
}

/**
 * Reusable search input component with consistent styling
 *
 * @example
 * <SearchInput
 *   value={searchQuery}
 *   onChange={setSearchQuery}
 *   placeholder="Search prompts..."
 * />
 */
export function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  className,
  size = "md",
  showClear = true,
}: SearchInputProps) {
  const sizeClasses = {
    sm: "h-8 text-xs pl-8 pr-8",
    md: "h-10 text-sm pl-10 pr-10",
    lg: "h-12 text-base pl-12 pr-12",
  };

  const iconSizes = {
    sm: 14,
    md: 16,
    lg: 20,
  };

  return (
    <div className={cn("relative", className)}>
      <Search
        size={iconSizes[size]}
        className={cn(
          "absolute top-1/2 -translate-y-1/2 text-muted-foreground",
          size === "sm" ? "left-2.5" : size === "lg" ? "left-4" : "left-3"
        )}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full rounded-lg bg-white/5 border border-white/10 text-foreground placeholder:text-muted-foreground",
          "focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50",
          "transition-colors",
          sizeClasses[size]
        )}
      />
      {showClear && value && (
        <button
          onClick={() => onChange("")}
          className={cn(
            "absolute top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
            size === "sm" ? "right-2.5" : size === "lg" ? "right-4" : "right-3"
          )}
        >
          <X size={iconSizes[size]} />
        </button>
      )}
    </div>
  );
}
