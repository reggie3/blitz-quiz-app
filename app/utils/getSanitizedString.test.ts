import getSanitizedString from "./getSanitizedString"

describe("getSanitizedString test", () => {
  it("should return a string", () => {
    expect(getSanitizedString(" this is a string")).toMatchInlineSnapshot(`"this-is-a-string"`)
    expect(getSanitizedString(" this !is a !@string")).toMatchInlineSnapshot(`"this-is-a-string"`)
    expect(getSanitizedString(" 1234-this is a string")).toMatchInlineSnapshot(
      `"1234-this-is-a-string"`
    )
  })
})
