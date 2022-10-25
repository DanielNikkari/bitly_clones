import { Pool } from "../deps.js"

const CONNECTIONS = 1
const connectionPool = new Pool({}, CONNECTIONS)

export const executeQuery = async (query, params) => {
  const response = {}
  let client

  try {
    client = await connectionPool.connect()
    const result = await client.queryObject(query, params)
    if (result.rows) {
      response.rows = result.rows
    }
  } catch(e) {
    console.log(e)
    response.error = e
  } finally {
    try {
      await client.release()
    } catch(e) {
      console.log(e)
    }
  }

  return response
  
}