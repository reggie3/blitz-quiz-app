import { Box, IconButton, Link, Paper, Tooltip } from "@material-ui/core"
import React from "react"
import DescriptionIcon from "@material-ui/icons/Description"

interface Props {
  onClickLink?: () => void
  url: string
}

const CopyLinkCard = ({ url, onClickLink }: Props) => {
  const onClickCopy = () => {
    navigator.clipboard.writeText(url)
    onClickLink && onClickCopy()
  }

  return (
    <Paper>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-around"
        alignItems="center"
        px={2}
        py={1}
      >
        <Link href={url}>{url}</Link>
        <Tooltip title="Copy Link">
          <IconButton onClick={onClickCopy}>
            <DescriptionIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Paper>
  )
}

export default CopyLinkCard
