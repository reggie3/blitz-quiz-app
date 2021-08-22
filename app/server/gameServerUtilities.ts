import db from "db"
import { GameInfo } from "myTypes"
import randomColor from "random-color"
import {
  uniqueNamesGenerator,
  Config,
  adjectives,
  colors,
  animals,
  NumberDictionary,
} from "unique-names-generator"

// const GAME_WAIT_TIME = 60000

const GAME_WAIT_TIME = 10000

export const gamesInfo: Record<string, GameInfo> = {}

const getGameInstanceId = (): string => {
  const numberDictionary = NumberDictionary.generate({ min: 100, max: 999 })

  const customConfig: Config = {
    dictionaries: [adjectives, colors, animals, numberDictionary],
    separator: "-",
  }
  return uniqueNamesGenerator(customConfig)
}

export const createGame = ({
  gameId,
  startedById,
}: {
  gameId: string
  startedById: string
}): Partial<GameInfo> => {
  const gameInstanceId = getGameInstanceId()
  const startTimeMillis = Date.now() + GAME_WAIT_TIME
  const gameInfo = {
    gameInstanceId,
    startedById: startedById,
    gameId,
    startTimeMillis,
    questionInfo: {
      currentQuestionNumber: 0,
    },
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
  const newGamePlayerInfo = { playerName, playerId, playerColor: getPlayerColor(gameInstanceId) }

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

export const getQuestion = async (gameInstanceId: string) => {
  const gameInfo = gamesInfo[gameInstanceId]

  if (gameInfo) {
    const { gameId } = gameInfo
    const game = await db.game.findFirst({ where: { id: gameId } })

    if (!game) return null

    // console.log("+++++++++++++++++++++++++++")
    // console.log(game)
    const { questionIds } = game
    const currentQuestionId = questionIds[gameInfo.questionInfo.currentQuestionNumber]

    const question = await db.question.findFirst({ where: { id: currentQuestionId } })

    if (!question) return null

    gamesInfo[gameInstanceId]!.questionInfo.currentQuestionNumber += 1
    gamesInfo[gameInstanceId]!.questionInfo.currentQuestion = question

    const answers = await db.answer.findMany({ where: { questionIds: { has: question.id } } })

    if (!answers) return null

    gamesInfo[gameInstanceId]!.questionInfo.currentAnswers = answers

    // console.log("+++++++++++++++++++++++++++")
    // console.log(gamesInfo[gameInstanceId]!.questionInfo)

    return gamesInfo[gameInstanceId]!.questionInfo
  }
}
