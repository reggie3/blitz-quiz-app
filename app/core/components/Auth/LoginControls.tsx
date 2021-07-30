import { Button } from "@material-ui/core"
import logout from "app/auth/mutations/logout"
import { ModalNames, showModal } from "app/redux/modalSlice"
import { Routes, useMutation, useRouter } from "blitz"
import React from "react"
import { useDispatch } from "react-redux"
import { useCurrentUser } from "../../hooks/useCurrentUser"

interface Props {}

export const LoginControls = (props: Props) => {
  const router = useRouter()
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)
  const dispatch = useDispatch()

  const onClickLogin = () => {
    dispatch(showModal(ModalNames.LOGIN))
  }

  const onClickLogout = async () => {
    await logoutMutation()
    router.push(Routes.Home())
  }

  if (currentUser) {
    return (
      <Button variant="contained" color="default" onClick={onClickLogout}>
        logout
      </Button>
    )
  }
  return (
    <Button variant="contained" color="default" onClick={onClickLogin}>
      login
    </Button>
  )
}
