import React, { ReactNode } from "react"
import { Head } from "blitz"
import MyAppbar from "../components/MyAppbar"
import CssBaseline from "@material-ui/core/CssBaseline"
import { Box, makeStyles } from "@material-ui/core"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  const { rootContainer, content, contentContainer, sideBars } = useStyles()
  return (
    <div className={rootContainer} data-testid="root-container">
      <CssBaseline />
      <Head>
        <title>{title || "blitz-quiz-app"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MyAppbar />
      <Box data-testid="content-container" className={contentContainer}>
        <div className={sideBars} />
        <Box data-testid="content" className={content} maxWidth="600" padding={2}>
          {children}
        </Box>
        <div className={sideBars} />
      </Box>
    </div>
  )
}

export default Layout

const useStyles = makeStyles({
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
  },
  contentContainer: {
    display: "flex",
    justifyContent: "center",
  },
  sideBars: {
    minWidth: 0,
  },
})
