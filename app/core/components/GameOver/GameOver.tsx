import { Box, makeStyles, Paper, Typography } from "@material-ui/core"
import { RootState } from "app/redux/store"
import React from "react"
import { useSelector } from "react-redux"
import { PlayerBadge } from "../PlayerList/PlayerBadge"

interface Props {}

const GameOver = (props: Props) => {
  const { finalScores, gamePlayers } = useSelector((state: RootState) => state.game.gameInfo)
  const { scoreText } = useStyles()

  if (!finalScores) return null
  return (
    <Box display="flex" justifyContent="center" data-testid="game-over-container">
      <Paper data-testid="game-over-paper">
        <Box padding={2} data-testid="game-over-contents">
          <Typography variant="h4" data-testid="game-over-header">
            Game Over
          </Typography>
          {Object.keys(finalScores).map((playerId) => {
            const player = gamePlayers[playerId]
            if (!player) return null
            return (
              <Box
                key={player.playerId}
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <PlayerBadge player={player} />

                <Typography className={scoreText}>{finalScores[playerId]}</Typography>
              </Box>
            )
          })}
        </Box>
      </Paper>
    </Box>
  )
}

export default GameOver

const useStyles = makeStyles((theme) => ({
  scoreText: {
    paddingRight: 2,
  },
}))
