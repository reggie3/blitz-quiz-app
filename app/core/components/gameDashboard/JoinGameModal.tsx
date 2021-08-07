import { Box, Typography } from "@material-ui/core"
import SignupForm from "app/auth/components/SignupForm"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { ModalNames, closeModal } from "app/redux/modalSlice"
import { RootState } from "app/redux/store"
import { Link, Routes } from "blitz"
import React, { useCallback, useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { MyModal } from "../myComponents/MyModal/MyModal"

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

  return (
    <MyModal
      isOpen={isOpen}
      onClickClose={closeJoinGameModal}
      title="Join New Game"
      description="Click on the link below to join game"
    >
      <Box>
        <Link href={joinGameUrl}>
          <a>{joinGameUrlTitle}</a>
        </Link>
      </Box>
    </MyModal>
  )
}

export default JoinGameModal
