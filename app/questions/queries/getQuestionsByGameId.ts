import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetQuestionsByGameIdInput
  extends Pick<Prisma.QuestionFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetQuestionsByGameIdInput) => {
    console.log("here ***************")
    const {
      items: questions,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.question.count({ where }),
      query: (paginateArgs) => db.question.findMany({ ...paginateArgs, where, orderBy }),
    })

    console.log("questions", questions)

    return {
      questions,
      nextPage,
      hasMore,
      count,
    }
  }
)
