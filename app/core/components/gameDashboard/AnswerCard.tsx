import { Box, IconButton, Paper, Typography } from "@material-ui/core"
import { Routes, useMutation, useRouter } from "blitz"
import { Game, Answer } from "db"
import React, { Suspense } from "react"
import MyButton from "../myComponents/MyButton"
import MySubTitle from "../myComponents/MyTopography/MySubTitle"
import DeleteIcon from "@material-ui/icons/Delete"
import deleteAnswer from "app/answers/mutations/deleteAnswer"

interface Props {
  answer: Answer
  refetch: () => void
}

const AnswerCard = ({ answer, refetch }: Props) => {
  const router = useRouter()
  const [deleteAnswerMutation] = useMutation(deleteAnswer)

  const { createdAt, text, id, updatedAt } = answer

  const onClickDelete = async (id: number) => {
    if (window.confirm("This will be deleted")) {
      await deleteAnswerMutation({ id })
      refetch()
    }
  }

  const onClickEdit = (id: number) => {
    router.push(Routes.EditAnswerPage({ answerId: id }))
  }

  const onClickStart = (id: number) => {}

  return (
    <Box key={id} mt={1}>
      <Paper>
        <Box display="flex" flexDirection="row" justifyContent="space-between" padding={0.5}>
          <Box display="flex" flexDirection="column">
            {text && <Typography variant="body1">{text}</Typography>}
            <MySubTitle>Created: {createdAt.toLocaleDateString()}</MySubTitle>
            <MySubTitle>Updated: {updatedAt.toLocaleDateString()}</MySubTitle>
          </Box>
          <Box display="flex" alignItems="center">
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

export default AnswerCard
