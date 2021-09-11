import React, { ReactNode } from "react"
import { Head } from "blitz"
import MyAppbar from "../components/MyAppbar"
import CssBaseline from "@material-ui/core/CssBaseline"
import { Box, makeStyles, Paper } from "@material-ui/core"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  const { rootContainer, content, contentContainer, sideBars } = useStyles()
  return (
    <div className={rootContainer} data-testid="layout-root-container">
      <CssBaseline />
      <Head>
        <title>{title || "blitz-quiz-app"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MyAppbar />
      <Box data-testid="layout-content-container" className={contentContainer}>
        <div className={sideBars} />
        <Paper data-testid="layout-content" className={content}>
          {children}
        </Paper>
        <div className={sideBars} />
      </Box>
    </div>
  )
}

export default Layout

const useStyles = makeStyles((theme) => ({
  rootContainer: {
    backgroundColor: "whitesmoke",
    height: "100vh",
    display: "grid",
    gridTemplateRows: `52px auto`,
  },
  content: {
    backgroundColor: "powderblue",
    width: "80%",
    maxWidth: "800px",
    minWidth: "600px",
    padding: theme.spacing(2),
  },
  contentContainer: {
    display: "flex",
    justifyContent: "center",
  },
  sideBars: {
    minWidth: 0,
  },
}))
