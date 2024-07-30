"use client";

import { ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  id: number;
  desc: string;
  count: number;
}

export function Phrase({ desc, count }: Props) {
  return (
    <div className="grid w-full max-w-md grid-cols-[1fr,auto] items-start justify-between gap-2">
      <div
        // href={`/phrase/${id}`}
        className="flex h-full items-center rounded bg-slate-200/10 p-3"
      >
        <p>
          <span className="bottom-3 mt-[-4px] font-bold text-yellow-400">
            {count}x
          </span>{" "}
          {desc}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <button className="flex aspect-square flex-col items-center justify-center rounded-md bg-green-500/60 p-1">
          <ChevronUp />
        </button>
        <button
          className="flex aspect-square flex-col items-center justify-center rounded-md bg-red-500/40 p-1 disabled:bg-slate-700/60 disabled:text-slate-400"
          disabled={count <= 1}
        >
          <ChevronDown />
        </button>
      </div>
    </div>
  );
}
