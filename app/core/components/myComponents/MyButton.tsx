import { Button, ButtonProps } from "@material-ui/core"
import React, { ReactElement, useRef } from "react"
import { noop } from "lodash"
import getSanitizedString from "app/utils/getSanitizedString"

interface MyButtonProps {
  children: ReactElement | string
  onClick?: () => void
  testId?: string
}

const getTestId = (
  children: React.ReactNode &
    (string | React.ReactElement<any, string | React.JSXElementConstructor<any>>),
  testId?: string
): string => {
  if (testId) {
    return "button-" + testId
  }
  if (typeof children === "string") {
    return "button-" + children
  }
  return "button"
}

const MyButton = <C extends React.ElementType>(
  props: ButtonProps<C, { component?: C }> & MyButtonProps
) => {
  const { children, onClick = () => noop, testId = "" } = props

  const localTestId = useRef<string>(getSanitizedString(getTestId(children, testId)))

  return (
    <Button
      variant="contained"
      color="primary"
      {...props}
      onClick={onClick}
      data-testid={localTestId.current}
    >
      {children}
    </Button>
  )
}

export default MyButton
