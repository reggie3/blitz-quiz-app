import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

export const UpdateQuestion = z.object({
  id: z.string(),
  text: z.string(),
  correctAnswerId: z.string().optional(),
  gameIds: z.string().array().optional(),
  wrongAnswerIds: z.string().array().optional(),
})

export default resolver.pipe(
  resolver.zod(UpdateQuestion),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const question = await db.question.update({ where: { id }, data })

    return question
  }
)
