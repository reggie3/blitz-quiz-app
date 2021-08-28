import { Head, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useParams } from "blitz"
import React, { Suspense, useEffect } from "react"
import { SocketProvider, useSocket } from "app/context/socketContext"
import { Typography } from "@material-ui/core"
import GameLobby from "app/core/components/JoinGame/GameLobby"
import PlayGame from "app/core/components/PlayGame/PlayGame"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "app/redux/store"
import { GamePlayViews } from "app/redux/uiSlice"
import { setGameInfo, setGameInstanceId } from "app/redux/gameSlice"
import { GameInfo } from "myTypes"

const InitializeGameInfo = ({
  gameInstanceId,
}: {
  gameInstanceId: string | string[] | undefined
}) => {
  const gameInfo = useSelector((state: RootState) => state.game.gameInfo)

  const dispatch = useDispatch()
  const instanceId = Array.isArray(gameInstanceId) ? gameInstanceId[0] : gameInstanceId

  const { socket } = useSocket()

  !gameInfo.gameId &&
    socket &&
    instanceId &&
    socket.emit("get-game-info", instanceId, (message: GameInfo) => {
      dispatch(setGameInfo(message))
    })
  return <></>
}
const PlayGamePage: BlitzPage = () => {
  const { gameInstanceId } = useParams()
  const { gamePlayView } = useSelector((state: RootState) => state.ui)

  return (
    <>
      <Head>
        <title>Play Game</title>
      </Head>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <SocketProvider>
            <InitializeGameInfo gameInstanceId={gameInstanceId} />
            {gamePlayView === GamePlayViews.JOIN_GAME && (
              <GameLobby gameInstanceId={gameInstanceId as string} />
            )}
            {gamePlayView === GamePlayViews.PLAY_GAME && <PlayGame />}
          </SocketProvider>
        </Suspense>
      </div>
    </>
  )
}

PlayGamePage.authenticate = false
PlayGamePage.getLayout = (page) => <Layout>{page}</Layout>

export default PlayGamePage
