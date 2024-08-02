import { api } from "~/trpc/server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const FormSchema = z.object({
  desc: z.string().max(256),
});

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query;

  const mutate = async (formData: FormData) => {
    "use server";
    const { desc } = FormSchema.parse({
      desc: formData.get("desc"),
    });

    await api.phrase.create({ desc });
    revalidatePath("/");
    redirect("/");
  };

  return (
    <div className="contaier flex flex-1 flex-col items-center justify-start gap-8 px-4 py-16">
      <Link
        href="/"
        className="flex items-center justify-center self-start underline"
      >
        <ArrowLeft size={18} /> Homepage
      </Link>
      <h1 className="text-2xl font-bold">Crea una nuova Phrase</h1>
      <form action={mutate} className="flex flex-col items-center gap-2">
        <input
          type="text"
          className="rounded bg-white/20 p-2"
          maxLength={256}
          defaultValue={query}
          name="desc"
        />
        <button className="w-full rounded bg-green-800 p-2" type="submit">
          Crea
        </button>
      </form>
    </div>
  );
}
