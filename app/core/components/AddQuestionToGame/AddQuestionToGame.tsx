import { Box, CircularProgress, IconButton, TextField } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { useDebounce } from "use-debounce"
import SaveIcon from "@material-ui/icons/Save"
import { useQuery } from "blitz"
import getQuestionsBySearchText from "app/questions/queries/getQuestionsBySearchText"
import { Autocomplete } from "@material-ui/lab"
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

  useEffect(() => {
    if (status === "loading") {
      setIsSearching(true)
    } else {
      setIsSearching(false)
    }
  }, [status])

  useEffect(() => {
    console.log("questions", questions)
  }, [questions])

  useEffect(() => {
    console.log("searchValue in useEffect", searchValue)
  }, [searchValue])

  const onClickSave = () => {
    setInputValue("")
  }

  if (!isVisible) return null

  return (
    <Box mx={1} borderTop="1px solid lightgray" padding={1}>
      <Box display="flex" flex="row" alignItems="center">
        <Box flex="1">
          <Autocomplete
            data-testid="search-auto-complete"
            fullWidth
            options={questions ?? []}
            freeSolo
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue)
            }}
            getOptionLabel={(option) => {
              return option.text
            }}
            renderInput={(params) => (
              <TextField
                data-testid="search-auto-complete-input"
                {...params}
                placeholder="Question"
                value={inputValue}
                fullWidth
              />
            )}
          />
        </Box>
        {isSearching && (
          <Box mx={1} width={20} height={20}>
            <CircularProgress size={18} />
          </Box>
        )}
        {!isSearching && (
          <IconButton onClick={onClickSave} size="small">
            <SaveIcon style={{ fontSize: 18 }} />
          </IconButton>
        )}
      </Box>
    </Box>
  )
}

export default AddQuestionToGame
