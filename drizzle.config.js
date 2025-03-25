const { defineConfig }  = require('drizzle-kit');
const config = defineConfig({
    dialect: 'postgresql',
    schema: './src/db/schemas.db.js',
    out: './src/migrations'
})

export default config