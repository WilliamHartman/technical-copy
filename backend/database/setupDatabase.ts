const path = require('path');
const { client: setupClient, dbName: setupName } = require(path.join(__dirname, 'dbConfig.ts'));

export { };

async function setupDatabase() {
  await setupClient.connect()

  const response = await setupClient.query(
    `SELECT datname FROM pg_catalog.pg_database WHERE datname = '${setupName}'`
  )

  if (response.rowCount === 0) {
    await setupClient.query(`CREATE DATABASE "${setupName}";`)
    console.log(`Successfully created database ${setupName}.`)
  } else {
    console.log(`${setupName} already exists.`)
  }

  await setupClient.end()
}

setupDatabase()