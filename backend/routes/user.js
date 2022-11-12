const express = require('express')
const router = express.Router()

//controllers

const { Usercontroller }  = require('../controllers/user')

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
.post('/register-user', async(req, res, next) => {
    await Usercontroller(req.body, 'user', res)
})

//Users Login route
router
.post('/login-user', async(req, res, next) => {})

//Get Profile route
router
.get('/profile', async(req, res, next) => {})
//Users Protected route
router
.post('/user-protected', async(req, res, next) => {})



module.exports = router