import { mock1RoundResult, mock3RoundResults, mockGamesInfo } from "app/mockData/mockData"
import { GamePlayerInfo, RoundResult } from "myTypes"
import { getRoundResults } from "./getRoundResults"

const blankResponse = [{ score: 0, cumulativeScore: 0 }]

const GAME_PLAYER_INFO = mockGamesInfo.mockGame1!.gamePlayers.gamePlayer1

describe("getRoundResults tests", () => {
  it("should return 0 scores if gamePlayerInfo do not exist", () => {
    // @ts-ignore types
    const res = getRoundResults(true, { ...mockGamesInfo.mockGame1, gamePlayers: {} })
    expect(res).toEqual(blankResponse)
  })

  it("should add a round result with the same cumulative score as previous round if the player was incorrect for this round", () => {
    const res = getRoundResults(false, GAME_PLAYER_INFO)

    expect(res).toEqual([...mock1RoundResult, { ...mock1RoundResult[0], score: 0 }])
    console.log(res)
  })

  it("should add a round result with if the player answers correctly", () => {
    // console.log(" mockGamesInfo.mockGame1!", GAME_PLAYER_INFO)
    const res = getRoundResults(true, {
      ...GAME_PLAYER_INFO,
      roundResults: mock3RoundResults,
    } as GamePlayerInfo)

    const lastRoundResults: RoundResult = mock3RoundResults[
      mock3RoundResults.length - 1
    ] as RoundResult

    const expectedResult: RoundResult[] = [
      ...mock3RoundResults,
      { cumulativeScore: lastRoundResults!.cumulativeScore + 1, score: 1 },
    ]
    expect(res).toEqual(expectedResult)
  })
})
