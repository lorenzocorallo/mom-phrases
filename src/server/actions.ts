'use server'

import { revalidatePath } from "next/cache";
import { api } from "~/trpc/server"
 
export async function incrementCount(id: number, number: number) {
  await api.phrase.increment({ id, number });
  revalidatePath("/");
}

export async function decrementCount(id: number, number: number) {
  await api.phrase.decrement({ id, number });
  revalidatePath("/");
}
