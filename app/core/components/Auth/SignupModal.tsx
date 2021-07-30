import SignupForm from "app/auth/components/SignupForm"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { ModalNames, closeModal } from "app/redux/modalSlice"
import { RootState } from "app/redux/store"
import React, { useCallback, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { MyModal } from "../myComponents/MyModal/MyModal"

interface Props {}

const SignupModal = (props: Props) => {
  const { isOpen } = useSelector((state: RootState) => state.modals[ModalNames.SIGNUP])
  const currentUser = useCurrentUser()

  const dispatch = useDispatch()

  const closeSignupModal = useCallback(() => {
    dispatch(closeModal(ModalNames.SIGNUP))
  }, [dispatch])

  useEffect(() => {
    if (currentUser) {
      closeSignupModal()
    }
  }, [closeSignupModal, currentUser])

  const onSuccess = () => {
    // debugger
  }

  return (
    <MyModal isOpen={isOpen} onClickClose={closeSignupModal}>
      <SignupForm onSuccess={onSuccess} />
    </MyModal>
  )
}

export default SignupModal
