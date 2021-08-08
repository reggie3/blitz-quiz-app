import { setGameInfo } from "app/redux/gameSlice"
import { useSession } from "blitz"
import { GameInfo } from "myTypes"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Socket } from "socket.io-client"
import { io } from "socket.io-client"
import { SocketMessages } from "socketTypes"

const SocketContext = React.createContext<
  { socket: Socket | null; setSocket: Dispatch<SetStateAction<null>> } | undefined
>(undefined)

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const session = useSession()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!socket) {
      const newSocket = io("", { autoConnect: false })
      newSocket.onAny((event, ...args) => {
        console.log(event, args)
      })
      newSocket.auth = { username: session.userId }
      newSocket.connect()
      setSocket(newSocket)
    }
  }, [session.userId, socket])

  useEffect(() => {
    if (socket) {
      // client-side
      socket.on("connect", () => {
        console.log("connect", socket.id) // x8WIv7-mJelg7on_ALbx
      })

      socket.on("disconnect", () => {
        console.log("disconnect", socket.id) // undefined
      })

      socket.on("update-players", (gameInfo: GameInfo) => {
        console.log("update-players", gameInfo)
        dispatch(setGameInfo(gameInfo))
      })
    }
  }, [dispatch, socket])

  return <SocketContext.Provider value={{ socket, setSocket }}>{children}</SocketContext.Provider>
}

function useSocket() {
  const context = React.useContext(SocketContext)
  if (context === undefined) {
    throw new Error("useSocket must be used within a SocketProvider")
  }
  return context
}

export { SocketProvider, useSocket }
