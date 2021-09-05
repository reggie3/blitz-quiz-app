import * as socketio from "socket.io"
import { Server } from "http"
import { GameInfo, GamePlayerInfo } from "myTypes"
import {
  gamesInfo,
  addUserToGame,
  launchGame,
  getQuestion,
  handlePlayerAnswers,
  onRoundFinished,
  getHasNextQuestion,
  getScoreData,
  getCurrentRound,
} from "./gameServerUtilities"

const TIME_BETWEEN_END_OF_ROUND_AND_NEXT_ROUND = 2000

const setupWebsocketServer = (server: Server) => {
  const io: socketio.Server = new socketio.Server()

  io.attach(server)

  const url = io.on("connect", (socket: socketio.Socket) => {
    console.log("connection")
    socket.emit("status", "Hello from Socket.io 1")

    socket.on("disconnect", () => {
      console.log("client disconnected")
    })

    socket.onAny((event, ...args) => {
      console.log(event, args)
    })

    socket.on("launch-game", (gameId: string, startedById: string, urlRoot: string, callback) => {
      const gameInfo: Partial<GameInfo> = launchGame({ gameId, startedById, urlRoot })
      const { gameInstanceId, startTimeMillis } = gameInfo

      callback(gameInfo)

      if (gameInstanceId && startTimeMillis) {
        const interval = startTimeMillis - Date.now()
        setTimeout(() => {
          sendQuestion(gameInstanceId)
        }, interval)
      }
    })

    socket.on("join-game", (gameInstanceId: string, callback) => {
      // join the room for this game instance
      socket.join(gameInstanceId)

      callback(gamesInfo[gameInstanceId])

      io.to(gameInstanceId).emit("update-players", gamesInfo[gameInstanceId])
    })

    socket.on("add-name", (gameInstanceId: string, playerName: string, callback) => {
      const playerInfo: Partial<GamePlayerInfo> = addUserToGame({
        gameInstanceId,
        playerName,
        socketId: socket.id,
      })
      callback(gamesInfo[gameInstanceId])

      io.to(gameInstanceId).emit("update-players", gamesInfo[gameInstanceId])
    })

    socket.on("get-game-info", (gameInstanceId: string, callback) => {
      console.log(gamesInfo[gameInstanceId])
      callback(gamesInfo[gameInstanceId])
    })

    socket.on(
      "send-player-answers",
      (gameInstanceId: string, playerAnswerIds: string[], callback) => {
        const answerResults = handlePlayerAnswers(gameInstanceId, socket.id, playerAnswerIds)

        setTimeout(() => {
          sendQuestion(gameInstanceId)
        }, TIME_BETWEEN_END_OF_ROUND_AND_NEXT_ROUND)
        callback(answerResults)
      }
    )

    const sendQuestion = async (gameInstanceId: string) => {
      if (await getHasNextQuestion(gameInstanceId)) {
        const res = await getQuestion(gameInstanceId)
        if (!res) return null
        const { newQuestionWithAnswer: question, currentRound } = res
        // console.log("*** sendQuestion ***", question)
        // console.log("*** gameInstanceId ***", gameInstanceId)
        // console.log("*** question ***", question)

        if (!question) return null

        io.to(gameInstanceId).emit("new-question", question, currentRound)
        const interval = question.endTimeMillis - Date.now()

        setTimeout(() => {
          console.log("end-round")
          onRoundFinished(gameInstanceId)
          io.to(gameInstanceId).emit("end-round")
        }, interval)
      } else {
        io.to(gameInstanceId).emit(
          "end-game",
          getScoreData(gameInstanceId, getCurrentRound(gameInstanceId) - 1)
        )
      }
    }
  })
}

export default setupWebsocketServer
