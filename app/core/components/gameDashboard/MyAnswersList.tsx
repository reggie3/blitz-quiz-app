import getAnswersByUserId from "app/answers/queries/getAnswersByUserId"
import { useRouter, usePaginatedQuery, Routes } from "blitz"
import { Answer } from "db"
import React from "react"
import ListHeader from "../myComponents/ListHeader"
import AnswerCard from "./AnswerCard"
import AddIcon from "@material-ui/icons/Add"
import { Box } from "@material-ui/core"

interface Props {}

interface Props {}

const ITEMS_PER_PAGE = 20

const MyAnswersList = (props: Props) => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ answers, hasMore }, { refetch }] = usePaginatedQuery(getAnswersByUserId, {
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

  const onClickNewAnswer = () => {
    router.push(Routes.NewAnswerPage())
  }

  return (
    <div>
      <ListHeader
        startButtonProps={[
          {
            icon: <AddIcon />,
            label: "Create New Answer",
            onClick: onClickNewAnswer,
          },
        ]}
      />
      {!answers?.length && <p>No answers yet.</p>}
      {Boolean(answers?.length) &&
        answers.map((answer: Answer) => (
          <AnswerCard key={answer.id} answer={answer} refetch={refetch} />
        ))}
    </div>
  )
}

export default MyAnswersList
