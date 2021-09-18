import { TextField, StandardTextFieldProps } from "@material-ui/core"
import React, { forwardRef, PropsWithoutRef, useEffect, useRef, useState } from "react"
import { useField } from "react-final-form"
import getSanitizedString from "app/utils/getSanitizedString"

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
  ({ name, label, placeholder, outerProps, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name, {
      parse: props.type === "number" ? Number : undefined,
    })

    const testId = useRef<string>(
      getSanitizedString("labeled-text-field-" + (props.testId || label || placeholder || name))
    )

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

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
        inputProps={{ "data-testid": testId.current }}
      />
    )
  }
)

export default LabeledTextField
