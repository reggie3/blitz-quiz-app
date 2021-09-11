import db, { User } from "db"

export default async function getUserById({
  userId,
}: {
  userId: string | null
}): Promise<Partial<User> | null> {
  if (!userId) return null

  const user = await db.user.findFirst({
    where: { id: userId },
  })

  return user ?? null
}
