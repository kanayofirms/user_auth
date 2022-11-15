const express = require('express')
const router = express.Router()

//Usercontroller functions

const { 
    adminController, 
    Logincontroller, 
    Authcontroller, 
    listUser,
    CheckRole }  = require('../controllers/admin')



//Authors Registration route
router
.post('/register-admin', async(req, res, next) => {
    await adminController(req.body, 'admin', res)
})

//Authors Login route
router
.post('/login-admin', async(req, res, next) => {
    await Logincontroller(req.body, 'admin', res)
})

//Get Profile route
router
.get('/profile', Authcontroller, async(req, res, next) => {
    return res.json(listUser(req.user)) 
})
//Authors Protected route
router
.get('/admin-protected', Authcontroller, CheckRole(['admin']), async(req, res, next) => {
    return res
            .json('Hello Admin, Welcome to the conversational app.')
})



module.exports = router