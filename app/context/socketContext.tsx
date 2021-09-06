import {
  addQuestion,
  setIsRoundComplete,
  setGameInfo,
  setIsGameComplete,
  setCurrentRound,
} from "app/redux/gameSlice"
import { useSession } from "blitz"
import { GameInfo, QuestionWithAnswers } from "myTypes"
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { Socket } from "socket.io-client"
import { io } from "socket.io-client"
import { SocketMessages } from "socketTypes"

const SocketContext = React.createContext<{ socket: Socket | null } | undefined>(undefined)

const SocketProvider = ({ children }) => {
  // const [socket, setSocket] = useState<Socket | null>(null)
  const socket = useRef<Socket | null>(null)
  const session = useSession()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!socket.current) {
      console.log("*** Creating new socket")
      const newSocket = io("", { autoConnect: false })
      newSocket.onAny((event, ...args) => {
        console.log(event, args)
      })
      newSocket.auth = { username: session.userId }
      newSocket.connect()
      socket.current = newSocket
    }
  }, [session.userId, socket])

  useEffect(() => {
    if (socket.current) {
      // client-side
      socket.current.on("connect", () => {
        console.log("connect", socket.current!.id) // x8WIv7-mJelg7on_ALbx
      })

      socket.current.on("disconnect", () => {
        console.log("disconnect", socket.current!.id) // undefined
      })

      socket.current.on("update-players", (gameInfo: GameInfo) => {
        console.log("update-players", gameInfo)
        dispatch(setGameInfo(gameInfo))
      })

      socket.current.on(
        "new-question",
        (questionWithAnswers: QuestionWithAnswers, currentRound: number) => {
          console.log("new-question", questionWithAnswers)
          console.log("currentRound", currentRound)

          dispatch(setIsRoundComplete(false))
          dispatch(addQuestion(questionWithAnswers))
          dispatch(setCurrentRound(currentRound))
        }
      )

      socket.current.on("end-round", () => {
        dispatch(setIsRoundComplete(true))
      })
      socket.current.on("end-game", () => {
        dispatch(setIsGameComplete(true))
      })
    }
  }, [dispatch])

  return (
    <SocketContext.Provider value={{ socket: socket.current }}>{children}</SocketContext.Provider>
  )
}

function useSocket() {
  const context = React.useContext(SocketContext)
  if (context === undefined) {
    throw new Error("useSocket must be used within a SocketProvider")
  }
  return context
}

export { SocketProvider, useSocket }
