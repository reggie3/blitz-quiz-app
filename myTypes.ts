import { Answer, Question } from "db"
export interface GamePlayerInfo {
  playerColor: string
  playerId: string
  playerName: string
}

export interface QuestionInfo {
  currentQuestionNumber: number
  currentQuestion: Question
  currentAnswers: Answer[]
}

export interface GameInfo {
  gameInstanceId: string
  gameId: string
  startedById: string
  startedAt: number
  gamePlayers: Record<string, GamePlayerInfo>
  startTimeMillis: number
  questionInfo: QuestionInfo
}
