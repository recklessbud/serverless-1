const { eq } = require("drizzle-orm")
const getDrizzleClient = require("./db.config")
const { LeadTable } = require("./schemas.db")

const newLeads = async({email, name}) => {
    const db = await getDrizzleClient()
  const results = await db.insert(LeadTable).values({
    email: email,
    first_name: name
  }).returning({newEmail: LeadTable.email})
   if (results.length === 1) {
    return results[0] 
}
return results
    // console.log(email)

}


const getLeads = async()=>{
    const db = await getDrizzleClient()
    const results = await db.select().from(LeadTable)
    return results
}

const updateLeads = async({email, name, id}) => {
    const db = await getDrizzleClient()
   const update = await db.update(LeadTable).set({
    email: email,
    first_name: name
   }).where(eq(LeadTable.id, id)).returning({newEmail: LeadTable.email, newName: LeadTable.first_name})
   return update[0]
}


module.exports = {
    newLeads,
    getLeads,
    updateLeads
}