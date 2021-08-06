import { BlitzApiRequest, BlitzApiResponse } from "blitz"

const { Server } = require("socket.io")
const io = new Server(server)

const handler = (req: BlitzApiRequest, res: BlitzApiResponse) => {
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify({ name: "John Doe" }))
}
export default handler
