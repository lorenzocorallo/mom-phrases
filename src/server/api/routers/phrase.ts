import { desc, eq, like, sql } from "drizzle-orm";
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

  get: publicProcedure
    .input(z.object({ query: z.string().max(256).nullable() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.phrases.findMany({
        orderBy:  [desc(phrases.count), desc(phrases.createdAt)],
        where: input.query
          ? like(phrases.desc, `%${input.query.split(" ").join(" %")}%`)
          : undefined,
      });
    }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    const phrase = await ctx.db.query.phrases.findFirst({
      orderBy: (phrases, { desc }) => [desc(phrases.createdAt)],
    });

    return phrase ?? null;
  }),
});
