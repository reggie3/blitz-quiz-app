import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

export const UpdateAnswer = z.object({
  id: z.string(),
  text: z.string().optional(),
  questionIds: z.string().array().optional(),
  wrongQuestionIds: z.string().array().optional(),
})

export default resolver.pipe(
  resolver.zod(UpdateAnswer),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const answer = await db.answer.update({ where: { id }, data })

    return answer
  }
)
