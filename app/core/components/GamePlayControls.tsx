import { Box, Button } from "@material-ui/core"
import React from "react"
import { useRouter } from "blitz"

import { useCurrentUser } from "../hooks/useCurrentUser"
import { RootState } from "app/redux/store"
import { useSelector } from "react-redux"

interface Props {}

export const GamePlayControls = (props: Props) => {
  const currentUser = useCurrentUser()
  const router = useRouter()
  const { showBorders } = useSelector((state: RootState) => state.debugging)

  const onClickMakeGame = () => {
    router.push("/make-games")
  }

  const onClickStartGame = () => {}
  const onClickPlayGame = () => {}
  return (
    <Box
      display="flex"
      flexDirection="row"
      border={showBorders ? "1px dashed green" : "none"}
      justifyContent="center"
    >
      <Box px={1}>
        <Button variant="contained" color="default" onClick={onClickPlayGame}>
          Play Game
        </Button>
      </Box>
      {currentUser && (
        <Box px={1}>
          <Button variant="contained" color="default" onClick={onClickMakeGame}>
            Make Game
          </Button>
        </Box>
      )}
      {currentUser && (
        <Box px={1}>
          <Button variant="contained" color="default" onClick={onClickStartGame}>
            Start Game
          </Button>
        </Box>
      )}
    </Box>
  )
}
