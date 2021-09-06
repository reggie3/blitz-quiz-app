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
  const gameInfo = {
    gameInstanceId,
    startedById: startedById,
    gameId,
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
        ...gamesInfo[gameInstanceId].gamePlayers,
        [playerId]: newGamePlayerInfo,
      },
    } as GameInfo
  }

  return newGamePlayerInfo
}
