import { Ctx, resolver } from "blitz"
import db from "db"
import { z } from "zod"

export const CreateGame = z.object({
  name: z.string(),
  description: z.string(),
})

export default resolver.pipe(
  resolver.zod(CreateGame),
  resolver.authorize(),
  async (input, ctx: Ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const game = await db.game.create({ data: { ...input, userId: ctx.session.userId } })

    return game
  }
)
