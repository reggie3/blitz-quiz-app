export interface GamePlayerInfo {
  playerId
}

export interface GameInfo {
  gameInstanceId: string
  gameId: string
  startedById: string
  startedAt: number
  playerIds: Record<string, GamePlayerInfo>
  joinUrl: string
}
