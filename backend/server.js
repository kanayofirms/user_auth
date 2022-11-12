require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const adminRouter = require('./routes/admin')
const userRouter = require('./routes/user')
const authorRouter = require('./routes/author')
const { connect } = require('mongoose')
const { success, error } = require('consola')

//app constants
const { DB, PORT } = require('./config')

//initialize app
const app = express()




//middlewares
app.use(bodyParser.json())
app.use(express.json())
//bodyParser middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.urlencoded({
    extended: true
}))




//routes
app.use('/api/user', userRouter)
app.use('/api/admin', adminRouter)
app.use('/api/author', authorRouter)

//db
const runApp = async() => {
    try {
        await connect(DB, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })

        success({
            mssg: `Successfully connected to the Database, \n${ DB }`,
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



