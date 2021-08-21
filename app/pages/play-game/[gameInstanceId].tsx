import { Head, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useParams } from "blitz"
import React, { Suspense } from "react"
import { SocketProvider } from "app/context/socketContext"
import { Typography } from "@material-ui/core"

const PlayGamePage: BlitzPage = () => {
  const { gameInstanceId } = useParams()

  return (
    <>
      <Head>
        <title>Play Game</title>
      </Head>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <SocketProvider>
            <Typography>Play Game {gameInstanceId}</Typography>
          </SocketProvider>
        </Suspense>
      </div>
    </>
  )
}

PlayGamePage.authenticate = false
PlayGamePage.getLayout = (page) => <Layout>{page}</Layout>

export default PlayGamePage
