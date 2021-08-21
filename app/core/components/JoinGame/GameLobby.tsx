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
import CountdownTimer from "app/core/components/CountdownTimer/CountdownTimer"
import { useRouter } from "blitz"

interface Props {
  gameInstanceToJoin: string | string[] | undefined
}

const GameLobby = ({ gameInstanceToJoin }: Props) => {
  const router = useRouter()

  const { socket } = useSocket()
  const theme = useTheme()
  const dispatch = useDispatch()
  const [isInitialized, setIsInitialized] = useState(false)
  const [hasJoinedGame, setHasJoinedGame] = useState(false)
  const [hasJoinGameError, setHasJoinGameError] = useState(false)
  const { gamePlayers, startTimeMillis } = useSelector((state: RootState) => state.game.gameInfo)

  useEffect(() => {
    if (!isInitialized && socket && gameInstanceToJoin) {
      socket.emit("join-game", gameInstanceToJoin, (message: GameInfo) => {
        if (!message) {
          setHasJoinGameError(true)
        } else {
          dispatch(setGameInfo(message))
        }
      })
      setIsInitialized(true)
    }
  }, [dispatch, gameInstanceToJoin, isInitialized, socket])

  useEffect(() => {
    if (socket && Object.keys(gamePlayers ?? {}).includes(socket.id)) {
      setHasJoinedGame(true)
    }
  }, [gamePlayers, socket])

  console.log("startTimeMillis", startTimeMillis)

  if (hasJoinGameError) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        style={{ marginLeft: theme.spacing(4), marginRight: theme.spacing(4) }}
      >
        <Typography variant="h6" color="textSecondary">
          Error joining game
        </Typography>
      </Box>
    )
  }

  const onCountdownComplete = () => {
    console.log("onCountdownComplete ***")
    router.push(`/play-game/${gameInstanceToJoin}`)
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      style={{ marginLeft: theme.spacing(4), marginRight: theme.spacing(4) }}
    >
      {startTimeMillis && (
        <Box my={2}>
          <CountdownTimer endTimeMillis={startTimeMillis} onComplete={onCountdownComplete} />
        </Box>
      )}
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
