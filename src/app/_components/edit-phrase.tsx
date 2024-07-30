"use client";

import { useState } from "react";
import type { PhraseSelect } from "~/server/db/schema";

interface Props {
  original: PhraseSelect;
}

export function EditPhrase({ original }: Props) {
  const [desc, setDesc] = useState<string>(original.desc);
  const [count, setCount] = useState<number>(original.count);

  return (
    <div className="flex w-full flex-col gap-8">
      <div>
        <label htmlFor="desc">Frase</label>
        <textarea
          maxLength={256}
          value={desc}
          id="desc"
          onChange={(e) => setDesc(e.target.value)}
          className="w-full max-w-md rounded bg-white px-4 py-2 text-black outline-none"
        />
      </div>

      <div>
        <label htmlFor="count">Conteggio</label>
        <input
          type="number"
          min={1}
          value={count}
          id="count"
          onChange={(e) => setCount(parseInt(e.target.value))}
          className="w-full max-w-md rounded bg-white px-4 py-2 text-black outline-none"
        />
      </div>

      <button className="bg-green-600 w-full p-2 rounded">Salva</button>
    </div>
  );
}
