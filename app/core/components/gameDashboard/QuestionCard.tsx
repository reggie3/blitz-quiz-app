import { Box, Button, IconButton, makeStyles, Paper, Typography } from "@material-ui/core"
import { Routes, useMutation, useRouter } from "blitz"
import { Question } from "db"
import React, { useState } from "react"
import MySubTitle from "../myComponents/MyTopography/MySubTitle"
import DeleteIcon from "@material-ui/icons/Delete"
import deleteQuestion from "app/questions/mutations/deleteQuestion"
import MyAnswersList from "./MyAnswersList"
import EditIcon from "@material-ui/icons/Edit"
import ThumbUpIcon from "@material-ui/icons/ThumbUp"
import AddAnswerToQuestion from "../AddAnswerToQuestion/AddAnswerToQuestion"

interface Props {
  question: Question
  refetch: () => void
}

const QuestionCard = ({ question, refetch }: Props) => {
  const router = useRouter()
  const { button } = useStyles()

  const [deleteQuestionMutation] = useMutation(deleteQuestion)
  const [shouldShowAddAnswer, setShouldShowAddAnswer] = useState<boolean>(false)

  const { createdAt, text, id, updatedAt } = question

  const onClickDelete = async (id: string) => {
    if (window.confirm("This will be deleted")) {
      await deleteQuestionMutation({ id })
      refetch()
    }
  }

  const onClickEdit = (id: string) => {
    router.push(Routes.EditQuestionPage({ questionId: id }))
  }

  const onClickAnswers = () => {
    setShouldShowAddAnswer((prev) => !prev)
  }

  const onChangeCorrectAnswer = () => {}

  return (
    <Box key={id} mt={1}>
      <Paper>
        <Box display="flex" flexDirection="column" style={{ backgroundColor: "aliceblue" }}>
          <Box display="flex" flexDirection="row" justifyContent="space-between" padding={0.5}>
            <Box display="flex" flexDirection="column">
              {text && <Typography variant="body1">{`Question: ${text}`}</Typography>}
              <MySubTitle>Created: {createdAt.toLocaleDateString()}</MySubTitle>
              <MySubTitle>Updated: {updatedAt.toLocaleDateString()}</MySubTitle>
            </Box>
            <Box display="flex" alignItems="center">
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
                onClick={onClickAnswers}
                variant="contained"
                color="primary"
                size="small"
                startIcon={<ThumbUpIcon />}
                className={button}
              >
                Answers
              </Button>
              <IconButton onClick={() => onClickDelete(id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
          <AddAnswerToQuestion question={question} isVisible={shouldShowAddAnswer} />
          <Box
            marginLeft={4}
            marginRight={1}
            paddingTop={1}
            paddingBottom={1}
            hidden={!shouldShowAddAnswer}
          >
            <MyAnswersList questionId={question.id} shouldShowHeader={false} />
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}

export default QuestionCard

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}))
