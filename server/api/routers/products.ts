import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { z } from "zod";

export const productsRouter = createTRPCRouter({
  getFirstProducts: publicProcedure.query(async () => {
    const products = await db.products.findMany({
      take: 3,
    });
    return products;
  }),
  getSpesificProduct: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({input}) => {
      const product = await db.products.findUnique({
        where: {id: input.id}
      });
      return product;
    }),
});
