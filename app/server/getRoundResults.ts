import { GamePlayerInfo, RoundResult } from "myTypes"

export const getRoundResults = (
  isPlayerCorrect: boolean,
  gamePlayerInfo: GamePlayerInfo | undefined
): RoundResult[] => {
  if (!gamePlayerInfo?.roundResults) {
    return [{ score: 0, cumulativeScore: 0 }]
  }

  const previousRoundsResult = gamePlayerInfo.roundResults[gamePlayerInfo.roundResults.length - 1]

  if (!isPlayerCorrect) {
    return [
      ...gamePlayerInfo.roundResults,
      {
        cumulativeScore: previousRoundsResult ? previousRoundsResult.cumulativeScore : 0,
        score: 0,
      },
    ]
  }

  const newRoundResult = {
    score: 1,
    cumulativeScore: previousRoundsResult ? previousRoundsResult.cumulativeScore + 1 : 1,
  }

  return [...gamePlayerInfo.roundResults, newRoundResult]
}
