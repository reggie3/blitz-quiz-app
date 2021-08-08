import { Box, useTheme } from "@material-ui/core"
import { useSocket } from "app/context/socketContext"
import { setGameInfo } from "app/redux/gameSlice"
import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useState } from "react"
import PlayerList from "../PlayerList/PlayerList"
import { GameInfo } from "myTypes"
import CopyLinkCard from "../CopyLinkCard/CopyLinkCard"
import JoinGameCard from "../JoinGameCard/JoinGameCard"

interface Props {
  gameInstanceToJoin: string | string[] | undefined
}

const GameLobby = ({ gameInstanceToJoin }: Props) => {
  const { socket } = useSocket()
  const theme = useTheme()
  const dispatch = useDispatch()
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (!isInitialized && socket && gameInstanceToJoin) {
      socket.emit("join-game", gameInstanceToJoin, (message: GameInfo) => {
        dispatch(setGameInfo(message))
      })
      setIsInitialized(true)
    }
  }, [dispatch, gameInstanceToJoin, isInitialized, socket])

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
      <Box py={1}>
        <JoinGameCard gameInstanceToJoin={gameInstanceToJoin as string} />
      </Box>

      <Box marginTop={2}>
        <PlayerList />
      </Box>
    </Box>
  )
}

export default GameLobby
