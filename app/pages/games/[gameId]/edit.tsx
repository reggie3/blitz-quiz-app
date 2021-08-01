import { Suspense, useState } from "react"
import { Head, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import Alert from "@material-ui/lab/Alert"
import getGame from "app/games/queries/getGame"
import updateGame from "app/games/mutations/updateGame"
import { GameForm, FORM_ERROR } from "app/games/components/GameForm"
import { UpdateGame } from "app/validations"
import MyClickableLink from "app/core/components/myComponents/MyClickableLink"

export const EditGame = () => {
  const [shouldShowSaveSuccess, setShouldShowSaveSuccess] = useState<boolean>(false)
  const gameId = useParam("gameId", "string")
  const [game, { setQueryData }] = useQuery(
    getGame,
    { id: gameId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateGameMutation] = useMutation(updateGame)

  const onGameSaved = () => {
    setShouldShowSaveSuccess(true)
  }

  return (
    <>
      {shouldShowSaveSuccess && (
        <Alert
          onClose={() => {
            setShouldShowSaveSuccess(false)
          }}
        >
          Game saved successfully
        </Alert>
      )}

      <Head>
        <title>{`Edit "${game.name}"`}</title>
      </Head>

      <div>
        <h1>{`Edit "${game.name}"`}</h1>
        <pre>{JSON.stringify(game, null, 2)}</pre>

        <GameForm
          submitText="Update Game"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          schema={UpdateGame}
          initialValues={game}
          onSubmit={async (values) => {
            try {
              const updated = await updateGameMutation({
                // @ts-ignore id is specified more than once
                id: game.id,
                ...values,
              })
              await setQueryData(updated)

              onGameSaved()
            } catch (error) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditGamePage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditGame />
      </Suspense>

      <p>
        <MyClickableLink onClick={() => router.push("/")}>Games</MyClickableLink>
      </p>
    </div>
  )
}

EditGamePage.authenticate = true
EditGamePage.getLayout = (page) => <Layout>{page}</Layout>

export default EditGamePage
