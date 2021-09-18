import { render, screen } from "test/utils"
import userEvent from "@testing-library/user-event"

import NewAnswerPage from "./new"

const { queryByTestId } = screen
describe("new answer test", () => {
  it("should let the user create a new answer", () => {
    render(<NewAnswerPage />)
    userEvent.type(queryByTestId("labeled-text-field-answer")!, "HELLO NURSE")
    // userEvent.click(queryByTestId("button-create-answer")!)
    console.log(screen.debug())
  })
})
