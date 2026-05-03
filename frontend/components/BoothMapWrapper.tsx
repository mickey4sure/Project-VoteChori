"use client";

import dynamic from "next/dynamic";

const MapSkeleton = () => (
  <div className="h-full w-full rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white dark:border-slate-800 bg-slate-100 dark:bg-slate-900 animate-pulse flex items-center justify-center">
    <div className="flex flex-col items-center gap-3">
      <div className="w-12 h-12 rounded-full border-4 border-slate-200 dark:border-slate-700 border-t-blue-600 animate-spin"></div>
      <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">Synchronizing Map Data...</p>
    </div>
  </div>
);

const DynamicBoothMap = dynamic(() => import("./BoothMap"), {
  ssr: false,
  loading: () => <MapSkeleton />,
});

export default function BoothMapWrapper(props: any) {
  return (
    <div className="w-full h-full relative">
      <DynamicBoothMap {...props} />
    </div>
  );
}
