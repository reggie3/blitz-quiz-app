import { Suspense, useState } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getAnswer from "app/answers/queries/getAnswer"
import updateAnswer from "app/answers/mutations/updateAnswer"
import { AnswerForm, FORM_ERROR } from "app/answers/components/AnswerForm"
import Alert from "@material-ui/lab/Alert"
import MyClickableLink from "app/core/components/myComponents/MyClickableLink"
import { UpdateAnswer } from "app/validations"

export const EditAnswer = () => {
  const [shouldShowSaveSuccess, setShouldShowSaveSuccess] = useState<boolean>(false)
  const answerId = useParam("answerId", "string")
  const [answer, { setQueryData }] = useQuery(
    getAnswer,
    { id: answerId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateAnswerMutation] = useMutation(updateAnswer)

  const onAnswerSaved = () => {
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
          Answer saved successfully
        </Alert>
      )}
      <Head>
        <title>Edit Answer {answer.id}</title>
      </Head>

      <div>
        <h1>Edit Answer {answer.id}</h1>
        <pre>{JSON.stringify(answer)}</pre>

        <AnswerForm
          submitText="Update Answer"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // @ts-ignore
          schema={UpdateAnswer}
          initialValues={answer}
          onSubmit={async (values) => {
            try {
              const updated = await updateAnswerMutation({
                // @ts-ignore id is specified more than once
                id: answer.id,
                ...values,
              })
              await setQueryData(updated)

              onAnswerSaved()
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

const EditAnswerPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditAnswer />
      </Suspense>

      <p>
        <MyClickableLink onClick={() => router.push("/")}>Answers</MyClickableLink>
      </p>
    </div>
  )
}

EditAnswerPage.authenticate = true
EditAnswerPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditAnswerPage
