import { Ctx, resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateAnswer = z.object({
  text: z.string(),
  questionIds: z.string().array().optional(),
})

export default resolver.pipe(
  resolver.zod(CreateAnswer),
  resolver.authorize(),
  async (input, ctx: Ctx) => {
    console.log("answer", input)
    const answer = await db.answer.create({ data: { ...input, creatorId: ctx.session.userId } })

    return answer
  }
)
