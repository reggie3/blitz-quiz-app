import { resolver, NotFoundError, Ctx } from "blitz"
import db from "db"
import { z } from "zod"

const GetQuestionsBySearchText = z.object({
  // This accepts type of undefined, but is required at runtime
  searchValue: z.string(),
})

export default resolver.pipe(
  resolver.zod(GetQuestionsBySearchText),
  resolver.authorize(),
  async ({ searchValue }, ctx: Ctx) => {
    const questions = await db.question.findMany({
      where: {
        AND: [
          { creatorId: { equals: ctx.session.userId } },
          {
            text: {
              contains: searchValue,
            },
          },
        ],
      },
    })

    if (!questions) throw new NotFoundError()

    return questions
  }
)
