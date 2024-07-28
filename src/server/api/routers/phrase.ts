import { eq, sql } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { phrases } from "~/server/db/schema";

export const phraseRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ desc: z.string().min(1).max(256) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(phrases).values({
        desc: input.desc,
      });
    }),

  increment: publicProcedure
    .input(z.object({ id: z.number(), count: z.number().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(phrases)
        .set({ count: sql`${phrases.count} +${input.count}` })
        .where(eq(phrases.id, input.id));
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.phrases.findMany({
      orderBy: (phrases, { desc }) => [desc(phrases.createdAt)],
    })
  }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    const phrase = await ctx.db.query.phrases.findFirst({
      orderBy: (phrases, { desc }) => [desc(phrases.createdAt)],
    });

    return phrase ?? null;
  }),
});