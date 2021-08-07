import { Box } from "@material-ui/core"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

import { RootState } from "app/redux/store"
import { DashboardViews } from "app/redux/uiSlice"
import React, { Suspense } from "react"
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
