import { Box, IconButton, Paper, Typography } from "@material-ui/core"
import { Routes, useMutation, useRouter } from "blitz"
import { Game } from "db"
import React, { Suspense } from "react"
import MyButton from "../myComponents/MyButton"
import MySubTitle from "../myComponents/MyTopography/MySubTitle"
import DeleteIcon from "@material-ui/icons/Delete"
import deleteGame from "app/questions/mutations/deleteQuestion"

interface Props {
  game: Game
  refetch: () => void
}

const GameCard = ({ game, refetch }: Props) => {
  const router = useRouter()

  const { createdAt, description, id, name, updatedAt } = game
  const [deleteGameMutation] = useMutation(deleteGame)

  const onClickDelete = async (id: number) => {
    if (window.confirm("This will be deleted")) {
      await deleteGameMutation({ id })
      refetch()
    }
  }

  const onClickEdit = (id: number) => {
    router.push(Routes.EditGamePage({ gameId: id }))
  }

  const onClickStart = (id: number) => {}

  return (
    <Box key={id} mt={1}>
      <Paper>
        <Box display="flex" flexDirection="row" justifyContent="space-between" padding={0.5}>
          <Box display="flex" flexDirection="column">
            <Typography variant="h6">{name}</Typography>
            {description && <Typography variant="body1">{description}</Typography>}
            <MySubTitle>Created: {createdAt.toLocaleDateString()}</MySubTitle>
            <MySubTitle>Updated: {updatedAt.toLocaleDateString()}</MySubTitle>
          </Box>
          <Box display="flex" alignItems="center">
            <MyButton onClick={() => onClickStart(id)}>Start</MyButton>
            <Box width={1} />
            <MyButton onClick={() => onClickEdit(id)}>Edit</MyButton>
            <IconButton onClick={() => onClickDelete(id)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}

export default GameCard
