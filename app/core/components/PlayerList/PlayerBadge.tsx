import { makeStyles, Paper, Typography } from "@material-ui/core"
import { GamePlayerInfo } from "myTypes"
import React from "react"

interface Props {
  player: GamePlayerInfo
}

export const PlayerBadge = ({ player }: Props) => {
  const { playerColor, playerId, playerName } = player
  const { playerBadge } = useStyles({ playerColor })

  return (
    <Paper className={playerBadge}>
      <Typography variant="body1">{playerName}</Typography>
    </Paper>
  )
}

const useStyles = makeStyles((theme) => ({
  playerBadge: {
    backgroundColor: ({ playerColor }: { playerColor: string }) => playerColor,
    // borderColor: ({ playerColor }: { playerColor: string }) => playerColor,
    // borderStyle: "solid",
    // borderWidth: 3,
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    minWidth: "10ch",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // color: ({ playerColor }: { playerColor: string }) => playerColor,
    fontWeight: "bold",
  },
}))
