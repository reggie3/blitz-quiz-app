import LoginForm from "app/auth/components/LoginForm"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { closeModal, ModalNames } from "app/redux/modalSlice"
import { RootState } from "app/redux/store"
import React, { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { MyModal } from "../myComponents/MyModal"

interface Props {}

export const LoginModal = (props: Props) => {
  const { isOpen } = useSelector((state: RootState) => state.modals[ModalNames.LOGIN])
  const currentUser = useCurrentUser()

  const dispatch = useDispatch()

  const closeLoginModal = useCallback(() => {
    dispatch(closeModal(ModalNames.LOGIN))
  }, [dispatch])

  useEffect(() => {
    if (currentUser) {
      closeLoginModal()
    }
  }, [closeLoginModal, currentUser])

  return (
    <MyModal isOpen={isOpen} onClickClose={closeLoginModal}>
      <LoginForm />
    </MyModal>
  )
}
