import { Head, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"

const JoinGamePage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Join Game</title>
      </Head>

      <div>
        <p>Join Game Page</p>
      </div>
    </>
  )
}

JoinGamePage.authenticate = false
JoinGamePage.getLayout = (page) => <Layout>{page}</Layout>

export default JoinGamePage
