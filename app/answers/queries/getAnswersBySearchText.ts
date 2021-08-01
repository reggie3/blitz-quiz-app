import { resolver, NotFoundError, Ctx } from "blitz"
import db from "db"
import { z } from "zod"

const GetAnswersBySearchText = z.object({
  searchValue: z.string(),
})

export default resolver.pipe(
  resolver.zod(GetAnswersBySearchText),
  resolver.authorize(),
  async ({ searchValue }, ctx: Ctx) => {
    const answers = await db.answer.findMany({
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

    if (!answers) throw new NotFoundError()

    return answers
  }
)
