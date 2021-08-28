import React, { useState } from "react"
import { Answer } from "db"
import { Box, Button, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core"
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked"
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked"

const StartIcon = ({
  answerId,
  selectedAnswers,
}: {
  answerId: string
  selectedAnswers: string[]
}) => {
  if (selectedAnswers.includes(answerId)) {
    return <RadioButtonCheckedIcon />
  }
  return <RadioButtonUncheckedIcon />
}
interface Props {
  answers?: Answer[]
}

const AnswerView = ({ answers }: Props) => {
  const { answerGrid, toggleButton, toggleButtonGroup } = useStyles()
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])

  const onClickAnswer = (answerId: string) => {
    if (selectedAnswers.includes(answerId)) {
      setSelectedAnswers((prevSelectedAnswerIds) =>
        prevSelectedAnswerIds.filter((prevSelectedAnswerId) => prevSelectedAnswerId !== answerId)
      )
    } else {
      setSelectedAnswers((prev) => [...prev, answerId])
    }
  }

  if (!answers) return null

  return (
    <Box className={answerGrid}>
      {answers.map((answer) => (
        <Button
          key={answer.id}
          value={answer.id}
          onClick={() => onClickAnswer(answer.id)}
          variant="contained"
        >
          <Box display="flex" flexDirection="row" width="100%">
            <StartIcon answerId={answer.id} selectedAnswers={selectedAnswers} />
            <Box flex={1}>
              <Typography variant="body1" aria-label={answer.text}>
                {answer.text}
              </Typography>
            </Box>
          </Box>
        </Button>
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
