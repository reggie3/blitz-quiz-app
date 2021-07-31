import { Suspense, useState } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getQuestion from "app/questions/queries/getQuestion"
import updateQuestion, { UpdateQuestion } from "app/questions/mutations/updateQuestion"
import { QuestionForm, FORM_ERROR } from "app/questions/components/QuestionForm"
import Alert from "@material-ui/lab/Alert"
import MyClickableLink from "app/core/components/myComponents/MyClickableLink"

export const EditQuestion = () => {
  const [shouldShowSaveSuccess, setShouldShowSaveSuccess] = useState<boolean>(false)
  const questionId = useParam("questionId", "number")
  const [question, { setQueryData }] = useQuery(
    getQuestion,
    { id: questionId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateQuestionMutation] = useMutation(updateQuestion)

  const onQuestionSaved = (id: number) => {
    setShouldShowSaveSuccess(true)
  }

  return (
    <>
      {shouldShowSaveSuccess && (
        <Alert
          onClose={() => {
            setShouldShowSaveSuccess(false)
          }}
        >
          Question saved successfully
        </Alert>
      )}
      <Head>
        <title>Edit Question {question.id}</title>
      </Head>

      <div>
        <h1>Edit Question {question.id}</h1>
        <pre>{JSON.stringify(question)}</pre>

        <QuestionForm
          submitText="Update Question"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          schema={UpdateQuestion}
          initialValues={question}
          onSubmit={async (values) => {
            try {
              const updated = await updateQuestionMutation({
                // @ts-ignore id is specified more than once
                id: question.id,
                ...values,
              })
              await setQueryData(updated)
              onQuestionSaved(updated.id)
            } catch (error) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditQuestionPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditQuestion />
      </Suspense>

      <p>
        <MyClickableLink onClick={() => router.push("/")}>Questions</MyClickableLink>
      </p>
    </div>
  )
}

EditQuestionPage.authenticate = true
EditQuestionPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditQuestionPage
