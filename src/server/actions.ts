'use server'

import { revalidatePath } from "next/cache";
import { api } from "~/trpc/server"
import type { PhraseSelect } from "./db/schema";

export async function incrementPhraseCount(id: number, number: number) {
  await api.phrase.increment({ id, number });
  revalidatePath("/");
  revalidatePath(`/phase/${id}`);
}

export async function decrementPhraseCount(id: number, number: number) {
  await api.phrase.decrement({ id, number });
  revalidatePath("/");
  revalidatePath(`/phase/${id}`);
}

export async function createPhrase(desc: string) {
  await api.phrase.create({ desc });
  revalidatePath("/");
}
 
export async function updatePhrase(phrase: PhraseSelect) {
  await api.phrase.update({ id: phrase.id, desc: phrase.desc, count: phrase.count });
  revalidatePath("/");
  revalidatePath(`/phase/${phrase.id}`);
}

export async function deletePhrase(id: number) {
  await api.phrase.delete({ id });
  revalidatePath("/");
  revalidatePath(`/phase/${id}`);
}
