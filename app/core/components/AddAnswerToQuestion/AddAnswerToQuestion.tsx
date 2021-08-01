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

  const createNewAnswer = useCallback(async () => {
    if (value) {
      try {
        const answerRes = await createAnswerMutation({ ...value, questionIds: [question.id] })

        const updateQuestionMutationRes = await updateQuestionMutation({
          id: question.id,
          answerIds: [...question.answerIds, answerRes.id] as string[],
        })
        invalidateQuery(getQuestionsByGameId)
        invalidateQuery(getAnswersByGameId)
        setValue(null)
        setInputValue("")
      } catch (error) {
        console.error(error)
      }
    }
  }, [createAnswerMutation, question.answerIds, question.id, updateQuestionMutation, value])

  const addAnswerToQuestion = async () => {}

  useEffect(() => {
    console.log("value in useEffect", value)
    if (value?.text && !value.id) {
      createNewAnswer()
    } else if (value?.id) {
      addAnswerToQuestion()
    }
  }, [createNewAnswer, value])

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
