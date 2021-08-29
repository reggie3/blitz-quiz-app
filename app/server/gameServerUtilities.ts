import db, { Question } from "db"
import { GameInfo, GamePlayerInfo, QuestionWithAnswers } from "myTypes"
import randomColor from "random-color"
import {
  uniqueNamesGenerator,
  Config,
  adjectives,
  colors,
  animals,
  NumberDictionary,
} from "unique-names-generator"
import { xor } from "lodash"

const GAME_WAIT_TIME = 10000
const QUESTION_WAIT_TIME = 5000

// const GAME_WAIT_TIME = 10000

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
  const startTimeMillis = Date.now() + GAME_WAIT_TIME
  const gameInfo = {
    gameInstanceId,
    startedById: startedById,
    gameId,
    joinUrl,
    startTimeMillis,
    questionsWithAnswers: [] as QuestionWithAnswers[],
    scoreMultiplier: 1,
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

export const getQuestion = async (gameInstanceId: string): Promise<QuestionWithAnswers | null> => {
  const gameInfo = gamesInfo[gameInstanceId]
  if (!gameInfo) return null

  const { gameId } = gameInfo
  const game = await db.game.findFirst({ where: { id: gameId } })

  if (!game) return null
  const { questionIds } = game
  const currentQuestionId =
    questionIds[gamesInfo[gameInstanceId]?.questionsWithAnswers?.length ?? 0]

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

  return newQuestionWithAnswer
}

export const handlePlayerAnswers = (
  gameInstanceId: string,
  playerId: string,
  playerAnswerIds: string[]
) => {
  console.log("here 1")
  console.log("gameInstanceId", gameInstanceId)
  console.log("gamesInfo", gamesInfo)

  if (!gamesInfo[gameInstanceId]) return null

  console.log("here 1.1")

  const gameInfo = gamesInfo[gameInstanceId]!
  const currentQuestionNumber = gameInfo.questionsWithAnswers.length - 1
  const currentQuestion = gameInfo.questionsWithAnswers[currentQuestionNumber]

  if (!currentQuestion) return null
  console.log("here 2")

  // the player is correct if there are no id differences in their answer and the answers to the question
  const currentQuestionAnswerIds = currentQuestion.answers.map((answer) => answer.id)
  const isPlayerCorrect = !xor(playerAnswerIds, currentQuestionAnswerIds).length

  const currentScore = isPlayerCorrect ? 1 * gameInfo.scoreMultiplier : 0
  const newCumulativeScore =
    currentScore +
    (gamesInfo[gameInstanceId]?.gamePlayers[playerId]?.roundResults[currentQuestionNumber]
      ?.cumulativeScore ?? 0)
  const roundResult = { score: currentScore, cumulativeScore: newCumulativeScore }

  gamesInfo[gameInstanceId]?.gamePlayers[playerId]?.roundResults.push(roundResult)

  console.log("here end")

  return gamesInfo[gameInstanceId]?.gamePlayers
}
