import { Box, Button, IconButton, makeStyles, Paper, Typography } from "@material-ui/core"
import { Routes, useMutation, useQuery, useRouter } from "blitz"
import { Answer } from "db"
import React, { MouseEvent } from "react"
import EditIcon from "@material-ui/icons/Edit"
import MySubTitle from "../myComponents/MyTopography/MySubTitle"
import DeleteIcon from "@material-ui/icons/Delete"
import deleteAnswer from "app/answers/mutations/deleteAnswer"
import { ToggleButtonGroup, ToggleButton } from "@material-ui/lab"
import getQuestion from "app/questions/queries/getQuestion"
import updateQuestion from "app/questions/mutations/updateQuestion"
import { invalidateQuery } from "blitz"
import getQuestions from "app/questions/queries/getQuestions"

interface Props {
  answer: Answer
  questionId?: string
  refetch: () => void
}

const AnswerCard = ({ answer, questionId, refetch }: Props) => {
  const router = useRouter()
  const { button } = useStyles()

  const [deleteAnswerMutation] = useMutation(deleteAnswer)
  const [question, { setQueryData }] = useQuery(
    getQuestion,
    { id: questionId },
    {
      enabled: Boolean(questionId),
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateQuestionMutation] = useMutation(updateQuestion)

  const { createdAt, text, id, updatedAt } = answer

  const onClickDelete = async (id: string) => {
    if (window.confirm("This will be deleted")) {
      await deleteAnswerMutation({ id })
      refetch()
    }
  }

  const onClickEdit = (id: string) => {
    router.push(Routes.EditAnswerPage({ answerId: id }))
  }

  const onChangeToggle = async (event: MouseEvent, newValue: "correct" | "incorrect") => {
    if (question) {
      const updatedCorrectAnswers =
        newValue === "correct"
          ? [...question.correctAnswerIds, answer.id]
          : question.correctAnswerIds.filter((answerId) => answerId !== answer.id)

      const updatedQuestion = await updateQuestionMutation({
        // @ts-ignore id is specified more than once
        id: question.id,
        correctAnswerIds: updatedCorrectAnswers,
      })
      setQueryData(updatedQuestion)
    }
  }

  const toggleValue = question?.correctAnswerIds.includes(answer.id) ? "correct" : "incorrect"
  console.log("toggleValue", toggleValue)

  return (
    <Box key={id} mt={1}>
      <Paper>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          padding={0.5}
          style={{ backgroundColor: "lightcyan" }}
        >
          <Box display="flex" flexDirection="column">
            {text && <Typography variant="body1">{`Answer: ${text}`}</Typography>}
            <MySubTitle>Created: {createdAt.toLocaleDateString()}</MySubTitle>
            <MySubTitle>Updated: {updatedAt.toLocaleDateString()}</MySubTitle>
          </Box>
          <Box display="flex" alignItems="center">
            {Boolean(questionId) && (
              <ToggleButtonGroup
                value={question?.correctAnswerIds.includes(answer.id) ? "correct" : "incorrect"}
                exclusive
                onChange={onChangeToggle}
                aria-label="text formatting"
                size="small"
              >
                <ToggleButton
                  value="correct"
                  aria-label="correct answer"
                  style={{
                    color: toggleValue === "correct" ? "white" : "gray",
                    backgroundColor: toggleValue === "correct" ? "limegreen" : "white",
                  }}
                >
                  Correct
                </ToggleButton>
                <ToggleButton
                  value="incorrect"
                  aria-label="incorrect answer"
                  style={{
                    color: toggleValue === "incorrect" ? "white" : "gray",
                    backgroundColor: toggleValue === "incorrect" ? "tomato" : "white",
                  }}
                >
                  Incorrect
                </ToggleButton>
              </ToggleButtonGroup>
            )}
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

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}))
