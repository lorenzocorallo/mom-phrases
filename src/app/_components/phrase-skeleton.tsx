"use client";

import { ChevronDown, ChevronUp } from "lucide-react";

export function PhraseSkeleton() {
  return (
    <div className="grid w-full max-w-md grid-cols-[1fr,auto] items-start justify-between gap-2">
      <div className="flex h-full items-start rounded bg-slate-200/10 p-3 gap-3 flex-col justify-center animate-pulse">
        <div className="rounded-full w-[90%] p-1 bg-slate-200/20"></div>
        <div className="rounded-full w-[70%] p-1 bg-slate-200/20"></div>
        <div className="rounded-full w-[50%] p-1 bg-slate-200/20"></div>
      </div>
      <div className="flex flex-col gap-2">
        <button className="flex aspect-square flex-col items-center justify-center rounded-md bg-slate-200/10 animate-pulse p-1">
          <ChevronUp className="text-slate-200/20" />
        </button>
        <button className="flex aspect-square flex-col items-center justify-center rounded-md bg-slate-200/10 animate-pulse p-1">
          <ChevronDown className="text-slate-200/20"/>
        </button>
      </div>
    </div>
  );
}
