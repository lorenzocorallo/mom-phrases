import { api } from "~/trpc/server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="contaier flex flex-1 flex-col items-center justify-start gap-8 px-4 py-16">
        <h1 className="text-2xl font-bold">Crea una nuova Phrase</h1>
        <form action={mutate} className="flex flex-col gap-2 items-center">
          <input type="text" className="bg-white/20 p-2 rounded" maxLength={256} defaultValue={query} name="desc" />
          <button className="bg-green-800 w-full p-2 rounded" type="submit">Crea</button>
        </form>
      </div>
    </main>
  );
}
