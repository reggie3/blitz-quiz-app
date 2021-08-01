import React, { useState } from "react"
import getQuestionsByUserId from "app/questions/queries/getQuestionsByUserId"
import { Routes, usePaginatedQuery, useRouter } from "blitz"
import ListHeader from "../myComponents/ListHeader"
import AddIcon from "@material-ui/icons/Add"
import { Question } from "db"
import QuestionCard from "./QuestionCard"
import getQuestionsByGameId from "app/questions/queries/getQuestionsByGameId"

interface Props {
  gameId?: string
  shouldShowHeader?: boolean
}

const ITEMS_PER_PAGE = 20

const getQuery = (gameId?: string) => {
  if (gameId) {
    return getQuestionsByGameId
  }

  return getQuestionsByUserId
}

const getQueryInfo = (page: number, gameId?: string) => {
  const baseQuery = {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  }
  if (Boolean(gameId)) {
    return { ...baseQuery, where: { gameIds: { has: gameId } } }
  }
  return baseQuery
}

const MyQuestionsList = ({ gameId, shouldShowHeader = true }: Props) => {
  const router = useRouter()

  const [page, setPage] = useState<number>(0)
  const [{ questions, hasMore }, { refetch }] = usePaginatedQuery(
    getQuery(gameId),
    getQueryInfo(page, gameId)
  )

  const goToPreviousPage = () => {
    //  router.push({ query: { page: page - 1 } })
  }
  const goToNextPage = () => {
    //router.push({ query: { page: page + 1 } })
  }

  const onClickNewQuestion = () => {
    router.push(Routes.NewQuestionPage())
  }

  return (
    <div>
      {shouldShowHeader && (
        <ListHeader
          startButtonProps={[
            {
              icon: <AddIcon />,
              label: "Create New Question",
              onClick: onClickNewQuestion,
            },
          ]}
        />
      )}
      {!questions?.length && <p>No questions yet.</p>}
      {Boolean(questions?.length) &&
        questions.map((question: Question) => (
          <QuestionCard key={question.id} question={question} refetch={refetch} />
        ))}
    </div>
  )
}

export default MyQuestionsList
