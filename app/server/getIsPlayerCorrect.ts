import { QuestionWithAnswers } from "myTypes"
import { xor } from "lodash"

export const getIsPlayerCorrect = (
  questionWithAnswers: QuestionWithAnswers,
  playerAnswerIds: string[]
) => {
  // console.count("----- getIsPlayerCorrect")
  // console.log(" questionWithAnswers.question.id = ", questionWithAnswers.question.id)

  if (!playerAnswerIds.length) return false
  // console.log("here 1")

  const { correctAnswerIds } = questionWithAnswers.question
  // console.log("here 2")

  if (xor(correctAnswerIds, playerAnswerIds).length) return false
  // console.log("here 3")
  // console.log(" ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")

  return true
}
