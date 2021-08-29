import { Box } from "@material-ui/core"
import { RootState } from "app/redux/store"
import React from "react"
import { useSelector } from "react-redux"
import AnswerView from "./AnswerView"
import QuestionView from "./QuestionView"

interface Props {}

const QuestionWithAnswer = (props: Props) => {
  const questionToDisplay = useSelector(
    (state: RootState) =>
      state.game.gameInfo.questionsWithAnswers[state.game.gameInfo.questionsWithAnswers.length - 1]
  )
  return (
    <Box width="100%" data-testid="question-with-answer-root-container">
      <QuestionView question={questionToDisplay?.question} />
      <AnswerView answers={questionToDisplay?.answers} />
    </Box>
  )
}

export default QuestionWithAnswer
