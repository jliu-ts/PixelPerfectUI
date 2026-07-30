import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  backPath?: string;
  actions?: React.ReactNode;
  className?: string;
}

/**
 * Reusable page header with optional back button and actions
 *
 * @example
 * <PageHeader
 *   title="Creation Studio"
 *   showBack
 *   actions={<Button>Save</Button>}
 * />
 */
export function PageHeader({
  title,
  subtitle,
  showBack = false,
  backPath = "/",
  actions,
  className,
}: PageHeaderProps) {
  const [, setLocation] = useLocation();

  return (
    <div
      className={cn(
        "sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b border-white/5",
        "p-4 flex items-center justify-between gap-4",
        className
      )}
    >
      <div className="flex items-center gap-3">
        {showBack && (
          <button aria-label="Go back"
            onClick={() => setLocation(backPath)}
            className="p-2 -ml-2 rounded-full hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        )}
        <div>
          <h1 className="font-display text-xl font-bold text-foreground">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
