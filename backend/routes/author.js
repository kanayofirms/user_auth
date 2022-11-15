const express = require('express')
const router = express.Router()

//Usercontroller functions

const { 
    authorController, 
    Logincontroller, 
    Authcontroller, 
    listUser,
    CheckRole }  = require('../controllers/author')



//Authors Registration route
router
.post('/register-author', async(req, res, next) => {
    await authorController(req.body, 'author', res)
})

//Authors Login route
router
.post('/login-author', async(req, res, next) => {
    await Logincontroller(req.body, 'author', res)
})

//Get Profile route
router
.get('/profile', Authcontroller, async(req, res, next) => {
    return res.json(listUser(req.user)) 
})
//Authors Protected route
router
.get('/author-protected', Authcontroller, CheckRole(['author']), async(req, res, next) => {
    return res
            .json('Hello Author, Welcome to the conversational app.')
})



module.exports = router