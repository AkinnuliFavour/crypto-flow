import React from "react";

export const NewsSkeleton: React.FC = () => {
  return (
    <div className="rounded-lg border bg-card shadow-sm overflow-hidden relative">
      {/* Shimmer Effect Overlay */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      {/* Image Skeleton */}
      <div className="aspect-[16/9] bg-muted/40 dark:bg-slate-700/50"></div>

      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        {/* Category and Date */}
        <div className="flex items-center space-x-2">
          <div className="h-5 w-16 bg-muted/60 dark:bg-slate-600/60 rounded-full"></div>
          <div className="h-4 w-20 bg-muted/50 dark:bg-slate-700/50 rounded"></div>
        </div>

        {/* Title Lines */}
        <div className="space-y-2">
          <div className="h-5 bg-muted/60 dark:bg-slate-600/60 rounded w-full"></div>
          <div className="h-5 bg-muted/60 dark:bg-slate-600/60 rounded w-3/4"></div>
        </div>

        {/* Excerpt Lines */}
        <div className="space-y-2 pt-2">
          <div className="h-4 bg-muted/50 dark:bg-slate-700/50 rounded w-full"></div>
          <div className="h-4 bg-muted/50 dark:bg-slate-700/50 rounded w-5/6"></div>
          <div className="h-4 bg-muted/50 dark:bg-slate-700/50 rounded w-2/3"></div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-4">
            <div className="h-4 w-20 bg-muted/50 dark:bg-slate-700/50 rounded"></div>
            <div className="h-4 w-16 bg-muted/50 dark:bg-slate-700/50 rounded"></div>
          </div>
          <div className="h-8 w-20 bg-muted/50 dark:bg-slate-700/50 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export const PriceSkeleton: React.FC = () => {
  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm overflow-hidden relative">
      {/* Shimmer Effect Overlay */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 bg-muted/60 dark:bg-slate-600/60 rounded-full"></div>
          <div className="space-y-1">
            <div className="h-4 w-16 bg-muted/60 dark:bg-slate-600/60 rounded"></div>
            <div className="h-3 w-12 bg-muted/50 dark:bg-slate-700/50 rounded"></div>
          </div>
        </div>
        <div className="h-4 w-4 bg-muted/50 dark:bg-slate-700/50 rounded"></div>
      </div>
      <div className="space-y-2">
        <div className="flex items-baseline justify-between">
          <div className="h-6 w-20 bg-muted/60 dark:bg-slate-600/60 rounded"></div>
          <div className="h-4 w-12 bg-muted/50 dark:bg-slate-700/50 rounded"></div>
        </div>
        <div className="h-4 w-24 bg-muted/50 dark:bg-slate-700/50 rounded"></div>
      </div>
    </div>
  );
};

export const StatsSkeleton: React.FC = () => {
  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm overflow-hidden relative">
      {/* Shimmer Effect Overlay */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="space-y-3">
        <div className="h-4 w-28 bg-muted/50 dark:bg-slate-700/50 rounded"></div>
        <div className="h-8 w-36 bg-muted/60 dark:bg-slate-600/60 rounded"></div>
        <div className="h-4 w-24 bg-muted/50 dark:bg-slate-700/50 rounded"></div>
      </div>
    </div>
  );
};

export const NewsSkeletonCompact: React.FC = () => {
  return (
    <div className="rounded-lg border bg-card shadow-sm overflow-hidden relative p-4">
      {/* Shimmer Effect Overlay */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="flex gap-4">
        {/* Compact Image */}
        <div className="w-24 h-24 flex-shrink-0 bg-muted/40 dark:bg-slate-700/50 rounded"></div>

        {/* Content */}
        <div className="flex-1 space-y-2">
          <div className="flex items-center space-x-2">
            <div className="h-4 w-12 bg-muted/60 dark:bg-slate-600/60 rounded-full"></div>
            <div className="h-3 w-16 bg-muted/50 dark:bg-slate-700/50 rounded"></div>
          </div>
          <div className="space-y-1">
            <div className="h-4 bg-muted/60 dark:bg-slate-600/60 rounded w-full"></div>
            <div className="h-4 bg-muted/60 dark:bg-slate-600/60 rounded w-3/4"></div>
          </div>
          <div className="h-3 bg-muted/50 dark:bg-slate-700/50 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
};

export const PriceTickerSkeleton: React.FC = () => {
  return (
    <div className="flex items-center gap-8 overflow-hidden">
      {[...Array(10)].map((_, i) => (
        <div key={i} className="flex items-center gap-2 min-w-[200px]">
          <div className="h-6 w-6 bg-muted/60 dark:bg-slate-600/60 rounded-full"></div>
          <div className="space-y-1">
            <div className="h-4 w-16 bg-muted/60 dark:bg-slate-600/60 rounded"></div>
            <div className="h-3 w-20 bg-muted/50 dark:bg-slate-700/50 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const ArticleDetailSkeleton: React.FC = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Shimmer Effect Overlay */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent z-10" />

      <div className="space-y-6">
        {/* Back button skeleton */}
        <div className="h-10 w-32 bg-muted/50 dark:bg-slate-700/50 rounded"></div>

        {/* Category badge and source */}
        <div className="flex items-center space-x-2">
          <div className="h-6 w-24 bg-muted/60 dark:bg-slate-600/60 rounded-full"></div>
          <div className="h-4 w-40 bg-muted/50 dark:bg-slate-700/50 rounded"></div>
        </div>

        {/* Title skeleton */}
        <div className="space-y-3">
          <div className="h-10 bg-muted/60 dark:bg-slate-600/60 rounded w-full"></div>
          <div className="h-10 bg-muted/60 dark:bg-slate-600/60 rounded w-5/6"></div>
        </div>

        {/* Description skeleton */}
        <div className="space-y-2">
          <div className="h-6 bg-muted/50 dark:bg-slate-700/50 rounded w-full"></div>
          <div className="h-6 bg-muted/50 dark:bg-slate-700/50 rounded w-4/5"></div>
        </div>

        {/* Meta info skeleton */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-border">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 bg-muted/50 dark:bg-slate-700/50 rounded"></div>
              <div className="h-4 w-28 bg-muted/50 dark:bg-slate-700/50 rounded"></div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 bg-muted/50 dark:bg-slate-700/50 rounded"></div>
              <div className="h-4 w-24 bg-muted/50 dark:bg-slate-700/50 rounded"></div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 bg-muted/50 dark:bg-slate-700/50 rounded"></div>
              <div className="h-4 w-20 bg-muted/50 dark:bg-slate-700/50 rounded"></div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-9 w-9 bg-muted/50 dark:bg-slate-700/50 rounded-full"></div>
            <div className="h-9 w-9 bg-muted/50 dark:bg-slate-700/50 rounded-full"></div>
            <div className="h-9 w-9 bg-muted/50 dark:bg-slate-700/50 rounded-full"></div>
          </div>
        </div>

        {/* Image skeleton */}
        <div className="w-full h-64 md:h-96 bg-muted/40 dark:bg-slate-700/50 rounded-lg"></div>

        {/* Content skeleton */}
        <div className="space-y-4 py-6">
          <div className="h-4 bg-muted/50 dark:bg-slate-700/50 rounded w-full"></div>
          <div className="h-4 bg-muted/50 dark:bg-slate-700/50 rounded w-full"></div>
          <div className="h-4 bg-muted/50 dark:bg-slate-700/50 rounded w-5/6"></div>
          <div className="h-4 bg-muted/50 dark:bg-slate-700/50 rounded w-4/5"></div>

          <div className="py-2"></div>

          <div className="h-4 bg-muted/50 dark:bg-slate-700/50 rounded w-full"></div>
          <div className="h-4 bg-muted/50 dark:bg-slate-700/50 rounded w-full"></div>
          <div className="h-4 bg-muted/50 dark:bg-slate-700/50 rounded w-3/4"></div>
          <div className="h-4 bg-muted/50 dark:bg-slate-700/50 rounded w-5/6"></div>

          <div className="py-2"></div>

          <div className="h-4 bg-muted/50 dark:bg-slate-700/50 rounded w-full"></div>
          <div className="h-4 bg-muted/50 dark:bg-slate-700/50 rounded w-4/6"></div>
          <div className="h-4 bg-muted/50 dark:bg-slate-700/50 rounded w-5/6"></div>
        </div>

        {/* Action buttons skeleton */}
        <div className="flex items-center justify-center space-x-4 py-8 border-y border-border">
          <div className="h-10 w-32 bg-muted/50 dark:bg-slate-700/50 rounded"></div>
          <div className="h-10 w-32 bg-muted/50 dark:bg-slate-700/50 rounded"></div>
        </div>

        {/* Related articles section skeleton */}
        <div className="space-y-6 mt-12">
          <div className="h-8 w-48 bg-muted/60 dark:bg-slate-600/60 rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <NewsSkeleton />
            <NewsSkeleton />
            <NewsSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
};
