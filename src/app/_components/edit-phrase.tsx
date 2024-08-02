"use client";

import { Minus, Plus, Save, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { deletePhrase, restorePhrase, updatePhrase } from "~/server/actions";
import type { PhraseSelect } from "~/server/db/schema";

interface Props {
  original: PhraseSelect;
}

export function EditPhrase({ original }: Props) {
  const [desc, setDesc] = useState<string>(original.desc);
  const [prevCount, setPrevCount] = useState<string | undefined>();
  const [count, setCount] = useState<string>(original.count.toString());

  const router = useRouter();

  const modified = Number(count) !== original.count || desc !== original.desc;

  function handleCountChange(newCount: string) {
    setCount(newCount);
  }

  function handleFixCount() {
    const num = Number(count);
    const fallback = prevCount ?? original.count.toString();
    if (Number.isNaN(num) || num < 1) return setCount(fallback);
    setPrevCount(count);
  }

  async function handleSave() {
    await updatePhrase({ ...original, desc, count: Number(count) });
  }

  async function handleDelete() {
    if (confirm("Sei sicuro di voler eliminare questa frase?")) {
      const toastId = toast.loading("Cancellando la frase...");
      await deletePhrase(original.id);

      toast.success("Frase cancellata con successo", {
        id: toastId,
        duration: 10_000,
        richColors: true,
        action: {
          label: "Annulla",
          onClick: () => {
            toast.promise(restorePhrase(original.id), {
              loading: "Ripristinando la frase eliminata",
              success: "Frase ripristinata con successo",
              richColors: true,
            });
          },
        },
      });

      router.push("/");
    }
  }

  return (
    <div className="flex w-full flex-col gap-8">
      <div>
        <label htmlFor="desc">Frase</label>
        <textarea
          maxLength={256}
          value={desc}
          id="desc"
          onChange={(e) => setDesc(e.target.value)}
          className="w-full max-w-md rounded bg-white/20 px-4 py-2 text-white outline-none"
        />
      </div>

      <div>
        <label htmlFor="count">Conteggio</label>
        <div className="flex gap-1">
          <button
            disabled={Number(count) <= 10}
            className="flex w-12 items-center justify-center rounded bg-red-600/60 text-white transition-colors hover:bg-red-600/80 disabled:bg-slate-700/60 disabled:text-slate-400"
            onClick={() => {
              handleCountChange((Number(count) - 10).toString());
              handleFixCount();
            }}
          >
            <Minus size={16} /> <Minus size={16} />
          </button>
          <button
            disabled={Number(count) <= 1}
            className="flex w-12 items-center justify-center rounded bg-red-600/60 text-white transition-colors hover:bg-red-600/80 disabled:bg-slate-700/60 disabled:text-slate-400"
            onClick={() => {
              handleCountChange((Number(count) - 1).toString());
              handleFixCount();
            }}
          >
            <Minus size={16} />
          </button>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={count}
            id="count"
            onChange={(e) => handleCountChange(e.target.value)}
            onBlur={handleFixCount}
            className="w-24 rounded bg-white/20 px-4 py-2 text-center text-white outline-none"
          />
          <button
            className="flex w-12 items-center justify-center rounded bg-green-600/60 text-white hover:bg-green-600/80"
            onClick={() => {
              handleCountChange((Number(count) + 1).toString());
              handleFixCount();
            }}
          >
            <Plus size={16} />
          </button>
          <button
            className="flex w-12 items-center justify-center rounded bg-green-600/60 text-white hover:bg-green-600/80"
            onClick={() => {
              handleCountChange((Number(count) + 10).toString());
              handleFixCount();
            }}
          >
            <Plus size={16} /> <Plus size={16} />
          </button>
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={!modified}
        className="flex w-full items-center justify-center gap-2 rounded bg-green-600 p-2 transition-colors disabled:bg-slate-700/60 disabled:text-slate-400"
      >
        <Save size={18} /> Salva
      </button>
      <button
        onClick={handleDelete}
        className="flex w-full items-center justify-center gap-2 rounded bg-red-600 p-2 transition-colors"
      >
        <Trash size={18} /> Elimina
      </button>
    </div>
  );
}
