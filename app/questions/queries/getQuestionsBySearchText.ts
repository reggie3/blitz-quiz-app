import { resolver, NotFoundError, Ctx } from "blitz"
import db from "db"
import { z } from "zod"

const GetQuestionsBySearchText = z.object({
  // This accepts type of undefined, but is required at runtime
  text: z.string(),
})

export default resolver.pipe(
  resolver.zod(GetQuestionsBySearchText),
  resolver.authorize(),
  async ({ text }, ctx: Ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const question = await db.question.findMany({
      where: { AND: [{ userId: { equals: ctx.session.userId } }] },
    })

    if (!question) throw new NotFoundError()

    return question
  }
)
