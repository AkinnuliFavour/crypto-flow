import React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "../../lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    label: string;
  };
  icon?: LucideIcon;
  className?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  icon: Icon,
  className,
}) => {
  const formatValue = (val: string | number) => {
    if (typeof val === "number") {
      if (val >= 1e12) {
        return `$${(val / 1e12).toFixed(2)}T`;
      }
      if (val >= 1e9) {
        return `$${(val / 1e9).toFixed(2)}B`;
      }
      if (val >= 1e6) {
        return `$${(val / 1e6).toFixed(2)}M`;
      }
      if (val >= 1000) {
        return val.toLocaleString();
      }
      return val.toString();
    }
    return val;
  };

  const isPositiveChange = change && change.value >= 0;

  return (
    <div className={cn("rounded-lg border bg-card p-6 shadow-sm", className)}>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground">{formatValue(value)}</p>
          {change && (
            <p
              className={cn(
                "text-xs font-medium",
                isPositiveChange ? "text-[hsl(160,84%,39%)]" : "text-destructive"
              )}
            >
              {isPositiveChange ? "+" : ""}
              {change.value.toFixed(2)}% {change.label}
            </p>
          )}
        </div>
        {Icon && (
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon className="h-4 w-4 text-primary" />
          </div>
        )}
      </div>
    </div>
  );
};
