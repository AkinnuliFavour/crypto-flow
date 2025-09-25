import React from "react";
import { X } from "lucide-react";
import { Button } from "./button";
import { cn } from "../../lib/utils";

interface FilterChipProps {
  label: string;
  value: string;
  isActive?: boolean;
  onClick?: () => void;
  onRemove?: () => void;
  variant?: "default" | "primary" | "secondary";
}

export const FilterChip: React.FC<FilterChipProps> = ({
  label,
  // value,
  isActive = false,
  onClick,
  onRemove,
  variant = "default",
}) => {
  const baseClasses =
    "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium transition-colors";

  const variantClasses = {
    default: isActive
      ? "bg-primary text-primary-foreground hover:bg-primary/90"
      : "bg-muted text-muted-foreground hover:bg-muted/80",
    primary: isActive
      ? "bg-primary text-primary-foreground hover:bg-primary/90"
      : "border border-primary text-primary hover:bg-primary hover:text-primary-foreground",
    secondary: isActive
      ? "bg-secondary text-secondary-foreground hover:bg-secondary/80"
      : "border border-secondary text-secondary-foreground hover:bg-secondary",
  };

  return (
    <button
      onClick={onClick}
      className={cn(baseClasses, variantClasses[variant])}
      aria-pressed={isActive}
    >
      <span>{label}</span>
      {onRemove && (
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-1 h-4 w-4 p-0 hover:bg-transparent"
          aria-label={`Remove ${label} filter`}
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </button>
  );
};
