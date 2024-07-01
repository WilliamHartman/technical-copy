require('dotenv').config();

const { Pool: DbPool, Client: DbClient } = require('pg');

export const dbName = process.env.PG_DATABASE;
export const client = new DbClient({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD
});
export const config = new DbPool({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE
});