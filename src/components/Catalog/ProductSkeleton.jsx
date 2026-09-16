import React from 'react';

export function ProductSkeleton() {
  return (
    <div className="card-retro p-4 flex flex-col justify-between bg-white border border-stone-200 animate-pulse">
      <div className="relative w-full h-48 sm:h-52 bg-stone-100 rounded-lg mb-3.5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
      </div>

      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="h-4 w-24 bg-stone-200 rounded" />
        <div className="h-4 w-16 bg-stone-100 rounded" />
      </div>

      <div className="space-y-1.5 mb-3">
        <div className="h-5 w-5/6 bg-stone-200 rounded" />
        <div className="h-5 w-3/5 bg-stone-100 rounded" />
      </div>

      <div className="h-6 w-28 bg-stone-100 rounded-full mb-4" />

      <div className="flex items-center justify-between pt-3 border-t border-stone-100">
        <div className="h-6 w-20 bg-stone-200 rounded" />
        <div className="h-8 w-20 bg-stone-200 rounded-lg" />
      </div>
    </div>
  );
}

export function CatalogSkeletons({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {[...Array(count)].map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}
