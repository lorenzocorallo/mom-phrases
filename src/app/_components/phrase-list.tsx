import { api } from "~/trpc/server";
import { Phrase } from "./phrase";
import { CreatePhraseBtn } from "./create-phrase-btn";

interface Props {
  query?: string;
}

export async function PhraseList({ query }: Props) {
  const data = await api.phrase.get({ query: query ?? null });

  return (
    <div className="flex flex-1 w-full flex-col items-center justify-start gap-4">
      {data.length ? data.map((row) => (
        <Phrase id={row.id} desc={row.desc} count={row.count} key={row.id} />
      )) : <CreatePhraseBtn query={query} />}
    </div>
  );
}
