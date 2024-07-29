import Link from "next/link";

interface Props {
  query?: string;
}

export function CreatePhraseBtn({query}: Props) {
  const queryStr = query ? `?query=${query}` : "";

  return (
    <Link href={`/create${queryStr}`}>
      <button className="flex w-full max-w-md items-center justify-between gap-4 rounded-md bg-slate-200/10 p-2">
        Crea nuova frase
      </button>
    </Link>
  );
}
