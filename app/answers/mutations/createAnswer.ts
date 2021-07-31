import { Ctx, resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateAnswer = z.object({
  text: z.string(),
})

export default resolver.pipe(
  resolver.zod(CreateAnswer),
  resolver.authorize(),
  async (input, ctx: Ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const answer = await db.answer.create({ data: { ...input, userId: ctx.session.userId } })

    return answer
  }
)
