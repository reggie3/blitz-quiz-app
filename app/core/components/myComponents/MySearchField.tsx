import { CircularProgress, TextField } from "@material-ui/core"
import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteInputChangeReason,
} from "@material-ui/lab"
import React from "react"

interface Props<ObjectType> {
  testId: string
  getOptionLabel: (option: ObjectType) => string
  getOptionSelected: (option: ObjectType, value: ObjectType) => boolean
  inputValue: string
  isLoading: boolean
  isOpen: boolean
  onClose: () => void
  onChange: (
    event: React.ChangeEvent<{}>,
    value: string | ObjectType | null,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<ObjectType> | undefined
  ) => void
  onInputChange: (
    event: React.ChangeEvent<{}>,
    value: string,
    reason: AutocompleteInputChangeReason
  ) => void
  onOpen: () => void
  options: ObjectType[]
  textKey: string
  value: ObjectType | null
}

const MySearchField = <ObjectType extends object>({
  testId,
  getOptionLabel,
  isOpen,
  isLoading,
  inputValue,
  onClose,
  onChange,
  onInputChange,
  onOpen,
  options,
  textKey,
  value,
}: Props<ObjectType>) => {
  return (
    <div>
      <Autocomplete
        data-testid={testId}
        fullWidth
        freeSolo
        getOptionLabel={(option) => {
          return option?.[textKey] ?? ""
        }}
        getOptionSelected={(option, value) => option[textKey] === value[textKey]}
        inputValue={inputValue}
        loading={isLoading}
        onInputChange={onInputChange}
        open={isOpen}
        onChange={onChange}
        onClose={onClose}
        onOpen={onOpen}
        options={options}
        renderInput={(params) => (
          <TextField
            data-testid={`${testId}-input`}
            {...params}
            placeholder="Question"
            value={inputValue}
            fullWidth
            // onKeyDown={onKeyDown}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {isLoading && <CircularProgress size={20} />}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        value={value}
      />
    </div>
  )
}

export default MySearchField
