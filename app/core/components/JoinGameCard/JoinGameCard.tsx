import { Box, Button, Paper, TextField } from "@material-ui/core"
import { useSocket } from "app/context/socketContext"
import { setGameInfo } from "app/redux/gameSlice"
import { GameInfo } from "myTypes"
import React, { ChangeEvent } from "react"
import { useDispatch } from "react-redux"

interface Props {
  gameInstanceToJoin: string
}

const JoinGameCard = ({ gameInstanceToJoin }: Props) => {
  const [playerName, setPlayerName] = React.useState("")
  const { socket } = useSocket()
  const dispatch = useDispatch()

  const onClickJoin = () => {
    if (socket) {
      socket.emit("add-name", gameInstanceToJoin, playerName, (message: GameInfo) => {
        dispatch(setGameInfo(message))
      })
    }
  }

  const onChangePlayerName = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPlayerName(event.target.value)
  }

  return (
    <Paper style={{ width: "35ch" }}>
      <Box
        display="flex"
        flexDirection="column"
        padding={1}
        justifyContent="center"
        alignItems="center"
      >
        <TextField
          variant="standard"
          fullWidth
          label="player name"
          onChange={onChangePlayerName}
          value={playerName}
        />
        <Box paddingTop={2}>
          <Button onClick={onClickJoin} variant="contained" color="primary" disabled={!playerName}>
            Join Game
          </Button>
        </Box>
      </Box>
    </Paper>
  )
}

export default JoinGameCard
