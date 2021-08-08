import { Paper, Box, Typography } from "@material-ui/core"
import React from "react"

const HasJoinedGameCard = () => {
  return (
    <Paper>
      <Box flexDirection="column" alignItems="center" justifyContent="center" px={2} py={1}>
        <Typography variant="h6">{`You're in!`}</Typography>
        <Typography variant="body1">{`Waiting for more players`}</Typography>
      </Box>
    </Paper>
  )
}

export default HasJoinedGameCard
