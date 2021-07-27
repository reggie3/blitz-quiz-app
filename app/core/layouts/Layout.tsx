import React, { ReactNode } from "react"
import { Head } from "blitz"
import Navbar from "../components/Navbar"
import CssBaseline from "@material-ui/core/CssBaseline"
import { makeStyles } from "@material-ui/core"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  const { container } = useStyles()
  return (
    <div className={container}>
      <CssBaseline />
      <Head>
        <title>{title || "blitz-quiz-app"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      {children}
    </div>
  )
}

export default Layout

const useStyles = makeStyles({
  container: {
    backgroundColor: "lightyellow",
    height: "100vh",
  },
})
