import { Phrase } from "~/app/_components/phrase";
import { api, HydrateClient } from "~/trpc/server";
import { Filter } from "./_components/filter";

export default async function Home() {
  void api.phrase.getAll.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 py-16">
          <Filter />
          <div className="flex w-full flex-col items-center justify-start gap-4">
            <Phrase desc={"I miracoli esistono"} count={20} />
            <Phrase desc={"I miracoli esistono"} count={20} />
            <Phrase desc={"I miracoli esistono"} count={20} />
            <Phrase desc={"I miracoli esistono"} count={20} />
            <Phrase desc={"I miracoli esistono"} count={20} />
            <Phrase desc={"I miracoli esistono"} count={20} />
            <Phrase desc={"I miracoli esistono"} count={20} />
            <Phrase desc={"I miracoli esistono"} count={20} />
            <Phrase desc={"I miracoli esistono"} count={20} />
            <Phrase desc={"I miracoli esistono"} count={20} />
            <Phrase desc={"I miracoli esistono"} count={20} />
            <Phrase desc={"I miracoli esistono"} count={20} />
            <Phrase desc={"I miracoli esistono"} count={20} />
            <Phrase desc={"I miracoli esistono"} count={20} />
            <Phrase desc={"I miracoli esistono"} count={20} />
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
