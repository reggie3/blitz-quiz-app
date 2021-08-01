import { Box, CircularProgress, IconButton, TextField } from "@material-ui/core"
import React, { KeyboardEvent, useEffect, useState } from "react"
import { useDebounce } from "use-debounce"
import { useMutation, useQuery } from "blitz"
import getQuestionsBySearchText from "app/questions/queries/getQuestionsBySearchText"
import { Autocomplete } from "@material-ui/lab"
import { Question } from "db"
import createQuestion from "app/questions/mutations/createQuestion"
import updateGame from "app/games/mutations/updateGame"
import MySearchField from "../myComponents/MySearchField"

interface Props {
  isVisible: boolean
}

const AddQuestionToGame = ({ isVisible }: Props) => {
  const [inputValue, setInputValue] = useState<string>("")
  const [searchValue] = useDebounce(inputValue, 1000)
  const [isSearching, setIsSearching] = useState<boolean>(false)
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

  useEffect(() => {
    console.log("questions", questions)
  }, [questions])

  useEffect(() => {
    console.log("searchValue in useEffect", searchValue)
  }, [searchValue])

  useEffect(() => {
    console.log("value in useEffect", value)
  }, [value])

  const onClickSave = () => {
    setInputValue("")
  }

  const onQuestionSelected = (question: Question) => {
    console.log("onQuestionSelected question", question)
  }

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
                  id: 0,
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
            textKey="text"
            value={value}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default AddQuestionToGame
