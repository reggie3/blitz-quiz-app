import React from "react"
import { Question } from "db"
import { Box, makeStyles, Paper, Typography } from "@material-ui/core"

interface Props {
  question?: Question
}

const QuestionView = ({ question }: Props) => {
  const { paperContainer } = useStyles()

  if (!question) return null

  return (
    <Box display="flex" justifyContent="center" alignItems="center" px={2} paddingBottom={2}>
      <Paper className={paperContainer}>
        <Typography variant="h6" aria-label={question.text}>
          {question.text}
        </Typography>
      </Paper>
    </Box>
  )
}

export default QuestionView

const useStyles = makeStyles((theme) => ({
  paperContainer: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
  },
}))
