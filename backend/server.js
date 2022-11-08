require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const adminRouter = require('./routes/admin')
const userRouter = require('./routes/user')
const authorRouter = require('./routes/author')


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
app.use('/user', userRouter)
app.use('/admin', adminRouter)
app.use('/author', authorRouter)


app.listen(process.env.PORT, () => 
console.log(`This app is listening on port, ${process.env.PORT} `))



