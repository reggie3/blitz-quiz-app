import React, { useState } from "react"
import { Answer } from "db"
import { Box, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core"
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab"

interface Props {
  answers?: Answer[]
}

const AnswerView = ({ answers }: Props) => {
  const { answerGrid, toggleButton, toggleButtonGroup } = useStyles()
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])

  const onChangeAnswer = (_event, newAnswers: string[]) => {
    setSelectedAnswers(newAnswers)
  }

  if (!answers) return null

  return (
    <Box className={answerGrid}>
      {answers.map((answer) => (
        <Box key={answer.id} display="flex" justifyContent="center" alignItems="center">
          <ToggleButtonGroup
            className={toggleButtonGroup}
            value={selectedAnswers}
            onChange={onChangeAnswer}
            aria-label="answers"
          >
            <ToggleButton className={toggleButton} value={answer.id}>
              <Typography variant="body1" aria-label={answer.text}>
                {answer.text}
              </Typography>
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      ))}
    </Box>
  )
}

export default AnswerView

const useStyles = makeStyles((theme) => ({
  answerGrid: {
    display: "grid",
    gridTemplateColumns: `repeat(2, 1fr)`,
    gap: theme.spacing(2),
  },
  toggleButton: {
    width: "100%",
  },
  toggleButtonGroup: {
    width: "100%",
  },
}))
