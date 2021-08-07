import { Box } from "@material-ui/core"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import getGames from "app/games/queries/getGames"
import { GamesList } from "app/pages/games"
import { RootState } from "app/redux/store"
import { DashboardViews } from "app/redux/uiSlice"
import React, { Suspense, useEffect } from "react"
import { useSelector } from "react-redux"
import DashboardHeader from "./DashboardHeader"
import MyAnswersList from "./MyAnswersList"
import MyGamesList from "./MyGamesList"
import MyQuestionsList from "./MyQuestionsList"
import { io } from "socket.io-client"
import { SocketMessages } from "socketTypes"

const socket = io()

// client-side
socket.on(SocketMessages.CONNECT, () => {
  console.log(SocketMessages.CONNECT, socket.id) // x8WIv7-mJelg7on_ALbx
})

socket.on(SocketMessages.DISCONNECT, () => {
  console.log(SocketMessages.DISCONNECT, socket.id) // undefined
})

const GameDashboard = () => {
  const currentUser = useCurrentUser()
  const { dashboardView } = useSelector((state: RootState) => state.ui)

  // useEffect(() => {
  //   const socket = io("/game-socket")
  // }, [])
  if (!currentUser) {
    return null
  }

  return (
    <div data-testid="game-dashboard-container">
      <DashboardHeader />
      <Suspense fallback={<div>Loading...</div>}>
        <Box px={1}>
          {dashboardView === DashboardViews.GAMES && <MyGamesList />}
          {dashboardView === DashboardViews.QUESTIONS && <MyQuestionsList />}
          {dashboardView === DashboardViews.ANSWERS && <MyAnswersList />}
        </Box>
      </Suspense>
    </div>
  )
}

export default GameDashboard
