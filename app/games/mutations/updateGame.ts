import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

export const UpdateGame = z.object({
  id: z.string(),
  name: z.string().optional(),
  description: z.string().optional(),
  questionIds: z.string().array().optional(),
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
