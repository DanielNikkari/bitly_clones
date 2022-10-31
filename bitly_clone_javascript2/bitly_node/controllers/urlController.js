const database = require('../database/database.js')
const urlService = require('../services/urlService.js')

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

const testQuery = async () => {
  const result = await urlService.deleteFromDb("https://danielnikkari.github.io/react_portfolio/")
  console.log("Result: ", result)
}

const generateShortUrl = async (body, response) => {
  const url = body.originalURL
  console.log("url ", url)
  
  let randomFound = false
  let res
  const urlLength = 6
  let randomUrl
  while (!randomFound) {
    randomUrl = randomString(urlLength)
    res = await urlService.getWhitShortUrl(randomUrl)
    if (res.length === 0) {
      randomFound = true
    }
  }
  await urlService.addUrlToDatabase(url, randomUrl)
  const id = (await urlService.getWhitShortUrl(randomUrl))[0].url_id
  response.redirect(`/shortened/${id}`)
}

const shortenedUrl = async (id, response) => {
  const res = (await urlService.getWithId(id))[0]
  response.render('shortened', {origUrl: res.url, shortenedUrl: res.short_url})
}

const openShortUrl = async (shortUrl, response) => {
  const res = (await urlService.getWhitShortUrl(shortUrl))[0]
  response.redirect(res.url)
}

const randomUrl = async (response) => {
  const res = await urlService.getAll()
  const randomUrlDest = res[randomInt(res.length)].url
  response.redirect(randomUrlDest)
}

module.exports = { testQuery, generateShortUrl, shortenedUrl, openShortUrl, randomUrl }