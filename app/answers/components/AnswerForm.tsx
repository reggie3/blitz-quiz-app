import { Box } from "@material-ui/core"
import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import React from "react"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function AnswerForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <Box py={1}>
        <LabeledTextField name="text" label="Answer" placeholder="Answer" />
      </Box>
    </Form>
  )
}
