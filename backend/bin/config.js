const dotenv = require('dotenv')

dotenv.config()

const {
    PORT,
    DB_URI,
    JWT_SECRET
} = process.env

module.exports = {
    localPort: PORT,
    dbUri: DB_URI,
    jwtSecret: JWT_SECRET
}