import { AppBar, Box, makeStyles, Typography } from "@material-ui/core"
import { RootState } from "app/redux/store"
import { Link, Routes } from "blitz"
import React, { Suspense } from "react"
import { useSelector } from "react-redux"
import { LoginControls } from "./Auth/LoginControls"
import { GamePlayControls } from "./GamePlayControls"

interface Props {}

const MyAppbar = (props: Props) => {
  const { showBorders } = useSelector((state: RootState) => state.debugging)

  return (
    <AppBar position="static">
      <Box
        padding={1}
        px={2}
        display="flex"
        flexDirection="row"
        border={showBorders ? "1px dashed yellow" : "none"}
        alignItems="center"
        justifyContent="space-between"
      >
        <Box flex={2}>
          <Link href={Routes.Home()}>
            <Typography style={{ cursor: "pointer" }}>Game Show </Typography>
          </Link>
        </Box>

        <Suspense fallback="Loading...">
          <LoginControls />
        </Suspense>
      </Box>
    </AppBar>
  )
}

export default MyAppbar
