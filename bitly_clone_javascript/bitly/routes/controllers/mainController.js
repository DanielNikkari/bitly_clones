import { getWhitShortUrl, addUrlToDatabase, getAll, getWithId, deleteFromDb } from "../../services/urlService.js"

const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

const randomString = (length) => {
  let result = ''
  const charactersLength = characters.length
  for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }

  return result
}

const randomInt = (max) => {
  return Math.floor(Math.random() * max)
}

const main = ({ render }) => {
  render("main.eta")
}

const transformUrl = async ({ request, response }) => {
  const body = request.body({ type:"form" })
  const params = await body.value
  const inputUrl = params.get("originalURL")

  let randomFound = false
  let res
  const urlLength = 6
  let randomUrl
  while (!randomFound) {
    randomUrl = randomString(urlLength)
    res = await getWhitShortUrl(randomUrl)
    if (res.length === 0) {
      randomFound = true
    }
  }
  await addUrlToDatabase(inputUrl, randomUrl)
  const id = (await getWhitShortUrl(randomUrl))[0].url_id
  response.redirect(`/shortened/${id}`)
}

const shortenedUrl = async ({ render, params }) => {
  const res = (await getWithId(params.id))[0]
  console.log("url_id ", params.id)
  render("shortened.eta", { url_id: params.id, original_url: res.url, shortened_url: res.short_url })
}

const openShortUrl = async ({ params, response }) => {
  const destination = (await getWhitShortUrl(params.shortened_url))[0].url
  response.redirect(destination)
}

const randomUrl = async ({response}) => {
  const res = await getAll()
  const randomUrlDest = res[randomInt(res.length)].url
  response.redirect(randomUrlDest)
}

export { main, transformUrl, shortenedUrl, openShortUrl, randomUrl }