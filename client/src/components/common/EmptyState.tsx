import { LucideIcon, Search, FileQuestion, Inbox } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  variant?: "default" | "search" | "error";
  className?: string;
}

/**
 * Reusable empty state component for lists and search results
 *
 * @example
 * {filteredItems.length === 0 && (
 *   <EmptyState
 *     variant="search"
 *     title="No results found"
 *     description="Try adjusting your search or filters"
 *     action={{ label: "Clear filters", onClick: resetFilters }}
 *   />
 * )}
 */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  variant = "default",
  className,
}: EmptyStateProps) {
  const defaultIcons: Record<string, LucideIcon> = {
    default: Inbox,
    search: Search,
    error: FileQuestion,
  };

  const DisplayIcon = Icon || defaultIcons[variant];

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-12 px-4 text-center",
        className
      )}
    >
      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
        <DisplayIcon size={24} className="text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground max-w-sm">{description}</p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="mt-4 px-4 py-2 text-sm font-medium rounded-lg bg-accent text-black hover:bg-accent/90 transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
