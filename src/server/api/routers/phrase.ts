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

  decrement: publicProcedure
    .input(z.object({ id: z.number(), number: z.number().min(1).nonnegative() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(phrases)
        .set({ count: sql`Max(${phrases.count} - ${input.number}, 1)` })
        .where(eq(phrases.id, input.id));
    }),

  increment: publicProcedure
    .input(z.object({ id: z.number(), number: z.number().min(1).nonnegative() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(phrases)
        .set({ count: sql`${phrases.count} + ${input.number}` })
        .where(eq(phrases.id, input.id));
    }),

  getAll: publicProcedure
    .input(z.object({ query: z.string().max(256).nullable() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.phrases.findMany({
        orderBy: [desc(phrases.count), desc(phrases.createdAt)],
        where: input.query
          ? like(phrases.desc, `%${input.query.split(" ").join(" %")}%`)
          : undefined,
      });
    }),

  get: publicProcedure
    .input(z.object({ id: z.number().nonnegative() }))
    .query(async ({ ctx, input }) => {
    return await ctx.db.query.phrases.findFirst({
      where: eq(phrases.id, input.id)
    })
  }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    const phrase = await ctx.db.query.phrases.findFirst({
      orderBy: (phrases, { desc }) => [desc(phrases.createdAt)],
    });

    return phrase ?? null;
  }),
});
