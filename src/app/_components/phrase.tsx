"use client";

interface Props {
  desc: string;
  count: number;
}

export function Phrase({ desc, count }: Props) {
  return (
    <div className="flex w-full max-w-md items-center justify-between gap-4 rounded bg-slate-200/10 p-2">
      <p className="flex-1">{desc}</p>
      <button className="rounded-md border p-2">{count}</button>
    </div>
  );
}
