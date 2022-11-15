require('dotenv').config()
const express = require('express')
const adminRouter = require('./routes/admin')
const userRouter = require('./routes/user')
const authorRouter = require('./routes/author')
const passport = require('passport')
const { connect } = require('mongoose')
const { success, error } = require('consola')

//app constants
const { DB, PORT } = require('./config')

//initialize app
const app = express()


//Middlewares
app.use(passport.initialize())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

require('./middlewares/passport')(passport)




//routes
app.use('/api/user', userRouter)
app.use('/api/author', authorRouter)
app.use('/api/admin', adminRouter)


//db
const runApp = async() => {
    try {
        await connect(DB, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })

        success({
            mssg: `Successfully connected to the Database,\n ${ DB }`,
            badge: true
        })
//Listening for the server on port
        app.listen(PORT, () =>
        success({
            mssg: `Listening on port, ${PORT}`,
            badge: true
        })
        )
    } catch (err) {
        error({
            mssg: `Database connection failed\n ${err}`,
            badge: true
        })
        runApp()
    }
}
  
runApp()



