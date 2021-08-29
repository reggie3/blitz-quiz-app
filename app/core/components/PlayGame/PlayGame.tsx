import { Box, Paper, useTheme } from "@material-ui/core"
import { RootState } from "app/redux/store"
import React from "react"
import { useSelector } from "react-redux"
import CountdownTimer from "../CountdownTimer/CountdownTimer"
import QuestionWithAnswer from "../QuestionWithAnswer/QuestionWithAnswer"

const PlayGame = () => {
  const { gameInfo } = useSelector((state: RootState) => state.game)
  const theme = useTheme()

  const questionEndTimeMillis =
    gameInfo.questionsWithAnswers[gameInfo.questionsWithAnswers.length - 1]?.endTimeMillis

  const onCountdownComplete = () => {
    // TODO: show some sort of indication that the countdown is complete
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      mx={2}
      data-testid="play-game-root-container"
      padding={1}
    >
      <Box my={2} data-testid="play-game-countdown-timer-container">
        {questionEndTimeMillis && (
          <CountdownTimer endTimeMillis={questionEndTimeMillis} onComplete={onCountdownComplete} />
        )}
      </Box>
      <QuestionWithAnswer />
    </Box>
  )
}

export default PlayGame
