import { cn } from "@/lib/utils";

interface FilterTab {
  id: string;
  label: string;
  count?: number;
}

interface FilterTabsProps {
  tabs: FilterTab[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
  variant?: "pills" | "underline" | "buttons";
}

/**
 * Reusable filter tabs component for category filtering
 *
 * @example
 * <FilterTabs
 *   tabs={[
 *     { id: "all", label: "All", count: 10 },
 *     { id: "product", label: "Product", count: 3 },
 *   ]}
 *   activeTab={selectedCategory}
 *   onChange={setSelectedCategory}
 * />
 */
export function FilterTabs({
  tabs,
  activeTab,
  onChange,
  className,
  variant = "pills",
}: FilterTabsProps) {
  if (variant === "underline") {
    return (
      <div className={cn("flex gap-1 border-b border-white/10", className)}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors relative",
              activeTab === tab.id
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className="ml-1.5 text-xs opacity-60">({tab.count})</span>
            )}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
            )}
          </button>
        ))}
      </div>
    );
  }

  if (variant === "buttons") {
    return (
      <div className={cn("flex gap-2", className)}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-lg border transition-colors",
              activeTab === tab.id
                ? "bg-white text-black border-white"
                : "bg-transparent text-muted-foreground border-white/10 hover:border-white/20 hover:text-foreground"
            )}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className="ml-1.5 text-xs opacity-60">{tab.count}</span>
            )}
          </button>
        ))}
      </div>
    );
  }

  // Default: pills
  return (
    <div className={cn("flex gap-2 flex-wrap", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "px-3 py-1.5 text-xs font-medium rounded-full transition-colors",
            activeTab === tab.id
              ? "bg-accent text-black"
              : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
          )}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span className="ml-1 opacity-70">{tab.count}</span>
          )}
        </button>
      ))}
    </div>
  );
}
