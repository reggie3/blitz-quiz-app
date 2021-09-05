import db from "db"
import { FinalScores, GameInfo, GamePlayerInfo, QuestionWithAnswers } from "myTypes"
import randomColor from "random-color"
import {
  uniqueNamesGenerator,
  Config,
  adjectives,
  colors,
  animals,
  NumberDictionary,
} from "unique-names-generator"
import { getIsPlayerCorrect } from "./getIsPlayerCorrect"

const GAME_LOBBY_WAIT_TIME = 15000
const QUESTION_WAIT_TIME = 5000

export const gamesInfo: Record<string, GameInfo> = {}

const getGameInstanceId = (): string => {
  const numberDictionary = NumberDictionary.generate({ min: 100, max: 999 })

  const customConfig: Config = {
    dictionaries: [adjectives, colors, animals, numberDictionary],
    separator: "-",
  }
  return uniqueNamesGenerator(customConfig)
}

export const launchGame = ({
  gameId,
  startedById,
  urlRoot,
}: {
  gameId: string
  startedById: string
  urlRoot: string
}): Partial<GameInfo> => {
  const gameInstanceId = getGameInstanceId()
  const joinUrl = urlRoot + "play-game/" + gameInstanceId
  const startTimeMillis = Date.now() + GAME_LOBBY_WAIT_TIME
  const gameInfo = {
    gameInstanceId,
    startedById: startedById,
    gameId,
    joinUrl,
    startTimeMillis,
    questionsWithAnswers: [] as QuestionWithAnswers[],
    scoreMultiplier: 1,
    currentRound: 0,
  } as GameInfo

  gamesInfo[gameInstanceId] = gameInfo

  return gameInfo
}

const getPlayerColor = (gameInstanceId: string) => {
  let playerColor: string = ""
  do {
    const newColor = randomColor(0.3, 0.99).rgbString()
    const instancePlayers = gamesInfo[gameInstanceId]?.gamePlayers ?? {}
    const alreadyUsed = Object.values(instancePlayers).find(
      (player) => player.playerColor === newColor
    )
    if (!alreadyUsed) {
      playerColor = newColor
    }
  } while (playerColor === "")
  return playerColor
}

export const addUserToGame = ({
  gameInstanceId,
  playerName,
  socketId,
}: {
  gameInstanceId: string
  playerName: string
  socketId: string
}) => {
  const playerId = socketId
  const newGamePlayerInfo: GamePlayerInfo = {
    playerName,
    playerId,
    playerColor: getPlayerColor(gameInstanceId),
    roundResults: [],
  }

  if (gamesInfo) {
    gamesInfo[gameInstanceId] = {
      ...gamesInfo[gameInstanceId],
      gamePlayers: {
        ...gamesInfo[gameInstanceId]!.gamePlayers,
        [playerId]: newGamePlayerInfo,
      },
    } as GameInfo
  }

  return newGamePlayerInfo
}

export const getQuestion = async (
  gameInstanceId: string
): Promise<{ newQuestionWithAnswer: QuestionWithAnswers; currentRound: number } | null> => {
  const gameInfo = gamesInfo[gameInstanceId]
  if (!gameInfo) return null

  const { gameId, currentRound } = gameInfo
  const game = await db.game.findFirst({ where: { id: gameId } })

  if (!game) return null
  const { questionIds } = game

  const currentQuestionId = questionIds[currentRound]

  const question = await db.question.findFirst({ where: { id: currentQuestionId } })

  if (!question) return null

  const answers = await db.answer.findMany({ where: { questionIds: { has: question.id } } })

  if (!answers) return null

  const answersWithoutCorrectAnswer = answers.map((answer) => {
    const { wrongQuestionIds, ...rest } = answer
    return rest
  })

  const newQuestionWithAnswer: QuestionWithAnswers = {
    question,
    answers: answersWithoutCorrectAnswer,
    endTimeMillis: Date.now() + QUESTION_WAIT_TIME,
  }

  gamesInfo[gameInstanceId]?.questionsWithAnswers.push(newQuestionWithAnswer)
  // console.log("+++++++++++++++++++++++++++")
  // console.log(gamesInfo[gameInstanceId]!.questionInfo)

  return { newQuestionWithAnswer, currentRound }
}

export const handlePlayerAnswers = (
  gameInstanceId: string,
  playerId: string,
  playerAnswerIds: string[]
) => {
  if (!gamesInfo[gameInstanceId]) return null

  const gameInfo = gamesInfo[gameInstanceId]!
  const currentQuestionNumber = gameInfo.questionsWithAnswers.length - 1
  const currentQuestion = gameInfo.questionsWithAnswers[currentQuestionNumber]

  if (!currentQuestion) return null

  const isPlayerCorrect = getIsPlayerCorrect(currentQuestion, playerAnswerIds)
  console.log("isPlayerCorrect", isPlayerCorrect)

  const currentScore = isPlayerCorrect ? 1 * gameInfo.scoreMultiplier : 0
  const newCumulativeScore =
    currentScore +
    (gamesInfo[gameInstanceId]?.gamePlayers[playerId]?.roundResults[currentQuestionNumber]
      ?.cumulativeScore ?? 0)
  const roundResult = { score: currentScore, cumulativeScore: newCumulativeScore }
  console.log("roundResult", roundResult)

  gamesInfo[gameInstanceId]?.gamePlayers[playerId]?.roundResults.push(roundResult)

  return gamesInfo[gameInstanceId]?.gamePlayers
}

export const getHasNextQuestion = async (gameInstanceId: string): Promise<boolean> => {
  const gameInfo = gamesInfo[gameInstanceId]
  if (!gameInfo) return false

  const { gameId, currentRound } = gameInfo
  const game = await db.game.findFirst({ where: { id: gameId } })

  if (!game) return false
  const { questionIds } = game

  return Boolean(questionIds[currentRound])
}

export const getScoreData = (gameInstanceId: string, round: number): FinalScores => {
  const gameInfo = gamesInfo[gameInstanceId]
  if (!gameInfo) return {}

  const scoreInfo: Record<string, number> = {}
  //console.log("111******** gameInfo.gamePlayers, round", gameInfo.gamePlayers, round)

  Object.keys(gameInfo.gamePlayers).forEach((playerId: string) => {
    scoreInfo[playerId] = gameInfo.gamePlayers[playerId]?.roundResults[round]?.cumulativeScore ?? 0
  })
  console.log("scoreInfo", scoreInfo)
  return scoreInfo
}

export const getCurrentRound = (gameInstanceId: string): number => {
  const gameInfo = gamesInfo[gameInstanceId]
  if (!gameInfo) return 0

  return gamesInfo[gameInstanceId]!.currentRound
}

export const onRoundFinished = (gameInstanceId: string) => {
  if (!gamesInfo[gameInstanceId]) return null

  console.log(
    "gamesInfo[gameInstanceId]!.questionsWithAnswers.length",
    gamesInfo[gameInstanceId]!.questionsWithAnswers.length
  )
  const nextRoundNumber = Math.min(
    gamesInfo[gameInstanceId]!.questionsWithAnswers.length - 1,
    gamesInfo[gameInstanceId]!.currentRound + 1
  )
  console.log("nextRoundNumber", nextRoundNumber)
  gamesInfo[gameInstanceId]!.currentRound = nextRoundNumber
}
