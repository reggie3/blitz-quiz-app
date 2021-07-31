import { Box } from "@material-ui/core"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import getGames from "app/games/queries/getGames"
import { GamesList } from "app/pages/games"
import { RootState } from "app/redux/store"
import { DashboardViews } from "app/redux/uiSlice"
import React, { Suspense, useState } from "react"
import { useSelector } from "react-redux"
import DashboardHeader from "./DashboardHeader"
import MyAnswersList from "./MyAnswersList"
import MyGamesList from "./MyGamesList"
import MyQuestionsList from "./MyQuestionsList"

const GameDashboard = () => {
  const currentUser = useCurrentUser()
  const { dashboardView } = useSelector((state: RootState) => state.ui)

  if (!currentUser) {
    return null
  }

  return (
    <div data-testid="game-dashboard-container">
      <DashboardHeader />
      <Box px={1}>
        {dashboardView === DashboardViews.GAMES && (
          <Suspense fallback={<div>Loading...</div>}>
            <MyGamesList />
          </Suspense>
        )}
        {dashboardView === DashboardViews.QUESTIONS && (
          <Suspense fallback={<div>Loading...</div>}>
            <MyQuestionsList />
          </Suspense>
        )}
        {dashboardView === DashboardViews.ANSWERS && (
          <Suspense fallback={<div>Loading...</div>}>
            <MyAnswersList />
          </Suspense>
        )}
      </Box>
    </div>
  )
}

export default GameDashboard
