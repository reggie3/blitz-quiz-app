import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getGame from "app/games/queries/getGame"
import deleteGame from "app/games/mutations/deleteGame"
import getUserById from "app/users/queries/getUserById"

export const Game = () => {
  const router = useRouter()
  const gameId = useParam("gameId", "string")
  const [deleteGameMutation] = useMutation(deleteGame)

  const [game] = useQuery(getGame, { id: gameId })
  const [user] = useQuery(getUserById, { userId: game.creatorId })

  const createdByText = user?.name ?? user?.email ?? "Unknown"
  return (
    <>
      <Head>
        <title>Game {game.id}</title>
      </Head>

      <div>
        <h1>{game.name}</h1>
        {createdByText && <p>Created by {createdByText}</p>}
        <pre>{JSON.stringify(game, null, 2)}</pre>

        <Link href={Routes.EditGamePage({ gameId: game.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteGameMutation({ id: game.id })
              router.push(Routes.GamesPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowGamePage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.GamesPage()}>
          <a>Games</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Game />
      </Suspense>
    </div>
  )
}

ShowGamePage.authenticate = true
ShowGamePage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowGamePage
