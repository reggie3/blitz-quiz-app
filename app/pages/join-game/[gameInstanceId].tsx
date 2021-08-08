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
        <p>Join Game {gameInstanceId}</p>
        <Suspense fallback={<div>Loading...</div>}>
          <SocketProvider>
            <GameLobby gameInstanceToJoin={gameInstanceId} />
          </SocketProvider>
        </Suspense>
      </div>
    </>
  )
}

JoinGamePage.authenticate = false
JoinGamePage.getLayout = (page) => <Layout>{page}</Layout>

export default JoinGamePage
