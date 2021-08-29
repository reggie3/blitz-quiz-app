import { Answer, Question } from "db"

export interface RoundResult {
  score: number
  cumulativeScore: number
}
export interface GamePlayerInfo {
  playerColor: string
  playerId: string
  playerName: string
  roundResults: RoundResult[]
}

export interface QuestionWithAnswers {
  question: Question
  answers: Answer[]
  endTimeMillis: number
}

export interface GameInfo {
  gameInstanceId: string
  gameId: string
  joinUrl: string
  startedById: string
  startedAt: number
  gamePlayers: Record<string, GamePlayerInfo>
  startTimeMillis: number
  questionsWithAnswers: QuestionWithAnswers[]
  isRoundComplete: boolean
  scoreMultiplier: number
}
