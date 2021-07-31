import { Box, Button, makeStyles } from "@material-ui/core"
import { blue } from "@material-ui/core/colors"
import { DashboardViews, setDashboardView } from "app/redux/uiSlice"
import React from "react"
import { useDispatch } from "react-redux"

interface Props {}

const DashboardHeader = (props: Props) => {
  const { button } = useStyles()
  const dispatch = useDispatch()

  const onClick = (view: DashboardViews) => {
    dispatch(setDashboardView(view))
  }

  return (
    <Box
      display="flex"
      borderBottom={`1px solid ${blue[900]}`}
      flexDirection="row"
      justifyContent="flex-start"
      marginBottom={1}
    >
      <Button
        variant="contained"
        color="primary"
        className={button}
        onClick={() => onClick(DashboardViews.GAMES)}
      >
        Games
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={button}
        onClick={() => onClick(DashboardViews.QUESTIONS)}
      >
        Questions
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={button}
        onClick={() => onClick(DashboardViews.ANSWERS)}
      >
        Answers
      </Button>
    </Box>
  )
}

export default DashboardHeader

const useStyles = makeStyles((theme) => ({
  button: { borderBottomLeftRadius: 0, borderBottomRightRadius: 0, marginRight: theme.spacing(1) },
}))
