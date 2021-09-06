import { Box, Typography } from "@material-ui/core"
import React from "react"

interface Props {
  score: number
}

const ScoreBadge = ({ score }: Props) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" width="5ch">
      <Typography>{score}</Typography>
    </Box>
  )
}

export default ScoreBadge
