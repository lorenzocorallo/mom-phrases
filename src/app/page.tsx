import { Filter } from "./_components/filter";
import { Suspense } from "react";
import { PhraseList } from "./_components/phrase-list";

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  // void api.phrase.get.prefetch();

  const query = searchParams?.query;

  return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="contaier flex-1 flex flex-col items-center justify-start gap-8 px-4 py-16">
        <h1 className="text-2xl font-bold">Mom&apos;s Phrases</h1>
          <Filter />
          <Suspense key={query} fallback={<p>loading...</p>}>
            <PhraseList query={query} />
          </Suspense>
        </div>
      </main>
  );
}
