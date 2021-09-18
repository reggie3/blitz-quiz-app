import { TextField, StandardTextFieldProps } from "@material-ui/core"
import React, { forwardRef, PropsWithoutRef, useRef } from "react"
import { useField } from "react-final-form"

export interface LabeledTextFieldProps extends StandardTextFieldProps {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  color?: "primary" | "secondary"
  testId?: string
}

export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ name, label, outerProps, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name, {
      parse: props.type === "number" ? Number : undefined,
    })
    const testId = useRef('labeled-text-field' + testId ?? props.n)
    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

    console.log("normalizedError", normalizedError)

    return (
      <TextField
        {...props}
        {...outerProps}
        {...input}
        color={props.color}
        error={Boolean(normalizedError && touched)}
        variant="standard"
        fullWidth
        helperText={touched ? normalizedError : undefined}
        inputProps={{'data-testid': }}
      />
    )
  }
)

export default LabeledTextField
