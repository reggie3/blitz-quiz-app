import { useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createQuestion from "app/questions/mutations/createQuestion"
import { QuestionForm, FORM_ERROR } from "app/questions/components/QuestionForm"
import MyClickableLink from "app/core/components/myComponents/MyClickableLink"
import { CreateQuestion } from "app/validations"
import { Box } from "@material-ui/core"

const NewQuestionPage: BlitzPage = () => {
  const router = useRouter()
  const [createQuestionMutation] = useMutation(createQuestion)

  return (
    <div>
      <h1>Create New Question</h1>

      <QuestionForm
        submitText="Create Question"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        schema={CreateQuestion}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const question = await createQuestionMutation(values)
            router.push(Routes.Home())
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <Box my={1}>
        <MyClickableLink onClick={() => router.push("/")}>Questions</MyClickableLink>
      </Box>
    </div>
  )
}

NewQuestionPage.authenticate = true
NewQuestionPage.getLayout = (page) => <Layout title={"Create New Question"}>{page}</Layout>

export default NewQuestionPage
