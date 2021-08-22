import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export enum DashboardViews {
  GAMES = "GAMES",
  QUESTIONS = "QUESTIONS",
  ANSWERS = "ANSWERS",
  JOIN_GAME = "JOIN_GAME",
  PLAY_GAME = "PLAY_GAME",
}
export interface uiState {
  dashboardView: DashboardViews
}

const initialState: uiState = {
  dashboardView: DashboardViews.GAMES,
}

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setDashboardView: (state: uiState, action: PayloadAction<DashboardViews>) => {
      state.dashboardView = action.payload ?? DashboardViews.GAMES
    },
  },
})

export const { setDashboardView } = uiSlice.actions

export default uiSlice.reducer
