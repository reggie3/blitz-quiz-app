import { Box, IconButton, Tooltip } from "@material-ui/core"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { ModalNames, closeModal } from "app/redux/modalSlice"
import { RootState } from "app/redux/store"
import { Link } from "blitz"
import React, { useCallback, useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { MyModal } from "../myComponents/MyModal/MyModal"
import DescriptionIcon from "@material-ui/icons/Description"

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

  const onClickLink = () => {
    debugger
  }

  return (
    <MyModal
      isOpen={isOpen}
      onClickClose={closeJoinGameModal}
      title="Join New Game"
      description="Click on the link below to join game"
    >
      <Box display="flex" flexDirection="row" alignItems="center">
        <Link href={joinGameUrl} onClick={onClickLink}>
          {joinGameUrlTitle}
        </Link>
        <Tooltip title="Copy Link">
          <IconButton onClick={onClickCopy}>
            <DescriptionIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </MyModal>
  )
}

export default JoinGameModal
