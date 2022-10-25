import { Application } from "./deps.js"
import { renderMiddleware } from "./middleware/renderMiddleware.js"
import { router } from "./routes/routes.js"

const app = new Application()

app.use(renderMiddleware)
app.use(router.routes())

app.listen({ port:7777 })
