import { RootState } from "app/redux/store"
import React from "react"
import { useSelector } from "react-redux"

interface Props {}

const PlayGame = (props: Props) => {
  const { gameInfo } = useSelector((state: RootState) => state.game)

  return <div>Play Game {gameInfo.gameInstanceId}</div>
}

export default PlayGame
