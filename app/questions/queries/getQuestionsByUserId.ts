import { resolver, NotFoundError, Ctx, paginate } from "blitz"
import db, { Prisma } from "db"

interface GetQuestionsByUserIdInput
  extends Pick<Prisma.QuestionFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetQuestionsByUserIdInput, ctx: Ctx) => {
    const query = { creatorId: ctx.session.userId }

    const {
      items: questions,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.question.count({ where: query }),
      query: (paginateArgs) => db.question.findMany({ ...paginateArgs, where: query, orderBy }),
    })

    return {
      questions,
      nextPage,
      hasMore,
      count,
    }
  }
)
