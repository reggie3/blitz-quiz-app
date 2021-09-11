import { Box, makeStyles, Paper, Typography, useTheme } from "@material-ui/core"
import { clearGameState } from "app/redux/gameSlice"
import { RootState } from "app/redux/store"
import { DashboardViews, setDashboardView } from "app/redux/uiSlice"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import MyButton from "../myComponents/MyButton"
import { PlayerBadge } from "../PlayerList/PlayerBadge"

const GameOver = () => {
  const { finalScores, gamePlayers } = useSelector((state: RootState) => state.game.gameInfo)
  const { scoreText } = useStyles()
  const theme = useTheme()
  const dispatch = useDispatch()

  const onClickReturnHome = () => {
    dispatch(clearGameState())
    dispatch(setDashboardView(DashboardViews.GAMES))
  }

  if (!finalScores) return null

  return (
    <Box
      display="flex"
      justifyContent="center"
      data-testid="game-over-container"
      flexDirection="column"
      alignItems="center"
    >
      <MyButton
        data-testid="game-over-return-home-button"
        style={{ width: "25ch", marginBottom: theme.spacing(2) }}
        onClick={onClickReturnHome}
      >
        Return Home
      </MyButton>

      <Paper data-testid="game-over-paper">
        <Box
          padding={2}
          data-testid="game-over-contents"
          display="flex"
          justifyContent="center"
          flexDirection="column"
        >
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
