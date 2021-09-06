import { Box, Paper, Typography } from "@material-ui/core"
import { RootState } from "app/redux/store"
import React from "react"
import { useSelector } from "react-redux"

const CurrentRoundBadge = () => {
  const { currentRound } = useSelector((state: RootState) => state.game.gameInfo)
  return (
    <Paper>
      <Box display="flex" justifyContent="center" alignItems="center" px={2} py={1}>
        <Typography>{`Round ${currentRound + 1}`}</Typography>
      </Box>
    </Paper>
  )
}

export default CurrentRoundBadge
