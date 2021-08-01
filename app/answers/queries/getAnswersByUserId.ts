import { resolver, NotFoundError, Ctx, paginate } from "blitz"
import db, { Prisma } from "db"

interface GetAnswersByUserIdInput
  extends Pick<Prisma.AnswerFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetAnswersByUserIdInput, ctx: Ctx) => {
    const query = { creatorId: ctx.session.userId }
    const {
      items: answers,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.answer.count({ where: query }),
      query: (paginateArgs) => db.answer.findMany({ ...paginateArgs, where: query, orderBy }),
    })

    return {
      answers,
      nextPage,
      hasMore,
      count,
    }
  }
)
