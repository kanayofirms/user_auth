const express = require('express')
const router = express.Router()

//controllers

const { Usercontroller, Logincontroller }  = require('../controllers/user')

//route to pages
/*
router
.get('/', Usercontroller.getAll)
.get('/:id',Usercontroller.getById)
.post('/', Usercontroller.createUser)
.put('/', Usercontroller.createUser)
.delete('/:id', Usercontroller.createUser)*/ 

//Users Registration route
router
.post('/register-admin', async(req, res, next) => {
    await Usercontroller(req.body, 'admin', res)
})

//Users Login route
router
.post('/login-admin', async(req, res, next) => {
    await Logincontroller(req.body, 'admin', res)
})

//Get Profile route
router
.get('/profile', async(req, res, next) => {})
//Users Protected route
router
.post('/user-protected', async(req, res, next) => {})



module.exports = router