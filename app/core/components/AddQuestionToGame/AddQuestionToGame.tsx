import { Box } from "@material-ui/core"
import React, { useCallback, useEffect, useState } from "react"
import { useDebounce } from "use-debounce"
import { useMutation, useQuery } from "blitz"
import getQuestionsBySearchText from "app/questions/queries/getQuestionsBySearchText"
import { Game, Question } from "db"
import createQuestion from "app/questions/mutations/createQuestion"
import updateGame from "app/games/mutations/updateGame"
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
  const [value, setValue] = useState<Question | null>(null)
  const [createQuestionMutation] = useMutation(createQuestion)
  const [updateGameMutation] = useMutation(updateGame)

  const isLoading = status.toLowerCase() === "loading"

  const addQuestionToGame = useCallback(
    async (question: Question) => {
      try {
        const updateGameMutationRes = await updateGameMutation({
          id: game.id,
          questionIds: [...game.questionIds, question.id],
        })
        invalidateQuery(getGamesByUserId)
        invalidateQuery(getQuestionsByGameId)
        setValue(null)
        setInputValue("")
      } catch (error) {
        console.error(error)
      }
    },
    [game.id, game.questionIds, updateGameMutation]
  )

  const createNewQuestion = useCallback(async () => {
    if (value) {
      try {
        const questionRes = await createQuestionMutation({ ...value, gameIds: [game.id] })

        addQuestionToGame(questionRes)
      } catch (error) {
        console.error(error)
      }
    }
  }, [addQuestionToGame, createQuestionMutation, game.id, value])

  useEffect(() => {
    console.log("value in useEffect", value)
    if (value?.text && !value.id) {
      createNewQuestion()
    } else if (value?.id && questions) {
      const selectedQuestion = questions.find((question) => question.id === value?.id)
      selectedQuestion && addQuestionToGame(selectedQuestion)
    }
  }, [addQuestionToGame, createNewQuestion, questions, value])

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
                setValue({
                  text: newValue,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                } as Question)
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
            options={questions ?? []}
            placeholder="Add Question"
            textKey="text"
            value={value}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default AddQuestionToGame
