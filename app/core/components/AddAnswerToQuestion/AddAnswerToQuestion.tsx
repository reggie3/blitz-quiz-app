import { Box } from "@material-ui/core"
import React, { useCallback, useEffect, useState } from "react"
import { useDebounce } from "use-debounce"
import { useMutation, useQuery } from "blitz"
import getAnswersBySearchText from "app/answers/queries/getAnswersBySearchText"
import { Game, Answer, Question } from "db"
import { invalidateQuery } from "blitz"
import getAnswersByGameId from "app/answers/queries/getAnswersByQuestionId"
import getGamesByUserId from "app/games/queries/getGamesByUserId"
import updateQuestion from "app/questions/mutations/updateQuestion"
import getQuestionsByGameId from "app/questions/queries/getQuestionsByGameId"
import MySearchField from "../myComponents/MySearchField"
import createAnswer from "app/answers/mutations/createAnswer"
import updateAnswer from "app/answers/mutations/updateAnswer"

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
  const [answer, setAnswer] = useState<Answer | null>(null)
  const [createAnswerMutation] = useMutation(createAnswer)
  const [updateQuestionMutation] = useMutation(updateQuestion)
  const [updateAnswerMutation] = useMutation(updateAnswer)

  const isLoading = status.toLowerCase() === "loading"

  const addQuestionToAnswer = useCallback(
    async (answer: Answer, questionId: string) => {
      const updateAnswerMutationRes = await updateAnswerMutation({
        id: answer.id,
        questionIds: [...answer.questionIds, questionId],
      })
      invalidateQuery(getAnswersByGameId)
    },
    [updateAnswerMutation]
  )

  const addAnswerToQuestion = useCallback(
    async (answerId: string) => {
      const updateQuestionMutationRes = await updateQuestionMutation({
        id: question.id,
        answerIds: [...question.answerIds, answerId] as string[],
      })
      answer && addQuestionToAnswer(answer, question.id)
      invalidateQuery(getQuestionsByGameId)
      invalidateQuery(getAnswersByGameId)
    },
    [addQuestionToAnswer, answer, question.answerIds, question.id, updateQuestionMutation]
  )

  const createNewAnswer = useCallback(async () => {
    if (answer) {
      try {
        const answerRes = await createAnswerMutation({ ...answer, questionIds: [question.id] })
        addAnswerToQuestion(answerRes.id)
        setAnswer(null)
        setInputValue("")
      } catch (error) {
        console.error(error)
      }
    }
  }, [addAnswerToQuestion, createAnswerMutation, question.id, answer])

  useEffect(() => {
    console.log("answer in useEffect", answer)
    if (answer?.text && !answer.id) {
      createNewAnswer()
    } else if (answer?.id) {
      addAnswerToQuestion(answer.id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answer])

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
                setAnswer({
                  text: newValue,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                } as Answer)
              } else {
                setAnswer(newValue)
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
            value={answer}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default AddAnswerToQuestion
