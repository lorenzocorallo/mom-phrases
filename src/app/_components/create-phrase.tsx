"use client";

import { useState } from "react";

import { api } from "~/trpc/react";

export function CreatePhrase() {
  const [desc, setDesc] = useState("");
  const utils = api.useUtils();
  const createPhrase = api.phrase.create.useMutation({
    onSuccess: async () => {
      await utils.phrase.invalidate();
      setDesc("");
    },
  });

  return (
    <div className="flex w-full max-w-xs items-center justify-between gap-4 rounded bg-slate-200/10 p-2">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPhrase.mutate({ desc });
        }}
        className="flex gap-2"
      >
        <input
          type="text"
          placeholder="Frase"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full rounded px-4 py-2 text-black"
        />
        <button
          type="submit"
          className="rounded-full bg-white/10 px-6 py-3 font-semibold transition hover:bg-white/20"
          disabled={createPhrase.isPending}
        >
          {createPhrase.isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
