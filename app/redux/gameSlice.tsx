import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { FinalScores, GameInfo, GamePlayerInfo, QuestionWithAnswers } from "myTypes"

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
    clearGameState: () => {
      return initialState
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
    setIsGameComplete: (state: GameState, action: PayloadAction<FinalScores>) => {
      state.gameInfo.finalScores = action.payload
    },
    setIsRoundComplete: (state: GameState, action: PayloadAction<boolean>) => {
      state.gameInfo.isRoundComplete = action.payload
    },
    setGamePlayerInfo: (
      state: GameState,
      action: PayloadAction<Record<string, GamePlayerInfo>>
    ) => {
      state.gameInfo.gamePlayers = action.payload
    },
    setCurrentRound: (state: GameState, action: PayloadAction<number>) => {
      state.gameInfo.currentRound = action.payload
    },
  },
})

export const {
  addQuestion,
  clearGameId,
  clearGameState,
  setGameId,
  setGameInfo,
  setGameInstanceId,
  setIsGameComplete,
  setIsRoundComplete,
  setGamePlayerInfo,
  setCurrentRound,
} = gameSlice.actions

export default gameSlice.reducer
