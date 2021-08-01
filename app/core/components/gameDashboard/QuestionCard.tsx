import { Box, IconButton, Paper, Typography } from "@material-ui/core"
import { Routes, useMutation, useRouter } from "blitz"
import { Game, Question } from "db"
import React, { Suspense } from "react"
import MyButton from "../myComponents/MyButton"
import MySubTitle from "../myComponents/MyTopography/MySubTitle"
import DeleteIcon from "@material-ui/icons/Delete"
import deleteQuestion from "app/questions/mutations/deleteQuestion"

interface Props {
  question: Question
  refetch: () => void
}

const QuestionCard = ({ question, refetch }: Props) => {
  const router = useRouter()
  const [deleteQuestionMutation] = useMutation(deleteQuestion)

  const { createdAt, text, id, updatedAt } = question

  const onClickDelete = async (id: number) => {
    if (window.confirm("This will be deleted")) {
      await deleteQuestionMutation({ id })
      refetch()
    }
  }

  const onClickEdit = (id: number) => {
    router.push(Routes.EditQuestionPage({ questionId: id }))
  }

  const onClickStart = (id: number) => {}

  return (
    <Box key={id} mt={1}>
      <Paper>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          padding={0.5}
          borderBottom="1px solid lightgray"
        >
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

export default QuestionCard
