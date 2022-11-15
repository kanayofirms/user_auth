const express = require('express')
const router = express.Router()

//Usercontroller functions

const { 
    Usercontroller, 
    Logincontroller, 
    Authcontroller, 
    listUser,
    CheckRole }  = require('../controllers/user')



//Users Registration route
router
.post('/register-user', async(req, res, next) => {
    await Usercontroller(req.body, 'user', res)
})

//Users Login route
router
.post('/login-user', async(req, res, next) => {
    await Logincontroller(req.body, 'user', res)
})

//Get Profile route
router
.get('/profile', Authcontroller, async(req, res, next) => {
    return res.json(listUser(req.user)) 
})
//Users Protected route
router
.get('/user-protected', Authcontroller, CheckRole(['user']), async(req, res, next) => {
    return res
            .json('Hello User, Welcome to the conversational app.')
})



module.exports = router