import { api } from "~/trpc/server";
import { Phrase } from "./phrase";
import { CreatePhraseBtn } from "./create-phrase-btn";

interface Props {
  query?: string;
}

export async function PhraseList({ query }: Props) {
  const data = await api.phrase.getAll({ query: query ?? null });

  return (
    <div className="flex w-full flex-1 flex-col items-center justify-start gap-4">
      {data.length ? (
        data.map((row) => (
          <Phrase id={row.id} desc={row.desc} count={row.count} key={row.id} />
        ))
      ) : (
        <CreatePhraseBtn query={query} />
      )}
    </div>
  );
}
