import { QuestionWithAnswers } from "myTypes"
import { xor } from "lodash"

export const getIsPlayerCorrect = (
  questionWithAnswers: QuestionWithAnswers,
  playerAnswerIds: string[]
) => {
  if (!playerAnswerIds.length) return false

  const { correctAnswerIds } = questionWithAnswers.question

  if (xor(correctAnswerIds, playerAnswerIds).length) return false

  return true
}
