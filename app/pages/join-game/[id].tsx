import { Head, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useParams } from "blitz"

const JoinGamePage: BlitzPage = () => {
  const params = useParams()

  return (
    <>
      <Head>
        <title>Join Game</title>
      </Head>

      <div>
        <p>Join Game {JSON.stringify(params)}</p>
      </div>
    </>
  )
}

JoinGamePage.authenticate = false
JoinGamePage.getLayout = (page) => <Layout>{page}</Layout>

export default JoinGamePage
