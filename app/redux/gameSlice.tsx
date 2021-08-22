import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { GameInfo } from "myTypes"

export interface GameState {
  gameInfo: GameInfo
}

const initialState: GameState = {
  gameInfo: {} as GameInfo,
}

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    clearGameId: (state: GameState) => {
      state.gameInfo.gameId = ""
    },
    setGameId: (state: GameState, action: PayloadAction<string>) => {
      state.gameInfo.gameId = action.payload
    },
    setGameInstanceId: (state: GameState, action: PayloadAction<string>) => {
      state.gameInfo.gameId = action.payload
    },
    setGameInfo: (state: GameState, action: PayloadAction<GameInfo>) => {
      state.gameInfo = action.payload
    },
  },
})

export const { clearGameId, setGameId, setGameInfo, setGameInstanceId } = gameSlice.actions

export default gameSlice.reducer
