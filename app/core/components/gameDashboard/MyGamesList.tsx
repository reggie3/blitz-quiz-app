import { Box, Button, IconButton, Paper, Typography } from "@material-ui/core"
import getGames from "app/games/queries/getGames"
import { Routes, useMutation, usePaginatedQuery, useRouter } from "blitz"
import React, { useState } from "react"
import MyButton from "../myComponents/MyButton"
import DeleteIcon from "@material-ui/icons/Delete"
import MySubTitle from "../myComponents/MyTopography/MySubTitle"
import ListHeader from "../myComponents/ListHeader"
import AddIcon from "@material-ui/icons/Add"
import deleteGame from "app/games/mutations/deleteGame"

interface Props {}

const ITEMS_PER_PAGE = 20

const MyGamesList = (props: Props) => {
  const router = useRouter()
  const [deleteGameMutation] = useMutation(deleteGame)

  const [page, setPage] = useState<number>(0)
  const [{ games, hasMore }, { refetch }] = usePaginatedQuery(getGames, {
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

  const onClickStart = (id: number) => {}
  const onClickEdit = (id: number) => {
    router.push(Routes.EditGamePage({ gameId: id }))
  }

  const onClickNewGame = () => {
    console.log("on click new game pressed")
    router.push(Routes.NewGamePage())
  }

  const onClickDelete = async (id: number) => {
    if (window.confirm("This will be deleted")) {
      await deleteGameMutation({ id })
      refetch()
    }
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
      {games.map((game) => (
        <Box key={game.id} mt={1}>
          <Paper>
            <Box display="flex" flexDirection="row" justifyContent="space-between" padding={0.5}>
              <Box display="flex" flexDirection="column">
                <Typography variant="h6">{game.name}</Typography>
                {game.description && <Typography variant="body1">{game.description}</Typography>}
                <MySubTitle>Created: {game.createdAt.toLocaleDateString()}</MySubTitle>
                <MySubTitle>Updated: {game.updatedAt.toLocaleDateString()}</MySubTitle>
              </Box>
              <Box display="flex" alignItems="center">
                <MyButton onClick={() => onClickStart(game.id)}>Start</MyButton>
                <Box width={1} />
                <MyButton onClick={() => onClickEdit(game.id)}>Edit</MyButton>
                <IconButton onClick={() => onClickDelete(game.id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          </Paper>
        </Box>
      ))}
    </div>
  )
}

export default MyGamesList
