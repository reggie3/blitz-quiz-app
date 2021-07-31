import React, { useState } from "react"
import { Routes, usePaginatedQuery, useRouter } from "blitz"
import AddIcon from "@material-ui/icons/Add"
import ListHeader from "../myComponents/ListHeader"
import GameCard from "./GameCard"
import { Game } from "db"
import getGamesByUserId from "app/games/queries/getGamesByUserId"

interface Props {}

const ITEMS_PER_PAGE = 20

const MyGamesList = (props: Props) => {
  const router = useRouter()

  const [page, setPage] = useState<number>(0)
  const [{ games, hasMore }, { refetch }] = usePaginatedQuery(getGamesByUserId, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => {
    //  router.push({ query: { page: page - 1 } })
  }
  const goToNextPage = () => {
    //router.push({ query: { page: page + 1 } })
  }

  const onClickNewGame = () => {
    console.log("on click new game pressed")
    router.push(Routes.NewGamePage())
  }

  return (
    <div>
      <ListHeader
        startButtonProps={[
          {
            icon: <AddIcon />,
            label: "Create New Game",
            onClick: onClickNewGame,
          },
        ]}
      />
      {!games?.length && <p>No games yet.</p>}
      {Boolean(games?.length) &&
        games.map((game: Game) => <GameCard key={game.id} game={game} refetch={refetch} />)}
    </div>
  )
}

export default MyGamesList
