import { TextField } from "@material-ui/core"
import React, { forwardRef, PropsWithoutRef } from "react"
import { useField } from "react-final-form"

export interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
}

export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ name, label, outerProps, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name, {
      parse: props.type === "number" ? Number : undefined,
    })

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

    console.log("normalizedError", normalizedError)

    return (
      <TextField
        {...props}
        {...outerProps}
        {...input}
        error={Boolean(normalizedError)}
        variant="standard"
        fullWidth
        helperText={normalizedError}
      />
    )
    // return (
    //   <div {...outerProps}>
    //     <label>
    //       {label}
    //       <input {...input} disabled={submitting} {...props} ref={ref} />
    //     </label>

    //     {touched && normalizedError && (
    //       <div role="alert" style={{ color: "red" }}>
    //         {normalizedError}
    //       </div>
    //     )}

    //     <style jsx>{`
    //       label {
    //         display: flex;
    //         flex-direction: column;
    //         align-items: start;
    //         font-size: 1rem;
    //       }
    //       input {
    //         font-size: 1rem;
    //         padding: 0.25rem 0.5rem;
    //         border-radius: 3px;
    //         border: 1px solid purple;
    //         appearance: none;
    //         margin-top: 0.5rem;
    //       }
    //     `}</style>
    //   </div>
    // )
  }
)

export default LabeledTextField
