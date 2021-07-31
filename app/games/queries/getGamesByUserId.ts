import { Ctx, paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetGamesInput
  extends Pick<Prisma.GameFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetGamesInput, ctx: Ctx) => {
    const query = { userId: ctx.session.userId }
    const {
      items: games,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.game.count({ where: query }),
      query: (paginateArgs) => db.game.findMany({ ...paginateArgs, where: query, orderBy }),
    })

    return {
      games,
      nextPage,
      hasMore,
      count,
    }
  }
)
