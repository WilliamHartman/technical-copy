const path = require('path')
import { client, dbName } from './dbConfig'

async function dropDatabase() {
  await client.connect()

  const response = await client.query(
    `SELECT datname FROM pg_catalog.pg_database WHERE datname = '${dbName}'`
  )

  if (response.rowCount != 0) {
    await client.query(`DROP DATABASE "${dbName}";`)
    console.log(`Successfully dropped database ${dbName}.`)
  } else {
    console.log(`${dbName} does not exist.`)
  }

  await client.end()
}

dropDatabase()