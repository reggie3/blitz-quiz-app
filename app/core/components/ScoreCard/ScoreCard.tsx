import { Paper } from "@material-ui/core"
import { Box, makeStyles, Typography } from "@material-ui/core"
import { RootState } from "app/redux/store"
import React from "react"
import { useSelector } from "react-redux"
import { PlayerBadge } from "../PlayerList/PlayerBadge"
import ScoreBadge from "./ScoreBadge"

const ScoreCard = () => {
  const { gamePlayers } = useSelector((state: RootState) => state.game.gameInfo)
  const { container } = useStyles()
  return (
    <Box className={container} data-testid="score-card-root-container">
      <Paper>
        <Box padding={1}>
          <Typography style={{ textAlign: "center" }}>Score</Typography>
          {Object.values(gamePlayers ?? []).map((player) => {
            const mostRecentRoundResults = player.roundResults[player.roundResults.length - 1]
            const cumulativeScore = mostRecentRoundResults?.cumulativeScore ?? 0

            return (
              <Box key={player.playerId} py={1} display="flex" flexDirection="row">
                <PlayerBadge player={player} />
                <ScoreBadge score={cumulativeScore} />
              </Box>
            )
          })}
        </Box>
      </Paper>
    </Box>
  )
}

export default ScoreCard

const useStyles = makeStyles((theme) => ({
  container: {
    padding: `${theme.spacing(2)}px ${theme.spacing(1)}px ${theme.spacing(2)}px ${theme.spacing(
      4
    )}px`,
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
}))
