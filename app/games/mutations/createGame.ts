import { Ctx, resolver } from "blitz"
import db from "db"
import { z } from "zod"

export const CreateGame = z.object({
  name: z.string(),
  description: z.string().optional(),
})

export default resolver.pipe(
  resolver.zod(CreateGame),
  resolver.authorize(),
  async (input, ctx: Ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const game = await db.game.create({ data: { ...input, creatorId: ctx.session.userId } })

    return game
  }
)
