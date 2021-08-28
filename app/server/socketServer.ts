import * as socketio from "socket.io"
import { Server } from "http"
import { GameInfo, GamePlayerInfo } from "myTypes"
import { gamesInfo, addUserToGame, launchGame, getQuestion } from "./gameServerUtilities"

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

      console.log("---- emitting first question ------ gameInstanceId", gameInstanceId)
      callback(gameInfo)

      //gameInstanceId && io.to(gameInstanceId).emit("first-question", "test")

      // gameInstanceId && sendFirstQuestion(gameInstanceId)
      if (gameInstanceId && startTimeMillis) {
        const interval = startTimeMillis - Date.now()
        setTimeout(() => {
          sendFirstQuestion(gameInstanceId)
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

    const sendFirstQuestion = async (gameInstanceId: string) => {
      const question = await getQuestion(gameInstanceId)
      console.log("*** sendFirstQuestion ***", question)
      console.log("*** gameInstanceId ***", gameInstanceId)
      console.log("*** question ***", question)

      if (!question) return null

      io.to(gameInstanceId).emit("new-question", question)
      const interval = question.endTimeMillis - Date.now()

      setTimeout(() => {
        console.log("end-round")
        io.to(gameInstanceId).emit("end-round")
      }, interval)
    }
  })
}

export default setupWebsocketServer
