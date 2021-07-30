import db, { User } from "db"

export default async function getUserById({
  userId,
}: {
  userId: number | null
}): Promise<Partial<User> | null> {
  console.log("userId", userId)
  if (!userId) return null

  const user = await db.user.findFirst({
    where: { id: userId },
  })

  return user ?? null
}
