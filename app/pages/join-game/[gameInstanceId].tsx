import { Head, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useParams } from "blitz"
import React, { Suspense } from "react"
import GameLobby from "app/core/components/JoinGame/GameLobby"
import { SocketProvider } from "app/context/socketContext"

const JoinGamePage: BlitzPage = () => {
  const { gameInstanceId } = useParams()

  return (
    <>
      <Head>
        <title>Join Game</title>
      </Head>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <SocketProvider>
            {gameInstanceId && (
              <GameLobby
                gameInstanceId={Array.isArray(gameInstanceId) ? gameInstanceId[0] : gameInstanceId}
              />
            )}
          </SocketProvider>
        </Suspense>
      </div>
    </>
  )
}

JoinGamePage.authenticate = false
JoinGamePage.getLayout = (page) => <Layout>{page}</Layout>

export default JoinGamePage
