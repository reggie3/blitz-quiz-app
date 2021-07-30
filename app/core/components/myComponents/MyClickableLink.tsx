import { makeStyles } from "@material-ui/core"
import React from "react"

interface Props {
  children: string
  onClick: () => void
}

const MyClickableLink = ({ children, onClick }: Props) => {
  const { root } = useStyles()

  return (
    <div className={root} onClick={onClick} role="link">
      {children}
    </div>
  )
}

export default MyClickableLink

const useStyles = makeStyles((theme) => ({
  root: {
    textDecoration: "underline",
    color: theme.palette.primary.main,
    cursor: "pointer",
  },
}))
