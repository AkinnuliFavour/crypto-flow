import React from "react";

export const NewsSkeleton: React.FC = () => {
  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm animate-pulse">
      <div className="aspect-[16/9] bg-muted rounded-lg mb-4"></div>
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <div className="h-5 w-16 bg-muted rounded-full"></div>
          <div className="h-4 w-20 bg-muted rounded"></div>
        </div>
        <div className="space-y-2">
          <div className="h-5 bg-muted rounded w-3/4"></div>
          <div className="h-5 bg-muted rounded w-1/2"></div>
        </div>
        <div className="h-4 bg-muted rounded w-full"></div>
        <div className="h-4 bg-muted rounded w-2/3"></div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-4 w-16 bg-muted rounded"></div>
            <div className="h-4 w-12 bg-muted rounded"></div>
          </div>
          <div className="h-4 w-16 bg-muted rounded"></div>
        </div>
      </div>
    </div>
  );
};

export const PriceSkeleton: React.FC = () => {
  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm animate-pulse">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 bg-muted rounded-full"></div>
          <div className="space-y-1">
            <div className="h-4 w-16 bg-muted rounded"></div>
            <div className="h-3 w-12 bg-muted rounded"></div>
          </div>
        </div>
        <div className="h-4 w-4 bg-muted rounded"></div>
      </div>
      <div className="space-y-2">
        <div className="flex items-baseline justify-between">
          <div className="h-6 w-20 bg-muted rounded"></div>
          <div className="h-4 w-12 bg-muted rounded"></div>
        </div>
        <div className="h-4 w-24 bg-muted rounded"></div>
      </div>
    </div>
  );
};

export const StatsSkeleton: React.FC = () => {
  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm animate-pulse">
      <div className="space-y-3">
        <div className="h-4 w-24 bg-muted rounded"></div>
        <div className="h-8 w-32 bg-muted rounded"></div>
        <div className="h-4 w-20 bg-muted rounded"></div>
      </div>
    </div>
  );
};
