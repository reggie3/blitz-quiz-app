import { Box } from "@material-ui/core"
import React, { useCallback, useEffect, useState } from "react"
import { useDebounce } from "use-debounce"
import { useMutation, useQuery } from "blitz"
import getQuestionsBySearchText from "app/questions/queries/getQuestionsBySearchText"
import { Game, Question } from "db"
import createQuestion from "app/questions/mutations/createQuestion"
import updateGame from "app/games/mutations/updateGame"
import updateQuestion from "app/questions/mutations/updateQuestion"
import MySearchField from "../myComponents/MySearchField"
import { invalidateQuery } from "blitz"
import getQuestionsByGameId from "app/questions/queries/getQuestionsByGameId"
import getGamesByUserId from "app/games/queries/getGamesByUserId"
import getQuestion from "app/questions/queries/getQuestion"

interface Props {
  game: Game
  isVisible: boolean
}

const AddQuestionToGame = ({ game, isVisible }: Props) => {
  const [inputValue, setInputValue] = useState<string>("")
  const [searchValue] = useDebounce(inputValue, 1000)
  const [questions, { refetch, status }] = useQuery(
    getQuestionsBySearchText,
    { searchValue },
    { enabled: Boolean(searchValue) }
  )
  const [isOpen, setIsOpen] = useState(false)
  const [question, setQuestion] = useState<Question | null>(null)
  const [createQuestionMutation] = useMutation(createQuestion)
  const [updateGameMutation] = useMutation(updateGame)
  const [updateQuestionMutation] = useMutation(updateQuestion)

  const isLoading = status.toLowerCase() === "loading"

  const addGameToQuestion = useCallback(
    async (question: Question, gameId: string) => {
      const updateQuestionMutationRes = await updateQuestionMutation({
        id: question.id,
        gameIds: [...question.gameIds, gameId],
      })
      invalidateQuery(getQuestionsByGameId)
    },
    [updateQuestionMutation]
  )

  const addQuestionToGame = useCallback(
    async (questionId: string) => {
      const updateGameMutationRes = await updateGameMutation({
        id: game.id,
        questionIds: [...game.questionIds, questionId],
      })
      question && addGameToQuestion(question, game.id)
      invalidateQuery(getGamesByUserId)
      invalidateQuery(getQuestionsByGameId)
    },
    [addGameToQuestion, game.id, game.questionIds, question, updateGameMutation]
  )

  const createNewQuestion = useCallback(async () => {
    if (question) {
      try {
        const questionRes = await createQuestionMutation({ ...question, gameIds: [game.id] })
        addQuestionToGame(questionRes.id)
        setQuestion(null)
        setInputValue("")
      } catch (error) {
        console.error(error)
      }
    }
  }, [addQuestionToGame, createQuestionMutation, game.id, question])

  useEffect(() => {
    console.log("value in useEffect", question)
    if (question?.text && !question.id) {
      createNewQuestion()
    } else if (question?.id) {
      addQuestionToGame(question.id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question])

  if (!isVisible) return null

  return (
    <Box mx={1} borderTop="1px solid lightgray" padding={1}>
      <Box display="flex" flex="row" alignItems="center">
        <Box flex="1" marginLeft={2}>
          <MySearchField
            testId="add-question-to-game-search-field"
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
                setQuestion({
                  text: newValue,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                } as Question)
              } else {
                setQuestion(newValue)
              }
            }}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue)
            }}
            onOpen={() => {
              setIsOpen(true)
            }}
            options={questions ?? []}
            placeholder="Add Question"
            textKey="text"
            value={question}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default AddQuestionToGame
