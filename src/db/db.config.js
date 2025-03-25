
const { neon, neonConfig } = require("@neondatabase/serverless");
const secrets = require("../lib/secret")
const {drizzle} = require('drizzle-orm/neon-http')


//files


 async function getdbClient(){
 const dbUrl = await secrets.getDatabaseUrl()
 neonConfig.fetchConnectionCache = true
  const sql = neon(dbUrl);
  return sql
 }


 async function getDrizzleClient(){
    const sql = await getdbClient()

    return drizzle(sql)
 }

 module.exports = getdbClient
 module.exports = getDrizzleClient
