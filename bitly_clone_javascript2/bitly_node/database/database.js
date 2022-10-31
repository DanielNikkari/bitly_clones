const { Pool, Client } = require('pg')
// let client = new Client()
const pool = new Pool()

const executeQuery = async (queryString, params) => {
  console.log("executeQuery called")
  const response = {}
  const client = await pool.connect()
  try {
    const res = await client.query(queryString, params)
    if (res.rows) {
      response.rows = res.rows
    }
  } catch (e) {
    console.log("Error happened with database", e)
  } finally {
    client.release()
  }
  return response
}

module.exports = { executeQuery }