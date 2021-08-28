import { Paper } from "@material-ui/core"
import { RootState } from "app/redux/store"
import React from "react"
import { useSelector } from "react-redux"
import QuestionWithAnswer from "../QuestionWithAnswer/QuestionWithAnswer"

interface Props {}

const PlayGame = (props: Props) => {
  const { gameInfo } = useSelector((state: RootState) => state.game)

  return <QuestionWithAnswer />
}

export default PlayGame
