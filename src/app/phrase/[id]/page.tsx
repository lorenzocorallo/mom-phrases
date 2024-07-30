import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { EditPhrase } from "~/app/_components/edit-phrase";
import { api } from "~/trpc/server";

interface Props {
  params: {
    id: string;
  }
}

export default async function Page({ params }: Props) {
  if (Number.isNaN(Number(params.id))) return redirect("/");

  const phrase = await api.phrase.get({ id: Number(params.id) });
  if (!phrase) return redirect("/");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="contaier flex flex-1 flex-col items-center justify-start gap-8 px-4 py-16">
        <Link href="/" className="underline self-start flex items-center justify-center"><ArrowLeft size={18} /> Homepage</Link>
        <h1 className="text-2xl font-bold">Phrase id: {params.id}</h1>
        <EditPhrase original={phrase} />
      </div>
    </main>
  );
}
