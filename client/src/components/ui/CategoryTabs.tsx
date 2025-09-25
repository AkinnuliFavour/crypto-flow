import React from "react";
import type { NewsCategory } from "../../types";
import { Button } from "./button";
import { cn } from "../../lib/utils";

interface CategoryTabsProps {
  activeCategory: NewsCategory;
  onCategoryChange: (category: NewsCategory) => void;
  categories?: { value: NewsCategory; label: string; count?: number }[];
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  activeCategory,
  onCategoryChange,
  categories = [
    { value: "all", label: "All News" },
    { value: "breaking", label: "Breaking" },
    { value: "bitcoin", label: "Bitcoin" },
    { value: "altcoin", label: "Altcoins" },
    { value: "defi", label: "DeFi & NFTs" },
    { value: "regulation", label: "Regulation" },
    { value: "technology", label: "Technology" },
    { value: "analysis", label: "Analysis" },
  ],
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((category) => (
        <Button
          key={category.value}
          variant={activeCategory === category.value ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryChange(category.value)}
          className={cn(
            "transition-all",
            activeCategory === category.value && "shadow-sm"
          )}
        >
          {category.label}
          {category.count !== undefined && (
            <span className="ml-2 text-xs opacity-70">({category.count})</span>
          )}
        </Button>
      ))}
    </div>
  );
};
