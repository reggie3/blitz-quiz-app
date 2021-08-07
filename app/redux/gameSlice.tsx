import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { GameInfo } from "myTypes"

export interface GameState extends GameInfo {
  gameId: string
}

const initialState: GameState = {
  gameInstanceId: "",
  gameId: "",
  startedById: "",
  startedAt: 0,
  playerIds: {},
  joinUrl: "",
}

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    clearGameId: (state: GameState) => {
      state.gameId = ""
    },
    setGameId: (state: GameState, action: PayloadAction<string>) => {
      state.gameId = action.payload
    },
    setGameInfo: (state: GameState, action: PayloadAction<GameInfo>) => {
      return action.payload
    },
  },
})

export const { clearGameId, setGameId, setGameInfo } = gameSlice.actions

export default gameSlice.reducer
