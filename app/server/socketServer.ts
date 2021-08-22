import * as socketio from "socket.io"
import { Server } from "http"
import { GameInfo, GamePlayerInfo } from "myTypes"
import { gamesInfo, addUserToGame, createGame, getQuestion } from "./gameServerUtilities"

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

    socket.on("launch-game", (gameId: string, startedById: string, callback) => {
      const gameInfo: Partial<GameInfo> = createGame({ gameId, startedById })
      const { gameInstanceId, startTimeMillis } = gameInfo

      setTimeout(() => {
        gameInstanceId && sendFirstQuestion(gameInstanceId)
      }, startTimeMillis)

      callback(gameInfo)
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
  })

  const sendFirstQuestion = (gameInstanceId: string) => {
    const question = getQuestion(gameInstanceId)
    io.to(gameInstanceId).emit("first-question", question)
  }
}

export default setupWebsocketServer
