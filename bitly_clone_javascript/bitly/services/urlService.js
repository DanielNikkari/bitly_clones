import { executeQuery } from "../database/database.js"

const addUrlToDatabase = async (inputUrl, shortUrl) => {
  await executeQuery(`INSERT INTO urls (url, short_url) VALUES ($inputUrl, $shortUrl);`, {inputUrl, shortUrl})
}

const getWhitShortUrl = async (checkUrl) => {
  const res = await executeQuery(`SELECT * FROM urls WHERE (short_url = $checkUrl);`, {checkUrl})
  return res.rows
}

const getWithId = async (id) => {
  const res = await executeQuery(`SELECT * FROM urls WHERE (url_id = $id);`, {id})
  return res.rows
}

const getAll = async () => {
  const res = await executeQuery("SELECT * FROM urls;")
  return res.rows
}

const deleteFromDb = async (url) => {
  await executeQuery(`DELETE FROM urls WHERE url = $url;`, {url})
  console.log("db objects deleted")
}

export { addUrlToDatabase, getWhitShortUrl, getAll, getWithId, deleteFromDb }