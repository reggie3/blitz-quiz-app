import { Box } from "@material-ui/core"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { ModalNames, closeModal } from "app/redux/modalSlice"
import { RootState } from "app/redux/store"
import React, { useCallback, useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { MyModal } from "../myComponents/MyModal/MyModal"
import MyButton from "../myComponents/MyButton"
import { setDashboardView, DashboardViews } from "app/redux/uiSlice"
import { setGameId, setGameInfo } from "app/redux/gameSlice"

interface Props {}

const JoinGameModal = (props: Props) => {
  const { isOpen } = useSelector((state: RootState) => state.modals[ModalNames.JOIN_GAME])
  const { gameInstanceId, joinUrl } = useSelector((state: RootState) => state.game.gameInfo)
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

  const onClickCopy = () => {
    navigator.clipboard.writeText(joinUrl)
  }

  const onClickJoinGame = () => {
    closeJoinGameModal()
    dispatch(setGameId(gameInstanceId))
    dispatch(setDashboardView(DashboardViews.JOIN_GAME))
  }

  return (
    <MyModal isOpen={isOpen} onClickClose={closeJoinGameModal} title="Start Game">
      <Box>
        <MyButton onClick={onClickJoinGame}>Start</MyButton>
      </Box>
    </MyModal>
  )
}

export default JoinGameModal
