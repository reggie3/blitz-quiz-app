export interface GamePlayerInfo {
  playerColor: string

  playerId: string
  playerName: string
}

export interface GameInfo {
  gameInstanceId: string
  gameId: string
  startedById: string
  startedAt: number
  gamePlayers: Record<string, GamePlayerInfo>
  startTimeMillis: number
}
