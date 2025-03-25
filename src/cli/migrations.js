const { AWS_ACCESS } = require("../config/env.config")
const secrets = require("../lib/secret")
const {drizzle} = require('drizzle-orm/neon-serverless')
const schema  = require('../db/schemas.db.js')
const { migrate } = require('drizzle-orm/postgres-js/migrator')
const { Pool, neonConfig } = require('@neondatabase/serverless');

// only do this in Node v21 and below
const ws = require('ws');

async function main() {
    const dbUrl = await secrets.getDatabaseUrl()
    console.log(dbUrl)

neonConfig.webSocketConstructor = ws;

if(!dbUrl){
  throw new Error("No database url found")
}
const pool = new Pool({ connectionString: dbUrl });
pool.on('error', (err) => console.error(err)); // deal with e.g. re-connect
// ...

const client = await pool.connect();

try {
  await client.query('BEGIN');
  const db = await drizzle(client, {schema})
  await migrate(db, {migrationsFolder: 'src/migrations'})

  await client.query('COMMIT');
} catch (err) {
  await client.query('ROLLBACK');
  throw err;
} finally {
  client.release();
}

// ...
await pool.end();
}

if(require.main === module) {
 console.log("run this")   
 console.log(AWS_ACCESS)
   main().then((val)=>{
    console.log("migrations done")
     process.exit(0)
   }).catch((err)=>{
    console.error('error', err)
     process.exit(1)
   })
}