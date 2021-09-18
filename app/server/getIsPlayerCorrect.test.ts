/* fix
  "getIsPlayerCorrect.test.ts' cannot be compiled under '--isolatedModules'
  because it is considered a global script file. Add an import, export, or an
  empty 'export {}' statement to make it a module."
*/

import {
  mockCorrectAndIncorrectAnswerIds,
  mockCorrectAnswerIds,
  mockMultipleCorrectAnswerIds,
  mockQuestionWithAnswers1,
  mockQuestionWithMultipleCorrectAnswers,
} from "test/mockData/mockData"
import { getIsPlayerCorrect } from "./getIsPlayerCorrect"

export {}

describe("getIsPlayerCorrect tests", () => {
  it("should return false if the player does not supply any answer", () => {
    expect(getIsPlayerCorrect(mockQuestionWithAnswers1, [])).toBe(false)
  })
  it("should return false if the players selected answers has correct and incorrect answers", () => {
    expect(getIsPlayerCorrect(mockQuestionWithAnswers1, mockCorrectAndIncorrectAnswerIds)).toBe(
      false
    )
  })
  it("should return true if the players selected answers has only the correct answer", () => {
    expect(getIsPlayerCorrect(mockQuestionWithAnswers1, mockCorrectAnswerIds)).toBe(true)
  })
  it("should return true if the players selected has selected all the correct answers", () => {
    expect(
      getIsPlayerCorrect(mockQuestionWithMultipleCorrectAnswers, mockMultipleCorrectAnswerIds)
    ).toBe(true)
  })
})
