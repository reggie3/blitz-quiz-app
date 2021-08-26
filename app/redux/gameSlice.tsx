import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Question } from "db"
import { GameInfo, QuestionWithAnswers } from "myTypes"

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
    addQuestion: (state: GameState, action: PayloadAction<QuestionWithAnswers>) => {
      state.gameInfo.questionsWithAnswers.push(action.payload)
    },
  },
})

export const { addQuestion, clearGameId, setGameId, setGameInfo, setGameInstanceId } =
  gameSlice.actions

export default gameSlice.reducer
