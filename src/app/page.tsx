import { Filter } from "./_components/filter";
import { Suspense } from "react";
import { PhraseList } from "./_components/phrase-list";
import { PhraseListSkeleton } from "./_components/phrase-list-skeleton";

export const dynamic = "force-dynamic";

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
    <div className="contaier flex w-full flex-1 flex-col items-center justify-start gap-8 px-4 py-16">
      <h1 className="text-2xl font-bold">Mom&apos;s Phrases</h1>
      <Filter />
      <Suspense key={query} fallback={<PhraseListSkeleton />}>
        <PhraseList query={query} />
      </Suspense>
    </div>
  );
}
