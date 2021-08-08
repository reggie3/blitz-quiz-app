import { Box } from "@material-ui/core"
import React, { useCallback, useEffect, useState } from "react"
import { useDebounce } from "use-debounce"
import { useMutation, useQuery } from "blitz"
import getAnswersBySearchText from "app/answers/queries/getAnswersBySearchText"
import { Game, Answer, Question } from "db"
import updateGame from "app/games/mutations/updateGame"
import { invalidateQuery } from "blitz"
import getAnswersByGameId from "app/answers/queries/getAnswersByQuestionId"
import getGamesByUserId from "app/games/queries/getGamesByUserId"
import updateQuestion from "app/questions/mutations/updateQuestion"
import getQuestionsByGameId from "app/questions/queries/getQuestionsByGameId"
import MySearchField from "../myComponents/MySearchField"
import createAnswer from "app/answers/mutations/createAnswer"
import getQuestions from "app/questions/queries/getQuestions"
import getQuestionsByUserId from "app/questions/queries/getQuestionsByUserId"

interface Props {
  question: Question
  isVisible: boolean
}

const AddAnswerToQuestion = ({ question, isVisible }: Props) => {
  const [inputValue, setInputValue] = useState<string>("")
  const [searchValue] = useDebounce(inputValue, 1000)
  const [answers, { refetch, status }] = useQuery(
    getAnswersBySearchText,
    { searchValue },
    { enabled: Boolean(searchValue) }
  )
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState<Answer | null>(null)
  const [createAnswerMutation] = useMutation(createAnswer)
  const [updateQuestionMutation] = useMutation(updateQuestion)

  const isLoading = status.toLowerCase() === "loading"

  const addAnswerToQuestion = useCallback(
    async (answer: Answer) => {
      try {
        const updateQuestionMutationRes = await updateQuestionMutation({
          id: question.id,
          answerIds: [...question.answerIds, answer.id] as string[],
        })
        invalidateQuery(getQuestionsByUserId)
        invalidateQuery(getAnswersByGameId)
        setValue(null)
        setInputValue("")
      } catch (error) {
        console.error(error)
      }
    },
    [question.answerIds, question.id, updateQuestionMutation]
  )

  const createNewAnswer = useCallback(async () => {
    if (value) {
      try {
        const answerRes = await createAnswerMutation({ ...value, questionIds: [question.id] })

        addAnswerToQuestion(answerRes)
      } catch (error) {
        console.error(error)
      }
    }
  }, [addAnswerToQuestion, createAnswerMutation, question.id, value])

  useEffect(() => {
    console.log("value in useEffect", value)
    if (value?.text && !value.id) {
      createNewAnswer()
    } else if (value?.id && answers) {
      const selectedAnswer = answers.find((answer) => answer.id === value?.id)
      selectedAnswer && addAnswerToQuestion(selectedAnswer)
    }
  }, [addAnswerToQuestion, answers, createNewAnswer, value])

  if (!isVisible) return null

  return (
    <Box mx={1} borderTop="1px solid lightgray" padding={1}>
      <Box display="flex" flex="row" alignItems="center">
        <Box flex="1" marginLeft={2}>
          <MySearchField
            testId="add-answer-to-question-search-field"
            getOptionLabel={(option) => {
              return option?.text ?? ""
            }}
            getOptionSelected={(option, value) => option.text === value.text}
            inputValue={inputValue}
            isLoading={isLoading}
            isOpen={isOpen}
            onClose={() => {
              setIsOpen(false)
            }}
            onChange={(event, newValue) => {
              if (typeof newValue === "string") {
                setValue({
                  text: newValue,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                } as Answer)
              } else {
                setValue(newValue)
              }
            }}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue)
            }}
            onOpen={() => {
              setIsOpen(true)
            }}
            options={answers ?? []}
            placeholder="Add Answer"
            textKey="text"
            value={value}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default AddAnswerToQuestion
