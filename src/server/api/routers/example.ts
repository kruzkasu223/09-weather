import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "../trpc"

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `09/27 - ${input.text}`,
      }
    }),
})
