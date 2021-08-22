import { Box, Button, IconButton, Tooltip, Typography } from "@material-ui/core"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { ModalNames, closeModal } from "app/redux/modalSlice"
import { RootState } from "app/redux/store"
import { Link } from "blitz"
import React, { useCallback, useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { MyModal } from "../myComponents/MyModal/MyModal"
import DescriptionIcon from "@material-ui/icons/Description"
import MyButton from "../myComponents/MyButton"
import { setDashboardView, DashboardViews } from "app/redux/uiSlice"
import { setGameId, setGameInfo } from "app/redux/gameSlice"

interface Props {}

const JoinGameModal = (props: Props) => {
  const { isOpen } = useSelector((state: RootState) => state.modals[ModalNames.JOIN_GAME])
  const { gameInstanceId } = useSelector((state: RootState) => state.game.gameInfo)
  const [joinGameUrl, setJoinGameUrl] = useState("")
  const [joinGameUrlTitle, setJoinGameUrlTitle] = useState("")
  const currentUser = useCurrentUser()

  const dispatch = useDispatch()

  const closeJoinGameModal = useCallback(() => {
    dispatch(closeModal(ModalNames.JOIN_GAME))
  }, [dispatch])

  useEffect(() => {
    if (currentUser) {
      closeJoinGameModal()
    }
  }, [closeJoinGameModal, currentUser])

  const onSuccess = () => {
    // debugger
  }

  useEffect(() => {
    setJoinGameUrl("/join-game/" + gameInstanceId)
    setJoinGameUrlTitle(window.location.href + "join-game/" + gameInstanceId)
  }, [gameInstanceId, joinGameUrl])

  const onClickCopy = () => {
    navigator.clipboard.writeText(joinGameUrlTitle)
  }

  const onClickJoinGame = () => {
    closeJoinGameModal()
    dispatch(setGameId(gameInstanceId))
    dispatch(setDashboardView(DashboardViews.JOIN_GAME))
  }

  return (
    <MyModal isOpen={isOpen} onClickClose={closeJoinGameModal} title="Join New Game">
      <Box>
        <MyButton onClick={onClickJoinGame}>Join Game</MyButton>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          paddingTop={2}
        >
          <Typography>Invite link:</Typography>
          <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
            <Link href="#">{joinGameUrlTitle}</Link>
            <Tooltip title="Copy Link">
              <IconButton onClick={onClickCopy}>
                <DescriptionIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </MyModal>
  )
}

export default JoinGameModal
