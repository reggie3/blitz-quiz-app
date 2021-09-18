const getSanitizedString = (...args: string[]): string => {
  return args
    .join()
    .trim()
    .replace(/[^a-zA-Z0-9]/g, "-")
    .replace(/[-]+/g, "-")
    .toLowerCase()
}

export default getSanitizedString
