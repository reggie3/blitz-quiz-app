import * as socketio from "socket.io"
import { Server } from "http"
import { SocketMessages } from "socketTypes"
import { GameInfo } from "myTypes"
import cuid from "cuid"
import { log } from "@blitzjs/display"

import { BlitzApiRequest } from "blitz"

const gameInfo: Record<string, GameInfo> = {}

const createGame = ({
  gameId,
  startedById,
}: {
  gameId: string
  startedById: string
}): Partial<GameInfo> => {
  const gameInstanceId = cuid()

  // const joinUrl = url.format({
  //   protocol: req.protocol,
  //   host: req.get("host"),
  //   pathname: req.originalUrl,
  // })

  return {
    gameInstanceId: cuid(),
    startedById: startedById,
    gameId,
  }
}

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
      callback(gameInfo)
    })
  })
}

export default setupWebsocketServer
