import { render, screen } from "test/utils"
import NewAnswerPage from "./new"

describe("new answer test", () => {
  it("should let the user create a new answer", () => {
    render(<NewAnswerPage />)
    console.log(screen.debug())
  })
})
