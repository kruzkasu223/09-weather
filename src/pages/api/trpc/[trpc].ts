import { createNextApiHandler } from "@trpc/server/adapters/next"
import { env } from "../../../env.mjs"
import { createTRPCContext } from "../../../server/api/trpc"
import { appRouter } from "../../../server/api/root"
const ONE_DAY_IN_SECONDS = 60 * 60 * 24

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
          )
        }
      : undefined,
  responseMeta: ({ type, errors }) => {
    const allOk = errors.length === 0
    const isQuery = type === "query"
    if (allOk && isQuery) {
      return {
        headers: {
          "cache-control": `s-maxage=${ONE_DAY_IN_SECONDS}, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`,
        },
      }
    }
    return {}
  },
})
