import { Typography } from "@material-ui/core"
import { grey } from "@material-ui/core/colors"
import React from "react"

interface Props {
  children: string | string[]
}

const MySubTitle = ({ children }: Props) => {
  return (
    <Typography
      variant="caption"
      style={{
        color: grey[700],
        fontSize: ".75em",
        fontStyle: "italic",
      }}
    >
      {children}
    </Typography>
  )
}

export default MySubTitle
