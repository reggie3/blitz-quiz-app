import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

export const UpdateGame = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateGame),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const game = await db.game.update({ where: { id }, data })

    return game
  }
)
