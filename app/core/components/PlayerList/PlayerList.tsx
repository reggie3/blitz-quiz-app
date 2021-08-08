import { Box } from "@material-ui/core"
import { RootState } from "app/redux/store"
import React from "react"
import { useSelector } from "react-redux"
import { PlayerBadge } from "./PlayerBadge"

interface Props {}

const PlayerList = (props: Props) => {
  const gamePlayers = useSelector((state: RootState) => state.game.gameInfo?.gamePlayers)
  return (
    <Box display="flex" flexDirection="row">
      {Object.values(gamePlayers ?? []).map((player, index) => {
        return (
          <Box key={player.playerId} px={1} py={0.5}>
            <PlayerBadge player={player} />
          </Box>
        )
      })}
    </Box>
  )
}

export default PlayerList
