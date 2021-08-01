import getAnswersByUserId from "app/answers/queries/getAnswersByUserId"
import { useRouter, usePaginatedQuery, Routes } from "blitz"
import { Answer } from "db"
import React from "react"
import ListHeader from "../myComponents/ListHeader"
import AnswerCard from "./AnswerCard"
import AddIcon from "@material-ui/icons/Add"
import { Box } from "@material-ui/core"
import getAnswersByQuestionId from "app/answers/queries/getAnswersByQuestionId"

interface Props {
  questionId?: string
  shouldShowHeader?: boolean
}

interface Props {}

const ITEMS_PER_PAGE = 20

const getQuery = (questionId?: string) => {
  if (questionId) {
    return getAnswersByQuestionId
  }

  return getAnswersByUserId
}

const getQueryInfo = (page: number, questionId?: string) => {
  const baseQuery = {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  }
  if (Boolean(questionId)) {
    return { ...baseQuery, where: { questionIds: { has: questionId } } }
  }
  return baseQuery
}

const MyAnswersList = ({ questionId, shouldShowHeader = true }: Props) => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ answers, hasMore }, { refetch }] = usePaginatedQuery(
    getQuery(questionId),
    getQueryInfo(page, questionId)
  )

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
      {shouldShowHeader && (
        <ListHeader
          startButtonProps={[
            {
              icon: <AddIcon />,
              label: "Create New Answer",
              onClick: onClickNewAnswer,
            },
          ]}
        />
      )}
      {!answers?.length && <p>No answers yet.</p>}
      {Boolean(answers?.length) &&
        answers.map((answer: Answer) => (
          <AnswerCard key={answer.id} answer={answer} refetch={refetch} />
        ))}
    </div>
  )
}

export default MyAnswersList
