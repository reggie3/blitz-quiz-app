import { Ctx, resolver } from "blitz"
import db from "db"
import { z } from "zod"

export const CreateQuestion = z.object({
  text: z.string(),
  gameIds: z.string().array().optional(),
  creatorId: z.string().optional(),
})

export default resolver.pipe(
  resolver.zod(CreateQuestion),
  resolver.authorize(),
  async (input, ctx: Ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const question = await db.question.create({
      data: { ...input, creatorId: ctx.session.userId },
    })

    return question
  }
)
