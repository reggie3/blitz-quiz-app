import { Box, Paper, useTheme } from "@material-ui/core"
import { RootState } from "app/redux/store"
import React from "react"
import { useSelector } from "react-redux"
import CountdownTimer from "../CountdownTimer/CountdownTimer"
import CurrentRoundBadge from "../CurrentRoundBadge/CurrentRoundBadge"
import QuestionWithAnswer from "../QuestionWithAnswer/QuestionWithAnswer"
import ScoreCard from "../ScoreCard/ScoreCard"

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
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        my={2}
        border="1px dashed green"
        width="100%"
      >
        <CurrentRoundBadge />
        {questionEndTimeMillis && (
          <CountdownTimer endTimeMillis={questionEndTimeMillis} onComplete={onCountdownComplete} />
        )}
      </Box>
      <Box my={1} style={{ borderBottom: "1px solid gray", width: "100%" }} />
      <Box display="flex" flexDirection="row" width="100%">
        <Box flex={1}>
          <QuestionWithAnswer />
        </Box>
        <ScoreCard />
      </Box>
    </Box>
  )
}

export default PlayGame
