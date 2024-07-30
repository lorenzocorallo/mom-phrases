"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { decrementCount, incrementCount } from "~/server/actions";

interface Props {
  id: number;
  desc: string;
  count: number;
}

export function Phrase({ id, desc, count: originalCount }: Props) {
  const [count, setCount] = useState<number>(originalCount);

  return (
    <div className="grid w-full max-w-md grid-cols-[1fr,auto] items-start justify-between gap-2">
      <Link
        href={`/phrase/${id}`}
        className="flex h-full items-center rounded bg-slate-200/10 p-3"
      >
        <p>
          <span className="bottom-3 mt-[-4px] font-bold text-yellow-400">
            {count}x
          </span>{" "}
          {desc}
        </p>
      </Link>
      <div className="flex flex-col gap-2">
        <button
          onClick={async () => {
            setCount(prev => prev + 1);
            await incrementCount(id, 1);
          }}
          className="flex aspect-square flex-col items-center justify-center rounded-md bg-green-500/60 p-1 hover:bg-green-500/80 transition-colors"
        >
          <ChevronUp />
        </button>
        <button
          className="flex aspect-square flex-col items-center justify-center rounded-md bg-red-500/40 p-1 disabled:bg-slate-700/60 disabled:text-slate-400 hover:bg-red-500/70 transition-colors"
          disabled={count <= 1}
          onClick={async () => {
            setCount(prev => prev - 1);
            await decrementCount(id, 1);
          }}
        >
          <ChevronDown />
        </button>
      </div>
    </div>
  );
}
