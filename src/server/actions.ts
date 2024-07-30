'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { api } from "~/trpc/server"

 
export async function incrementCount(id: number, number: number) {
  await api.phrase.increment({ id, number });
  revalidatePath("/");
  redirect("/");
}
