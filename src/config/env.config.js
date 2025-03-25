require('dotenv').config();
const processEnv = process.env;

module.exports = {
    NODE_ENV: processEnv.NODE_ENV || 'dev',
    DATABASE_URL: String(processEnv.DATABASE_URL),
    DEBUG: processEnv.DEBUG,
    AWS_ACCESS: processEnv.AWS_ACCESS_KEY_ID,
    AWS_SECRET: processEnv.AWS_SECRET_ACCESS_KEY,
    STAGE: processEnv.STAGE || "prod"
}