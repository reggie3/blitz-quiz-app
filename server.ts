import blitz from "blitz/custom-server"
import { createServer } from "http"
import { parse } from "url"
import { log } from "@blitzjs/display"
import { BlitzApiRequest, BlitzApiResponse } from "blitz"
import * as socketio from "socket.io"

const { PORT = "3000" } = process.env
const dev = process.env.NODE_ENV !== "production"
const app = blitz({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = createServer((req: BlitzApiRequest, res: BlitzApiResponse) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url!, true)

    handle(req, res, parsedUrl)
  }).listen(PORT, () => {
    log.success(`Ready on http://localhost:${PORT}`)
  })

  const io: socketio.Server = new socketio.Server()
  io.attach(server)

  io.on("connection", (socket: socketio.Socket) => {
    console.log("connection")
    socket.emit("status", "Hello from Socket.io")

    socket.on("disconnect", () => {
      console.log("client disconnected")
    })
  })
})
