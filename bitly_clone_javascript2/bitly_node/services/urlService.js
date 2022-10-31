const database = require('../database/database.js')

const addUrlToDatabase = async (inputUrl, shortUrl) => {
  await database.executeQuery("INSERT INTO urls (url, short_url) VALUES ($1, $2)", [inputUrl, shortUrl])
}

const getWhitShortUrl = async (checkUrl) => {
  const res = await database.executeQuery("SELECT * FROM urls WHERE short_url = $1", [checkUrl])
  return res.rows
}

const getWithId = async (id) => {
  const res = await database.executeQuery("SELECT * FROM urls WHERE url_id = $1", [id])
  return res.rows
}

const getAll = async () => {
  const result = await database.executeQuery("SELECT * FROM urls", [])
  return result.rows
}

const deleteFromDb = async (url) => {
  await database.executeQuery("DELETE FROM urls WHERE url = $1", [url])
}

module.exports = { addUrlToDatabase, getWhitShortUrl, getAll, getWithId, deleteFromDb }