require('dotenv').config()

module.exports = {
    DB : process.env.MONGO_DB,
    SECRET : process.env.TOKEN_SECRET,
    PORT : process.env.SERVER_PORT
}