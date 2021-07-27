import { Box, IconButton } from "@material-ui/core"
import React from "react"
import CloseIcon from "@material-ui/icons/Close"

interface Props {
  onClick: () => void
}

export const MyCloseIconButton = ({ onClick }: Props) => {
  return (
    <Box position="absolute" top={1.5} right={1.5}>
      <IconButton onClick={onClick}>
        <CloseIcon style={{ color: "red" }} />
      </IconButton>
    </Box>
  )
}
