import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export enum DashboardViews {
  GAMES = "GAMES",
  QUESTIONS = "QUESTIONS",
  ANSWERS = "ANSWERS",
  JOIN_GAME = "JOIN_GAME",
  PLAY_GAME = "PLAY_GAME",
}

export enum GamePlayViews {
  JOIN_GAME = "JOIN_GAME",
  PLAY_GAME = "PLAY_GAME",
}

export interface uiState {
  dashboardView: DashboardViews
  gamePlayView: GamePlayViews
}

const initialState: uiState = {
  dashboardView: DashboardViews.GAMES,
  gamePlayView: GamePlayViews.JOIN_GAME,
}

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setDashboardView: (state: uiState, action: PayloadAction<DashboardViews>) => {
      state.dashboardView = action.payload ?? DashboardViews.GAMES
    },
    setGamePlayView: (state: uiState, action: PayloadAction<GamePlayViews>) => {
      state.gamePlayView = action.payload ?? GamePlayViews.JOIN_GAME
    },
  },
})

export const { setDashboardView, setGamePlayView } = uiSlice.actions

export default uiSlice.reducer
