import { Router } from "../deps.js";
import { main, transformUrl, shortenedUrl, openShortUrl, randomUrl } from "./controllers/mainController.js";

const router = new Router()

router.get("/", main)
router.post("/", transformUrl)
router.get("/shortened/:id", shortenedUrl)
router.get("/random", randomUrl)
router.get("/:shortened_url", openShortUrl)


export { router }