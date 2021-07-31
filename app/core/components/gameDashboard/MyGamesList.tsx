import { Box, Button, IconButton, Paper, Typography } from "@material-ui/core"
import getGames from "app/games/queries/getGames"
import { Routes, useMutation, usePaginatedQuery, useRouter } from "blitz"
import React, { useState } from "react"
import AddIcon from "@material-ui/icons/Add"
import deleteGame from "app/games/mutations/deleteGame"
import ListHeader from "../myComponents/ListHeader"
import GameCard from "./GameCard"
import { Game } from "db"
import getGamesByUserId from "app/games/queries/getGamesByUserId"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

interface Props {}

const ITEMS_PER_PAGE = 20

const MyGamesList = (props: Props) => {
  const router = useRouter()
  const currentUser = useCurrentUser()

  const [page, setPage] = useState<number>(0)
  const [{ games, hasMore }, { refetch }] = usePaginatedQuery(getGamesByUserId, {
    where: { id: currentUser?.id },
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
      {games.map((game: Game) => (
        <GameCard key={game.id} game={game} refetch={refetch} />
      ))}
    </div>
  )
}

export default MyGamesList
