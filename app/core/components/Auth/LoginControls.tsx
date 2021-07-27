import { Box, Button, Typography } from "@material-ui/core"
import logout from "app/auth/mutations/logout"
import { ModalNames, showModal } from "app/redux/modalSlice"
import { useMutation } from "blitz"
import React from "react"
import { useDispatch } from "react-redux"
import { useCurrentUser } from "../../hooks/useCurrentUser"

interface Props {}

export const LoginControls = (props: Props) => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)
  const dispatch = useDispatch()

  const onClickLogin = () => {
    dispatch(showModal(ModalNames.LOGIN))
  }

  const onClickLogout = async () => {
    await logoutMutation()
  }

  if (currentUser) {
    return <Button onClick={onClickLogout}>logout</Button>
  }
  return <Button onClick={onClickLogin}>login</Button>
}
