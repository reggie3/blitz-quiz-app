import { AppBar, Box, makeStyles, Typography } from "@material-ui/core"
import React, { Suspense } from "react"
import { LoginControls } from "./Auth/LoginControls"

interface Props {}

const Navbar = (props: Props) => {
  return (
    <AppBar position="static">
      <Box
        padding={1}
        px={2}
        display="flex"
        flexDirection="row"
        border="1px dashed yellow"
        alignItems="center"
      >
        <Box flex={1}>
          <Typography>Game Show </Typography>
        </Box>
        <Suspense fallback="Loading...">
          <LoginControls />
        </Suspense>
      </Box>
    </AppBar>
  )
}

export default Navbar

// const useStyles = makeStyles({
//   root: { padding: theme.spacin
// }
