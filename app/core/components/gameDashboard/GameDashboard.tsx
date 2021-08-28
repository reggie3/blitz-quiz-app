import { Box } from "@material-ui/core"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

import { RootState } from "app/redux/store"
import { DashboardViews } from "app/redux/uiSlice"
import React, { Suspense } from "react"
import { useSelector } from "react-redux"
import GameLobby from "../JoinGame/GameLobby"
import PlayGame from "../PlayGame/PlayGame"
import DashboardHeader from "./DashboardHeader"
import MyAnswersList from "./MyAnswersList"
import MyGamesList from "./MyGamesList"
import MyQuestionsList from "./MyQuestionsList"

const GameDashboard = () => {
  const currentUser = useCurrentUser()
  const { dashboardView } = useSelector((state: RootState) => state.ui)
  const { gameInstanceId } = useSelector((state: RootState) => state.game.gameInfo)

  if (!currentUser) {
    return null
  }

  if (dashboardView === DashboardViews.JOIN_GAME) {
    return (
      <div data-testid="game-dashboard-join-game-container">
        <GameLobby />
      </div>
    )
  }
  if (dashboardView === DashboardViews.PLAY_GAME) {
    return (
      <div data-testid="game-dashboard-play-game-container">
        <PlayGame />
      </div>
    )
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
