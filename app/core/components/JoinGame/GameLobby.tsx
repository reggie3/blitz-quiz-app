import { Box, Paper, Typography, useTheme } from "@material-ui/core"
import { useSocket } from "app/context/socketContext"
import { setGameInfo } from "app/redux/gameSlice"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import PlayerList from "../PlayerList/PlayerList"
import { GameInfo } from "myTypes"
import CopyLinkCard from "../CopyLinkCard/CopyLinkCard"
import JoinGameCard from "../JoinGameCard/JoinGameCard"
import { RootState } from "app/redux/store"
import HasJoinedGameCard from "./HasJoinedGameCard/HasJoinedGameCard"

interface Props {
  gameInstanceToJoin: string | string[] | undefined
}

const GameLobby = ({ gameInstanceToJoin }: Props) => {
  const { socket } = useSocket()
  const theme = useTheme()
  const dispatch = useDispatch()
  const [isInitialized, setIsInitialized] = useState(false)
  const [hasJoinedGame, setHasJoinedGame] = useState(false)
  const { gamePlayers } = useSelector((state: RootState) => state.game.gameInfo)

  useEffect(() => {
    if (!isInitialized && socket && gameInstanceToJoin) {
      socket.emit("join-game", gameInstanceToJoin, (message: GameInfo) => {
        dispatch(setGameInfo(message))
      })
      setIsInitialized(true)
    }
  }, [dispatch, gameInstanceToJoin, isInitialized, socket])

  useEffect(() => {
    if (socket && Object.keys(gamePlayers ?? {}).includes(socket.id)) {
      setHasJoinedGame(true)
    }
  }, [gamePlayers, socket])

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      style={{ marginLeft: theme.spacing(4), marginRight: theme.spacing(4) }}
    >
      <Box py={1}>
        <CopyLinkCard url={window.location.href} />
      </Box>
      {!hasJoinedGame && (
        <Box py={1}>
          <JoinGameCard gameInstanceToJoin={gameInstanceToJoin as string} />
        </Box>
      )}
      {hasJoinedGame && (
        <Box py={1}>
          <HasJoinedGameCard />
        </Box>
      )}

      <Box marginTop={2}>
        <PlayerList />
      </Box>
    </Box>
  )
}

export default GameLobby
