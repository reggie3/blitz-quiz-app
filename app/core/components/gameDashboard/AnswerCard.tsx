import { Box, Button, IconButton, makeStyles, Paper, Typography } from "@material-ui/core"
import { Routes, useMutation, useRouter } from "blitz"
import { Game, Answer } from "db"
import React, { Suspense } from "react"
import EditIcon from "@material-ui/icons/Edit"
import MySubTitle from "../myComponents/MyTopography/MySubTitle"
import DeleteIcon from "@material-ui/icons/Delete"
import deleteAnswer from "app/answers/mutations/deleteAnswer"

interface Props {
  answer: Answer
  refetch: () => void
}

const AnswerCard = ({ answer, refetch }: Props) => {
  const router = useRouter()
  const { button } = useStyles()

  const [deleteAnswerMutation] = useMutation(deleteAnswer)

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

  const onClickStart = (id: string) => {}

  return (
    <Box key={id} mt={1}>
      <Paper>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          padding={0.5}
          style={{ backgroundColor: "powderblue" }}
        >
          <Box display="flex" flexDirection="column">
            {text && <Typography variant="body1">{`Answer: ${text}`}</Typography>}
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
