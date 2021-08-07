import { Box, Button, IconButton, makeStyles, Paper, Typography } from "@material-ui/core"
import { Routes, useMutation, useRouter } from "blitz"
import { Game } from "db"
import React, { useState } from "react"
import MySubTitle from "../myComponents/MyTopography/MySubTitle"
import DeleteIcon from "@material-ui/icons/Delete"
import deleteGame from "app/questions/mutations/deleteQuestion"
import EditIcon from "@material-ui/icons/Edit"
import PlayArrowIcon from "@material-ui/icons/PlayArrow"
import HelpIcon from "@material-ui/icons/Help"
import AddQuestionToGame from "../AddQuestionToGame/AddQuestionToGame"
import MyQuestionsList from "./MyQuestionsList"
import { useSocket } from "app/context/socketContext"
import { useDispatch } from "react-redux"
import { setGameInfo } from "app/redux/gameSlice"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { GameInfo } from "myTypes"

interface Props {
  game: Game
  refetch: () => void
}

const GameCard = ({ game, refetch }: Props) => {
  const router = useRouter()
  const { button } = useStyles()
  const { createdAt, description, id, name, updatedAt } = game
  const [deleteGameMutation] = useMutation(deleteGame)
  const [shouldShowAddQuestion, setShouldShowAddQuestion] = useState<boolean>(false)
  const { socket } = useSocket()
  const dispatch = useDispatch()
  const currentUser = useCurrentUser()

  const onClickDelete = async (id: string) => {
    if (window.confirm("This will be deleted")) {
      await deleteGameMutation({ id })
      refetch()
    }
  }

  const onClickEdit = (id: string) => {
    router.push(Routes.EditGamePage({ gameId: id }))
  }

  const onClickStart = (gameId: string) => {
    if (socket) {
      socket.connect()
      socket.emit("launch-game", gameId, currentUser?.id, (message: GameInfo) => {
        dispatch(setGameInfo(message))
      })
    }
  }

  const onClickQuestions = (g) => {
    setShouldShowAddQuestion((prev) => !prev)
  }

  return (
    <Box key={id} mt={1}>
      <Paper>
        <Box display="flex" flexDirection="column">
          <Box display="flex" flexDirection="row" justifyContent="space-between" padding={0.5}>
            <Box display="flex" flexDirection="column">
              <Typography variant="h6">{`Game: "${name}"`}</Typography>
              {description && <Typography variant="body1">{description}</Typography>}
              <MySubTitle>Created: {createdAt.toLocaleDateString()}</MySubTitle>
              <MySubTitle>Updated: {updatedAt.toLocaleDateString()}</MySubTitle>
            </Box>
            <Box display="flex" alignItems="center">
              <Button
                onClick={() => onClickStart(id)}
                size="small"
                variant="contained"
                color="primary"
                className={button}
                startIcon={<PlayArrowIcon />}
              >
                Start
              </Button>

              <Button
                onClick={() => onClickEdit(id)}
                size="small"
                variant="contained"
                color="primary"
                startIcon={<EditIcon />}
                className={button}
              >
                Edit
              </Button>
              <Button
                onClick={onClickQuestions}
                variant="contained"
                color="primary"
                size="small"
                startIcon={<HelpIcon />}
                className={button}
              >
                Questions
              </Button>
              <IconButton onClick={() => onClickDelete(id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
          <AddQuestionToGame game={game} isVisible={shouldShowAddQuestion} />
          <Box
            marginLeft={4}
            marginRight={1}
            paddingTop={1}
            paddingBottom={1}
            hidden={!shouldShowAddQuestion}
          >
            <MyQuestionsList gameId={game.id} shouldShowHeader={false} />
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}

export default GameCard

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}))
