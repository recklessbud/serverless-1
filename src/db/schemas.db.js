
const {text, pgTable, timestamp, serial} =  require('drizzle-orm/pg-core');


const LeadTable = pgTable('leads', {
    id: serial('id').primaryKey().notNull(),
    email: text('email').notNull(),	 
    timestamp: timestamp('timestamp').defaultNow(),
    first_name: text("name")
})

module.exports = { LeadTable }