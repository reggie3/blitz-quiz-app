import { Box, Button, makeStyles } from "@material-ui/core"
import React, { ReactElement } from "react"

type ButtonProps = {
  icon: ReactElement
  label: string
  onClick: () => void
  testId?: string
}
interface Props {
  startButtonProps?: ButtonProps[]
  endButtonProps?: ButtonProps[]
}

const ListHeader = ({ startButtonProps = [], endButtonProps = [] }: Props) => {
  const { button } = useStyles()
  return (
    <Box display="flex" borderBottom={1} flexDirection="row" justifyContent="space-between">
      <Box display="flex" flexDirection="row">
        {startButtonProps.map(({ icon, label, onClick, testId }) => {
          return (
            <Button
              data-testid={testId ?? label}
              key={label}
              className={button}
              size="small"
              variant="outlined"
              startIcon={icon}
              onClick={onClick}
            >
              {label}
            </Button>
          )
        })}
      </Box>
      <Box display="flex" flexDirection="row-reverse">
        {endButtonProps.map(({ icon, label, onClick, testId }) => {
          return (
            <Button
              data-testid={testId ?? label}
              key={label}
              className={button}
              size="small"
              variant="outlined"
              startIcon={icon}
              onClick={onClick}
            >
              {label}
            </Button>
          )
        })}
      </Box>
    </Box>
  )
}

export default ListHeader

const useStyles = makeStyles({
  button: { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 },
})
