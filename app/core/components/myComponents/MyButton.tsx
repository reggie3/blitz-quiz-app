import { Button, ButtonProps } from "@material-ui/core"
import React, { ReactElement } from "react"
import { noop } from "lodash"

interface MyButtonProps {
  children: ReactElement | string
  onClick?: () => void
}

const MyButton = <C extends React.ElementType>(
  props: ButtonProps<C, { component?: C }> & MyButtonProps
) => {
  const { children, onClick = () => noop } = props

  return (
    <Button variant="contained" color="primary" {...props} onClick={onClick}>
      {children}
    </Button>
  )
}

export default MyButton
