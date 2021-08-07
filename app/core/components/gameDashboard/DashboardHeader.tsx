import { Box, Button, makeStyles, Tab, Tabs } from "@material-ui/core"
import { blue } from "@material-ui/core/colors"
import { RootState } from "app/redux/store"
import { DashboardViews, setDashboardView } from "app/redux/uiSlice"
import React from "react"
import { useDispatch, useSelector } from "react-redux"

interface Props {}

const DashboardHeader = (props: Props) => {
  const { button } = useStyles()
  const dispatch = useDispatch()
  const { dashboardView } = useSelector((state: RootState) => state.ui)

  const handleChange = (_event, newValue: DashboardViews) => {
    dispatch(setDashboardView(newValue))
  }

  return (
    <Box marginBottom={1}>
      <Tabs
        value={dashboardView}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
      >
        <Tab label="Games" value={DashboardViews.GAMES} />
        <Tab label="Questions" value={DashboardViews.QUESTIONS} />
        <Tab label="Answers" value={DashboardViews.ANSWERS} />
      </Tabs>
    </Box>
  )
}

export default DashboardHeader

const useStyles = makeStyles((theme) => ({
  button: { borderBottomLeftRadius: 0, borderBottomRightRadius: 0, marginRight: theme.spacing(1) },
}))
