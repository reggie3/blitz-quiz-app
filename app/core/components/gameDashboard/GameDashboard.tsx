import getGames from "app/games/queries/getGames"
import { GamesList } from "app/pages/games"
import { usePaginatedQuery } from "blitz"
import React, { Suspense, useState } from "react"
import MyGamesList from "./MyGamesList"

interface Props {}

const GameDashboard = (props: Props) => {
  return (
    <div data-testid="game-dashboard-container">
      <Suspense fallback={<div>Loading...</div>}>
        <MyGamesList />
      </Suspense>
    </div>
  )
}

export default GameDashboard
